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
import SupervisorGradeTable from "../../component/supervisorGradeTable/SupervisorGradeTable"
import { useMyContext } from "../../hooks/myContext"
import { formatedDate, isDateExpired } from "../../utils/dateFormat"

export default function GradeSupervisor() {
    const { id } = useParams()
    const navigate = useNavigate()
    const currUser = decodeJWT(getCookie("token")).data
    const { user_dict } = useMyContext()

    // Toast msg
    const [toastApi, contextHolder] = notification.useNotification()
    const [isLoading, setisLoading] = useState(false)

    const [doc, setDocument] = useState()
    console.log("doc", doc)
    const isEditable = !isDateExpired(doc?.supervisor_expired)
    const userName = user_dict[doc?.owner]

    useEffect(() => {
        async function fetchData() {
            const res = await myAxios.get(`/grade/${id}`)
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

    const calculateSectionSupervisorPoints = (index) => {
        const total_point = doc?.section[index]?.content.reduce(
            (acc, content, index) => acc + content.supervisor_point,
            0,
        )

        return total_point && total_point > 0 ? total_point : 0
    }

    const handleOnSubmit = async () => {
        // const isNullSelfPoint = doc.section
        //     .map((section) =>
        //         section.content.some(
        //             (item) =>
        //                 (item.supervisor_point === null ||
        //                     item.supervisor_point === null) &&
        //                 currUser.role_id.includes(item.supervisor),
        //         ),
        //     )
        //     .some((item) => item)
        // if (isNullSelfPoint) {
        //     toastApi.error({
        //         message: `Vui lòng nhập điểm tại các nội dung lớn`,
        //         description:
        //             "Một hoặc một số nội dung điểm lớn đang bị để trống",
        //         placement: "top",
        //     })
        // } else {
        try {
            setisLoading(true)
            const total_supervisor_point = doc?.section?.reduce(
                (acc, docItem, index) => {
                    return calculateSectionSupervisorPoints(index) + acc
                },
                0,
            )
            const { section, process } = doc

            const userRoles = [...currUser.role_id]
            const docRoles = [...doc.supervisor_list]
            // check same element from role_list
            for (let i = 0; i < userRoles.length; i++) {
                const currentElement = userRoles[i]

                const indexInArray2 = docRoles.indexOf(currentElement)

                if (indexInArray2 !== -1) {
                    docRoles.splice(indexInArray2, 1)
                    i--
                }
            }
            const res = await myAxios.post(`grade/update/${doc._id}`, {
                section: [...section],
                process: [
                    ...process,
                    {
                        person: currUser._id,
                        graded_at: new Date(),
                    },
                ],
                supervisor_list: docRoles,
                total_supervisor_point,
            })

            if (res.data.status === "success") {
                toastApi.success({
                    message: `Chấm điểm thành công`,
                    description:
                        "Chấm điểm thành công, đang chuyển về trang trước",
                    placement: "top",
                })
                setTimeout(() => {
                    navigate("/grade/supervisor/history")
                }, 2300)
            }
        } catch (error) {
            setisLoading(false)
            console.error(error)
            toastApi.error({
                message: `Chấm điểm thất bại, vui lòng thử lại sau`,
                description: error.response.data.msg,
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
                <Breadcrumb.Item>Công việc của tôi</Breadcrumb.Item>
                <Breadcrumb.Item>Chấm điểm</Breadcrumb.Item>
                <Breadcrumb.Item>{userName}</Breadcrumb.Item>
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
                    <h3>{formatedDate(doc?.supervisor_expired)}</h3>
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
                                        {/* <span>
                                            ({calculateSectionSelfPoints(index)}
                                            /
                                            <b>
                                                {calculateSectionTotalPoints(
                                                    index,
                                                )}
                                            </b>{" "}
                                            Điểm)
                                        </span> */}
                                    </div>
                                </div>

                                <SupervisorGradeTable
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
