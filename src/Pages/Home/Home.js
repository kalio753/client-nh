import { Breadcrumb, Button, Input } from "antd"
import "./home.scss"
import { SearchOutlined } from "@ant-design/icons"

function Home() {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Mọi người</Breadcrumb.Item>
                <Breadcrumb.Item>Điểm thi đua</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="layout_container home_container"
                style={{ flex: 1 }}
            >
                <h1 style={{ color: "black" }}>Điểm thi đua chung</h1>

                <div className="search_section">
                    <Input placeholder="Tên giáo viên" />;
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        size="large"
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
