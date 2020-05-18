import React from 'react'
import { useRoutes } from 'hookrouter'

import { NavBar } from './Components/NavBar'
import Routes from './routes'
import { BurgerNav } from './Components/NavBar/BurgerNav'
import { CookiesProvider } from 'react-cookie'

const App = () => {

  const routeResult = useRoutes(Routes)
  return (
    <CookiesProvider>
    {/*<NavBar/>*/}
       {/*routeResult*/}
       <BurgerNav page={routeResult}/>
    </CookiesProvider>
  )
}

export default App;