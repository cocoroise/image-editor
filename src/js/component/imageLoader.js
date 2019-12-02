/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Image loader
 */
import Promise from 'core-js/library/es6/promise';
import Component from '../interface/component';
import consts from '../consts';

const {componentNames, rejectMessages} = consts;
const imageOption = {
    padding: 0,
    crossOrigin: 'Anonymous'
};

/**
 * ImageLoader components
 * @extends {Component}
 * @class ImageLoader
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
class ImageLoader extends Component {
    constructor(graphics) {
        super(componentNames.IMAGE_LOADER, graphics);
    }

    /**
     * Load image from url
     * @param {?string} imageName - File name
     * @param {?(fabric.Image|string)} img - fabric.Image instance or URL of an image
     * @returns {Promise}
     */
    load(imageName, img) {
        let promise;

        if (!imageName && !img) { // Back to the initial state, not error.
            const canvas = this.getCanvas();

            canvas.backgroundImage = null;
            canvas.renderAll();

            promise = new Promise(resolve => {
                this.setCanvasImage('', null);
                resolve();
            });
        } else {
            promise = this._setBackgroundImage(img).then(oImage => {
                this.setCanvasImage(imageName, oImage);
                this.adjustCanvasDimension();

                return oImage;
            });
        }

        return promise;
    }

    /**
     * Set background image
     * @param {?(fabric.Image|String)} img fabric.Image instance or URL of an image to set background to
     * @returns {Promise}
     * @private
     */
    _setBackgroundImage(img) {
        if (!img) {
            return Promise.reject(rejectMessages.loadImage);
        }
        // img = this.compressImage(img);

        return new Promise((resolve, reject) => {
            const canvas = this.getCanvas();
            canvas.setBackgroundImage(img, () => {
                const oImage = canvas.backgroundImage;

                if (oImage && oImage.getElement()) {
                    resolve(oImage);
                } else {
                    reject(rejectMessages.loadingImageFailed);
                }
            }, imageOption);
        });
    }

    compressImage(img) {
        const reader = new FileReader();
        reader.onload = event => {
            const image = new Image();
            const opts = {};
            image.onload = () => {
                const imgInstance = new fabric.Image(image, opts);
                if (imgInstance.getWidth() > this.graphics._canvas.getWidth()) {
                    imgInstance.scaleToWidth(this.graphics._canvas.getWidth());
                }
                if (imgInstance.getHeight() > this.graphics._canvas.getHeight()) {
                    imgInstance.scaleToHeight(this.graphics._canvas.getHeight());
                }
                this.graphics._canvas.add(imgInstance);
                this.graphics._canvas.renderAll();
                img = null;

                const photoObjIx = 0;
                const originalPhotoObject = this.graphics._canvas.getObjects()[photoObjIx];
                const nImg = new Image();
                nImg.onload = () => {
                    const imgNInstance = new fabric.Image(nImg, {selectable: false});
                    // 移除刚刚的图片
                    this.graphics._canvas.remove(originalPhotoObject);

                    return imgNInstance;
                    // this.graphics._canvs.add(imgNInstance);
                    // this.graphics._canvas.renderAll();
                    // nImg = null;
                };
                nImg.src = originalPhotoObject.toDataURL();
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(img);
    }
}

module.exports = ImageLoader;
