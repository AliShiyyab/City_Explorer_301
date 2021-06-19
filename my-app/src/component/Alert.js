import React, { Component } from 'react'
import Alertm from 'react-bootstrap/Alert';

export class Alert extends Component {
    render() {
        return (
            <div>
                <Alertm variant="danger">This is a {this.props.errMss}</Alertm>
            </div>
        )
    }
}

export default Alert
