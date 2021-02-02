
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    } 
}
class Dimension {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    /**
     * 
     * @param {Point} point 
     */
    insideBounds(point) {
        return point.x <= this.width && point.y <= this.height;
    }

}

Array.prototype.remove = function (item) {
    this.splice(this.indexOf(item), this.indexOf(item));
}




/**
 * @var {CanvasRenderingContext2D} context
 */
const Game = {

    canvas: document.createElement("canvas"),
    components: [],
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.size = new Dimension(this.width, this.height);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    addComponent: function (components) {

        this.components.push(components);

        updateGameArea();
    },
    removeComponent: function (component) {
        this.components.remove(component);
    },
    /**
     * @return {CanvasRenderingContext2D} this context;
     */
    getContext: function () {
        return this.context;
    }
}

/**
 * 
 * @param {number} width 
 * @param {number} height 
 * @param {string} color 
 * @param {Point} location 
 * @param {Function?} redraw 
 */
function component(width, height, color, location, redraw = undefined) {

    this.width = width;
    this.height = height;
    this.color = color;

    this.location = location;

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    this.redraw = redraw || function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    }

}

function updateGameArea() {

    Game.clear();

    Game.components?.forEach(x => x.redraw(Game.getContext()));

    Game.canvas.dispatchEvent(new CustomEvent("tickevent"));

}

function startGame() {

    Game.start();

    var componentOne = new component(25, 25, "red", new Point(200, 200));


    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    componentOne.redraw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.location.x, this.location.y, this.width, this.height);
    }

    Game.addComponent(componentOne);

    Game.canvas.addEventListener("tickevent", e => {

        componentOne.location.x += 1;

    });

}

startGame();