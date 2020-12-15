// 定时翻页
import React, { Component } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";

class AutoTurning extends Component {
    render() {
        return (
            <div className={`${"tool-icon"} ${"toolIcon"}`}>
                {/* "TODO: change this icon" */}
                <FieldTimeOutlined className={`${"inOutlinedIcon"}`} />
            </div>
        );
    }
}

export default AutoTurning;
