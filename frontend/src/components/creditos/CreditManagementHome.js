import React, { useState, useEffect } from "react";
import "./CreditManagementHome.css";
import Select from "react-select";
import CreditForm from "./CreditForm/CreditFormUser";
import Calculadora from "./Extras/Calculadora.js";
import Contratos from "./Extras/Contratos.js";
import Loading from "../../general/loading.js";
import { getPersonById } from "../../api/person";
import { getUsers } from "../../api/api";
import { getSolById } from "../../api/solicitud";

const CreditManagementHome = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await getUsers();

        console.log(users);
        setUserOptions(users);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const options = userOptions.map((user) => ({
    value: `${user.id_usuario}-${
      user.id_solicitud_usuario != null ? user.id_solicitud_usuario : "0"
    }`,
    label: user.usuario,
  }));

  const handleUserSelect = async (selectedOption) => {
    const value = selectedOption.value;
    const [userId, solicitudId] = value.split("-");

    setSelectedUserId(userId);

    if (userId && solicitudId !== undefined) {
      try {
        setLoading(true);
        const userData = await getSolById(
          solicitudId === "0" ? null : solicitudId
        );

        setUserData(userData);
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setUserData(null);
    }
  };

  const setActive = (component) => {
    setActiveComponent(component);
  };
  const idFormularioCliente = userData && userData.id_formulario_cliente;
  const idPersona = userData && userData.id_persona;

  return (
    <div className="container">
      <div className="my-3">
        <Select
          value={options.find((option) => option.value === selectedUserId)}
          onChange={handleUserSelect}
          options={options}
          className="form-control"
          placeholder="Seleccione un usuario"
        />
      </div>
      <div className="component-selector">
        <button onClick={() => setActive("CreditForm")}>
          Mostrar CreditForm
        </button>
        <button onClick={() => setActive("Calculadora")}>
          Mostrar Calculadora
        </button>
        <button onClick={() => setActive("Contratos")}>
          Mostrar Contratos
        </button>
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
