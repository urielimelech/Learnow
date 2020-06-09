import React, { useState, useEffect } from 'react'
import { WrapperStartPage, WrapperContent, WrapperImg, Img, Title, Description, LogoStartPage } from './StartPageStyle'
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
    const windowHeight = useSelector(state => state.MainReducer.windowHeight)

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

    return <WrapperStartPage height={windowHeight}>
        <LogoStartPage src={require('../../images/learnow-icon.png')}/>
        <WrapperContent>
            <Title> A biofeedback system to improve the learning process </Title>
            <Description> Welcome to learnow, A system that monitor and measures the attention and the meditation level, analyzes the metrics
                and recommends activities that can improve the level of attention and meditation to acheive an improved learning process
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
    </WrapperStartPage>    
}