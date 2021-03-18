import React, { Component } from 'react';
import Match from '../components/match/Match'

class match extends Component {
    render() {
        return (
            <div className={'bg-black text-white'}>
                <div className={'container mx-auto'}>
                    <h1>Match</h1>
                    <p>Start by adding your Players</p>
                    <Match />
                </div>
            </div>      
        );
    }
}

export default match;