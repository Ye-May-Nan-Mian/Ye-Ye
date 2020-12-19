import React, { Component } from "react";

class Logo extends Component {
    render() {
        return (
            <svg
                height={this.props.height}
                width={this.props.width}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                style={{
                    minHeight: this.props.height,
                    minWidth: this.props.width
                }}
            >
                <g>
                    <circle
                        className={`${this.props.outterColor}`}
                        r="130"
                        cy="329"
                        cx="188"
                        id="outterCircle"
                    />
                    <circle
                        className={`${this.props.innerColor}`}
                        r="104"
                        cy="329"
                        cx="188"
                        id="innerCircle"
                    />
                    <path
                        className={`${this.props.outterColor}`}
                        strokeWidth="0"
                        d="m242,84l183,9l9,180l-21,0l-18,-123l-103,102l-24,-24l104,-106l-131,-17l1,-21z"
                        id="arrow"
                    />
                </g>
            </svg>
        );
    }
}

export default Logo;
