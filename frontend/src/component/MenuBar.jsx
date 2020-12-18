import React, { Component } from "react";
import {
    MinusOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    PoweroffOutlined
} from "@ant-design/icons";
import Logo from "./Logo";
import store from "../store";
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
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.minWin = this.minWin.bind(this);
        this.maxWin = this.maxWin.bind(this);
        this.closeWin = this.closeWin.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    minWin() {
        ipcRenderer.send("window-min");
    }

    maxWin() {
        ipcRenderer.send("window-full");
        const lastState = this.state.fullScreened;
        this.setState(() => {
            return {
                fullScreened: lastState ? false : true
            };
        });
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
                <p className={`${"menubar-name"} ${"white-color"}`}>
                    {this.state.text.softName}
                </p>
                <MinusOutlined
                    className={`${"menubar-icon"} ${"menuIcon"}`}
                    onClick={this.minWin}
                />
                {this.state.fullScreened ? (
                    <FullscreenExitOutlined
                        className={`${"menubar-icon"} ${"menuIcon"}`}
                        onClick={this.maxWin}
                    />
                ) : (
                    <FullscreenOutlined
                        className={`${"menubar-icon"} ${"menuIcon"}`}
                        onClick={this.maxWin}
                    />
                )}

                <PoweroffOutlined
                    className={`${"menubar-icon"} ${"menuIcon"}`}
                    onClick={this.closeWin}
                />
            </div>
        );
    }
}

export default MenuBar;
