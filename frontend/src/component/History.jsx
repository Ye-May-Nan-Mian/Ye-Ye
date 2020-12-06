import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Divider, List } from "antd";
import Service from "../Service";

const service = new Service();

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: ["暂无历史记录"]
        };

        service.getHistory().then((data) => {
            this.setState(() => {
                return { history: data };
            });
        });
    }

    render() {
        return (
            <div className={`${"main"} ${"lighter-background-color"}`}>
                <Divider className={`${"dark-color"}`} orientation="left">
                    {"历史记录"}
                </Divider>
                <List
                    className={`${"dark-color"}`}
                    footer={
                        <div
                            className={`${"dark-color"}`}
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            {"<返回"}
                        </div>
                    }
                    bordered
                    dataSource={this.state.history}
                    renderItem={(item) => (
                        <List.Item
                            className={`${"dark-color"}`}
                            onClick={() => {
                                this.props.history.goBack({ data: item });
                            }}
                            style={{
                                marginLeft: "5vw",
                                marginRight: "5vw",
                                cursor: "pointer"
                            }}
                        >
                            {item}
                        </List.Item>
                    )}
                    style={{ marginLeft: "10vw", marginRight: "10vw" }}
                />
            </div>
        );
    }
}

export default withRouter(History);
