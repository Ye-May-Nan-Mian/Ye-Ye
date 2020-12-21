import React, { Component } from "react";
import { Dropdown, Slider } from "antd";
import store from "../../store";
import { Auto } from "../svg";

class AutoTurning extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.turningRef = React.createRef();
        this.storageChange = this.storageChange.bind(this);
        this.switchTurning = this.switchTurning.bind(this);
        this.autoTurning = this.autoTurning.bind(this);
        this.changeInterTime = this.changeInterTime.bind(this);
        this.changeStep = this.changeStep.bind(this);
        this.interval = null;
        this.interTime = 5;
        this.step = 30;
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

    switchTurning() {
        if (this.interval === null) {
            if (this.state.panes.length > 0) {
                this.interval = setInterval(
                    () => this.autoTurning(),
                    this.interTime * 1000
                );
                // reverse color while it is turning
                this.turningRef.current.className = `${"tool-icon-name"} ${"toolIcon-rev"}`;
            }
        } else {
            clearInterval(this.interval);
            this.interval = null;
            this.turningRef.current.className = `${"tool-icon-name"} ${"toolIcon"}`;
        }
    }

    findActivePane() {
        var panes = document.getElementsByClassName("yeye-tabs");
        var strRegex = this.state.activePane + "$";
        var re = new RegExp(strRegex);
        var pane;
        Array.prototype.forEach.call(panes, function (element) {
            if (re.test(element.id)) {
                pane = element;
            }
        });
        return pane;
    }

    autoTurning() {
        this.turningRef.current.className = `${"tool-icon-name"} ${"toolIcon-rev"}`;
        var pane = this.findActivePane();
        pane.scrollBy({
            top: window.innerHeight * this.step * 0.01,
            left: 0,
            behavior: "smooth"
        });
    }

    changeInterTime(t) {
        this.interTime = t;
        if (this.interval === null) {
            return;
        } else {
            clearInterval(this.interval);
            this.interval = null;
            this.switchTurning();
        }
    }

    changeStep(t) {
        this.step = t;
    }

    render() {
        return (
            <Dropdown
                overlay={
                    <>
                        <Slider
                            className={"speed-slider"}
                            range={false}
                            defaultValue={this.interTime}
                            min={1}
                            max={10}
                            step={1}
                            onChange={this.changeInterTime}
                            tipFormatter={(value) => {
                                return `${this.state.text.turningSpeedInfo} ${value}s`;
                            }}
                            tooltipPlacement={"top"}
                        />
                        <Slider
                            className={"speed-slider"}
                            range={false}
                            defaultValue={this.step}
                            min={10}
                            max={100}
                            step={10}
                            onChange={this.changeStep}
                            tipFormatter={(value) => {
                                return `${this.state.text.turningStepInfo} ${value}%`;
                            }}
                            tooltipPlacement={"bottom"}
                        />
                    </>
                }
                onClick={this.switchTurning}
                placement={"bottomRight"}
                trigger={["contextMenu"]}
            >
                <div
                    className={`${"tool-icon-name"} ${"toolIcon"}`}
                    ref={this.turningRef}
                    style={{
                        width: this.state.toolCollapsed ? "40px" : "180px"
                    }}
                >
                    <Auto id="timerController" classProps="tool-icon-auto" />
                    <p
                        className={`${"tool-name"}`}
                        hidden={this.state.toolCollapsed}
                    >
                        {this.state.text.timer}
                    </p>
                </div>
            </Dropdown>
        );
    }
}

export default AutoTurning;
