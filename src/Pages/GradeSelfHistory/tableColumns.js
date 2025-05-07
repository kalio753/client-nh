import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import checkRank from "../../utils/checkRank"

const columns = [
    {
        title: "Tên tài liệu",
        dataIndex: "name",
        key: "name",
        width: "50%",
        render: (text) => <Link to={"/"}>{text}</Link>,
    },
    {
        title: "Điểm tự chấm",
        dataIndex: "total_self_point",
        key: "total_self_point",
        width: "10%",
        align: "center",
    },
    {
        title: "Điểm thực tế",
        dataIndex: "total_supervisor_point",
        key: "total_supervisor_point",
        width: "10%",
        align: "center",
    },
    {
        title: "Xếp loại dự kiến",
        dataIndex: "rank",
        key: "rank",
        width: "10%",
        align: "center",
        render: (text, record, index) => (
            <div>
                {record.total_supervisor_point
                    ? checkRank(record.total_supervisor_point)
                    : checkRank(record.total_self_point)}
            </div>
        ),
    },
    {
        title: "Thời gian chấm",
        dataIndex: "created_at",
        key: "created_at",
        width: "10%",
        align: "center",
    },
    {
        title: "Xem chi tiết",
        key: "action",
        width: "10%",
        align: "center",
        render: (_, record) => {
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
