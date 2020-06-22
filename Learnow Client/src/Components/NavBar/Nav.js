import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import { navigate } from 'hookrouter'
import { Button, TextField, FormHelperText } from '@material-ui/core'
import { useCookies } from 'react-cookie'
import StudentIcon from '@material-ui/icons/School'

import { useDispatch, useSelector } from 'react-redux'
import { dbURL } from '../../consts'
import { TextMessageToastify } from '../TextMessageToastify'
import { updateStudentForResearch, updateUserCards } from '../../Redux/Actions'
import { SideBar } from './SideBar'
import { ButtonType } from '../ButtonType/ButtonType'
import { TextType } from '../TextType/TextType'

export const Nav = ({page}) => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const windowWidth = useSelector(state => state.MainReducer.windowWidth)
    const windowHeight = useSelector(state => state.MainReducer.windowHeight)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)
    const userCards = useSelector(state =>  state.MainReducer.userCards )
    const _dispatch = useDispatch()
    
    const [barStyle, setBarStyle] = useState(false)
    const [openBarWidth, setOpenBarWidth] = useState(null)
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [isUserExistsErr, setIsUserExistsErr] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'token', 'name', 'userType', 'route'])

    /** update content height */
    useEffect(() => {
        updatePageWidth()
    },[windowWidth])

    useEffect(() => {
        updatePageWidth()
    },[barStyle])

    const updatePageWidth = () => {
        if (barStyle)
            setOpenBarWidth(windowWidth - 317)
        else
            setOpenBarWidth(windowWidth - 77)
    }

    const logoutUser = () => {
        Object.keys(cookies).forEach(cookie => {
            removeCookie(cookie)
        })
    }

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSumbit = e => {
        e.preventDefault()
        handleClick()
    }

    const getStudentData = () => {
        axios.get(`${dbURL}/getAllStudentsByStartsWith?_email=${email}`)
        .then(res => {
            _dispatch(updateUserCards(res.data))
        })
        .catch(err => {
            console.log({err})
            setIsUserExistsErr(<TextMessageToastify msg={'user is not exists'}/>)
        })
    }

    const handleClick = () => {
        // validateEmail()
        getStudentData()
    }

    const validateEmail = () => { 
        const validEmailRegex = 
        RegExp(/^(([^<>()\],;:\s@]+([^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i)
        if(email.match(validEmailRegex)){
            setError(false)          
        }
        else {
            setError(true)
        }
    }

    return (
        loggedUser.userType ? 
        <div style={{display: 'flex'}}>
            <SideBar isDisplay={barStyle}/>
            <nav id='nav' className="navbar-expand navbar-light" style={barStyle ? {width: openBarWidth, position:'absolute', marginLeft: 300, transition: '1s', backgroundColor: '#F4F6F9'} : {marginLeft: 60, width: openBarWidth, position:'absolute', transition: '1s', backgroundColor: '#F4F6F9'}}>
                <ul className="navbar-nav" style={{borderBottom: '1px solid #dee2e6', width:'100%', display: 'flex', alignItems:'center', flexWrap: 'nowrap', justifyContent:'space-between', height: '4rem', padding: 10}}>
                    <li className="nav-item" style={{display:'flex'}}>
                        <Button className="nav-link" style={{backgroundColor: 'none'}} onClick={() => setBarStyle(!barStyle)}>
                            <MenuIcon style={{color: '#343A40'}}/>
                        </Button>
                        <Button className="nav-link" style={{backgroundColor: 'none'}} onClick={() =>{
                            _dispatch(updateStudentForResearch(null))
                            setBarStyle(false)
                            navigate('/Home')
                            }}>
                            <HomeIcon style={{color: '#343A40'}}/>
                        </Button>
                    </li>
                    {loggedUser.userType === 'researcher' && studentForResearch ? 
                    <div style={{display: 'flex'}}>
                        <StudentIcon/>
                        <TextType header={16} style={{color: '#343A40', paddingLeft: 10}}>Student: {studentForResearch.name}</TextType>
                    </div>
                    :
                        null
                    
                    }
                    {loggedUser.userType === 'researcher' ? 
                    <form onSubmit={handleSumbit} style={{width: '30%', display: 'flex'}}>
                        <TextField 
                            color='primary'
                            style={{width:'70%', border: '1px solid #dee2e6 5px'}}
                            size='small'
                            id="outlined-textarea"
                            label="Search Student Email"
                            placeholder="Search Student Email"
                            variant="outlined"
                            onChange = {handleChange}
                            value={email}
                        />
                        <Button 
                            style={{ border: 'solid 1px #dee2e6',  alignSelf: 'center', marginLeft: 10}}
                            onClick={handleClick}
                            >
                                <SearchIcon/>
                               search
                        </Button>
                        {error ?
                            <FormHelperText
                                style={{textAlign: 'center', color:'#FF0000'}} 
                                id="component-error-text"
                            >
                                Invalid Email
                            </FormHelperText>
                            :
                            null
                        }
                        {isUserExistsErr}
                    </form>
                    :
                    null}
                    <ButtonType onClick={() =>{
                        logoutUser()
                        window.location.reload(false)
                    } 
                    }>LOGOUT</ButtonType>
                </ul>
                {/* <div style={{backgroundColor: '#F4F6F9', minHeight: windowHeight-64, height: '100%'}}> */}
                <div style={{ backgroundColor: '#ffffff', minHeight: windowHeight-64, height: '100%'}}>
                    {page} 
                </div>
                   
            </nav>
        </div>
        :
        page
    )
}