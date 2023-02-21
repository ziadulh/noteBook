import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function Login() {
    
    const [credential, setCredential] = useState({ email: "", password: "" })
    const url_local = process.env.REACT_APP_URL;;
    let navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
        navigate('/')
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url_local + "api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credential.email, password: credential.password })
            });

            let json = await response.json();

            if (json.status === true) {
                localStorage.setItem('auth-token', json.authToken);
                navigate('/notes')
            } else {
                json.errors.forEach(el => {
                    toast.error(el.msg);
                });
            }
        } catch (error) {

        }

    }

    const changeData = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="row">
                <h3>Login </h3>
                <div className="col-md-4 col-md-offset-4">
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={credential.email} onChange={changeData} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={credential.password} onChange={changeData} />
                        </div>
                        <button type="submit" className="btn btn-primary float-end my-3">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login