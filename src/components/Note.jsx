import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

function Note(props) {

    const context = useContext(NoteContext);
    const { notes, setNotes, deleteNote } = context;

    const deleteNoteByClick = (id) => {
        if (window.confirm("Are you sure!")) {
            const newNotes = notes.filter((note) => {
                return note._id !== id;
            });
            setNotes(newNotes)
            deleteNote(id);
        }
    }

    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <button className='btn btn-danger' onClick={() => { deleteNoteByClick(props.note._id) }}><i className="fa-solid fa-trash"></i></button>
                    <button className='btn btn-info mx-2' onClick={() => { props.editNote(props.note._id) }}><i className="fa-regular fa-pen-to-square"></i></button>
                    {/* <a href="#" class="btn btn-primary"></a> */}
                </div>
            </div>
        </div>
    )
}

export default Note