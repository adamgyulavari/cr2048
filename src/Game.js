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
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnMount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }
  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 37:
        board.left();
        break;
      case 38:
        board.up();
        break;
      case 39:
        board.right();
        break;
      case 40:
        board.down();
        break;
      default:
    }
    this.setState({board: board.getCells()})
  }
  render() {
    return (
      <div className="board">
        {
          this.state.board.map((row, x) => (
            row.map((tile, y) => <Tile position={{x:x, y:y}}
                                       tile={tile}
                                       key={`${x}-${y}`}/>)
          ))
        }
      </div>
    )
  }
}

export default Game
