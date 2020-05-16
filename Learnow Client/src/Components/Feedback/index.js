import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'

import { feedbackStyle } from './FeedbackStyle'
import { CardComponent } from '../CardComponent'
import { navigate } from 'hookrouter'
import { chooseActivity } from '../../Redux/Actions'
import { ExpandButton } from '../CardComponent/ExpandButton'
import { Loading } from '../Loading'

export const Feedback = () => {

    const activitiesCards = useSelector(state => state.MainReducer.activitiesCards)
    const _dispatch = useDispatch()

    const imgCard = img => {
        return require(`../../images/${img}.png`)
    }

    const renderCards = groupCards => {
        return groupCards.map(e => {
            const img = imgCard(e.ImgCard)
            const selectActivity = () => {
                _dispatch(chooseActivity(e.Title))
                navigate('/Home')
            }
            return (
                <CardComponent 
                    key={e.CardNumber} 
                    style ={feedbackStyle} 
                    headerText={e.TitleCard} 
                    buttonText={'Select'} 
                    onClickButton={selectActivity} 
                    img={img}
                    isAbleToExpand={true}
                    expandedText={[e.DescriptionCard, e.Link]}
                />
            )
        })
    }

    return (
        <div style={feedbackStyle.FeedbackComponent}>
            Hi now you finish session and you need to take a break and do one of the activities
            <div style={feedbackStyle.CardsContainer}>
                {activitiesCards.length !== 0 ? renderCards(activitiesCards) : <Loading/>}
            </div>
        </div>
    )
}