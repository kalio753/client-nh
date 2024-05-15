import React, { useEffect, useState } from "react"
import { useMyContext } from "../../hooks/myContext"
import { convertVietnamese } from "../../utils/convertVietnamese"
import { Breadcrumb, Button, Input, Table } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import columns from "./tableColumns"
import { useParams } from "react-router-dom"
import myAxios from "../../utils/axios"
import downloadImg from "../../images/download.svg"
import generateAllExcel from "../../utils/generateAllExcel"

export default function GeneralUser() {
    const { docId } = useParams()
    const [searchInput, setSearchInput] = useState("")
    const [tableData, setTableData] = useState([])
    const [searchData, setSearchData] = useState()
    const [title, setTitle] = useState("")
    const { fetchMyContextData, dept_dict, user_dict } = useMyContext()

    useEffect(() => {
        fetchMyContextData()
        async function fetchData() {
            const res = await myAxios.get(`/grade/doc/${docId}`)

            setTableData(
                res.data.data.map((item) => ({
                    user_name: user_dict[item.owner],
                    dept_name: dept_dict[item.dept_id],
                    key: item._id,
                    total_self_point: item.total_self_point,
                    total_supervisor_point: item.total_supervisor_point,
                })),
            )
            const titleRes = await myAxios.get(`docs/${docId}`)
            setTitle(titleRes.data.data.name)
        }
        fetchData()
    }, [])
    console.log("aba", tableData)

    // useEffect(() => {
    //     setTableData((prev) => {
    //         return prev.map((item) => {
    //             return {
    //                 ...item,
    //                 user_name: user_dict[item.owner],
    //                 dept_name: dept_dict[item.dept_id],
    //             }
    //         })
    //     })
    // }, [user_list, dept_list])

    const handleSearch = () => {
        setSearchData(
            tableData.filter((user) => {
                return convertVietnamese(user.user_name).includes(
                    convertVietnamese(searchInput),
                )
            }),
        )
    }
    const handleGenerateExcel = () => {
        generateAllExcel({ data: tableData })
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

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
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
                                                convertVietnamese(
                                                    e.target.value,
                                                ),
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

                    <Button
                        onClick={handleGenerateExcel}
                        style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={downloadImg}
                            style={{
                                width: 16,
                                filter: "brightness(0) saturate(100%) invert(59%) sepia(98%) saturate(479%) hue-rotate(73deg) brightness(84%) contrast(95%)",
                            }}
                        />
                        Download
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
