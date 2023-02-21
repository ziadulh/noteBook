import { Routes, Route } from "react-router-dom"

import About from "./components/About";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import NoteState from "./context/notes/NoteState";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />

      <Navbar/>
      <div className="container">
        <NoteState>
          <Routes>
            <Route exact path="/" element={ <Home/> } />
            <Route exact path="/about" element={ <About/> } />
            <Route exact path="/notes" element={ <Notes/> } />
            <Route exact path="/login" element={ <Login/> } />
          </Routes>
        </NoteState>
      </div>
    </div>
  );
}

export default App;
