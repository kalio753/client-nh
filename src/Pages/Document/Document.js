import { Breadcrumb, Button, Table } from "antd"
import React, { useEffect, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"

import "./document.scss"
import columns from "./tableColumns"
import { Link } from "react-router-dom"
import myAxios from "../../utils/axios"

export default function Document() {
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
                const res = await myAxios.get("/docs")
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
                <Breadcrumb.Item>Administrator</Breadcrumb.Item>
                <Breadcrumb.Item>Cập nhật tài liệu</Breadcrumb.Item>
            </Breadcrumb>
            <div className="layout_container doc_container" style={{ flex: 1 }}>
                <div className="top_section">
                    <h1 style={{ color: "black" }}>Tất cả tài liệu</h1>
                    <Link to={"/docs/create"}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="medium"
                        >
                            Tạo tài liệu
                        </Button>
                    </Link>
                </div>

                <div className="divider"></div>

                <div className="table_section">
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    )
}
