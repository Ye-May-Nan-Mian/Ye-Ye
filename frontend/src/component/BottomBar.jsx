import React, { Component } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

// import Service from "../Service";
import "../App.css";

// const service = new Service();

/* BottomBar
 * height: 2vh, width: 100vw
 * background-color: darkColor
 */
export default class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = { hoverPlus: false, hoverMinus: false };
        this.setHoverMinus = this.setHoverMinus.bind(this);
        this.setHoverPlus = this.setHoverPlus.bind(this);
    }

    // mouse hover MinusOutlined or not, change its color and background
    setHoverMinus() {
        const s = this.state.hoverMinus;
        this.setState(() => {
            return { hoverMinus: s === true ? false : true };
        });
    }

    // mouse hover PlusOutlined or not, change its color and background
    setHoverPlus() {
        const s = this.state.hoverPlus;
        this.setState(() => {
            return { hoverPlus: s === true ? false : true };
        });
    }

    render() {
        return (
            <div
                className="bottombar"
                style={{
                    background: this.props.color
                }}
            >
                <p
                    className="bottombar-name"
                    style={{ color: this.props.whiteColor }}
                >
                    {"当前文档：" + this.props.fileName}
                </p>
                <PlusOutlined
                    className="bottombar-icon"
                    style={
                        this.state.hoverPlus === true
                            ? {
                                  color: this.props.color,
                                  background: this.props.whiteColor
                              }
                            : {
                                  color: this.props.whiteColor,
                                  background: this.props.color
                              }
                    }
                    onClick={this.props.zoomIn}
                    onMouseEnter={this.setHoverPlus}
                    onMouseLeave={this.setHoverPlus}
                />
                <MinusOutlined
                    className="bottombar-icon"
                    style={
                        this.state.hoverMinus === true
                            ? {
                                  color: this.props.color,
                                  background: this.props.whiteColor
                              }
                            : {
                                  color: this.props.whiteColor,
                                  background: this.props.color
                              }
                    }
                    onClick={this.props.zoomOut}
                    onMouseLeave={this.setHoverMinus}
                    onMouseEnter={this.setHoverMinus}
                />
            </div>
        );
    }
}
