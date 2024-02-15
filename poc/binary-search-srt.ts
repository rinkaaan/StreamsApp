interface Subtitle {
    start: number;
    end: number;
    text: string;
}

function findSubtitle(subtitles: Subtitle[], time: number): Subtitle | null {
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

// Example usage:
const subtitles: Subtitle[] = [
    { start: 0.0, end: 2.0, text: "ままはちょめちょめ" },
    { start: 3.0, end: 6.0, text: "バンカもちょめちょめ" },
    { start: 8.0, end: 10.0, text: "早く出ないと" },
    { start: 10.0, end: 12.0, text: "ほでた体が" },
]

const time = 9.0 // Example time to find the subtitle for
const subtitle = findSubtitle(subtitles, time)
if (subtitle) {
    console.info(`Found subtitle: ${subtitle.text}`)
} else {
    console.info("No subtitle found for this time.")
}
