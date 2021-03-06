'use strict';

let objectAssign = require('object-assign');

/* global InfoBubble:true */
class InfoBoxPlugin {
    constructor(options) {
        let infoBox = new InfoBubble(objectAssign({}, options, {content: ''}));

        this._content = options.content;
        this.box = infoBox;

        if (options.onDomReady) {
            google.maps.event.addListener(this.box, 'domready', options.onDomReady);
        }
    }

    build(data) {
        if (typeof this._content === 'string') {
            return this._content;
        }

        if (typeof this._content === 'function') {
            return this._content(data);
        }

        console.error('Info Box content must be a string or a function that return a string');
    }

    open(data, ...args) {
        this.box.setContent(this.build(data));
        this.box.open(...args);
    }
}

module.exports = InfoBoxPlugin;
