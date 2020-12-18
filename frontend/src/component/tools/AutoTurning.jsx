// 定时翻页
import React, { Component } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import store from "../../store";

class AutoTurning extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    render() {
        return (
            <div
                className={`${"tool-icon-name"} ${"toolIcon"}`}
                style={{
                    width: this.state.toolCollapsed ? "40px" : "180px"
                }}
            >
                {/* "TODO: change this icon" */}
                <FieldTimeOutlined
                    id="timerController"
                    className={`${"tool-icon"}`}
                />
                <p
                    className={`${"tool-name"}`}
                    hidden={this.state.toolCollapsed}
                >
                    {this.state.text.timer}
                </p>
            </div>
        );
    }
}

export default AutoTurning;
