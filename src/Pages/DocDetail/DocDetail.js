import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import "./docDetail.scss"
import { Breadcrumb, Button, Input, Modal, Table, notification } from "antd"
import { DeleteFilled, PlusOutlined } from "@ant-design/icons"
import PlusBox from "../../component/plusBox/PlusBox"
import DocumentContentTitleAdd from "../../component/modals/DocumentContentTitleAdd"
import myAxios from "../../utils/axios"
import PopUpModal from "../../component/modals/PopUpModal"
import DocumentContentSection from "../../component/contentSection/DocumentContentSection"
const { TextArea } = Input

export default function DocDetail() {
    const { docId } = useParams()
    const navigate = useNavigate()

    // Toast msg
    const [toastApi, contextHolder] = notification.useNotification()
    const [count, setCount] = useState(0)
    const [title, setTitle] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [doc, setDocument] = useState()
    useEffect(() => {
        async function fetchData() {
            const res = await myAxios.get(`/docs/${docId}`)
            setDocument(res.data.data)
            setTitle(res.data.data.name)
            setCount(res.data.data.last_key)
        }
        fetchData()
    }, [])

    console.log(doc)

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
        } else if (doc?.section.length === 0) {
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
            setIsCreateModalOpen(true)
        }
    }

    const handleUpdateDocument = async () => {
        try {
            const nested_supervisor_list = doc.section.map((section) => {
                return section.content.reduce((acc, section) => {
                    return acc.includes(section.supervisor)
                        ? acc
                        : [...acc, section.supervisor]
                }, [])
            })
            const supervisor_list = [...new Set(nested_supervisor_list.flat())]
            console.log("supervisor_list", supervisor_list)
            setisLoading(true)
            const response = await myAxios.post(`docs/update/${doc._id}`, {
                ...doc,
                last_key: count,
                supervisor_list: supervisor_list,
            })
            if (response.data.status === "success") {
                setisLoading(false)
                toastApi.success({
                    message: `Cập nhật tài liệu thành công`,
                    description:
                        "Cập nhật tài liệu thành công, đang chuyển về trang trước",
                    placement: "top",
                })
                navigate("/docs")
            }
        } catch (error) {
            console.error(error)
            setisLoading(false)
            toastApi.error({
                message: `Cập nhật tài liệu thất bại`,
                description: error,
                placement: "top",
            })
        }
    }

    const [isDeleteDocumentOpen, setIsDeleteDocumentOpen] = useState(false)
    const showDeleteModal = () => {
        setIsDeleteDocumentOpen(true)
    }

    const handleDeleteDocument = async () => {
        try {
            setisLoading(true)
            const response = await myAxios.post(`docs/delete/${doc._id}`, doc)
            if (response.data.status === "success") {
                setisLoading(false)
                toastApi.success({
                    message: `Xóa tài liệu thành công`,
                    description:
                        "Xóa tài liệu thành công, đang chuyển về trang trước",
                    placement: "top",
                })
                navigate("/docs")
            }
        } catch (error) {
            console.error(error)
            setisLoading(false)
            toastApi.error({
                message: `Xóa tài liệu thất bại`,
                description: error,
                placement: "top",
            })
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
                <Breadcrumb.Item>Administrator</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(-1)}>
                    Cập nhật tài liệu
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tài liệu {doc?.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container doc_detail_container"
                style={{ flex: 1 }}
            >
                <div className="top_section">
                    <h1 style={{ color: "black" }}>Chi tiết tài liệu</h1>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteFilled />}
                        size="medium"
                        onClick={showDeleteModal}
                    >
                        Xóa tài liệu
                    </Button>
                </div>

                <div className="divider"></div>

                <div className="update_section">
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
                        Cập nhật
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
                content="Hủy bỏ việc cập nhật và quay lại trang trước?"
                title="Xác nhận hủy"
            />

            <PopUpModal
                isOpen={isDeleteDocumentOpen}
                setIsOpen={setIsDeleteDocumentOpen}
                handleOk={handleDeleteDocument}
                isDanger={true}
                content="Xóa bỏ tài liệu này vĩnh viễn?"
                title="Xác nhận xóa tài liệu"
            />

            <PopUpModal
                isOpen={isCreateModalOpen}
                setIsOpen={setIsCreateModalOpen}
                handleOk={handleUpdateDocument}
                isDanger={false}
                content="Bạn đã chắc chắn các nội dung trên đã chính xác?"
                title="Xác nhận lưu tài liệu"
            />
        </>
    )
}
