import React, { useState, useEffect } from 'react'
import { elastic as Menu } from 'react-burger-menu'
// import BurgerMenu from 'react-burger-menu'
import {BurgerNavStyles} from './BurgerNavStyle'
import { navigate, useRoutes } from 'hookrouter'
import routes from '../../routes'
import { useSelector } from 'react-redux'
// import Routes from '../../routes'


export const  BurgerNav = ({page}) => {
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const [showBurgerNav, setShowBurgerNav] = useState(false)
    const [hoverStyle, setHoverStyle] = useState(null)
 
    const onClick = (e, route) => {
        e.preventDefault()
        navigate(route)
        // setHoverStyle(({color:'pink'}))
    }

    // useEffect(() => {
    //     setHoverStyle(({color:'pink'}))
    // },[hoverStyle])

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
                    <img style={{height: '100px', width: '100px', marginBottom: '50px'}} src={require('../../images/learnowIcon.png')}/>
                    <div style= {{marginBottom: '30px', color: '#0ce9ed'}}>Welcome {loggedUser.name}</div>
                    <img src={require('../../images/results.png')}  style={{height: '60px', width: '60px'}}/><a href="/Results" onClick={(e) => onClick(e, '/Results')}>Your Results</a>
                    <a href="/Recommendations" onClick={(e) => onClick(e, '/Recommendations')}>Recommendations</a>
                    <a href="/SessionsComparator" onClick={(e) => onClick(e, '/SessionsComparator')}>Session Comparator</a>
                    <a href="/Configuration" onClick={(e) => onClick(e, '/Configuration')}>Configuration</a>
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
