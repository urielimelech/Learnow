import React from "react"
import { Logged } from "./Components/Logged"
import { StartSessionComponent } from "./Components/StartSessionComponent"
import { RoomNumberForm } from "./Components/RoomNumberForm"
import { Results } from "./Components/ResultsSession"

const routes = {

  "/": () => <RoomNumberForm />,
  "/Session": () => <StartSessionComponent />,
  "/Results": () => <Results />
}

export default routes