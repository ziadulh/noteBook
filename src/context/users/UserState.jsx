import React, { useState } from 'react'
import UserContext from './UserContext'

function UserState(props) {
    // app root url
    const url_local = process.env.REACT_APP_URL;
    // all user in user state
    const [users, setUsers] = useState([]);

    // getting all user for admin
    const getUsers = async () => {
        const response = await fetch(url_local + "api/auth", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        let json = await response.json();
        setUsers(json);

    }

    return (
        <UserContext.Provider value={{ users, getUsers, setUsers }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState