/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({ locale, iconStyle: { normal, active } }) => (`
    <ul class="tui-image-editor-submenu-item">
        <li class="tui-image-editor-newline">
            <div id="tie-text-range"></div>
        </li>
        <li class="tui-image-editor-partition ">
            <div></div>
        </li>
        <li>
            <div id="tie-text-color" title="颜色"></div>
        </li>
        <div class="tui-image-editor-whiteSpace">
        </div>
    </ul>
`);
