/**
 * @param {Locale} locale - Translate text
 * @param {Object} normal - iconStyle
 * @param {Object} active - iconStyle
 * @returns {string}
 */
export default ({ locale, iconStyle: { normal, active } }) => (`
    <ul class="tui-image-editor-submenu-item">
        <li>
            <div class="tui-image-editor-button tui-image-editor-maskContainer">
                <div class="tui-image-editor-mask-box">
                    <input type="file" accept="image/*" id="tie-mask-image-file">
                    <svg class="svg_ic-submenu">
                        <use xlink:href="${normal.path}#${normal.name}-ic-mask-load" class="normal"/>
                        <use xlink:href="${active.path}#${active.name}-ic-mask-load" class="active"/>
                    </svg>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-1.png" data-type="1" alt="表情1"/>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-2.png" data-type="2" alt="表情2"/>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-3.png" data-type="3" alt="表情3"/>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-4.png" data-type="4" alt="表情4"/>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-5.png" data-type="5" alt="表情5"/>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-6.png" data-type="6" alt="表情6"/>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-7.png" data-type="7" alt="表情7"/>
                </div>
                <div class="tui-image-editor-mask-box" >
                    <img src="./src/js/ui/theme/img/icon-8.png" data-type="8" alt="表情8"/>
                </div>
            </div>
        </li>
    </ul>
`);
/**
 * <li class="tui-image-editor-partition only-left-right">
            <div></div>
        </li>
        <li id="tie-mask-apply" class="tui-image-editor-newline apply" style="margin-top: 22px;margin-bottom: 5px">
            <div class="tui-image-editor-button apply">
                <svg class="svg_ic-menu">
                    <use xlink:href="${normal.path}#${normal.name}-ic-apply" class="normal"/>
                    <use xlink:href="${active.path}#${active.name}-ic-apply" class="active"/>
                </svg>
                <label>
                    确认
                </label>
            </div>
        </li>
 */
