import React from 'react'
import { NavBar } from './NavBar/NavBar'
import { Logged } from './Logged'

const App = () => {

  return (
    <div style={{width:'100%'}}>
      <NavBar/>
      <Logged/>
    </div>
  );
}

export default App;