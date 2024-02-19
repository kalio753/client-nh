import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"

const columns = [
    {
        title: "Tên giáo viên",
        dataIndex: "user_name",
        key: "user_name",
    },
    {
        title: "Phòng ban",
        dataIndex: "dept_name",
        key: "dept_name",
    },
    {
        title: "Điểm tự chấm",
        dataIndex: "total_self_point",
        key: "self_point",
        width: "15%",
    },
    {
        title: "Điểm tổ chuyên môn",
        dataIndex: "total_supervisor_point",
        key: "supervisor_point",
        width: "15%",
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
