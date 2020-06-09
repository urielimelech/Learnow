import styled from 'styled-components'

export const feedbackStyle = {
    buttonStyle : {
        width: '50px',
        marginBottom:'10px',
        backgroundColor: '#39C0BA',
        color: '#ffffff',
    }
}

export const StyledCardFeedback = styled.div`
background-color: #8DD4D2;
border-radius: 10px;
border: 2px solid #4CC6C4;
height: 300px;
width: 320px;
margin: 20px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`

export const StyledImg = styled.img`
object-fit: contain;
height: ${props => props.height ? props.height : 150}px;
width: ${props => props.width ? props.width : 150}px;
align-self: center;
`

export const StyledFlipImg = styled.img`
object-fit: contain;
height: 100px;
width: 100px;
align-self: center;
`

export const StyledTitleFlipCard = styled.div`
display: flex;
width: 100%;
align-items: center;
justify-content: space-evenly;
`