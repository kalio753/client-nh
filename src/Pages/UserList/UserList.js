import React from "react"
import { Breadcrumb, Button, Input, Table } from "antd"
import { SearchOutlined, PlusOutlined } from "@ant-design/icons"
import { useMyContext } from "../../hooks/myContext"
import columns from "./tableColumns"
import { useEffect, useState } from "react"
import { convertVietnamese } from "../../utils/convertVietnamese"
import { Link, useNavigate } from "react-router-dom"
import "./userList.scss"

export default function UserList() {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState("")
    const [tableData, setTableData] = useState([])
    const [searchData, setSearchData] = useState()
    const { user_list, dept_list, fetchMyContextData, dept_dict } =
        useMyContext()

    useEffect(() => {
        fetchMyContextData()
    }, [])

    useEffect(() => {
        setTableData(
            user_list.map((user) => {
                return { ...user, department: dept_dict[user.department_id] }
            }),
        )
    }, [user_list, dept_list])

    const handleSearch = () => {
        setSearchData(
            tableData.filter((user) =>
                convertVietnamese(user.name).includes(
                    convertVietnamese(searchInput),
                ),
            ),
        )
    }

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Aministrator</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý User</Breadcrumb.Item>
                <Breadcrumb.Item>Cập nhật User</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container user_list_container"
                style={{ flex: 1 }}
            >
                <div className="top_section">
                    <h1 style={{ color: "black" }}>Cập nhật User</h1>
                    <Link to={"/user/create"}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="medium"
                        >
                            Cấp tài khoản mới
                        </Button>
                    </Link>
                </div>

                <div className="divider"></div>

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
                                        convertVietnamese(user.name).includes(
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
