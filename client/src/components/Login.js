import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import APIService from '../APIService'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies('loginToken')
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if(token['loginToken']){
            navigate('/articles')
        }
    }, [navigate, token])

    const handleLogin = () => {
        APIService.LoginUser({username, password})
            .then(resp => setToken('loginToken', resp.token))
            .catch(error => console.log(error))
    }

    const handleRegister = () => {
        APIService.RegisterUser({username, password})
            //.then((resp => console.log(resp)))
            .then(() => handleLogin())
            .catch(error => console.log(error))
    }

    return (
        <div className="App"><br/>
            {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}
            <br/>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" 
                        placeholder="Enter username" value={username}
                        onChange={e => setUsername(e.target.value)}/>
            </div><br/>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" 
                        placeholder="Enter password" value={password}
                        onChange={e => setPassword(e.target.value)}/>
            </div>

            {isLogin ?
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                : <button className="btn btn-primary" onClick={handleRegister}>Register</button>}
            <div className="mb-3"><br />
                {isLogin ? <h5>If You don't have an Account, Please 
                    <button className="btn btn-primary" 
                    onClick={() => setIsLogin(false)}>Register</button>Here</h5> : 
                        <h5>If You have an Account, Please 
                    <button className="btn btn-primary" 
                    onClick={() => setIsLogin(true)}>Login</button>Here</h5>}
            </div>
        </div>
    )
}

export default Login
