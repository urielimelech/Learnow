import React, { useEffect } from 'react'
import { CardComponent } from '../CardComponent'
import { Typography } from '@material-ui/core'
import { researcherComponents } from './ResearcherComponentsDetails'
import { navigate } from 'hookrouter'
import { socketToWebServer } from '../../SocketIoClient'
import { useDispatch } from 'react-redux'
import { setActivitiesCards } from '../../Redux/Actions'

export const HomePageResearch = ({data}) => {

    const _dispatch = useDispatch()

    const detailText =<div>
        <Typography variant="body2" color="textSecondary" component="p">
            user type: {data.userType}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            user email: {data.email}
        </Typography>
    </div>

    useEffect(() => {
        socketToWebServer.emit('get suggestions cards', data.email)
        socketToWebServer.on('suggestions cards', data => {
            _dispatch(setActivitiesCards(data))
        })
        return () => {
            socketToWebServer.off('suggestions cards')
        }
    },[])

    const renderResearcherComponentsCards = () => {
        return researcherComponents.map((elem, index) => {
            const onCardClick = () => navigate(elem.route)
            return <CardComponent key={index} headerText={elem.title} detailText={elem.details} onClickCard={onCardClick}/>
        }
    )}

    return (
        <div>
            <CardComponent 
                headerText={data.name}
                detailText={detailText}
            />
            {renderResearcherComponentsCards()}
        </div>
    )
}