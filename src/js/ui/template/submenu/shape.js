/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({ locale, iconStyle: { normal, active } }) => (`
    <ul class="tui-image-editor-submenu-item">
        <li id="tie-shape-button">
            <div class="tui-image-editor-button line">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-shape-line"
                            class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-shape-line"
                            class="active"/>
                    </svg>
                </div>
            </div>
            <div class="tui-image-editor-button arrow">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-shape-arrow"
                            class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-shape-arrow"
                            class="active"/>
                    </svg>
                </div>
            </div>
            <div class="tui-image-editor-button rect">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-shape-rectangle"
                            class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-shape-rectangle"
                            class="active"/>
                    </svg>
                </div>
            </div>
            <div class="tui-image-editor-button circle">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-shape-circle"
                            class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-shape-circle"
                            class="active"/>
                    </svg>
                </div>
            </div>
            <div class="tui-image-editor-button triangle">
                <div>
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-shape-triangle"
                            class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-shape-triangle"
                            class="active"/>
                    </svg>
                </div>
            </div>
        </li>
        <li class="tui-image-editor-partition">
            <div></div>
        </li>
        <li class="tui-image-editor-newline tui-image-editor-range-wrap">
            <div id="tie-stroke-range"></div>
        </li>
        <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li id="tie-shape-color-button">
            <div id="tie-color-stroke" title="颜色"></div>
        </li>
        
    </ul>
`);
