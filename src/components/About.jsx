import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function About() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login')
    }
  }, []);
  return (
    <div>About</div>
  )
}

export default About