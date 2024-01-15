import { Space, Tag } from "antd"
import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"

const columns = [
    {
        title: "Giáo viên",
        dataIndex: "owner",
        key: "owner",
        width: "20%",
    },
    {
        title: "Tên tài liệu",
        dataIndex: "name",
        key: "name",
        width: "50%",
        render: (text) => <Link to={"/"}>{text}</Link>,
    },
    {
        title: "Thời gian",
        dataIndex: "year",
        key: "year",
        width: "20%",
    },
    {
        title: "Hành động",
        key: "action",
        width: "10%",
        align: "center",
        render: (_, record) => {
            return (
                <Link
                    to={`/grade/supervisor/${record.key}`}
                    className="action_link"
                >
                    Chấm điểm <ArrowRightOutlined />
                </Link>
            )
        },
    },
]

export default columns
