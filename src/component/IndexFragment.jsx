import React from "react"
import { Outlet } from "react-router-dom"

export default function IndexFragment() {
    return (
        <div>
            <Outlet />
        </div>
    )
}
