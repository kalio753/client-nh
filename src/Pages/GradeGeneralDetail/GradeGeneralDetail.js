import React, { useContext, useEffect, useRef, useState } from "react"
import { Breadcrumb, Button, notification } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import myAxios from "../../utils/axios"
import PopUpModal from "../../component/modals/PopUpModal"
import intToRoman from "../../utils/intToRoman"
import GradeTable from "../../component/gradeTable/GradeTable"
import { useMyContext } from "../../hooks/myContext"

export default function GradeGeneralDetail() {
    const { gradeId, userId } = useParams()
    const navigate = useNavigate()

    const { user_list } = useMyContext()
    let user_dict = {}
    for (const user of user_list) {
        const key = user["_id"]
        user_dict[key] = user.name
    }
    const userName = user_dict[userId]

    const [doc, setDocument] = useState()
    console.log("doc ne", doc)

    useEffect(() => {
        async function fetchData() {
            const res = await myAxios.get(`/grade/${gradeId}`)
            const newDoc = res.data.data
            setDocument(newDoc)
        }
        fetchData()
    }, [])

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

    const handleCancelModal = () => {
        navigate("/grade")
    }

    const calculateSectionTotalPoints = (index) => {
        const total_point = doc?.section[index]?.content.reduce(
            (acc, content, index) => acc + content.point,
            0,
        )

        return total_point
    }
    const calculateSectionSelfPoints = (index) => {
        const total_point = doc?.section[index]?.content.reduce(
            (acc, content, index) => acc + content.self_point,
            0,
        )

        return total_point
    }

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Mọi người</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(-2)}>
                    Điểm thi đua
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(-1)}>
                    {userName}
                </Breadcrumb.Item>
                <Breadcrumb.Item>{doc?.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container grade_self_container"
                style={{ flex: 1 }}
            >
                <div className="top_section">
                    <h1 style={{ color: "black" }}>{doc?.name}</h1>
                </div>

                <div className="divider"></div>

                <div className="grade_section">
                    {doc?.section?.map((docItem, index) => {
                        const tableData = [...docItem.content]
                        return (
                            <div className="content" key={index}>
                                <div className="content_header">
                                    <div className="content_header_left">
                                        <h2>
                                            {intToRoman(index + 1)}.{" "}
                                            {docItem.title}
                                        </h2>{" "}
                                        <span>
                                            ({calculateSectionSelfPoints(index)}
                                            /
                                            <b>
                                                {calculateSectionTotalPoints(
                                                    index,
                                                )}
                                            </b>{" "}
                                            Điểm)
                                        </span>
                                    </div>
                                </div>

                                <GradeTable
                                    dataSource={tableData}
                                    pagination={false}
                                    rowClassName={() => "editable-row"}
                                    bordered
                                    setDocument={setDocument}
                                    isEditable={false}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="action_section">
                    <Button block danger onClick={() => navigate(-1)}>
                        Quay lại
                    </Button>
                </div>
            </div>

            <PopUpModal
                isOpen={isCancelModalOpen}
                setIsOpen={setIsCancelModalOpen}
                handleOk={handleCancelModal}
                isDanger={true}
                content="Hủy bỏ điểm số đã chấm và quay lại trang trước?"
                title="Xác nhận hủy"
            />
        </>
    )
}
