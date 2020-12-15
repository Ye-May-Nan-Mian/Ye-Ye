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
        const action = switchHistoryPage(true);
        store.dispatch(action);
        // get history from backend
        service.getHistoryall().then((data) => {
            const action = changeHistory(data.files);
            store.dispatch(action);
        });
    }

    // introduce page state: display / hide
    switchIntro() {
        const action = switchIntroPage(true);
        store.dispatch(action);
    }

    render() {
        return (
            <div
                className={`${"side-tool"} ${"base-background-color"} ${"dark-border"}`}
            >
                {/* Camera Upload Color */}
                <CameraOutlined
                    id="CameraController"
                    className={`${"tool-icon"} ${"toolIcon"}`}
                    onClick={this.switchCamera}
                />
                <UploadFile id="UploadController" />
                <ColorBar />
                {/* Speed History Introduce  */}
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
                        this.switchHistory();
                    }}
                />
                <UserOutlined
                    id="UserController"
                    className={`${"tool-icon"} ${"toolIcon"}`}
                    onClick={() => {
                        this.switchIntro();
                    }}
                />
            </div>
        );
    }
}

export default Tools;
