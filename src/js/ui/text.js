import Range from './tools/penRange';
import Colorpicker from './tools/colorpicker';
import Submenu from './submenuBase';
import templateHtml from './template/submenu/text';
import { toInteger } from '../util';

/**
 * Crop ui class
 * @class
 * @ignore
 */
class Text extends Submenu {
    constructor(subMenuElement, { locale, iconStyle, menuBarPosition, usageStatistics, showSubmenu }) {
        super(subMenuElement, {
            locale,
            name: 'text',
            iconStyle,
            menuBarPosition,
            templateHtml,
            usageStatistics,
            showSubmenu
        });
        this.effect = {
            bold: false,
            italic: false
            // underline: false
        };
        this.align = 'left';
        this.value = 16;
        this._els = {
            // textEffectButton: this.selector('#tie-text-effect-button'),
            textColorpicker: new Colorpicker(
                this.selector('#tie-text-color'), '#c30000', this.toggleDirection, this.usageStatistics
            ),
            textRange: new Range(this.selector('#tie-text-range'), 2)
        };
    }

    /**
     * Add event for text
     * @param {Object} actions - actions for text
     *   @param {Function} actions.changeTextStyle - change text style
     */
    addEvent(actions) {
        this.actions = actions;
        // this._els.textEffectButton.addEventListener('click', this._setTextEffectHandler.bind(this));
        this._els.textRange.on('change', this._changeTextRangeHandler.bind(this));
        this._els.textColorpicker.on('change', this._changeColorHandler.bind(this));
    }

    /**
     * Returns the menu to its default state.
     */
    changeStandbyMode() {
        this.actions.stopDrawingMode();
    }

    /**
     * Executed when the menu starts.
     */
    changeStartMode() {
        this.actions.modeChange('text');
    }

    /**
     * Get text color
     * @returns {string} - text color
     */
    get textColor() {
        return this._els.textColorpicker.color;
    }

    /**
     * Get text size
     * @returns {string} - text size
     */
    get fontSize() {
        return this.value;
        // return this._els.textRange.value;
    }

    /**
     * Set text size
     * @param {Number} value - text size
     */
    set fontSize(value) {
        this.value = value;
        // this._els.textRange.value = value;
    }

    /**
     * text effect set handler
     * @param {object} event - add button event object
     * @private
     */
    _setTextEffectHandler(event) {
        const button = event.target.closest('.tui-image-editor-button');
        const [styleType] = button.className.match(/(bold|italic)/);
        const styleObj = {
            'bold': { fontWeight: 'bold' },
            'italic': { fontStyle: 'italic' }
        }[styleType];

        this.effect[styleType] = !this.effect[styleType];
        button.classList.toggle('active');
        this.actions.changeTextStyle(styleObj);
    }

    /**
     * text align set handler
     * @param {number} value - range value
     * @private
     */
    _changeTextRangeHandler(value) {
        const changeValue = toInteger(value) + 4;
        if (this.value !== changeValue) {
            this.value = changeValue;
            this.actions.changeTextStyle({
                fontSize: this.value
            });
        }
    }

    /**
     * change color handler
     * @param {string} color - change color string
     * @private
     */
    _changeColorHandler(color) {
        color = color || 'transparent';
        this.actions.changeTextStyle({
            'fill': color
        });
    }
}

export default Text;
