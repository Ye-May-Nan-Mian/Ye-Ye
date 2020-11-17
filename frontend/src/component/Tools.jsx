import React, { Component } from "react";
import { Switch, Slider } from "antd";
import UploadFile from "./UploadFile";
import ColorBar from "./ColorBar";
// import Service from "../Service";
import "../App.css";

// const service = new Service();

/* Tools
 * height: 56vh, width: 20vw
 * background-color: baseColor
 */
export default class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textColor: "#989899",
            navColor: "#f8f9fa"
        };
    }

    render() {
        return (
            <div className="side-tool" style={{ background: this.props.color }}>
                <Switch
                    checkedChildren="已开启摄像头"
                    unCheckedChildren="已关闭摄像头"
                    defaultChecked={false}
                    onChange={this.props.switchCameraState}
                    style={{ margin: 5 }}
                />
                <UploadFile getFile={this.props.getFile} />
                <ColorBar changeBackColor={this.props.changeBackColor} />
                <Slider
                    range={false}
                    defaultValue={150}
                    min={100}
                    max={330}
                    step={10}
                    onChange={(t) => this.props.changeInterval(t)}
                    tipFormatter={() => {
                        return "往左移动，人脸识别更快哦";
                    }}
                    tooltipPlacement={"bottom"}
                    style={{ width: "75%" }}
                />
            </div>
        );
    }
}
