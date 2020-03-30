import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { CardStyle, CardImgStyle, CardTitleStyle, CardTextStyle, CardLinkStyle, FeedbackComponent, CardsContainer } from './FeedbackStyle'

export const Feedback = () => {

    const [groupCard, setGroupCard] = useState([])

    const roomNumber = useSelector(state => state.MainReducer.roomNumber)

    useEffect(()=>{
        socketToWebServer.emit('get suggestions cards', roomNumber)
        // socketToWebServer.emit('get suggestions cards', )
        socketToWebServer.on('suggestions cards', data => {
            setGroupCard(data)
        })
    },[])


    const renderCards = groupCards => {
        return groupCards.map(e => {
            return (
                <Card style={CardStyle} key={e.CardNumber}>
                    <Card.Img variant="top" src={e.ImgCard} style={CardImgStyle}/>
                    <Card.Body>
                        <Card.Title style={CardTitleStyle}>{e.TitleCard}</Card.Title>
                        <Card.Text style={CardTextStyle}>{e.DescriptionCard}</Card.Text>
                        <Card.Link style={CardLinkStyle} href={e.Link}>{e.LinkDescription}</Card.Link>
                        <Button  variant="primary">Select This Activity</Button>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
        <div style={FeedbackComponent}>
            Hi now you finish session and you need to take a break and do one of the activities
            <div style={CardsContainer}>
                {groupCard.length !== 0 ? renderCards(groupCard) : <div>loading cards</div>}
            </div>
        </div>
    )
}