import React, { useState, useEffect } from 'react'
import { useRoutes } from 'hookrouter'

import Routes from './routes'
import { BurgerNav } from './Components/NavBar/BurgerNav'
import { CookiesProvider } from 'react-cookie'
import { Nav } from './Components/NavBar/Nav'

const App = () => {

  const routeResult = useRoutes(Routes)
  return (
    <CookiesProvider>
      <Nav page={routeResult}/>
      {/* <BurgerNav page={routeResult}/> */}
    </CookiesProvider>
  )
}
export default App