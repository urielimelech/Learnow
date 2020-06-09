import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'hookrouter'
import { StyledLogoButton, SideBarButtonsContainer, StyledUserSideBar, StyledSideBarButton } from './StyledSideBar'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import EventNoteIcon from '@material-ui/icons/EventNote'
import HistoryIcon from '@material-ui/icons/History'
import StarsIcon from '@material-ui/icons/Stars'
import BallotIcon from '@material-ui/icons/Ballot'
import SettingsIcon from '@material-ui/icons/Settings'

export const UserSideBar = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const iconColor = {color: '#dddddd'}

    return (
        <StyledUserSideBar>
            <StyledLogoButton onClick={() => navigate('/Home')} style={{alignSelf:'center'}}>
                <img src={require('../../images/learnow-icon.png')}/>
            </StyledLogoButton>
            {loggedUser.userType ? 
                <StyledLogoButton style={{height: '10rem', width: '10rem', display: 'flex', alignSelf: 'center', marginTop: '2rem'}} onClick={() => navigate('/Home')}>
                    {loggedUser.userType === 'student' ? 
                        <img style={{width: '10rem', height: '10rem'}} src={require('../../images/student_img.png')}/>
                    :
                        <img style={{width: '10rem', height: '10rem'}} src={require('../../images/human-resources.png')}/>
                    }
                </StyledLogoButton> 
            : 
                null}
            {loggedUser.userType === 'student' ? 
                <SideBarButtonsContainer isUserConnected={loggedUser.userType ? true : false}>
                    <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Results')}>
                        Session Results
                        <TrendingUpIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                    <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Recommendations')}>
                        Effective Recommendations
                        <EventNoteIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                    <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/History')}>
                        Sessions History
                        <HistoryIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                </SideBarButtonsContainer>
            :
                loggedUser.userType === 'researcher' ?
                    <SideBarButtonsContainer isUserConnected={loggedUser.userType ? true : false}>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Results')}>
                            Session Results
                            <TrendingUpIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Recommendations')}>
                            Recommendations
                            <EventNoteIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/EffetiveRecommendations')}>
                            Effective Recommendations
                            <StarsIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/EducationalActivity')}>
                            Session Educational Activity
                            <BallotIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/History')}>
                            Sessions History
                            <HistoryIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Configuration')}>
                            User Settings
                            <SettingsIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                    </SideBarButtonsContainer>
                :    
                    null}
        </StyledUserSideBar>
    )
}