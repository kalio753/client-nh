import React, { useEffect, useState } from "react"
import {
    SearchOutlined,
    AppstoreOutlined,
    StarOutlined,
    FormOutlined,
    LockOutlined,
} from "@ant-design/icons"
import { Layout, Menu, theme } from "antd"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import logoImg from "../images/logo.png"
import decodeJWT from "../utils/decodeJWTToken"
import getCookie from "../utils/getCookie"
import { useMyContext } from "../hooks/myContext"

const { Header, Content, Sider } = Layout
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
        danger: key === "10" ? "true" : undefined,
    }
}

const Sidebar = () => {
    const { role_list } = useMyContext()
    const location = useLocation()
    const [current, setCurrent] = useState("4")

    useEffect(() => {
        const currPathName = location.pathname
        if (currPathName.includes("/docs")) {
            setCurrent("1")
        } else if (currPathName.includes("/user")) {
            setCurrent("2")
        } else if (currPathName.includes("/grade")) {
            if (currPathName.includes("/grade/history")) {
                setCurrent("6")
            } else if (currPathName.includes("/grade/supervisor")) {
                if (currPathName.includes("/grade/supervisor/history")) {
                    setCurrent("8")
                } else setCurrent("7")
            } else {
                setCurrent("5")
            }
        } else if (currPathName.includes("/change_password")) {
            setCurrent("9")
        } else {
            setCurrent("4")
        }
    }, [location, current])

    let roleIdToRank = {}
    for (const role of role_list) {
        const key = role["_id"]
        roleIdToRank[key] = role.rank
    }

    const currUser = decodeJWT(getCookie("token")).data
    const roleRankList = [currUser.role_id.map((item) => roleIdToRank[item])]
    // console.log("Sidebar: currUser", currUser)
    // console.log("Sidebar: rank list", roleRankList)
    const items = [
        roleRankList[0].includes(0) &&
            getItem("Administrator", "sub1", <StarOutlined />, [
                getItem("Cập nhật tài liệu", "1"),
                getItem("Quản lý User", "2"),
                // getItem("Điểm HĐTĐ", "3"),
            ]),
        getItem("Mọi người", "4", <SearchOutlined />),
        getItem("Điểm của tôi", "sub2", <AppstoreOutlined />, [
            getItem("Chấm điểm", "5"),
            getItem("Lịch sử", "6"),
        ]),
        !roleRankList[0].includes(12) &&
            getItem("Công việc của tôi", "sub3", <FormOutlined />, [
                getItem("Chấm điểm", "7"),
                getItem("Lịch sử", "8"),
            ]),
        getItem("Đổi mật khẩu", "9", <LockOutlined />),
        getItem("Đăng xuất", "10"),
    ]
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    function handleMenuItemClicked(e) {
        console.log(e)
        const key = e.key
        switch (key) {
            case "1":
                navigate("/docs")
                break
            case "2":
                navigate("/user")
                break
            case "3":
                break
            case "4":
                navigate("/")
                break
            case "5":
                navigate("/grade")
                break
            case "6":
                navigate("/grade/history")
                break
            case "7":
                navigate("/grade/supervisor")
                break
            case "8":
                navigate("/grade/supervisor/history")
                break
            case "9":
                navigate("/change_password")
                break
            case "10":
                navigate("/login")
                document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                break
            default:
                break
        }
    }

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div
                    className="demo-logo-vertical"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 16,
                        marginTop: 16,
                    }}
                >
                    <img
                        src={logoImg}
                        style={{ height: 64, cursor: "pointer" }}
                    />
                </div>
                <Menu
                    theme="dark"
                    selectedKeys={[current]}
                    defaultOpenKeys={["sub1", "sub2", "sub3"]}
                    mode="inline"
                    items={items}
                    onClick={handleMenuItemClicked}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: "flex",
                        justifyContent: "end",
                        paddingRight: 24,
                    }}
                >
                    Xin chào,{" "}
                    <span style={{ fontWeight: 500, marginLeft: 4 }}>
                        {currUser.name}
                    </span>
                </Header>
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Outlet />
                </Content>
                {/* <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    )
}
export default Sidebar
