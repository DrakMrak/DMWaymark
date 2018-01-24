// ==UserScript==
// @name         Waymarking DM I
// @namespace    http://tampermonkey.net/
// @include      http*://*.waymarking.com/*
// @version      0.1.2
// @description  Some design changes in waymarking
// @author       DrakMrak
// @match        http://www.waymarking.com/
// @grant        none
// ==/UserScript==

//css
var sheets = document.styleSheets;
var sheet = document.styleSheets[0];
//add rule
addCSSRule(sheet, '.wmd_reg_myvisit', 'background-color: #5eaf5a !important;');
addCSSRule(sheet, '.wmd_alt_myvisit', 'background-color: #8dcf8a !important;');
addCSSRule(sheet, '.wmd_reg_myown', 'background-color: #bf85dd !important;');
addCSSRule(sheet, '.wmd_alt_myown', 'background-color: #dbb2f0 !important;');
addGlobalStyle('.wmd_namebold img {margin: 0px 4px 0px 0px;}');
addGlobalStyle('.wmd_cat {margin: -5px 0px 0px 32px;}');
addGlobalStyle('.wmd_left {padding: 5px 0px 4px 0px !important;}');
addGlobalStyle('.wmd_namebold {margin: -4px 0px 0px 2px !important;}');
addGlobalStyle('#wm_variables {background-color: #ffffaa !important;}');
addGlobalStyle('#wm_loginstructions {background-color: #a9bbe5 !important; margin: 0px !important;}');
//Vytáhnu si element a jeho strukturu
//-----------------------------------------------------------
//Get ownername
//-----------------------------------------------------------
var ownername = "";
if (document.getElementById('homepage_login')) {
    if (document.getElementById('ctl00_HomePageHeaderControl1_lnkUrlLogin').innerText == '[log out]') {
        ownername = document.getElementById('ctl00_HomePageHeaderControl1_lnkLoginName').innerText;
    }
}
else {
    if (document.getElementById('ctl00_HeaderControl1_lnkSignInUrl').innerText == '[log out]') {
        ownername = document.getElementById('ctl00_HeaderControl1_lnkLoginName').innerText;
    }
}
//console.log(ownername);
var pageName = window.location.pathname.split('/').slice(0, -1).join('');
//seznamy waymarků - vyhledané "wm"
if (pageName == 'wm') {
    console.log(pageName);
    var rowreg = document.getElementsByClassName('wmd_reg');
    for (var i = 0; i < rowreg.length; i++) {
        var visited = rowreg[i].querySelectorAll('.wmd_visited');
        if (visited.length > 0) {
            rowreg[i].className += ' wmd_reg_myvisit';
        }
        var visitedx = rowreg[i].getElementsByClassName('wmd_submitter');
        //console.log(visitedx[0].innerText);
        if (visitedx[0].innerText.indexOf(ownername) !== -1) {
            rowreg[i].className += ' wmd_reg_myown';
        }
    }
    var rowalt = document.getElementsByClassName('wmd_alt');
    //console.log(rowalt);
    for (var j = 0; j < rowalt.length; j++) {
        var visitedx = rowalt[j].querySelectorAll('.wmd_visited');
        if (visitedx.length > 0) {
            rowalt[j].className += ' wmd_alt_myvisit';
        }
        var visitedy = rowalt[j].getElementsByClassName('wmd_submitter');
        //console.log(visitedx[0].innerText);
        if (visitedy[0].innerText.indexOf(ownername) !== -1) {
            rowalt[j].className += ' wmd_alt_myown';
        }
    }
}
//okno jednoho konkrétního waymarku "waymarks"
if (pageName == 'waymarks') {
    console.log(pageName);
    if (document.getElementById('wm_variables') != null) {
        var varElement = document.getElementById('wm_variables');
        var x = varElement.getElementsByTagName('img');
        console.log(x.length);
        if (x !== null) {
            for (var k = 0; k < x.length; k++) {
                x[k].height = '0';
            }
        }
    }
}
//css add rule
function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}
//function for change style
//-----------------------------------------------------------
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function() {
    'use strict';

    // Your code here...
})();