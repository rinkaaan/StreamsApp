import React, { useEffect, useRef } from "react"
import { appDispatch } from "../common/store"
import { playerActions } from "../routes/subtitle-test/playerSlice"

export default function VideoPlayer() {
  const videoContainerRef = useRef<HTMLDivElement>(null) // Ref for the container
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // video.playbackRate = 3.0
      video.addEventListener("timeupdate", () => {
        appDispatch(playerActions.updateSlice({ currentTime: video.currentTime }))
      })

      // Clean up the event listener when the component unmounts
      return () => video.removeEventListener("timeupdate", () => {})
    }
  }, [videoRef])

  return (
    <div
      ref={videoContainerRef}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <video
        playsInline={true}
        width="100%"
        style={{ display: "block" }}
        ref={videoRef}
        controls={true}
        src="/video.mp4"
      />
    </div>
  )
}
