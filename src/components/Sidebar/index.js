import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons"
import "antd/dist/antd.less"
import {
    Logout,
    Logo,
    Work,
    Paper,
    Paper_Negative,
    Star,
    User,
} from "../../assets/images/"
import "./main.less"
import { Breadcrumb, Layout, Menu } from "antd"
import React, { useState } from "react"
const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}
console.log(Work)
const items = [
    getItem("Công việc của tôi", "1", <img className="icon" src={Work}></img>),
    getItem("Tài liệu của tôi", "2", <img className="icon" src={Paper}></img>),
    getItem("Nhân sự", "3", <img className="icon" src={User}></img>),
    // Sub menu
    // getItem("User", "sub1", <UserOutlined />, [
    //     getItem("Tom", "3"),
    //     getItem("Bill", "4"),
    //     getItem("Alex", "5"),
    // ]),
    getItem("Tài liệu", "4", <img className="icon" src={Paper_Negative}></img>),
    getItem("Đánh giá lao động", "5", <img className="icon" src={Star}></img>),
    getItem("Tự đánh giá", "6", <img></img>),
]

const App = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                // collapsible
                width="265px"
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="header">
                    <div className="header__user-wrapper">
                        <div className="header__user-avatar"></div>
                        <span className="header__user-name">
                            Chào, <strong>vinhnq</strong>
                        </span>
                        <div className="header__user-logout">
                            <img src={Logout} alt="" />
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}

export default App
