import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Note from './Note';

function Notes() {
    const context = useContext(NoteContext);
    // const { notes, setNotes, getNotes, /* AddNote, */ deleteNote } = context;
    const { notes, setNotes, getNotes } = context;

    const [enote, setENote] = useState({ eid: '', etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const ref_close = useRef(null);

    const url_local = "http://localhost:5000/";
    useEffect(() => {
        getNotes();
    }, []);

    const changeEData = (e) => {
        setENote({ ...enote, [e.target.name]: e.target.value });
    }

    const editNote = async (id) => {
        const response = await fetch(url_local + "api/note/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYmJlNDM2MGVjNDE0NmYzOTEwMjVhIiwidHlwZSI6IkFkbWluIn0sImlhdCI6MTY3MzM2NTEwNn0.lZ8RCScbeWz4947FTai5Euw_gA-P2Grl3qFQv8X7EeU'
            },
        });
        let aNote = await response.json();
        // console.log(aNote);
        ref.current.click();
        setENote({ eid: aNote._id, etitle: aNote.title, edescription: aNote.description, etag: aNote.tag });
    }

    const handleSubmitEditData = async (enote) => {
        const response = await fetch(url_local + "api/note/" + enote.eid, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYmJlNDM2MGVjNDE0NmYzOTEwMjVhIiwidHlwZSI6IkFkbWluIn0sImlhdCI6MTY3MzM2NTEwNn0.lZ8RCScbeWz4947FTai5Euw_gA-P2Grl3qFQv8X7EeU'
            },
            body: JSON.stringify({ title: enote.etitle, description: enote.edescription, tag: enote.etag })
        });

        ref_close.current.click();

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (enote.eid === element._id) {
                newNotes[index].title = enote.etitle;
                newNotes[index].description = enote.edescription;
                newNotes[index].tag = enote.etag;
                setNotes(newNotes);
                break;
            }

        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {
                        notes.map((n) => {
                            return (
                                <Note note={n} editNote={editNote} key={n._id ? n._id : Math.random()} />
                            )
                        })
                    }
                </div>
            </div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} hidden>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Enter Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={enote.etitle} onChange={changeEData} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Enter Description</label>
                                    <input type="text" className="form-control" id="edescription" value={enote.edescription} name="edescription" onChange={changeEData} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Select Tag</label>
                                    <select className="form-select" id="etag" value={enote.etag} name="etag" onChange={changeEData} aria-label="Default select example">
                                        <option>Select</option>
                                        <option value="General">General</option>
                                        <option value="Special">Special</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref_close}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { handleSubmitEditData(enote) }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes