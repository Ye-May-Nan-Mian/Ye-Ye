import React, { Component } from "react";
import { Slider, Dropdown } from "antd";
import {
    CameraOutlined,
    DashboardOutlined,
    HistoryOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from "@ant-design/icons";
import UploadFile from "./UploadFile";
import ColorBar from "./ColorBar";
import AutoTurning from "./AutoTurning";
import Metronome from "./Metronome";
import store from "../store";
import {
    switchCameraState,
    switchHistoryPage,
    switchIntroPage,
    changeHistory,
    switchTool
} from "store/actionCreators";
import Service from "../Service";

const service = new Service();

/* Tools
 * height: 100vh - 250px, width: 200px
 * background-color: baseColor
 */
class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.switchHistory = this.switchHistory.bind(this);
        this.switchIntro = this.switchIntro.bind(this);
        this.menuStretch = this.menuStretch.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    // camera state: opened / closed
    switchCamera() {
        const value = this.state.cameraOpened ? false : true;
        const action = switchCameraState(value);
        store.dispatch(action);
    }

    // history page state: display / hide
    switchHistory() {
        // display history page
        const action1 = switchHistoryPage(true);
        store.dispatch(action1);
        // get history from backend
        service.getHistoryall().then((data) => {
            const action2 = changeHistory(data.files);
            store.dispatch(action2);
        });
    }

    // introduce page state: display / hide
    switchIntro() {
        const action = switchIntroPage(true);
        store.dispatch(action);
    }

    menuStretch() {
        const action = switchTool();
        store.dispatch(action);
    }

    render() {
        return (
            <div
                className={`${"side-tool"} ${"base-background-color"} ${"dark-border"}`}
                style={{ width: this.state.toolCollapsed ? "60px" : "200px" }}
            >
                {/* Camera */}
                <CameraOutlined
                    id="CameraController"
                    className={`${"tool-icon"} ${"toolIcon"}`}
                    onClick={this.switchCamera}
                />
                {/* Upload file(s) */}
                <UploadFile id="UploadController" />
                {/* Can choose history files */}
                <HistoryOutlined
                    id="HistoryController"
                    className={`${"tool-icon"} ${"toolIcon"}`}
                    onClick={this.switchHistory}
                />
                {/* Metronome is useful for musicians */}
                <Metronome />
                {/* Auto page turning */}
                <AutoTurning />
                {/* Speed of uploading camera's pictures */}
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
                                onChange={(t) => this.props.changeInterval(t)}
                                tipFormatter={() => {
                                    return "往左移动，人脸识别更快哦";
                                }}
                                tooltipPlacement={"bottom"}
                            />
                        </div>
                    }
                    placement={"bottomRight"}
                    trigger={["click"]}
                >
                    <DashboardOutlined
                        className={`${"tool-icon"} ${"toolIcon"}`}
                        style={{
                            cursor: "pointer"
                        }}
                    />
                </Dropdown>
                {/* Can choose some themes */}
                <ColorBar />
                {/* Introduce Page */}
                <UserOutlined
                    id="UserController"
                    className={`${"tool-icon"} ${"toolIcon"}`}
                    onClick={this.switchIntro}
                />
                {this.state.toolCollapsed ? (
                    <MenuUnfoldOutlined
                        id="MenuStretchUnfold"
                        className={`${"tool-icon-collapse"} ${"toolIcon"}`}
                        onClick={this.menuStretch}
                    />
                ) : (
                    <MenuFoldOutlined
                        id="menuStretchFold"
                        className={`${"tool-icon-collapse"} ${"toolIcon"}`}
                        onClick={this.menuStretch}
                    />
                )}
            </div>
        );
    }
}

export default Tools;
