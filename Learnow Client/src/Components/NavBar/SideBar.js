import React from 'react'
import { UserSideBar } from './UserSideBar'
import { IconSideBar } from './IconSideBar'
import { StyledSideBar } from './StyledSideBar'

export const SideBar = ({isDisplay}) => {

    return (
        <StyledSideBar isDisplay={isDisplay}>
            {isDisplay ? <UserSideBar/> : <IconSideBar/>}
        </StyledSideBar>
    )
}