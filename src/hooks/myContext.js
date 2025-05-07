import React, { createContext, useContext, useEffect, useState } from "react"
import myAxios from "../utils/axios"

const MyContext = createContext()

export const MyContextProvider = ({ children }) => {
    const [contextValues, setContextValues] = useState({
        user_list: [],
        role_list: [],
        dept_list: [],
    })
    const [dictValue, setDictValue] = useState({
        dept_dict: {},
        role_dict: {},
        user_dict: {},
    })

    const fetchMyContextData = async () => {
        try {
            const userResponse = await myAxios.get("user/get_all")
            const roleResponse = await myAxios.get("role")
            const deptResponse = await myAxios.get("dept")

            const tmp_dept_dict = {}
            for (const dept of deptResponse.data.data) {
                const key = dept["_id"]
                tmp_dept_dict[key] = dept.name
            }
            setDictValue((prev) => ({ ...prev, dept_dict: tmp_dept_dict }))

            const tmp_role_dict = {}
            for (const role of roleResponse.data.data) {
                const key = role["_id"]
                tmp_role_dict[key] = role.name
            }
            setDictValue((prev) => ({ ...prev, role_dict: tmp_role_dict }))

            const tmp_user_dict = {}
            for (const user of userResponse.data.data) {
                const key = user["_id"]
                tmp_user_dict[key] = user.name
            }
            setDictValue((prev) => ({ ...prev, user_dict: tmp_user_dict }))

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
        <MyContext.Provider
            value={{
                ...contextValues,
                ...dictValue,
                fetchMyContextData,
            }}
        >
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    return useContext(MyContext)
}
