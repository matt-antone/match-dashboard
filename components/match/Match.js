import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Match extends Component {
    render() {
        return (
            <div className={`flex`}>
                <div className={'flex-1'}>
                    Player One 
                </div>
                <div className={'flex-1'}>
                    Player Two 
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Match);