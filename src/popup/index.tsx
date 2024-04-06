import { NextUIProvider } from "@nextui-org/react"

import Main from "~components/main"

import "../global.css"

function IndexPopup() {
  return (
    <NextUIProvider>
      <Main />
    </NextUIProvider>
  )
}

export default IndexPopup
