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

Let's create a new file where we will keep our main Game related stuff, so lets call it `Game.js`
