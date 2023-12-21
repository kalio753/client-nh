import { Modal } from "antd"
import React from "react"

export default function PopUpModal({
    isOpen,
    setIsOpen,
    content,
    title,
    isDanger,
    handleOk,
}) {
    const hideModal = () => {
        setIsOpen(false)
    }

    return (
        <Modal
            title={title}
            open={isOpen}
            onOk={handleOk}
            onCancel={hideModal}
            centered
            okButtonProps={{ danger: isDanger, type: "primary" }}
        >
            <div>{content}</div>
        </Modal>
    )
}
