export default ({locale, biImage, commonStyle, headerStyle, loadButtonStyle, downloadButtonStyle, submenuStyle}) => (`
    <div class="tui-image-editor-main-container" style="${commonStyle}">
        <div class="tui-image-editor-header" style="${headerStyle}">
            <div class="tui-image-editor-header-buttons">
                <div id="paper_list_btn" style="${loadButtonStyle}">作业列表</div>
                <div id="paper_list_pre" style="${downloadButtonStyle}">上一题</div>
                <div id="paper_list_next" style="${downloadButtonStyle}">下一题</div>
                 <div id="paper_reset" style="${loadButtonStyle}">
                    重新批改
                </div>
                <div style="${loadButtonStyle}">
                    上传
                    <input type="file" class="tui-image-editor-load-btn" />
                </div>
                <button class="tui-image-editor-download-btn" style="${downloadButtonStyle}">
                    保存
                </button>
            </div>
            <div class="tui-image-editor-header-papers">
                <div id="papaer_image_pre" class="tui-image-editor-header-papers-left">👈</div>
                <div class="tui-image-editor-header-papers-container"> 
                </div>
                <div id="papaer_image_next" class="tui-image-editor-header-papers-right">👉</div>
            </div>
        </div>
        <div class="tui-image-editor-main">
            <div class="tui-image-editor-submenu">
                <div class="tui-image-editor-submenu-style" style="${submenuStyle}"></div>
            </div>
            <div class="tui-image-editor-wrap">
                <div class="tui-image-editor-size-wrap">
                    <div class="tui-image-editor-align-wrap">
                        <div class="tui-image-editor"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`);
