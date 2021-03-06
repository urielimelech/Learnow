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
import { ChooseResultUserSessions } from "./Components/ChooseResultUserSessions"
import { EducationalActivity } from "./Components/EducationalActivity"
import { StartPage } from "./Components/StartPage/StartPage"

const routes = {
  "/": () =>  <StartPage/>,
  "/Home": () => <VerifyTokenJwt children={<HomePage/>} />,
  "/Session": () => <VerifyTokenJwt children={<StartSessionComponent/>} />,
  "/Results": () => <VerifyTokenJwt children={<Results/>} />,
  "/Recommendations" : () => <VerifyTokenJwt children={<Feedback/>} />,
  "/EffetiveRecommendations" : () => <VerifyTokenJwt children={<SessionsComparator/>} />,
  "/History" : () => <VerifyTokenJwt children={<ChooseResultUserSessions/>} />,
  "/Configuration": () => <VerifyTokenJwt children={<ConfigComponent/>} />,
  "/EducationalActivity" : () => <VerifyTokenJwt children={<EducationalActivity/>} />
}

export default routes