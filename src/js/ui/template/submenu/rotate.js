/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({ locale, iconStyle: { normal, active } }) => (`
    <ul class="tui-image-editor-submenu-item">
        <li id="tie-retate-button">
            <div class="tui-image-editor-button clockwise">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-rotate-clockwise"
                            class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-rotate-clockwise"
                            class="active"/>
                    </svg>
                </div>
                <label> 90 </label>
            </div>
            <div class="tui-image-editor-button counterclockwise">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-rotate-counterclockwise"
                            class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-rotate-counterclockwise"
                            class="active"/>
                    </svg>
                </div>
                <label> -90 </label>
            </div>
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <label class="range">角度</label>
            <div id="tie-rotate-range"></div>
            <input id="tie-ratate-range-value" class="tui-image-editor-range-value" value="0" />
        </li>
    </ul>
`);
