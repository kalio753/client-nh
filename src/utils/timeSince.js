export default function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000)
    var interval = seconds / 86400
    if (interval > 1) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    interval = seconds / 3600
    if (interval > 1) {
        return Math.floor(interval) + " tiếng trước"
    }
    interval = seconds / 60
    if (interval > 1) {
        return Math.floor(interval) + " phút trước"
    }
    return Math.floor(seconds) + " giây trước"
}

// console.log(timeSince(new Date("2023-12-25T08:31:00.448+0000")))
console.log(new Date())
