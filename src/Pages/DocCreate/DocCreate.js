import React, { useState } from "react"
import "./docCreate.scss"
import { Breadcrumb, Button, DatePicker, Input, notification } from "antd"
import { useNavigate } from "react-router-dom"
import PlusBox from "../../component/plusBox/PlusBox"
import DocumentContentTitleAdd from "../../component/modals/DocumentContentTitleAdd"
import myAxios from "../../utils/axios"
import PopUpModal from "../../component/modals/PopUpModal"
import DocumentContentSection from "../../component/contentSection/DocumentContentSection"
import defaultDoc from "./defaultDoc"
const { TextArea } = Input

export default function DocCreate() {
    const navigate = useNavigate()

    // Toast msg
    const [toastApi, contextHolder] = notification.useNotification()
    const [count, setCount] = useState(0)
    const [title, setTitle] = useState(defaultDoc.name)
    const [isLoading, setisLoading] = useState(false)
    const [selfExpired, setSelfExpired] = useState("")
    const [supervisorExpired, setSupervisorExpired] = useState("")

    const [doc, setDocument] = useState(defaultDoc)
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
        navigate(-1)
    }

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const showCreateModal = () => {
        const nullSupervisor = doc.section
            .map((section) =>
                section.content.map((content) => content.supervisor),
            )
            .some((value) => value.includes(""))

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
        } else if (!selfExpired || !supervisorExpired) {
            toastApi.error({
                message: `Vui lòng chọn ngày hết hạn`,
                description: "Chưa chọn ngày hết hạn cho tài liệu",
                placement: "top",
            })
        } else {
            setIsCreateModalOpen(true)
        }
    }

    const handleCreateDocument = async () => {
        try {
            setisLoading(true)
            const supervisor_list = doc.section.map((section) => {
                return section.content.reduce((acc, section) => {
                    return acc.includes(section.supervisor)
                        ? acc
                        : [...acc, section.supervisor]
                }, [])
            })

            const response = await myAxios.post("docs/add", {
                ...doc,
                last_key: count,
                supervisor_list: supervisor_list[0],
                self_expired: selfExpired,
                supervisor_expired: supervisorExpired,
            })
            if (response.data.status === "success") {
                toastApi.success({
                    message: `Tạo tài liệu thành công`,
                    description:
                        "Tạo tài liệu thành công, đang chuyển về trang trước",
                    placement: "top",
                })
                setTimeout(() => {
                    navigate("/docs")
                }, 2000)
            }
        } catch (error) {
            console.error(error)
            setisLoading(false)
            toastApi.error({
                message: `Tạo tài liệu thất bại`,
                description: error.response.data.msg,
                placement: "top",
            })
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
                <Breadcrumb.Item onClick={() => navigate(-1)}>
                    Cập nhật tài liệu
                </Breadcrumb.Item>
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
                    <div className="doc_title">
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
                        <div className="expired_section">
                            <div style={{ marginBottom: 8 }}>
                                Hạn chót cho giáo viên:
                                <DatePicker
                                    onChange={(date, dateString) =>
                                        setSelfExpired(dateString)
                                    }
                                    style={{ marginLeft: 8 }}
                                />
                            </div>

                            <div>
                                Hạn chót cho người phụ trách:
                                <DatePicker
                                    onChange={(date, dateString) =>
                                        setSupervisorExpired(dateString)
                                    }
                                    style={{ marginLeft: 8 }}
                                />
                            </div>
                        </div>
                    </div>

                    <DocumentContentSection
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
                        onClick={showCreateModal}
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

            <PopUpModal
                isOpen={isCreateModalOpen}
                setIsOpen={setIsCreateModalOpen}
                handleOk={handleCreateDocument}
                isDanger={false}
                content="Bạn đã chắc chắn các nội dung trên đã chính xác?"
                title="Xác nhận lưu tài liệu"
            />
        </>
    )
}
