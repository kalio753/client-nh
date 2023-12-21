import { Button, Input, Modal, notification } from "antd"
import React, { useState } from "react"

export default function DocumentContentTitleAdd({
    isContentTitleModalOpen,
    setIsContentTitleModalOpen,
    setDocument,
    toastApi,
}) {
    const [title, setTitle] = useState("")

    const handleTitleModalOk = () => {
        if (title === "") {
            toastApi.error({
                message: `Vui lòng nhập Tiêu đề`,
                description: "Tiêu đề không được để trống",
                placement: "top",
            })
        } else {
            setDocument((prev) => {
                if (!prev.section) {
                    prev.section = []
                }
                prev.section.push({
                    title,
                    total_point: 0,
                    content: [],
                })
                return prev
            })
            setTitle("")
            setIsContentTitleModalOpen(false)
        }
    }

    const handleTitleModalCancel = () => {
        setIsContentTitleModalOpen(false)
        setTitle("")
    }
    return (
        <Modal
            title="Thêm nội dung mới"
            centered
            className="doc_content_title_add_modal"
            open={isContentTitleModalOpen}
            onOk={handleTitleModalOk}
            onCancel={handleTitleModalCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <Button
                        danger
                        size="medium"
                        onClick={handleTitleModalCancel}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={handleTitleModalOk}
                    >
                        Lưu
                    </Button>
                </>
            )}
        >
            <div className="input_section">
                <div>Tiêu đề:</div>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
            </div>
        </Modal>
    )
}
