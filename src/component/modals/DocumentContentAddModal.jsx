import { Button, Input, InputNumber, Modal, Select, notification } from "antd"
import { DownOutlined } from "@ant-design/icons"

import React, { useEffect, useState } from "react"

import "./modal.scss"
const { TextArea } = Input

export default function ContentAddModal({
    isContentModal,
    setIsContentModal,
    setDocument,
    currContentIndex,
    toastApi,
}) {
    const [criteria, setCriteria] = useState([{}])
    const [supervisor, setSupervisor] = useState("")

    const handleContentModalOk = () => {
        let isCriteriaEmpty = false
        criteria.forEach((item) => {
            if (item.name === "" || item.point === 0) isCriteriaEmpty = true
        })
        if (supervisor === "") {
            toastApi.error({
                message: `Vui lòng chọn một người phụ trách`,
                description: "Các trường thông tin không được để trống",
                placement: "top",
            })
        } else if (isCriteriaEmpty) {
            toastApi.error({
                message: `Vui lòng hoàn thành các tiểu mục`,
                description: "Các trường thông tin không được để trống",
                placement: "top",
            })
        } else {
            // Save to the document
            setDocument((prev) => {
                prev.section.map((item, index) => {
                    if (index === currContentIndex) {
                        return {
                            ...item,
                            content: item.content.push({
                                supervisor,
                                criteria,
                            }),
                        }
                    }
                })

                return prev
            })

            // Refresh field
            setCriteria([{}])
            setSupervisor(null)
            setIsContentModal(false)
        }
    }

    const handleContentModalCancel = () => {
        setCriteria([{}])
        setIsContentModal(false)
    }

    const handleChange = (value) => {
        setSupervisor(value)
    }

    const handleContentNameChange = (e, index) => {
        setCriteria((prev) => {
            return prev.map((prevItem, prevIndex) => {
                if (index === prevIndex) {
                    return {
                        ...prevItem,
                        name: e.target.value,
                    }
                }
                return {
                    ...prevItem,
                }
            })
        })
    }

    const handleContentPointChange = (e, index) => {
        setCriteria((prev) => {
            return prev.map((prevItem, prevIndex) => {
                if (index === prevIndex) {
                    return {
                        ...prevItem,
                        point: e,
                    }
                }
                return {
                    ...prevItem,
                }
            })
        })
    }

    return (
        <Modal
            title="Thêm mục mới"
            centered
            width="45%"
            className="doc_detail_content_add_modal"
            open={isContentModal}
            onOk={handleContentModalOk}
            onCancel={handleContentModalCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <Button
                        danger
                        size="medium"
                        onClick={handleContentModalCancel}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={handleContentModalOk}
                    >
                        Lưu
                    </Button>
                </>
            )}
        >
            <div className="section_list">
                {/* Selection */}
                <div className="supervisor_section">
                    <div>Người phụ trách:</div>
                    <Select
                        className="supervisor_select"
                        style={{
                            width: "100%",
                        }}
                        value={supervisor}
                        onChange={handleChange}
                        options={[
                            {
                                value: "jack",
                                label: "Jack",
                            },
                            {
                                value: "lucy",
                                label: "Lucy",
                            },
                            {
                                value: "Yiminghe",
                                label: "yiminghe",
                            },
                        ]}
                    />
                </div>

                {/* Criteria */}
                {criteria.map((item, index) => (
                    <div key={index} style={{ marginBottom: 8 }}>
                        {/* Content */}
                        <div className="title_section">
                            <div>Tiểu mục {index + 1}:</div>
                            <TextArea
                                placeholder=""
                                autoSize
                                value={item.name}
                                onChange={(e) =>
                                    handleContentNameChange(e, index)
                                }
                            />
                        </div>

                        {/* Point */}
                        <div className="point_section">
                            <div>Điểm:</div>
                            <InputNumber
                                min={1}
                                value={item.point}
                                onChange={(e) =>
                                    handleContentPointChange(e, index)
                                }
                            />
                        </div>
                    </div>
                ))}
                <Button
                    type="link"
                    className="more_btn"
                    onClick={() => {
                        setCriteria((prev) => [
                            ...prev,
                            { name: "", point: "" },
                        ])
                    }}
                >
                    Thêm tiểu mục mới...
                </Button>
            </div>
        </Modal>
    )
}
