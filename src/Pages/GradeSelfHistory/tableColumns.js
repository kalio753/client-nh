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
        title: "Thời gian chấm",
        dataIndex: "created_at",
        key: "created_at",
        width: "20%",
        align: "center",
    },
    {
        title: "Xem chi tiết",
        key: "action",
        width: "10%",
        align: "center",
        render: (_, record) => {
            console.log(record)
            return (
                <Link
                    to={`/grade/history/${record.key}`}
                    className="action_link"
                >
                    Chi tiết <ArrowRightOutlined />
                </Link>
            )
        },
    },
]

export default columns
