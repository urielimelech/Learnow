import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'hookrouter'

import { register, logout, notificationVisible } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'
import { SelectUserType } from './SelectUserType'
import { RegisterPage, Logo, BackgroundRegisterPage, WrapperForm, Form, HeaderForm, WrapperButtons } from './RegisterStyle'
import { useCookies } from 'react-cookie'

export const Register = () => {

    const [cookies, setCookie] = useCookies(['email', 'token', 'name', 'userType', 'route'])

    const [errorRegister, setErrorRegister] = useState(null)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        userType: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const { name, email, password, userType } = user

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)

    const _dispatch = useDispatch()

    const userSignUp = () => {
        socketToWebServer.on('registration data', ({email, name, userType, token, success, message}) => {
            if (success){
                _dispatch(register({email: email, name: name, userType: userType, token: token}))
            }
            else {
                _dispatch(notificationVisible(true))
                setErrorRegister(<ToastNotification renderComponent={message}/>)
                setSubmitted(false)
            }
        })
    }

    useEffect(() => {
        _dispatch(logout())
        if (loggedUser.email) {
            socketToWebServer.emit('logout', loggedUser.email)
        }
        userSignUp()
        return () => socketToWebServer.off('registration data')
    }, [])

    useEffect(() => {
        if (Object.keys(loggedUser).length > 0){
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
            setErrorRegister(null)
    },[isNotificationVisible])

    const handleChange = e => {
        const { name, value } = e.target
        setUser(user => ({ ...user, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitted(true)
        if (email && password && name) {
            socketToWebServer.emit('register data', ({name: name, email: email, password: password, userType: userType}))
        }
    }

    return (
        <RegisterPage>
            <BackgroundRegisterPage>
                <WrapperForm className="col-lg-8 offset-lg-2">
                    <Form name="form" onSubmit={handleSubmit}>
                        <HeaderForm>
                            <Logo src={require('../../images/learnowIcon.png')}></Logo>
                            <h4>Register</h4>
                        </HeaderForm>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={user.name} onChange={handleChange} className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} />
                            {submitted && !name &&
                                <div className="invalid-feedback">Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                            {submitted && !email &&
                                <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                            {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>User Type</label>
                            <SelectUserType name='userType' onChange={handleChange} />
                        </div>
                        <WrapperButtons className="form-group">
                            <button className="btn btn-primary">
                                {submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                        </WrapperButtons>
                    </Form>
                    {errorRegister}
                </WrapperForm>
            </BackgroundRegisterPage>
        </RegisterPage>
    )
}