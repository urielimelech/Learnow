import styled from 'styled-components'
import { Card } from '@material-ui/core'

export const StyledCard = styled(Card)`
&& {
    margin-right: ${props => props.marginr ? props.marginr : 0}px;
    margin-top: ${props => props.margint ? props.margint : 0}px;
    margin-bottom: ${props => props.marginb ? props.marginb : 0}px;
    margin-left: ${props => props.marginl ? props.marginl : 0}px;
    width: ${props => props.width ? props.width : 400}px;
    height: ${props => props.height ? props.height : 400}px;
    border: ${props => props.border ? props.border : null};
    background-color: ${props => props.backgroundcolor ? props.backgroundcolor : null};
}
`

export const StyledButtonContainer = styled.div`
flex: 0 1 100%;
text-align: center;
margin: 30px 0px;
`