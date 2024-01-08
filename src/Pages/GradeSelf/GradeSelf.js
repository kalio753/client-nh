import React, { useContext, useEffect, useRef, useState } from "react"
import { Breadcrumb, Button, notification } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import myAxios from "../../utils/axios"
import PopUpModal from "../../component/modals/PopUpModal"
import "./gradeSelf.scss"
import intToRoman from "../../utils/intToRoman"
import GradeTable from "../../component/gradeTable/GradeTable"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"

export default function GradeSelf({ isEditable }) {
    const { docId } = useParams()
    const navigate = useNavigate()

    // Toast msg
    const [toastApi, contextHolder] = notification.useNotification()
    const [isLoading, setisLoading] = useState(false)

    const [doc, setDocument] = useState()
    console.log("doc ne", doc)

    useEffect(() => {
        async function fetchData() {
            const res = await myAxios.get(
                `${isEditable ? `/docs/${docId}` : `/grade/${docId}`}`,
            )
            const newDoc = res.data.data
            setDocument(newDoc)
        }
        fetchData()
    }, [])

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
    const showCancelModal = () => {
        setIsCancelModalOpen(true)
    }
    const handleCancelModal = () => {
        navigate("/grade")
    }

    const calculateSectionTotalPoints = (index) => {
        const total_point = doc?.section[index]?.content.reduce(
            (acc, content, index) => acc + content.point,
            0,
        )

        return total_point ? total_point : 0
    }
    const calculateSectionSelfPoints = (index) => {
        const total_point = doc?.section[index]?.content.reduce(
            (acc, content, index) => acc + content.self_point,
            0,
        )

        return total_point ? total_point : 0
    }

    const handleOnSubmit = async () => {
        console.log(
            doc.section.map((section) =>
                section.content.map((item) => item.self_point),
            ),
        )
        const isNullSelfPoint = doc.section
            .map((section) => section.content.map((item) => item.self_point))
            .some((value) => {
                return value.includes(undefined, null)
            })
        console.log(isNullSelfPoint)

        if (isNullSelfPoint) {
            toastApi.error({
                message: `Vui lòng nhập tại các nội dung lớn`,
                description: "Chưa chấm điểm cho một hoặc một số nội dung",
                placement: "top",
            })
        } else {
            try {
                setisLoading(true)
                const total_self_point = doc?.section?.reduce(
                    (acc, docItem, index) => {
                        return calculateSectionSelfPoints(index) + acc
                    },
                    0,
                )
                const { _id, created_at, ...request_obj } = doc
                const user_id = decodeJWT(getCookie("token")).data._id

                const gradeSessionObj = {
                    ...request_obj,
                    doc_id: _id,
                    total_self_point,
                    owner: user_id,
                }

                const response = await myAxios.post(
                    "/grade/add",
                    gradeSessionObj,
                )
                if (response.data.status === "success") {
                    toastApi.success({
                        message: `Chấm điểm thành công`,
                        description:
                            "Chấm điểm thành công, đang chuyển về trang trước",
                        placement: "top",
                    })
                    setTimeout(() => {
                        navigate("/grade/history")
                    }, 2300)
                }
            } catch (error) {
                console.error(error)
                setisLoading(false)
                toastApi.error({
                    message: `Chấm điểm thất bại`,
                    description: error,
                    placement: "top",
                })
            }
        }
    }

    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Điểm của tôi</Breadcrumb.Item>
                <Breadcrumb.Item
                    onClick={() => {
                        isEditable ? showCancelModal() : navigate(-1)
                    }}
                >
                    Chấm điểm
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
                                    isEditable={isEditable}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="action_section">
                    {isEditable ? (
                        <>
                            <Button block danger onClick={showCancelModal}>
                                Hủy bỏ
                            </Button>
                            <Button
                                type="primary"
                                block
                                onClick={handleOnSubmit}
                                loading={isLoading}
                            >
                                Hoàn thành
                            </Button>
                        </>
                    ) : (
                        <Button
                            block
                            danger
                            onClick={() => navigate("/grade/history")}
                        >
                            Quay lại
                        </Button>
                    )}
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
