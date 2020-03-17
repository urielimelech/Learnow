import React from 'react'
// import './App.css';
// import { NeuroSkyConnector } from './DataProcessor'
import { VideoPlayer } from './ReactPlayer/VideoPlayer'
import { NavBar } from './NavBar/NavBar'
import { Quiz} from './Quiz/Quiz'
import {useSelector} from 'react-redux'



const App = () => {

  const IsVideo = useSelector(state => state.QuizReducer.IsVideo)
  console.log(IsVideo)


  return (
    <div style={{width:'100%'}}>
      {/* {NeuroSkyConnector()} */}
      <NavBar/>
      {IsVideo ? <Quiz/> : <VideoPlayer/>}
      
    </div>
  );
}

export default App;