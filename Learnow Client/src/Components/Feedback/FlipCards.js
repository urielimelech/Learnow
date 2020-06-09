import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { navigate } from 'hookrouter'
import { chooseActivity, updateFitContent } from '../../Redux/Actions'
import { WINDOW_WIDTH } from '../../consts'
import { FlipCard } from './FlipCard'
import { feedbackStyle } from './FeedbackStyle'
import { Loading } from '../Loading'

export const FlipCards = ({sumImprovment = null}) => {

    const weights = [1, 2, 3]
    const _dispatch = useDispatch()

    const [cards, setCards] = useState(null)
    const [displayIndex, setDisplayIndex] = useState(3)
    const [disableMore, setDisableMore] = useState(false)
    const [displayRecommendation, setDisplayRecommendation] = useState([])
    const [priority, setPriority] = useState([])

    const activitiesCards = useSelector(state => state.MainReducer.activitiesCards)

    useEffect(() => {
        if (sumImprovment) 
            definePriorityActivity()
        else if(activitiesCards) 
            setCards(renderCards(activitiesCards))
    },[])

    useEffect(() => {
        if(cards && displayIndex >= 3){
            for(let i = displayIndex - 3 ; i < displayIndex ; i++){
                setDisplayRecommendation(prev => [...prev, cards[i]])
                _dispatch(updateFitContent(true))
            }
        }
        if(cards && displayIndex > cards.length)
            setDisableMore(true)
    },[cards, displayIndex])

    useEffect(() => {
        if (priority.length > 0) {
            const card = renderCards(activitiesCards)
            card.sort((a, b)=> {
                for (let i = 0; i < priority.length; i++) {
                    if (priority[i].activity.trim() === a.key)
                        return -1
                    else if (priority[i].activity.trim() === b.key)
                        return 1
                }
            })
            setCards(card)
        }
    },[priority])

    const definePriorityActivity = () => {
        const priorityActivity = sumImprovment.map(elem => {
            return {activity: elem.activity, sum: elem.low * weights[0] + elem.medium * weights[1] + elem.high * weights[2]}
        })
        priorityActivity.sort((a, b) => {
            return b.sum - a.sum
        })
        setPriority(priorityActivity)
    }

    const imgCard = img => {
        return require(`../../images/${img}.png`)
    }

    const loadMore = () => {
        if(displayIndex <= cards.length)
            setDisplayIndex(displayIndex+3)
    }

    const checkRibbon = (title) => {
        for (let i = 0; i < priority.length; i++) {
            if (priority[i].activity.trim() === title) {
                switch (i) {
                    case 0:
                        return require('../../images/first.png')
                    case 1:
                        return require('../../images/second.png')
                    case 2:
                        return require('../../images/third.png')
                    default:
                        return require('../../images/ribbon.png')
                }
            }
        }
        return null
    }

    const renderCards = groupCards => {
        return groupCards.map((e, index) => {
            const img = imgCard(e.ImgCard)
            const ribbon = checkRibbon(e.Title)
            const selectActivity = () => {
                _dispatch(chooseActivity(e.Title))
                navigate('/Home')
            }
            return (
                <FlipCard
                    key={e.Title}
                    title={e.TitleCard}
                    img={img}
                    onPressSelect={selectActivity}
                    description={e.DescriptionCard}
                    link={e.Link}
                    ribbon={ribbon}
                />
            )
        })
    }

    return activitiesCards ? 
        <div style={{width: WINDOW_WIDTH*0.8, textAlign:' center', margin: '0 auto'}}>
            <div style={{justifyContent: 'center', display:'flex', flexWrap: 'wrap'}}>
                {displayRecommendation ? displayRecommendation : <Loading/>}
            </div>
            <Button style ={feedbackStyle.buttonStyle} disabled={disableMore} onClick = {loadMore}>LOAD MORE</Button>
        </div>
            :
            <Loading/>
}