import { Breadcrumb, Button, Form, Input, Select, notification } from "antd"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./userDetail.scss"
import { useMyContext } from "../../hooks/myContext"
import myAxios from "../../utils/axios"

export default function UserDetail() {
    const { userId } = useParams()
    const [toastApi, contextHolder] = notification.useNotification()
    const navigate = useNavigate()
    const {
        user_list,
        dept_list,
        role_list,
        fetchMyContextData,
        role_dict,
        dept_dict,
    } = useMyContext()
    const [isLoading, setIsLoading] = useState(false)

    const currUser = user_list.filter((user) => user._id === userId)[0]

    if (currUser) {
        currUser.department = currUser.department_id
        currUser.role = currUser.role_id.map((roleId) => roleId)
    }

    const onFinish = async (values) => {
        console.log("Success:", values)

        setIsLoading(true)
        const res = await myAxios.post(`user/update/${userId}`, {
            ...values,
        })
        if (res.data.status === "success") {
            toastApi.success({
                message: `Cập nhật người dùng thành công`,
                description: "Đang chuyển về trang trước",
                placement: "top",
            })
            setTimeout(() => {
                navigate(-1)
            }, 1500)
        } else {
            setIsLoading(false)
            toastApi.error({
                message: `Cập nhật thất bại`,
                description: "Vui lòng thử lại sau",
                placement: "top",
            })
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <>
            {contextHolder}
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
                                        return {
                                            value: dept._id,
                                            label: dept.name,
                                        }
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
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}
                                >
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : null}
                </div>
            </div>
        </>
    )
}
