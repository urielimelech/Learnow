import React from 'react'
import { WrapperMainPage, WrapperContent, WrapperImg, Img, Title, Description } from "./StartPageStyle"
import { ButtonType } from '../ButtonType/ButtonType'

export const StartPage = () => {
    return <WrapperMainPage>
        <img style={{width: 300}} src={require('../../images/learnow-icon.png')}></img>
        <WrapperContent>
            <Title> A biofeedback system to improve the learning process </Title>
            <Description> welcome to learnow, A system that monitors measures of attention and meditation, analyzes the metrics, 
                and recommends activities that can improve the level of attention and concentration and bring about an improved learning process
            </Description>
            <ButtonType style={{top: 60, right: 5, border: '2px solid #35C2C0', padding: 5, 
            background: 'linear-gradient(to right, #0ce9ed, #35C2C0)'}}
            >Lets Start </ButtonType>
        </WrapperContent>
        <WrapperImg>
            <Img src={require('../../images/BrainWavesIllustrationNeon.jpg')}/>
        </WrapperImg>
    </WrapperMainPage>    
}