// 页面动画效果和节拍器
import React, { Component } from "react";
import { NodeIndexOutlined } from "@ant-design/icons";
import store from "../../store";

class Metronome extends Component {
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
                <NodeIndexOutlined className={`${"tool-icon"}`} />
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
