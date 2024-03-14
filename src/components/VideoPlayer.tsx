import React, { useEffect, useRef } from "react"
import { appDispatch } from "../common/store"
import { playerActions, playerSelector } from "../routes/subtitle-test/playerSlice"
import { useSelector } from "react-redux"

export default function VideoPlayer() {
  const videoContainerRef = useRef<HTMLDivElement>(null) // Ref for the container
  const videoRef = useRef<HTMLVideoElement>(null)
  const { newTime } = useSelector(playerSelector)

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

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.currentTime = newTime
    }
  }, [newTime])

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
        // src="/akari.mp4"
        src="https://testphotos.lincolnnguyen.me/file/nguylinc-photos-test/streams/akari.mp4"
      />
    </div>
  )
}
