import React from 'react'
import { CardComponent } from '../CardComponent'
import { StyledCardComponent } from '../SessionsComparator/SessionListStyle'
import { TextType } from '../TextType/TextType'
import BrokenImageIcon from '@material-ui/icons/BrokenImage'

export const SessionsList = ({userSessions, onSelect=null}) => {

    const getExactTime = date => {
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
        return `${hours}:${minutes}:${seconds}`
    }

    const renderSessionsCards = () => {
        userSessions.sort((a, b) => a.startTimeStamp < b.startTimeStamp ? 1 : -1)
        return userSessions.map((session, index) => {
            const date = new Date(session.startTimeStamp)
            const time = getExactTime(date)
            const activity = session.activity
            const isBroken = session.isBroken
            const headerText = <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                    <TextType>Session number {userSessions.length - index}</TextType>
                    {isBroken ? <BrokenImageIcon style={{marginLeft: 20, marginTop: 3}}/> : null}
                </div>
            const detailText = 
                <div>
                    <TextType>
                        Date Of Session: {date.toDateString()}
                    </TextType>
                    <TextType>
                        Start Time Of Session: {time}
                    </TextType>
                    <TextType>
                        Activity: {activity}
                    </TextType>
                </div>
            const ButtonText = 'Select Session'
            const onClickButton = () => {
                if (onSelect) 
                    onSelect(session)
            }
            return <CardComponent key={index} headerText={headerText} detailText={detailText} buttonText={ButtonText} onClickButton={onClickButton} style={StyledCardComponent}/>
        })
    }

    return renderSessionsCards()
}