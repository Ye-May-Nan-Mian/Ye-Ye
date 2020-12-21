import React, { Component } from "react";
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    MinusOutlined,
    PlusOutlined
} from "@ant-design/icons";
import store from "../store";

/* BottomBar
 * height: 20px, width: 100vw
 * background-color: darkColor
 */
class BottomBar extends Component {
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

    zoomInOut(step) {
        var pane = this.findActivePane();
        const oldWidth = parseInt(pane.childNodes[0].style.width.slice(0, -1));
        if ((oldWidth <= 20 && step < 0) || (oldWidth >= 500 && step > 0)) {
            return;
        }
        const newWidth = Math.max(20, Math.min(500, oldWidth + step));
        pane.childNodes.forEach((node) => {
            node.style.width = newWidth + "%";
            if (newWidth < 100) {
                node.style.marginLeft = ((100 - newWidth) / 2).toString() + "%";
            } else {
                node.style.marginLeft = "0%";
            }
        });
        pane.scrollBy({
            top:
                ((pane.scrollTop + window.innerHeight / 2 - 40) * step) /
                oldWidth,
            left: ((window.innerWidth / 2 - 101) * step) / oldWidth,
            behavior: "auto"
        });
        console.log(pane.style.paddingLeft);
    }

    scrollPage(direction) {
        var pane = this.findActivePane();
        var increment = window.innerHeight * 0.5 * direction;
        pane.scrollBy({
            top: increment,
            left: 0,
            behavior: "smooth"
        });
    }

    render() {
        return (
            <div className={`${"bottombar"} ${"dark-background-color"}`}>
                {this.state.panes.length > 0 ? (
                    <>
                        <ArrowUpOutlined
                            className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                            onClick={() => this.scrollPage(-1)}
                        />

                        <ArrowDownOutlined
                            className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                            onClick={() => this.scrollPage(1)}
                        />
                        <MinusOutlined
                            className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                            onClick={() => this.zoomInOut(-8)}
                        />
                        <PlusOutlined
                            className={`${"bottombar-icon"} ${"plusMinusIcon"}`}
                            onClick={() => this.zoomInOut(8)}
                        />
                    </>
                ) : null}
            </div>
        );
    }
}

export default BottomBar;
