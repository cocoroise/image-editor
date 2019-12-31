/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({ locale, iconStyle: { normal, active } }) => (`
    <ul class="tui-image-editor-submenu-item">
        <li id="tie-text-effect-button">
            <div class="tui-image-editor-button bold">
                <div>
                    <svg class="svg_ic-submenu">
                    <use xlink:href="${active.path}#${active.name}-ic-text-bold" class="normal"/>
                    <use xlink:href="${normal.path}#${active.name}-ic-text-bold" class="normal"/>
                    </svg>
                </div>
                <span> 加粗 </span>
            </div>
            <div class="tui-image-editor-button italic">
                <div>
                    <svg class="svg_ic-submenu">
                    <use xlink:href="${active.path}#${active.name}-ic-text-italic" class="normal"/>
                    <use xlink:href="${active.path}#${active.name}-ic-text-italic" class="normal"/>
                    </svg>
                </div>
                <span> 斜体 </span>
            </div>
           
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li>
            <div id="tie-text-color" title="颜色"></div>
        </li>
        <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li class="tui-image-editor-newline">
            <div id="tie-text-range"></div>
        </li>
    </ul>
`);
