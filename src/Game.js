import React, { Component } from 'react'

import './Game.css'

class Game extends Component {
  constructor() {
    super()
    this.state = {
      board: [[0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]]
    }
  }
  getPositionStyle(x, y) {
    return {
      left: x*100,
      top: y*100
    }
  }
  render() {
    return (
      <div className="board">
        {
          this.state.board.map((row, x) => (
            row.map((tile, y) => <p style={this.getPositionStyle(x, y)} className="tile">{tile}</p>)
          ))
        }
      </div>
    )
  }
}

export default Game
