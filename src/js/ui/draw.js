import util from '../util';
import Colorpicker from './tools/colorpicker';
// import Range from './tools/range';
import Range from './tools/penRange';
import Submenu from './submenuBase';
import templateHtml from './template/submenu/draw';
const DRAW_OPACITY = 0.9;

/**
 * Draw ui class
 * @class
 * @ignore
 */
class Draw extends Submenu {
    constructor(subMenuElement, { locale, iconStyle, menuBarPosition, usageStatistics, showSubmenu }) {
        super(subMenuElement, {
            locale,
            name: 'draw',
            iconStyle,
            menuBarPosition,
            templateHtml,
            usageStatistics,
            showSubmenu
        });

        this._els = {
            drawColorpicker: new Colorpicker(
                this.selector('#tie-draw-color'), '#D53331', this.toggleDirection, this.usageStatistics
            ),
            drawRange: new Range(this.selector('#tie-draw-range'), 2),
            drawShwRect: subMenuElement.querySelector('.tie-draw-penShow-content')
        };

        this.color = this._els.drawColorpicker.color;
        this.width = 12;
    }

    /**
     * Add event for draw
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.setDrawMode - set draw mode
     */
    addEvent(actions) {
        this.actions = actions;
        this._els.drawColorpicker.on('change', this._changeDrawColor.bind(this));
        this._els.drawRange.on('change', this._changeDrawRange.bind(this));
        this.setDrawMode();
        this._changePenRect();
    }

    /**
     * set draw mode - action runner
     */
    setDrawMode() {
        this.actions.setDrawMode('free', {
            width: this.width,
            color: util.getRgb(this.color, DRAW_OPACITY)
        });
    }

    // excute when return to this menu
    changeStartMode() {
        this.actions.stopDrawingMode();
        this.setDrawMode();
    }

    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode() {
        this.actions.stopDrawingMode();
        this.actions.changeSelectableAll(true);
    }

    /**
     * Change drawing color
     * @param {string} color - select drawing color
     * @private
     */
    _changeDrawColor(color) {
        this.color = color || 'transparent';
        this.setDrawMode();
        this._changePenRect();
    }

    /**
     * Change drawing Range
     * @param {number} value - select drawing range
     * @private
     */
    _changeDrawRange(value) {
        value = util.toInteger(value);
        this.width = value;
        this.setDrawMode();
        this._changePenRect();
    }

    _changePenRect() {
        const rectRef = this._els.drawShwRect;
        rectRef.setAttribute('style', `background-color:${this.color};height:${this.width}px`);
    }
}

export default Draw;
