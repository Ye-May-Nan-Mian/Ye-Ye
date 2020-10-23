import React, { Component } from "react";
// import Service from "../Service";
import "../App.css";
// const service = new Service();

class Navbar extends Component {
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
        this.setState({
            textColor: newColor[0],
            navColor: newColor[1]
        });
        this.props.changeBackgroundColor(newColor[2]);
        // service.postTheme(newColor);
    }

    render() {
        return (
            <div
                className="mynavbar"
                style={{
                    background: this.state.navColor
                }}
            >
                <a
                    className="mynav-brand"
                    href="/"
                    style={{ color: this.state.textColor }}
                >
                    {"页页"}
                </a>
                <a
                    className="mynav-intro"
                    href="/introduce/"
                    style={{ color: this.state.textColor }}
                >
                    {"介绍"}
                </a>
                <div class="mynav-colorgroup">
                    <div
                        class="mynav-color"
                        key="themelightgray"
                        onClick={() =>
                            //          textColor,   navColor,   backgorundColor
                            this.changeColor(["#989899", "#f8f9fa", "#ffffff"])
                        }
                        style={{ background: "#f8f9fa" }}
                    />
                    <div
                        class="mynav-color"
                        key="themelightblue"
                        onClick={() =>
                            this.changeColor(["#006699", "#e3f2fd", "#f3ffff"])
                        }
                        style={{ background: "#e3f2fd" }}
                    />
                    <div
                        class="mynav-color"
                        key="themesilkgold"
                        onClick={() =>
                            this.changeColor(["#c0b283", "#dcd0c0", "#f7f5e6"])
                        }
                        style={{ background: "#dcd0c0" }}
                    />
                    <div
                        class="mynav-color"
                        key="themegreenery"
                        onClick={() =>
                            this.changeColor(["#3c413d", "#d9dcd3", "#dbded5"])
                        }
                        style={{ background: "#d9ecd3" }}
                    />
                    <div
                        class="mynav-color"
                        key="themedarkgreen"
                        onClick={() =>
                            this.changeColor(["#f1b24a", "#4d774e", "#9dc88d"])
                        }
                        style={{ background: "#4d774e" }}
                    />
                    <div
                        class="mynav-color"
                        key="themedarkblue"
                        onClick={() =>
                            this.changeColor(["#e8e8e8", "#333a56", "#336699"])
                        }
                        style={{ background: "#333a56" }}
                    />
                    <div
                        class="mynav-color"
                        key="themedark"
                        onClick={() =>
                            this.changeColor(["#c0c0c0", "#0f0f0f", "#1f1f1f"])
                        }
                        style={{ background: "#0f0f0f" }}
                    />
                </div>
            </div>
        );
    }
}

export default Navbar;
