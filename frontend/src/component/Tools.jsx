import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Slider, Dropdown } from "antd";
import {
    CameraOutlined,
    DashboardOutlined,
    HistoryOutlined,
    UserOutlined
} from "@ant-design/icons";
import UploadFile from "./UploadFile";
import ColorBar from "./ColorBar";
// import Service from "../Service";

// const service = new Service();

/* Tools
 * height: 56vh, width: 20vw
 * background-color: baseColor
 */
class Tools extends Component {
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
                {/* Camera Upload Color */}
                <div className={"side-tool-line"}>
                    <CameraOutlined
                        id="CameraController"
                        className={`${"tool-icon"} ${"toolIcon"}`}
                        onClick={this.props.switchCameraState}
                    />
                    <UploadFile
                        id="UploadController"
                        getFile={this.props.getFile}
                    />
                    <ColorBar />
                </div>
                {/* Speed History Introduce  */}
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
                            style={{
                                cursor: "pointer"
                            }}
                        />
                    </Dropdown>
                    <HistoryOutlined
                        id="HistoryController"
                        className={`${"tool-icon"} ${"toolIcon"}`}
                        onClick={() => {
                            this.props.history.push({
                                pathname: "/history"
                            });
                        }}
                    />
                    <UserOutlined
                        id="UserController"
                        className={`${"tool-icon"} ${"toolIcon"}`}
                        onClick={() => {
                            this.props.history.push({
                                pathname: "/introduce"
                            });
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Tools);
