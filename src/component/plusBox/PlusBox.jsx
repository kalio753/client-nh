import React from "react"
import { PlusOutlined } from "@ant-design/icons"
import "./plusBox.scss"

export default function PlusBox({ size, content, onClick }) {
    return (
        <div className="plus_btn" onClick={onClick}>
            <PlusOutlined />
            <div className="plus_btn_sub">{content}</div>
        </div>
    )
}
