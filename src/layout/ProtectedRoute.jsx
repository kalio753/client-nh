import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import getCookie from "../utils/getCookie"
import decodeJWT from "../utils/decodeJWTToken"
import tokenIsExpired from "../utils/checkJWTExpired"

const ProtectedRoute = () => {
    const token = getCookie("token")
    var isExpired
    if (!token) {
        isExpired = true
    } else {
        const decodedToken = decodeJWT(token)
        isExpired = tokenIsExpired(decodedToken)
    }
    if (isExpired) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
