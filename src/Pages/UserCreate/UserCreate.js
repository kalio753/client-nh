import { Breadcrumb, Button, Form, Input, Select } from "antd"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMyContext } from "../../hooks/myContext"
import validatePhoneNumber from "../../utils/validatePhoneNumber"

export default function UserCreate() {
    const navigate = useNavigate()
    const { user_list, dept_list, role_list, fetchMyContextData } =
        useMyContext()

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
                <Breadcrumb.Item onClick={() => navigate(-1)}>
                    Quản lý User
                </Breadcrumb.Item>
                <Breadcrumb.Item>Cấp mới tài khoản</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container user_detail_container"
                style={{ flex: 1 }}
            >
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên giáo viên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Tên giáo viên không được trống",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Số điện thoại không được trống",
                            },
                            {
                                validator: (_, value) => {
                                    console.log(value)
                                    return validatePhoneNumber(value)
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  "Số điện thoại không hợp lệ",
                                              ),
                                          )
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phòng ban"
                        name="department"
                        rules={[
                            {
                                required: true,
                                message: "Hãy chọn 1 phòng ban",
                            },
                        ]}
                    >
                        <Select
                            options={dept_list.map((dept) => {
                                return { value: dept._id, label: dept.name }
                            })}
                        ></Select>
                    </Form.Item>

                    <Form.Item
                        label="Chức vụ"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Hãy chọn ít nhất một chức vụ",
                            },
                        ]}
                    >
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
                            onClick={() => navigate(-1)}
                        >
                            Trở lại
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Khởi tạo
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
