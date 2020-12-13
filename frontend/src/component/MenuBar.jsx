import React, { Component } from "react";
import { Image } from "antd";
import {
    MinusOutlined,
    FullscreenOutlined,
    CloseOutlined
} from "@ant-design/icons";
const ipcRenderer = window.ipcRenderer;

// import Service from "../Service";

// const service = new Service();

/* BottomBar
 * height: 2vh, width: 100vw
 * background-color: darkColor
 */
class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.minWin = this.minWin.bind(this);
        this.maxWin = this.maxWin.bind(this);
        this.closeWin = this.closeWin.bind(this);
    }

    minWin() {
        ipcRenderer.send("window-min");
    }

    maxWin() {
        ipcRenderer.send("window-full");
    }

    closeWin() {
        ipcRenderer.send("window-close");
    }

    render() {
        return (
            <div className={`${"manubar"} ${"dark-background-color"}`}>
                <div className="logo-img-div">
                    <Image
                        className="logo-img"
                        src={require("../img/favicon.ico")}
                        preview={false}
                    />
                </div>
                <p className={`${"manubar-name"} ${"white-color"}`}>{"页页"}</p>
                <MinusOutlined
                    className={`${"manubar-icon"} ${"plusMinusIcon"}`}
                    onClick={this.minWin}
                />
                <FullscreenOutlined
                    className={`${"manubar-icon"} ${"plusMinusIcon"}`}
                    onClick={this.maxWin}
                />
                <CloseOutlined
                    className={`${"manubar-icon"} ${"plusMinusIcon"}`}
                    onClick={this.closeWin}
                />
            </div>
        );
    }
}

export default MenuBar;
