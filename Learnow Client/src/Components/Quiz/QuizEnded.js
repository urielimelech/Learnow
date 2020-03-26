import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { navigate } from 'hookrouter'


export const QuizEnded = () => {
    // const IsVideo = useSelector(state => state.MainReducer)
    const isQuizEnded = useSelector(state => state.MainReducer.isQuizEnded)
    return isQuizEnded ? <button onClick={() => navigate('/Results')}> go and see your Results </button> : null

}