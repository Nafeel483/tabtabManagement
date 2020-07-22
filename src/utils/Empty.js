import React, { Component } from 'react'
import empty from '../assets/images/empty.png';

export default class Empty extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                }}>
                {this.props.showText == true ?
                <b> Please ask to the user to add his bank information </b>
                : 
                <img src={empty}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }} />
                }
               
               
            </div>
        )
    }
}
