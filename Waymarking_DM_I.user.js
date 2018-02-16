// ==UserScript==
// @name         Waymarking DM I
// @namespace    http://tampermonkey.net/
// @include      http*://*.waymarking.com/*
// @version      0.1.6
// @description  Some design changes in waymarking
// @author       DrakMrak
// @match        http://www.waymarking.com/
// @grant        none
// ==/UserScript==

//css
var sheets = document.styleSheets;
var sheet = document.styleSheets[0];
//add rule
addCSSRule(sheet, '.wmd_reg_myvisit', 'background-color: #8dcf8a !important;');  //#5eaf5a Tmava zelena
addCSSRule(sheet, '.wmd_alt_myvisit', 'background-color: #b7e2b5 !important;');  //#8dcf8a Svetla zelena
addCSSRule(sheet, '.wmd_reg_myown', 'background-color: #dbb2f0 !important;');  //#bf85dd Tmava fialova
addCSSRule(sheet, '.wmd_alt_myown', 'background-color: #e9cef7 !important;');  //#dbb2f0 Svetla fialova
addCSSRule(sheet, '.p_logo', 'margin-top: 0.4em !important;');
addGlobalStyle('.wmd_namebold img {margin: 0px 4px 0px 0px;}');
addGlobalStyle('.wmd_cat {margin: -5px 0px 0px 32px;}');
addGlobalStyle('.wmd_left {padding: 5px 0px 4px 0px !important;}');
addGlobalStyle('.wmd_namebold {margin: -4px 0px 0px 2px !important;}');
addGlobalStyle('#wm_variables {background-color: #ffffaa !important;}');
addGlobalStyle('#wm_loginstructions {background-color: #a9bbe5 !important; margin: 0px !important;}');
addGlobalStyle('#title {padding: 0px 0px 1px !important;}');
addGlobalStyle('.filterpath {margin: 10px 0px 0px 0px !important;}');
addGlobalStyle('.boldheader-xs {background-color: #e3ddc2; font-weight: bold;}');

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
//jméno přepnuté stránky
var pageName = window.location.pathname.split('/').slice(0, -1).join('');
//zkoriguje úvodní logo waymarkingu
if (document.location.href.match(/\.com\/users\/profile\.aspx/)) {
    console.log(pageName);
    if (document.getElementById('ctl00_ContentBody_StatsPanel1_tblStats')) {
        var tbl = document.getElementById('ctl00_ContentBody_StatsPanel1_tblStats');
        var tr = tbl.getElementsByTagName('tr');
        //
        for(i=0; i<tr.length; i++){
            if(i%2==0) tr[i].style.backgroundColor = '#f1f1f1';
        }
    }
}
if (document.location.href.match(/\.com\/default\.aspx/) || (document.location.href == 'http://www.waymarking.com/')) {
    addGlobalStyle('.gutter {margin: 0px 5px 20px 15px !important;}');
    var logoDef = document.getElementsByClassName('FloatLeft');
    var z = logoDef[0].querySelector("p");
    z.className += 'p_logo';
}
//seznamy waymarků - vyhledané "wm" a "cat"
if (pageName == 'wm' || pageName == 'cat') {
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
		//Change LON character from W to E automatically - if you do not want to comment on the whole block W --> E
    //W --> E
    if (document.getElementById('ctl00_ContentBody_WaymarkEditControl1_lleCoordinates_ddlMinDecLonHeading')) {
        var lonElement = document.querySelectorAll('[id*=_ddlMinDecLonHeading]');
        console.log(lonElement);
        for (var jj = 0; jj < lonElement.length; jj++) {
            var optElement = lonElement[jj].getElementsByTagName('option');
            console.log(optElement);
            for (var j = 0; j < optElement.length; j++) {
                if (j==0) {optElement[j].setAttribute("selected", "selected");}
                if (j==1) {optElement[j].removeAttribute("selected");}
            }
        }
    }
    //W --> E
}
//okno jednoho konkrétního waymarku "waymarks"
if (pageName == 'waymarks' || (document.location.href.match(/\.com\/wm\/add_finalize\.aspx/))) {
    console.log(pageName);
    var postedBy = document.getElementById('wm_postedby');
    var ox = postedBy.getElementsByTagName('a');
    var ownerPostedBy = ox[1].innerText;
    if (document.getElementById('wm_variables') != null) {
        var varElement = document.getElementById('wm_variables');
        var x = varElement.getElementsByTagName('img');
        //console.log(x.length);
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