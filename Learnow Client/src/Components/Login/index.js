import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'hookrouter'

import { login, logout, notificationVisible } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'
import { useCookies } from 'react-cookie'

export const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const [cookies, setCookie] = useCookies(['email', 'token', 'name', 'userType', 'route'])
    
    const [submitted, setSubmitted] = useState(false)
    const [errorLogin, setErrorLogin] = useState(null)
    const { email, password } = inputs
    const _dispatch = useDispatch()

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)

    const userSignIn = () =>{
        socketToWebServer.on('logged data', ({email, name, userType, token, success, message}) => {
            if (success){
                _dispatch(login({email: email, name: name, userType: userType, token: token}))
            }
            else {
                _dispatch(notificationVisible(true))
                setErrorLogin(<ToastNotification renderComponent={message}/>)
                setSubmitted(false)
            }
        })
    }

    const checkCookies = () => {
        if (cookies['email'] && cookies['token'] && cookies['name'] && cookies['userType']){
            const email = cookies['email']
            const token = cookies['token']
            const name = cookies['name']
            const userType = cookies['userType']
            _dispatch(login({email: email, name: name, userType: userType, token: token}))
        }
        else
            _dispatch(logout())
    }

    useEffect(() => {
        checkCookies()
        // _dispatch(logout())
        // if (loggedUser.email) {
        //     socketToWebServer.emit('logout', loggedUser.email)
        // }
        userSignIn()
        return () => socketToWebServer.off('logged data')
    }, [])

    useEffect(() => {
        if (Object.keys(loggedUser).length > 0) {
            setCookie('email', loggedUser.email)
            setCookie('token', loggedUser.token)
            setCookie('name', loggedUser.name)
            setCookie('userType', loggedUser.userType)
            setCookie('route', '/Home')
            navigate('/Home')
        }
    },[loggedUser])

    useEffect(() => {
        if (!isNotificationVisible)
            setErrorLogin(null)
    },[isNotificationVisible])

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
                    <input autoComplete='username' type="email" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                    {submitted && !email && <div className="invalid-feedback">Email is required</div>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input autoComplete='current-password' type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
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