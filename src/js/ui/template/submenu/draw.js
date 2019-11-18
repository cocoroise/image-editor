/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({locale, iconStyle: {normal, active}}) => (`
    <ul class="tui-image-editor-submenu-item">
        <li id="tie-draw-line-select-button">
            <div class="tui-image-editor-button free">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-draw-free" class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-draw-free" class="active"/>
                    </svg>
                </div>
                <label>
                    笔
                </label>
            </div>
            <div class="tui-image-editor-button line">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-draw-line" class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-draw-line" class="active"/>
                    </svg>
                </div>
                <label>
                    直线
                </label>
            </div>
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li>
            <div id="tie-draw-color" title="颜色"></div>
        </li>
        <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <label class="range">粗细</label>
            <div id="tie-draw-range"></div>
            <input id="tie-draw-range-value" class="tui-image-editor-range-value" value="0" />
        </li>
    </ul>
`);
