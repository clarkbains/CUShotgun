const express = require('express');
const router = express.Router();

function parseCookies (rc) {
    let list = {};

    rc && rc.split(';').forEach(function( cookie ) {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

// Main Page
router.get('/', (req, res) => {
    res.render('./layouts/index', {active: {Home: true}});
});

// Events Page
router.get('/events', (req, res) => {
    res.render('./layouts/events', {active: {Events: true}});
});

// FAQ Page
router.get('/faq', (req, res) => {
    res.render('./layouts/faq', {active: {Faq: true}});
});

// Contact Page
router.get('/contact', (req, res) => {
    let msg = parseCookies(req.headers.cookie).msg;
    if(msg === undefined) msg = '';
    let isGood = true;
    if (msg.includes('Uh oh')) isGood = false;

    res.render('./layouts/contact', {active: {Contact: true}, msg: msg, good: isGood});
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;
