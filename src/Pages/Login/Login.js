import React, { useState } from "react"
import "./login.scss"
import { Button, Input } from "antd"
import loginImg from "../../images/login.jpg"
import logoImg from "../../images/logo.png"
import myAxios from "../../utils/axios"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`

    async function loginBtnClick() {
        const phoneNumberRegex = /^\d{10}$/
        if (!username || !password) {
            setErrorMsg("Tài khoản hoặc mật khẩu không được để trống")
        } else if (!phoneNumberRegex.test(username)) {
            setErrorMsg("Vui lòng nhập số điện thoại hợp lệ")
        } else {
            try {
                setIsLoading(true)
                const res = await axios.post(
                    `${process.env.BACKEND_URL}/user/login`,
                    {
                        phone: username,
                        password,
                    },
                )
                if (res.data?.status === "success") {
                    // Navigate to home page
                    document.cookie = `token=${res.data.data.token}; path=/; `
                    myAxios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${res.data.data.token}`
                    setTimeout(() => navigate("/"), 800)
                }
            } catch (error) {
                setIsLoading(false)
                console.log("Error from response: ", error?.response?.data)
                setErrorMsg(error?.response?.data.msg)
            }
        }
    }
    return (
        <div
            className="container"
            style={{ backgroundImage: `url(${loginImg})` }}
        >
            <div className="login-section">
                <img src={logoImg} alt="" />

                {/* <h2 className="header">Đăng nhập</h2> */}
                <Input
                    placeholder="Tài khoản giáo viên"
                    value={username}
                    onChange={(e) => {
                        setErrorMsg("")
                        setUsername(e.target.value)
                    }}
                />

                <Input.Password
                    placeholder="Mật khẩu"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setErrorMsg("")
                    }}
                />
                <div className="error">{errorMsg}</div>

                <Button
                    type="primary"
                    block
                    onClick={loginBtnClick}
                    loading={isLoading}
                >
                    Đăng nhập
                </Button>
            </div>
            <div className="layer"></div>
        </div>
    )
}
