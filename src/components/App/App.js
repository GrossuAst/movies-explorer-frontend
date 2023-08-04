import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

import './App.css';
import MainPage from '../Main/MainPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';

function App() {
  return (
    <>
      <Routes>
        {/* главная страница */}
        <Route path='/' element={<MainPage />} />

        {/* страница с фильмами */}
        <Route path='/movies' element={<Movies/>}/>

        {/* страница с сохраненными фильмами */}
        <Route path='/saved-movies' />

        {/* страница профиля */}
        <Route path='/profile' />

        {/* страница логина */}
        <Route path='/signin' element={<Login/>}/>

        {/* страница регистрации */}
        <Route path='/signup' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
