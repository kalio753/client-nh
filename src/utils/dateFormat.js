function isDateExpired(inputDate) {
    // Parse the input date string into a Date object
    var expirationDate = new Date(inputDate)

    // Get the current date
    var currentDate = new Date()

    // Compare the expiration date with the current date
    return expirationDate < currentDate
}

function formatedDate(inputDate) {
    const date = new Date(inputDate)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export { isDateExpired, formatedDate }
