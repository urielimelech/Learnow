import React from "react"
import { StartSessionComponent } from "./Components/StartSessionComponent"
import { Results } from "./Components/ResultsSession"
import { Feedback } from "./Components/Feedback"
import { SessionsComparator } from "./Components/SessionsComparator"
import { Login } from './Components/Login'
import { Register } from './Components/Register'
import { VerifyTokenJwt } from "./Components/VerifyTokenJwt"
import { ConfigComponent } from './Components/ConfigComponent'
import { HomePage } from "./Components/HomePage"

const routes = {
  "/": () =>  <Login/>,
  "/Home": () => <VerifyTokenJwt children={<HomePage/>} />,
  "/Session": () => <VerifyTokenJwt children={<StartSessionComponent/>} />,
  "/Results": () => <VerifyTokenJwt children={<Results/>} />,
  "/Recommendations" : () => <VerifyTokenJwt children={<Feedback/>} />,
  "/SessionsComparator" : () => <VerifyTokenJwt children={<SessionsComparator/>} />,
  "/Configuration": () => <VerifyTokenJwt children={<ConfigComponent/>} />,
  "/Register" : () => <Register/>
}

export default routes