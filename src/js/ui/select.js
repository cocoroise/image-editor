import Submenu from './submenuBase';
import templateHtml from './template/submenu/select';
/**
 * Select ui class
 * 主要是用来拖动画板
 * @class
 * @ignore
 */
class Select extends Submenu {
    constructor(subMenuElement, { locale, iconStyle, menuBarPosition, usageStatistics, showSubmenu }) {
        super(subMenuElement, {
            locale,
            name: 'select',
            iconStyle,
            menuBarPosition,
            templateHtml,
            usageStatistics,
            showSubmenu
        });
        this._btnValue = true;
        this._isLocked = false;

        this.actions = null;

        this._els = {
            lockButton: document.getElementsByClassName('tui-image-editor-button')[0],
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
        // this._els.lockButton.addEventListener('click', this.lockSelectEvent.bind(this));
        // this._els.selectButton.addEventListener('click', this.selectCanvas.bind(this));
    }

    lockSelectEvent() {
        this._isLocked = !this._isLocked;
        this.actions.setLockValue(this._isLocked);
    }

    // 点击menu的时候执行
    changeStartMode() {
        this._btnValue = true;
        this.actions.setDrag(this._btnValue);
    }

    // 回初始状态的时候执行
    changeStandbyMode() {
        this._btnValue = false;
        this.actions.setDrag(this._btnValue);
    }
}

export default Select;
