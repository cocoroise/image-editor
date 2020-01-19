/**
 * 高思前端打点工具
 * @version 1.0   | 2018-12-29 | RongZhiqiang            // 初始版本。
 * @version 1.0.1 | 2019-02-20 | RongZhiqiang            // 1.添加打点类型字段:evt {imp：展示 | clk：点击 | chg：文本改变(预留)}。
 *                                                       // 2.修改原本只对body标签自动触发pv/uv打点逻辑, 现添加对所有包含GS-LOG-AUTO类名元素的自动打点策略, 依赖setActionConf设置自动打点配置, 通过配置文件中的evt字段区分打点方式。
 * @version 1.0.2 | 2019-08-23 | RongZhiqiang            // 1.添加点击事件自动打点方法, 添加对所有包含GS-LOG-AUTO类名元素的自动打点策略, 依赖setActionConf设置自动打点配置, 通过配置文件中的evt字段区分打点方式, 支持当前访问仅统计一次(添加gs-evt-once='1'属性)。
 *                                                       // 2.添加setActionConf方法支持从配置表导入打点数据信息。
 *                                                       // 3.添加sendLogById方法支持从配置表导入打点数据信息, 并进行声明式打点。
 *                                                       // 4.添加测试日志展示弹层(临时)。
 *                                                       // 5.setCommonData替换为setNativeData, 以免发生歧义。
 * @version 1.0.3 | 2019-09-12 | XinCui                  // 1.重构为class模式，避免this指向不清的问题
 *                                                       // 2.修复设置为imp时点击也会触发打点的问题
 *                                                       // 3.修复只有在刷新的时候能触发imp事件的bug，只在basicLayout里做了处理
 *                                                       // 4.修复拦截冒泡的问题
 * @author RongZhiqiang | rongzhiqiang@gaosiedu.com
 * @method sendLog(data)                                 // 方法：自定义打点(参阅下文详述)。
 *   @param data {Object}                                // 参数：自定义参数集合(必选)。
 *   data: {
 *    pd {String}                                        // 参数：项目ID(必选)。
 *    pad {String}                                       // 参数：页面ID(必选)。
 *    aad {String}                                       // 参数：标签ID(可选, 默认为空), 曝光展示打点/用户行为触发打点(可选，默认曝光展示打点)。
 *    evt {String}                                       // 参数：打点类型(可选), 触发打点类型, evt {imp：展示 | clk：点击 | chg：文本改变(预留)}。
 *    app_ver {String}                                   // 参数：业务版本号(建议填写/AMC平台必选)。
 *    ...
 *    pp1 {Object}                                       // 参数：自定义扩展字段, 在业务调用打点是自定义添加并统一整合到pp1字段当中。
 *   }
 *   @return No                                          // 返回：无。
 *
 * @method setNativeData(list)                           // 方法：动态扩展从NA获取公共参数方法。
 *   @param list {Array}                                 // 参数：从WebView的UA中获取的公共参数名称数组。
 *   @return No                                          // 返回：无。
 *
 * @method setActionConf(config)                         // 方法：设置自动打点数据配置方法。
 *   @param config {Object}                              // 参数：必选, 全局自动打点配置文件(JSON)。
 *   @return No                                          // 返回：无。
 *
 * @method sendLogById(id,args)                          // 方法：设置自动打点数据配置方法。
 *   @param id {String}                                  // 参数：必选, 配置文件中的数据ID。
 *   @param args {Object}                                // 参数：可选, 可选参数集合, 同setActionConf中的参数规范。
 *   @return No                                          // 返回：无。
 *
 * @description
 *  基础公共参数:
 *  APIVersion: '0.6.0', SDK版本号标识。
 *  u2: 动态生成唯一标识, 如存在则直接从localStorage中获取, 不存在则随机生成并写入localStorage, 手动清除后失效。
 *  pd: 项目ID, 通过BI后台功能手动生成。
 *  pad: 页面ID, 通过BI后台功能手动生成。
 *  aad: 标签ID, 通过BI后台功能手动生成(可选, 用户行为触发类型打点时使用)。
 *  evt: 打点触发类型, evt: {imp：展示 | clk：点击 | chg：文本改变(预留)}。
 *  rpad: 页面来源, 可能为空, 同一个session期间使用首次访问的pad作为来源, 兼容历史线上业务。
 *  r_url: document.referrer, 可能为空。
 *  url: 当前页面链接。
 *  brand: 匹配userAgent中的设备厂商类型。
 *  model: 匹配userAgent中的设备型号版本。
 *  browser: 匹配userAgent中的浏览器信息。
 *  et: 打点发生时的毫秒时间戳。
 *  w: screen宽度。
 *  h: screen高度。
 *
 *
 *  可选参数:
 *  app_ver: 业务版本号(建议填写/AMC平台必选)。
 *  uid: 用户ID。
 *  role: 用户角色。
 *  da_src: 曝光位置。
 *  lang: 语言。
 *  lng: 经度。
 *  lat: 纬度。
 *  net_type: 网络类型。
 *  pp1: 自定义扩展属性集合
 *
 *
 *  @区分业务单元及运行环境需要各业务单元在构建项目时注入全局变量
 *  API_ENV: 构建环境标识(必须, 默认production为生产环境, 其他为dev/test环境,每个项目不同，请自行更改)
 *  __GROUP__: 业务单元标识(必须, 既阿里云日志服务hostname前缀中的业务单元标识, eg:http://axx-logs.cn-beijing.log.aliyuncs.com/..  __GROUP__:axx)
 *
 *  @Native基础公共参数:
 *  需要NA配合把公共参数写入webview的userAgent中, 命名以GSEDU_为通用前缀。eg: ... GSEDU_group/aixuexi GSEDU_vcname/1.0.0 ...
 *  group: 产品线标识, 由业务方定义标识信息, NA端写入UA。
 *  cuid: 设备唯一标识码, 作为用户UV统计标准，由NA从系统获取或根据相应规则生成。
 *  vccode: 版本号, eg: 100。
 *  vcname: 版本名称, eg: 1.0.0。
 *  可以通过setNativeData方法进行扩展。
 *
 * @example
 *  import Logger from '../../assets/lib/gsSendLog';
 *  sendLog方法
 *  Logger.sendLog({pd: {String}, pad: {String}, aad: {String}, evt:{String}, pp1:{Object}, uid:{String}, ...});
 *
 *  sendLogById方法
 *  Logger.sendLogById(id, {uid: uid, app_ver: '1.0.2'}, ...);
 *
 *  setNativeData方法
 *  Logger.setNativeData(['key1', 'key2', ...]);
 *
 *  setActionConf方法
 *  Logger.setActionConf(config);
 *
 *  配置规则:
 *  config: {
 *    @id: { pd:{String}|必选, pad:{String}|必选, evt:{String}|必选, aad:{String}|点击事件必选, pp1:{Object}},
 *    ...
 *  }
 *
 *  @页面自动打点
 *  通过setActionConf设置自动打点配置后, 对全局元素中包含GS-LOG-AUTO类名的元素进行过滤筛选, 匹配gs-log-key在配置文件中的数据作为自动打点参数, 通过evt属性区分展现/点击, 自动添加打点, 无需额外声明调用;
 *  如在业务场景中需要uid字段, 则可以通过在document.body属性中添加gs-log-uid属性, SDK自动获取其值作为参数合并到打点请求参数中;
 *  通过document全局代理点击事件, 添加对evt:clk的元素的touchstart事件进行绑定, 触发事件时进行打点;
 *  通过添加gs-evt-once='1'属性实现点击事件当次会话访问只触发一次打点的策略;
 *  自定义扩展字段统一收敛到pp1字段中。
 *
 *  @黑科技(临时)
 *  通过识别打包构建注入的全局变量window.API_ENV !== 'production'时(测试/开发环境), 在窗口的左下角连点5次触发当前页面本次所有打点的汇总列表, 解决一期QA打点数据筛查需求, 务必注意window.API_ENV注入;
 * */

