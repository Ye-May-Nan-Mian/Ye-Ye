import React, { Component } from "react";
import { Slider, Dropdown } from "antd";
import {
    CameraOutlined,
    DashboardOutlined,
    HistoryOutlined,
    UserOutlined
} from "@ant-design/icons";
import UploadFile from "./UploadFile";
import ColorBar from "./ColorBar";
import store from "../store";
import {
    switchCameraState,
    switchHistoryPage,
    switchIntroPage,
    changeHistory
} from "store/actionCreators";
import Service from "../Service";

const service = new Service();

/* Tools
 * height: 56vh, width: 20vw
 * background-color: baseColor
 */
class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.switchCameraState = this.switchCameraState.bind(this);
        this.switchHistoryPage = this.switchHistoryPage.bind(this);
        this.switchIntroPage = this.switchIntroPage.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    // camera state: opened / closed
    switchCameraState() {
        const value = this.state.cameraOpened ? false : true;
        const action = switchCameraState(value);
        store.dispatch(action);
    }

    // history page state: display / hide
    switchHistoryPage() {
        // display history page
        const value = this.state.introShow ? false : true;
        const action = switchHistoryPage(value);
        store.dispatch(action);
        // get history from backend
        service.getHistoryall().then((data) => {
            const action = changeHistory(data.files);
            store.dispatch(action);
        });
    }

    // introduce page state: display / hide
    switchIntroPage() {
        const value = this.state.introShow ? false : true;
        const action = switchIntroPage(value);
        store.dispatch(action);
    }

    render() {
        return (
            <div className={`${"side-tool"} ${"base-background-color"}`}>
                {/* Camera Upload Color */}
                <div className={"side-tool-line"}>
                    <CameraOutlined
                        id="CameraController"
                        className={`${"tool-icon"} ${"toolIcon"}`}
                        onClick={this.switchCameraState}
                    />
                    <UploadFile id="UploadController" />
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
                            this.switchHistoryPage();
                        }}
                    />
                    <UserOutlined
                        id="UserController"
                        className={`${"tool-icon"} ${"toolIcon"}`}
                        onClick={() => {
                            this.switchIntroPage();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Tools;
