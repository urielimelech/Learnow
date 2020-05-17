import React from 'react'
import { useRoutes } from 'hookrouter'

import { NavBar } from './Components/NavBar'
import Routes from './routes'
import { BurgerNav } from './Components/NavBar/BurgerNav'
import { useSelector } from 'react-redux'
import { Login } from './Components/Login'

const App = () => {

  const routeResult = useRoutes(Routes)
  return (
    <div>
       {/* <NavBar/> */}
     
          <BurgerNav page={routeResult}/>
       {/* {routeResult} */}
    </div>
  )
}

export default App;