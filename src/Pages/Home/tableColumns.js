import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"

const columns = [
    {
        title: "Tên phiếu đánh giá",
        dataIndex: "name",
        key: "name",
        width: "50%",
    },
    {
        title: "Năm",
        dataIndex: "year",
        key: "year",
        align: "center",
    },
    {
        title: "Hành động",
        key: "action",
        width: "10%",
        align: "center",
        render: (_, record) => {
            return (
                <Link to={`/general/${record.key}`} className="action_link">
                    Xem chi tiết <ArrowRightOutlined />
                </Link>
            )
        },
    },
]

export default columns
