/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Image rotation module
 */
import fabric from 'fabric';
import Component from '../interface/component';
import consts from '../consts';

const {componentNames} = consts;

/**
 * Image Select Component
 * @class Select
 * @extends {Component}
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 * fabric:http://fabricjs.com/fabric-intro-part-5
 */
class Select extends Component {
    constructor(graphics) {
        super(componentNames.SELECT, graphics);
        this.isDrag = false;
        this.isDragging = false;
        this.lastPosX = 0;
        this.lastPosY = 0;
        this._listeners = {
            mousedown: this._onFabricMouseDown.bind(this),
            mousemove: this._onFabricMouseMove.bind(this),
            mouseup: this._onFabricMouseUp.bind(this)
        };
    }

    setDrag(val) {
        this.isDrag = val;
        // eslint-disable-next-line no-unused-expressions
        val ? this.start() : this.end();
    }

    start() {
        const canvas = this.getCanvas();
        canvas.defaultCursor = 'grab';

        // 设置别的object都不可点击
        canvas.forEachObject(obj => {
            obj.set({
                evented: false
            });
        });

        canvas.on({
            'mouse:down': this._listeners.mousedown
        });
    }

    end() {
        const canvas = this.getCanvas();

        canvas.defaultCursor = 'default';

        this.isDragging = false;
        canvas.forEachObject(obj => {
            obj.set({
                evented: true
            });
        });
        canvas.off('mouse:down', this._listeners.mousedown);
    }

    /**
        * fabric canvas的mousedown
        * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
        * @private
        */
    _onFabricMouseDown(fEvent) {
        const canvas = this.getCanvas();
        this.isDragging = true;
        this.lastPosX = fEvent.e.clientX;
        this.lastPosY = fEvent.e.clientY;

        canvas.on({
            'mouse:move': this._listeners.mousemove,
            'mouse:up': this._listeners.mouseup
        });
    }

    // fabric canvas的mousemove
    _onFabricMouseMove(fEvent) {
        const canvas = this.getCanvas();
        const pointer = canvas.getPointer(fEvent.e);
        if (this.isDragging) {
            // eslint-disable-next-line prefer-destructuring
            const e = fEvent.e;
            canvas.viewportTransform[4] += e.clientX - this.lastPosX;
            canvas.viewportTransform[5] += e.clientY - this.lastPosY;
            canvas.renderAll();
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        }
    }

    // fabric canvas的mouseup
    _onFabricMouseUp() {
        const canvas = this.getCanvas();
        this.isDragging = false;
        canvas.off({
            'mouse:move': this._listeners.mousemove,
            'mouse:up': this._listeners.mouseup
        });
    }
}

module.exports = Select;
