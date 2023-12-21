import React, { useState } from "react"
import "./docCreate.scss"
import { Breadcrumb, Button, Input, notification } from "antd"
import { useNavigate } from "react-router-dom"
import PlusBox from "../../component/plusBox/PlusBox"
import DocumentContentTitleAdd from "../../component/modals/DocumentContentTitleAdd"
import ContentSection from "../../component/contentSection/ContentSection"
import myAxios from "../../utils/axios"
import PopUpModal from "../../component/modals/PopUpModal"
const { TextArea } = Input

export default function DocCreate() {
    const navigate = useNavigate()

    // Toast msg
    const [toastApi, contextHolder] = notification.useNotification()
    const [count, setCount] = useState(0)
    const [title, setTitle] = useState("")
    const [isLoading, setisLoading] = useState(false)

    const [doc, setDocument] = useState({
        name: "",
        section: [
            {
                title: "Tư tưởng chính trị",
                total_point: 0,
                content: [
                    {
                        key: count,
                        supervisor: "",
                        name: "Chấp hành tốt chủ trương chính sách của Đảng, pháp luật nhà nước",
                        point: 0,
                        sub_criteria: [],
                    },
                ],
            },
        ],
    })
    console.log("doc ne", doc)

    const [isContentTitleModalOpen, setIsContentTitleModalOpen] =
        useState(false)
    const showContentTitleModal = () => {
        setIsContentTitleModalOpen(true)
    }

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
    const showCancelModal = () => {
        setIsCancelModalOpen(true)
    }
    const handleCancelModal = () => {
        navigate("/docs")
    }

    const handleCreateDocument = async () => {
        const nullSupervisor = doc.section.every((section) =>
            section.content.some((content) => content.supervisor === ""),
        )

        if (title === "") {
            toastApi.error({
                message: `Vui lòng nhập tên tài liệu`,
                description: "Tên tài liệu không được để trống",
                placement: "top",
            })
        } else if (doc.section.length === 0) {
            toastApi.error({
                message: `Vui lòng tạo các nội dung cho tài liệu`,
                description: "Tài liệu không được rỗng, cần có nội dung",
                placement: "top",
            })
        } else if (nullSupervisor) {
            toastApi.error({
                message: `Vui lòng chọn người phụ trách`,
                description:
                    "Chưa chọn người phụ trách cho một hoặc một số nội dung",
                placement: "top",
            })
        } else {
            try {
                setisLoading(true)
                const response = await myAxios.post("docs/add", doc)
                if (response.data.status === "success") {
                    setisLoading(false)
                    toastApi.success({
                        message: `Tạo tài liệu thành công`,
                        description:
                            "Tạo tài liệu thành công, đang chuyển về trang trước",
                        placement: "top",
                    })
                    navigate("/docs")
                }
            } catch (error) {
                console.error(error)
                setisLoading(false)
                toastApi.error({
                    message: `Tạo tài liệu thất bại`,
                    description: error,
                    placement: "top",
                })
            }
        }
        console.log(doc)
    }

    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Administrator</Breadcrumb.Item>
                <Breadcrumb.Item>Cập nhật tài liệu</Breadcrumb.Item>
                <Breadcrumb.Item>Tài liệu mới</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container doc_create_container"
                style={{ flex: 1 }}
            >
                <div className="top_section">
                    <h1 style={{ color: "black" }}>Tạo tài liệu mới</h1>
                </div>

                <div className="divider"></div>

                <div className="create_section">
                    <div className="doc_title_input">
                        <h2>Tên tài liệu:</h2>
                        <TextArea
                            autoSize
                            value={doc?.name}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setDocument((prev) => {
                                    return { ...prev, name: e.target.value }
                                })
                            }}
                        />
                    </div>

                    <ContentSection
                        doc={doc}
                        setDocument={setDocument}
                        count={count}
                        setCount={setCount}
                    />

                    <PlusBox
                        size="large"
                        content="Thêm nội dung"
                        onClick={showContentTitleModal}
                    />
                </div>

                <div className="action_section">
                    <Button block danger onClick={showCancelModal}>
                        Hủy bỏ
                    </Button>
                    <Button
                        type="primary"
                        block
                        onClick={handleCreateDocument}
                        loading={isLoading}
                    >
                        Hoàn thành
                    </Button>
                </div>
            </div>

            <DocumentContentTitleAdd
                isContentTitleModalOpen={isContentTitleModalOpen}
                setIsContentTitleModalOpen={setIsContentTitleModalOpen}
                setDocument={setDocument}
                toastApi={toastApi}
            />

            <PopUpModal
                isOpen={isCancelModalOpen}
                setIsOpen={setIsCancelModalOpen}
                handleOk={handleCancelModal}
                isDanger={true}
                content="Hủy bỏ tài liệu này và quay lại trang trước?"
                title="Xác nhận hủy"
            />
        </>
    )
}
