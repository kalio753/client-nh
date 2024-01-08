export default function validatePhoneNumber(phoneNumber) {
    if (phoneNumber) {
        // Remove any non-numeric characters
        const numericPhoneNumber = phoneNumber.replace(/\D/g, "")

        // Check if the numeric phone number has 10 digits (adjust as needed for your region)
        const isValid = /^\d{10}$/.test(numericPhoneNumber)

        return isValid
    }
    return false
}
