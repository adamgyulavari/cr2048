import React, { Component } from 'react'

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
  render() {
    return (
      <div className="board">
        {
          this.state.board.map((row, x) => (
            row.map((tile, y) => <p>{`[${x}][${y}]:${tile}`}</p>)
          ))
        }
      </div>
    )
  }
}

export default Game
