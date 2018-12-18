/*jshint esversion: 6 */
window.addEventListener ('DOMContentLoaded', () => {
    'use strict';
    let calc = require('../js/calc.js'),
        form = require('../js/form.js'),
        modal = require('../js/modal.js'),
        images = require('../js/images.js'),
        tabfurnish = require('../js/tabfurnish.js'),
        tabglazing = require('../js/tabglazing.js'),
        timer = require('../js/timer.js');

        calc();
        form();
        modal();
        images();
        tabfurnish();
        tabglazing();
        timer();
});