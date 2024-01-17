import React from "react";
import CreditForm from "./CreditForm/CreditFormUser";
import Calculadora from "./Extras/Calculadora.js";
import Contratos from "./Extras/Contratos.js";
const CreditManagementHome = () => {
  return (
    <>
      <CreditForm />
      <Calculadora />
      
        <Contratos />
      
    </>
  );
};

export default CreditManagementHome;
