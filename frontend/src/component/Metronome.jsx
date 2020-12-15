// 页面动画效果和节拍器
import React, { Component } from "react";
import { NodeIndexOutlined } from "@ant-design/icons";

class Metronome extends Component {
    render() {
        return (
            <div className={`${"tool-icon"} ${"toolIcon"}`}>
                {/* "TODO: change this icon" */}
                <NodeIndexOutlined className={`${"inOutlinedIcon"}`} />
            </div>
        );
    }
}

export default Metronome;