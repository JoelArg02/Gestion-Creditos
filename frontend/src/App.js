import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Header from "./general/Header";
import HomePage from "./components/homePage";
import Login from "./components/login";
import Servicios from "./components/Services";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Error404 from "./error/error404";
import Admin from "./components/Admin";
import Footer from "./general/Footer";
import CreditUser from "./components/CreditUser";
import AddCredit from "./components/AddCredit";
import CreditCalculator from "./components/CreditCalculator";
import Payments from "./components/Payments";
import Solicitudes from "./solicitudes/home.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [personName, setPersonName] = useState("");
  const [personLastName, setPersonLastName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personPhone2, setPersonPhone2] = useState("");
  const [personPais, setPersonPais] = useState("");
  const [personCiudad, setPersonCiudad] = useState("");
  const [personDireccion, setPersonDireccion] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personDni, setPersonDni] = useState("");
  console.log(userRole);
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        if (!isTokenExpired(token)) {
          setIsAuthenticated(true);
          setUserId(decoded.userId);
          setUserRole(parseInt(decoded.userRole));
          setUserName(decoded.userName);
          setBusinessName(decoded.businessName);
          setPersonName(decoded.personName);
          setPersonLastName(decoded.personLastName);
          setPersonPhone(decoded.personPhone);
          setPersonPhone2(decoded.personPhone2);
          setPersonPais(decoded.personPais);
          setPersonCiudad(decoded.personCiudad);
          setPersonDireccion(decoded.personDireccion);
          setPersonEmail(decoded.personEmail);
          setPersonDni(decoded.personDni);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Administrador 1
  // Contador 2
  // Cobrador 3
  // Vendedor 4
  // Cliente 5

  return (
    <Router>
      <div>
        <Header
          businessName={businessName}
          isLoggedIn={isAuthenticated}
          userId={userId}
          userName={userName}
          userRole={userRole}
          personName={personName}
          personLastName={personLastName}
          personPhone={personPhone}
          personPhone2={personPhone2}
          personPais={personPais}
          personCiudad={personCiudad}
          personDireccion={personDireccion}
          personEmail={personEmail}
          personDni={personDni}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/products" element={<Products />} />
          <Route
            path="/admin"
            element={
              isAuthenticated && userRole === 1 ? (
                <Admin />
              ) : isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/services" element={<Servicios />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/AddCredit"
            element={
              isAuthenticated || userRole === 1 || userRole === 2 ? (
                <AddCredit />
              ) : isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/CreditCalculator"
            element={<CreditCalculator userRole={userRole} />}
          />
          <Route
            path="/CreditUser"
            element={<CreditUser personDni={personDni} />}
          />
          <Route
            path="/payments"
            element={
              isAuthenticated || userRole === 1 || userRole === 4 ? (
                <Payments />
              ) : isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={<Error404 isAuthenticated={isAuthenticated} />}
          />
          <Route path="/solicitudes" element={<Solicitudes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