const loggerConfig = {
    pd: 'aotw',
    AXXZXJS_10: {
        pad: 'AXXZXJS_10',
        evt: 'imp'
    },
};
window.__GROUP__ = 'axx';
window.API_ENV = 'production';

const ua = navigator.userAgent;
const { location: _location } = window;
const _prefix = 'GSEDU_';
const _prefixReg = new RegExp(_prefix, 'i');
const isHybrid = _prefixReg.test(ua);
const _localStorage = window.localStorage;
const _sessionStorage = window.sessionStorage;
const UID = document.body.getAttribute('gs-log-uid') || '';
const history = [];
class Logger {
    constructor() {
        this.NativeData = {};
        this.ActionConf = loggerConfig;
    }

    getCommonData = data => {
        const defaultData = {
            APIVersion: '0.6.0',
            u2: this.getUUID(),
            r_url: document.referrer
                ? window.encodeURIComponent
                    ? encodeURIComponent(document.referrer)
                    : document.referrer
                : '',
            url: window.encodeURIComponent
                ? encodeURIComponent(_location.origin + _location.pathname)
                : _location.origin + _location.pathname,
            brand: this.getBrowserInfo().os().brand,
            model: this.getBrowserInfo().os().model,
            browser: this.getBrowserInfo().browserType(),
            et: new Date().getTime(),
            w: screen.width || 0,
            h: screen.height || 0
        };
        if (isHybrid) {
            this.NativeData.group = this.getAppKeys('group');
            this.NativeData.vccode = this.getAppKeys('vccode');
            this.NativeData.vcname = this.getAppKeys('vcname');
            this.getAppKeys('cuid') && (this.NativeData.u2 = this.getAppKeys('cuid')); // 端内采用cuid作为标识
        }
        const _aad = data.aad || '';
        const _app_ver = data.app_ver ? data.app_ver : '1.0.0';
        const _evt = data.evt ? data.evt : !_aad ? 'imp' : 'clk';
        const _rpad = _sessionStorage ? _sessionStorage.getItem('md_referrer') : '';
        data.pp1 = data.pp1 !== undefined ? Object.assign(data.pp1, this.NativeData) : this.NativeData;
        return Object.assign(
            defaultData,
            data,
            { rpad: _rpad },
            { evt: _evt },
            { app_ver: _app_ver },
            { uid: UID },
        );
    };

