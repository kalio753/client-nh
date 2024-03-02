export default function checkRank(point) {
    if (point >= 80) return "A"
    else if (point >= 65) return "B"
    else if (point >= 50) return "C"
    else return "D"
}
