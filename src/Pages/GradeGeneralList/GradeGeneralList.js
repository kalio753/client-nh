import { Breadcrumb, Button, Table } from "antd"
import React, { useEffect, useState } from "react"
import { ArrowLeftOutlined } from "@ant-design/icons"
import columns from "./tableColumns"
import myAxios from "../../utils/axios"
import timeSince from "../../utils/timeSince"
import { useNavigate, useParams } from "react-router-dom"
import { useMyContext } from "../../hooks/myContext"
import "./gradeGeneralList.scss"

export default function GradeGeneralList() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const { user_list } = useMyContext()
    let user_dict = {}
    for (const user of user_list) {
        const key = user["_id"]
        user_dict[key] = user.name
    }
    const userName = user_dict[userId]
    const [doc, setDoc] = useState()
    const tableData = doc?.map((item) => {
        return {
            ...item,
            key: item._id,
            created_at: timeSince(new Date(item.created_at)),
        }
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await myAxios.get(`/grade/owner/${userId}`)
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
                <Breadcrumb.Item>Mọi người</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(-1)}>
                    Điểm thi đua
                </Breadcrumb.Item>
                <Breadcrumb.Item>{userName}</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container grade_general_container"
                style={{ flex: 1 }}
            >
                <div className="top_section">
                    <h1 style={{ color: "black" }}>{userName}</h1>
                    <Button
                        type="primary"
                        danger
                        icon={<ArrowLeftOutlined />}
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Quay lại
                    </Button>
                </div>

                <div className="divider"></div>

                <div className="table_section">
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    )
}
