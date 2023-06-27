import React, { Component } from "react";
import { isNullOrUndefined } from "util";

class Placeholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customLabel: 'Loading'
        }
    }
    componentWillMount() {
        if (!isNullOrUndefined(this.props.customLabel)) {
            this.setState({
                customLabel: this.props.customLabel
            })
        }
    }
    render() {
        return(
            <div className="placeholderLocation">
            {this.props.loaded ? this.props.children : <ProgressCircle />} 
            </div>
        )
    }
}

const ProgressCircle = ({size = 30, borderColor = "gray", progressColor = "purple"}) => {
    return(<div className="loading" style={{height: size, width: size, borderColor: borderColor, borderRightColor: progressColor}}></div>)
}
export {Card, ProgressCircle, Carousel, Placeholder, Dialog}