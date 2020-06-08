import React, { useEffect } from 'react'
import { useRoutes } from 'hookrouter'

import Routes from './routes'
import { BurgerNav } from './Components/NavBar/BurgerNav'
import { CookiesProvider } from 'react-cookie'
import { Nav } from './Components/NavBar/Nav'
import { useDispatch } from 'react-redux'
import { updateWindowHeight, updateWindowWidth } from './Redux/Actions'

const App = () => {

  const _dispatch = useDispatch()

  const resizeWindow = () => {
    _dispatch(updateWindowHeight(window.innerHeight))
    _dispatch(updateWindowWidth(window.innerWidth))
  }

  useEffect(() => {
    resizeWindow()
    window.addEventListener("resize", resizeWindow)
    return () => window.removeEventListener("resize", resizeWindow)
  }, [])

  const routeResult = useRoutes(Routes)

  return (
    <CookiesProvider>
      <Nav page={routeResult}/>
      {/* <BurgerNav page={routeResult}/> */}
    </CookiesProvider>
  )
}
export default App