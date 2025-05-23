import { Breadcrumb, Button, Table } from "antd"
import React, { useEffect, useState } from "react"

import columns from "./tableColumns"
import myAxios from "../../utils/axios"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"
import timeSince from "../../utils/timeSince"
import { useMyContext } from "../../hooks/myContext"

export default function GradeSessionHistoryList() {
    const { user_dict } = useMyContext()

    const [doc, setDoc] = useState()
    const tableData = doc?.map((item) => {
        return {
            name: user_dict[item.owner],
            doc: item.name,
            key: item._id,
            year: timeSince(new Date(item.created_at)),
            total_self_point: item.total_self_point,
            total_supervisor_point: item.total_supervisor_point,
        }
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const user = decodeJWT(getCookie("token"))
                const user_id = user.data._id
                const res = await myAxios.post(`grade/supervisor`, {
                    user_id,
                    is_history: true,
                })
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
                <Breadcrumb.Item>Lịch sử chấm điểm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="layout_container doc_container" style={{ flex: 1 }}>
                <div className="top_section">
                    <h1 style={{ color: "black" }}>Danh sách đã chấm</h1>
                </div>

                <div className="divider"></div>

                <div className="table_section">
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    )
}
