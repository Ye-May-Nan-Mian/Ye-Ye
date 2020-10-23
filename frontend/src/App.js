import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Introduce from "./component/Introduce";
import Main from "./component/Main";
import Navbar from "./component/Navbar";
import "./App.css";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "#ffffff"
        };
        this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    }

    changeBackgroundColor(newColor) {
        this.setState({
            backgroundColor: newColor
        });
        console.log(this.state.backgroundColor);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="browser">
                    <Navbar
                        changeBackgroundColor={this.changeBackgroundColor}
                    />
                    <div
                        style={{
                            background: this.state.backgroundColor
                        }}
                    >
                        <Route path="/" exact component={Main} />
                        <Route path="/introduce/" exact component={Introduce} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
