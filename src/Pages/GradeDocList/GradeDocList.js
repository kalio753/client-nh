import { Breadcrumb, Button, Table } from "antd"
import React, { useEffect, useState } from "react"

import columns from "./tableColumns"
import myAxios from "../../utils/axios"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"

export default function GradeDocList() {
    const [doc, setDoc] = useState()
    const tableData = doc?.map((item) => {
        return {
            name: item.name,
            key: item._id,
            year: new Date(item.created_at).getFullYear(),
        }
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const user_id = decodeJWT(getCookie("token")).data._id
                const res = await myAxios.get(`/docs/user/${user_id}`)
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
                <Breadcrumb.Item>Điểm của tôi</Breadcrumb.Item>
                <Breadcrumb.Item>Chấm điểm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="layout_container doc_container" style={{ flex: 1 }}>
                <div className="top_section">
                    <h1 style={{ color: "black" }}>Chọn phiếu chấm điểm</h1>
                </div>

                <div className="divider"></div>

                <div className="table_section">
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    )
}
