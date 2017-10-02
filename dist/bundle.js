/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


//Require SASS
__webpack_require__(4)

//Require CSS
__webpack_require__(7)

__webpack_require__(1)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

console.log('all scripts - bundled!!!');


var deneme = 10;


alert(deneme);

console.log('all scripts - bundled!!!' + deneme);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "body {\n  background-color: yellow !important; }\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/*\nTheme Name: Twenty Sixteen\nTheme URI: https://wordpress.org/themes/twentysixteen/\nAuthor: the WordPress team\nAuthor URI: https://wordpress.org/\nDescription: Twenty Sixteen is a modernized take on an ever-popular WordPress layout — the horizontal masthead with an optional right sidebar that works perfectly for blogs and websites. It has custom color options with beautiful default color schemes, a harmonious fluid grid using a mobile-first approach, and impeccable polish in every detail. Twenty Sixteen will make your WordPress look beautiful everywhere.\nVersion: 1.3\nLicense: GNU General Public License v2 or later\nLicense URI: http://www.gnu.org/licenses/gpl-2.0.html\nTags: one-column, two-columns, right-sidebar, accessibility-ready, custom-background, custom-colors, custom-header, custom-menu, editor-style, featured-images, flexible-header, microformats, post-formats, rtl-language-support, sticky-post, threaded-comments, translation-ready, blog\nText Domain: twentysixteen\n\nThis theme, like WordPress, is licensed under the GPL.\nUse it to make something cool, have fun, and share what you've learned with others.\n*/\n\n\n/**\n * Table of Contents\n *\n * 1.0 - Normalize\n * 2.0 - Genericons\n * 3.0 - Typography\n * 4.0 - Elements\n * 5.0 - Forms\n * 6.0 - Navigation\n *   6.1 - Links\n *   6.2 - Menus\n * 7.0 - Accessibility\n * 8.0 - Alignments\n * 9.0 - Clearings\n * 10.0 - Widgets\n * 11.0 - Content\n *    11.1 - Header\n *    11.2 - Posts and pages\n *    11.3 - Post Formats\n *    11.4 - Comments\n *    11.5 - Sidebar\n *    11.6 - Footer\n * 12.0 - Media\n *    12.1 - Captions\n *    12.2 - Galleries\n * 13.0 - Multisite\n * 14.0 - Media Queries\n *    14.1 - >= 710px\n *    14.2 - >= 783px\n *    14.3 - >= 910px\n *    14.4 - >= 985px\n *    14.5 - >= 1200px\n * 15.0 - Print\n */\n\n\n/**\n * 1.0 - Normalize\n *\n * Normalizing styles have been helped along thanks to the fine work of\n * Nicolas Gallagher and Jonathan Neal http://necolas.github.com/normalize.css/\n */\n\nhtml {\n\tfont-family: sans-serif;\n\t-webkit-text-size-adjust: 100%;\n\t-ms-text-size-adjust: 100%;\n}\n\nbody {\n\tmargin: 0;\n}\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n\tdisplay: block;\n}\n\naudio,\ncanvas,\nprogress,\nvideo {\n\tdisplay: inline-block;\n\tvertical-align: baseline;\n}\n\naudio:not([controls]) {\n\tdisplay: none;\n\theight: 0;\n}\n\n[hidden],\ntemplate {\n\tdisplay: none;\n}\n\na {\n\tbackground-color: transparent;\n}\n\nabbr[title] {\n\tborder-bottom: 1px dotted;\n}\n\nb,\nstrong {\n\tfont-weight: 700;\n}\n\nsmall {\n\tfont-size: 80%;\n}\n\nsub,\nsup {\n\tfont-size: 75%;\n\tline-height: 0;\n\tposition: relative;\n\tvertical-align: baseline;\n}\n\nsup {\n\ttop: -0.5em;\n}\n\nsub {\n\tbottom: -0.25em;\n}\n\nimg {\n\tborder: 0;\n}\n\nsvg:not(:root) {\n\toverflow: hidden;\n}\n\nfigure {\n\tmargin: 0;\n}\n\nhr {\n\t-webkit-box-sizing: content-box;\n\t-moz-box-sizing: content-box;\n\tbox-sizing: content-box;\n}\n\ncode,\nkbd,\npre,\nsamp {\n\tfont-size: 1em;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n\tcolor: inherit;\n\tfont: inherit;\n\tmargin: 0;\n}\n\nselect {\n\ttext-transform: none;\n}\n\nbutton {\n\toverflow: visible;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n\tmax-width: 100%;\n}\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n\t-webkit-appearance: button;\n\tcursor: pointer;\n}\n\nbutton[disabled],\nhtml input[disabled] {\n\tcursor: default;\n\topacity: .5;\n}\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n\tborder: 0;\n\tpadding: 0;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;\n\tbox-sizing: border-box;\n\tmargin-right: 0.4375em;\n\tpadding: 0;\n}\n\ninput[type=\"date\"]::-webkit-inner-spin-button,\ninput[type=\"date\"]::-webkit-outer-spin-button,\ninput[type=\"time\"]::-webkit-inner-spin-button,\ninput[type=\"time\"]::-webkit-outer-spin-button,\ninput[type=\"datetime-local\"]::-webkit-inner-spin-button,\ninput[type=\"datetime-local\"]::-webkit-outer-spin-button,\ninput[type=\"week\"]::-webkit-inner-spin-button,\ninput[type=\"week\"]::-webkit-outer-spin-button,\ninput[type=\"month\"]::-webkit-inner-spin-button,\ninput[type=\"month\"]::-webkit-outer-spin-button,\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n\theight: auto;\n}\n\ninput[type=\"search\"] {\n\t-webkit-appearance: textfield;\n}\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n\t-webkit-appearance: none;\n}\n\nfieldset {\n\tborder: 1px solid #d1d1d1;\n\tmargin: 0 0 1.75em;\n\tmin-width: inherit;\n\tpadding: 0.875em;\n}\n\nfieldset > :last-child {\n\tmargin-bottom: 0;\n}\n\nlegend {\n\tborder: 0;\n\tpadding: 0;\n}\n\ntextarea {\n\toverflow: auto;\n\tvertical-align: top;\n}\n\noptgroup {\n\tfont-weight: bold;\n}\n\n\n/**\n * 2.0 - Genericons\n */\n\n.menu-item-has-children a:after,\n.social-navigation a:before,\n.dropdown-toggle:after,\n.bypostauthor > article .fn:after,\n.comment-reply-title small a:before,\n.pagination .prev:before,\n.pagination .next:before,\n.pagination .nav-links:before,\n.pagination .nav-links:after,\n.search-submit:before {\n\t-moz-osx-font-smoothing: grayscale;\n\t-webkit-font-smoothing: antialiased;\n\tdisplay: inline-block;\n\tfont-family: \"Genericons\";\n\tfont-size: 16px;\n\tfont-style: normal;\n\tfont-variant: normal;\n\tfont-weight: normal;\n\tline-height: 1;\n\tspeak: none;\n\ttext-align: center;\n\ttext-decoration: inherit;\n\ttext-transform: none;\n\tvertical-align: top;\n}\n\n\n/**\n * 3.0 - Typography\n */\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n\tcolor: #1a1a1a;\n\tfont-family: Merriweather, Georgia, serif;\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\tline-height: 1.75;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\tclear: both;\n\tfont-weight: 700;\n\tmargin: 0;\n\ttext-rendering: optimizeLegibility;\n}\n\np {\n\tmargin: 0 0 1.75em;\n}\n\ndfn,\ncite,\nem,\ni {\n\tfont-style: italic;\n}\n\nblockquote {\n\tborder: 0 solid #1a1a1a;\n\tborder-left-width: 4px;\n\tcolor: #686868;\n\tfont-size: 19px;\n\tfont-size: 1.1875rem;\n\tfont-style: italic;\n\tline-height: 1.4736842105;\n\tmargin: 0 0 1.4736842105em;\n\toverflow: hidden;\n\tpadding: 0 0 0 1.263157895em;\n}\n\nblockquote,\nq {\n\tquotes: none;\n}\n\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n\tcontent: \"\";\n}\n\nblockquote p {\n\tmargin-bottom: 1.4736842105em;\n}\n\nblockquote cite,\nblockquote small {\n\tcolor: #1a1a1a;\n\tdisplay: block;\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\tline-height: 1.75;\n}\n\nblockquote cite:before,\nblockquote small:before {\n\tcontent: \"\\2014\\A0\";\n}\n\nblockquote em,\nblockquote i,\nblockquote cite {\n\tfont-style: normal;\n}\n\nblockquote strong,\nblockquote b {\n\tfont-weight: 400;\n}\n\nblockquote > :last-child {\n\tmargin-bottom: 0;\n}\n\naddress {\n\tfont-style: italic;\n\tmargin: 0 0 1.75em;\n}\n\ncode,\nkbd,\ntt,\nvar,\nsamp,\npre {\n\tfont-family: Inconsolata, monospace;\n}\n\npre {\n\tborder: 1px solid #d1d1d1;\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\tline-height: 1.3125;\n\tmargin: 0 0 1.75em;\n\tmax-width: 100%;\n\toverflow: auto;\n\tpadding: 1.75em;\n\twhite-space: pre;\n\twhite-space: pre-wrap;\n\tword-wrap: break-word;\n}\n\ncode {\n\tbackground-color: #d1d1d1;\n\tpadding: 0.125em 0.25em;\n}\n\nabbr,\nacronym {\n\tborder-bottom: 1px dotted #d1d1d1;\n\tcursor: help;\n}\n\nmark,\nins {\n\tbackground: #007acc;\n\tcolor: #fff;\n\tpadding: 0.125em 0.25em;\n\ttext-decoration: none;\n}\n\nbig {\n\tfont-size: 125%;\n}\n\n\n/**\n * 4.0 - Elements\n */\n\nhtml {\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;\n\tbox-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n\t/* Inherit box-sizing to make it easier to change the property for components that leverage other behavior; see http://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */\n\t-webkit-box-sizing: inherit;\n\t-moz-box-sizing: inherit;\n\tbox-sizing: inherit;\n}\n\nbody {\n\tbackground: #1a1a1a;\n\t/* Fallback for when there is no custom background color defined. */\n}\n\nhr {\n\tbackground-color: #d1d1d1;\n\tborder: 0;\n\theight: 1px;\n\tmargin: 0 0 1.75em;\n}\n\nul,\nol {\n\tmargin: 0 0 1.75em 1.25em;\n\tpadding: 0;\n}\n\nul {\n\tlist-style: disc;\n}\n\nol {\n\tlist-style: decimal;\n\tmargin-left: 1.5em;\n}\n\nli > ul,\nli > ol {\n\tmargin-bottom: 0;\n}\n\ndl {\n\tmargin: 0 0 1.75em;\n}\n\ndt {\n\tfont-weight: 700;\n}\n\ndd {\n\tmargin: 0 0 1.75em;\n}\n\nimg {\n\theight: auto;\n\t/* Make sure images are scaled correctly. */\n\tmax-width: 100%;\n\t/* Adhere to container width. */\n\tvertical-align: middle;\n}\n\ndel {\n\topacity: 0.8;\n}\n\ntable,\nth,\ntd {\n\tborder: 1px solid #d1d1d1;\n}\n\ntable {\n\tborder-collapse: separate;\n\tborder-spacing: 0;\n\tborder-width: 1px 0 0 1px;\n\tmargin: 0 0 1.75em;\n\ttable-layout: fixed;\n\t/* Prevents HTML tables from becoming too wide */\n\twidth: 100%;\n}\n\ncaption,\nth,\ntd {\n\tfont-weight: normal;\n\ttext-align: left;\n}\n\nth {\n\tborder-width: 0 1px 1px 0;\n\tfont-weight: 700;\n}\n\ntd {\n\tborder-width: 0 1px 1px 0;\n}\n\nth,\ntd {\n\tpadding: 0.4375em;\n}\n\n/* Placeholder text color -- selectors need to be separate to work. */\n::-webkit-input-placeholder {\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n}\n\n:-moz-placeholder {\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n}\n\n::-moz-placeholder {\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\topacity: 1;\n\t/* Since FF19 lowers the opacity of the placeholder by default */\n}\n\n:-ms-input-placeholder {\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n}\n\n\n/**\n * 5.0 - Forms\n */\n\ninput {\n\tline-height: normal;\n}\n\nbutton,\nbutton[disabled]:hover,\nbutton[disabled]:focus,\ninput[type=\"button\"],\ninput[type=\"button\"][disabled]:hover,\ninput[type=\"button\"][disabled]:focus,\ninput[type=\"reset\"],\ninput[type=\"reset\"][disabled]:hover,\ninput[type=\"reset\"][disabled]:focus,\ninput[type=\"submit\"],\ninput[type=\"submit\"][disabled]:hover,\ninput[type=\"submit\"][disabled]:focus {\n\tbackground: #1a1a1a;\n\tborder: 0;\n\tborder-radius: 2px;\n\tcolor: #fff;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-weight: 700;\n\tletter-spacing: 0.046875em;\n\tline-height: 1;\n\tpadding: 0.84375em 0.875em 0.78125em;\n\ttext-transform: uppercase;\n}\n\nbutton:hover,\nbutton:focus,\ninput[type=\"button\"]:hover,\ninput[type=\"button\"]:focus,\ninput[type=\"reset\"]:hover,\ninput[type=\"reset\"]:focus,\ninput[type=\"submit\"]:hover,\ninput[type=\"submit\"]:focus {\n\tbackground: #007acc;\n}\n\nbutton:focus,\ninput[type=\"button\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"submit\"]:focus {\n\toutline: thin dotted;\n\toutline-offset: -4px;\n}\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"week\"],\ninput[type=\"month\"],\ninput[type=\"text\"],\ninput[type=\"email\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"search\"],\ninput[type=\"tel\"],\ninput[type=\"number\"],\ntextarea {\n\tbackground: #f7f7f7;\n\tbackground-image: -webkit-linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));\n\tborder: 1px solid #d1d1d1;\n\tborder-radius: 2px;\n\tcolor: #686868;\n\tpadding: 0.625em 0.4375em;\n\twidth: 100%;\n}\n\ninput[type=\"date\"]:focus,\ninput[type=\"time\"]:focus,\ninput[type=\"datetime-local\"]:focus,\ninput[type=\"week\"]:focus,\ninput[type=\"month\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"email\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"number\"]:focus,\ntextarea:focus {\n\tbackground-color: #fff;\n\tborder-color: #007acc;\n\tcolor: #1a1a1a;\n\toutline: 0;\n}\n\n.post-password-form {\n\tmargin-bottom: 1.75em;\n}\n\n.post-password-form label {\n\tcolor: #686868;\n\tdisplay: block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tletter-spacing: 0.076923077em;\n\tline-height: 1.6153846154;\n\tmargin-bottom: 1.75em;\n\ttext-transform: uppercase;\n}\n\n.post-password-form input[type=\"password\"] {\n\tmargin-top: 0.4375em;\n}\n\n.post-password-form > :last-child {\n\tmargin-bottom: 0;\n}\n\n.search-form {\n\tposition: relative;\n}\n\ninput[type=\"search\"].search-field {\n\tborder-radius: 2px 0 0 2px;\n\twidth: -webkit-calc(100% - 42px);\n\twidth: calc(100% - 42px);\n}\n\n.search-submit:before {\n\tcontent: \"\\F400\";\n\tfont-size: 24px;\n\tleft: 2px;\n\tline-height: 42px;\n\tposition: relative;\n\twidth: 40px;\n}\n\n.search-submit {\n\tborder-radius: 0 2px 2px 0;\n\tbottom: 0;\n\toverflow: hidden;\n\tpadding: 0;\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\twidth: 42px;\n}\n\n\n/**\n * 6.0 - Navigation\n */\n\n/**\n * 6.1 - Links\n */\n\na {\n\tcolor: #007acc;\n\ttext-decoration: none;\n}\n\na:hover,\na:focus,\na:active {\n\tcolor: #686868;\n}\n\na:focus {\n\toutline: thin dotted;\n}\n\na:hover,\na:active {\n\toutline: 0;\n}\n\n.entry-content a,\n.entry-summary a,\n.taxonomy-description a,\n.logged-in-as a,\n.comment-content a,\n.pingback .comment-body > a,\n.textwidget a,\n.entry-footer a:hover,\n.site-info a:hover {\n\tbox-shadow: 0 1px 0 0 currentColor;\n}\n\n.entry-content a:hover,\n.entry-content a:focus,\n.entry-summary a:hover,\n.entry-summary a:focus,\n.taxonomy-description a:hover,\n.taxonomy-description a:focus,\n.logged-in-as a:hover,\n.logged-in-as a:focus,\n.comment-content a:hover,\n.comment-content a:focus,\n.pingback .comment-body > a:hover,\n.pingback .comment-body > a:focus,\n.textwidget a:hover,\n.textwidget a:focus {\n\tbox-shadow: none;\n}\n\n\n/**\n * 6.2 - Menus\n */\n\n.site-header-menu {\n\tdisplay: none;\n\t-webkit-flex: 0 1 100%;\n\t-ms-flex: 0 1 100%;\n\tflex: 0 1 100%;\n\tmargin: 0.875em 0;\n}\n\n.site-header-menu.toggled-on,\n.no-js .site-header-menu {\n\tdisplay: block;\n}\n\n.main-navigation {\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n}\n\n.site-footer .main-navigation {\n\tmargin-bottom: 1.75em;\n}\n\n.main-navigation ul {\n\tlist-style: none;\n\tmargin: 0;\n}\n\n.main-navigation li {\n\tborder-top: 1px solid #d1d1d1;\n\tposition: relative;\n}\n\n.main-navigation a {\n\tcolor: #1a1a1a;\n\tdisplay: block;\n\tline-height: 1.3125;\n\toutline-offset: -1px;\n\tpadding: 0.84375em 0;\n}\n\n.main-navigation a:hover,\n.main-navigation a:focus {\n\tcolor: #007acc;\n}\n\n.main-navigation .current-menu-item > a,\n.main-navigation .current-menu-ancestor > a {\n\tfont-weight: 700;\n}\n\n.main-navigation ul ul {\n\tdisplay: none;\n\tmargin-left: 0.875em;\n}\n\n.no-js .main-navigation ul ul {\n\tdisplay: block;\n}\n\n.main-navigation ul .toggled-on {\n\tdisplay: block;\n}\n\n.main-navigation .primary-menu {\n\tborder-bottom: 1px solid #d1d1d1;\n}\n\n.main-navigation .menu-item-has-children > a {\n\tmargin-right: 56px;\n}\n\n.dropdown-toggle {\n\tbackground-color: transparent;\n\tborder: 0;\n\tborder-radius: 0;\n\tcolor: #1a1a1a;\n\tcontent: \"\";\n\theight: 48px;\n\tpadding: 0;\n\tposition: absolute;\n\tright: 0;\n\ttext-transform: none;\n\ttop: 0;\n\twidth: 48px;\n}\n\n.dropdown-toggle:after {\n\tborder: 0 solid #d1d1d1;\n\tborder-left-width: 1px;\n\tcontent: \"\\F431\";\n\tfont-size: 24px;\n\tleft: 1px;\n\tposition: relative;\n\twidth: 48px;\n}\n\n.dropdown-toggle:hover,\n.dropdown-toggle:focus {\n\tbackground-color: transparent;\n\tcolor: #007acc;\n}\n\n.dropdown-toggle:focus {\n\toutline: thin dotted;\n\toutline-offset: -1px;\n}\n\n.dropdown-toggle:focus:after {\n\tborder-color: transparent;\n}\n\n.dropdown-toggle.toggled-on:after {\n\tcontent: \"\\F432\";\n}\n\n.site-header .main-navigation + .social-navigation {\n\tmargin-top: 1.75em;\n}\n\n.site-footer .social-navigation {\n\tmargin-bottom: 1.75em;\n}\n\n.social-navigation ul {\n\tlist-style: none;\n\tmargin: 0 0 -0.4375em;\n}\n\n.social-navigation li {\n\tfloat: left;\n\tmargin: 0 0.4375em 0.4375em 0;\n}\n\n.social-navigation a {\n\tborder: 1px solid #d1d1d1;\n\tborder-radius: 50%;\n\tcolor: #1a1a1a;\n\tdisplay: block;\n\theight: 35px;\n\tposition: relative;\n\twidth: 35px;\n}\n\n.social-navigation a:before {\n\tcontent: \"\\F415\";\n\theight: 33px;\n\tline-height: 33px;\n\ttext-align: center;\n\twidth: 33px;\n}\n\n.social-navigation a:hover:before,\n.social-navigation a:focus:before {\n\tcolor: #007acc;\n}\n\n.social-navigation a[href*=\"codepen.io\"]:before {\n\tcontent: \"\\F216\";\n}\n\n.social-navigation a[href*=\"digg.com\"]:before {\n\tcontent: \"\\F221\";\n}\n\n.social-navigation a[href*=\"dribbble.com\"]:before {\n\tcontent: \"\\F201\";\n}\n\n.social-navigation a[href*=\"dropbox.com\"]:before {\n\tcontent: \"\\F225\";\n}\n\n.social-navigation a[href*=\"facebook.com\"]:before {\n\tcontent: \"\\F203\";\n}\n\n.social-navigation a[href*=\"flickr.com\"]:before {\n\tcontent: \"\\F211\";\n}\n\n.social-navigation a[href*=\"foursquare.com\"]:before {\n\tcontent: \"\\F226\";\n}\n\n.social-navigation a[href*=\"plus.google.com\"]:before {\n\tcontent: \"\\F206\";\n}\n\n.social-navigation a[href*=\"github.com\"]:before {\n\tcontent: \"\\F200\";\n}\n\n.social-navigation a[href*=\"instagram.com\"]:before {\n\tcontent: \"\\F215\";\n}\n\n.social-navigation a[href*=\"linkedin.com\"]:before {\n\tcontent: \"\\F208\";\n}\n\n.social-navigation a[href*=\"path.com\"]:before {\n\tcontent: \"\\F219\";\n}\n\n.social-navigation a[href*=\"pinterest.com\"]:before {\n\tcontent: \"\\F210\";\n}\n\n.social-navigation a[href*=\"getpocket.com\"]:before {\n\tcontent: \"\\F224\";\n}\n\n.social-navigation a[href*=\"polldaddy.com\"]:before {\n\tcontent: \"\\F217\";\n}\n\n.social-navigation a[href*=\"reddit.com\"]:before {\n\tcontent: \"\\F222\";\n}\n\n.social-navigation a[href*=\"skype.com\"]:before {\n\tcontent: \"\\F220\";\n}\n\n.social-navigation a[href*=\"stumbleupon.com\"]:before {\n\tcontent: \"\\F223\";\n}\n\n.social-navigation a[href*=\"tumblr.com\"]:before {\n\tcontent: \"\\F214\";\n}\n\n.social-navigation a[href*=\"twitter.com\"]:before {\n\tcontent: \"\\F202\";\n}\n\n.social-navigation a[href*=\"vimeo.com\"]:before {\n\tcontent: \"\\F212\";\n}\n\n.social-navigation a[href*=\"wordpress.com\"]:before,\n.social-navigation a[href*=\"wordpress.org\"]:before {\n\tcontent: \"\\F205\";\n}\n\n.social-navigation a[href*=\"youtube.com\"]:before {\n\tcontent: \"\\F213\";\n}\n\n.social-navigation a[href^=\"mailto:\"]:before {\n\tcontent: \"\\F410\";\n}\n\n.social-navigation a[href*=\"spotify.com\"]:before {\n\tcontent: \"\\F515\";\n}\n\n.social-navigation a[href*=\"twitch.tv\"]:before {\n\tcontent: \"\\F516\";\n}\n\n.social-navigation a[href$=\"/feed/\"]:before {\n\tcontent: \"\\F413\";\n}\n\n.post-navigation {\n\tborder-top: 4px solid #1a1a1a;\n\tborder-bottom: 4px solid #1a1a1a;\n\tclear: both;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tmargin: 0 7.6923% 3.5em;\n}\n\n.post-navigation a {\n\tcolor: #1a1a1a;\n\tdisplay: block;\n\tpadding: 1.75em 0;\n}\n\n.post-navigation span {\n\tdisplay: block;\n}\n\n.post-navigation .meta-nav {\n\tcolor: #686868;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tletter-spacing: 0.076923077em;\n\tline-height: 1.6153846154;\n\tmargin-bottom: 0.5384615385em;\n\ttext-transform: uppercase;\n}\n\n.post-navigation .post-title {\n\tdisplay: inline;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 23px;\n\tfont-size: 1.4375rem;\n\tfont-weight: 700;\n\tline-height: 1.2173913043;\n\ttext-rendering: optimizeLegibility;\n}\n\n.post-navigation a:hover .post-title,\n.post-navigation a:focus .post-title {\n\tcolor: #007acc;\n}\n\n.post-navigation div + div {\n\tborder-top: 4px solid #1a1a1a;\n}\n\n.pagination {\n\tborder-top: 4px solid #1a1a1a;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 19px;\n\tfont-size: 1.1875rem;\n\tmargin: 0 7.6923% 2.947368421em;\n\tmin-height: 56px;\n\tposition: relative;\n}\n\n.pagination:before,\n.pagination:after {\n\tbackground-color: #1a1a1a;\n\tcontent: \"\";\n\theight: 52px;\n\tposition: absolute;\n\ttop:0;\n\twidth: 52px;\n\tz-index: 0;\n}\n\n.pagination:before {\n\tright: 0;\n}\n\n.pagination:after {\n\tright: 54px;\n}\n\n.pagination a:hover,\n.pagination a:focus {\n\tcolor: #1a1a1a;\n}\n\n.pagination .nav-links {\n\tpadding-right: 106px;\n\tposition: relative;\n}\n\n.pagination .nav-links:before,\n.pagination .nav-links:after {\n\tcolor: #fff;\n\tfont-size: 32px;\n\tline-height: 51px;\n\topacity: 0.3;\n\tposition: absolute;\n\twidth: 52px;\n\tz-index: 1;\n}\n\n.pagination .nav-links:before {\n\tcontent: \"\\F429\";\n\tright: -1px;\n}\n\n.pagination .nav-links:after {\n\tcontent: \"\\F430\";\n\tright: 55px;\n}\n\n/* reset screen-reader-text */\n.pagination .current .screen-reader-text {\n\tposition: static !important;\n}\n\n.pagination .page-numbers {\n\tdisplay: none;\n\tletter-spacing: 0.013157895em;\n\tline-height: 1;\n\tmargin: 0 0.7368421053em 0 -0.7368421053em;\n\tpadding: 0.8157894737em 0.7368421053em 0.3947368421em;\n\ttext-transform: uppercase;\n}\n\n.pagination .current {\n\tdisplay: inline-block;\n\tfont-weight: 700;\n}\n\n.pagination .prev,\n.pagination .next {\n\tbackground-color: #1a1a1a;\n\tcolor: #fff;\n\tdisplay: inline-block;\n\theight: 52px;\n\tmargin: 0;\n\toverflow: hidden;\n\tpadding: 0;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 52px;\n\tz-index: 2;\n}\n\n.pagination .prev:before,\n.pagination .next:before {\n\tfont-size: 32px;\n\theight: 53px;\n\tline-height: 52px;\n\tposition: relative;\n\twidth: 53px;\n}\n\n.pagination .prev:hover,\n.pagination .prev:focus,\n.pagination .next:hover,\n.pagination .next:focus {\n\tbackground-color: #007acc;\n\tcolor: #fff;\n}\n\n.pagination .prev:focus,\n.pagination .next:focus {\n\toutline: 0;\n}\n\n.pagination .prev {\n\tright: 54px;\n}\n\n.pagination .prev:before {\n\tcontent: \"\\F430\";\n\tleft: -1px;\n\ttop: -1px;\n}\n\n.pagination .next {\n\tright: 0;\n}\n\n.pagination .next:before {\n\tcontent: \"\\F429\";\n\tright: -1px;\n\ttop: -1px;\n}\n\n.image-navigation,\n.comment-navigation {\n\tborder-top: 1px solid #d1d1d1;\n\tborder-bottom: 1px solid #d1d1d1;\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.6153846154;\n\tmargin: 0 7.6923% 2.1538461538em;\n\tpadding: 1.0769230769em 0;\n}\n\n.comment-navigation {\n\tmargin-right: 0;\n\tmargin-left: 0;\n}\n\n.comments-title + .comment-navigation {\n\tborder-bottom: 0;\n\tmargin-bottom: 0;\n}\n\n.image-navigation .nav-previous:not(:empty),\n.image-navigation .nav-next:not(:empty),\n.comment-navigation .nav-previous:not(:empty),\n.comment-navigation .nav-next:not(:empty) {\n\tdisplay: inline-block;\n}\n\n.image-navigation .nav-previous:not(:empty) + .nav-next:not(:empty):before,\n.comment-navigation .nav-previous:not(:empty) + .nav-next:not(:empty):before {\n\tcontent: \"/\";\n\tdisplay: inline-block;\n\topacity: 0.7;\n\tpadding: 0 0.538461538em;\n}\n\n\n/**\n * 7.0 - Accessibility\n */\n\n/* Text meant only for screen readers */\n.says,\n.screen-reader-text {\n\tclip: rect(1px, 1px, 1px, 1px);\n\theight: 1px;\n\toverflow: hidden;\n\tposition: absolute !important;\n\twidth: 1px;\n\t/* many screen reader and browser combinations announce broken words as they would appear visually */\n\tword-wrap: normal !important;\n}\n\n/* must have higher specificity than alternative color schemes inline styles */\n.site .skip-link {\n\tbackground-color: #f1f1f1;\n\tbox-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);\n\tcolor: #21759b;\n\tdisplay: block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 14px;\n\tfont-weight: 700;\n\tleft: -9999em;\n\toutline: none;\n\tpadding: 15px 23px 14px;\n\ttext-decoration: none;\n\ttext-transform: none;\n\ttop: -9999em;\n}\n\n.logged-in .site .skip-link {\n\tbox-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);\n\tfont-family: \"Open Sans\", sans-serif;\n}\n\n.site .skip-link:focus {\n\tclip: auto;\n\theight: auto;\n\tleft: 6px;\n\ttop: 7px;\n\twidth: auto;\n\tz-index: 100000;\n}\n\n\n/**\n * 8.0 - Alignments\n */\n\n.alignleft {\n\tfloat: left;\n\tmargin: 0.375em 1.75em 1.75em 0;\n}\n\n.alignright {\n\tfloat: right;\n\tmargin: 0.375em 0 1.75em 1.75em;\n}\n\n.aligncenter {\n\tclear: both;\n\tdisplay: block;\n\tmargin: 0 auto 1.75em;\n}\n\nblockquote.alignleft {\n\tmargin: 0.3157894737em 1.4736842105em 1.473684211em 0;\n}\n\nblockquote.alignright {\n\tmargin: 0.3157894737em 0 1.473684211em 1.4736842105em;\n}\n\nblockquote.aligncenter {\n\tmargin-bottom: 1.473684211em;\n}\n\n\n/**\n * 9.0 - Clearings\n */\n\n.clear:before,\n.clear:after,\nblockquote:before,\nblockquote:after,\n.entry-content:before,\n.entry-content:after,\n.entry-summary:before,\n.entry-summary:after,\n.comment-content:before,\n.comment-content:after,\n.site-content:before,\n.site-content:after,\n.site-main > article:before,\n.site-main > article:after,\n.primary-menu:before,\n.primary-menu:after,\n.social-links-menu:before,\n.social-links-menu:after,\n.textwidget:before,\n.textwidget:after,\n.content-bottom-widgets:before,\n.content-bottom-widgets:after {\n\tcontent: \"\";\n\tdisplay: table;\n}\n\n.clear:after,\nblockquote:after,\n.entry-content:after,\n.entry-summary:after,\n.comment-content:after,\n.site-content:after,\n.site-main > article:after,\n.primary-menu:after,\n.social-links-menu:after,\n.textwidget:after,\n.content-bottom-widgets:after {\n\tclear: both;\n}\n\n\n/**\n * 10.0 - Widgets\n */\n\n.widget {\n\tborder-top: 4px solid #1a1a1a;\n\tmargin-bottom: 3.5em;\n\tpadding-top: 1.75em;\n}\n\n.widget-area > :last-child,\n.widget > :last-child {\n\tmargin-bottom: 0;\n}\n\n.widget .widget-title {\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\tletter-spacing: 0.046875em;\n\tline-height: 1.3125;\n\tmargin: 0 0 1.75em;\n\ttext-transform: uppercase;\n}\n\n.widget .widget-title:empty {\n\tmargin-bottom: 0;\n}\n\n.widget-title a {\n\tcolor: #1a1a1a;\n}\n\n/* Calendar widget */\n.widget.widget_calendar table {\n\tmargin: 0;\n}\n\n.widget_calendar td,\n.widget_calendar th {\n\tline-height: 2.5625;\n\tpadding: 0;\n\ttext-align: center;\n}\n\n.widget_calendar caption {\n\tfont-weight: 900;\n\tmargin-bottom: 1.75em;\n}\n\n.widget_calendar tbody a {\n\tbackground-color: #007acc;\n\tcolor: #fff;\n\tdisplay: block;\n\tfont-weight: 700;\n}\n\n.widget_calendar tbody a:hover,\n.widget_calendar tbody a:focus {\n\tbackground-color: #686868;\n\tcolor: #fff;\n}\n\n/* Recent Posts widget */\n.widget_recent_entries .post-date {\n\tcolor: #686868;\n\tdisplay: block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.615384615;\n\tmargin-bottom: 0.538461538em;\n}\n\n.widget_recent_entries li:last-child .post-date {\n\tmargin-bottom: 0;\n}\n\n/* RSS widget */\n.widget_rss .rsswidget img {\n\tmargin-top: -0.375em;\n}\n\n.widget_rss .rss-date,\n.widget_rss cite {\n\tcolor: #686868;\n\tdisplay: block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tfont-style: normal;\n\tline-height: 1.615384615;\n\tmargin-bottom: 0.538461538em;\n}\n\n.widget_rss .rssSummary:last-child {\n\tmargin-bottom: 2.1538461538em;\n}\n\n.widget_rss li:last-child :last-child {\n\tmargin-bottom: 0;\n}\n\n/* Tag Cloud widget */\n.tagcloud a {\n\tborder: 1px solid #d1d1d1;\n\tborder-radius: 2px;\n\tdisplay: inline-block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tline-height: 1;\n\tmargin: 0 0.1875em 0.4375em 0;\n\tpadding: 0.5625em 0.4375em 0.5em;\n}\n\n.tagcloud a:hover,\n.tagcloud a:focus {\n\tborder-color: #007acc;\n\tcolor: #007acc;\n\toutline: 0;\n}\n\n\n/**\n * 11.0 - Content\n */\n\n.site {\n\tbackground-color: #fff;\n}\n\n.site-inner {\n\tmargin: 0 auto;\n\tmax-width: 1320px;\n\tposition: relative;\n}\n\n.site-content {\n\tword-wrap: break-word;\n}\n\n/* Do not show the outline on the skip link target. */\n#content[tabindex=\"-1\"]:focus {\n\toutline: 0;\n}\n\n.site-main {\n\tmargin-bottom: 3.5em;\n}\n\n.site-main > :last-child {\n\tmargin-bottom: 0;\n}\n\n\n/**\n * 11.1 - Header\n */\n\n.site-header {\n\tpadding: 2.625em 7.6923%;\n}\n\n.site-header-main {\n\t-webkit-align-items: center;\n\t-ms-flex-align: center;\n\talign-items: center;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-flex-wrap: wrap;\n\t-ms-flex-wrap: wrap;\n\tflex-wrap: wrap;\n}\n\n.site-branding {\n\tmargin: 0.875em auto 0.875em 0;\n\t/* Avoid overflowing wide custom logo in small screens in Firefox and IEs */\n\tmax-width: 100%;\n\tmin-width: 0;\n\toverflow: hidden;\n}\n\n.custom-logo-link {\n\tdisplay: block;\n}\n\n.custom-logo {\n\tmax-width: 180px;\n}\n\n.site-title {\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 23px;\n\tfont-size: 1.4375rem;\n\tfont-weight: 700;\n\tline-height: 1.2173913043;\n\tmargin: 0;\n}\n\n.site-branding .site-title a {\n\tcolor: #1a1a1a;\n}\n\n.site-branding .site-title a:hover,\n.site-branding .site-title a:focus {\n\tcolor: #007acc;\n}\n\n.wp-custom-logo .site-title {\n\tmargin-top: 0.608695652em;\n}\n\n.site-description {\n\tcolor: #686868;\n\tdisplay: none;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tfont-weight: 400;\n\tline-height: 1.0769230769;\n\tmargin: 0.538461538em 0 0;\n}\n\n.menu-toggle {\n\tbackground-color: transparent;\n\tborder: 1px solid #d1d1d1;\n\tcolor: #1a1a1a;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tmargin: 1.076923077em 0;\n\tpadding: 0.769230769em;\n}\n\n.no-js .menu-toggle {\n\tdisplay: none;\n}\n\n.menu-toggle:hover,\n.menu-toggle:focus {\n\tbackground-color: transparent;\n\tborder-color: #007acc;\n\tcolor: #007acc;\n}\n\n.menu-toggle.toggled-on,\n.menu-toggle.toggled-on:hover,\n.menu-toggle.toggled-on:focus {\n\tbackground-color: #1a1a1a;\n\tborder-color: #1a1a1a;\n\tcolor: #fff;\n}\n\n.menu-toggle:focus {\n\toutline: 0;\n}\n\n.menu-toggle.toggled-on:focus {\n\toutline: thin dotted;\n}\n\n.header-image {\n\tclear: both;\n\tmargin: 0.875em 0;\n}\n\n.header-image a {\n\tdisplay: block;\n}\n\n.header-image a:hover img,\n.header-image a:focus img {\n\topacity: 0.85;\n}\n\n/**\n * 11.2 - Posts and pages\n */\n\n.site-main > article {\n\tmargin-bottom: 3.5em;\n\tposition: relative;\n}\n\n.entry-header,\n.entry-summary,\n.entry-content,\n.entry-footer,\n.page-content {\n\tmargin-right: 7.6923%;\n\tmargin-left: 7.6923%;\n}\n\n.entry-title {\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 28px;\n\tfont-size: 1.75rem;\n\tfont-weight: 700;\n\tline-height: 1.25;\n\tmargin-bottom: 1em;\n}\n\n.entry-title a {\n\tcolor: #1a1a1a;\n}\n\n.entry-title a:hover,\n.entry-title a:focus {\n\tcolor: #007acc;\n}\n\n.post-thumbnail {\n\tdisplay: block;\n\tmargin: 0 7.6923% 1.75em;\n}\n\n.post-thumbnail img {\n\tdisplay: block;\n}\n\n.no-sidebar .post-thumbnail img {\n\tmargin: 0 auto;\n}\n\na.post-thumbnail:hover,\na.post-thumbnail:focus {\n\topacity: 0.85;\n}\n\n.entry-content,\n.entry-summary {\n\tborder-color: #d1d1d1;\n}\n\n.entry-content h1,\n.entry-summary h1,\n.comment-content h1,\n.textwidget h1 {\n\tfont-size: 28px;\n\tfont-size: 1.75rem;\n\tline-height: 1.25;\n\tmargin-top: 2em;\n\tmargin-bottom: 1em;\n}\n\n.entry-content h2,\n.entry-summary h2,\n.comment-content h2,\n.textwidget h2 {\n\tfont-size: 23px;\n\tfont-size: 1.4375rem;\n\tline-height: 1.2173913043;\n\tmargin-top: 2.4347826087em;\n\tmargin-bottom: 1.2173913043em;\n}\n\n.entry-content h3,\n.entry-summary h3,\n.comment-content h3,\n.textwidget h3 {\n\tfont-size: 19px;\n\tfont-size: 1.1875rem;\n\tline-height: 1.1052631579;\n\tmargin-top: 2.9473684211em;\n\tmargin-bottom: 1.4736842105em;\n}\n\n.entry-content h4,\n.entry-content h5,\n.entry-content h6,\n.entry-summary h4,\n.entry-summary h5,\n.entry-summary h6,\n.comment-content h4,\n.comment-content h5,\n.comment-content h6,\n.textwidget h4,\n.textwidget h5,\n.textwidget h6 {\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\tline-height: 1.3125;\n\tmargin-top: 3.5em;\n\tmargin-bottom: 1.75em;\n}\n\n.entry-content h4,\n.entry-summary h4,\n.comment-content h4,\n.textwidget h4 {\n\tletter-spacing: 0.140625em;\n\ttext-transform: uppercase;\n}\n\n.entry-content h6,\n.entry-summary h6,\n.comment-content h6,\n.textwidget h6 {\n\tfont-style: italic;\n}\n\n.entry-content h1,\n.entry-content h2,\n.entry-content h3,\n.entry-content h4,\n.entry-content h5,\n.entry-content h6,\n.entry-summary h1,\n.entry-summary h2,\n.entry-summary h3,\n.entry-summary h4,\n.entry-summary h5,\n.entry-summary h6,\n.comment-content h1,\n.comment-content h2,\n.comment-content h3,\n.comment-content h4,\n.comment-content h5,\n.comment-content h6,\n.textwidget h1,\n.textwidget h2,\n.textwidget h3,\n.textwidget h4,\n.textwidget h5,\n.textwidget h6 {\n\tfont-weight: 900;\n}\n\n.entry-content h1:first-child,\n.entry-content h2:first-child,\n.entry-content h3:first-child,\n.entry-content h4:first-child,\n.entry-content h5:first-child,\n.entry-content h6:first-child,\n.entry-summary h1:first-child,\n.entry-summary h2:first-child,\n.entry-summary h3:first-child,\n.entry-summary h4:first-child,\n.entry-summary h5:first-child,\n.entry-summary h6:first-child,\n.comment-content h1:first-child,\n.comment-content h2:first-child,\n.comment-content h3:first-child,\n.comment-content h4:first-child,\n.comment-content h5:first-child,\n.comment-content h6:first-child,\n.textwidget h1:first-child,\n.textwidget h2:first-child,\n.textwidget h3:first-child,\n.textwidget h4:first-child,\n.textwidget h5:first-child,\n.textwidget h6:first-child {\n\tmargin-top: 0;\n}\n\n.post-navigation .post-title,\n.entry-title,\n.comments-title {\n\t-webkit-hyphens: auto;\n\t-moz-hyphens: auto;\n\t-ms-hyphens: auto;\n\thyphens: auto;\n}\n\nbody:not(.search-results) .entry-summary {\n\tcolor: #686868;\n\tfont-size: 19px;\n\tfont-size: 1.1875rem;\n\tline-height: 1.4736842105;\n\tmargin-bottom: 1.4736842105em;\n}\n\nbody:not(.search-results) .entry-header + .entry-summary {\n\tmargin-top: -0.736842105em;\n}\n\nbody:not(.search-results) .entry-summary p,\nbody:not(.search-results) .entry-summary address,\nbody:not(.search-results) .entry-summary hr,\nbody:not(.search-results) .entry-summary ul,\nbody:not(.search-results) .entry-summary ol,\nbody:not(.search-results) .entry-summary dl,\nbody:not(.search-results) .entry-summary dd,\nbody:not(.search-results) .entry-summary table {\n\tmargin-bottom: 1.4736842105em;\n}\n\nbody:not(.search-results) .entry-summary li > ul,\nbody:not(.search-results) .entry-summary li > ol {\n\tmargin-bottom: 0;\n}\n\nbody:not(.search-results) .entry-summary th,\nbody:not(.search-results) .entry-summary td {\n\tpadding: 0.3684210526em;\n}\n\nbody:not(.search-results) .entry-summary fieldset {\n\tmargin-bottom: 1.4736842105em;\n\tpadding: 0.3684210526em;\n}\n\nbody:not(.search-results) .entry-summary blockquote {\n\tborder-color: currentColor;\n}\n\nbody:not(.search-results) .entry-summary blockquote > :last-child {\n\tmargin-bottom: 0;\n}\n\nbody:not(.search-results) .entry-summary .alignleft {\n\tmargin: 0.2631578947em 1.4736842105em 1.4736842105em 0;\n}\n\nbody:not(.search-results) .entry-summary .alignright {\n\tmargin: 0.2631578947em 0 1.4736842105em 1.4736842105em;\n}\n\nbody:not(.search-results) .entry-summary .aligncenter {\n\tmargin-bottom: 1.4736842105em;\n}\n\n.entry-content > :last-child,\n.entry-summary > :last-child,\nbody:not(.search-results) .entry-summary > :last-child,\n.page-content > :last-child,\n.comment-content > :last-child,\n.textwidget > :last-child {\n\tmargin-bottom: 0;\n}\n\n.more-link {\n\twhite-space: nowrap;\n}\n\n.author-info {\n\tborder-color: inherit;\n\tborder-style: solid;\n\tborder-width: 1px 0 1px 0;\n\tclear: both;\n\tpadding-top: 1.75em;\n\tpadding-bottom: 1.75em;\n}\n\n.author-avatar .avatar {\n\tfloat: left;\n\theight: 42px;\n\tmargin: 0 1.75em 1.75em 0;\n\twidth: 42px;\n}\n\n.author-description > :last-child {\n\tmargin-bottom: 0;\n}\n\n.entry-content .author-title {\n\tclear: none;\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\tfont-weight: 900;\n\tline-height: 1.75;\n\tmargin: 0;\n}\n\n.author-bio {\n\tcolor: #686868;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.6153846154;\n\tmargin-bottom: 1.6153846154em;\n\toverflow: hidden;\n}\n\n.author-link {\n\twhite-space: nowrap;\n}\n\n.entry-footer {\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.6153846154;\n\tmargin-top: 2.1538461538em;\n}\n\n.entry-footer:empty {\n\tmargin: 0;\n}\n\n.entry-footer a {\n\tcolor: #686868;\n}\n\n.entry-footer a:hover,\n.entry-footer a:focus {\n\tcolor: #007acc;\n}\n\n.entry-footer > span:not(:last-child):after {\n\tcontent: \"/\";\n\tdisplay: inline-block;\n\topacity: 0.7;\n\tpadding: 0 0.538461538em;\n}\n\n.entry-footer .avatar {\n\theight: 21px;\n\tmargin: -0.1538461538em 0.5384615385em 0 0;\n\twidth: 21px;\n}\n\n.sticky-post {\n\tcolor: #686868;\n\tdisplay: block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tletter-spacing: 0.076923077em;\n\tline-height: 1.6153846154;\n\tmargin-bottom: 0.5384615385em;\n\ttext-transform: uppercase;\n}\n\n/**\n * IE8 and earlier will drop any block with CSS3 selectors.\n * Do not combine these styles with the next block.\n */\n.updated:not(.published) {\n\tdisplay: none;\n}\n\n.sticky .posted-on,\n.byline {\n\tdisplay: none;\n}\n\n.single .byline,\n.group-blog .byline {\n\tdisplay: inline;\n}\n\n.page-header {\n\tborder-top: 4px solid #1a1a1a;\n\tmargin: 0 7.6923% 3.5em;\n\tpadding-top: 1.75em;\n}\n\nbody.error404 .page-header,\nbody.search-no-results .page-header {\n\tborder-top: 0;\n\tpadding-top: 0;\n}\n\n.page-title {\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 23px;\n\tfont-size: 1.4375rem;\n\tline-height: 1.2173913043;\n}\n\n.taxonomy-description {\n\tcolor: #686868;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.6153846154;\n}\n\n.taxonomy-description p {\n\tmargin: 0.5384615385em 0 1.6153846154em;\n}\n\n.taxonomy-description > :last-child {\n\tmargin-bottom: 0;\n}\n\n.page-links {\n\tclear: both;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tmargin: 0 0 1.75em;\n}\n\n.page-links a,\n.page-links > span {\n\tborder: 1px solid #d1d1d1;\n\tborder-radius: 2px;\n\tdisplay: inline-block;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\theight: 1.8461538462em;\n\tline-height: 1.6923076923em;\n\tmargin-right: 0.3076923077em;\n\ttext-align: center;\n\twidth: 1.8461538462em;\n}\n\n.page-links a {\n\tbackground-color: #1a1a1a;\n\tborder-color: #1a1a1a;\n\tcolor: #fff;\n}\n\n.page-links a:hover,\n.page-links a:focus {\n\tbackground-color: #007acc;\n\tborder-color: transparent;\n\tcolor: #fff;\n}\n\n.page-links > .page-links-title {\n\tborder: 0;\n\tcolor: #1a1a1a;\n\theight: auto;\n\tmargin: 0;\n\tpadding-right: 0.6153846154em;\n\twidth: auto;\n}\n\n.entry-attachment {\n\tmargin-bottom: 1.75em;\n}\n\n.entry-caption {\n\tcolor: #686868;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tfont-style: italic;\n\tline-height: 1.6153846154;\n\tpadding-top: 1.0769230769em;\n}\n\n.entry-caption > :last-child {\n\tmargin-bottom: 0;\n}\n\n.content-bottom-widgets {\n\tmargin: 0 7.6923%;\n}\n\n.content-bottom-widgets .widget-area {\n\tmargin-bottom: 3.5em;\n}\n\n\n/**\n * 11.3 - Post Formats\n */\n\n.format-aside .entry-title,\n.format-image .entry-title,\n.format-video .entry-title,\n.format-quote .entry-title,\n.format-gallery .entry-title,\n.format-status .entry-title,\n.format-link .entry-title,\n.format-audio .entry-title,\n.format-chat .entry-title {\n\tfont-size: 19px;\n\tfont-size: 1.1875rem;\n\tline-height: 1.473684211;\n\tmargin-bottom: 1.473684211em;\n}\n\n.blog .format-status .entry-title,\n.archive .format-status .entry-title {\n\tdisplay: none;\n}\n\n\n/**\n * 11.4 - Comments\n */\n\n.comments-area {\n\tmargin: 0 7.6923% 3.5em;\n}\n\n.comment-list + .comment-respond,\n.comment-navigation + .comment-respond {\n\tpadding-top: 1.75em;\n}\n\n.comments-title,\n.comment-reply-title {\n\tborder-top: 4px solid #1a1a1a;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 23px;\n\tfont-size: 1.4375rem;\n\tfont-weight: 700;\n\tline-height: 1.3125;\n\tpadding-top: 1.217391304em;\n}\n\n.comments-title {\n\tmargin-bottom: 1.217391304em;\n}\n\n.comment-list {\n\tlist-style: none;\n\tmargin: 0;\n}\n\n.comment-list article,\n.comment-list .pingback,\n.comment-list .trackback {\n\tborder-top: 1px solid #d1d1d1;\n\tpadding: 1.75em 0;\n}\n\n.comment-list .children {\n\tlist-style: none;\n\tmargin: 0;\n}\n\n.comment-list .children > li {\n\tpadding-left: 0.875em;\n}\n\n.comment-author {\n\tcolor: #1a1a1a;\n\tmargin-bottom: 0.4375em;\n}\n\n.comment-author .avatar {\n\tfloat: left;\n\theight: 28px;\n\tmargin-right: 0.875em;\n\tposition: relative;\n\twidth: 28px;\n}\n\n.bypostauthor > article .fn:after {\n\tcontent: \"\\F304\";\n\tleft: 3px;\n\tposition: relative;\n\ttop: 5px;\n}\n\n.comment-metadata,\n.pingback .edit-link {\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.6153846154;\n}\n\n.comment-metadata {\n\tmargin-bottom: 2.1538461538em;\n}\n\n.comment-metadata a,\n.pingback .comment-edit-link {\n\tcolor: #686868;\n}\n\n.comment-metadata a:hover,\n.comment-metadata a:focus,\n.pingback .comment-edit-link:hover,\n.pingback .comment-edit-link:focus {\n\tcolor: #007acc;\n}\n\n.comment-metadata .edit-link,\n.pingback .edit-link {\n\tdisplay: inline-block;\n}\n\n.comment-metadata .edit-link:before,\n.pingback .edit-link:before {\n\tcontent: \"/\";\n\tdisplay: inline-block;\n\topacity: 0.7;\n\tpadding: 0 0.538461538em;\n}\n\n.comment-content ul,\n.comment-content ol {\n\tmargin: 0 0 1.5em 1.25em;\n}\n\n.comment-content li > ul,\n.comment-content li > ol {\n\tmargin-bottom: 0;\n}\n\n.comment-reply-link {\n\tborder: 1px solid #d1d1d1;\n\tborder-radius: 2px;\n\tcolor: #007acc;\n\tdisplay: inline-block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1;\n\tmargin-top: 2.1538461538em;\n\tpadding: 0.5384615385em 0.5384615385em 0.4615384615em;\n}\n\n.comment-reply-link:hover,\n.comment-reply-link:focus {\n\tborder-color: currentColor;\n\tcolor: #007acc;\n\toutline: 0;\n}\n\n.comment-form {\n\tpadding-top: 1.75em;\n}\n\n.comment-form label {\n\tcolor: #686868;\n\tdisplay: block;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tletter-spacing: 0.076923077em;\n\tline-height: 1.6153846154;\n\tmargin-bottom: 0.5384615385em;\n\ttext-transform: uppercase;\n}\n\n.comment-list .comment-form {\n\tpadding-bottom: 1.75em;\n}\n\n.comment-notes,\n.comment-awaiting-moderation,\n.logged-in-as,\n.form-allowed-tags {\n\tcolor: #686868;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.6153846154;\n\tmargin-bottom: 2.1538461538em;\n}\n\n.no-comments {\n\tborder-top: 1px solid #d1d1d1;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-weight: 700;\n\tmargin: 0;\n\tpadding-top: 1.75em;\n}\n\n.comment-navigation + .no-comments {\n\tborder-top: 0;\n\tpadding-top: 0;\n}\n\n.form-allowed-tags code {\n\tfont-family: Inconsolata, monospace;\n}\n\n.form-submit {\n\tmargin-bottom: 0;\n}\n\n.required {\n\tcolor: #007acc;\n\tfont-family: Merriweather, Georgia, serif;\n}\n\n.comment-reply-title small {\n\tfont-size: 100%;\n}\n\n.comment-reply-title small a {\n\tborder: 0;\n\tfloat: right;\n\theight: 32px;\n\toverflow: hidden;\n\twidth: 26px;\n}\n\n.comment-reply-title small a:hover,\n.comment-reply-title small a:focus {\n\tcolor: #1a1a1a;\n}\n\n.comment-reply-title small a:before {\n\tcontent: \"\\F405\";\n\tfont-size: 32px;\n\tposition: relative;\n\ttop: -5px;\n}\n\n\n/**\n * 11.5 - Sidebar\n */\n\n.sidebar {\n\tmargin-bottom: 3.5em;\n\tpadding: 0 7.6923%;\n}\n\n\n/**\n * 11.6 - Footer\n */\n\n.site-footer {\n\tpadding: 0 7.6923% 1.75em;\n}\n\n.site-info {\n\tcolor: #686868;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tline-height: 1.6153846154;\n}\n\n.site-info a {\n\tcolor: #686868;\n}\n\n.site-info a:hover,\n.site-info a:focus {\n\tcolor: #007acc;\n}\n\n.site-footer .site-title {\n\tfont-family: inherit;\n\tfont-size: inherit;\n\tfont-weight: 400;\n}\n\n.site-footer .site-title:after {\n\tcontent: \"/\";\n\tdisplay: inline-block;\n\tfont-family: Montserrat, sans-serif;\n\topacity: 0.7;\n\tpadding: 0 0.307692308em 0 0.538461538em;\n}\n\n\n/**\n * 12.0 - Media\n */\n\n.site .avatar {\n\tborder-radius: 50%;\n}\n\n.entry-content .wp-smiley,\n.entry-summary .wp-smiley,\n.comment-content .wp-smiley,\n.textwidget .wp-smiley {\n\tborder: none;\n\tmargin-top: 0;\n\tmargin-bottom: 0;\n\tpadding: 0;\n}\n\n.entry-content a img,\n.entry-summary a img,\n.comment-content a img,\n.textwidget a img {\n\tdisplay: block;\n}\n\n/* Make sure embeds and iframes fit their containers. */\nembed,\niframe,\nobject,\nvideo {\n\tmargin-bottom: 1.75em;\n\tmax-width: 100%;\n\tvertical-align: middle;\n}\n\np > embed,\np > iframe,\np > object,\np > video {\n\tmargin-bottom: 0;\n}\n\n.entry-content .wp-audio-shortcode a,\n.entry-content .wp-playlist a {\n\tbox-shadow: none;\n}\n\n.wp-audio-shortcode,\n.wp-video,\n.wp-playlist.wp-audio-playlist {\n\tmargin-top: 0;\n\tmargin-bottom: 1.75em;\n}\n\n.wp-playlist.wp-audio-playlist {\n\tpadding-bottom: 0;\n}\n\n.wp-playlist .wp-playlist-tracks {\n\tmargin-top: 0;\n}\n\n.wp-playlist-item .wp-playlist-caption {\n\tborder-bottom: 0;\n\tpadding: 0.7142857143em 0;\n}\n\n.wp-playlist-item .wp-playlist-item-length {\n\ttop: 0.7142857143em;\n}\n\n\n/**\n * 12.1 - Captions\n */\n\n.wp-caption {\n\tmargin-bottom: 1.75em;\n\tmax-width: 100%;\n}\n\n.wp-caption img[class*=\"wp-image-\"] {\n\tdisplay: block;\n\tmargin: 0;\n}\n\n.wp-caption .wp-caption-text {\n\tcolor: #686868;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tfont-style: italic;\n\tline-height: 1.6153846154;\n\tpadding-top: 0.5384615385em;\n}\n\n\n/**\n * 12.2 - Galleries\n */\n\n.gallery {\n\tmargin: 0 -1.1666667% 1.75em;\n}\n\n.gallery-item {\n\tdisplay: inline-block;\n\tmax-width: 33.33%;\n\tpadding: 0 1.1400652% 2.2801304%;\n\ttext-align: center;\n\tvertical-align: top;\n\twidth: 100%;\n}\n\n.gallery-columns-1 .gallery-item {\n\tmax-width: 100%;\n}\n\n.gallery-columns-2 .gallery-item {\n\tmax-width: 50%;\n}\n\n.gallery-columns-4 .gallery-item {\n\tmax-width: 25%;\n}\n\n.gallery-columns-5 .gallery-item {\n\tmax-width: 20%;\n}\n\n.gallery-columns-6 .gallery-item {\n\tmax-width: 16.66%;\n}\n\n.gallery-columns-7 .gallery-item {\n\tmax-width: 14.28%;\n}\n\n.gallery-columns-8 .gallery-item {\n\tmax-width: 12.5%;\n}\n\n.gallery-columns-9 .gallery-item {\n\tmax-width: 11.11%;\n}\n\n.gallery-icon img {\n\tmargin: 0 auto;\n}\n\n.gallery-caption {\n\tcolor: #686868;\n\tdisplay: block;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tfont-style: italic;\n\tline-height: 1.6153846154;\n\tpadding-top: 0.5384615385em;\n}\n\n.gallery-columns-6 .gallery-caption,\n.gallery-columns-7 .gallery-caption,\n.gallery-columns-8 .gallery-caption,\n.gallery-columns-9 .gallery-caption {\n\tdisplay: none;\n}\n\n\n/**\n * 13.0 - Multisites\n */\n\n.widecolumn {\n\tmargin-bottom: 3.5em;\n\tpadding: 0 7.6923%;\n}\n\n.widecolumn .mu_register {\n\twidth: auto;\n}\n\n.widecolumn .mu_register .mu_alert {\n\tbackground: transparent;\n\tborder-color: #d1d1d1;\n\tcolor: inherit;\n\tmargin-bottom: 3.5em;\n\tpadding: 1.75em;\n}\n\n.widecolumn form,\n.widecolumn .mu_register form {\n\tmargin-top: 0;\n}\n\n.widecolumn h2 {\n\tfont-size: 23px;\n\tfont-size: 1.4375rem;\n\tfont-weight: 900;\n\tline-height: 1.2173913043;\n\tmargin-bottom: 1.2173913043em;\n}\n\n.widecolumn p {\n\tmargin: 1.75em 0;\n}\n\n.widecolumn p + h2 {\n\tmargin-top: 2.4347826087em;\n}\n\n.widecolumn label,\n.widecolumn .mu_register label {\n\tcolor: #686868;\n\tfont-family: Montserrat, \"Helvetica Neue\", sans-serif;\n\tfont-size: 13px;\n\tfont-size: 0.8125rem;\n\tfont-weight: 400;\n\tletter-spacing: 0.076923077em;\n\tline-height: 1.6153846154;\n\ttext-transform: uppercase;\n}\n\n.widecolumn .mu_register label {\n\tmargin: 2.1538461538em 0.7692307692em 0.5384615385em 0;\n}\n\n.widecolumn .mu_register label strong {\n\tfont-weight: 400;\n}\n\n.widecolumn #key,\n.widecolumn .mu_register #blog_title,\n.widecolumn .mu_register #user_email,\n.widecolumn .mu_register #blogname,\n.widecolumn .mu_register #user_name {\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\twidth: 100%;\n}\n\n.widecolumn .mu_register #blogname {\n\tmargin: 0;\n}\n\n.widecolumn .mu_register #blog_title,\n.widecolumn .mu_register #user_email,\n.widecolumn .mu_register #user_name {\n\tmargin: 0 0 0.375em;\n}\n\n.widecolumn #submit,\n.widecolumn .mu_register input[type=\"submit\"] {\n\tfont-size: 16px;\n\tfont-size: 1rem;\n\tmargin: 0;\n\twidth: auto;\n}\n\n.widecolumn .mu_register .prefix_address,\n.widecolumn .mu_register .suffix_address {\n\tfont-size: inherit;\n}\n\n.widecolumn .mu_register > :last-child,\n.widecolumn form > :last-child {\n\tmargin-bottom: 0;\n}\n\n\n/**\n * 14.0 - Media Queries\n */\n\n/**\n * Does the same thing as <meta name=\"viewport\" content=\"width=device-width\">,\n * but in the future W3C standard way. -ms- prefix is required for IE10+ to\n * render responsive styling in Windows 8 \"snapped\" views; IE10+ does not honor\n * the meta tag. See https://core.trac.wordpress.org/ticket/25888.\n */\n@-ms-viewport {\n\twidth: device-width;\n}\n\n@viewport {\n\twidth: device-width;\n}\n\n\n/**\n * 14.1 - >= 710px\n */\n\n@media screen and (min-width: 44.375em) {\n\tbody:not(.custom-background-image):before,\n\tbody:not(.custom-background-image):after {\n\t\tbackground: inherit;\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\theight: 21px;\n\t\tleft: 0;\n\t\tposition: fixed;\n\t\twidth: 100%;\n\t\tz-index: 99;\n\t}\n\n\tbody:not(.custom-background-image):before {\n\t\ttop: 0;\n\t}\n\n\tbody:not(.custom-background-image).admin-bar:before {\n\t\ttop: 46px;\n\t}\n\n\tbody:not(.custom-background-image):after {\n\t\tbottom: 0;\n\t}\n\n\t.site {\n\t\tmargin: 21px;\n\t}\n\n\t.site-main {\n\t\tmargin-bottom: 5.25em;\n\t}\n\n\t.site-header {\n\t\tpadding: 3.9375em 7.6923%;\n\t}\n\n\t.site-branding {\n\t\tmargin-top: 1.3125em;\n\t\tmargin-bottom: 1.3125em;\n\t}\n\n\t.custom-logo {\n\t\tmax-width: 210px;\n\t}\n\n\t.site-title {\n\t\tfont-size: 28px;\n\t\tfont-size: 1.75rem;\n\t\tline-height: 1.25;\n\t}\n\n\t.wp-custom-logo .site-title {\n\t\tmargin-top: 0.5em;\n\t}\n\n\t.site-description {\n\t\tdisplay: block;\n\t}\n\n\t.menu-toggle {\n\t\tfont-size: 16px;\n\t\tfont-size: 1.0rem;\n\t\tmargin: 1.3125em 0;\n\t\tpadding: 0.8125em 0.875em 0.6875em;\n\t}\n\n\t.site-header-menu {\n\t\tmargin: 1.3125em 0;\n\t}\n\n\t.site-header .main-navigation + .social-navigation {\n\t\tmargin-top: 2.625em;\n\t}\n\n\t.header-image {\n\t\tmargin: 1.3125em 0;\n\t}\n\n\t.pagination {\n\t\tmargin: 0 23.0769% 4.421052632em 7.6923%\n\t}\n\n\t.post-navigation {\n\t\tmargin-bottom: 5.25em;\n\t}\n\n\t.post-navigation .post-title {\n\t\tfont-size: 28px;\n\t\tfont-size: 1.75rem;\n\t\tline-height: 1.25;\n\t}\n\n\t/* restore screen-reader-text */\n\t.pagination .current .screen-reader-text {\n\t\tposition: absolute !important;\n\t}\n\n\t.pagination .page-numbers {\n\t\tdisplay: inline-block;\n\t}\n\n\t.site-main > article {\n\t\tmargin-bottom: 5.25em;\n\t}\n\n\t.entry-header,\n\t.post-thumbnail,\n\t.entry-content,\n\t.entry-summary,\n\t.entry-footer,\n\t.comments-area,\n\t.image-navigation,\n\t.post-navigation,\n\t.page-header,\n\t.page-content,\n\t.content-bottom-widgets {\n\t\tmargin-right: 23.0769%;\n\t}\n\n\t.entry-title {\n\t\tfont-size: 33px;\n\t\tfont-size: 2.0625rem;\n\t\tline-height: 1.2727272727;\n\t\tmargin-bottom: 0.8484848485em;\n\t}\n\n\t.entry-content blockquote.alignleft,\n\t.entry-content blockquote.alignright {\n\t\tborder-width: 4px 0 0 0;\n\t\tpadding: 0.9473684211em 0 0;\n\t\twidth: -webkit-calc(50% - 0.736842105em);\n\t\twidth: calc(50% - 0.736842105em);\n\t}\n\n\t.entry-content blockquote:not(.alignleft):not(.alignright),\n\t.entry-summary blockquote,\n\t.comment-content blockquote {\n\t\tmargin-left: -1.473684211em;\n\t}\n\n\t.entry-content blockquote blockquote:not(.alignleft):not(.alignright),\n\t.entry-summary blockquote blockquote,\n\t.comment-content blockquote blockquote {\n\t\tmargin-left: 0;\n\t}\n\n\t.entry-content ul,\n\t.entry-summary ul,\n\t.comment-content ul,\n\t.entry-content ol,\n\t.entry-summary ol,\n\t.comment-content ol {\n\t\tmargin-left: 0;\n\t}\n\n\t.entry-content li > ul,\n\t.entry-summary li > ul,\n\t.comment-content li > ul,\n\t.entry-content blockquote > ul,\n\t.entry-summary blockquote > ul,\n\t.comment-content blockquote > ul {\n\t\tmargin-left: 1.25em;\n\t}\n\n\t.entry-content li > ol,\n\t.entry-summary li > ol,\n\t.comment-content li > ol,\n\t.entry-content blockquote > ol,\n\t.entry-summary blockquote > ol,\n\t.comment-content blockquote > ol {\n\t\tmargin-left: 1.5em;\n\t}\n\n\t.comment-author {\n\t\tmargin-bottom: 0;\n\t}\n\n\t.comment-author .avatar {\n\t\theight: 42px;\n\t\tposition: relative;\n\t\ttop: 0.25em;\n\t\twidth: 42px;\n\t}\n\n\t.comment-list .children > li {\n\t\tpadding-left: 1.75em;\n\t}\n\n\t.comment-list + .comment-respond,\n\t.comment-navigation + .comment-respond {\n\t\tpadding-top: 3.5em;\n\t}\n\n\t.comments-area,\n\t.widget,\n\t.content-bottom-widgets .widget-area {\n\t\tmargin-bottom: 5.25em;\n\t}\n\n\t.sidebar,\n\t.widecolumn {\n\t\tmargin-bottom: 5.25em;\n\t\tpadding-right: 23.0769%;\n\t}\n\n\tbody:not(.search-results) .entry-summary li > ul,\n\tbody:not(.search-results) .entry-summary blockquote > ul {\n\t\tmargin-left: 1.157894737em;\n\t}\n\n\tbody:not(.search-results) .entry-summary li > ol,\n\tbody:not(.search-results) .entry-summary blockquote > ol {\n\t\tmargin-left: 1.473684211em;\n\t}\n}\n\n\n/**\n * 14.2 - >= 783px\n */\n\n@media screen and (min-width: 48.9375em) {\n\tbody:not(.custom-background-image).admin-bar:before {\n\t\ttop: 32px;\n\t}\n}\n\n\n/**\n * 14.3 - >= 910px\n */\n\n@media screen and (min-width: 56.875em) {\n\t.site-header {\n\t\tpadding-right: 4.5455%;\n\t\tpadding-left: 4.5455%;\n\t}\n\n\t.site-header-main {\n\t\t-webkit-align-items: flex-start;\n\t\t-ms-flex-align: start;\n\t\talign-items: flex-start;\n\t}\n\n\t.wp-custom-logo .site-header-main {\n\t\t-webkit-align-items: center;\n\t\t-ms-flex-align: center;\n\t\talign-items: center;\n\t}\n\n\t.site-header-menu {\n\t\tdisplay: block;\n\t\t-webkit-flex: 0 1 auto;\n\t\t-ms-flex: 0 1 auto;\n\t\tflex: 0 1 auto;\n\t}\n\n\t.main-navigation {\n\t\tmargin: 0 -0.875em;\n\t}\n\n\t.main-navigation .primary-menu,\n\t.main-navigation .primary-menu > li {\n\t\tborder: 0;\n\t}\n\n\t.main-navigation .primary-menu > li {\n\t\tfloat: left;\n\t}\n\n\t.main-navigation a {\n\t\toutline-offset: -8px;\n\t\tpadding: 0.65625em 0.875em;\n\t\twhite-space: nowrap;\n\t}\n\n\t.main-navigation li:hover > a,\n\t.main-navigation li.focus > a {\n\t\tcolor: #007acc;\n\t}\n\n\t.main-navigation ul ul {\n\t\tborder-bottom: 1px solid #d1d1d1;\n\t\tdisplay: block;\n\t\tleft: -999em;\n\t\tmargin: 0;\n\t\tposition: absolute;\n\t\tz-index: 99999;\n\t}\n\n\t.main-navigation ul ul ul {\n\t\ttop: -1px;\n\t}\n\n\t.main-navigation ul ul ul:before,\n\t.main-navigation ul ul ul:after {\n\t\tborder: 0;\n\t}\n\n\t.main-navigation ul ul li {\n\t\tbackground-color: #fff;\n\t\tborder: 1px solid #d1d1d1;\n\t\tborder-bottom-width: 0;\n\t}\n\n\t.main-navigation ul ul a {\n\t\twhite-space: normal;\n\t\twidth: 12.6875em;\n\t}\n\n\t.main-navigation ul ul:before,\n\t.main-navigation ul ul:after {\n\t\tborder-style: solid;\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t}\n\n\t.main-navigation ul ul:before {\n\t\tborder-color: #d1d1d1 transparent;\n\t\tborder-width: 0 10px 10px;\n\t\tright: 9px;\n\t\ttop: -9px;\n\t}\n\n\t.main-navigation ul ul:after {\n\t\tborder-color: #fff transparent;\n\t\tborder-width: 0 8px 8px;\n\t\tright: 11px;\n\t\ttop: -7px;\n\t}\n\n\t.main-navigation li:hover > ul,\n\t.main-navigation li.focus > ul {\n\t\tleft: auto;\n\t\tright: 0;\n\t}\n\n\t.main-navigation ul ul li:hover > ul,\n\t.main-navigation ul ul li.focus > ul {\n\t\tleft: auto;\n\t\tright: 100%;\n\t}\n\n\t.main-navigation .menu-item-has-children > a {\n\t\tmargin: 0;\n\t\tpadding-right: 2.25em;\n\t}\n\n\t.main-navigation .menu-item-has-children > a:after {\n\t\tcontent: \"\\F431\";\n\t\tposition: absolute;\n\t\tright: 0.625em;\n\t\ttop: 0.8125em;\n\t}\n\n\t.main-navigation ul ul .menu-item-has-children > a {\n\t\tpadding-right: 2.0625em;\n\t}\n\n\t.main-navigation ul ul .menu-item-has-children > a:after {\n\t\tright: 0.5625em;\n\t\ttop: 0.875em;\n\t\t-webkit-transform: rotate(90deg);\n\t\t-moz-transform: rotate(90deg);\n\t\t-ms-transform: rotate(90deg);\n\t\ttransform: rotate(90deg);\n\t}\n\n\t.dropdown-toggle,\n\t.main-navigation ul .dropdown-toggle.toggled-on,\n\t.menu-toggle,\n\t.site-header .social-navigation,\n\t.site-footer .main-navigation {\n\t\tdisplay: none;\n\t}\n\n\t.site-content {\n\t\tpadding: 0 4.5455%;\n\t}\n\n\t.content-area {\n\t\tfloat: left;\n\t\tmargin-right: -100%;\n\t\twidth: 70%;\n\t}\n\n\t.entry-header,\n\t.post-thumbnail,\n\t.entry-content,\n\t.entry-summary,\n\t.entry-footer,\n\t.comments-area,\n\t.image-navigation,\n\t.post-navigation,\n\t.pagination,\n\t.page-header,\n\t.page-content,\n\t.content-bottom-widgets {\n\t\tmargin-right: 0;\n\t\tmargin-left: 0;\n\t}\n\n\t.sidebar {\n\t\tfloat: left;\n\t\tmargin-left: 75%;\n\t\tpadding: 0;\n\t\twidth: 25%;\n\t}\n\n\t.widget {\n\t\tfont-size: 13px;\n\t\tfont-size: 0.8125rem;\n\t\tline-height: 1.6153846154;\n\t\tmargin-bottom: 3.230769231em;\n\t\tpadding-top: 1.615384615em;\n\t}\n\n\t.widget .widget-title {\n\t\tmargin-bottom: 1.3125em;\n\t}\n\n\t.widget p,\n\t.widget address,\n\t.widget hr,\n\t.widget ul,\n\t.widget ol,\n\t.widget dl,\n\t.widget dd,\n\t.widget table {\n\t\tmargin-bottom: 1.6153846154em;\n\t}\n\n\t.widget li > ul,\n\t.widget li > ol {\n\t\tmargin-bottom: 0;\n\t}\n\n\t.widget blockquote {\n\t\tfont-size: 16px;\n\t\tfont-size: 1rem;\n\t\tline-height: 1.3125;\n\t\tmargin-bottom: 1.3125em;\n\t\tpadding-left: 1.0625em;\n\t}\n\n\t.widget blockquote cite,\n\t.widget blockquote small {\n\t\tfont-size: 13px;\n\t\tfont-size: 0.8125rem;\n\t\tline-height: 1.6153846154;\n\t}\n\n\t.widget th,\n\t.widget td {\n\t\tpadding: 0.5384615385em;\n\t}\n\n\t.widget pre {\n\t\tfont-size: 13px;\n\t\tfont-size: 0.8125rem;\n\t\tline-height: 1.6153846154;\n\t\tmargin-bottom: 1.6153846154em;\n\t\tpadding: 0.5384615385em;\n\t}\n\n\t.widget fieldset {\n\t\tmargin-bottom: 1.6153846154em;\n\t\tpadding: 0.5384615385em;\n\t}\n\n\t.widget button,\n\t.widget input,\n\t.widget select,\n\t.widget textarea {\n\t\tfont-size: 13px;\n\t\tfont-size: 0.8125rem;\n\t\tline-height: 1.6153846154;\n\t}\n\n\t.widget button,\n\t.widget input[type=\"button\"],\n\t.widget input[type=\"reset\"],\n\t.widget input[type=\"submit\"] {\n\t\tline-height: 1;\n\t\tpadding: 0.846153846em;\n\t}\n\n\t.widget input[type=\"date\"],\n\t.widget input[type=\"time\"],\n\t.widget input[type=\"datetime-local\"],\n\t.widget input[type=\"week\"],\n\t.widget input[type=\"month\"],\n\t.widget input[type=\"text\"],\n\t.widget input[type=\"email\"],\n\t.widget input[type=\"url\"],\n\t.widget input[type=\"password\"],\n\t.widget input[type=\"search\"],\n\t.widget input[type=\"tel\"],\n\t.widget input[type=\"number\"],\n\t.widget textarea {\n\t\tpadding: 0.4615384615em 0.5384615385em;\n\t}\n\n\t.widget h1 {\n\t\tfont-size: 23px;\n\t\tfont-size: 1.4375rem;\n\t\tline-height: 1.2173913043;\n\t\tmargin-bottom: 0.9130434783em;\n\t}\n\n\t.widget h2 {\n\t\tfont-size: 19px;\n\t\tfont-size: 1.1875rem;\n\t\tline-height: 1.1052631579;\n\t\tmargin-bottom: 1.1052631579em;\n\t}\n\n\t.widget h3 {\n\t\tfont-size: 16px;\n\t\tfont-size: 1rem;\n\t\tline-height: 1.3125;\n\t\tmargin-bottom: 1.3125em;\n\t}\n\n\t.widget h4,\n\t.widget h5,\n\t.widget h6 {\n\t\tfont-size: 13px;\n\t\tfont-size: 0.8125rem;\n\t\tline-height: 1.6153846154;\n\t\tmargin-bottom: 0.9130434783em;\n\t}\n\n\t.widget .alignleft {\n\t\tmargin: 0.2307692308em 1.6153846154em 1.6153846154em 0;\n\t}\n\n\t.widget .alignright {\n\t\tmargin: 0.2307692308em 0 1.6153846154em 1.6153846154em;\n\t}\n\n\t.widget .aligncenter {\n\t\tmargin-bottom: 1.6153846154em;\n\t}\n\n\t.widget_calendar td,\n\t.widget_calendar th {\n\t\tline-height: 2.6923076923;\n\t\tpadding: 0;\n\t}\n\n\t.widget_rss .rssSummary:last-child {\n\t\tmargin-bottom: 1.615384615em;\n\t}\n\n\t.widget input[type=\"search\"].search-field {\n\t\twidth: -webkit-calc(100% - 35px);\n\t\twidth: calc(100% - 35px);\n\t}\n\n\t.widget .search-submit:before {\n\t\tfont-size: 16px;\n\t\tleft: 1px;\n\t\tline-height: 35px;\n\t\twidth: 34px;\n\t}\n\n\t.widget button.search-submit {\n\t\tpadding: 0;\n\t\twidth: 35px;\n\t}\n\n\t.tagcloud a {\n\t\tmargin: 0 0.2307692308em 0.5384615385em 0;\n\t\tpadding: 0.5384615385em 0.4615384615em 0.4615384615em;\n\t}\n\n\t.textwidget h1 {\n\t\tmargin-top: 1.8260869565em;\n\t}\n\n\t.textwidget h2 {\n\t\tmargin-top: 2.2105263158em;\n\t}\n\n\t.textwidget h3 {\n\t\tmargin-top: 2.625em;\n\t}\n\n\t.textwidget h4 {\n\t\tletter-spacing: 0.153846154em;\n\t}\n\n\t.textwidget h4,\n\t.textwidget h5,\n\t.textwidget h6 {\n\t\tmargin-top: 3.2307692308em;\n\t}\n\n\t.content-bottom-widgets .widget-area:nth-child(1):nth-last-child(2),\n\t.content-bottom-widgets .widget-area:nth-child(2):nth-last-child(1) {\n\t\tfloat: left;\n\t\tmargin-right: 7.1428571%;\n\t\twidth: 46.42857145%;\n\t}\n\n\t.content-bottom-widgets .widget-area:nth-child(2):nth-last-child(1):last-of-type {\n\t\tmargin-right: 0;\n\t}\n\n\t.site-footer {\n\t\t-webkit-align-items: center;\n\t\t-ms-flex-align: center;\n\t\talign-items: center;\n\t\tdisplay: -webkit-flex;\n\t\tdisplay: -ms-flexbox;\n\t\tdisplay: flex;\n\t\t-webkit-flex-wrap: wrap;\n\t\t-ms-flex-wrap: wrap;\n\t\tflex-wrap: wrap;\n\t\tpadding: 0 4.5455% 3.5em;\n\t}\n\n\t.site-footer .social-navigation {\n\t\tmargin: 0;\n\t\t-webkit-order: 2;\n\t\t-ms-flex-order: 2;\n\t\torder: 2;\n\t}\n\n\t.site-info {\n\t\tmargin: 0.538461538em auto 0.538461538em 0;\n\t\t-webkit-order: 1;\n\t\t-ms-flex-order: 1;\n\t\torder: 1;\n\t}\n\n\t.no-sidebar .content-area {\n\t\tfloat: none;\n\t\tmargin: 0;\n\t\twidth: 100%;\n\t}\n\n\t.no-sidebar .entry-header,\n\t.no-sidebar .entry-content,\n\t.no-sidebar .entry-summary,\n\t.no-sidebar .entry-footer,\n\t.no-sidebar .comments-area,\n\t.no-sidebar .image-navigation,\n\t.no-sidebar .post-navigation,\n\t.no-sidebar .pagination,\n\t.no-sidebar .page-header,\n\t.no-sidebar .page-content,\n\t.no-sidebar .content-bottom-widgets {\n\t\tmargin-right: 15%;\n\t\tmargin-left: 15%;\n\t}\n\n\t.widecolumn {\n\t\tpadding-right: 15%;\n\t\tpadding-left: 15%;\n\t}\n}\n\n\n/**\n * 14.4 - >= 985px\n */\n\n@media screen and (min-width: 61.5625em) {\n\t.site-main {\n\t\tmargin-bottom: 7.0em;\n\t}\n\n\t.site-header {\n\t\tpadding: 5.25em 4.5455%;\n\t}\n\n\t.site-branding,\n\t.site-header-menu,\n\t.header-image {\n\t\tmargin-top: 1.75em;\n\t\tmargin-bottom: 1.75em;\n\t}\n\n\t.custom-logo {\n\t\tmax-width: 240px;\n\t}\n\n\t.image-navigation {\n\t\tmargin-bottom: 3.230769231em;\n\t}\n\n\t.post-navigation {\n\t\tmargin-bottom: 7.0em;\n\t}\n\n\t.pagination {\n\t\tmargin-bottom: 5.894736842em;\n\t}\n\n\t.widget {\n\t\tmargin-bottom: 4.307692308em;\n\t}\n\n\t.site-main > article {\n\t\tmargin-bottom: 7.0em;\n\t}\n\n\t.entry-title {\n\t\tfont-size: 40px;\n\t\tfont-size: 2.5rem;\n\t\tline-height: 1.225;\n\t\tmargin-bottom: 1.05em;\n\t}\n\n\t.format-aside .entry-title,\n\t.format-image .entry-title,\n\t.format-video .entry-title,\n\t.format-quote .entry-title,\n\t.format-gallery .entry-title,\n\t.format-status .entry-title,\n\t.format-link .entry-title,\n\t.format-audio .entry-title,\n\t.format-chat .entry-title {\n\t\tfont-size: 23px;\n\t\tfont-size: 1.4375em;\n\t\tline-height: 1.304347826;\n\t\tmargin-bottom: 1.826086957em;\n\t}\n\n\t.post-thumbnail {\n\t\tmargin-bottom: 2.625em;\n\t}\n\n\t.entry-content h1,\n\t.entry-summary h1,\n\t.comment-content h1 {\n\t\tfont-size: 33px;\n\t\tfont-size: 2.0625rem;\n\t\tline-height: 1.2727272727;\n\t\tmargin-top: 1.696969697em;\n\t\tmargin-bottom: 0.8484848485em;\n\t}\n\n\t.entry-content h2,\n\t.entry-summary h2,\n\t.comment-content h2 {\n\t\tfont-size: 28px;\n\t\tfont-size: 1.75rem;\n\t\tline-height: 1.25;\n\t\tmargin-top: 2em;\n\t\tmargin-bottom: 1em;\n\t}\n\n\t.entry-content h3,\n\t.entry-summary h3,\n\t.comment-content h3 {\n\t\tfont-size: 23px;\n\t\tfont-size: 1.4375rem;\n\t\tline-height: 1.2173913043;\n\t\tmargin-top: 2.4347826087em;\n\t\tmargin-bottom: 1.2173913043em;\n\t}\n\n\t.entry-content h4,\n\t.entry-summary h4,\n\t.entry-intro h4,\n\t.comment-content h4 {\n\t\tletter-spacing: 0.131578947em;\n\t}\n\n\t.entry-content h4,\n\t.entry-content h5,\n\t.entry-content h6,\n\t.entry-summary h4,\n\t.entry-summary h5,\n\t.entry-summary h6,\n\t.comment-content h4,\n\t.comment-content h5,\n\t.comment-content h6 {\n\t\tfont-size: 19px;\n\t\tfont-size: 1.1875rem;\n\t\tline-height: 1.1052631579;\n\t\tmargin-top: 2.9473684211em;\n\t\tmargin-bottom: 1.473684211em;\n\t}\n\n\t.author-info {\n\t\tborder-bottom-width: 0;\n\t\tpadding-bottom: 0;\n\t}\n\n\t.comment-list + .comment-respond,\n\t.comment-navigation + .comment-respond {\n\t\tpadding-top: 5.25em;\n\t}\n\n\t.comments-area,\n\t.sidebar,\n\t.content-bottom-widgets .widget-area,\n\t.widecolumn {\n\t\tmargin-bottom: 7.0em;\n\t}\n\n\tbody:not(.search-results) .entry-summary {\n\t\tmargin-bottom: 2.210526316em;\n\t}\n\n\tbody:not(.search-results) .entry-header + .entry-summary {\n\t\tmargin-top: -1.105263158em;\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) .entry-content {\n\t\tfloat: right;\n\t\twidth: 71.42857144%;\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) .entry-content > blockquote.alignleft.below-entry-meta {\n\t\tmargin-left: -40%;\n\t\twidth: -webkit-calc(60% - 1.4736842105em);\n\t\twidth: calc(60% - 1.4736842105em);\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) img.below-entry-meta,\n\tbody:not(.search-results) article:not(.type-page) figure.below-entry-meta {\n\t\tclear: both;\n\t\tdisplay: block;\n\t\tfloat: none;\n\t\tmargin-right: 0;\n\t\tmargin-left: -40%;\n\t\tmax-width: 140%;\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) figure.below-entry-meta img.below-entry-meta,\n\tbody:not(.search-results) article:not(.type-page) table figure.below-entry-meta,\n\tbody:not(.search-results) article:not(.type-page) table img.below-entry-meta {\n\t\tmargin: 0;\n\t\tmax-width: 100%;\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) .entry-footer {\n\t\tfloat: left;\n\t\tmargin-top: 0.1538461538em;\n\t\twidth: 21.42857143%;\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) .entry-footer > span:not(:last-child):after {\n\t\tdisplay: none;\n\t}\n\n\t.single .byline,\n\t.full-size-link,\n\tbody:not(.search-results).group-blog .byline,\n\tbody:not(.search-results) .entry-format,\n\tbody:not(.search-results) .cat-links,\n\tbody:not(.search-results) .tags-links,\n\tbody:not(.search-results) article:not(.sticky) .posted-on,\n\tbody:not(.search-results) article:not(.type-page) .comments-link,\n\tbody:not(.search-results) article:not(.type-page) .entry-footer .edit-link {\n\t\tdisplay: block;\n\t\tmargin-bottom: 0.5384615385em;\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) .entry-footer > span:last-child {\n\t\tmargin-bottom: 0;\n\t}\n\n\tbody:not(.search-results) article:not(.type-page) .entry-footer .avatar {\n\t\tdisplay: block;\n\t\theight: auto;\n\t\tmargin: 0 0 0.5384615385em;\n\t\twidth: 49px;\n\t}\n\n\tbody.no-sidebar:not(.search-results) article:not(.type-page) .entry-content {\n\t\tfloat: left;\n\t\tmargin-right: -100%;\n\t\tmargin-left: 34.99999999%;\n\t\twidth: 50.00000001%;\n\t}\n\n\tbody.no-sidebar:not(.search-results) article:not(.type-page) .entry-footer {\n\t\tmargin-right: -100%;\n\t\tmargin-left: 15%;\n\t\twidth: 15%;\n\t}\n}\n\n\n/**\n * 14.5 - >= 1200px\n */\n\n@media screen and (min-width: 75em) {\n\tbody:not(.search-results) .entry-summary {\n\t\tfont-size: 23px;\n\t\tfont-size: 1.4375rem;\n\t\tline-height: 1.5217391304;\n\t\tmargin-bottom: 1.826086957em;\n\t}\n\n\tbody:not(.search-results) .entry-header + .entry-summary {\n\t\tmargin-top: -0.913043478em;\n\t}\n\n\tbody:not(.search-results) .entry-summary p,\n\tbody:not(.search-results) .entry-summary address,\n\tbody:not(.search-results) .entry-summary hr,\n\tbody:not(.search-results) .entry-summary ul,\n\tbody:not(.search-results) .entry-summary ol,\n\tbody:not(.search-results) .entry-summary dl,\n\tbody:not(.search-results) .entry-summary dd,\n\tbody:not(.search-results) .entry-summary table {\n\t\tmargin-bottom: 1.5217391304em;\n\t}\n\n\tbody:not(.search-results) .entry-summary li > ul,\n\tbody:not(.search-results) .entry-summary blockquote > ul {\n\t\tmargin-left: 0.956521739em;\n\t}\n\n\tbody:not(.search-results) .entry-summary li > ol,\n\tbody:not(.search-results) .entry-summary blockquote > ol {\n\t\tmargin-left: 1.52173913em;\n\t}\n\n\tbody:not(.search-results) .entry-summary blockquote {\n\t\tfont-size: 23px;\n\t\tfont-size: 1.4375rem;\n\t\tline-height: 1.5217391304;\n\t\tmargin: 0 0 1.5217391304em;\n\t\tpadding-left: 1.347826087em;\n\t}\n\n\tbody:not(.search-results) .entry-summary blockquote:not(.alignleft):not(.alignright) {\n\t\tmargin-left: -1.52173913em;\n\t}\n\n\tbody:not(.search-results) .entry-summary blockquote blockquote:not(.alignleft):not(.alignright) {\n\t\tmargin-left: 0;\n\t}\n\n\tbody:not(.search-results) .entry-summary blockquote cite,\n\tbody:not(.search-results) .entry-summary blockquote small {\n\t\tfont-size: 19px;\n\t\tfont-size: 1.1875rem;\n\t\tline-height: 1.8421052632;\n\t}\n\n\tbody:not(.search-results) .entry-summary th,\n\tbody:not(.search-results) .entry-summary td {\n\t\tpadding: 0.3043478261em;\n\t}\n\n\tbody:not(.search-results) .entry-summary pre {\n\t\tfont-size: 16px;\n\t\tfont-size: 1rem;\n\t\tline-height: 1.75;\n\t\tmargin-bottom: 1.75em;\n\t\tpadding: 1.75em;\n\t}\n\n\tbody:not(.search-results) .entry-summary fieldset {\n\t\tmargin-bottom: 1.5217391304em;\n\t\tpadding: 0.3043478261em;\n\t}\n\n\tbody:not(.search-results) .entry-summary h1 {\n\t\tmargin-top: 2.121212121em;\n\t\tmargin-bottom: 1.060606061em;\n\t}\n\n\tbody:not(.search-results) .entry-summary h2 {\n\t\tmargin-top: 2.5em;\n\t\tmargin-bottom: 1.25em;\n\t}\n\n\tbody:not(.search-results) .entry-summary h3 {\n\t\tmargin-top: 3.043478261em;\n\t\tmargin-bottom: 1.52173913em;\n\t}\n\n\tbody:not(.search-results) .entry-summary h4,\n\tbody:not(.search-results) .entry-summary h5,\n\tbody:not(.search-results) .entry-summary h6 {\n\t\tmargin-top: 3.684210526em;\n\t\tmargin-bottom: 1.842105263em;\n\t}\n\n\tbody:not(.search-results) .entry-summary h1:first-child,\n\tbody:not(.search-results) .entry-summary h2:first-child,\n\tbody:not(.search-results) .entry-summary h3:first-child,\n\tbody:not(.search-results) .entry-summary h4:first-child,\n\tbody:not(.search-results) .entry-summary h5:first-child,\n\tbody:not(.search-results) .entry-summary h6:first-child {\n\t\tmargin-top: 0;\n\t}\n\n\tbody:not(.search-results) .entry-summary .alignleft {\n\t\tmargin: 0.2608695652em 1.5217391304em 1.5217391304em 0;\n\t}\n\n\tbody:not(.search-results) .entry-summary .alignright {\n\t\tmargin: 0.2608695652em 0 1.5217391304em 1.5217391304em;\n\t}\n\n\tbody:not(.search-results) .entry-summary .aligncenter {\n\t\tmargin-bottom: 1.5217391304em;\n\t}\n}\n\n\n/**\n * 15.0 - Print\n */\n\n@media print {\n\tform,\n\tbutton,\n\tinput,\n\tselect,\n\ttextarea,\n\t.navigation,\n\t.main-navigation,\n\t.social-navigation,\n\t.sidebar,\n\t.content-bottom-widgets,\n\t.header-image,\n\t.page-links,\n\t.edit-link,\n\t.comment-respond,\n\t.comment-edit-link,\n\t.comment-reply-link,\n\t.comment-metadata .edit-link,\n\t.pingback .edit-link {\n\t\tdisplay: none;\n\t}\n\n\tbody,\n\tblockquote cite,\n\tblockquote small,\n\tpre,\n\t.entry-content h4,\n\t.entry-content h5,\n\t.entry-content h6,\n\t.entry-summary h4,\n\t.entry-summary h5,\n\t.entry-summary h6,\n\t.comment-content h4,\n\t.comment-content h5,\n\t.comment-content h6,\n\t.entry-content .author-title {\n\t\tfont-size: 12pt;\n\t}\n\n\tblockquote {\n\t\tfont-size: 14.25pt;\n\t}\n\n\t.site-title,\n\t.page-title,\n\t.comments-title,\n\t.entry-content h2,\n\t.entry-summary h2,\n\t.comment-content h2,\n\t.widecolumn h2 {\n\t\tfont-size: 17.25pt;\n\t}\n\n\t.site-description {\n\t\tdisplay: block;\n\t}\n\n\t.entry-title {\n\t\tfont-size: 24.75pt;\n\t\tline-height: 1.2727272727;\n\t\tmargin-bottom: 1.696969697em;\n\t}\n\n\t.format-aside .entry-title,\n\t.format-image .entry-title,\n\t.format-video .entry-title,\n\t.format-quote .entry-title,\n\t.format-gallery .entry-title,\n\t.format-status .entry-title,\n\t.format-link .entry-title,\n\t.format-audio .entry-title,\n\t.format-chat .entry-title {\n\t\tfont-size: 17.25pt;\n\t\tline-height: 1.304347826;\n\t\tmargin-bottom: 1.826086957em;\n\t}\n\n\t.entry-content h1,\n\t.entry-summary h1,\n\t.comment-content h1 {\n\t\tfont-size: 21pt;\n\t}\n\n\t.entry-content h3,\n\t.entry-summary h3,\n\t.comment-content h3,\n\tbody:not(.search-results) .entry-summary {\n\t\tfont-size: 14.25pt;\n\t}\n\n\t.site-description,\n\t.author-bio,\n\t.entry-footer,\n\t.sticky-post,\n\t.taxonomy-description,\n\t.entry-caption,\n\t.comment-metadata,\n\t.comment-notes,\n\t.comment-awaiting-moderation,\n\t.site-info,\n\t.wp-caption .wp-caption-text,\n\t.gallery-caption {\n\t\tfont-size: 9.75pt;\n\t}\n\n\tbody,\n\t.site {\n\t\tbackground: none !important; /* Brute force since user agents all print differently. */\n\t}\n\n\tbody,\n\tblockquote cite,\n\tblockquote small,\n\t.site-branding .site-title a,\n\t.entry-title a,\n\t.comment-author {\n\t\tcolor: #1a1a1a !important; /* Make sure color schemes don't affect to print */\n\t}\n\n\tblockquote,\n\t.page-header,\n\t.comments-title {\n\t\tborder-color: #1a1a1a !important; /* Make sure color schemes don't affect to print */\n\t}\n\n\tblockquote,\n\t.site-description,\n\tbody:not(.search-results) .entry-summary,\n\tbody:not(.search-results) .entry-summary blockquote,\n\t.author-bio,\n\t.entry-footer,\n\t.entry-footer a,\n\t.sticky-post,\n\t.taxonomy-description,\n\t.entry-caption,\n\t.comment-author,\n\t.comment-metadata a,\n\t.comment-notes,\n\t.comment-awaiting-moderation,\n\t.site-info,\n\t.site-info a,\n\t.wp-caption .wp-caption-text,\n\t.gallery-caption {\n\t\tcolor: #686868 !important; /* Make sure color schemes don't affect to print */\n\t}\n\n\tcode,\n\thr {\n\t\tbackground-color: #d1d1d1 !important; /* Make sure color schemes don't affect to print */\n\t}\n\n\tpre,\n\tabbr,\n\tacronym,\n\ttable,\n\tth,\n\ttd,\n\t.author-info,\n\t.comment-list article,\n\t.comment-list .pingback,\n\t.comment-list .trackback,\n\t.no-comments {\n\t\tborder-color: #d1d1d1 !important; /* Make sure color schemes don't affect to print */\n\t}\n\n\ta {\n\t\tcolor: #007acc !important; /* Make sure color schemes don't affect to print */\n\t}\n\n\t.entry-content a,\n\t.entry-summary a,\n\t.taxonomy-description a,\n\t.comment-content a,\n\t.pingback .comment-body > a {\n\t\tbox-shadow: none;\n\t\tborder-bottom: 1px solid #007acc !important; /* Make sure color schemes don't affect to print */\n\t}\n\n\t.site {\n\t\tmargin: 5%;\n\t}\n\n\t.site-inner {\n\t\tmax-width: none;\n\t}\n\n\t.site-header {\n\t\tpadding: 0 0 1.75em;\n\t}\n\n\t.site-branding {\n\t\tmargin-top: 0;\n\t\tmargin-bottom: 1.75em;\n\t}\n\n\t.site-main {\n\t\tmargin-bottom: 3.5em;\n\t}\n\n\t.entry-header,\n\t.entry-footer,\n\t.page-header,\n\t.page-content,\n\t.entry-content,\n\t.entry-summary,\n\t.post-thumbnail,\n\t.comments-area {\n\t\tmargin-right: 0;\n\t\tmargin-left: 0;\n\t}\n\n\t.post-thumbnail,\n\t.site-main > article {\n\t\tmargin-bottom: 3.5em;\n\t}\n\n\t.entry-content blockquote.alignleft,\n\t.entry-content blockquote.alignright {\n\t\tborder-width: 4px 0 0 0;\n\t\tpadding: 0.9473684211em 0 0;\n\t\twidth: -webkit-calc(50% - 0.736842105em);\n\t\twidth: calc(50% - 0.736842105em);\n\t}\n\n\tbody:not(.search-results) .entry-header + .entry-summary {\n\t\tmargin-top: -1.473684211em;\n\t}\n\n\t.site-footer,\n\t.widecolumn {\n\t\tpadding: 0;\n\t}\n}\n", ""]);

// exports


/***/ })
/******/ ]);