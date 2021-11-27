import React from 'react'

const LoginForm = (props) => {
    return (
        <div class="container-fluid ps-md-0">
            <div class="row g-0">
                <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div class="col-md-8 col-lg-6">
                    <div class="login d-flex align-items-center py-5">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-9 col-lg-8 mx-auto">
                                    <h3 class="login-heading mb-4">Welcome back!</h3>

                                    {/* Sign In Form */}
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" 
                                                    placeholder="username" value={props.username}
                                                    onChange={e => props.setUsername(e.target.value)}/>
                                            <label for="floatingInput">Username</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="floatingPassword" 
                                                    placeholder="Password" value={props.password}
                                                    onChange={e => props.setPassword(e.target.value)}/>
                                            <label for="floatingPassword">Password</label>
                                        </div>

                                        {/* <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                            <label class="form-check-label" for="rememberPasswordCheck">
                                                    Remember password
                                            </label>
                                        </div> */}

                                        <div class="d-grid">
                                            {
                                                props.loginBtn ?
                                                    <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
                                                            type="submit" onClick={props.handleLogin}>Log in</button>
                                                :
                                                    <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
                                                            type="submit" onClick={props.handleRegister}>Sign Up</button>
                                            }
                                            
                                            <div class="text-center">
                                                {
                                                    props.loginBtn ?
                                                        <button type="button" class="btn btn-link"
                                                                onClick={() => props.setLoginBtn(false)}>Sign Up</button>
                                                    :
                                                        <button type="button" class="btn btn-link" 
                                                                onClick={() => props.setLoginBtn(true)}>Log in</button>

                                                }
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
