import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Introduce from "./component/Introduce";
import Main from "./component/Main";
import "./App.css";
class App extends Component {
    backgroundColor = "#88aacc";
    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            页页
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNavAltMarkup"
                        >
                            <div className="navbar-nav">
                                <a
                                    className="nav-item nav-link"
                                    href="/introduce/"
                                >
                                    介绍
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div
                        className="content App"
                        style={{
                            background: this.backgroundColor
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
