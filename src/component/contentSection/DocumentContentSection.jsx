import { Button, Checkbox, InputNumber, Popconfirm } from "antd"
import React, { useEffect, useState } from "react"
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import EditableTable from "./Table/EditableTable"
import intToRoman from "../../utils/intToRoman"
import "./contentSection.scss"
import { useMyContext } from "../../hooks/myContext"

export default function DocumentContentSection({
    doc,
    setDocument,
    count,
    setCount,
}) {
    const [roles, setRoles] = useState(role_list)
    const [_, setTick] = useState(0)
    const forceUpdate = () => setTick((t) => t + 1)

    const { role_list } = useMyContext()
    useEffect(() => {
        setRoles(role_list)
    }, [role_list])

    const handleAdd = (title) => {
        setCount(count + 1)
        setDocument((prev) => {
            const newSection = prev.section.map((doc) => {
                if (doc.title === title) {
                    const newContent = {
                        key: count + 1,
                        supervisor: ``,
                        name: "Chấp hành chủ trương hiến pháp",
                        point: 20,
                        sub_criteria: [],
                    }
                    doc.content.push(newContent)
                    return {
                        ...doc,
                    }
                } else return doc
            })
            return { ...prev, section: newSection }
        })
    }

    const handleSectionDelete = (index) => {
        setDocument((prev) => {
            const newSection = prev.section.filter(
                (section, sectionIndex) => sectionIndex !== index,
            )
            return { ...prev, section: newSection }
        })
    }

    const onCheckBoxChange = (e, docItem) => {
        if (e.target.checked) docItem.is_total = e.target.checked
        else delete docItem.is_total
        forceUpdate()
    }

    return (
        <>
            <div className="content_list">
                {doc?.section.length > 0 ? (
                    <>
                        {doc?.section?.map((docItem, index) => {
                            const tableData = [...docItem.content]
                            return (
                                <div className="content" key={index}>
                                    {/* Header */}
                                    <div className="content_header">
                                        <div className="content_header_left">
                                            <h2>
                                                {intToRoman(index + 1)}.{" "}
                                                {docItem.title}
                                            </h2>{" "}
                                            <span>
                                                (
                                                {docItem.is_total ? (
                                                    <InputNumber
                                                        defaultValue={
                                                            docItem.total_point ||
                                                            0
                                                        }
                                                        onChange={(value) => {
                                                            docItem.total_point =
                                                                value
                                                        }}
                                                    />
                                                ) : (
                                                    <b>{docItem.total_point}</b>
                                                )}{" "}
                                                Điểm)
                                            </span>
                                            <Checkbox
                                                onChange={(e) =>
                                                    onCheckBoxChange(e, docItem)
                                                }
                                                defaultChecked={
                                                    docItem.is_total
                                                }
                                            >
                                                Điểm tổng
                                            </Checkbox>
                                        </div>
                                        <div>
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                size="medium"
                                                onClick={() =>
                                                    handleAdd(docItem.title)
                                                }
                                            >
                                                Thêm mục
                                            </Button>

                                            <Popconfirm
                                                onConfirm={() =>
                                                    handleSectionDelete(index)
                                                }
                                                title="Xác nhận xóa nội dung?"
                                            >
                                                <Button
                                                    style={{ marginLeft: 8 }}
                                                    icon={<DeleteOutlined />}
                                                    size="medium"
                                                    type="primary"
                                                    danger
                                                >
                                                    {" "}
                                                    Xóa nội dung
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    </div>

                                    {/* Tiểu mục */}
                                    <div
                                        style={{
                                            margin: 16,
                                        }}
                                    >
                                        <EditableTable
                                            pagination={false}
                                            rowClassName={() => "editable-row"}
                                            bordered
                                            dataSource={tableData}
                                            doc={doc}
                                            setDocument={setDocument}
                                            count={count}
                                            setCount={setCount}
                                            roles={roles}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <div className="content_blank">
                        Nội dung trống, vui lòng nhấn vào nút bên dưới để khởi
                        tạo!
                    </div>
                )}
            </div>
        </>
    )
}
