import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import APIService from '../APIService'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies('loginToken')
    const [loginBtn, setLoginBtn] = useState(true)
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

        <React.Fragment>
            <LoginForm username={username} password={password}
                        setUsername={setUsername} setPassword={setPassword}
                        loginBtn={loginBtn} setLoginBtn={setLoginBtn}
                        handleLogin={handleLogin} handleRegister={handleRegister} />
        </React.Fragment>
    )
}

export default Login






// <div className="App"><br/>
        //     {loginBtn ? <h1>Please Login</h1> : <h1>Please Register</h1>}
        //     <br/>
        //     <div className="mb-3">
        //         <label htmlFor="username" className="form-label">Username</label>
        //         <input type="text" className="form-control" id="username" 
        //                 placeholder="Enter username" value={username}
        //                 onChange={e => setUsername(e.target.value)}/>
        //     </div><br/>
        //     <div className="mb-3">
        //         <label htmlFor="password" className="form-label">Password</label>
        //         <input type="password" className="form-control" id="password" 
        //                 placeholder="Enter password" value={password}
        //                 onChange={e => setPassword(e.target.value)}/>
        //     </div>

        //     {loginBtn ?
        //     <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        //         : <button className="btn btn-primary" onClick={handleRegister}>Register</button>}
        //     <div className="mb-3"><br />
        //         {loginBtn ? <h5>If You don't have an Account, Please 
        //             <button className="btn btn-primary" 
        //             onClick={() => setLoginBtn(false)}>Register</button>Here</h5> : 
        //                 <h5>If You have an Account, Please 
        //             <button className="btn btn-primary" 
        //             onClick={() => setLoginBtn(true)}>Login</button>Here</h5>}
        //     </div>
        // </div>