import styled from 'styled-components'

export const WrapperCards = styled.div`
display: flex;
width: 80%;
margin: 0 auto;
justify-content: center;
flex-wrap: wrap;
flex-direction: row;
`

export const HomePageCards = styled.div`
padding: 8px;
flex-direction: row;
flex-wrap: wrap;
`
export const StyledCardComponent = {
    Card: {
        width: 400,
        height: 300,
         display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    CardImgStyle:{
        width: 450,
        height: 220
    }
}