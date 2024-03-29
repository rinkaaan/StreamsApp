import { format, isToday, isYesterday, parseISO } from "date-fns"
import { v4 } from "uuid"

export function formatDate(inputDate?: string) {
  if (!inputDate) return null
  const parsedDate = parseISO(inputDate)

  if (isToday(parsedDate)) {
    return format(parsedDate, "'Today at' h:mm a")
  } else if (isYesterday(parsedDate)) {
    return format(parsedDate, "'Yesterday at' h:mm a")
  } else {
    return format(parsedDate, "MMM d, yyyy 'at' h:mm a")
  }
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function uuid() {
  return v4()
}

export type AsyncStatus = "pending" | "fulfilled" | "rejected"

export interface Subtitle {
  start: number;
  end: number;
  text: string;
}

export function findSubtitle(subtitles: Subtitle[], time: number): Subtitle | null {
  let low = 0
  let high = subtitles.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const subtitle = subtitles[mid]

    if (time >= subtitle.start && time <= subtitle.end) {
      return subtitle
    } else if (time < subtitle.start) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return null // Return null if no subtitle contains the time
}

export function isCurrentSubtitle(subtitle: Subtitle, currentTime: number): boolean {
  return currentTime >= subtitle.start && currentTime < subtitle.end
}

export function formatSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  // Format the time string
  let formattedTime = ""
  if (hours > 0) {
    formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  } else {
    formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return formattedTime
}
