import { Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useEffect, useRef, useState } from "react"
import subtitles from "./ep3.json"
import { findSubtitle } from "../../common/typedUtils"
import VideoPlayer from "../../components/VideoPlayer"

export function Component() {
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    console.log(subtitles)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      // Set up event listener when the video element is available
      const video = videoRef.current
      video.addEventListener("timeupdate", () => {
        setCurrentTime(video.currentTime)
      })

      // Clean up the event listener when the component unmounts
      return () => video.removeEventListener("timeupdate", () => {})
    }
  }, [])

  return (
    <ContentLayout
      header={
        <Header variant="h1">Subtitle Test</Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">A Video</Header>}>
          {/*<video*/}
          {/*  controls*/}
          {/*  src="/ep3.mp4"*/}
          {/*  style={{ width: "100%" }}*/}
          {/*  ref={videoRef}*/}
          {/*/>*/}
          <VideoPlayer videoRef={videoRef} />
          <TextContent>Current Time: {currentTime}</TextContent>
          <TextContent>{findSubtitle(subtitles, currentTime)?.text}</TextContent>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
