import styled from 'styled-components'
import { Card } from '@material-ui/core'

export const StyledCard = styled(Card)`
&& {
    margin-right: ${props => props.marginr ? props.marginr : null}px;
    margin-top: ${props => props.margint ? props.margint : null}px;
    width: ${props => props.width ? props.width : 400}px;
    border: ${props => props.border ? props.border : null};
    background-color: ${props => props.backgroundcolor ? props.backgroundcolor : null};
}
`

export const StyledButtonContainer = styled.div`
flex: 0 1 100%;
text-align: center;
margin: 30px 0px;
`