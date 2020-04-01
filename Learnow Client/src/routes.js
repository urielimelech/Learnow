import React from "react"
import { StartSessionComponent } from "./Components/StartSessionComponent"
import { RoomNumberForm } from "./Components/RoomNumberForm"
import { Results } from "./Components/ResultsSession"
import { Feedback } from "./Components/Feedback"

const routes = {
  "/": () => <RoomNumberForm/>,
  "/Session": () => <StartSessionComponent/>,
  "/Results": () => <Results/>,
  "/Recommendations" : () => <Feedback/>
}

export default routes