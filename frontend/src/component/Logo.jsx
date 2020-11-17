import React, { Component } from "react";
import { Image } from "antd";
import "../App.css";

/* Logo
 * height: 10vh, width: 20vw
 * background-color: baseColor
 */
export default class Logo extends Component {
    render() {
        return (
            <div
                className="side-logo base-color"
                // style={{
                //     background: this.props.color
                // }}
            >
                <div className="side-logo-img-div">
                    <Image
                        className="side-logo-img"
                        src={require("../img/favicon.ico")}
                        preview={false}
                    />
                </div>
            </div>
        );
    }
}
