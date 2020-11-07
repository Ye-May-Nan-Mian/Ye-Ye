import React, { Component } from "react";
import "../App.css";

class Page extends Component {
    // Todo: if we want to support deleting some pictures,
    // maybe we should put "pageSize" in this.state
    pageSize = 0;
    constructor(props) {
        super(props);
        this.state = {
            selectedImg: 0
        };
        this.changeImg = this.changeImg.bind(this);
    }

    changeImg(index) {
        // console.log(index);
        this.setState(() => {
            return {
                selectedImg: index
            };
        });
    }

    render() {
        // console.log(this.props.fileImgs.length);
        return this.props.fileImgs.length > 0 ? (
            <div className="page">
                {/* a big picture */}
                <div className="page-main">
                    <img
                        className="page-mainimg"
                        key={"-1"}
                        alt={"小君没能加载出文件Orz"}
                        src={this.props.fileImgs[this.state.selectedImg]}
                    />
                </div>
                {/* many some small pictures */}
                <div className="page-imgscontainer">
                    <div className="page-imgs" key={"pageimgs"}>
                        {this.props.fileImgs.map((img, index) => {
                            // const reader = new FileReader();
                            // reader.readAsDataURL(img);
                            return (
                                <img
                                    className={
                                        index === this.state.selectedImg
                                            ? "page-img-select"
                                            : "page-img"
                                    }
                                    key={index}
                                    alt={"小君没能加载出文件Orz"}
                                    src={img}
                                    onClick={() => {
                                        this.changeImg(index);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        ) : null; // TODO: we can add some components to here if we want
    }
}

export default Page;
