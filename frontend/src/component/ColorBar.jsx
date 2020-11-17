import React, { Component } from "react";
// import Service from "../Service"
import less from "less";

// const service = new Service();

export default class ColorBar extends Component {
    themes = [
        ["#C1CBE3", "#9DA5B8", "#54658E", "#253869", "#081945", "#010A21"],
        ["#F5FBFF", "#DCEFFD", "#A7D4F4", "#7AB9E6", "#559FD4", "#3583BB"],
        ["#DAE9DA", "#95B595", "#6B936B", "#4D774D", "#2F512F", "#1B4B1B"],
        ["#FFFFFF", "#FFFFFF", "#FFDAED", "#FF99CD", "#FF66B4", "#FD349A"],
        ["#DBD1D1", "#B2B0B0", "#797979", "#3F3F3F", "#000000", "#050303"],
        ["#FFFAF6", "#FFECDA", "#FFDBB7", "#FFCC99", "#BB8855", "#744D27"]
    ];

    constructor(props) {
        super(props);
        this.state = {
            textColor: "#989899",
            navColor: "#f8f9fa"
        };
        this.changeColor = this.changeColor.bind(this);
    }

    componentDidMount() {
        // TODO: Can remember the last theme selected by the user
        // service.getTheme().then((newColor)=>this.changeColor(newColor));
    }

    changeColor(newColor) {
        less.modifyVars({
            "@white-color": newColor[0],
            "@light-color": newColor[1],
            "@lighter-color": newColor[2],
            "@base-color": newColor[3],
            "@darker-color": newColor[4],
            "@dark-color": newColor[5]
        });
        // service.postTheme(newColor);
    }

    render() {
        return (
            <div className="mynav-colorgroup">
                {this.themes.map((theme, index) => {
                    return (
                        <div
                            className="mynav-color"
                            key={"theme" + index}
                            onClick={() => this.changeColor(theme)}
                            style={{ background: theme[3] }}
                        />
                    );
                })}
            </div>
        );
    }
}
