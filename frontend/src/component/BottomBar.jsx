import React, { Component } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

// import Service from "../Service";

// const service = new Service();

/* BottomBar
 * height: 2vh, width: 100vw
 * background-color: darkColor
 */
export default class BottomBar extends Component {
    render() {
        return (
            <div className={`${"bottombar"} ${"dark-background-color"}`}>
                <p className={`${"bottombar-name"} ${"white-color"}`}>
                    {this.props.fileName}
                </p>
                <MinusOutlined
                    className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                    onClick={this.props.zoomOut}
                />
                <PlusOutlined
                    className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                    onClick={this.props.zoomIn}
                />
            </div>
        );
    }
}
