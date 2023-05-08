// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3mPmv":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a25e589c66234a52";
module.bundle.HMR_BUNDLE_ID = "98384474b62c4310";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"zQOKN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Game", ()=>Game);
var _utils = require("./utils");
var _mapgen = require("./engine/mapgen");
class Game {
    constructor(dimensions){
        this.dimensions = dimensions;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.simpleMap = new (0, _mapgen.WalkerGenerator)(new (0, _utils.Vec2D)(50, 50), this.ctx, 10, 0.4, 5, true, this);
    }
    draw(position, dimensions, image, imgSrcPos, imgSrcDim) {
        //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        image == null ? this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y) : this.ctx.drawImage(image, imgSrcPos.x, imgSrcPos.y, imgSrcDim.x, imgSrcDim.y, position.x, position.y, dimensions.x, dimensions.y);
    }
}
const DIMENSIONS = new (0, _utils.Vec2D)(innerHeight / 6 * 5);
const GAME = new Game(DIMENSIONS);
addEventListener("click", (e)=>{
    if (e.target == document.getElementById("generateMap")) GAME.simpleMap.initMap();
});

},{"./utils":"52QlR","./engine/mapgen":"3c3Dr","@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"52QlR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vec2D", ()=>Vec2D);
parcelHelpers.export(exports, "Direction2D", ()=>Direction2D);
class Vec2D {
    constructor(x, y){
        this.x = x;
        // If y is not defined, set y to x
        this.y = y ?? x;
    }
    static add(vec1, vec2) {
        return new Vec2D(vec1.x + vec2.x, vec1.y + vec2.y);
    }
}
class Direction2D {
    static cardinalDirections = [
        new Vec2D(0, 1),
        new Vec2D(0, -1),
        new Vec2D(1, 0),
        new Vec2D(-1, 0)
    ];
    static getRandomDirection() {
        return this.cardinalDirections[Math.ceil(Math.random() * 4 - 1)];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"b4oyH":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3c3Dr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TileType", ()=>TileType);
parcelHelpers.export(exports, "WalkerGenerator", ()=>WalkerGenerator);
var _utils = require("../utils");
let TileType;
(function(TileType) {
    TileType[TileType["Empty"] = 0] = "Empty";
    TileType[TileType["Floor"] = 1] = "Floor";
    TileType[TileType["Sand"] = 2] = "Sand";
    TileType[TileType["Water"] = 3] = "Water";
})(TileType || (TileType = {}));
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
class WalkerObject {
    constructor(position, direction, chanceToChange){
        this.position = position;
        this.direction = direction;
        this.chanceToChange = chanceToChange;
    }
}
class WalkerGenerator {
    constructor(mapDimensions, ctx, maxWalkers, fillPercentage, waitTime, visualise = false, game){
        this.mapDimensions = mapDimensions;
        this.maxWalkers = maxWalkers;
        this.fillPercentage = fillPercentage;
        this.waitTime = waitTime;
        this.ctx = ctx;
        this.visualise = visualise;
        this.running = false;
        this.game = game;
    }
    // Initialize the map
    initMap() {
        this.map = [];
        this.walkers = [];
        this.tileCount = 0;
        // Initialize map
        for(let i = 0; i < this.mapDimensions.x; i++){
            this.map[i] = [];
            for(let j = 0; j < this.mapDimensions.y; j++)this.map[i][j] = TileType.Empty;
        }
        // Initial walker
        this.walkers.push(new WalkerObject(new (0, _utils.Vec2D)(Math.floor(this.mapDimensions.x / 2), Math.floor(this.mapDimensions.y / 2)), (0, _utils.Direction2D).getRandomDirection(), 0.5));
        let curWalker = this.walkers[0];
        this.map[curWalker.position.x][curWalker.position.y] = TileType.Floor;
        this.tileCount++;
        this.running = true;
        if (!this.visualise) this.loading();
        this.tick();
    }
    // Tick the map generation
    tick() {
        // Tick every waitTime milliseconds
        /*console.log("tick")*/ // If the map is not filled
        if (!(this.tileCount / (this.mapDimensions.x * this.mapDimensions.y) < this.fillPercentage)) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.running = false;
            this.makeSand(this.ctx);
            this.makeWater(this.ctx);
            this.draw(this.ctx);
            console.log("done");
            return;
        }
        // For every walker
        for (let walker of this.walkers)// Make the walker create a floor tile where it is
        if (this.map[walker.position.x][walker.position.y] == TileType.Empty) {
            this.map[walker.position.x][walker.position.y] = TileType.Floor;
            this.tileCount++;
        }
        // Update walkers
        this.chanceToRemove();
        this.changeDirection();
        this.chanceToCreate();
        this.updatePosition();
        if (this.visualise) this.draw(this.ctx);
        sleep(this.waitTime).then(()=>this.tick());
    }
    // Draw the map
    draw(ctx) {
        //console.log("draw")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++){
            let position = new (0, _utils.Vec2D)(Math.floor(this.ctx.canvas.width / this.mapDimensions.x * i), Math.floor(this.ctx.canvas.height / this.mapDimensions.y * j));
            let dimensions = new (0, _utils.Vec2D)(Math.ceil(this.ctx.canvas.width / this.mapDimensions.x), Math.ceil(this.ctx.canvas.height / this.mapDimensions.y));
            if (this.map[i][j] == TileType.Floor) {
                if (this.running) {
                    this.game.draw(position, dimensions, document.getElementById("tilesheet"), new (0, _utils.Vec2D)(0, 32), new (0, _utils.Vec2D)(32, 32));
                    continue;
                }
                let rand = Math.random();
                rand < 0.1 ? this.game.draw(position, dimensions, document.getElementById("tilesheet"), new (0, _utils.Vec2D)(32, 0), new (0, _utils.Vec2D)(32, 32)) : rand < 0.25 ? this.game.draw(position, dimensions, document.getElementById("tilesheet"), new (0, _utils.Vec2D)(0, 0), new (0, _utils.Vec2D)(32, 32)) : this.game.draw(position, dimensions, document.getElementById("tilesheet"), new (0, _utils.Vec2D)(0, 32), new (0, _utils.Vec2D)(32, 32));
                continue;
            //this.ctx.fillStyle = "#68b547";
            } else if (this.map[i][j] == TileType.Sand) {
                this.game.draw(position, new (0, _utils.Vec2D)(32, 32), document.getElementById("tilesheet"), new (0, _utils.Vec2D)(32, 32), new (0, _utils.Vec2D)(32, 32));
                continue;
            //this.ctx.fillStyle = "#bab473";
            } else if (this.map[i][j] == TileType.Water) this.ctx.fillStyle = "#377";
            else this.ctx.fillStyle = "#000";
            this.game.draw(position, dimensions);
        }
    }
    // Check if surrounding tiles are floor tiles
    checkSurroundingTiles(x, y) {
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++)if (this.map[x + i] != undefined && this.map[x + i][y + j] != undefined) {
                if (this.map[x + i][y + j] == TileType.Floor) return true;
            }
        }
    }
    makeSand(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        /* let add = (lhs, rhs) => {return lhs + rhs} */ for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++){
            if (this.map[i][j] != TileType.Empty) continue;
            if (this.checkSurroundingTiles(i, j)) this.map[i][j] = TileType.Sand;
        }
    }
    makeWater(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for(let i = 0; i < this.mapDimensions.x; i++){
            for(let j = 0; j < this.mapDimensions.y; j++)if (this.map[i][j] == TileType.Empty) this.map[i][j] = TileType.Water;
        }
    }
    // Move the walker one step in the direction it's facing
    updatePosition() {
        //console.log("updateposition")
        for(let i = 0; i < this.walkers.length; i++){
            let walker = this.walkers[i];
            // Move walker
            walker.position.x += walker.direction.x;
            walker.position.y += walker.direction.y;
            // Check if walker is out of bounds
            walker.position.x = walker.position.x > this.mapDimensions.x - 1 ? 0 : walker.position.x < 0 ? this.mapDimensions.x - 1 : walker.position.x;
            walker.position.y = walker.position.y > this.mapDimensions.y - 1 ? 0 : walker.position.y < 0 ? this.mapDimensions.y - 1 : walker.position.y;
        }
    }
    // Chance to change the direction that the walker is facing
    changeDirection() {
        //console.log("changedirection")
        // For every walker
        for (let walker of this.walkers)// If the walker is going to change direction
        if (Math.random() < walker.chanceToChange) /* 0 = up, 1 = right, 2 = down, 3 = left */ // Change direction
        walker.direction = (0, _utils.Direction2D).getRandomDirection();
    }
    // Chance to create a new walker
    chanceToCreate() {
        //console.log("chancetocreate")
        for (let walker of this.walkers)if (Math.random() < walker.chanceToChange && this.walkers.length < this.maxWalkers) {
            // Set new walker's position and direction
            let newPosition = new (0, _utils.Vec2D)(walker.position.x, walker.position.y);
            let newDirection = (0, _utils.Direction2D).getRandomDirection();
            // Add new walker
            this.walkers.push(new WalkerObject(newPosition, newDirection, walker.chanceToChange));
        }
    }
    // Chance to remove a walker
    chanceToRemove() {
        //console.log("chancetoremove")
        for (let walker of this.walkers)if (Math.random() < walker.chanceToChange && this.walkers.length > 1) this.walkers.splice(this.walkers.indexOf(walker), 1);
    }
    loading() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = "30px Roboto Mono";
        this.ctx.fillStyle = "#cbb";
        this.ctx.fillText("Generating map...", 25, 50);
    }
}

},{"../utils":"52QlR","@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}]},["3mPmv","zQOKN"], "zQOKN", "parcelRequire94c2")

