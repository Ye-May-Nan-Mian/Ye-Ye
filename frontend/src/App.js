import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import History from "./component/History";
import Introduce from "./component/Introduce";
import Main from "./component/Main";
import "./App.css";
class App extends Component {
    render() {
        // HashRouter is better than BrowerRouter &
        // BrowserRouter not works in electron
        return (
            <HashRouter>
                <div className="browser">
                    <Route path="/" exact component={Main} />
                    <Route path="/introduce/" exact component={Introduce} />
                    <Route path="/History/" exact component={History} />
                </div>
            </HashRouter>
        );
    }
}

export default App;
