import Submenu from './submenuBase';
import templateHtml from './template/submenu/select';
/**
 * Select ui class
 * 主要是用来拖动画板
 * @class
 * @ignore
 */
class Select extends Submenu {
    constructor(subMenuElement, {locale, iconStyle, menuBarPosition, usageStatistics}) {
        super(subMenuElement, {
            locale,
            name: 'select',
            iconStyle,
            menuBarPosition,
            templateHtml,
            usageStatistics
        });
        this.btnValue = false;
        this.actions = null;

        this._els = {
            selectButton: document.getElementById('tie-btn-select')
        };
    }

    /**
     * Add event for select
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.rotate - rotate action
     *   @param {Function} actions.setAngle - set angle action
     */
    addEvent(actions) {
        this.actions = actions;
        // this._els.selectButton.addEventListener('click', this.selectCanvas.bind(this));
    }

    // 点击menu的时候执行
    changeStartMode() {
        this.btnValue = true;
        this.actions.setDrag(this.btnValue);
    }

    // 回初始状态的时候执行
    changeStandbyMode() {
        this.btnValue = false;
        this.actions.setDrag(this.btnValue);
    }
}

export default Select;
