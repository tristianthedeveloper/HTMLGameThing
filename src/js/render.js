
/**
 * @type {CanvasRenderingContext2D}
 */
var context;

var defaultLineWidth;
/**
 * 
 * @param {CanvasRenderingContext2D} context 
 */
function setupRenderingContext(context) {

    this.context = context;

    this.defaultLineWidth = context.lineWidth;


}


class Renderer {


    boundPoint;
    strokeStyle;
    fillStyle;

    constructor() {

    }
    /**
     * Chainable, begin the Renderer class.
     * @returns {Renderer}
     * @param {Point} point 
     */
    static begin() {

        var renderer = new Renderer();
        context.beginPath();
        context.save();
        return renderer;
    }

    /**
     * 
     * @returns {Renderer}
     * @param {string | CanvasGradient | CanvasPattern} strokeStyle 
     */
    setStrokeStyle(strokeStyle) {
        this.strokeStyle = strokeStyle;
        context.strokeStyle = this.strokeStyle;
        context.save();

    }
    /**
     * @returns {Renderer}
     * @param {number} x
     * @param {number} y 
     */
    drawLine(startX, startY, endX, endY, lineWidth = defaultLineWidth) {

        context.lineWidth = lineWidth;
        context.moveTo(startX, startY);
        context.line
        context.lineTo(endX, endY);
        this.draw();
    }

    /**
     * @returns {Renderer}
     * @param {string | CanvasGradient | CanvasPattern} strokeStyle 
     */
    withFillStyle(fillStyle) {

        this.fillStyle = fillStyle;
        context.fillStyle = fillStyle;
        context.save();
        this.draw();

    }

    drawCircle(x, y, radius, lineWidth = defaultLineWidth) {

        context.lineWidth = lineWidth;
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.draw();

    }

    /**
     * @returns {Renderer}
     * @param {string | number} color A color to change to 
     */
    changeColor(color) {
        this.fillStyle = color;
        this.strokeStyle = color;
        context.fillStyle = color;
        context.strokeStyle = color;
        context.save();

    }

    /**
     * Draws this renderer
    * @returns {Renderer}
    */
    draw() {

        if (this.strokeStyle) context.stroke();
        else if (this.fillStyle) context.fill();
        else throw new Error("FillStyle undefined and strokeStyle undefined.");
        context.restore();
        context.beginPath();
    }


}