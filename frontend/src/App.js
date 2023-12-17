import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/homePage";
import Login from "./components/login";
import Servicios from "./components/Services";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Error404 from "./error/error404";
import Admin from "./components/Admin";
import Footer from "./components/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [personName, setPersonName] = useState("");
  const [personLastName, setPersonLastName] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [personPhone2, setPersonPhone2] = useState("");
  const [personPais, setPersonPais] = useState("");
  const [personCiudad, setPersonCiudad] = useState("");
  const [personDireccion, setPersonDireccion] = useState("");
  const [personEmail, setPersonEmail] = useState("");

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const timeLeft = decoded.exp - currentTime;
      console.log(`Tiempo restante del token: ${timeLeft} segundos`);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token); // Decodificar el token aquí
        if (!isTokenExpired(token)) {
          setIsAuthenticated(true);
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
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 5 * 60 * 1000); // Verifica cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div>
        <Header
          businessName={businessName}
          isLoggedIn={isAuthenticated}
          userName={userName}
          personName={personName}
          personLastName={personLastName}
          personPhone={personPhone}
          personEmail={personEmail}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/services" element={<Servicios />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
