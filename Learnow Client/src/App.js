import React from 'react'
import { useRoutes } from 'hookrouter'

import { NavBar } from './Components/NavBar'
import Routes from './routes'
import { CookiesProvider } from 'react-cookie'

const App = () => {

  const routeResult = useRoutes(Routes)
  return (
    <CookiesProvider>
       <NavBar/>
       {routeResult}
    </CookiesProvider>
  )
}

export default App;