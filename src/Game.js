import React, { Component } from 'react'

import './Game.css'

import Board from 'cr-2048/src/Board.js'

const board = Board()
const empty = [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]]

class Game extends Component {
  constructor() {
    super()
    this.state = {
      board: board.getCells()
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
