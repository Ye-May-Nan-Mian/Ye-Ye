import React, { Component } from "react";
import "../App.css";

class Page extends Component {
    pageSize = 0;
    constructor(props) {
        super(props);
        this.state = {
            selectedImg: 0
        };
        this.changeImg = this.changeImg.bind(this);
    }

    changeImg(index) {
        console.log(index);
        this.setState({
            selectedImg: index
        });
    }

    render() {
        const requireContext = require.context(
            "file_pict",
            true,
            /^\.\/.*\.jpg$/
        );
        const images = requireContext.keys().map(requireContext);

        this.pageSize = images ? images.length : 0;
        // console.log(images);
        return (
            !!this.pageSize && (
                <div className="page">
                    <div className="page-main">
                        <img
                            className="page-mainimg"
                            id={"-1"}
                            alt={"小君没能加载出文件Orz"}
                            src={images[this.state.selectedImg]}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="page-imgs">
                        {images.map((img, index) => {
                            // const reader = new FileReader();
                            // reader.readAsDataURL(img);
                            return (
                                <img
                                    className="page-img"
                                    id={index}
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
            )
        );
    }
}

export default Page;
