import React, { Component } from 'react'
// import Charge from './Charge'
import Token from './Token'

export default class Charges extends Component {

  showCharges = ( upgrade ) => {
    const charges = []
    if(typeof(upgrade.sides[0].charges) != 'undefined'){
      for(let x=1;x<=upgrade.sides[0].charges.value;x++){
        charges.push(<Token name={`charge`} className={'ring-yellow-500'} />)
      }
    }
    return charges
  }

  render() {
    return (
      <div className={`flex text-yellow-500`}>
        {this.showCharges(this.props.upgrade)}
      </div>
    )
  }
}
