import Sidebar from "../../Sidebar"
import { Breadcrumb } from "antd"

function Dsvb_user() {
    return (
        <>
            <Sidebar>
                <Breadcrumb
                    style={{
                        margin: "16px 0",
                    }}
                    separator="»"
                >
                    <Breadcrumb.Item>Tài liệu</Breadcrumb.Item>
                    <Breadcrumb.Item>Danh sách tài liệu</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    cccc
                </div>
            </Sidebar>
        </>
    )
}

export default Dsvb_user
