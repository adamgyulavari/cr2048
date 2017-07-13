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

The game will have a 4x4 board containing tiles, so a good guess is imagining that as our game's state. The `state` is also an important part of the components, since if a component's state changes react will re-render the necessary parts of the component. This will be a regular javascript object with any number of keys or level of depth. In order to help react doing it's rendering magic, you have to consider this object as immutable (most of the time react explicitly notifies you if you try to modify the state object, not all the time though)

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

Note that this is the only place where we can set the state like this, and also nothing can happen before calling the `super()` (the parent class' constructor).

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

Notice that we actually passed a simple javascript object as the `style` property with simple integer values. This will be converted into proper styling attributes the integers considered as pixel values. (Also you might notice that the x-y coordinates are mixed up how they should be used for left-top pixels. I did this on purpose. While having only 0-s to be displayed it doesn't really matter, later on this will be useful)

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

Now we need to pass some data to the `Tile`. We can simply add any property to the `<Tile />` component, which will be accessible in the Tile as `this.props`. React will rerender the component if the `props` are changed as well. If you check the console probably you'll notice some warnings about something not having a `key`. When mapping through an array and creating a node for each element React's rendering will work better if all of them have a `key` (unique in the context) that will be converted to an id in the `html`.

```jsx
...
row.map((tile, y) => <Tile x={x} y={y} tile={tile} key={`${x}-${y}`}/>)
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

The board is actually giving back the cells almost like this just with a little twist literally. Instead of giving us the rows, it gives us columns, so what we mixed up before comes in handy (the `x` really should correspond with the `left` and `y` with `top`). But let's name the variables accurately.

```jsx
this.state.board.map((column, x) => (
  column.map((tile, y) => <Tile x={x} y={y} tile={tile} key={`${x}-${y}`}/>)
))
```

### Calling back

The only thing that is needed to have an actual playable game is to add some callbacks for the keyevents that will change our state.
We can subscribe our event listeners when the component was mounted and remove them when the component is about to get removed. For these we can use the component lifecycle callbacks of the `Game` component:

```jsx
componentDidMount() {
  window.addEventListener('keydown', this.handleKeyDown)
}
componentWillUnMount() {
  window.removeEventListener('keydown', this.handleKeyDown)
}
```
And we need to provide something that will handle these events. In the snippet above I used the `handleKeyDown` method of the class. In it we just need to check what key was typed and call the corresponding method of the board object. And of course set the state of the component. To do that we need to use the `this.setState()` method where we can pass the modified parts of our state. Since the only thing in our state object is a `board` with a 4x4 array as a value we will rewrite the whole thing. But you don't need to do that in an other example passing the changed keys with the new values is enough.

```jsx
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
  }
  this.setState({board: board.getCells()})
}
```

Note that I created this method with the `arrow` function because we will need the component as a `this` in order to update the state.

If you've got this far your game is perfectly functioning and playable.
The only thing that remains is to help the user understanding what is happening when hitting a key. Without animations it's really a hard task to recognize the state changes of the tiles.

### Animate that little tile

At this point we'll need to check the [cr-2048 package](https://www.npmjs.com/package/cr-2048) for help since we're getting the state from the `Board` without any knowledge of what really happened in the background. Without that information we can't really animate anything. What we need is the movements of the tiles. Which tile went where. Luckily the `Board` has a method `getTransformation()` which will give us exactly that. When hitting a key the tiles will move only in one direction, so this transformation information will be just a simple 4x4 array with the offsets of the tiles that are moved. If we hit the `up` or `down` key the `y` coordinate will change with the offsets or if we hit the `left` or `right` key the `x` coordinate will change.

The first problem that will occur if we move our tiles, that the original game had empty tiles and the filled ones moved on top of that. Now if we move one, just the board background will be behind it. So let's create the background empty tile. Also we don't acutally need the `0` values displayed, so we need to remove them. At some point different valued tiles will have different background and font sizes, so preparing for that the easiest way for removing the `0`-s is to have a `tile-{value}` class assigned to the paragraph. For this instance where the value is `0` it will contain a `display: none;`

```jsx
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
```

And the css part (I just moved the `background-color` property to the `tile-empty` class from the `tile`). Also we can add a different background-color for the `tile-2` picked from the original game.

```css
.tile {
  width: 80px;
  height: 80px;
  margin: 10px;
  line-height: 80px;
  position: absolute;
  border-radius: 3px;
  font-size: 55px;
  color: #766;
}

.tile-empty {
  background-color: rgba(238,228,218,0.35);
}

.tile-0 {
  display: none;
}

.tile-2 {
  background-color: #eee;
}
```

The empty tile will still be moved alongside with not empty one on top of it, since the position is calculated from the props, so let's store the original position in the state of the tile when creating one. In the constructor we can access the props as well and use them for initializing the component's state. And while we're there let's wrap the `x` and `y` into a `position` object.

```jsx
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
```

So we can separately call the styling method for the empty tile with the state's `this.state.originalPosition` and for the actual tile with `this.props.position`. This way the latter can be moved around while the first one stays where it should be.

```jsx
...
<div
  className="tile tile-empty"
  style={this.getPositionStyle(this.state.originalPosition)} >
</div>
<p style={this.getPositionStyle(this.props.position)}
   className={`tile tile-${this.props.tile}`}>
...
```

Don't forget to pass the position as a single object to the `Tile` component when rendering the `Game`.

```jsx
<Tile position={{x:x, y:y}}
      tile={tile}
      key={`${x}-${y}`}/>
```

Note that double curly braces are needed here. The first one implicates the javascript context and the second one is the beginning and closing of an object.

### Transfromers III

What's left is to get the transformations and use it in the passed position values, and also create the animation in css. The latter one is easier. We want to animate the `left` and the `top` property with some nice easing under a relatively short time.

```css
.slide {
  transition-property: left top;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
```

We will assign this class to the tile's paragraph when it's need to be moved. Probably we will pass the `moving` information as a property. At this point we'll use at least 3 values of the props in the `Tile`'s render method so it's best if extract them.

```jsx
render() {
  const { position, tile, moving } = this.props
  return (
    <div>
      <div
        className="tile tile-empty"
        style={this.getPositionStyle(this.state.originalPosition)} >
      </div>
      <p style={this.getPositionStyle(position)}
         className={`tile tile-${tile} ${moving?'slide':''}`}>
        {tile}
      </p>
    </div>
  )
}
```

In the `Game` component we need to get the offsets from the board and use them calculating the position what's passed to the `Tile`. But first we need to initialize the offsets as states, that's where the empty array comes handy.

```jsx
this.state = {
  board: board.getCells(),
  offsetsX: empty,
  offsetsY: empty
}
```

For up and down we will set the `offsetsY` and for left and right the `offsetsX`.

```jsx
left() {
  board.left();
  this.setState({offsetsX: board.getTransformation()});
}
up() {
  board.up();
  this.setState({offsetsY: board.getTransformation()});
}
down() {
  board.down();
  this.setState({offsetsY: board.getTransformation()});
}
right() {
  board.right();
  this.setState({offsetsX: board.getTransformation()});
}
```

After 200ms the animations are finished so we can update the `board` of the `Game` and reset the offsets. And of course we can replace the calls for our methods instead of the boards'.

```jsx
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
```

We have the offsets, we just need to add them to the positions what gets passed with the moving information. The `moving` information is basically a boolean which can be true if in the current position there is an offset. Let's create some methods for providing these complicated calculations.

```jsx
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
```
