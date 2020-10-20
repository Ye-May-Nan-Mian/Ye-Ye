import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
// import { Route } from "react-router-dom";
import Page from "./component/Page";
import UploadFile from "./component/UploadFile";
import Video from "./component/Video";
import "./App.css";
class App extends Component {
    // fileUploaded = false;
    constructor(props) {
        super(props);
        this.state = {
            fileUploaded: true
        };
    }
    // if the file uploaded successfully, then the variable "fileUploaded"
    // will be modified to "true", then "Video" can record face
    changeFileUploaded() {
        // this.fileUploaded = true;
        this.setState({
            fileUploaded: true
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">
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
                    <div className="content">
                        {/* <Route path="/" exact component={Video} /> */}
                        {/* <Route path="/file" exact component={UploadFile} /> */}
                    </div>
                    <Video fileUploaded={this.state.fileUploaded} />
                    <UploadFile callback={this.changeFileUploaded} />
                    <Page />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
