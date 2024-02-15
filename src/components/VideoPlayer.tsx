import React, { useState, useRef } from "react"

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>

}

export default function VideoPlayer({ videoRef }: VideoPlayerProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null) // Ref for the container
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  async function togglePlayPause() {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        await video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  async function toggleFullScreen() {
    if (!document.fullscreenElement && videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        await videoContainerRef.current.requestFullscreen()
        setIsFullScreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
        setIsFullScreen(false)
      }
    }
  }

  return (
    <div
      ref={videoContainerRef}
      style={{
        position: "relative",
        width: "100%",
        // maxWidth: "640px", // Adjust as needed
      }}
    >
      <video
        width="100%"
        style={{ display: "block" }}
        ref={videoRef}
        controls={false}
        src="/ep3.mp4"
      />
      <div style={{
        position: "absolute",
        top: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
        height: "100px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}>
        <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={toggleFullScreen}>{isFullScreen ? "Exit Full Screen" : "Full Screen"}</button>
      </div>
    </div>
  )
}
