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
import { TextType } from '../TextType/TextType'

export const UserSideBar = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)
    const iconColor = {color: '#dddddd'}

    return (
        <StyledUserSideBar>
            <StyledLogoButton onClick={() => navigate('/Home')} style={{alignSelf:'center'}}>
                <img src={require('../../images/learnow-icon.png')}/>
            </StyledLogoButton>
            {loggedUser.userType ? 
                <StyledLogoButton style={{height: '10rem', width: '10rem', display: 'flex', alignSelf: 'center', marginTop: '2rem'}} onClick={() => navigate('/Home')}>
                    {loggedUser.userType === 'student' ? 
                    <div>
                        <img style={{width: '10rem', height: '10rem'}} src={require('../../images/student_img.png')}/>
                        <TextType style={{color: '#ffffff', width: 280, padding: 7}}> Welcome {loggedUser.name}</TextType>
                    </div> 
                    :
                    <div>
                        <img style={{width: '10rem', height: '10rem'}} src={require('../../images/human-resources.png')}/>
                        <TextType style={{color: '#ffffff', width: 280, padding: 7}}> Welcome {loggedUser.name}</TextType>
                    </div>
                        
                    }
                </StyledLogoButton> 
            : 
                null}
            {loggedUser.userType === 'student' ? 
                <SideBarButtonsContainer isUserConnected={loggedUser.userType ? true : false}>
                    <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Results')}>
                        <TextType>Session Results</TextType>
                        <TrendingUpIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                    <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Recommendations')}>
                        <TextType>Effective Recommendations</TextType>
                        <EventNoteIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                    <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/History')}>
                        <TextType>Sessions History</TextType>
                        <HistoryIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                </SideBarButtonsContainer>
            :
                loggedUser.userType === 'researcher' ?
                studentForResearch ? 
                    <SideBarButtonsContainer isUserConnected={loggedUser.userType ? true : false}>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Results')}>
                            <TextType>Session Results</TextType>
                            <TrendingUpIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Recommendations')}>
                            <TextType>Recommendations</TextType>
                            <EventNoteIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/EffetiveRecommendations')}>
                            <TextType>Effective Recommendations</TextType>
                            <StarsIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/EducationalActivity')}>
                            <TextType>Session Educational Activity</TextType>
                            <BallotIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/History')}>
                            <TextType>Sessions History</TextType>
                            <HistoryIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton style={{color: '#dddddd', justifyContent: 'space-between'}} onClick={() => navigate('/Configuration')}>
                            <TextType>User Settings</TextType>
                            <SettingsIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                    </SideBarButtonsContainer>
                :    
                    null
                :
                null
                }
        </StyledUserSideBar>
    )
}