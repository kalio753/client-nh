import { Breadcrumb, Button, Table } from "antd"
import React, { useEffect, useState } from "react"

import columns from "./tableColumns"
import myAxios from "../../utils/axios"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"
import timeSince from "../../utils/timeSince"

export default function GradeSessionList() {
    const [doc, setDoc] = useState()
    const tableData = doc?.map((item) => {
        return {
            name: item.name,
            key: item._id,
            year: timeSince(new Date(item.created_at)),
        }
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const user = decodeJWT(getCookie("token"))
                const user_id = user.data._id
                const role_list = user.data.role_id
                const res = await myAxios.post(`grade/supervisor`, {
                    user_id,
                    role_list,
                })
                console.log(res)
                res.status === 200 ? setDoc(res.data.data) : null
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Công việc của tôi</Breadcrumb.Item>
                <Breadcrumb.Item>Chấm điểm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="layout_container doc_container" style={{ flex: 1 }}>
                <div className="top_section">
                    <h1 style={{ color: "black" }}>Danh sách cần chấm</h1>
                </div>

                <div className="divider"></div>

                <div className="table_section">
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    )
}
