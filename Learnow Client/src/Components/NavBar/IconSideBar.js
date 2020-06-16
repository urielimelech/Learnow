import React from 'react'
import { StyledIconSideBar, StyledLogoButton, SideBarButtonsContainer } from './StyledSideBar'
import { navigate } from 'hookrouter'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import EventNoteIcon from '@material-ui/icons/EventNote'
import HistoryIcon from '@material-ui/icons/History'
import StarsIcon from '@material-ui/icons/Stars'
import BallotIcon from '@material-ui/icons/Ballot'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSelector } from 'react-redux'

export const IconSideBar = () => {

    const iconColor = {color: '#dddddd'}
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)

    return (
        <StyledIconSideBar>
            <StyledLogoButton onClick={() => navigate('/Home')}>
                <img style={{width: 60, height: 60}} src={require('../../images/learnowIcon.png')}/>
            </StyledLogoButton>
            {loggedUser.userType === 'student' ? 
                <SideBarButtonsContainer>
                    <StyledLogoButton onClick={() => navigate('/Results')}>
                        <TrendingUpIcon style={iconColor} fontSize='large'/>
                    </StyledLogoButton>
                    <StyledLogoButton onClick={() => navigate('/Recommendations')}>
                        <EventNoteIcon style={iconColor} fontSize='large'/>
                    </StyledLogoButton>
                    <StyledLogoButton onClick={() => navigate('/History')}>
                        <HistoryIcon style={iconColor} fontSize='large'/>
                    </StyledLogoButton>
                </SideBarButtonsContainer>
            :
                loggedUser.userType === 'researcher' ? 
                studentForResearch ?
                    <SideBarButtonsContainer>
                        <StyledLogoButton onClick={() => navigate('/Results')}>
                            <TrendingUpIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton onClick={() => navigate('/Recommendations')}>
                            <EventNoteIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton onClick={() => navigate('/EffetiveRecommendations')}>
                            <StarsIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton onClick={() => navigate('/EducationalActivity')}>
                            <BallotIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton onClick={() => navigate('/History')}>
                            <HistoryIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton onClick={() => navigate('/Configuration')}>
                            <SettingsIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                    </SideBarButtonsContainer>
                : 
                    null
                :
                null
                }
        </StyledIconSideBar>
    ) 
}