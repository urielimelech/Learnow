import React, { useState, useEffect } from 'react'
import { elastic as Menu } from 'react-burger-menu'
import {BurgerNavStyles} from './BurgerNavStyle'
import { navigate } from 'hookrouter'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'

export const  BurgerNav = ({page}) => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const [cookies, setCookie, removeCookie] = useCookies(['email', 'token', 'name', 'userType', 'route'])

    const [showBurgerNav, setShowBurgerNav] = useState(false)
    const onClick = (e, route) => {
        e.preventDefault()
        navigate(route)
    }

    const logoutUser = () => {
        Object.keys(cookies).forEach(cookie => {
            removeCookie(cookie)
        })
    }

    useEffect(() => {
        if(Object.keys(loggedUser).length === 0) 
            setShowBurgerNav(false)
        else
            setShowBurgerNav(true)
    },[loggedUser])

    return (
        <div id={"outer-container"}>
            {showBurgerNav ? 
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } styles = {BurgerNavStyles} >
                    <a href ='/Home' onClick={(e) => onClick(e, '/Home')}><img style={BurgerNavStyles.logoNav} src={require('../../images/learnowIcon.png')}/></a>
                    {loggedUser.userType === 'student' ? 
                            <img style={BurgerNavStyles.imgNav} src={require('../../images/student.png')}></img> 
                        : 
                            <img style={BurgerNavStyles.imgNav} src={require('../../images/research.png')}></img>}
                    <div style={BurgerNavStyles.textNav}> Welcome {loggedUser.name}</div>
                    <a href='/Results' onClick={(e) => onClick(e, '/Results')}>Your Results</a>
                    <a href='/Recommendations' onClick={(e) => onClick(e, '/Recommendations')}>Recommendations</a>
                    <a href='/SessionsComparator' onClick={(e) => onClick(e, '/SessionsComparator')}>Session Comparator</a>
                    <a href='/Configuration' onClick={(e) => onClick(e, '/Configuration')}>Configuration</a>
                    <a href='/' onClick={() => logoutUser()}>Logout</a>
                </Menu> 
            :
                null
            }
            <main id={"page-wrap"}>
                {page}
            </main>
        </div>
      )
}