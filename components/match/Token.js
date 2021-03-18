import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from './Icon'

function mapStateToProps(state) {
    return {

    };
}

class Token extends Component {
    handleClick = (e) => {
        e.preventDefault()
        console.log('token clicked')
        return this.props.clickHandler ? this.props.clickHandler() : false
    }

    render() {
        return (
            <div className={`token ring-2 ring-opacity-70 rounded-full flex justify-center items-center w-7 h-7 text-lg mx-1 ${this.props.className}`} onClick={this.handleClick}>
                <Icon name={this.props.name} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Token);