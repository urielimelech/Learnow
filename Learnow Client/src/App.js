import React, { useEffect, useState } from 'react'
import { useRoutes } from 'hookrouter'

import Routes from './routes'
import { CookiesProvider } from 'react-cookie'
import { Nav } from './Components/NavBar/Nav'
import { useDispatch } from 'react-redux'
import { updateWindowHeight, updateWindowWidth, updateFitContent } from './Redux/Actions'

const App = () => {

  const _dispatch = useDispatch()

  const resizeWindow = () => {
    _dispatch(updateWindowHeight(window.innerHeight))
    _dispatch(updateWindowWidth(window.innerWidth))
    _dispatch(updateFitContent(true))
  }

  const [content, setContent] = useState(null)

  useEffect(() => {
    if (content)
      _dispatch(updateWindowHeight(content))
  },[content])

  useEffect(() => {
    setContent(document.getElementById('root').clientHeight)
    resizeWindow()
    window.addEventListener("resize", resizeWindow)
    return () => window.removeEventListener("resize", resizeWindow)
  }, [])

  const routeResult = useRoutes(Routes)

  return (
    <CookiesProvider>
      <Nav page={routeResult}/>
    </CookiesProvider>
  )
}
export default App