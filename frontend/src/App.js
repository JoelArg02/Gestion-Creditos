import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/homePage';
import Login from './components/login'; 
import Servicios from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Error404 from './error/error404';



function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Servicios />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
