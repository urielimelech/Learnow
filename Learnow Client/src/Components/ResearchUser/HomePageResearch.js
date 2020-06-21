import React, { useEffect, useState } from 'react'
import { CardComponent } from '../CardComponent'
import { socketToWebServer } from '../../SocketIoClient'
import { useDispatch, useSelector } from 'react-redux'
import { setActivitiesCards, updateStudentForResearch, updateFitContent, updateUserCards } from '../../Redux/Actions'
import axios from 'axios'
import { dbURL } from '../../consts'
import { StyledCardComponent } from './ResearchUserStyle'
import { navigate } from 'hookrouter'

export const HomePageResearch = ({data}) => {

    const _dispatch = useDispatch()
    const [studentsData, setStudentsData] = useState([])
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)
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
        getAllStudents()
    },[])

    const getStudentData = (email) => {
        axios.get(`${dbURL}/getStudentData?email=${email}`)
        .then(res => {
            _dispatch(updateStudentForResearch(res.data))

            socketToWebServer.emit('get suggestions cards', email)
            socketToWebServer.on('suggestions cards', data => {
                _dispatch(setActivitiesCards(data))
            })
            // setStudentForResearch(<HomePageResearch data={res.data}/>)
        })
        .catch(err => {
            console.log({err})
            // setIsUserExistsErr(<TextMessageToastify msg={'user is not exists'}/>)
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
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 20}}>
             {userCards ? renderResearcherComponentsCards(userCards) : renderResearcherComponentsCards()}
        </div>
    )
}