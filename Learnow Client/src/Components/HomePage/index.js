import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivitySelection } from './ActivitySelection'
import { CardComponent } from '../CardComponent'
import { sessionActivity } from '../SessionActivity'
import { navigate } from 'hookrouter'
import { session, chooseActivity } from '../../Redux/Actions/'
import { HomePageCards, WrapperCards } from './HomePageStyle'
import { WINDOW_HEIGHT } from '../../consts'

export const HomePage = () => {
    
    const _dispatch = useDispatch()
    const chosenActivity = useSelector(state=> state.MainReducer.chooseActivity)

    const renderSession =  (sessionActivity) => {
        return sessionActivity.map((element, index) => {
            const startSession = () => {
                if (chosenActivity === null)
                    _dispatch(chooseActivity('None'))
                _dispatch(session(element)) 
                navigate('/Session')
            }
            return <HomePageCards key={index}>
                <CardComponent 
                    headerText={element.quizSummary.quizTitle} 
                    buttonText={"Start"} onClickButton={startSession} img={element.img}
                />
            </HomePageCards>
        })
    }

    return (
        <div style={{height: WINDOW_HEIGHT}}>
            <ActivitySelection/>
            <WrapperCards>{sessionActivity ? renderSession(sessionActivity) : null}</WrapperCards>
        </div>
    )
}