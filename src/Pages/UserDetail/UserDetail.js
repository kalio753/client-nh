import { Breadcrumb, Button, Form, Input, Select } from "antd"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./userDetail.scss"
import { useMyContext } from "../../hooks/myContext"

export default function UserDetail() {
    const { userId } = useParams()
    const navigate = useNavigate()
    const { user_list, dept_list, role_list, fetchMyContextData } =
        useMyContext()

    const currUser = user_list.filter((user) => user._id === userId)[0]
    let dept_dict = {}
    for (const dept of dept_list) {
        const key = dept["_id"]
        dept_dict[key] = dept.name
    }
    let role_dict = {}
    for (const role of role_list) {
        const key = role["_id"]
        role_dict[key] = role.name
    }
    if (currUser) {
        currUser.department = currUser.department_id
        currUser.role = currUser.role_id.map((roleId) => roleId)
    }

    const onFinish = (values) => {
        console.log("Success:", values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Aministrator</Breadcrumb.Item>
                <Breadcrumb.Item
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    Quản lý User
                </Breadcrumb.Item>
                <Breadcrumb.Item>Cập nhật User</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container user_detail_container"
                style={{ flex: 1 }}
            >
                {currUser ? (
                    <Form
                        name="user_detail"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={currUser}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="Tên giáo viên" name="name">
                            <Input disabled={true} />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: "Please input your username!",
                            //     },
                            // ]}
                        >
                            <Input disabled={true} />
                        </Form.Item>

                        <Form.Item label="Phòng ban" name="department">
                            <Select
                                options={dept_list.map((dept) => {
                                    return { value: dept._id, label: dept.name }
                                })}
                            ></Select>
                        </Form.Item>

                        <Form.Item label="Chức vụ" name="role">
                            <Select
                                mode="multiple"
                                options={role_list.map((role) => {
                                    return {
                                        value: role._id,
                                        label: role.name,
                                    }
                                })}
                            ></Select>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button
                                danger
                                style={{ marginRight: 12 }}
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Trở lại
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                ) : null}
            </div>
        </div>
    )
}
