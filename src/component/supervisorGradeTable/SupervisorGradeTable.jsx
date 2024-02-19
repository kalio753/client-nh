import React from "react"
import { tableComponents } from "./components"
import { Table } from "antd"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"

export default function SupervisorGradeTable({
    setDocument,
    isEditable,
    ...props
}) {
    const currUser = decodeJWT(getCookie("token")).data

    const defaultColumns = [
        {
            title: "Nội dung",
            dataIndex: "name",
            width: "60%",
        },
        {
            title: "Điểm quy định",
            dataIndex: "point",
        },
        {
            title: "Điểm tự chấm",
            dataIndex: "self_point",
        },
        {
            title: "Điểm tổ CM chấm",
            dataIndex: "supervisor_point",
            editable: currUser.role_id,
        },
    ]

    const handleSave = (record) => {
        setDocument((prev) => {
            const section = prev.section.map((item) => {
                const newContent = item.content.map((item) =>
                    item.key === record.key ? record : item,
                )
                return { ...item, content: newContent }
            })

            return { ...prev, section }
        })
    }
    const components = tableComponents
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record) => {
                const editable =
                    col.editable.includes(record.supervisor) && isEditable

                return {
                    record,
                    editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave,
                }
            },
        }
    })

    const expandedRowRender = (record) => {
        const dataSource = [...record.sub_criteria]
        const supervisor = record.supervisor

        const handleSave = (record) => {
            setDocument((prev) => {
                const section = prev.section.map((section) => {
                    const newContent = section.content.map((content) => {
                        if (content.key === record.parentKey) {
                            return {
                                ...content,
                                sub_criteria: content.sub_criteria.map(
                                    (criteria) =>
                                        criteria.key === record.key
                                            ? record
                                            : criteria,
                                ),
                            }
                        }
                        return content
                    })
                    return { ...section, content: newContent }
                })
                return { ...prev, section }
            })
        }

        const defaultColumns = [
            {
                width: "5%",
                title: "",
                dataIndex: "l",
            },
            {
                width: "57%",
                title: "Ghi chú",
                dataIndex: "name",
            },
            {
                title: "Điểm quy định",
                dataIndex: "point",
            },
            {
                title: "Điểm tự chấm",
                dataIndex: "self_point",
            },
            {
                title: "Điểm tổ CM chấm",
                dataIndex: "supervisor_point",
                editable: currUser.role_id,
            },
        ]

        const columns = defaultColumns.map((col) => {
            if (!col.editable) {
                return col
            }
            return {
                ...col,
                onCell: (record) => {
                    return {
                        record,
                        editable:
                            col.editable.includes(record.supervisor) &&
                            isEditable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave,
                    }
                },
            }
        })

        // return <Table columns={columns} dataSource={data} pagination={false} />
        return (
            <>
                {dataSource.length > 0 ? (
                    <Table
                        pagination={false}
                        components={components}
                        rowClassName={() => "editable-row"}
                        // bordered
                        dataSource={dataSource}
                        columns={columns}
                        className="expanded-table"
                    />
                ) : null}
            </>
        )
    }
    return (
        <Table
            {...props}
            components={components}
            columns={columns}
            expandable={{
                expandedRowRender,
                defaultExpandAllRows: true,
            }}
            className="main-table"
        />
    )
}
