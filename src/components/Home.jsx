import React, { useEffect } /*,  { useContext, useEffect, useRef, useState } */ from 'react'
import { useNavigate } from 'react-router-dom';
// import NoteContext from '../context/notes/NoteContext';

export const Home = () => {

  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login')
    }
  }, []);

  return (
    <>
      Home
    </>
  )
}
