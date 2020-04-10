import React from "react"
import { StartSessionComponent } from "./Components/StartSessionComponent"
import { RoomNumberForm } from "./Components/RoomNumberForm"
import { Results } from "./Components/ResultsSession"
import { Feedback } from "./Components/Feedback"
import { SessionsComparator } from "./Components/SessionsComparator"
import { Login } from './Components/Login'
import { Register } from './Components/Register'

const routes = {
  "/": () => <RoomNumberForm/>,
  "/Session": () => <StartSessionComponent/>,
  "/Results": () => <Results/>,
  "/Recommendations" : () => <Feedback/>,
  "/SessionsComparator" : () => <SessionsComparator/>,
  "/Login" : () => <Login/>,
  "/Register" : () => <Register/>
}

export default routes