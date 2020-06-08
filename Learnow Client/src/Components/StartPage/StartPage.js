import React, { useState } from 'react'
import { WrapperMainPage, WrapperContent, WrapperImg, Img, Title, Description } from "./StartPageStyle"
import { ButtonType } from '../ButtonType/ButtonType'
import { DialogLogin } from './DialogLogin'

export const StartPage = () => {

    const [openDialog, setOpenDialog] = useState(false)

    const openModal = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    return <WrapperMainPage>
        <img style={{width: 300}} src={require('../../images/learnow-icon.png')}></img>
        <WrapperContent>
            <Title> A biofeedback system to improve the learning process </Title>
            <Description> welcome to learnow, A system that monitors measures of attention and meditation, analyzes the metrics, 
                and recommends activities that can improve the level of attention and concentration and bring about an improved learning process
            </Description>
            <ButtonType 
            style={{marginTop: '60px', right: 5}}
            onClick={openModal}
            >
            LETS START </ButtonType>
        </WrapperContent>
        <WrapperImg>
            <Img src={require('../../images/BrainWavesIllustrationNeon.jpg')}/>
        </WrapperImg>
        {openDialog ? <DialogLogin closeDialog={handleClose}/> : null}
    </WrapperMainPage>    
}