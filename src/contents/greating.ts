import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*"],
  all_frames: true
}

window.addEventListener("load", () => {
  console.log(
    "Hi. Welcome to `Find your typo` !"
  )

  // document.body.style.background = "pink"
})