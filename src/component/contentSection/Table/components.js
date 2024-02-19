import { Form, Input, InputNumber, Popconfirm, Select } from "antd"
import React, { useContext, useEffect, useRef, useState } from "react"
import myAxios from "../../../utils/axios"

const { TextArea } = Input
const EditableContext = React.createContext(null)
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}
const EditableCell = ({
    title,
    inputType,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    roles,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false)
    const selectData = roles
        ?.filter((role) => role.rank > 0)
        ?.map((role) => {
            return { label: role.name, value: role._id }
        })
    const inputRef = useRef(null)
    const form = useContext(EditableContext)

    useEffect(() => {
        if (editing) {
            inputRef.current.focus()
        }
    }, [editing])
    const toggleEdit = () => {
        setEditing(!editing)
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        })
    }
    const save = async () => {
        try {
            const values = await form.validateFields()
            toggleEdit()
            handleSave({
                ...record,
                ...values,
            })
        } catch (errInfo) {
            console.log("Save failed:", errInfo)
        }
    }
    const handleChange = async (value) => {
        console.log(`selected ${value}`)
        record.sub_criteria.forEach((item) => {
            item.supervisor = value
        })
        record.supervisor = value
        const values = await form.validateFields()
        handleSave({
            ...record,
            ...values,
        })
    }
    let childNode = children
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {inputType === "input" ? (
                    <TextArea
                        autoSize
                        ref={inputRef}
                        value={record.name}
                        onPressEnter={save}
                        onBlur={save}
                    />
                ) : (
                    <InputNumber
                        ref={inputRef}
                        value={record.point}
                        onPressEnter={save}
                        onBlur={save}
                    />
                )}
            </Form.Item>
        ) : (
            <>
                {inputType === "select" ? (
                    <Select
                        defaultValue={record.supervisor}
                        placeholder={"Chọn người phụ trách"}
                        status={`${record.supervisor ? "" : "error"}`}
                        style={{
                            width: "68%",
                        }}
                        onChange={handleChange}
                        options={selectData}
                    />
                ) : (
                    <div
                        className="editable-cell-value-wrap"
                        style={{
                            paddingRight: 24,
                        }}
                        onClick={toggleEdit}
                    >
                        {children}
                    </div>
                )}
            </>
        )
    }
    return <td {...restProps}>{childNode}</td>
}

const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
}

export { components }
