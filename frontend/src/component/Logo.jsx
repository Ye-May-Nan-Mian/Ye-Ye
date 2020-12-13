import React, { Component } from "react";

class Logo extends Component {
    render() {
        return (
            <svg
                width={this.props.size}
                height={this.props.size}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
            >
                <g>
                    <circle
                        className={`${"white-logo"}`}
                        r="130"
                        cy="329"
                        cx="188"
                        id="椭圆_1"
                    />
                    <circle
                        className={`${"base-logo"}`}
                        r="104"
                        cy="329"
                        cx="188"
                        id="椭圆_1-2"
                    />
                    <path
                        className={`${"white-logo"}`}
                        strokeWidth="0"
                        d="m242,84l183,9l9,180l-21,0l-18,-123l-103,102l-24,-24l104,-106l-131,-17l1,-21z"
                        id="形状_1"
                    />
                </g>
            </svg>
        );
    }
}

export default Logo;
