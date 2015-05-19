/**
 * Usage: clear(element(by.model('my.model')));
 */

var _ = require('lodash');

module.exports = {
    clear: function (element) {
        return element.getAttribute('value').then(function (text) {
            var backspaceSeries = '',
                textLength = text.length;

            _.times(textLength, function () {
                backspaceSeries += protractor.Key.BACK_SPACE;
            });

            return element.sendKeys(backspaceSeries);
        });
    }
};