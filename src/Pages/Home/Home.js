import { Breadcrumb, Button, Input, Table } from "antd"
import "./home.scss"
import { SearchOutlined } from "@ant-design/icons"
import { useMyContext } from "../../hooks/myContext"
import columns from "./tableColumns"
import { useEffect, useState } from "react"
import { convertVietnamese } from "../../utils/convertVietnamese"
import myAxios from "../../utils/axios"

function Home() {
    const [searchInput, setSearchInput] = useState("")
    const [doc, setDoc] = useState([])
    const tableData = doc?.map((item) => {
        return {
            name: item.name,
            key: item._id,
            year: new Date(item.created_at).getFullYear(),
        }
    })
    const [searchData, setSearchData] = useState()
    const { user_list, dept_list, fetchMyContextData, dept_dict } =
        useMyContext()

    useEffect(() => {
        fetchMyContextData()
        async function fetchData() {
            try {
                const res = await myAxios.get("/docs")
                res.status === 200 ? setDoc(res.data.data) : null
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        // setTableData(
        //     user_list.map((user) => {
        //         return { ...user, department: dept_dict[user.department_id] }
        //     }),
        // )
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
                <Breadcrumb.Item>Mọi người</Breadcrumb.Item>
                <Breadcrumb.Item>Điểm thi đua</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container home_container"
                style={{ flex: 1 }}
            >
                <h1 style={{ color: "black" }}>Điểm thi đua chung</h1>

                <div className="search_section">
                    <Input
                        placeholder="Tên phiếu đánh giá"
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
                        // rowKey="_id"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
