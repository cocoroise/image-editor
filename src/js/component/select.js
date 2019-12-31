/* eslint-disable no-mixed-operators */
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Image rotation module
 */
import fabric from 'fabric';
import Component from '../interface/component';
import consts from '../consts';

const { componentNames } = consts;

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
        this._isLocked = false;
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

    setLockValue(val) {
        this._isLocked = val;
        const canvas = this.getCanvas();

        if (val) {
            canvas.forEachObject(obj => {
                obj.set({
                    selectable: true
                });
            });
        } else {
            canvas.forEachObject(obj => {
                obj.set({
                    selectable: false
                });
            });
        }
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
        if (this._isLocked) {
            this.setLockValue(false);
        } else {
            this.setLockValue(true);
        }
        canvas.on({
            'mouse:down': this._listeners.mousedown
        });
    }

    end() {
        const canvas = this.getCanvas();

        canvas.defaultCursor = 'default';

        canvas.off('mouse:down', this._listeners.mousedown);
        this.isDragging = false;
        canvas.forEachObject(obj => {
            obj.set({
                evented: true,
                selected: true
            });
        });
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
        if (this.isDragging) {
            // eslint-disable-next-line prefer-destructuring
            const e = fEvent.e;
            const vpt = canvas.viewportTransform;
            const zoom = canvas.getZoom();
            const offsetX = e.clientX - this.lastPosX;
            const offsetY = e.clientY - this.lastPosY;

            // viewportTransform 4/5是偏移px
            vpt[4] += offsetX;
            vpt[5] += offsetY;
            const width = canvas.getWidth();
            const height = canvas.getHeight();

            // 限制画布拖动位置
            if (vpt[4] >= 0) {
                vpt[4] = 0;
            } else if (vpt[4] <= width - width * zoom) {
                vpt[4] = width - width * zoom;
            }
            if (vpt[5] >= 0) {
                vpt[5] = 0;
            } else if (vpt[5] <= height - height * zoom) {
                vpt[5] = height - height * zoom;
            }

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
