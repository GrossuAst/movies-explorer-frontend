import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

import './App.css';
import Header from '../Header/Header';
import MainPage from '../Main/MainPage';
import Footer from '../Footer/Footer';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<MainPage />} />
        {/* для всех роутов сверстать их компоненты и указать их в element */}
        <Route path='/movies' />
        <Route path='/saved-movies' />
        <Route path='/profile' />
        <Route path='/signin' />
        <Route path='/signup' />
      </Routes>
      
      <Footer></Footer>
    </>
  );
}

export default App;
