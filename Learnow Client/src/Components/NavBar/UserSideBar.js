import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'hookrouter'
import { StyledLogoButton, SideBarButtonsContainer, StyledUserSideBar, StyledSideBarButton } from './StyledSideBar'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import EventNoteIcon from '@material-ui/icons/EventNote'
import HistoryIcon from '@material-ui/icons/History'
import StarsIcon from '@material-ui/icons/Stars'
import BallotIcon from '@material-ui/icons/Ballot'
import SettingsIcon from '@material-ui/icons/Settings'
import { TextType } from '../TextType/TextType'

export const UserSideBar = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)
    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)
    const iconColor = {color: '#dddddd'}
    const [navCatagory, setNavCatagory] = useState(null)
    const chosenNavButtonColor = '#35C2C0'

    return (
        <StyledUserSideBar>
            <StyledLogoButton 
                onClick={() =>{ 
                    setNavCatagory('Home')
                    navigate('/Home')
                }} 
                style={{alignSelf:'center'}}>
                    <img src={require('../../images/learnow-icon.png')}/>
            </StyledLogoButton>
            {loggedUser.userType ? 
                <StyledLogoButton style={{height: '5rem', width: '5rem', display: 'flex', alignSelf: 'center', marginTop: '2rem'}} onClick={() => navigate('/Home')}>
                    {loggedUser.userType === 'student' ? 
                    <div>
                        <img style={{width: '5rem', height: '5rem'}} src={require('../../images/studenticon.png')}/>
                        <TextType style={{color: '#ffffff', width: 280, padding: 7}}> Welcome {loggedUser.name}</TextType>
                    </div> 
                    :
                    <div>
                        <img style={{width: '5rem', height: '5rem'}} src={require('../../images/researchericon.png')}/>
                        <TextType style={{color: '#ffffff', width: 280, padding: 7}}> Welcome {loggedUser.name}</TextType>
                    </div>
                        
                    }
                </StyledLogoButton> 
            : 
                null}
            {loggedUser.userType === 'student' ? 
                <SideBarButtonsContainer isUserConnected={loggedUser.userType ? true : false}>
                    <StyledSideBarButton 
                        style={{
                            color: '#dddddd',
                            justifyContent: 'space-between',
                            backgroundColor: navCatagory === 'Results' ? chosenNavButtonColor : null
                        }} 
                        onClick={() => {
                            setNavCatagory('Results')
                            navigate('/Results')
                        }}>
                        <TextType>Session Results</TextType>
                        <EqualizerIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                    <StyledSideBarButton 
                        style={{
                            color: '#dddddd', 
                            justifyContent: 'space-between', 
                            backgroundColor: navCatagory === 'Recommendations' ? chosenNavButtonColor : null
                        }} 
                        onClick={() => {
                            setNavCatagory('Recommendations')
                            navigate('/Recommendations')
                        }}>
                        <TextType>Effective Recommendations</TextType>
                        <EventNoteIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                    <StyledSideBarButton 
                        style={{
                            color: '#dddddd', 
                            justifyContent: 'space-between',
                            backgroundColor: navCatagory === 'History' ? chosenNavButtonColor : null
                        }} 
                        onClick={() => {
                            setNavCatagory('History')
                            navigate('/History')
                        }}>
                        <TextType>Sessions History</TextType>
                        <HistoryIcon style={iconColor} fontSize='large'/>
                    </StyledSideBarButton>
                </SideBarButtonsContainer>
            :
                loggedUser.userType === 'researcher' ?
                studentForResearch ? 
                    <SideBarButtonsContainer isUserConnected={loggedUser.userType ? true : false}>
                        <StyledSideBarButton 
                            style={{
                                color: '#dddddd', 
                                justifyContent: 'space-between',
                                backgroundColor: navCatagory === 'Results' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('Results')
                                navigate('/Results')
                            }}>
                            <TextType>Session Results</TextType>
                            <EqualizerIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton 
                            style={{
                                color: '#dddddd', 
                                justifyContent: 'space-between',
                                backgroundColor: navCatagory === 'Recommendations' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('Recommendations')
                                navigate('/Recommendations')
                            }}>
                            <TextType>Recommendations</TextType>
                            <EventNoteIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton 
                            style={{
                                color: '#dddddd', 
                                justifyContent: 'space-between',
                                backgroundColor: navCatagory === 'EffetiveRecommendations' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('EffetiveRecommendations')
                                navigate('/EffetiveRecommendations')
                            }}>
                            <TextType>Effective Recommendations</TextType>
                            <StarsIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        {!lastSessionData.isBroken ?
                            <StyledSideBarButton 
                                style={{
                                    color: '#dddddd', 
                                    justifyContent: 'space-between',
                                    backgroundColor: navCatagory === 'EducationalActivity' ? chosenNavButtonColor : null
                                }} 
                                onClick={() => {
                                    setNavCatagory('EducationalActivity')
                                    navigate('/EducationalActivity')
                                }}>
                                <TextType>Session Educational Activity</TextType>
                                <BallotIcon style={iconColor} fontSize='large'/>
                            </StyledSideBarButton>
                            :
                            null}
                        <StyledSideBarButton 
                            style={{
                                color: '#dddddd', 
                                justifyContent: 'space-between',
                                backgroundColor: navCatagory === 'History' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('History')
                                navigate('/History')
                            }}>
                            <TextType>Sessions History</TextType>
                            <HistoryIcon style={iconColor} fontSize='large'/>
                        </StyledSideBarButton>
                        <StyledSideBarButton 
                            style={{
                                color: '#dddddd', 
                                justifyContent: 'space-between',
                                backgroundColor: navCatagory === 'Configuration' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('Configuration')
                                navigate('/Configuration')
                            }}>
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