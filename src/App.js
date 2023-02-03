import { Routes, Route } from "react-router-dom"

import About from "./components/About";
import { Home } from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <div className="App">

      <Navbar/>
      <div className="container">
        <NoteState>
          <Routes>
            <Route exact path="/" element={ <Home/> } />
            <Route exact path="/about" element={ <About/> } />
          </Routes>
        </NoteState>
      </div>
    </div>
  );
}

export default App;
