/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({locale, iconStyle: {normal, active}}) => (`
            <ui class="tui-image-editor-submenu-item">
                <li id="tie-btn-select">
                    
                </li>
            </ui>
`);
/**
 * <div class="tui-image-editor-button">
                    <div>
                        <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-rotate-counterclockwise"
                        class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-rotate-counterclockwise"
                        class="active"/>
                        </svg>
                    </div>
                        <label> 锁定 </label>
                    </div>
 */
