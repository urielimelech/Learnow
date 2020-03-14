import React from 'react'
// import './App.css';
// import { NeuroSkyConnector } from './DataProcessor'
import { VideoPlayer } from './ReactPlayer/VideoPlayer'
import { NavBar } from './NavBar/NavBar'

function App() {
  return (
    <div style={{width:'100%'}}>
    {/* {NeuroSkyConnector()} */}
    <NavBar/>
    <VideoPlayer/>
    </div>
  );
}

export default App;
