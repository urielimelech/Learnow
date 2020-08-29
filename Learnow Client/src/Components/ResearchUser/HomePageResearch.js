import React, { useEffect, useState } from 'react'
import { CardComponent } from '../CardComponent'
import { socketToWebServer } from '../../SocketIoClient'
import { useDispatch, useSelector } from 'react-redux'
import { setActivitiesCards, updateStudentForResearch, updateFitContent, updateUserCards, setSearching } from '../../Redux/Actions'
import axios from 'axios'
import { dbURL } from '../../consts'
import { StyledCardComponent } from './ResearchUserStyle'
import { navigate } from 'hookrouter'
import { WrapperHomePageResearcher } from './HomePageResearchStyle'

export const HomePageResearch = () => {

    const _dispatch = useDispatch()
    const [studentsData, setStudentsData] = useState([])
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)
    const isSearching = useSelector(state => state.MainReducer.isSearching)
    const userCards = useSelector(state =>  state.MainReducer.userCards )

    const getAllStudents = () => {
       axios.get(`${dbURL}/getAllStudents`)
       .then(res => {
            setStudentsData(res.data)
            _dispatch(updateUserCards(res.data)) 
            _dispatch(updateFitContent(true))
        })
        .catch(err => {
            console.log({err})
        })
    }

    useEffect(() => {
        if(studentForResearch)
            navigate('/History')
    },[studentForResearch])

    useEffect(()=> {
        if(!isSearching)
            getAllStudents()
        else
            _dispatch(setSearching(false))
    },[])

    const getStudentData = (email) => {
        axios.get(`${dbURL}/getStudentData?email=${email}`)
        .then(res => {
            _dispatch(updateStudentForResearch(res.data))

            socketToWebServer.emit('get suggestions cards', email)
            socketToWebServer.on('suggestions cards', data => {
                _dispatch(setActivitiesCards(data))
            })
        })
        .catch(err => {
            console.log({err})
        })
    }

    const createUserCards = cards => {
        return cards.map((elem, index) => {
                const onCardClick = () => {
                    getStudentData(elem.email)
                } 
                return <CardComponent key={index} headerText={elem.name} detailText={elem.email} style={StyledCardComponent} img={require('../../images/user.png')} onClickCard={onCardClick}/>
            })
    }

    const renderResearcherComponentsCards = (userCards=null) => {
            if (userCards) {
                return createUserCards(userCards)
            }
            else {
                return createUserCards(studentsData)
            }
    }

    return (
        <div style={WrapperHomePageResearcher}>
             {userCards ? renderResearcherComponentsCards(userCards) : renderResearcherComponentsCards()}
        </div>
    )
}