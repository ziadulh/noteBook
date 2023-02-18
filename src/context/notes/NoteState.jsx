import { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from 'react-toastify';

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

  const AddNote = async (data, setNote, addNoteLaunchButtonClose) => {
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
        setNotes(notes.concat(json.note));
        setNote({ title: "", description: "", tag: "" });
        toast.success("Note added successfully");
        addNoteLaunchButtonClose.current.click();
      }else{
        let json = await response.json();
        (json.errors).forEach(el => {
          toast.error(el.msg);
        });
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

    if(response.status === 200){
      toast.success("Note deleted successfully");
    }else{
      toast.error("Oops! Something went wrong,");
    }

  }

  return(
    <NoteContext.Provider value={{notes, setNotes, getNotes, AddNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;