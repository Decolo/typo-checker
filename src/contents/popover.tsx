import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  NextUIProvider,
  Spinner
} from "@nextui-org/react"
import axios from "axios"
import cssText from "data-text:~/contents/overlay.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import "../global.css"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const OFFSET = 8

const Popover = () => {
  const [sectionInfo, setSectionInfo] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)
  const [checkResult, setCheckResult] = useState<string | null>(null)
  const [resultLoading, setResultLoading] = useState(false)

  const checkTypoByApi = () => {
    if (!sectionInfo?.text) return

    const url = "https://api.openai-hk.com/v1/chat/completions"

    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer hk-t8eq9u10000260568c4d13fc8a3986e15b0b42f6d0238e24"
    }

    const data = {
      max_tokens: 1200,
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      top_p: 1,
      presence_penalty: 1,
      messages: [
        {
          role: "system",
          content:
            "You are a typo checker, help me to correct the following text:"
        },
        {
          role: "user",
          content: sectionInfo?.text
        }
      ]
    }

    setResultLoading(true)

    axios
      .post(url, data, { headers })
      .then((response) => {
        const result = response.data

        if (
          Array.isArray(result.choices) &&
          result.choices.length > 0 &&
          result?.choices?.[0]?.message?.role === "assistant"
        ) {
          setCheckResult(result.choices[0].message.content)
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setResultLoading(false)
      })
  }

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      const selection = window.getSelection()

      setCheckResult(null)

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        setSectionInfo({
          text: selection.toString(),
          x: rect.x,
          y: rect.y + rect.height + OFFSET
        })
      }
    })
  }, [])

  return (
    <NextUIProvider>
      {sectionInfo?.text && (
        <main
          className={"popover light shadow-lg"}
          style={{
            left: sectionInfo?.x,
            top: sectionInfo?.y
          }}>
          <Card
            style={{
              maxWidth: "400px"
            }}>
            <CardHeader>
              <Button
                color="success"
                size="sm"
                style={{
                  width: "100px",
                  color: "#fff"
                }}
                onClick={() => {
                  checkTypoByApi()
                }}>
                Check Typo
              </Button>
            </CardHeader>
            {checkResult && (
              <>
                <Divider className="ms-2 me-2" />
                {resultLoading ? (
                  <Spinner />
                ) : (
                  <CardBody className="max-w-screen-sm">
                    <p>{checkResult}</p>
                  </CardBody>
                )}
              </>
            )}
          </Card>
        </main>
      )}
    </NextUIProvider>
  )
}

export default Popover
