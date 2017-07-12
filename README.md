# A simple 2048 clone made with React

This project was intentionally created for a workshop held at [JSconf Belgium](https://www.jsconf.be/en/).

```
Starting development in React used to be a hard task,
but building something from scratch is now easier than ever.

In this workshop we will create a simple game step by step
focusing on creating the proper components,
organizing the code and make it as smooth as possible.
```

This writing covers the steps to follow the workshop's material.

## Getting started

### Requirements
To go on with this tutorial, you'll need:
- installed nodejs & npm

### Introduction
This workshop was held by [Chain.Reaction](http://chainreaction.io).
We're a Budapest based software agency helping adventurous entrepreneurs building their product from ground up. We're working with only javascript technologies, `nodejs` for backend, `React` for frontend and `React Native` for mobile products.

### React basics

Building something in React needs thinking with `Components`. Every little block of a React application will be (or could be) a separate component, that have its own `state` and responsible for `render`ing itself based on that. Components can render other components, this way ensuring the reusability of your code. A parent component can pass specific data to its' children components as `props`. [More info](https://facebook.github.io/react/docs/components-and-props.html)

React comes with a great javascript extension called `JSX` for describing how the UI will look like. At first glance it will seem to be some sort of mixture of js and html as a template language. JSX will produce actual React components, while keeping your code structure as the resulted html. [More info](https://facebook.github.io/react/docs/introducing-jsx.html)

## The Workshop

### Initializing the project
Since React is a complex frontend framework it needs a lot of packages and a build pipeline to get started. At first you had to setup a bunch of stuff just to get your environment working. Luckily now you can create a fully configured boilerplate with just one line (and an installed npm package called [Create React App](https://github.com/facebookincubator/create-react-app)):

```
npm install -g create-react-app
create-react-app my-2048
```

Now you can enter the generated project, start the development server and start coding:

```
cd my-2048
npm start
```

Now you can modify for example the `App.js` and checkout the build pipeline in working:
- Change the main title in the `h2` tag and see if it changed
- Let's put the name of our app there:

```jsx
<h2>React 2048 by Chain.Reaction</h2>
```

### Your first Component

Let's create a new file where we will keep our main Game related stuff, so lets call it `Game.js`. At first just create a skeleton component:

```jsx
import React, { Component } from 'react'

class Game extends Component {
  render() {
    return (
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    )
  }
}

export default Game
```

The most important part of a component is the `render` method, which will actually produce the looks of it. Note that render must return only one node, inside of it you can have any number of them, but the return value should be only one.

Now for trying out our new component, let's move the lower paragraph from the `App` to be rendered here (that's already in the snippet), and replace rendering it in the `App` with rendering the `Game` component.

```jsx
render() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React 2048 by Chain.Reaction</h2>
      </div>
      <Game />
    </div>
  )
}
```

If you want to use another component somewhere don't forget to import it at the top of the file:

```jsx
import Game from './Game.js'
```

Now if everything went well you should be seeing the same in your browser, just using the two separate components in the background. The html structure should be the same, but you can check that actually the `Game` component is used now with [React Devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

![React devtools](assets/devtools.png)

### An empty board

The game will have a 4x4 board containing tiles, so that's a good guess if imagine that this will be our game's state. The state is also an important part of the components, since if a component's state changes react will re-render the necessary parts of the component. This will be a regular javascript object with any number of keys or level of depth. In order to help react doing it's rerendering magic, you have to consider this object as immutable (most of the time react explicitly notifies you if you try to modify the state object, but have this in mind, not all the time)

So let's initialize our game state with an empty board in the component's constructor:

```jsx
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
    ...
```

Note that this is the only place where we can set the state like this, and also nothing can happen before calling the `super()` parent class' constructor.

Now let's do some rendering. In the `Game.js` render method just map through the `board` and display it with the indices in a paragraph element. Inside of `jsx` elements you can simply have any kind of javascript code using curly braces.

```jsx
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
```

Note that there are some differences compared to html, the css classes are assigned with the `className` attribute.

### Boarding the board

It really doesn't look like a board, does it?

Let's change that!

The simplest solution is to have the board positioning as relative and the paragraphs as absolute so we can dynamically pass the proper left and right values based on the indices. First create a method that returns the correct styling object based on the parameters:

```jsx
  ...
}
getPositionStyle(x, y) {
  return {
    left: x*100,
    right: y*100
  }
}
render() {
  ...
```

Then use it in the render method as the style property of the paragraphs:

```jsx
<p style={this.getPositionStyle(x, y)}>{`[${x}][${y}]:${tile}`}</p>
```

Now create a `Game.css`

```css
.board {
  width: 400px;
  height: 400px;
  position: relative;
}

.board p {
  position: absolute;
  width: 100px;
  height: 100px;
}
```

And import it in the `Game` component

```jsx
import './Game.css'
```

### Boarding the tile

As you can see we're doing many things with that unfortunate paragraph, also it has a method that actually belongs to displaying only the specific paragraphs, so probably we're in the need of a new component.
- Create the `Tile.js`
- Create a skeleton component with a `render` method
- Move the `getPositionStyle` method to this component
- Import it in the `Game` component
- Replace the paragraph element with rendering a `Tile`

Now we need to pass some data to the `Tile`. We can simply add any property to the `<Tile />` component, which will be accessible in the Tile as `this.props`. React will rerender the component if the `props` are changed as well.

```jsx
...
row.map((tile, y) => <Tile x={x} y={y} tile={tile}/>)
...
```

```jsx
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
      <p style={this.getPositionStyle()}>
        {this.props.tile}
      </p>
    )
  }
}

export default Tile
```

Let's do some more styling so this actually looks like the 2048 board.
- Add a css class to the paragraph indicating that is a tile
- Add some background for the board and the tile class
- Remove the positions from the content

Here's what I used:

```jsx
<p style={this.getPositionStyle()} className="tile">
```

```css
.board {
  width: 400px;
  height: 400px;
  background: #bbada0;
  margin: 20px auto;
  position: relative;
  border: 10px solid #bbada0;
}

.tile {
  width: 80px;
  height: 80px;
  margin: 10px;
  line-height: 80px;
  position: absolute;
  border-radius: 3px;
  color: #766;
  background-color: #dcb;
  font-size: 55px;
}
```

### The Game Logic

You can try out that if the initial board is different, the actual tiles will be different. So what we actually need now is to handle the logic of the game. The workshop was held at a JSConf, so I didn't want to bother the audience with coding in plain javascript, so we created a headless implementation and pushed it to an [npm package](https://www.npmjs.com/package/cr-2048) that actually handles that for us. If you want, you can still do it, just create the same interface (what we use below), so you can use your own solution.

So just add it to the package json:
```json
"dependencies": {
  "react": "^15.6.1",
  "react-dom": "^15.6.1",
  "cr-2048": "^1.0.2"
}
```
Then `npm install` or `yarn install`.

This will provide us the board object exactly how we used it, and we can call `up()` or `down` etc methods that will do the magic and we'll just get the new state from it.

Initialize the `Board` object at the top of the `Game` component as a constant and instead of initializing with the empty board object we can have it like this:

```jsx
...
import Board from 'cr-2048/src/Board.js'

const board = Board()

class Game extends Component {
  constructor() {
    super()
    this.state = {
      board: board.getCells()
    }
  }
  ...
```

Don't remove the empty board 4x4 array just yet, we'll use it later, place it as a constant at the top:

```jsx
const empty = [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]]
```
