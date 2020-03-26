import React from 'react'
import { NavBar } from './Components/NavBar/NavBar'
import { Logged } from './Components/Logged'
import { StartSessionComponent } from './Components/StartSessionComponent';
import {useRoutes} from 'hookrouter';
import Routes from './routes'

const App = () => {

  const routeResult = useRoutes(Routes)
  return (
    <div>
       <NavBar/>
       {routeResult}
    </div>
  )
  // return (
  //   <div style={{width:'100%'}}>
  //     <NavBar/>
  //     <Router>
  //     <div>
  //       <Route path="/HomePage" component={Logged} />
  //       <Route path="/Session" component={StartSessionComponent} />
  //       <Route path="/Results" component={Results} />
  //     </div>
  //     </Router>
  //     <Logged/>
  //   </div>
  // )
}

export default App;