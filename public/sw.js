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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/sw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/sw.js":
/*!**********************!*\
  !*** ./src/js/sw.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const name = 'tuny';\nconst version = '0.1.1';\nconst cacheName = `${name}-${version}`;\n\nconst runtime = [\n    './index.html',\n    './img/logo-small.png'\n];\nself.addEventListener('install', event => {\n    console.log('The service worker is being installed.');\n\n    event.waitUntil(\n        caches.open(cacheName).then(cache => {\n            console.log('CACHE FILL', runtime);\n            return cache.addAll(runtime);\n        })\n    );\n});\n\nself.addEventListener('fetch', event => {\n    event.respondWith(\n        caches.open(cacheName).then(cache => {\n            return cache.match(event.request).then(function(matching) {\n                if (matching) {\n\n                    console.log('CACHE HIT', event.request.url);\n                    return matching;\n                }\n\n                console.log('CACHE MISS', event.request.url);\n\n                //clone the reuest\n                const fetchRequest = event.request.clone();\n                return fetch(fetchRequest).then(response => {\n\n                    // Check if we received a valid response\n                    if (!response || response.status !== 200 || response.type !== 'basic') {\n                        return response;\n                    }\n\n                    // clone the response too\n                    console.log('CACHE ADD', event.request.url);\n                    cache.put(event.request, response.clone());\n\n                    return response;\n                });\n            });\n        })\n    );\n});\n\n\nself.addEventListener('activate', event => {\n    event.waitUntil(\n        caches.keys().then(cacheNames => {\n            return Promise.all(\n                cacheNames.filter(name => {\n                    const tokens = name.split('-');\n                    return tokens.length !== 2 || tokens[1] !== version;\n                })\n                .map(name => {\n                    console.log('CACHE REMOVE', name);\n                    return caches.delete(name);\n                })\n            );\n        })\n    );\n});\n\n\n//# sourceURL=webpack:///./src/js/sw.js?");

/***/ })

/******/ });