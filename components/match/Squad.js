import React, { Component } from 'react'
import { default as listData } from '../json/sample-list';
import { default as Pilots } from './Pilots'

class Squad extends Component {
  state = { 
    squad: listData,
    manifest: [],
    upgrades: [],
    ships: [],
    pilots: [],
  }

  loading = {
    active: false,
    fetches: []
  }

  createDamageDeck = () => {
    const damageDeck = []
    if(typeof(this.state.damagedecks) !== 'undefined')
    this.state.damagedecks[0].cards.map( card => {
      for(let x=1; x <= card.amount ; x++){
        damageDeck.push(card)
      }
    })
    return this.shuffleArray(damageDeck)
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  drawDamage = () => {
    let deck = Array.from(this.state.damageDeck)
    //console.log(deck)
    const card = deck.splice(0,1)[0]
    this.setState({damageDeck: deck})
    console.log(deck,card)
    return card
  }

  getShips = () => {
    //console.log('gettingships')
    const { squad, ships } = this.state
    const pilots = []
    squad.pilots.forEach( (pilot,i) => {
      const { upgrades } = pilot
      const ship = ships.filter(obj => obj.xws === pilot.ship)[0]
      const data = ship.pilots.filter(obj => obj.xws === pilot.id)[0]
      data.id = i
      data.stats = ship.stats
      data.actions = ship.actions
      data.upgrades = []
      for( const property in upgrades){
        const upgrade = upgrades[property][0]
        let upgradeData = this.state.upgrades.filter( obj => obj.xws === upgrade )[0]
        upgradeData.type = property
        data.upgrades.push(upgradeData)
      }
      data.hp = this.getHitPoints(data)
      data.hpTotal = this.getHitPoints(data)
      data.damage = []
      pilots.push(data)
    })
    this.setState({pilots: pilots})
  }

/**
 * Get Hit Points
 **/
  
  getHitPoints = (ship) => {
    let hp = 0;
    const hpStats = ship.stats.filter( obj => obj.type === 'hull')
    hpStats.map( stat => {
      hp += stat.value
    })
    if(typeof(ship.upgrades) !== 'undefined'){
      //console.log('ship has upgrades')
      const hpUpgrades = ship.upgrades.filter( obj => obj.xws === 'shieldupgrade'  || obj.xws === 'hullupgrade' )
      hpUpgrades.map( upgrade => {
        upgrade.sides.map( side => {
          //console.log(side.grants)
          if(typeof(side.grants) !== 'undefined'){
            side.grants.map( grant => {
              if(grant.value === 'shields' || grant.value === 'hull'){
                hp += grant.amount
              }
            })  
          }
        })
      } )  
    }
    return hp;
  }
 
  componentDidMount = () => {
    this.getManifest()
  }

  render() { 
    const { squad, pilots } = this.state
    return ( 
      <div className={`squad text-gray-400 py-4`}>
        <h1 className="pb-5 text-5xl">{squad.name} <small>({squad.points})</small></h1>
        <h2 className="text-lg">{squad.version}</h2>
        <Pilots pilots={pilots} faction={squad.faction} drawDamage={this.drawDamage}/>
      </div>
     );
  }
}
 
export default Squad;