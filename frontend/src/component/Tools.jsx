import React, { Component } from "react";
import { Slider, Dropdown } from "antd";
import {
    CameraOutlined,
    DashboardOutlined,
    HistoryOutlined
} from "@ant-design/icons";
import UploadFile from "./UploadFile";
import ColorBar from "./ColorBar";
// import Service from "../Service";

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
            <div className={`${"side-tool"} ${"base-background-color"}`}>
                <div className={"side-tool-line"}>
                    <CameraOutlined
                        className={`${"tool-icon"} ${"toolIcon"}`}
                        onClick={this.props.switchCameraState}
                    />
                    <UploadFile getFile={this.props.getFile} />
                    <ColorBar />
                </div>
                <div className={"side-tool-line"}>
                    <Dropdown
                        overlay={
                            // TODO: div's style
                            <div>
                                <Slider
                                    className={"speed-slider"}
                                    range={false}
                                    defaultValue={150}
                                    min={100}
                                    max={330}
                                    step={10}
                                    onChange={(t) =>
                                        this.props.changeInterval(t)
                                    }
                                    tipFormatter={() => {
                                        return "往左移动，人脸识别更快哦";
                                    }}
                                    tooltipPlacement={"bottom"}
                                />
                            </div>
                        }
                        placement={"bottomCenter"}
                        trigger={["hover"]}
                    >
                        <DashboardOutlined
                            className={`${"tool-icon"} ${"toolIcon"}`}
                        />
                    </Dropdown>
                    <HistoryOutlined
                        className={`${"tool-icon"} ${"toolIcon"}`}
                    />
                </div>
            </div>
        );
    }
}
