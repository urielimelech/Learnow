import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'

import { feedbackStyle } from './FeedbackStyle'
import { CardComponent } from '../CardComponent'
import { navigate } from 'hookrouter'
import { chooseActivity } from '../../Redux/Actions'
import { Loading } from '../Loading'
import { socketToWebServer } from '../../SocketIoClient'

export const Feedback = () => {
    const weights = [1, 2, 3]

    const activitiesCards = useSelector(state => state.MainReducer.activitiesCards)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const [allComparisonData, setAllComparisonData] = useState(null)
    const [howHelpfull, setHowHelpfull] = useState([])
    const [sumImprovment, setSumImprovment] = useState([])
    const [cards, setCards] = useState(null)
    const [displayRecommendation, setDisplayRecommendation] = useState([])
    const [displayIndex, setDisplayIndex] = useState(3)

    const _dispatch = useDispatch()

    const definePriorityActivity = () => {
        console.log({sumImprovment})
        const priorityActivity = sumImprovment.map(elem => {
            return {activity: elem.activity, sum: elem.low * weights[0] + elem.medium * weights[1] + elem.high * weights[2]}
        })
        priorityActivity.sort((a, b) => {
            return b.sum - a.sum
        })

        const cards = renderCards(activitiesCards)
        cards.sort((a, b)=> {
            for (let i = 0; i < priorityActivity.length; i++) {
                if (priorityActivity[i].activity === a.key)
                    return -1
                else if (priorityActivity[i].activity === b.key)
                    return 1
            }
        })
        setCards(cards)
    }

    useEffect(()=>{
        console.log(displayRecommendation)
    },[displayRecommendation])

    useEffect(() => {
        console.log({cards})
        if(cards){
            setDisplayRecommendation([])
            for(let i = displayIndex - 3 ; i < displayIndex ; i++){
                setDisplayRecommendation(prev => [...prev, cards[i]])
            }
            // on click more button, do this set => setDisplayIndex(displayIndex+3)
        }
    },[cards])

    useEffect(() => {
        console.log(sumImprovment)
        if (sumImprovment.length > 0) {
            definePriorityActivity() 
        }
    },[sumImprovment])

    useEffect(() =>{
        if(howHelpfull.length > 0){
            sumImprovementForEachActivity()
        }
        else if (activitiesCards){
            setCards(renderCards(activitiesCards))
        }
    },[howHelpfull])

    useEffect(() => {
        if(allComparisonData && howHelpfull.length === 0){
            sumImprovementForEachComparationSession()
        }
    },[allComparisonData])

    useEffect(() => {
        socketToWebServer.on('all comparison', (data) => {
            console.log({data})
            if (data === null) {
                setCards(renderCards(activitiesCards))
            }
            else {
                setAllComparisonData(data)
            }
        })
        displayCards()
        return () => socketToWebServer.off('all comparison')
    },[])

    /** return true if activity already exists in array */
    const activityExist = (arr, activity) => {
        return arr.some(e => {
            return e.activity === activity
        })
    }
    
    /** sum improvement of each comparation between sessions */
    const sumImprovementForEachComparationSession = () => {
        allComparisonData.forEach(element => {
            if(element.activity[1] !== 'None') {
                const how_helpfull = {
                    activity: element.activity[1],
                    help: {
                        low: 0,
                        medium: 0,
                        high: 0
                    }
                }
                Object.values(element.comparisonData).forEach(value => {
                    switch (value) {
                        case 'low':
                            const low = how_helpfull.help.low + 1 
                            how_helpfull.help.low = low
                            break
                        case 'medium':
                            const medium = how_helpfull.help.medium + 1 
                            how_helpfull.help.medium = medium
                            break
                        case 'high':
                            const high = how_helpfull.help.high + 1 
                            how_helpfull.help.high = high
                            break
                        default:
                            break;
                    }
                })
                setHowHelpfull(prev => [...prev, how_helpfull])
                console.log(how_helpfull)
            }
        })
    }

    /** sum improvement of each type of activity */
    const sumImprovementForEachActivity = () => {
        console.log(howHelpfull)
        var tempArray = []
        howHelpfull.forEach(element => {
            if (tempArray.length > 0){
                tempArray.forEach((elem, index) => {
                    if (element.activity === elem.activity){
                        tempArray[index] = {
                            low: elem.low + element.help.low,
                            medium: elem.medium + element.help.medium, 
                            high: elem.high + element.help.high, 
                            activity: element.activity
                        }
                    }
                    else if(!activityExist(tempArray, element.activity)){
                        tempArray.push({
                            low: element.help.low, 
                            medium: element.help.medium, 
                            high: element.help.high, 
                            activity: element.activity
                        })
                    }
                })
            }
            else{
                tempArray.push({
                    low: element.help.low, 
                    medium: element.help.medium, 
                    high: element.help.high, 
                    activity: element.activity
                })
            }
        })
        setSumImprovment(tempArray)
    }

    const imgCard = img => {
        return require(`../../images/${img}.png`)
    }

    const displayCards = () => {
        socketToWebServer.emit('get all comparison', loggedUser.email)
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
                    key={e.Title}
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
                {displayRecommendation ? displayRecommendation : <Loading/>}
            </div>
        </div>
    )
}