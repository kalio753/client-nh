import React, { useContext, useEffect, useRef, useState } from "react"
import { Breadcrumb, Button, notification } from "antd"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import myAxios from "../../utils/axios"
import PopUpModal from "../../component/modals/PopUpModal"
import intToRoman from "../../utils/intToRoman"
import GradeTable from "../../component/gradeTable/GradeTable"
import { useMyContext } from "../../hooks/myContext"
import {
    calculateSectionSelfPoints,
    calculateSectionTotalPoints,
} from "../../utils/calculatePoint"
import generateExcel from "../../utils/generateExcel"
import downloadImg from "../../images/download.svg"

export default function GradeGeneralDetail() {
    const { gradeId, userId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const { user_list, user_dict } = useMyContext()

    const [doc, setDocument] = useState()
    console.log("doc ne", doc)
    const userName = user_dict[doc?.owner]
    console.log(userName)

    useEffect(() => {
        async function fetchData() {
            const res = await myAxios.get(`/grade/${userId}`)
            const newDoc = res.data.data
            setDocument(newDoc)
        }
        fetchData()
    }, [])

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

    const handleCancelModal = () => {
        navigate("/grade")
    }

    const handleGenerateExcel = () => {
        generateExcel({ userName, header: `Giáo viên: ${userName}`, data: doc })
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
                    <h1 style={{ color: "black", maxWidth: "80%" }}>
                        {userName}
                    </h1>

                    <Button
                        onClick={handleGenerateExcel}
                        style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={downloadImg}
                            style={{
                                width: 16,
                                filter: "brightness(0) saturate(100%) invert(59%) sepia(98%) saturate(479%) hue-rotate(73deg) brightness(84%) contrast(95%)",
                            }}
                        />
                        Download
                    </Button>
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
                                            (
                                            {calculateSectionSelfPoints(
                                                doc,
                                                index,
                                            )}
                                            /<b>{docItem.total_point}</b> Điểm)
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
                                    showSupervisor={
                                        !location.pathname.includes("grade")
                                    }
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
