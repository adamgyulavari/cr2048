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
      <p style={this.getPositionStyle()} className="tile">
        {this.props.tile}
      </p>
    )
  }
}

export default Tile
