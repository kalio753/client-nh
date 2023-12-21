import { Space, Tag } from "antd"
import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"

const columns = [
    {
        title: "Tên tài liệu",
        dataIndex: "name",
        key: "name",
        width: "70%",
        render: (text) => <Link to={"/"}>{text}</Link>,
    },
    {
        title: "Năm",
        dataIndex: "year",
        key: "year",
        width: "20%",
    },
    {
        title: "Xem thêm",
        key: "action",
        width: "10%",
        align: "center",
        render: (_, record) => {
            return (
                <Link to={`/docs/${record.key}`} className="action_link">
                    Chi tiết <ArrowRightOutlined />
                </Link>
            )
        },
    },
]

export default columns
