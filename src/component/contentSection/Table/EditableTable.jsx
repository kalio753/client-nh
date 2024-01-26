import { Button, Popconfirm, Table } from "antd"
import React from "react"
import { components } from "./components"

export default function EditableTable({
    doc,
    setDocument,
    count,
    setCount,
    roles,
    ...props
}) {
    const locale = { emptyText: "Chưa có dữ liệu" }

    const handleSave = (record) => {
        setDocument((prev) => {
            const section = prev.section.map((item) => {
                const newContent = item.content.map((ele) =>
                    ele.key === record.key ? record : ele,
                )
                const sectionTotalPoint = item.content.reduce(
                    (acc, ele) => acc + ele.point,
                    0,
                )
                return {
                    ...item,
                    content: newContent,
                    total_point: sectionTotalPoint,
                }
            })

            return { ...prev, section }
        })
    }

    const handleDelete = (key) => {
        setDocument((prev) => {
            const section = prev.section.map((item) => {
                const newContent = item.content.filter(
                    (item) => item.key !== key,
                )
                return { ...item, content: newContent }
            })

            return { ...prev, section }
        })
    }

    const expandTableRow = (key) => {
        setCount(count + 1)
        const newSection = doc.section.map((section) => {
            console.log("section neeee", section)
            section.content.map((content) => {
                if (content.key === key) {
                    return {
                        ...content,
                        sub_criteria: content.sub_criteria.push({
                            key: count + 1,
                            parentKey: key,
                            name: `Sub criteria ${count + 1}`,
                            point: 15,
                            supervisor: content.supervisor,
                        }),
                    }
                } else return { ...content }
            })
            return section
            // })
        })
        console.log("newSection", newSection)
        setDocument((prev) => {
            return { ...prev, section: newSection }
        })
    }

    const defaultColumns = [
        {
            title: "Người phụ trách",
            dataIndex: "supervisor",
            width: "20%",
            // align: "center",
            editable: true,
        },
        {
            width: "50%",
            title: "Nội dung",
            dataIndex: "name",
            editable: true,
        },
        {
            title: "Điểm",
            dataIndex: "point",
            editable: true,
        },
        {
            title: "Hành động",
            dataIndex: "operation",
            align: "center",
            width: "10%",
            render: (_, record) => {
                return (
                    <>
                        <Popconfirm
                            title="Bạn có chắc là muốn xóa dòng này?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Button type="link" danger>
                                Xóa
                            </Button>
                        </Popconfirm>

                        <Button
                            type="link"
                            onClick={() => expandTableRow(record.key)}
                        >
                            Thêm ghi chú
                        </Button>
                    </>
                )
            },
        },
        Table.EXPAND_COLUMN,
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
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    inputType:
                        col.dataIndex === "supervisor"
                            ? "select"
                            : col.dataIndex === "name"
                            ? "input"
                            : "number",
                    handleSave,
                    roles: roles,
                }
            },
        }
    })

    const expandedRowRender = (record) => {
        const locale = { emptyText: "Chưa có dữ liệu" }
        const dataSource = [...record.sub_criteria]

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

        const handleDelete = (key) => {
            setDocument((prev) => {
                const section = prev.section.map((section) => {
                    if (section.key === record.parentKey) {
                        const newContent = section.content.map((content) => {
                            if (content.key === record.key) {
                                return {
                                    ...content,
                                    sub_criteria: content.sub_criteria.filter(
                                        (criteria) => criteria.key !== key,
                                    ),
                                }
                            }
                            return content
                        })
                        return { ...section, content: newContent }
                    } else return section
                })
                return { ...prev, section }
            })
        }

        const defaultColumns = [
            {
                width: "17.5%",
                title: "",
                dataIndex: "l",
            },
            {
                width: "51.5%",
                title: "Ghi chú",
                dataIndex: "name",
                editable: true,
            },
            {
                title: "Điểm",
                dataIndex: "point",
                editable: true,
            },
            {
                title: "Hành động",
                dataIndex: "operation",
                align: "center",
                width: "16.8%",
                render: (_, record) => (
                    <Popconfirm
                        title="Bạn có chắc là muốn xóa dòng này?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                ),
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
                        editable: col.editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        inputType:
                            col.dataIndex === "supervisor"
                                ? "select"
                                : col.dataIndex === "name"
                                ? "input"
                                : "number",
                        handleSave,
                    }
                },
            }
        })

        // return <Table columns={columns} dataSource={data} pagination={false} />
        return (
            <Table
                pagination={false}
                components={components}
                locale={locale}
                rowClassName={() => "editable-row"}
                // bordered
                dataSource={dataSource}
                columns={columns}
                className="expanded-table"
            />
        )
    }

    return (
        <Table
            {...props}
            locale={locale}
            components={components}
            columns={columns}
            expandable={{
                expandedRowRender,
                defaultExpandAllRows: true,
                showExpandColumn: true,
            }}
            className="editable-table"
        />
    )
}
