import React, { useState } from 'react'
import { StyledIconSideBar, StyledLogoButton, SideBarButtonsContainer } from './StyledSideBar'
import { navigate } from 'hookrouter'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import EventNoteIcon from '@material-ui/icons/EventNote'
import HistoryIcon from '@material-ui/icons/History'
import StarsIcon from '@material-ui/icons/Stars'
import BallotIcon from '@material-ui/icons/Ballot'
import SettingsIcon from '@material-ui/icons/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { updateStudentForResearch } from '../../Redux/Actions'

export const IconSideBar = () => {

    const iconColor = {color: '#dddddd'}
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)
    const [navCatagory, setNavCatagory] = useState(null)
    const chosenNavButtonColor = '#35C2C0'
    const _dispatch = useDispatch()

    return (
        <StyledIconSideBar>
            <StyledLogoButton 
                onClick={() =>{ 
                    setNavCatagory('Home')
                    _dispatch(updateStudentForResearch(null))
                    navigate('/Home')
                }}>
                <img style={{width: 60, height: 60}} src={require('../../images/learnowIcon.png')}/>
            </StyledLogoButton>
            {loggedUser.userType === 'student' ? 
                <SideBarButtonsContainer>
                    <StyledLogoButton 
                        style={{
                            backgroundColor: navCatagory === 'Results' ? chosenNavButtonColor : null
                        }}
                        onClick={() => {
                            setNavCatagory('Results')
                            navigate('/Results')
                        }}>
                        <EqualizerIcon style={iconColor} fontSize='large'/>
                    </StyledLogoButton>
                    <StyledLogoButton
                        style={{
                            backgroundColor: navCatagory === 'Recommendations' ? chosenNavButtonColor : null
                        }}
                        onClick={() => {
                            setNavCatagory('Recommendations')
                            navigate('/Recommendations')
                        }}>
                        <EventNoteIcon style={iconColor} fontSize='large'/>
                    </StyledLogoButton>
                    <StyledLogoButton
                        style={{
                            backgroundColor: navCatagory === 'History' ? chosenNavButtonColor : null
                        }} 
                        onClick={() => {
                            setNavCatagory('History')
                            navigate('/History')
                        }}>
                        <HistoryIcon style={iconColor} fontSize='large'/>
                    </StyledLogoButton>
                </SideBarButtonsContainer>
            :
                loggedUser.userType === 'researcher' ? 
                studentForResearch ?
                    <SideBarButtonsContainer>
                        <StyledLogoButton 
                            style={{
                                backgroundColor: navCatagory === 'Results' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('Results')
                                navigate('/Results')
                            }}>
                            <EqualizerIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton 
                            style={{
                                backgroundColor: navCatagory === 'Recommendations' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('Recommendations')
                                navigate('/Recommendations')
                                }}>
                            <EventNoteIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton 
                            style={{
                                backgroundColor: navCatagory === 'EffetiveRecommendations' ? chosenNavButtonColor : null
                            }} 
                            onClick={() => {
                                setNavCatagory('EffetiveRecommendations')
                                navigate('/EffetiveRecommendations')
                            }}>
                            <StarsIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton
                            style={{
                                backgroundColor: navCatagory === 'EducationalActivity' ? chosenNavButtonColor : null
                            }}
                            onClick={() => {
                                setNavCatagory('EducationalActivity')
                                navigate('/EducationalActivity')
                            }}>
                            <BallotIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton 
                            style={{
                                backgroundColor: navCatagory === 'History' ? chosenNavButtonColor : null
                            }}
                            onClick={() => {
                                setNavCatagory('History')
                                navigate('/History')
                            }}>
                            <HistoryIcon style={iconColor} fontSize='large'/>
                        </StyledLogoButton>
                        <StyledLogoButton 
                            style={{
                                backgroundColor: navCatagory === 'Configuration' ? chosenNavButtonColor : null
                            }}
                            onClick={() => {
                                setNavCatagory('Configuration')
                                navigate('/Configuration')
                            }}>
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