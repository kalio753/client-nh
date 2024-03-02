import { Space, Tag } from "antd"
import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import checkRank from "../../utils/checkRank"

const columns = [
    {
        title: "Tên giáo viên",
        dataIndex: "name",
        key: "name",
        width: "10%",
        // render: (text) => <Link to={"/"}>{text}</Link>,
    },
    {
        title: "Tên tài liệu",
        dataIndex: "doc",
        key: "doc",
        width: "40%",
        // render: (text) => <Link to={"/"}>{text}</Link>,
    },
    {
        title: "Điểm tự chấm",
        dataIndex: "total_self_point",
        key: "total_self_point",
        width: "10%",
    },
    {
        title: "Điểm thực tế",
        dataIndex: "total_supervisor_point",
        key: "total_supervisor_point",
        width: "10%",
    },
    {
        title: "Xếp loại dự kiến",
        dataIndex: "rank",
        key: "rank",
        width: "10%",
        render: (text, record, index) => (
            <div>
                {record.total_supervisor_point
                    ? checkRank(record.total_supervisor_point)
                    : checkRank(record.total_self_point)}
            </div>
        ),
    },
    {
        title: "Thời gian",
        dataIndex: "year",
        key: "year",
        width: "10%",
    },
    {
        title: "Hành động",
        key: "action",
        width: "10%",
        align: "center",
        render: (_, record) => {
            return (
                <Link
                    to={`/grade/supervisor/history/${record.key}`}
                    className="action_link"
                >
                    Chi tiết <ArrowRightOutlined />
                </Link>
            )
        },
    },
]

export default columns
