import React, { useState, useEffect } from 'react'
import { WrapperMainPage, WrapperContent, WrapperImg, Img, Title, Description } from "./StartPageStyle"
import { ButtonType } from '../ButtonType/ButtonType'
import { DialogLogin } from './DialogLogin'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from 'hookrouter'
import { login, logout } from '../../Redux/Actions'

export const StartPage = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const [cookies, setCookie] = useCookies(['email', 'token', 'name', 'userType', 'route'])
    const _dispatch = useDispatch()

    const openModal = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

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
        checkCookies()
    }, [])

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

    return <WrapperMainPage>
        <img style={{width: 300}} src={require('../../images/learnow-icon.png')}></img>
        <WrapperContent>
            <Title> A biofeedback system to improve the learning process </Title>
            <Description> welcome to learnow, A system that monitors measures of attention and meditation, analyzes the metrics, 
                and recommends activities that can improve the level of attention and concentration and bring about an improved learning process
            </Description>
            <ButtonType
            style={{marginTop: '60px', right: 5}}
            onClick={openModal}
            >
            LETS START </ButtonType>
        </WrapperContent>
        <WrapperImg>
            <Img src={require('../../images/BrainWavesIllustrationNeon.jpg')}/>
        </WrapperImg>
        {openDialog ? <DialogLogin closeDialog={handleClose}/> : null}
    </WrapperMainPage>    
}