export default function tokenIsExpired(tokenObj) {
    const isExpired = Date.now() - tokenObj.exp * 1000
    if (isExpired > 0) {
        return true
    } else {
        return false
    }
}
