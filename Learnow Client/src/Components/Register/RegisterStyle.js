import styled from 'styled-components'

const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
const brainImg = require('../../images/brain.jpg')


export const RegisterPage = styled.div`
background: linear-gradient(to right, #FFFFFF, #000000);
`

export const BackgroundRegisterPage = styled.div`
height: ${windowHeight}px;
background-image: url(${brainImg});
background-repeat: no-repeat;
background-size: ${windowWidth}px ${windowHeight}px;
background-position: center;
`

export const WrapperForm = styled.div`
top: 30px;
`

export const Form =  styled.form `
width: 60%;
border: 2px solid #ffffff;
margin: 0 auto;
background-color: #ffffff;
opacity: 0.8;
padding: 15px;
height: ${windowHeight}-200;
`

export const HeaderForm = styled.div`
text-align: center;
`

export const Logo = styled.img`
height: 80px;
width: 80px;
`

export const WrapperButtons = styled.div`
text-align: center;
`