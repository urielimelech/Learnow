import styled from 'styled-components'
import { WINDOW_HEIGHT } from '../../consts'
import { Button } from '@material-ui/core'

export const StyledIconSideBar = styled.div`
display: flex;
position: relative;
flex-direction: column;
flex-wrap: nowrap;
justify-content: flex-start;
width: 100%;
transition: 1s;
align-items: flex-end;
height: 100%;
`

export const SideBarButtonsContainer = styled.div`
display: flex;
flex-direction: column;
margin-top: ${props => props.isUserConnected ? '3' : '15'}rem;
`

export const StyledLogoButton = styled(Button)`
padding: 0px;
background-color: #373a47;
width: 60px;
height: 60px;
`

export const StyledSideBarButton = styled(StyledLogoButton)`
color: #dddddd;
width: 100%;
display: flex;
justify-content: space-between;
`

export const StyledSideBar = styled.div`
background-color: #4b545c;
position: absolute;
left: ${props => props.isDisplay ? 0 : -240}px;
width: 300px;
transition: 1s;
height: ${props => props.height > WINDOW_HEIGHT ? props.height : WINDOW_HEIGHT}px;
z-index: 1;
`

export const StyledUserSideBar = styled.div`
display: flex;
position: relative;
flex-direction: column;
flex-wrap: nowrap;
justify-content: flex-start;
width: 100%;
transition: 1s;
height: ${WINDOW_HEIGHT}px;
`