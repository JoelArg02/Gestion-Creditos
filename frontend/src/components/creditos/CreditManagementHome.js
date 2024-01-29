import React, { useState, useEffect } from "react";
import "./CreditManagementHome.css";
import Select from "react-select";
import CreditForm from "./CreditForm/CreditFormUser";
import Calculadora from "./CreditForm/Calculadora.js";
import Contratos from "./CreditForm/Contratos.js";
import Loading from "../../general/loading.js";
import { getUsers } from "../../api/api";
import { getSolById } from "../../api/solicitud";
import { getPersonById } from "../../api/person.js";
import { getReferenceById } from "../../api/reference.js";

import "bootstrap/dist/css/bootstrap.min.css";

const CreditManagementHome = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [activeComponent, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idFormularioCliente, setIdFormularioCliente] = useState(null);
  const [amortizationData, setAmortizationData] = useState([]);

  const handleAmortizationData = (data) => {
    setAmortizationData(data);
  };

  const handleSetActiveComponent = (componentName) => {
    setActive(componentName);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsers();
        setUserOptions(
          users.map((user) => ({
            value: `${user.id_usuario}-${
              user.id_solicitud_usuario != null
                ? user.id_solicitud_usuario
                : "0"
            }-${user.id_persona}`,
            label: user.usuario,
          }))
        );
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (selectedOption) {
        setLoading(true);
        const [userId, solicitudIdStr, personaIdStr] =
          selectedOption.value.split("-");
        const solicitudId = parseInt(solicitudIdStr, 10);
        const personaId = parseInt(personaIdStr, 10);
        if (!isNaN(solicitudId) && solicitudId !== 0) {
          try {
            const userData = await getSolById(solicitudId);
            setUserData(userData);
            if (userData && userData.id_formulario_cliente) {
              setIdFormularioCliente(userData.id_formulario_cliente);
              setActive("CreditForm");
              try {
                const personData = await getPersonById(personaId);

                setUserData((prevUserData) => ({
                  ...prevUserData,
                  ...personData,
                }));
                try {
                  const referenceData = await getReferenceById(
                    personData.id_referencia_persona
                  );
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    ...referenceData,
                  }));
                } catch (error) {
                  console.error(
                    "Error al obtener detalles de la referencia:",
                    error
                  );
                }
              } catch (error) {
                console.error("Error al obtener detalles del usuario:", error);
              } finally {
                setLoading(false);
              }
            } else {
              setIdFormularioCliente(null);
              setActive(null);
            }
          } catch (error) {
            console.error("Error al obtener detalles del usuario:", error);
            setUserData(null);
            setIdFormularioCliente(null);
          } finally {
            setLoading(false);
          }
        } else {
          setUserData(null);
          setIdFormularioCliente(null);
          setActive(null);
          setLoading(false);
        }
      } else {
        setUserData(null);
        setIdFormularioCliente(null);
        setActive(null);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [selectedOption]);
  useEffect(() => {
    console.log("Datos actualizados de usuario: ", userData);
  }, [userData]);

  const handleUserSelect = (option) => {
    setSelectedOption(option);
  };

  const handleApproval = () => {
    setActive("Calculadora");
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "CreditForm":
        return (
          <CreditForm
            userData={userData}
            idFormularioCliente={idFormularioCliente}
            changeComponent={setActive}
          />
        );
      case "Calculadora":
        return <Calculadora setAmortizationData={handleAmortizationData} />;
      case "Contratos":
        return (
          <Contratos userData={userData} amortizationData={amortizationData} />
        );
      default:
        return <div>Seleccione una opción para comenzar</div>;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Bienvenido al Gestor de Créditos</h1>
          <p>
            Seleccione un usuario para comenzar la gestión de créditos o utilice
            las herramientas disponibles.
          </p>
          <div className="mb-4">
            <Select
              value={selectedOption}
              onChange={handleUserSelect}
              options={userOptions}
              className="basic-single"
              classNamePrefix="select"
              placeholder="Seleccione un usuario"
            />
          </div>
          <div className="content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default CreditManagementHome;
