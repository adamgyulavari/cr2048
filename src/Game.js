import React, { Component } from 'react'

import Tile from './Tile.js'
import Board from 'cr-2048/src/Board.js'

import './Game.css'

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
  render() {
    return (
      <div className="board">
        {
          this.state.board.map((row, x) => (
            row.map((tile, y) => <Tile x={x} y={y} tile={tile}/>)
          ))
        }
      </div>
    )
  }
}

export default Game
