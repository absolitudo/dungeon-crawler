import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

/* Action creators */
import setGameState from "./../actions/setGameState"

class CanvasComponent extends React.Component {
    componentDidMount() {
        var canvas = this.refs.canvas
        var c = canvas.getContext("2d")

        /* Canvas size */
        canvas.height = this.props.game.size
        canvas.width = this.props.game.size

        /* Sprites */
        var dirt = new Image();
        dirt.src = "./img/dirt.png"

        var floor = new Image()
        floor.src = "./img/floor.png"

        var char = new Image()
        char.src = "./img/char.png"

        var skeleton = new Image()
        skeleton.src = "./img/skeleton.png"

        var potion = new Image()
        potion.src = "./img/potion.png"

        var torch = new Image()
        torch.src = "./img/torch.png"

        var wall = new Image()
        wall.src = "./img/wall.png"

        var chest = new Image()
        chest.src = "./img/chest.png"

        var bat = new Image()
        bat.src = "./img/bat.png"

        var portal = new Image()
        portal.src = "./img/portal.png"

        var door = new Image()
        door.src = "./img/door.png"

        var miniboss = new Image()
        miniboss.src = "./img/miniboss.png"

        var finalboss = new Image()
        finalboss.src = "./img/finalboss.png"

        /* Wait for the images to load */
        window.onload = () => {

            /* Populate */
            var population = new Population(
                this.props.game.skeletons,
                this.props.game.bats,
                this.props.game.potions,
                this.props.game.chests,
                1,
                0)
            var initGameState = []


            /* Display map */
            this.props.maps.level1.forEach((row, y) => {
                initGameState.push([])
                row.forEach((tile, x) => {
                    switch(tile) {
                        case 0:
                            initGameState[y].push(1)
                            c.drawImage(dirt, 16 * x,16 * y);
                            break
                        case 1:
                            initGameState[y].push(1)
                            c.drawImage(floor, 16 * x,16 * y);
                            break
                        case 2:
                            initGameState[y].push(0)
                            c.drawImage(wall, 16 * x,16 * y);
                            break
                        case 3:
                            initGameState[y].push(0)
                            c.drawImage(wall, 16 * x,16 * y);
                            c.drawImage(torch, 16 * x,16 * y);
                            break
                        case 4:
                            initGameState[y].push(2)
                            c.drawImage(floor, 16 * x,16 * y);
                            c.drawImage(portal, 16 * x,16 * y);
                            break
                        case 5:
                            initGameState[y].push(1)
                            c.drawImage(floor, 16 * x,16 * y);
                            c.drawImage(door, 16 * x,16 * y);
                            break
                    }
                })

            })

            /* Place stuff on the map */
            initGameState = placeObjects(initGameState, population)

            /* Display stuff on the map */
            initGameState.forEach((row, y) => {
                row.forEach((item, x) => {
                    switch(item) {
                        case "skeletons":
                            c.drawImage(skeleton, 16 * x, 16 * y)
                            break
                        case "bats":
                            c.drawImage(bat, 16 * x, 16 * y)
                            break
                        case "potions":
                            c.drawImage(potion, 16 * x, 16 * y)
                            break
                        case "chests":
                            c.drawImage(chest, 16 * x, 16 * y)
                            break
                        case "miniboss":
                            c.drawImage(miniboss, 16 * x, 16 * y)
                            break
                        case "finalboss":
                            c.drawImage(finalboss, 16 * x, 16 * y)
                            break
                        }
                })
            })

            /* Init game state */
            this.props.setGameState(initGameState)
        }


    /* Render */
    }
    render() {
        return(
            <canvas ref="canvas"></canvas>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setGameState
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)



/* Constructors */
function Population(skeletons, bats, potions, chests, miniboss, finalboss) {
    this.skeletons = skeletons + (Math.floor(Math.random() * 3) - 1)
    this.bats = bats + (Math.floor(Math.random() * 3) - 1)
    this.potions = potions + (Math.floor(Math.random() * 3) - 1)
    this.chests = chests + (Math.floor(Math.random() * 3) - 1)
    this.miniboss = miniboss
    this.finalboss = finalboss
}

/* Randomize enemies/chests etc on the map */
function placeObjects(gameState, population) {
    var emptyPlace = []

    for (var y = 0; y < gameState.length; y += 1) {
        for (var x = 0; x < gameState[y].length; x += 1) {
            if (gameState[y][x] === 1) {
                emptyPlace.push({x: x, y: y})
            }
        }
    }
    for (var object in population) {
        for (var i = 0; i < population[object]; i += 1) {
            var num = Math.floor(Math.random() * emptyPlace.length)
            gameState[emptyPlace[num].y][emptyPlace[num].x] = object
            emptyPlace = emptyPlace.filter((item) => item !== emptyPlace[num])
        }
    }
    return gameState
}
