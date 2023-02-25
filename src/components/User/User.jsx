import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import UserContext from '../../context/users/UserContext';

function User(props) {

  const url_local = process.env.REACT_APP_URL;   // app root url

  const context = useContext(UserContext);
  const { users, setUsers } = context;

  // delete user 
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure!")) {
      const response = await fetch(url_local + "api/auth/" + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        }
      });

      if (response.status === 200) {
        const newUser = users.filter((user) => {
          return user._id !== id;
        });
        setUsers(newUser)
        toast.success("Note deleted successfully");
      } else {
        toast.error("Oops! Something went wrong,");
      }
    }

  }

  return (
    <div className='col-md-3 my-2'>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.user.name}</h5>
          <p className="card-text">{props.user.email}</p>
          <button className='btn btn-danger' onClick={() => { deleteUser(props.user._id) }} ><i className="fa-solid fa-trash"></i></button>
          <button className='btn btn-info mx-2' onClick={() => { props.editUser(props.user._id) }}><i className="fa-regular fa-pen-to-square"></i></button>
        </div>
      </div>
    </div>
  )
}

export default User