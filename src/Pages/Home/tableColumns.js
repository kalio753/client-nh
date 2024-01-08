import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"

const columns = [
    {
        title: "Tên giáo viên",
        dataIndex: "name",
        key: "name",
        width: "40%",
    },
    {
        title: "Tổ chuyên môn",
        dataIndex: "department",
        key: "department",
        align: "center",
    },
    {
        title: "SĐT",
        dataIndex: "phone",
        key: "phone",
        align: "center",
    },
    {
        title: "Hành động",
        key: "action",
        width: "10%",
        align: "center",
        render: (_, record) => {
            return (
                <Link to={`/${record._id}`} className="action_link">
                    Xem chi tiết <ArrowRightOutlined />
                </Link>
            )
        },
    },
]

export default columns
