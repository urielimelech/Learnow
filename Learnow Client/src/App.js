import React from 'react'
// import './App.css';
// import { NeuroSkyConnector } from './DataProcessor'
import { VideoPlayer } from './ReactPlayer/VideoPlayer'
import { NavBar } from './NavBar/NavBar'
import { Quiz} from './Quiz/Quiz'


const App = () => {
  return (
    <div style={{width:'100%'}}>
      {/* {NeuroSkyConnector()} */}
      <NavBar/>
      <VideoPlayer/>
      <Quiz/>
    </div>
  );
}

export default App;