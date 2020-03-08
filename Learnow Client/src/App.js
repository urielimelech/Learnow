import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { NeuroSkyConnector } from './DataProcessor';
import ReactPlayer from "react-player"

function App() {
  return (
    <div className="App">
     {NeuroSkyConnector()}
     <ReactPlayer
        url="https://www.youtube.com/watch?v=DIJYAWB3MhI"
      />
     
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
