import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { Button } from 'react-bootstrap'

export const ConfigSliderWrapper = styled.div`
border: 1px solid #373A47;
margin: 25px; 
padding-right: 30px;
padding-left: 40px;
width:400px;
border-radius: 5px;
`

export const TextConfig = styled(Typography)`
text-align: center
`

export const WrapperConfig = styled.div`
top: 20px;
padding: 5px;
margin: 0 auto;
display: flex;
flex-diirection: row; 
flex-wrap: wrap;
width: 950px;
`

export const ButtonConfig = styled(Button)`
margin:0 auto;
width: '150px';
`