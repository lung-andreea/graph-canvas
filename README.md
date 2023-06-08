# About

Proof of concept repo to demonstrate [react-diagrams](https://github.com/parties/react-diagrams) use case in combination with Next.js.

It contains a login page and a home page with a canvas in which different nodes (activities) can be added and connected with each other.

It supports diagram model state preservation between re-renders (when we refresh the page, we do not lose the changes we've made to our diagram).

# Showcase

## Login

![](https://github.com/lung-andreea/graph-canvas/blob/main/images/demo_login.gif)

> The login functionality has been implemented using localStorage

## Refresh functionality

![](https://github.com/lung-andreea/graph-canvas/blob/main/images/demo_refresh.gif)

> Refresh works for the following cases:
> 
> - A new node is added
> - A node is deleted
> - A new link is added
> - A link is deleted
> - Nodes are moved around

## Available Scripts

In the project directory, you can run:

#### `yarn dev`

#### `yarn start`

## Notes

- The project is using `scss` files for styling for simplicity (can be migrated to styled components)
- The project is configured with `eslint` and `prettier` (config and rules can be modified)
