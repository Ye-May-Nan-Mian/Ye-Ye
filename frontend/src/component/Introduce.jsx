import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Divider, Timeline } from "antd";

class Introduce extends Component {
    render() {
        return (
            <div className={`${"main"} ${"lighter-background-color"}`}>
                <Divider className={`${"dark-color"}`} orientation="left">
                    {"介绍"}
                </Divider>
                <Timeline
                    className={`${"dark-color"}`}
                    pending="后续期待您的反馈..."
                    reverse={false}
                    style={{ marginLeft: "30vw" }}
                >
                    <Timeline.Item className={`${"dark-color"}`}>
                        2020-09-22 <b>夜寐男♂眠</b>团队成立，<b>页页</b>
                        开发提上日程
                    </Timeline.Item>
                    <Timeline.Item className={`${"dark-color"}`}>
                        2015-11-07 页页 0.1.2 本版正式发布
                    </Timeline.Item>
                </Timeline>

                <p
                    className={`${"dark-color"}`}
                    onClick={() => {
                        this.props.history.goBack();
                    }}
                    style={{
                        cursor: "pointer",
                        marginLeft: "30vw"
                    }}
                >
                    {"<返回"}
                </p>
            </div>
        );
    }
}

export default withRouter(Introduce);
