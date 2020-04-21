import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'hookrouter'

import { login, logout } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'

export const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    
    const [submitted, setSubmitted] = useState(false)
    const [errorLogin, setErrorLogin] = useState(null)
    const { email, password } = inputs
    const _dispatch = useDispatch()

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const userSignIn = () =>{
        socketToWebServer.on('logged data', ({email, name, token, success, message}) => {
            if (success){
                _dispatch(login({email: email, name: name, token: token}))
            }
            else {
                setErrorLogin(<ToastNotification renderComponent={message}/>)
            }
        })
    }

    useEffect(() => { 
        _dispatch(logout())
        userSignIn()
    }, [])

    useEffect(() => {
        if (Object.keys(loggedUser).length > 0)
            navigate('/Session')
    },[loggedUser])

    const handleChange = e => {
        const { name, value } = e.target
        setInputs(inputs => ({ ...inputs, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitted(true)
        if (email && password) {
            socketToWebServer.emit('login data', ({email: email, password: password}))
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2"> 
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                    {submitted && !email && <div className="invalid-feedback">Email is required</div>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/Register')}>Register</button>
                </div>
            </form>
            {errorLogin}
        </div>
    )
}