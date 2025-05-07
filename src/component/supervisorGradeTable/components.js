import { Form, InputNumber } from "antd"
import React, { useContext, useEffect, useRef, useState } from "react"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"

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
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const currUser = decodeJWT(getCookie("token")).data
    const isSupervisor = currUser.role_id.includes(record?.supervisor)
    const maxOrMinPoint = record?.point
    const [editing, setEditing] = useState(false)
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
            toggleEdit()
            handleSave({
                ...record,
                supervisor_point: undefined,
            })
            console.log("Save failed:", errInfo)
        }
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
                        message: `${title} không được trống`,
                    },
                ]}
            >
                <InputNumber
                    min={
                        maxOrMinPoint <= 0
                            ? -999
                            : maxOrMinPoint > 0
                            ? 0
                            : maxOrMinPoint
                    }
                    max={maxOrMinPoint >= 0 ? maxOrMinPoint : 0}
                    ref={inputRef}
                    onPressEnter={save}
                    onBlur={save}
                    placeholder="Nhập điểm"
                    style={{
                        width: "39%",
                    }}
                />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                    width: "39%",
                    height: 32,
                    border: "1px solid red",
                    borderRadius: 4,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        )
    } else if (isSupervisor) {
        childNode = (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                    width: "39%",
                    height: 32,
                    border: "1px solid red",
                    borderRadius: 4,
                }}
            >
                {children}
            </div>
        )
    }
    return <td {...restProps}>{childNode}</td>
}
const tableComponents = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
}
export { tableComponents }
