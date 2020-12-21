import React, { Component } from "react";
import { Dropdown, Slider } from "antd";
import store from "../../store";
import { Metron } from "../svg";

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.metronRef = React.createRef();
        this.storageChange = this.storageChange.bind(this);
        this.switchMetroning = this.switchMetroning.bind(this);
        this.autoMetroning = this.autoMetroning.bind(this);
        this.changeBPM = this.changeBPM.bind(this);
        this.interval = null;
        this.bpm = 120;
    }

    storageChange() {
        this.setState(store.getState());
    }

    componentDidMount() {
        store.subscribe(this.storageChange);
    }

    componentWillUnmount() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
    }

    switchMetroning() {
        if (this.interval === null) {
            // 120bpm = 500ms
            this.interval = setInterval(
                () => this.autoMetroning(),
                (this.bpm * 500) / 120
            );
        } else {
            clearInterval(this.interval);
            this.metronRef.current.className = `${"tool-icon-name"} ${"toolIcon"}`;
            this.interval = null;
        }
    }

    autoMetroning() {
        if (
            this.metronRef.current.className ===
            `${"tool-icon-name"} ${"toolIcon"}`
        ) {
            this.metronRef.current.className = `${"tool-icon-name"} ${"toolIcon-rev"}`;
        } else {
            this.metronRef.current.className = `${"tool-icon-name"} ${"toolIcon"}`;
        }
    }

    changeBPM(t) {
        this.bpm = t;
        if (this.interval === null) {
            return;
        } else {
            clearInterval(this.interval);
            this.interval = null;
            this.switchMetroning();
        }
    }

    render() {
        return (
            <Dropdown
                overlay={
                    <>
                        <Slider
                            className={"speed-slider"}
                            range={false}
                            defaultValue={this.bpm}
                            min={30}
                            max={244}
                            step={1}
                            onChange={this.changeBPM}
                            tipFormatter={(value) => {
                                return `${this.state.text.bpmInfo} ${value}`;
                            }}
                            tooltipPlacement={"bottom"}
                        />
                    </>
                }
                onClick={this.switchMetroning}
                placement={"bottomRight"}
                trigger={["contextMenu"]}
            >
                <div
                    className={`${"tool-icon-name"} ${"toolIcon"}`}
                    ref={this.metronRef}
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
            </Dropdown>
        );
    }
}

export default Metronome;
