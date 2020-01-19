import snippet from 'tui-code-snippet';
import tuiColorPicker from 'tui-color-picker';
const PICKER_COLOR = [
    '#D53331',
    '#EB3468',
    '#E56B2F',
    '#F6C246',
    '#BC2865',
    '#55318A',
    '#9E2387',
    '#1C4E86',
    '#63C9FA',
    '#439ED3',
    '#3A8944',
    '#7EC83D',
    '#000000',
    '#323333',
    '#869397',
    '#FFFEFF'
];

/**
 * Colorpicker control class
 * @class
 * @ignore
 */
class Colorpicker {
    constructor(colorpickerElement, defaultColor = '#d53331', toggleDirection = 'up', usageStatistics) {
        const title = colorpickerElement.getAttribute('title');
        this.usageStatistics = usageStatistics;

        this._show = false;

        this._colorpickerElement = colorpickerElement;
        this._toggleDirection = toggleDirection;
        this._makePickerLayerElement(colorpickerElement, title);
        this._color = defaultColor;
        this.picker = tuiColorPicker.create({
            container: this.pickerElement,
            preset: PICKER_COLOR,
            color: defaultColor,
            usageStatistics: this.usageStatistics
        });

        this._makePickerButtonElement(colorpickerElement, defaultColor);
        this._addEvent(colorpickerElement);
    }

    /**
     * Get color
     * @returns {Number} color value
     */
    get color() {
        return this._color;
    }

    /**
     * Set color
     * @param {string} color color value
     */
    set color(color) {
        this._color = color;
    }

    /**
     * Make picker button element
     * @param {HTMLElement} colorpickerElement color picker element
     * @param {string} defaultColor color value
     * @private
     */
    _makePickerButtonElement(colorpickerElement) {
        const ele = colorpickerElement.querySelectorAll('ul.tui-colorpicker-clearfix li');
        this._addActiveColorStyle(ele[0], this._color);
    }

    /**
     * Make picker layer element
     * @param {HTMLElement} colorpickerElement color picker element
     * @param {string} title picker title
     * @private
     */
    _makePickerLayerElement(colorpickerElement) {
        this.pickerControl = document.createElement('div');
        this.pickerControl.className = 'color-picker-control';

        this.pickerElement = document.createElement('div');
        this.pickerElement.className = 'color-picker';

        this.pickerControl.appendChild(this.pickerElement);

        colorpickerElement.appendChild(this.pickerControl);
    }

    /**
     * Add event
     * @param {HTMLElement} colorpickerElement color picker element
     * @private
     */
    _addEvent(colorpickerElement) {
        colorpickerElement.addEventListener('click', e => {
            const { target: { value } } = e;
            if (value) {
                const ele = colorpickerElement.querySelectorAll('ul.tui-colorpicker-clearfix li');
                for (const v of ele) {
                    v.style = '';
                }
                this._addActiveColorStyle(e.target.parentNode, value);
                this.fire('change', value);
                this._color = value;
                e.stopPropagation();
            }
        }, true);
    }

    _addActiveColorStyle(element, color) {
        element.style.border = `1px solid ${color}`;
        element.style.borderRadius = `50%`;
        element.style.margin = `-1px`;
    }
}

snippet.CustomEvents.mixin(Colorpicker);
export default Colorpicker;
