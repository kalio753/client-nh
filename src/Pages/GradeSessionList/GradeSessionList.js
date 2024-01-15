import { Breadcrumb, Button, Table } from "antd"
import React, { useEffect, useState } from "react"

import columns from "./tableColumns"
import myAxios from "../../utils/axios"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"
import timeSince from "../../utils/timeSince"
import { useMyContext } from "../../hooks/myContext"

export default function GradeSessionList() {
    const currUser = decodeJWT(getCookie("token")).data
    const { user_dict, user_list, role_dict, fetchMyContextData } =
        useMyContext()
    const [doc, setDoc] = useState()
    const [tableData, setTableData] = useState([])

    const isTTCM = currUser.role_id
        .map((role) => role_dict[role])
        .includes("Tổ trưởng chuyên môn")

    console.log("doc ne ", doc)
    console.log("currUser ne ", currUser)
    useEffect(() => {
        fetchMyContextData()
    }, [])

    useEffect(() => {
        setTableData(
            isTTCM
                ? doc
                      ?.filter((item) => {
                          console.log("user_list", user_list)
                          const owner = user_list.filter(
                              (user) => user._id === item.owner,
                          )[0]
                          console.log(owner, currUser)
                          return owner.department_id === currUser.department_id
                      })
                      ?.map((item) => {
                          return {
                              name: item.name,
                              key: item._id,
                              year: timeSince(new Date(item.created_at)),
                              owner: user_dict[item.owner],
                          }
                      })
                : doc?.map((item) => {
                      return {
                          name: item.name,
                          key: item._id,
                          year: timeSince(new Date(item.created_at)),
                          owner: user_dict[item.owner],
                      }
                  }),
        )
    }, [user_list])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await myAxios.post(`grade/supervisor`, {
                    user_id: currUser._id,
                    role_list: currUser.role_id,
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
