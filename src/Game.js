import React, { Component } from 'react'

class Game extends Component {
  this.state = {
    board: [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]]
  }
  render() {
    return (
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    )
  }
}

export default Game
