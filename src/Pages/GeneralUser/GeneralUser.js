import React, { useEffect, useState } from "react"
import { useMyContext } from "../../hooks/myContext"
import { convertVietnamese } from "../../utils/convertVietnamese"
import { Breadcrumb, Button, Input, Table } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import columns from "./tableColumns"
import { useParams } from "react-router-dom"
import myAxios from "../../utils/axios"

export default function GeneralUser() {
    const { docId } = useParams()
    const [searchInput, setSearchInput] = useState("")
    const [tableData, setTableData] = useState([])
    const [searchData, setSearchData] = useState()
    const [title, setTitle] = useState("")
    const { user_list, dept_list, fetchMyContextData, dept_dict, user_dict } =
        useMyContext()

    useEffect(() => {
        fetchMyContextData()
        async function fetchData() {
            const res = await myAxios.get(`/grade/doc/${docId}`)
            setTableData(res.data.data)
            const titleRes = await myAxios.get(`docs/${docId}`)
            setTitle(titleRes.data.data.name)
        }
        fetchData()
    }, [])
    console.log("aba", tableData)

    useEffect(() => {
        setTableData((prev) => {
            return prev.map((item) => {
                return {
                    ...item,
                    user_name: user_dict[item.owner],
                    dept_name: dept_dict[item.dept_id],
                }
            })
        })
    }, [user_list, dept_list])

    const handleSearch = () => {
        setSearchData(
            tableData.filter((user) => {
                return convertVietnamese(user.user_name).includes(
                    convertVietnamese(searchInput),
                )
            }),
        )
    }

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Mọi người</Breadcrumb.Item>
                <Breadcrumb.Item>Điểm thi đua</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container home_container"
                style={{ flex: 1 }}
            >
                <h1 style={{ color: "black" }}>{title}</h1>

                <div className="search_section">
                    <Input
                        placeholder="Tên giáo viên"
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                            if (!e.target.value) {
                                setSearchData(null)
                            } else {
                                setSearchData(
                                    tableData.filter((user) =>
                                        convertVietnamese(
                                            user.user_name,
                                        ).includes(
                                            convertVietnamese(e.target.value),
                                        ),
                                    ),
                                )
                            }
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        size="large"
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                </div>

                <div className="table_section">
                    <Table
                        columns={columns}
                        dataSource={searchData || tableData}
                        rowKey="_id"
                    />
                </div>
            </div>
        </div>
    )
}
