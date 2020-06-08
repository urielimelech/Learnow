import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, notificationVisible } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'
import { HeaderForm, Logo, WrapperButtons } from './LoginStyle'
import { ButtonType } from '../ButtonType/ButtonType'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'

export const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const [errorLogin, setErrorLogin] = useState(null)

    const { email, password } = inputs
    const _dispatch = useDispatch()
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

    useEffect(() => {
        userSignIn()
        return () => socketToWebServer.off('logged data')
    }, [])

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
        <div className="col-lg-8 offset-lg-2" > 
            <form name="form" onSubmit={handleSubmit}>
                <HeaderForm>
                    <Logo src={require('../../images/learnowIcon.png')}></Logo>
                </HeaderForm>
                <div className="form-group"  >
                    <EmailIcon/>
                    <input type="email" name="email" placeholder="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                    {submitted && !email && <div className="invalid-feedback">Email is required</div>}
                </div>
                <div className="form-group">
                    <LockIcon/>
                    <input type="password" name="password" placeholder="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                </div>
                <WrapperButtons className="form-group">
                    <ButtonType className="btn btn-primary">
                        {submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        SIGN IN
                    </ButtonType>
                </WrapperButtons>
            </form>
            {errorLogin}
        </div>
    )
}