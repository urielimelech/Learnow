import React, { useEffect, useState } from 'react'
import { UserSideBar } from './UserSideBar'
import { IconSideBar } from './IconSideBar'
import { StyledSideBar } from './StyledSideBar'
import { useSelector, useDispatch } from 'react-redux'
import { updateFitContent } from '../../Redux/Actions'

export const SideBar = ({isDisplay}) => {

    const _dispatch = useDispatch()

    const [content, setContent] = useState(null)
    const [maxHeight, setMaxHeight] = useState(null)

    const fitContent = useSelector(state => state.MainReducer.fitContent)
    const windowHeight = useSelector(state => state.MainReducer.windowHeight)

    useEffect(() => {
        setContent(document.getElementById('nav').clientHeight)
        _dispatch(updateFitContent(false))
    },[])

    useEffect(() => {
        if (content){
            setMaxHeight(content)
            setContent(document.getElementById('nav').clientHeight)
            _dispatch(updateFitContent(false))
        }
    },[fitContent])

    return (
        <StyledSideBar isDisplay={isDisplay} minHeight={windowHeight} height={maxHeight ? maxHeight : windowHeight}>
            {isDisplay ? <UserSideBar/> : <IconSideBar/>}
        </StyledSideBar>
    )
}