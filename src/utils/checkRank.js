export default function checkRank(point) {
    if (point >= 80) return "Tốt"
    else if (point >= 70) return "Khá"
    else if (point >= 50) return "Đạt yêu cầu"
    else return "Không HTNV"
}
