import React, { Component } from "react";
import { Slider, Dropdown } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from "@ant-design/icons";
import { AutoTurning, ColorBar, Metronome, UploadFile } from "./tool";
import store from "../store";
import {
    switchCameraState,
    switchHistoryPage,
    switchIntroPage,
    changeHistory,
    switchTool,
    switchLanguage
} from "store/actionCreators";
import Service from "../Service";
import { Camera, History, Speed, Translation } from "./svg";

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
        this.switchLanguage = this.switchLanguage.bind(this);
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

    switchLanguage() {
        // console.log("use English?: ", this.state.useZh);
        const action = switchLanguage();
        store.dispatch(action);
    }

    render() {
        return (
            <div
                className={`${"side-tool"} ${"base-background-color"} ${"dark-border"}`}
                style={{ width: this.state.toolCollapsed ? "60px" : "200px" }}
            >
                {/* Camera */}
                <div
                    className={`${"tool-icon-name"} ${"toolIcon"}`}
                    onClick={this.switchCamera}
                    style={{
                        width: this.state.toolCollapsed ? "40px" : "180px"
                    }}
                >
                    <Camera id="CameraController" classProps="tool-icon" />
                    <p
                        className={`${"tool-name"}`}
                        hidden={this.state.toolCollapsed}
                    >
                        {this.state.text.camera}
                    </p>
                </div>
                {/* Upload file(s) */}
                <UploadFile />
                {/* Can choose history files */}
                <div
                    className={`${"tool-icon-name"} ${"toolIcon"}`}
                    onClick={this.switchHistory}
                    style={{
                        width: this.state.toolCollapsed ? "40px" : "180px"
                    }}
                >
                    <History id="HistoryController" classProps="tool-icon" />
                    <p
                        className={`${"tool-name"}`}
                        hidden={this.state.toolCollapsed}
                    >
                        {this.state.text.history}
                    </p>
                </div>
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
                                    return this.state.text.speedInfo;
                                }}
                                tooltipPlacement={"bottom"}
                            />
                        </div>
                    }
                    placement={"bottomRight"}
                    trigger={["click"]}
                >
                    <div
                        className={`${"tool-icon-name"} ${"toolIcon"}`}
                        style={{
                            width: this.state.toolCollapsed ? "40px" : "180px"
                        }}
                    >
                        <Speed id="speedController" classProps="tool-icon" />
                        <p
                            className={`${"tool-name"}`}
                            hidden={this.state.toolCollapsed}
                        >
                            {this.state.text.speed}
                        </p>
                    </div>
                </Dropdown>
                {/* choose Chinese or English */}
                <div
                    className={`${"tool-icon-name"} ${"toolIcon"}`}
                    onClick={this.switchLanguage}
                    style={{
                        width: this.state.toolCollapsed ? "40px" : "180px"
                    }}
                >
                    <Translation
                        id="translateController"
                        classProps="tool-icon"
                    />
                    <p
                        className={`${"tool-name"}`}
                        hidden={this.state.toolCollapsed}
                    >
                        {this.state.text.language}
                    </p>
                </div>
                {/* Can choose some themes */}
                <ColorBar />
                {/* Introduce Page */}
                <div
                    className={`${"tool-icon-name"} ${"toolIcon"}`}
                    onClick={this.switchIntro}
                    style={{
                        width: this.state.toolCollapsed ? "40px" : "180px"
                    }}
                >
                    <UserOutlined
                        id="UserController"
                        className={`${"tool-icon"}`}
                    />
                    <p
                        className={`${"tool-name"}`}
                        hidden={this.state.toolCollapsed}
                    >
                        {this.state.text.about}
                    </p>
                </div>
                {/* collapse button */}
                <div
                    className={`${"tool-icon-name-collapse"} ${"toolIcon"}`}
                    onClick={this.menuStretch}
                    style={{
                        width: this.state.toolCollapsed ? "40px" : "180px"
                    }}
                >
                    {this.state.toolCollapsed ? (
                        <MenuUnfoldOutlined
                            id="MenuStretchUnfold"
                            className={`${"tool-icon"}`}
                        />
                    ) : (
                        <MenuFoldOutlined
                            id="menuStretchFold"
                            className={`${"tool-icon"}`}
                        />
                    )}
                    <p
                        className={`${"tool-name"}`}
                        hidden={this.state.toolCollapsed}
                    >
                        {this.state.text.collapse}
                    </p>
                </div>
            </div>
        );
    }
}

export default Tools;
