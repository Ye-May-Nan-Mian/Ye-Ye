import React, { Component } from "react";
import {
    MinusOutlined,
    FullscreenOutlined,
    PoweroffOutlined
} from "@ant-design/icons";
import Logo from "./Logo";
const ipcRenderer = window.ipcRenderer;

// import Service from "../Service";

// const service = new Service();

/* BottomBar
 * height: 20px, width: 100vw
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
            <div className={`${"menubar"} ${"dark-background-color"}`}>
                <div className={`${"logo-img-div"}`}>
                    <Logo
                        height={"20px"}
                        width={"20px"}
                        outterColor={"white-logo"}
                        innerColor={"base-logo"}
                    />
                </div>
                <p className={`${"menubar-name"} ${"white-color"}`}>{"页页"}</p>
                <MinusOutlined
                    className={`${"menubar-icon"} ${"menuIcon"}`}
                    onClick={this.minWin}
                />
                <FullscreenOutlined
                    className={`${"menubar-icon"} ${"menuIcon"}`}
                    onClick={this.maxWin}
                />
                <PoweroffOutlined
                    className={`${"menubar-icon"} ${"menuIcon"}`}
                    onClick={this.closeWin}
                />
            </div>
        );
    }
}

export default MenuBar;
