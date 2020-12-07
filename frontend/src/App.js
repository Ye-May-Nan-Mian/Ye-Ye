import React, { Component } from "react";
import Main from "./component/Main";
import "./App.css";
class App extends Component {
    render() {
        // HashRouter is better than BrowerRouter &
        // BrowserRouter not works in electron
        // Now no need to use HashRouter
        return <Main />;
    }
}

export default App;
