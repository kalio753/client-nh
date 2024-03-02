export const calculateSectionTotalPoints = (doc, index) => {
    const total_point = doc?.section[index]?.content.reduce(
        (acc, content, index) => acc + content.point,
        0,
    )

    return total_point ? total_point : 0
}

export const calculateSectionSelfPoints = (doc, index) => {
    const total_point = doc?.section[index]?.content.reduce(
        (acc, content) => (content.self_point ? acc + content.self_point : acc),
        0,
    )

    return total_point && total_point > 0 ? total_point : 0
}

export const calculateSectionSupervisorPoints = (doc, index) => {
    const total_point = doc?.section[index]?.content.reduce(
        (acc, content) =>
            content.supervisor_point ? acc + content.supervisor_point : acc,
        0,
    )

    return total_point && total_point > 0 ? total_point : 0
}

export const calculateTotalPoint = (doc, type = "SELF") => {
    return doc?.section?.reduce((acc, item, index) => {
        switch (type) {
            case "SELF":
                return calculateSectionSelfPoints(doc, index) + acc
            case "SUPERVISOR":
                return calculateSectionSupervisorPoints(doc, index) + acc
        }
    }, 0)
}
