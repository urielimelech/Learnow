import React from 'react'
import { CardComponent } from '../CardComponent'
import { Typography } from '@material-ui/core'
import { StyledCardComponent } from '../SessionsComparator/SessionListStyle'

export const SessionsList = ({userSessions, onSelect=null}) => {

    const getExactTime = date => {
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
        return `${hours}:${minutes}:${seconds}`
    }

    const renderSessionsCards = () => {
        userSessions.sort((a, b) => a.startTimeStamp > b.startTimeStamp ? 1 : -1)
        return userSessions.map((session, index) => {
            const date = new Date(session.startTimeStamp)
            const time = getExactTime(date)
            const activity = session.activity
            const headerText = `Session number ${index + 1}`
            const detailText = 
                <div>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Date Of Session: {date.toDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Start Time Of Session: {time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Activity: {activity}
                    </Typography>
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