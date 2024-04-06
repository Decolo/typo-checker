import { css } from "@emotion/css"
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Textarea
} from "@nextui-org/react"
import { useEffect, useRef, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

const Popup = () => {
  const [storageApiKey, setStorageApiKey] = useStorage("ft-api-key", "")
  const [apiKey, setApiKey] = useState(storageApiKey)
  const firstUpdate = useRef(false)

  useEffect(() => {
    if (firstUpdate.current) return

    if (storageApiKey) {
      setApiKey(storageApiKey)
      firstUpdate.current = true
    }
  }, [storageApiKey])

  console.log("** log apiKey **", apiKey)

  return (
    <div className="light">
      <Card
        className={css`
          padding: 12px;
          max-width: 640px;
          min-width: 400px;
        `}>
        <CardHeader
          className={css`
            font-size: 20px;
            /* font-weight: bold; */
          `}>
          Welcome to &nbsp;<strong>Find Your Typo</strong>
        </CardHeader>

        <Divider />
        <CardBody
          className={css`
            font-size: 16px;
          `}>
          <Input
            type="text"
            label="Your API key"
            placeholder="Please enter your api key"
            value={apiKey}
            onBlur={() => {
              setStorageApiKey(apiKey)
            }}
            onChange={(e) => {
              setApiKey(e.target.value)
            }}
          />
        </CardBody>

        <Divider />

        <CardFooter
          className={css`
            font-size: 14px;
          `}>
          Get help from: &nbsp;<strong>caicheng.fe.dev@gmail.com</strong>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Popup
