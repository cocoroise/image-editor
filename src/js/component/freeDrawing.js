/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Free drawing module, Set brush
 */
import fabric from 'fabric';
import Component from '../interface/component';
import consts from '../consts';

/**
 * FreeDrawing
 * @class FreeDrawing
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
class FreeDrawing extends Component {
    constructor(graphics) {
        super(consts.componentNames.FREE_DRAWING, graphics);

        /**
         * Brush width
         * @type {number}
         */
        this.width = 12;
        this.setting = null;
        /**
         * fabric.Color instance for brush color
         * @type {fabric.Color}
         */
        this.oColor = new fabric.Color('rgba(0, 0, 0, 0.5)');
        this._listeners = {
            mouseup: this._onFabricMouseUp.bind(this)
        };
    }

    /**
     * Start free drawing mode
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    start(setting) {
        const canvas = this.getCanvas();

        canvas.isDrawingMode = true;
        this.setting = setting;
        this.setBrush(setting);
        canvas.on({
            'mouse:up': this._listeners.mouseup
        });
    }

    /**
     * Set brush
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    setBrush(setting) {
        const brush = this.getCanvas().freeDrawingBrush;

        setting = setting || {};
        this.setting = setting;
        this.width = setting.width || this.width;
        if (setting.color) {
            this.oColor = new fabric.Color(setting.color);
        }
        brush.width = this.width;
        brush.color = this.oColor.toRgba();
    }

    /**
     * End free drawing mode
     */
    end() {
        const canvas = this.getCanvas();
        canvas.off({
            'mouse:up': this._listeners.mouseup
        });
        canvas.isDrawingMode = false;
        canvas.renderAll();
    }

    _onFabricMouseUp() {
        const canvas = this.getCanvas();
        // 这样可以解决画完之后放大笔迹有残留的bug
        canvas.isDrawingMode = false;
        canvas.renderAll();
        canvas.isDrawingMode = true;
    }
}

module.exports = FreeDrawing;
