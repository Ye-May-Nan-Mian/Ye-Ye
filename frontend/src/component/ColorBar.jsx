import React, { Component } from "react";
import { Dropdown } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import store from "../store";
import Service from "../Service";
import less from "less";
import { changeColor } from "store/actionCreators";

const service = new Service();

export default class ColorBar extends Component {
    themes = [
        ["#C1CBE3", "#9DA5B8", "#54658E", "#253869", "#081945", "#010A21"],
        ["#FFFFFF", "#373B43", "#72767E", "#535860", "#1D212A", "#141D2F"],
        ["#F5FBFF", "#DCEFFD", "#A7D4F4", "#7AB9E6", "#559FD4", "#3583BB"],
        ["#DAE9DA", "#95B595", "#6B936B", "#4D774D", "#2F512F", "#1B4B1B"],
        ["#FFFFFF", "#FFFFFF", "#FFDAED", "#FF99CD", "#FF66B4", "#FD349A"]
        // ["#FFFAF6", "#FFECDA", "#FFDBB7", "#FFCC99", "#BB8855", "#744D27"]
    ];

    componentDidMount() {
        // Can remember the last theme selected by the user
        service.getTheme().then((newColor) => {
            if (newColor.themes && newColor.themes.length > 0) {
                this.changeColor(JSON.parse(newColor.themes), 0);
            }
        });
    }

    changeColor(newColor, toPost = 1) {
        less.modifyVars({
            "@white-color": newColor[0],
            "@light-color": newColor[1],
            "@lighter-color": newColor[2],
            "@base-color": newColor[3],
            "@darker-color": newColor[4],
            "@dark-color": newColor[5]
        });
        const action = changeColor(newColor);
        store.dispatch(action);
        if (toPost) {
            service.postTheme({ post_themes: JSON.stringify(newColor) });
        }
    }

    render() {
        return (
            <Dropdown
                overlay={
                    <div className="color-group">
                        {this.themes.map((theme, index) => {
                            return (
                                <div
                                    className="color-one"
                                    key={"theme" + index}
                                    onClick={() => this.changeColor(theme)}
                                    style={{
                                        background: theme[3],
                                        cursor: "pointer"
                                    }}
                                />
                            );
                        })}
                    </div>
                }
                placement={"bottomRight"}
                trigger={["hover"]}
            >
                <BulbOutlined
                    className={`${"tool-icon"} ${"toolIcon"}`}
                    style={{
                        cursor: "pointer"
                    }}
                />
            </Dropdown>
        );
    }
}
