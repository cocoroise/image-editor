import snippet from 'tui-code-snippet';

class PenRange {
    constructor(rangeElement, index = 2) {
        this._value = 16;
        this._selectedIndex = index;
        if (rangeElement) {
            this.rangeElement = rangeElement;
            this._drawRangeElement();
            this._addClickEvent();
            this._changeSizeStyle(index);
            this.trigger('change');
        }
    }

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
    }

    _addClickEvent() {
        this.rangeElement.addEventListener('click', event => {
            event.stopPropagation();
            const { target } = event;
            const { dataset: { value: selectIndex = 2 } } = target;
            this._selectedIndex = selectIndex;
            this._changeSizeStyle(selectIndex);
            const sizeValue = selectIndex * 4 + 4;
            this.fire('change', sizeValue, false);
        });
    }

    _changeSizeStyle(selectIndex) {
        const listRefs = this.rangeElement.childNodes;
        for (const i of listRefs) {
            i.classList.remove('tui-image-editor-penRange-outter-box_active');
        }
        listRefs[selectIndex].classList.add('tui-image-editor-penRange-outter-box_active');
    }

    _drawRangeElement() {
        this.rangeElement.classList.add('tui-image-editor-penRange');

        this.penContainer = document.createElement('div');
        this.penContainer.className = 'tui-image-editor-penRange-outter-box';

        this.subBox = document.createElement('div');
        this.subBox.className = 'tui-image-editor-penRange-box';

        this.penContainer.appendChild(this.subBox);
        // eslint-disable-next-line guard-for-in
        for (const i in Array.from(Array(6), (v, k) => k)) {
            // 直接append的话只能插入一个
            const v = this.penContainer.cloneNode(true);
            // 给圆圈和div同时赋予data属性
            v.setAttribute('data-value', i);
            v.childNodes[0].setAttribute('data-value', i);
            this.rangeElement.appendChild(v);
        }
    }

    trigger(type) {
        this.fire(type, this._value);
    }
}
snippet.CustomEvents.mixin(PenRange);
export default PenRange;
