import React, { useEffect, useState } from 'react'
import { UserSideBar } from './UserSideBar'
import { IconSideBar } from './IconSideBar'
import { StyledSideBar } from './StyledSideBar'
import { useSelector, useDispatch } from 'react-redux'
import { updateFitContent, updateWindowHeight } from '../../Redux/Actions'

export const SideBar = ({isDisplay}) => {

    const _dispatch = useDispatch()

    const [content, setContent] = useState(null)

    const fitContent = useSelector(state => state.MainReducer.fitContent)
    const windowHeight = useSelector(state => state.MainReducer.windowHeight)

    useEffect(() => {
        setContent(document.getElementById('nav'))
    },[])

    useEffect(() => {
        if (fitContent){
            _dispatch(updateWindowHeight(content.clientHeight))
            _dispatch(updateFitContent(false))
        }
    },[fitContent])

    /** update content height */
    // useEffect(() => {
    //     if (content && windowHeight !== content.clientHeight)
    //         _dispatch(updateWindowHeight(content.clientHeight))
    // },[windowHeight])

    return (
        <StyledSideBar isDisplay={isDisplay} height={windowHeight}>
            {isDisplay ? <UserSideBar/> : <IconSideBar/>}
        </StyledSideBar>
    )
}