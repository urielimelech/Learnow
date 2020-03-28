import React from 'react'
import { useRoutes } from 'hookrouter'

import { NavBar } from './Components/NavBar'
import Routes from './routes'

const App = () => {

  const routeResult = useRoutes(Routes)
  return (
    <div>
       <NavBar/>
       {routeResult}
    </div>
  )
}

export default App;