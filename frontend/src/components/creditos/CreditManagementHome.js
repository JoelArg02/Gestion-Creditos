import React, { useState, useEffect } from "react";
import "./CreditManagementHome.css";
import Select from "react-select";
import CreditForm from "./CreditForm/CreditFormUser";
import Calculadora from "./Extras/Calculadora.js";
import Contratos from "./Extras/Contratos.js";
import Loading from "../../general/loading.js";
import { getUsers } from "../../api/api";
import { getSolById } from "../../api/solicitud";
import { getPersonById } from "../../api/person.js";
import { getReferenceById } from "../../api/reference.js";

const CreditManagementHome = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [activeComponent, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idFormularioCliente, setIdFormularioCliente] = useState(null);

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
                  const referenceData = await getReferenceById(personData.id_referencia_persona);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="my-3">
        <Select
          value={selectedOption}
          onChange={handleUserSelect}
          options={userOptions}
          className="form-control"
          placeholder="Seleccione un usuario"
        />
      </div>

      {activeComponent === "CreditForm" && (
        <CreditForm
          userData={userData}
          idFormularioCliente={idFormularioCliente}
        />
      )}
      {activeComponent === "Calculadora" && <Calculadora />}
      {activeComponent === "Contratos" && <Contratos userData={userData} />}
    </div>
  );
};

export default CreditManagementHome;
