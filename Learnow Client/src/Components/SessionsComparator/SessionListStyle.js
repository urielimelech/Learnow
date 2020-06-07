import styled from 'styled-components'

export const StyledSessionListContainer = styled.div`
display: flex;
width: 70%;
justify-content: center;
margin: 0 auto;
flex-flow: row wrap;
`

export const StyledCardComponent = {
    Card: {
        width: 300,
        marginRight: 30,
        marginBottom: 30,
        height: 200,
        transition: 'height 0.5s'
    },
    CardContent: {
        textAlign: 'center'
    }
}

export const StyledButtonContainer = styled.div`
flex: 0 1 100%;
text-align: center;
margin: 30px 0px;
`