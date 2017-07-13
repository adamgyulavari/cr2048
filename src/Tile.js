import React, { Component } from 'react'

class Tile extends Component {
  getPositionStyle() {
    return {
      left: this.props.x*100,
      top: this.props.y*100
    }
  }
  render() {
    return (
      <div>
        <div
          className="tile tile-empty"
          style={this.getPositionStyle()} >
        </div>
        <p style={this.getPositionStyle()} className={`tile tile-${this.props.tile}`}>
          {this.props.tile}
        </p>
      </div>
    )
  }
}

export default Tile
