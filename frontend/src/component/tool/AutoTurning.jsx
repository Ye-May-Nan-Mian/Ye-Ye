// 定时翻页
import React, { Component } from "react";
import store from "../../store";
import { Auto } from "../svg";

class AutoTurning extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.autoTurning = this.autoTurning.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    autoTurning() {
        console.log("autoTurning");
    }

    render() {
        return (
            <div
                className={`${"tool-icon-name"} ${"toolIcon"}`}
                onClick={this.autoTurning}
                style={{
                    width: this.state.toolCollapsed ? "40px" : "180px"
                }}
            >
                {/* "TODO: change this icon" */}
                <Auto id="timerController" classProps="tool-icon-auto" />
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
