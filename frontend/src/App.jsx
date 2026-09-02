import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';

import { Header } from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'

import './App.css'
import Home from './Components/Home'
import ProductDetails from './Components/Product/ProductDetails';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
function App() {


  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/product/:id" element={<ProductDetails />} exact="true" />
          <Route path="/search/:keyword" element={<Home />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register exact="true" />} />
          <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
          <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update" element={<UpdateProfile />} exact="true"
          />
        </Routes>


      </Router>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
