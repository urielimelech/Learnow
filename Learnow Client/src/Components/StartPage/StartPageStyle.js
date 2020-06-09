import styled from 'styled-components'

export const WrapperStartPage = styled.div`
display: flex;
align-items: center;
// background-color: #caf2e7;
background: linear-gradient(to bottom, #ffffff, #a9e4f7);
height: ${props => props.height ? props.height + 'px' : '100%'};
`

export const LogoStartPage = styled.img`
align-self: flex-start;
padding: 10px;
`

export const WrapperContent = styled.div`
padding: 50px;
margin-top: 50px;
`

export const WrapperImg = styled.div`
margin-top: 150px;
padding-right: 50px;
`

export const Img = styled.img`
width: 600px;
color: blue;
`

export const Title =  styled.div`
font-size: 40px;
font-weight :bold;
`

export const Description =  styled.div`
font-size: 20px;
margin-top: 20px;
`