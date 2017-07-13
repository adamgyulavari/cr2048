import React, { Component } from 'react'

class Tile extends Component {
  constructor(props) {
    super()
    this.state = {
      originalPosition: props.position
    }
  }
  getPositionStyle(position) {
    return {
      left: position.x*100,
      top: position.y*100
    }
  }
  render() {
    return (
      <div>
        <div
          className="tile tile-empty"
          style={this.getPositionStyle(this.state.originalPosition)} >
        </div>
        <p style={this.getPositionStyle(this.props.position)}
           className={`tile tile-${this.props.tile}`}>
          {this.props.tile}
        </p>
      </div>
    )
  }
}

export default Tile
