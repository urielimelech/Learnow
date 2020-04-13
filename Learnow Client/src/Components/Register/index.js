import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'hookrouter'

import { register, logout } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'

export const Register = () => {

    const [errorRegister, setErrorRegister] = useState(null)
    const [user, setUser] = useState({
        name:'',
        email: '',
        password: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const { name, email, password } = user

    const _dispatch = useDispatch()

    useEffect(() => {
        _dispatch(logout())
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setUser(user => ({ ...user, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitted(true)
        if (user.email && user.password && user.name) {
            _dispatch(register(user))
            socketToWebServer.emit('register data', ({name: name, email: email, password: password}))
        }
    }

    socketToWebServer.on('registration data', ({name, token, success, message}) => {
        if (success){
            _dispatch(register({name: name, token: token}))
            navigate ('/Session')
        }
        else {
            Object.keys(message).length > 0 ? 
                setErrorRegister(<ToastNotification renderComponent={message.message}/>) : 
                setErrorRegister(<ToastNotification renderComponent={message}/>)
            setTimeout(() => {
                setErrorRegister(null)
            },6000)
        }
    })

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} />
                    {submitted && !user.name &&
                        <div className="invalid-feedback">name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                </div>
            </form>
            {errorRegister}
        </div>
    )
}