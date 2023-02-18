import { useState } from "react";
import NoteContext from "./NoteContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteState = (props) => {

  const init_data = [];
  const [notes, setNotes] = useState(init_data);

  const url_local = "http://localhost:5000/";
  const getNotes = async () => {
    const response = await fetch(url_local+"api/note", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYmJlNDM2MGVjNDE0NmYzOTEwMjVhIiwidHlwZSI6IkFkbWluIn0sImlhdCI6MTY3MzM2NTEwNn0.lZ8RCScbeWz4947FTai5Euw_gA-P2Grl3qFQv8X7EeU'
      },
    });
    let json = await response.json();
    setNotes(json);

  }

  const AddNote = async (data) => {
    try {
      const response = await fetch(url_local+"api/note/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYmJlNDM2MGVjNDE0NmYzOTEwMjVhIiwidHlwZSI6IkFkbWluIn0sImlhdCI6MTY3MzM2NTEwNn0.lZ8RCScbeWz4947FTai5Euw_gA-P2Grl3qFQv8X7EeU'
        },
        body: JSON.stringify(data)
      });

      if(response.status === 200){
        let json = await response.json();
        console.log(json, response);
        setNotes(notes.concat(json.note));
      }else{
        let json = await response.json();
        // let msg = '';
        (json.errors).forEach(el => {
          toast.error(el.msg);
          // msg += '*'+el.msg+'\n'
        });
        // toast.error(msg);
      }
  
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    }
    

  }

  const deleteNote = async (id) => {
    const response = await fetch(url_local+"api/note/"+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYmJlNDM2MGVjNDE0NmYzOTEwMjVhIiwidHlwZSI6IkFkbWluIn0sImlhdCI6MTY3MzM2NTEwNn0.lZ8RCScbeWz4947FTai5Euw_gA-P2Grl3qFQv8X7EeU'
      }
      // body: JSON.stringify(data)
    });

  }

  return(
    <NoteContext.Provider value={{notes, setNotes, getNotes, AddNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;