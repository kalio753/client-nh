import React, { useContext, useEffect, useRef, useState } from "react"
import { Breadcrumb, Button, notification } from "antd"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import myAxios from "../../utils/axios"
import PopUpModal from "../../component/modals/PopUpModal"
import "./gradeSelf.scss"
import intToRoman from "../../utils/intToRoman"
import GradeTable from "../../component/gradeTable/GradeTable"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"
import { formatedDate, isDateExpired } from "../../utils/dateFormat"
import {
    calculateSectionSelfPoints,
    calculateTotalPoint,
} from "../../utils/calculatePoint"

export default function GradeSelf() {
    const { docId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    // Toast msg
    const [toastApi, contextHolder] = notification.useNotification()
    const [isLoading, setisLoading] = useState(false)
    const currUser = decodeJWT(getCookie("token")).data

    const [doc, setDocument] = useState()
    console.log("doc ne", doc)
    const isEditable = !isDateExpired(doc?.self_expired)

    useEffect(() => {
        async function fetchData() {
            const res = await myAxios.get(
                `${
                    !location.pathname.includes("history")
                        ? `/docs/${docId}`
                        : `/grade/${docId}`
                }`,
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
        navigate(-1)
    }

    const handleOnSubmit = async () => {
        console.log(
            doc.section.map((section) =>
                section.content.map((item) => item.self_point),
            ),
        )
        // const isNullSelfPoint = doc.section
        //     .map((section) => section.content.map((item) => item.self_point))
        //     .some((value) => {
        //         return value.includes(undefined, null)
        //     })
        // console.log(isNullSelfPoint)

        // if (isNullSelfPoint) {
        //     toastApi.error({
        //         message: `Vui lòng nhập tại các nội dung lớn`,
        //         description: "Chưa chấm điểm cho một hoặc một số nội dung",
        //         placement: "top",
        //     })
        // } else {
        try {
            const total_self_point = doc?.section?.reduce(
                (acc, docItem, index) => {
                    return calculateSectionSelfPoints(doc, index) + acc
                },
                0,
            )

            let response
            if (!location.pathname.includes("history")) {
                const { _id, created_at, ...request_obj } = doc
                const gradeSessionObj = {
                    ...request_obj,
                    doc_id: _id,
                    total_self_point,
                    owner: currUser._id,
                    dept_id: currUser.department_id,
                    created_at: new Date(),
                }

                response = await myAxios.post("/grade/add", gradeSessionObj)
            } else {
                response = await myAxios.post(`/grade/update/${doc?._id}`, {
                    ...doc,
                    total_self_point,
                })
            }
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
        // }
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

                <div className="expired_section">
                    <span>Hạn chót đánh giá: </span>
                    <h3>{formatedDate(doc?.self_expired)}</h3>
                </div>

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
                                    isEditable={isEditable}
                                    isSupervisor={false}
                                    showSupervisor={doc.total_supervisor_point}
                                />
                            </div>
                        )
                    })}
                </div>

                <h2 className="total_point">
                    Tổng điểm: {calculateTotalPoint(doc, "SELF")}{" "}
                </h2>

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
                        <Button block danger onClick={() => navigate(-1)}>
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
