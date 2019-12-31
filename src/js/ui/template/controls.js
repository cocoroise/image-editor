export default ({ locale, biImage, iconStyle: { normal, hover, disabled }, loadButtonStyle, downloadButtonStyle }) => (`
    <div class="tui-image-editor-controls">
        <ul class="tui-image-editor-menu">
            <li id="tie-btn-undo" class="tui-image-editor-item">
                <svg class="svg_ic-menu">
                    <use xlink:href="${normal.path}#${normal.name}-ic-undo" class="enabled"/>
                    <use xlink:href="${disabled.path}#${disabled.name}-ic-undo" class="normal"/>
                    <use xlink:href="${hover.path}#${hover.name}-ic-undo" class="hover"/>
                </svg>
            </li>
            <li id="tie-btn-redo" class="tui-image-editor-item">
                <svg class="svg_ic-menu">
                    <use xlink:href="${normal.path}#${normal.name}-ic-redo" class="enabled"/>
                    <use xlink:href="${disabled.path}#${disabled.name}-ic-redo" class="normal"/>
                    <use xlink:href="${hover.path}#${hover.name}-ic-redo" class="hover"/>
                </svg>
            </li>
            <li id="tie-btn-delete" class="tui-image-editor-item">
                <svg class="svg_ic-menu">
                    <use xlink:href="${normal.path}#${normal.name}-ic-delete" class="enabled"/>
                    <use xlink:href="${disabled.path}#${disabled.name}-ic-delete" class="normal"/>
                    <use xlink:href="${hover.path}#${hover.name}-ic-delete" class="hover"/>
                </svg>
            </li>
            <li class="tui-image-editor-partition">
                <div></div>
            </li>
        </li>
        </ul>
    </div>
`);
