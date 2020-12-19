// 页面动画效果和节拍器
import React, { Component } from "react";
import store from "../../store";
import { Metron } from "../svg";

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.storageChange = this.storageChange.bind(this);
        this.metroning = this.metroning.bind(this);
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    metroning() {
        console.log("metroning");
    }

    render() {
        return (
            <div
                className={`${"tool-icon-name"} ${"toolIcon"}`}
                onClick={this.metroning}
                style={{
                    width: this.state.toolCollapsed ? "40px" : "180px"
                }}
            >
                {/* "TODO: change this icon" */}
                <Metron id="themeController" classProps="tool-icon" />
                <p
                    className={`${"tool-name"}`}
                    hidden={this.state.toolCollapsed}
                >
                    {this.state.text.metronome}
                </p>
            </div>
        );
    }
}

export default Metronome;
