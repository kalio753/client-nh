import React, { createContext, useContext, useEffect, useState } from "react"
import myAxios from "../utils/axios"

const MyContext = createContext()

export const MyContextProvider = ({ children }) => {
    const [contextValues, setContextValues] = useState({
        user_list: [],
        role_list: [],
        dept_list: [],
    })

    const fetchMyContextData = async () => {
        try {
            console.log("fetching data from my custom context")
            const userResponse = await myAxios.get("user/get_all")
            const roleResponse = await myAxios.get("role")
            const deptResponse = await myAxios.get("dept")
            setContextValues({
                user_list: userResponse.data.data,
                role_list: roleResponse.data.data,
                dept_list: deptResponse.data.data,
            })
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    // Fetch data from API when the component mounts
    useEffect(() => {
        fetchMyContextData()
    }, [])

    return (
        <MyContext.Provider value={{ ...contextValues, fetchMyContextData }}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    return useContext(MyContext)
}
