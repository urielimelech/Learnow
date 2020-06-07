import React from 'react'
import { CardComponent } from '../CardComponent'
import { Typography } from '@material-ui/core'
import { researcherComponents } from './ResearcherComponentsDetails'
import { navigate } from 'hookrouter'

export const ResearchStudent = () => {
  
    const detailText =<div>
        <Typography variant="body2" color="textSecondary" component="p">
            user type: {data.userType}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            user email: {data.email}
        </Typography>
    </div>


    const renderResearcherComponentsCards = () => {
        return researcherComponents.map((elem, index) => {

            const onCardClick = () => navigate(elem.route)
            return <CardComponent key={index} headerText={elem.title} detailText={elem.details} img={elem.img} onClickCard={onCardClick}/>
        }
    )}

    return (
        <div>
            <CardComponent 
                headerText={data.name}
                detailText={detailText}
                img={require('../../images/student_user.png')}
            />
            {renderResearcherComponentsCards()}
        </div>
    )
}