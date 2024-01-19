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
import Footer from "./general/Footer";
import HomePage from "./home/homePage";
import Login from "./general/login.js";
import Servicios from "./Invitates/Services.js";
import Products from "./Invitates/Products";
import Contact from "./Invitates/Contact";
import Dashboard from "./home/Dashboard";
import Error404 from "./error/error404";
import Admin from "./components/Admin";
import CreditUser from "./components/CreditUser";
import AddCredit from "./components/AddCredit";
import CreditCalculator from "./components/CreditCalculator";
import Payments from "./components/Payments";
import Solicitudes from "./solicitudes/home.js";
import FormularioCliente from "./solicitudes/form/FormularioCliente.js";
import { ValidationProvider } from "./contexts/ValidationContext";
import CreditManagementHome from "./components/creditos/CreditManagementHome";
import Politics from "./legal/politica-de-privacidad.js";
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

  const Layout = ({ children }) => (
    <>
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
      {children}
      <Footer />
    </>
  );

  return (
    <ValidationProvider>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Layout>
                    <HomePage />
                  </Layout>
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Layout>
                    <Login />
                  </Layout>
                )
              }
            />
            <Route
              path="/products"
              element={
                <Layout>
                  <Products />
                </Layout>
              }
            />
            <Route
              path="/creditos"
              element={
                <Layout>
                  <CreditManagementHome />
                </Layout>
              }
            />
            <Route
              path="/services"
              element={
                <Layout>
                  <Servicios />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <Layout>
                    <Admin userRole={userRole} />
                  </Layout>
                ) : (
                  <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Layout>
                    {userRole === 5 ? <Navigate to="/CreditUser" /> : null}
                    {userRole === 4 ? <Navigate to="/admin" /> : null}
                    {userRole === 3 ? <Navigate to="/payments" /> : null}
                    <Dashboard />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/AddCredit"
              element={
                <Layout>
                  <AddCredit />
                </Layout>
              }
            />

            <Route
              path="/CreditCalculator"
              element={
                <Layout>
                  <CreditCalculator userRole={userRole} />
                </Layout>
              }
            />
            <Route
              path="/CreditUser"
              element={
                <Layout>
                  <CreditUser personDni={personDni} />
                </Layout>
              }
            />
            <Route
              path="/payments"
              element={
                isAuthenticated || userRole === 1 || userRole === 4 ? (
                  <Layout>
                    <Payments />
                  </Layout>
                ) : (
                  <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
                )
              }
            />
            <Route
              path="/solicitudes"
              element={
                <Layout>
                  <Solicitudes userRole={userRole} />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <Error404 />
                </Layout>
              }
            />
            <Route
              path="/formulario-cliente/:id"
              element={<FormularioCliente />}
            />
            <Route
              path="/politica-de-privacidad"
              element={
                <Layout>
                  <Politics />
                </Layout>
              }
            />
          </Routes>
        </div>
      </Router>
    </ValidationProvider>
  );
}

export default App;