    getUUID = () => {
        if (!_localStorage) {
            return this.md_uuid();
        }
        let UUID = _localStorage.getItem('md_u2');
        !UUID && (UUID = this.md_uuid()) && _localStorage.setItem('md_u2', UUID);
        return UUID;
    };

    md_uuid = () => {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
    };

    getBrowserInfo = () => ({
        chrome() {
            return /\b(?:Chrome|CriOS)\/(\d+)/i.test(ua) ? +RegExp.$1 : undefined;
        },
        firefox() {
            return /\bFirefox\/(\d+)/i.test(ua) ? +RegExp.$1 : undefined;
        },
        ie() {
            return /\b(?:MSIE |rv:|Edge\/)(\d+)/i.test(ua) && !this.firefox()
                ? document.documentMode || +RegExp.$1
                : undefined; // Firefox 某些版本的 ua 中含有和 IE 11 一样的 'rv:' 字段。
        },
        edge() {
            return /\bEdge\/(\d+)/i.test(ua) ? document.documentMode || +RegExp.$1 : undefined;
        },
        safari() {
            return /\bSafari\/?(\d+)?/i.test(ua) && !/chrome/i.test(ua)
                ? +(RegExp.$1 || RegExp.$2)
                : undefined;
        },
        isGecko() {
            return /gecko/i.test(ua) && !/like gecko/i.test(ua);
        },
        isWebkit() {
            return /webkit/i.test(ua);
        },
        os() {
            let brand = 'other';
            let model = 'other';
            if (/\bMac/i.test(ua)) {
                if (/iPhone/i.test(ua)) {
                    brand = 'iphone';
                    model = /iPhone OS (\d+(?:_\d+)?)/i.test(ua) ? RegExp.$1.replace('_', '.') : 'unknown';
                } else if (/iPad/i.test(ua)) {
                    brand = 'ipad';
                    model = /iPad.*OS (\d+(?:_\d+)?)/i.test(ua) ? RegExp.$1.replace('_', '.') : 'unknown';
                } else {
                    brand = 'mac';
                    model = /Mac OS X (\d+(?:_\d+)?)/i.test(ua) ? RegExp.$1.replace('_', '.') : 'unknown';
                }
            } else if (/Android/i.test(ua)) {
                brand = 'android';
                model = /Android (\d+(?:\.\d+)?)/i.test(ua) ? RegExp.$1 : 'unknown';
            } else if (/\bWindows/i.test(ua)) {
                brand = 'windows';
                model = `${/Windows NT (\d+)/i.test(ua) ? RegExp.$1 : 'unknown'}_${
                    /win64|x64|wow64/i.test(ua) ? '64' : '32'
                    }bit`;
            }

            return { brand, model };
        },
        browserType() {
            let browser = 'other';

            if (this.edge()) {
                browser = `edge_${this.edge()}`;
            } else if (this.ie()) {
                browser = `ie_${this.ie()}`;
            } else if (this.chrome()) {
                browser = `chrome_${this.chrome()}`;
            } else if (this.safari()) {
                browser = `safari_${this.safari()}`;
            } else if (this.firefox()) {
                browser = `firefox_${this.firefox()}`;
            }

            browser = ua.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)
                || ua.match(/MicroMessenger\/((\d+)\.(\d+))/)
                ? `${browser} isWeChat`
                : browser;
            return browser;
        }
    });

    getAppKeys = key => {
        if (key && _prefixReg.test(ua)) {
            const _reg = new RegExp(`${key}/([^\\s]*)`);
            const _val = _reg.exec(ua) || null;
            return _val && _val[1] ? decodeURIComponent(_val[1]) : null;
        }
        return null;
    };

    createQueryString = (params, encode = true) => {
        if (params && typeof params === 'object') {
            const _query = Object.keys(params)
                .map(k => {
                    if (typeof params[k] === 'object') {
                        return `${encode ? encodeURIComponent(k) : k}=${
                            encode ? encodeURIComponent(JSON.stringify(params[k])) : JSON.stringify(params[k])
                            }`;
                    }
                    return `${encode ? encodeURIComponent(k) : k}=${
                        encode ? encodeURIComponent(params[k]) : params[k]
                        }`;
                })
                .join('&');
            return _query;
        }
        return '';
    };

    setNativeData = list => {
        if (list && list instanceof Array) {
            list.forEach(v => {
                this.getAppKeys(v) && (this.NativeData[v] = this.getAppKeys(v));
            });
        } else {
            throw new Error('Error:The argument must be an Array!');
        }
    };

    sendLogById = (id, ...args) => {
        if (!this.ActionConf || !id) {
            throw new Error('Error:Failed to get the configuration file!');
        }

        const _pd = this.ActionConf.pd;
        const _params = this.ActionConf.keys[id];
        if (!_pd && _params && !_params.pad) {
            throw new Error('Error:The parameters must contain pd and pad!');
        }
        this.sendLog(Object.assign(...args, _params, { pd: _pd }));
    };

    sendLog = (data = {}) => {
        console.log('sendlog', data)
        const _pd = data.pd || '';
        const _pad = data.pad || '';
        const _aad = data.aad || '';
        const _evt = data.evt ? data.evt : !_aad ? 'imp' : 'clk';
        if (!_pd || !_pad) {
            throw new Error('Error:The parameters must contain pd and pad!');
        }
        if (!window.API_ENV || !window.__GROUP__) {
            throw new Error('Error:Unknown the API_ENV or the __GROUP__ deploy!');
        }

        const _logData = this.getCommonData(data) || {};
        const _store = window.API_ENV === 'production'
            ? !_aad
                ? 'user-log'
                : 'user-log-action'
            : !_aad
                ? 'user-log-test'
                : 'user-log-action-test';
        const _queryString = _logData ? this.createQueryString(_logData) : '';
        new Image().src = `//${window.__GROUP__}-logs.cn-beijing.log.aliyuncs.com/logstores/${_store}/track.gif?${_queryString}`;
        _sessionStorage && _sessionStorage.setItem('md_referrer', _pad);

        // 临时测试弹层数据收集
        const historyData = { setting: _store, type: _evt, data: _logData };
        history.push(historyData);
    };

    autoEvtLog = e => {
        // e && e.stopPropagation();
        const CONF_PD = this.ActionConf.pd || '';
        const _target = e.target || e.srcElement;
        if (this.hasClass(_target, 'GS-LOG-AUTO')) {
            const _logid = _target.getAttribute('gs-log-key') || undefined;
            const _once = _target.getAttribute('gs-evt-once') || undefined;
            const _loged = this.hasClass(_target, 'isLoged') || undefined;
            // const _params = CONF_KEYS[_logid] || {};
            const _params = this.ActionConf[_logid] || {};

            if (!CONF_PD || !_params.pad || !_params.aad) {
                throw new Error('Error:The parameters must contain pd, pad and aad!');
            }

            try {
                if (_params.evt === 'clk' && !_loged) {
                    this.sendLog(Object.assign({ pd: CONF_PD }, _params));
                    +_once === 1 && this.addClass(_target, 'isLoged');
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    setActionConf = () => {
        if (!this.ActionConf) {
            throw new Error('Error:The ActionConfig can not be empty!');
        }
        const CONF_PD = this.ActionConf.pd || '';
        // 展现自动打点
        // const $item = [...document.body.querySelectorAll('.GS-LOG-AUTO')];
        const $item = [...document.body.getElementsByClassName('GS-LOG-AUTO')];
        const $DOM = document.body || document.documentElement;
        $item.length > 0
            && $item.forEach(dom => {
                const _logid = dom.getAttribute('gs-log-key');
                const _params = this.ActionConf[_logid] || {};
                if (!CONF_PD || !_params.pad) {
                    throw new Error('Error:The parameters must contain pd and pad!');
                }
                try {
                    _params.evt === 'imp' && this.sendLog(Object.assign({ pd: CONF_PD }, _params));
                    _params.evt === 'clk' && this.addEventListener($DOM, 'click', this.autoEvtLog);
                } catch (e) {
                    console.error(e.message);
                }
            });
    };

    // 点击自动打点, 通过document全局代理解决动态添加数据的事件触发
    addEventListener = (element, type, callback) => {
        if (element.addEventListener) {
            element.addEventListener(type, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent(`on${type}`, callback);
        } else {
            element[`on${type}`] = callback;
        }
    };

    hasClass = (elements, cName) => elements.className && !!elements.className.match(new RegExp(`(\\s|^)${cName}(\\s|$)`));

    addClass = (elements, cName) => {
        if (!this.hasClass(elements, cName)) {
            elements.className += ` ${cName}`;
        }
    };

    removeEventListener = callback => {
        const type = 'click';
        const $DOM = document.body || document.documentElement;
        if ($DOM.removeEventListener) {
            $DOM.removeEventListener(type, callback, false);
        } else if ($DOM.detachEvent) {
            $DOM.detachEvent(`on${type}`, callback);
        } else {
            $DOM[`on${type}`] = null;
        }
    };
}
const LoggerService = new Logger();

function logList() {
    let listHtml = '';
    history.forEach((obj, index) => {
        listHtml += `<li style="width: 100%;display:block;font-size:12px; border-bottom: 3px solid #fff; line-height: 2; padding: 10px;box-sizing: border-box;background-color: #f2f2f2">
                    <div style="border-bottom: 1px solid #ddd;margin-bottom: 5px; ">埋点路径: ${
            obj.setting
            }</div>
                    <div style="border-bottom: 1px solid #ddd;margin-bottom: 5px; ">埋点类型: ${
            obj.type
            }  ( imp:加载, clk:点击 )</div>
                    <div style="word-break: break-all">埋点数据: ${JSON.stringify(obj.data)}</div>
                  </li>`;
    });
    document.querySelector('#logList').innerHTML = listHtml;
}
function createTestWrap() {
    let count = 0;
    let timer;
    function testWrapShow() {
        if (count < 4) {
            !timer && clearTimeout(timer);
            count += 1;
            timer = setTimeout(() => {
                count = 0;
            }, 1000);
        } else {
            count = 0;
            clearTimeout(timer);
            logList();
            document.getElementById('testLogCloseBtn').style.display = 'block';
            document.getElementById('testLogWrap').style.display = 'block';
        }
    }

    function testWrapHide() {
        document.getElementById('testLogCloseBtn').style.display = 'none';
        document.getElementById('testLogWrap').style.display = 'none';
    }

    const $testShowBtn = document.createElement('div');
    const $testCloseBtn = document.createElement('div');
    const $testWrap = document.createElement('div');
    $testShowBtn.id = 'testLogShowBtn';
    $testShowBtn.onclick = testWrapShow;
    $testShowBtn.style.cssText = 'width: 100px;height: 100px;background: transparent;position: fixed;left: 0;bottom: 0;z-index: 997;';

    $testCloseBtn.id = 'testLogCloseBtn';
    $testCloseBtn.onclick = testWrapHide;
    $testCloseBtn.innerText = '关闭';
    $testCloseBtn.style.cssText = 'display: none; width: 100%; height: 40px; line-height: 40px; font-size: 20px; text-align: center; background-color: rgb(229, 229, 229); position: fixed; top: 0px; left: 0px;z-index:999';

    $testWrap.id = 'testLogWrap';
    $testWrap.style.cssText = 'display: none; width: 100%; height: 100%; background: rgb(255, 255, 255); position: fixed; left: 0px; top: 0px; z-index: 998; overflow-y: scroll;';
    $testWrap.innerHTML = '<ul id="logList" style="width: 100%; padding-top: 40px;"></ul>';

    document.documentElement.appendChild($testWrap);
    document.documentElement.appendChild($testCloseBtn);
    document.documentElement.appendChild($testShowBtn);
}
window.API_ENV !== 'production' && createTestWrap();

