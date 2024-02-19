import { Breadcrumb, Button, Input, notification } from "antd"
import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./changePassword.scss"
import myAxios from "../../utils/axios"
import decodeJWT from "../../utils/decodeJWTToken"
import getCookie from "../../utils/getCookie"

export default function ChangePassword() {
    const [toastApi, contextHolder] = notification.useNotification()
    const navigate = useNavigate()
    const currUser = decodeJWT(getCookie("token")).data

    const oldPassword = useRef(null)
    const newPassword = useRef(null)
    const confirmPassword = useRef(null)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirmOnClick = async () => {
        const oldPasswordValue = oldPassword.current.input.value
        const newPasswordValue = newPassword.current.input.value
        const confirmPasswordValue = confirmPassword.current.input.value
        setError()

        if (!oldPasswordValue && !newPasswordValue && !confirmPasswordValue) {
            toastApi.error({
                message: `Các trường mật khẩu không được bỏ trống`,
                description: "Vui lòng hoàn thành nhập các trường còn trống",
                placement: "top",
            })
        } else if (newPasswordValue.length < 6 || oldPasswordValue.length < 6) {
            toastApi.error({
                message: `Mật khẩu quá ngắn`,
                description:
                    "Mật khẩu phải có ít nhất 6 ký tự, vui lòng nhập lại",
                placement: "top",
            })
        } else if (newPasswordValue !== confirmPasswordValue) {
            confirmPassword.current.input.value = ""

            toastApi.error({
                message: `Mật khẩu mới không trùng khớp`,
                description: "Vui lòng xác nhận lại mật khẩu mới",
                placement: "top",
            })
        } else {
            try {
                setIsLoading(true)
                const res = await myAxios.post("/user/changePassword", {
                    phone: currUser.phone,
                    newPassword: newPasswordValue,
                    oldPassword: oldPasswordValue,
                })
                if (res.data.status === "success") {
                    toastApi.success({
                        message: `Thay đổi mật khẩu thành công`,
                        description:
                            "Mật khẩu đã được thay đổi thành công, đang chuyển về trang chủ",
                        placement: "top",
                    })

                    setTimeout(() => {
                        navigate("/")
                    }, 1500)
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
                setError(error.response.data.error)
            }
        }
    }

    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Cá nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Đổi mật khẩu</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container change_password_container"
                style={{ flex: 1 }}
            >
                <div className="input_section">
                    <div className="input_item">
                        <div className="input_title">Mật khẩu hiện tại:</div>
                        <Input.Password ref={oldPassword} />
                    </div>
                    <div className="input_item">
                        <div className="input_title">Mật khẩu mới:</div>
                        <Input.Password ref={newPassword} />
                    </div>
                    <div className="input_item">
                        <div className="input_title">
                            Nhập lại mật khẩu mới:
                        </div>
                        <Input.Password ref={confirmPassword} />
                    </div>
                    {error ? <div style={{ color: "red" }}>{error}</div> : null}
                </div>

                <Button
                    type="primary"
                    onClick={handleConfirmOnClick}
                    loading={isLoading}
                >
                    Đổi mật khẩu
                </Button>
            </div>
        </>
    )
}
