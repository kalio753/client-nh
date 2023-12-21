import React, { useState } from "react"
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    SearchOutlined,
    AppstoreOutlined,
    StarOutlined,
    FormOutlined,
} from "@ant-design/icons"
import { Breadcrumb, Layout, Menu, theme } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import logoImg from "../images/logo.png"

const { Header, Content, Footer, Sider } = Layout
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}
const items = [
    getItem("Mọi người", "1", <SearchOutlined />),
    getItem("Điểm của tôi", "2", <AppstoreOutlined />),
    getItem("Administrator", "sub1", <StarOutlined />, [
        getItem("Cập nhật tài liệu", "3"),
        getItem("Cập nhật User", "4"),
        getItem("Điểm HĐTĐ", "5"),
    ]),
    getItem("Công việc của tôi", "6", <FormOutlined />),
]
const Sidebar = () => {
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
                navigate("/")
                break
            case "2":
                break
            case "3":
                navigate("/docs")
                break
            case "4":
                break
            case "5":
                break
            case "6":
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
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
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
                    }}
                />
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
