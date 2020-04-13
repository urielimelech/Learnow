import React from "react"
import { StartSessionComponent } from "./Components/StartSessionComponent"
import { RoomNumberForm } from "./Components/RoomNumberForm"
import { Results } from "./Components/ResultsSession"
import { Feedback } from "./Components/Feedback"
import { SessionsComparator } from "./Components/SessionsComparator"
import { Login } from './Components/Login'
import { Register } from './Components/Register'
import { VerifyTokenJwt } from "./Components/VerifyTokenJwt"


const routes = {
  // "/": () =>  <VerifyTokenJwt><RoomNumberForm/></VerifyTokenJwt>,
  "/": () =>  <Login/>,
  "/Session": () => <VerifyTokenJwt children={<StartSessionComponent/>} />,
  "/Results": () => <VerifyTokenJwt children={<Results/>} />,
  "/Recommendations" : () => <VerifyTokenJwt children={<Feedback/>} />,
  "/SessionsComparator" : () => <VerifyTokenJwt children={<SessionsComparator/>} />,
  "/Login" : () => <Login/>,
  "/Register" : () => <Register/>
}

export default routes