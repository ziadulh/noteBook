import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import UserContext from '../../context/users/UserContext';
import User from './User';

function Users() {

    const url_local = process.env.REACT_APP_URL; // app root url
    const context = useContext(UserContext);   // using context
    const { users, getUsers, setUsers } = context;   // extracting value from context
    useEffect(() => {   // conmonentDidMount(work on document ready)
        getUsers();   // getting all users (implemented on User Context API)
    }, []);

    //using reference to click a button by using another button
    const addUserLaunchButton = useRef(null);
    const addUserLaunchButtonClose = useRef(null);

    const addNoteLaunchModal = () => {
        addUserLaunchButton.current.click();
    }

    // user state to add user
    let [user, setUser] = useState({ name: "", email: "", password: "", type: "" });
    const changeData = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // adding user data
    const AddUser = async () => {
        try {
            const response = await fetch(url_local + "api/auth/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(user)
            });
            let json = await response.json();
            if (json.success) {
                setUsers(users.concat(json.data.user));
                setUser({ name: "", email: "", password: "", type: "" });
                addUserLaunchButtonClose.current.click();
                toast.success(json.msg);
            } else {
                toast.error(json.msg);
            }

        } catch (error) {
            toast.error(error);
        }
    }

    // edit user 
    let [eUser, setEUser] = useState({eId: "", eName: "", eEmail: "", eType: "" });
    const changeEData = (e) => {
        setEUser({ ...eUser, [e.target.name]: e.target.value });
    }
    const editUserModalOpen = useRef(null);
    const editUserModalClose = useRef(null);

    const editUser = async (id) => {
        const response = await fetch(url_local + "api/auth/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        let iUser = await response.json();
        editUserModalOpen.current.click();
        setEUser({eId: iUser._id, eName: iUser.name, eEmail: iUser.email, eType: iUser.type });
    }

    // update user
    const UpdateUser = async (eUser) => {
        try {
            // setSpinnerVal(false);
            const response = await fetch(url_local + "api/auth/" + eUser.eId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ name: eUser.eName, email: eUser.eEmail, type: eUser.eType })
            });

            if (response.status === 200) {
                let newUser = JSON.parse(JSON.stringify(users))
                for (let index = 0; index < users.length; index++) {
                    let element = newUser[index];
                    if (eUser.eId === element._id) {
                        newUser[index].name = eUser.eName;
                        newUser[index].email = eUser.eEmail;
                        newUser[index].type = eUser.eType;
                        setUsers(newUser);
                        break;
                    }
                }
                editUserModalClose.current.click();
                toast.success("User updated successfully");
            } else {
                let json = await response.json();
                (json.errors).forEach(el => {
                    toast.error("Oops! Something went wrong!");
                });
            }
            // setSpinnerVal(true);
        } catch (error) {
            console.log(error);
            toast.error("Oops! Something went wrong!");
        }
    }

    return (
        <div className='container'>
            <div className="row my-2">
                <div className="col-md-3"><h2>All Users</h2></div>
                <div className="col-md-3 offset-6"><i className=' btn btn-info fa fa-plus float-end' onClick={addNoteLaunchModal}></i></div>
            </div>
            <div hidden={users.length > 0}> No user available</div>
            <div className='row'>
                {
                    users.map((n) => {
                        return (
                            <User user={n} editUser={editUser} key={n._id ? n._id : Math.random()}></User>
                        )
                    })
                }
            </div>

            {/* user adding modal with hidden launch button */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddNoteModal" ref={addUserLaunchButton} hidden >Add</button>
            <div className="modal fade" id="AddNoteModal" tabIndex="-1" aria-labelledby="AddNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddNoteModalLabel">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Enter Name</label>
                                    <input type="text" className="form-control" id="name" name="name" onChange={changeData} value={user.name} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Enter Email</label>
                                    <input type="email" className="form-control" id="email" name="email" onChange={changeData} value={user.email} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Enter Email</label>
                                    <input type="password" className="form-control" id="password" name="password" onChange={changeData} value={user.password} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Select Tag</label>
                                    <select className="form-select" id="type" name="type" onChange={changeData} aria-label="Default select example" value={user.type} required >
                                        <option>Select</option>
                                        <option value="Admin">Special</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={AddUser} >Submit</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={addUserLaunchButtonClose} >Close</button>
                            <button type="button" className="btn btn-primary" onClick={AddUser} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal to update note */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={editUserModalOpen} hidden>Update</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User Info</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="eName" className="form-label">Enter Name</label>
                                    <input type="text" className="form-control" id="eName" name="eName" value={eUser.eName} onChange={changeEData} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eEmail" className="form-label">Enter Description</label>
                                    <input type="email" className="form-control" id="eEmail" name="eEmail" value={eUser.eEmail} onChange={changeEData} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="eType" className="form-label">Select Tag</label>
                                    <select className="form-select" id="eType" name="eType" value={eUser.eType} onChange={changeEData} aria-label="Default select example">
                                        <option>Select</option>
                                        <option value="Admin">Admin</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={editUserModalClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { UpdateUser(eUser) }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users