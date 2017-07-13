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
      board: board.getCells(),
      offsetsX: empty,
      offsetsY: empty
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
        this.left()
        break
      case 38:
        this.up()
        break
      case 39:
        this.right()
        break
      case 40:
        this.down()
        break
      default:
    }
    setTimeout(() => {
      this.setState({
        board: board.getCells(),
        offsetsX: empty,
        offsetsY: empty})
      board.emptyTransformation()
    }, 200)
  }
  left() {
    board.left()
    this.setState({offsetsX: board.getTransformation()})
  }
  up() {
    board.up()
    this.setState({offsetsY: board.getTransformation()})
  }
  down() {
    board.down()
    this.setState({offsetsY: board.getTransformation()})
  }
  right() {
    board.right()
    this.setState({offsetsX: board.getTransformation()})
  }
  getPosition(x, y) {
    return {
      x: x + this.state.offsetsX[x][y],
      y: y + this.state.offsetsY[x][y]
    }
  }
  isMoving(x, y) {
    return (this.state.offsetsX[x][y] !== 0
         || this.state.offsetsY[x][y] !== 0)
  }
  render() {
    return (
      <div className="board">
        {
          this.state.board.map((column, x) => (
            column.map((tile, y) => <Tile position={this.getPosition(x, y)}
                                          tile={tile}
                                          moving={this.isMoving(x, y)}
                                          key={`${x}-${y}`}/>)
          ))
        }
      </div>
    )
  }
}

export default Game
