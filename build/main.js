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
/* main.ts
    * Main game file
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GameState", ()=>GameState);
parcelHelpers.export(exports, "Game", ()=>Game);
var _utils = require("./utils");
var _map = require("./engine/map");
var _ecs = require("./ecs/ecs");
var _render = require("./ecs/systems/render");
var _playermove = require("./ecs/systems/playermove");
var _components = require("./ecs/components");
var _assetloader = require("./engine/assetloader");
var _packageJson = require("../package.json");
let GameState;
(function(GameState) {
    GameState[GameState["Loading"] = 0] = "Loading";
    GameState[GameState["Running"] = 1] = "Running";
    GameState[GameState["Menu"] = 2] = "Menu";
    GameState[GameState["Info"] = 3] = "Info";
    GameState[GameState["Paused"] = 4] = "Paused";
})(GameState || (GameState = {}));
class Game {
    frames = 0;
    stop = false;
    constructor(dimensions, assets, visualiseMap = false, onlyMap = visualiseMap){
        this.dimensions = dimensions;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;
        this.playerSize = new (0, _utils.Vec2D)(this.canvas.width / 10);
        this.assets = assets;
        this.state = GameState.Menu;
        this.loadingStatus = "";
        this.ctx.imageSmoothingEnabled = false;
        this.visualiseMap = visualiseMap;
        this.onlyMap = onlyMap;
    }
    // Initialize the game
    init() {
        this.frames = 0;
        this.stop = true;
        this.tick();
        this.stop = false;
        this.mapDimensions = new (0, _utils.Vec2D)(16);
        this.initECS().then(()=>this.generateMap().then(()=>{
                this.mapOffset = new (0, _utils.Vec2D)(this.canvas.width / 2 - this.map.tileSize.x * this.mapDimensions.x / 2);
            }));
    }
    // Initialize ECS and the player entity
    initECS() {
        return new Promise((resolve)=>{
            this.ecs = new _ecs.ECS();
            this.loadingStatus = "Loading player";
            this.ecs.addEntity(new (0, _ecs.Entity)(this.ecs.entities.length), [
                new (0, _components.ImageComponent)(this.assets.images[0], new _utils.Vec2D(0, 64), new _utils.Vec2D(32, 32)),
                new (0, _components.PositionComponent)(new _utils.Vec2D(this.canvas.width / 2 - this.playerSize.x / 2, this.canvas.height / 2 - this.playerSize.y / 2)),
                new (0, _components.DimensionComponent)(this.playerSize),
                new (0, _components.MoveComponent)()
            ]);
            this.ecs.addSystem(new (0, _render.Render)());
            this.ecs.addSystem(new (0, _playermove.MovePlayer)());
            resolve("resolved");
        });
    }
    // Generate the map
    generateMap() {
        /* this.loadingStatus = "Generating map" */ return new Promise((resolve)=>{
            if (this.map != undefined && !this.map.generated) {
                console.warn("Map is already generating");
                return;
            }
            this.map = new (0, _map.MapGenerator)(this.mapDimensions, this.ctx, 100, 0.4, this.visualiseMap, 0, this, new (0, _utils.Vec2D)(this.playerSize.x / 1.5, this.playerSize.y / 1.5));
            this.map.initMap();
            let run = setInterval(()=>{
                if (this.map.generated) {
                    resolve("resolved");
                    clearInterval(run);
                }
            });
        });
    }
    // Draw an image / rectangle to the screen
    draw(position, dimensions, image, imgSrcPos, imgSrcDim) {
        //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        image == null ? this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y) : this.ctx.drawImage(image, imgSrcPos.x, imgSrcPos.y, imgSrcDim.x, imgSrcDim.y, position.x, position.y, dimensions.x, dimensions.y);
    }
    // Main game loop
    tick() {
        /* console.time("loop") */ if (this.state == GameState.Running) {
            if (this.map.generated) {
                this.frames++;
                this.map.draw(this.ctx, this.mapOffset);
                this.ecs.update(this.ctx, this);
            }
        }
        // Loading screen
        if (this.state == GameState.Loading && this.visualiseMap == false) this.loading();
        if (this.state == GameState.Menu) this.menu();
        if (this.state == GameState.Info) this.info();
        // To prevent multiple calls to tick()
        if (!this.stop) _utils.sleep(1000 / 60).then(()=>{
            this.tick(); /*console.timeEnd("loop")*/ 
        });
    }
    // Loading screen
    loading() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = "30px Roboto Mono";
        this.ctx.fillStyle = "#cbb";
        this.ctx.fillText(`${this.loadingStatus}...`, 25, 50);
    }
    // Menu screen
    menu() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 0.55;
        this.draw(new (0, _utils.Vec2D)(0), this.dimensions, this.assets.images[2], new (0, _utils.Vec2D)(0), new (0, _utils.Vec2D)(256));
        this.ctx.globalAlpha = 1;
        if (document.querySelector("div") == null) {
            const START = _utils.createHTMLElement("span", "start", "button", "Start Game!"); // Create start button
            const INFO = _utils.createHTMLElement("span", "info", "button", "Info"); // Create info button
            document.body.appendChild(_utils.createHTMLElement("div", "menu", "menu")); // Create menu container
            _utils.appendElementsById("menu", [
                START,
                INFO
            ]); // Append menu buttons to menu container
            // Add event listeners to menu buttons
            document.getElementById("start").addEventListener("click", ()=>{
                this.state = GameState.Loading;
                _utils.removeElementById("menu");
                this.init();
            });
            document.getElementById("info").addEventListener("click", ()=>{
                this.state = GameState.Info;
                _utils.removeElementById("menu");
            });
        }
    }
    // Info tab
    info() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 0.55;
        this.draw(new (0, _utils.Vec2D)(0), this.dimensions, this.assets.images[2], new (0, _utils.Vec2D)(0), new (0, _utils.Vec2D)(256));
        this.ctx.globalAlpha = 1;
        if (document.querySelector("div") == null) {
            const BACK = _utils.createHTMLElement("span", "back", "button", "Back"); // Create start button
            const INFO = _utils.createHTMLElement("span", "info", "text", "Info"); // Create info button
            INFO.innerHTML = "This is a game about a guy who walks around and does stuff.<br><br>It's pretty great you should donate to my patreon <br><a>here</a>";
            document.body.appendChild(_utils.createHTMLElement("div", "info", "info")); // Create menu container
            _utils.appendElementsById("info", [
                BACK,
                INFO
            ]); // Append menu buttons to menu container
            // Add event listeners to menu buttons
            document.getElementById("back").addEventListener("click", ()=>{
                this.state = GameState.Menu;
                _utils.removeElementById("info");
            });
        }
    }
}
const assetLoader = new (0, _assetloader.AssetLoader)([
    {
        type: (0, _assetloader.AssetType).image,
        path: "resources/images/StewieSpriteSheet.png"
    },
    {
        type: (0, _assetloader.AssetType).image,
        path: "resources/images/TileSheet.png"
    },
    {
        type: (0, _assetloader.AssetType).image,
        path: "resources/images/Placeholder.png"
    },
    {
        type: (0, _assetloader.AssetType).audio,
        path: "resources/audio/TitleLong.wav"
    }
]);
let ASSETS, DIMENSIONS, GAME;
// Load assets and start game /* Needs to be async to pre-load the assets */
(async ()=>{
    let style = "color: #cbb; font-size: 15px; font-family: 'Roboto Mono', monospace; font-weight: bold; text-shadow: 0 0 10px #cbb;";
    console.log("%cVersion: " + _packageJson.version + "\nMade by: " + _packageJson.author, style) // Thanks console.log for the cool text | copilot is a god
    ;
    console.log("%cDonate to my patreon: " + location.href.split("/").slice(0, -1).join("/") + "/patreon.html", style) // Based on a true story
    ;
    ASSETS = await assetLoader.loadAssets();
    DIMENSIONS = new (0, _utils.Vec2D)(innerHeight / 6 * 5);
    GAME = new Game(DIMENSIONS, ASSETS);
    GAME.tick();
})();
window.addEventListener("click", (e)=>{
    // @ts-ignore /* TypeScript thinks that tagName doesn't exist on e.target when in fact, it does. */
    if (e.target.tagName == "A") window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ") // hehe funny rickroll go brrrr (I'm so funny) (I'm not funny) lol
    ;
    else if (e.target.tagName == "BUTTON") GAME.init();
}) //const VERSION = fs.readFile('../version')
 //console.log(`Version: ${VERSION}`)
;

},{"./utils":"52QlR","./engine/map":"kDqBt","./ecs/ecs":"96EPF","./ecs/systems/render":"4mhar","./ecs/systems/playermove":"4nnHI","./ecs/components":"2B3cB","./engine/assetloader":"4zenl","../package.json":"1TO1v","@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"52QlR":[function(require,module,exports) {
/* utils.ts
    * Helper functions
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vec2D", ()=>Vec2D);
parcelHelpers.export(exports, "Direction2D", ()=>Direction2D);
parcelHelpers.export(exports, "createHTMLElement", ()=>createHTMLElement);
parcelHelpers.export(exports, "removeElementById", ()=>removeElementById);
parcelHelpers.export(exports, "appendElementsById", ()=>appendElementsById);
parcelHelpers.export(exports, "sleep", ()=>sleep);
class Vec2D {
    constructor(x, y){
        this.x = x;
        // If y is not defined, set y to x
        this.y = y ?? x;
    }
    static add(vec1, vec2) {
        return new Vec2D(vec1.x + vec2.x, vec1.y + vec2.y);
    }
    static multiply(vec1, vec2, num) {
        if (num) return new Vec2D(vec1.x * num, vec1.y * num);
        else if (vec2) return new Vec2D(vec1.x * vec2.x, vec1.y * vec2.y);
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
const createHTMLElement = (elName, id, className, innerText)=>{
    const el = document.createElement(elName);
    if (id) el.id = id;
    if (className) el.className = className;
    if (innerText) el.innerText = innerText;
    return el;
};
const removeElementById = (id)=>{
    document.getElementById(id).remove();
};
const appendElementsById = (parent, children)=>{
    children.map((e)=>document.getElementById(parent).appendChild(e));
};
const sleep = (ms)=>{
    return new Promise((resolve)=>setTimeout(resolve, ms));
};

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

},{}],"kDqBt":[function(require,module,exports) {
/* walker.ts
    * Purpose: Generates a map using a walker algorithm
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TileType", ()=>TileType);
parcelHelpers.export(exports, "MapGenerator", ()=>MapGenerator) // Long before time had a name, Ninjago was created by the First Spinjitzu Master, by using the Four Elemental Weapons of Spinjitzu; weapons so powerful, no one can handle all of their power at once. When he passed away, his two sons swore to protect them, but the oldest, Lord Garmadon, was consumed by darkness and wanted to possess them all. A battle between brothers broke out and Lord Garmadon was struck down and banished to the Underworld. Peace returned to Ninjago as the younger brother, Sensei Wu, hid the elemental weapons in the far corners of Ninjago. Centuries later, Lord Garmadon has returned with the help of his Skeleton army to collect the Golden Weapons. Sensei Wu turns to the aid of four young Ninja who are to be trained to become the protectors of each of the weapons. Although the Ninja successfully survive a harrowing quest to retrieve the elemental weapons, they fall into Lord Garmadon's master plan, releasing the dark Lord from his prison, and allowing him to escape through a vortex, with hope that he would one day return with the ability to possess all four weapons. Peace returned to Ninjago as the younger brother, Sensei Wu, hid the elemental weapons in the far corners of Ninjago. Centuries later, Lord Garmadon has returned with the help of his Skeleton army to collect the Golden Weapons. Sensei Wu turns to the aid of four young Ninja who are to be trained to become the protectors of each of the weapons. Although the Ninja successfully survive a harrowing quest to retrieve the elemental weapons, they fall into Lord Garmadon's master plan, releasing the dark Lord from his prison, and allowing him to escape through a vortex, with hope that he would one day return with the ability to possess all four weapons.
;
var _utils = require("../utils");
var _main = require("../main");
let TileType;
(function(TileType) {
    TileType[TileType["Empty"] = 0] = "Empty";
    TileType[TileType["Floor"] = 1] = "Floor";
    TileType[TileType["FloorEmpty"] = 2] = "FloorEmpty";
    TileType[TileType["FloorFlower"] = 3] = "FloorFlower";
    TileType[TileType["FloorGrass"] = 4] = "FloorGrass";
    TileType[TileType["Sand"] = 5] = "Sand";
    TileType[TileType["Water"] = 6] = "Water";
})(TileType || (TileType = {}));
class WalkerObject {
    constructor(position, direction, chanceToChange){
        this.position = position;
        this.direction = direction;
        this.chanceToChange = chanceToChange;
    }
}
class MapGenerator {
    floorConstraints = new (0, _utils.Vec2D)(0.1, 0.25);
    constructor(mapDimensions, ctx, maxWalkers, fillPercentage, visualise, waitTime, game, tileSize = game.playerSize){
        this.mapDimensions = mapDimensions;
        this.maxWalkers = maxWalkers;
        this.fillPercentage = fillPercentage;
        this.visualise = visualise;
        this.waitTime = waitTime;
        this.ctx = ctx;
        this.generated = false;
        this.game = game;
        this.tileSize = tileSize;
    }
    // Initialize the map
    initMap() {
        this.game.loadingStatus = "Generating map (1/5) - Walking";
        this.map = [];
        this.finalMap = [];
        this.walkers = [];
        this.tileCount = 0;
        this.generated = false;
        // Initialize map
        for(let i = 0; i < this.mapDimensions.x; i++){
            this.map[i] = [];
            for(let j = 0; j < this.mapDimensions.y; j++)this.map[i][j] = TileType.Empty;
        }
        // Initial walker
        this.walkers.push(new WalkerObject(new (0, _utils.Vec2D)(Math.floor(this.mapDimensions.x / 2), Math.floor(this.mapDimensions.y / 2)), (0, _utils.Direction2D).getRandomDirection(), 0.55));
        let curWalker = this.walkers[0];
        this.map[curWalker.position.x][curWalker.position.y] = TileType.Floor;
        if (this.visualise) this.draw(this.ctx);
        this.tick();
    }
    // Tick the map generation
    tick() {
        // Tick every waitTime milliseconds
        // If the map is filled
        if (this.tileCount / (this.mapDimensions.x * this.mapDimensions.y) >= this.fillPercentage) {
            this.zoom();
            this.zoom();
            this.finalMap = [
                ...this.map
            ];
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.game.loadingStatus = "Generating map (2/5) - Adding water";
            for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++)this.finalMap[i][j] = this.makeWater(this.map[i][j]) ? TileType.Water : this.map[i][j];
            this.game.loadingStatus = "Generating map (3/5) - Removing too much water";
            for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++){
                if (this.checkSurroundingTiles(new (0, _utils.Vec2D)(i, j), [
                    TileType.Water
                ]) > 7 && Math.random() < 0.01) for(let k = -1; k <= 1; k++){
                    for(let l = -1; l <= 1; l++)if (this.finalMap[i + k] && this.finalMap[i + k][j + l] && this.finalMap[i + k][j + l] == TileType.Water && Math.random() < 0.3) this.finalMap[i + k][j + l] = TileType.Floor;
                }
            //this.finalMap[i][j] = this.removeTooMuchWater(new Vec2D(i, j)) ? this.createRandomFloorTile(this.floorConstraints) : this.finalMap[i][j];
            }
            this.zoom();
            this.zoom();
            this.finalMap = [
                ...this.map
            ];
            this.game.loadingStatus = "Generating map (4/5) - Randomizing floor tiles";
            for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++)this.finalMap[i][j] = this.map[i][j] == TileType.Floor ? this.createRandomFloorTile(this.floorConstraints) : this.map[i][j];
            this.game.loadingStatus = "Generating map (5/5) - Adding sand";
            for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++)this.finalMap[i][j] = this.makeSand(new (0, _utils.Vec2D)(i, j)) ? TileType.Sand : this.map[i][j];
            for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++)this.finalMap[i][j] = this.checkSand(new (0, _utils.Vec2D)(i, j)) ? this.createRandomFloorTile(this.floorConstraints) : this.finalMap[i][j];
            console.log("%cFinished generating map.   src: engine/map.ts:139", "color: #44ee66;font-size: 1.5em;font-family: 'Roboto Mono', monospace;");
            // Debugging
            if (!this.game.onlyMap) {
                this.game.state = (0, _main.GameState).Running;
                this.game.ecs.addTrigger("render");
                this.game.ecs.addTrigger("move");
            } else this.draw(this.ctx);
            this.generated = true;
            this.game.loadingStatus = "Finished generating map";
            this.game.mapDimensions = this.mapDimensions;
            return;
        }
        // For every walker     /* for let .. of .. performs slower than for let .. < .. */
        for(let i = 0; i < this.walkers.length; i++){
            let walker = this.walkers[i];
            // Make the walker create a floor tile where it is
            if (this.map[walker.position.x][walker.position.y] == TileType.Empty) {
                this.map[walker.position.x][walker.position.y] = TileType.Floor;
                this.tileCount++;
            }
        }
        // Update walkers
        this.chanceToRemove();
        this.changeDirection();
        this.chanceToCreate();
        this.updatePosition();
        if (this.visualise) this.draw(this.ctx);
        _utils.sleep(this.waitTime).then(()=>this.tick());
    }
    // Draw the map to the canvas
    draw(ctx, mapOffset = new (0, _utils.Vec2D)(0, 0)) {
        //console.log("draw")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for(let i = 0; i < this.mapDimensions.x; i++)for(let j = 0; j < this.mapDimensions.y; j++){
            let position;
            let dimensions;
            if (this.generated) {
                position = new (0, _utils.Vec2D)(Math.floor(this.tileSize.x * j) + mapOffset.x, Math.floor(this.tileSize.y * i) + mapOffset.y);
                dimensions = new (0, _utils.Vec2D)(this.tileSize.x + 1, this.tileSize.y + 1);
            } else {
                position = new (0, _utils.Vec2D)(Math.floor(this.game.canvas.width / this.mapDimensions.x * j), Math.floor(this.game.canvas.height / this.mapDimensions.y * i));
                dimensions = new (0, _utils.Vec2D)(this.game.canvas.width / this.mapDimensions.x + 1, this.game.canvas.height / this.mapDimensions.y + 1);
            }
            // Current tile
            let tile = this.map[i][j];
            let floorTile = false;
            if ([
                1,
                2,
                3,
                4
            ].includes(tile)) floorTile = true // 2, 3, 4 correspond to floor tile variants
            ;
            // Visualise the map
            if (!this.generated) {
                if (floorTile) {
                    this.game.draw(position, dimensions, this.game.assets.images[1], new (0, _utils.Vec2D)(0, 32), new (0, _utils.Vec2D)(32, 32));
                    continue;
                } else if (tile == TileType.Sand) this.ctx.fillStyle = "#c2a676";
                else if (tile == TileType.Water) this.ctx.fillStyle = "#2a7fea";
                this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y);
            }
            // Check if we should draw the tile
            if (!(position.x > -dimensions.x && position.x < this.game.canvas.width + dimensions.x && position.y > -dimensions.y && position.y < this.game.canvas.height + dimensions.y && this.generated)) continue;
            if (floorTile) {
                if (tile == TileType.FloorEmpty) this.game.draw(position, dimensions, this.game.assets.images[1], new (0, _utils.Vec2D)(0, 32), new (0, _utils.Vec2D)(32, 32));
                else if (tile == TileType.FloorGrass) this.game.draw(position, dimensions, this.game.assets.images[1], new (0, _utils.Vec2D)(0, 0), new (0, _utils.Vec2D)(32, 32));
                else if (tile == TileType.FloorFlower) this.game.draw(position, dimensions, this.game.assets.images[1], new (0, _utils.Vec2D)(32, 0), new (0, _utils.Vec2D)(32, 32));
                continue;
            //this.ctx.fillStyle = "#68b547";
            } else if (tile == TileType.Sand) {
                this.game.draw(position, dimensions, this.game.assets.images[1], new (0, _utils.Vec2D)(32, 32), new (0, _utils.Vec2D)(32, 32));
                continue;
            //this.ctx.fillStyle = "#bab473";
            } else if (tile == TileType.Water) this.ctx.fillStyle = "#377";
            else this.ctx.fillStyle = "#000";
            this.game.draw(position, dimensions);
        }
    }
    /* 
        *   Walker functions
    */ // Move the walker one step in the direction it's facing
    updatePosition() {
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
        // For every walker
        for(let i = 0; i < this.walkers.length; i++){
            let walker = this.walkers[i];
            // If the walker is going to change direction
            if (Math.random() < walker.chanceToChange) /* 0 = up, 1 = right, 2 = down, 3 = left */ // Change direction
            walker.direction = (0, _utils.Direction2D).getRandomDirection();
        }
    }
    // Chance to create a new walker
    chanceToCreate() {
        // For every walker
        for(let i = 0; i < this.walkers.length; i++){
            let walker = this.walkers[i];
            if (Math.random() < walker.chanceToChange && this.walkers.length < this.maxWalkers) {
                // Set new walker's position and direction
                let newPosition = new (0, _utils.Vec2D)(walker.position.x, walker.position.y);
                let newDirection = (0, _utils.Direction2D).getRandomDirection();
                // Add new walker
                this.walkers.push(new WalkerObject(newPosition, newDirection, walker.chanceToChange));
            }
        }
    }
    // Chance to remove a walker
    chanceToRemove() {
        // For every walker
        for(let i = 0; i < this.walkers.length; i++){
            let walker = this.walkers[i];
            if (Math.random() < walker.chanceToChange && this.walkers.length > 1) this.walkers.splice(this.walkers.indexOf(walker), 1);
        }
    }
    /*
        *   Map functions
    */ // Make more variance in the map
    removeTooMuchWater(tile) {
        if (this.map[tile.x][tile.y] == TileType.Water && this.checkSurroundingTiles(tile, [
            TileType.Water
        ]) > 5 && Math.random() < 0.01) return true;
    }
    // Check if surrounding tiles are floor tiles
    checkSurroundingTiles(pos, tiles, from = -1, to = 2, map = this.map) {
        let count = 0;
        for(let i = from; i < to; i++)for(let j = from; j < to; j++){
            if (map[pos.x + i] != undefined && map[pos.x + i][pos.y + j] != undefined && !(i == 0 && j == 0)) {
                if (tiles.includes(map[pos.x + i][pos.y + j])) count++;
            }
        }
        return count;
    }
    // Check if adjacent tiles are floor tiles
    checkAdjacentTiles(pos, tiles, map = this.map) {
        let count = 0;
        for(let i = 0; i < 4; i++){
            if (map[pos.x + (0, _utils.Direction2D).cardinalDirections[i].x] != undefined && map[pos.x + (0, _utils.Direction2D).cardinalDirections[i].x][pos.y + (0, _utils.Direction2D).cardinalDirections[i].y] != undefined) {
                if (tiles.includes(map[pos.x + (0, _utils.Direction2D).cardinalDirections[i].x][pos.y + (0, _utils.Direction2D).cardinalDirections[i].y])) count++;
            }
        }
        return count;
    }
    // Make a sand tile after generating
    makeSand(tile) {
        if ([
            TileType.Empty,
            TileType.Water
        ].includes(this.map[tile.x][tile.y]) && this.checkSurroundingTiles(tile, [
            TileType.Floor,
            TileType.FloorEmpty,
            TileType.FloorFlower,
            TileType.FloorGrass
        ], -2, 3)) return true;
    }
    checkSand(tile) {
        if (this.map[tile.x][tile.y] == TileType.Sand) {
            if (this.checkAdjacentTiles(tile, [
                TileType.Floor,
                TileType.FloorEmpty,
                TileType.FloorFlower,
                TileType.FloorGrass
            ]) > 2) return true;
        }
    }
    // Make a water tile after generating
    makeWater(tile) {
        if (tile == TileType.Empty) return true;
    }
    // Create a floor tile at the given position
    createRandomFloorTile(constraints) {
        let rand = Math.random();
        // constraints.x chance to create a flower tile
        return rand < constraints.x ? TileType.FloorFlower : // constraints.y - constraints.x chance to create a grass tile
        rand < constraints.y ? TileType.FloorGrass : TileType.FloorEmpty;
    }
    // Similar to minecraft map gen, upscales resolution of the map and adds variation
    zoom() {
        // Upscale map
        let newMap = [
            ...this.map
        ];
        newMap = newMap.map((r)=>r.map((n)=>[
                    n,
                    n
                ]).flat(1)).map((r)=>[
                [
                    ...r
                ],
                [
                    ...r
                ]
            ]).flat(1);
        // Add variation
        for(let i = 0; i < newMap.length; i++){
            for(let j = 0; j < newMap[i].length; j++)if (newMap[i][j] == TileType.Floor) {
                let surroundingTiles = this.checkSurroundingTiles(new (0, _utils.Vec2D)(i, j), [
                    TileType.Floor
                ], -1, 2, newMap);
                if (surroundingTiles > 4 && Math.random() < 0.07) newMap[i][j] = TileType.Empty;
            } else {
                let closeToFloor = this.checkSurroundingTiles(new (0, _utils.Vec2D)(i, j), [
                    TileType.Floor
                ], -2, 3, newMap);
                if (closeToFloor > 1 && Math.random() < 0.14) newMap[i][j] = TileType.Floor;
            }
        }
        this.map = newMap;
        this.mapDimensions.x *= 2; // Upscale map dimensions (for rendering)
        this.mapDimensions.y *= 2; // ^
    }
}

},{"../utils":"52QlR","../main":"zQOKN","@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"96EPF":[function(require,module,exports) {
/* ecs.ts
    * Setup the ECS architecture
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Systems have an array of components, which run on entities with the same components when a trigger is set
parcelHelpers.export(exports, "System", ()=>System);
// ECS functions
parcelHelpers.export(exports, "ECS", ()=>ECS);
// Entities have id's and components, and certain systems run on entities with the same components
parcelHelpers.export(exports, "Entity", ()=>Entity);
class System {
    constructor(requiredComponents, trigger, func){
        this.requiredComponents = requiredComponents;
        this.trigger = trigger;
        this.func = func;
    }
}
class ECS {
    constructor(){
        this.entities = [];
        this.systemManager = new SystemManager();
    }
    addEntity(entity, components) {
        this.entities.push(entity);
        components != null && (entity.components = components);
    }
    addSystem(system) {
        this.systemManager.systems.push(system);
    }
    addTrigger(trigger) {
        if (this.systemManager.triggers.includes(trigger)) return;
        this.systemManager.addTrigger(trigger);
    }
    update(ctx, game) {
        this.systemManager.updateSystems(this.entities, ctx, game);
    }
}
// Manages systems, updates them when a trigger is set
class SystemManager {
    constructor(){
        this.systems = [];
        this.triggers = [];
    }
    // Add a system to the system manager
    addSystem(system) {
        this.systems.push(system);
    }
    // Add a trigger
    addTrigger(trigger) {
        this.triggers.push(trigger);
    }
    // Remove a trigger
    removeTrigger(trigger) {
        this.triggers.splice(this.triggers.indexOf(trigger), 1);
    }
    // Run all systems on all entities, if the entities have the required components
    updateSystems(entities, ctx, game) {
        for(let i = 0; i < this.systems.length; i++){
            const system = this.systems[i];
            if (!this.triggers.includes(system.trigger)) continue; // Skip if the system's trigger is not active
            for(let j = 0; j < entities.length; j++){
                const entity = entities[j];
                // console.log("Updating systems")
                let match = 0;
                for(let k = 0; k < entity.components.length; k++){
                    for(let l = 0; l < system.requiredComponents.length; l++)if (Object.getPrototypeOf(entity.components[k]).constructor == system.requiredComponents[l]) match++;
                }
                if (match == system.requiredComponents.length) system.func(entity, ctx, game);
            }
        }
    }
}
class Entity {
    constructor(id){
        this.id = id;
        this.components = [];
    }
    // Get a component by it's name
    getComponent(name) {
        // Loop through all components
        for (let c of this.components){
            // If the component's name matches the name we're looking for, return it
            if (c.name == name) return c;
        }
    }
    setComponent(component) {
        for(let i = 0; i < this.components.length; i++)if (this.components[i].name == component.name) this.components[i] = component;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"4mhar":[function(require,module,exports) {
/* render.ts
    * Renders an entity to the screen
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Render", ()=>Render);
var _ecs = require("../ecs");
var _components = require("../components"); // cs = components
class Render extends (0, _ecs.System) {
    constructor(){
        super([
            _components.ImageComponent,
            _components.PositionComponent,
            _components.DimensionComponent
        ], "render", (entity, ctx)=>{
            const image = entity.getComponent("image").image;
            const srcPos = entity.getComponent("image").srcPos;
            const srcDim = entity.getComponent("image").srcDim;
            const pos = entity.getComponent("position").position;
            const dim = entity.getComponent("dimensions").dimensions;
            //console.log("Rendering entity")
            ctx.drawImage(image, srcPos.x, srcPos.y, srcDim.x, srcDim.y, pos.x, pos.y, dim.x, dim.y);
        });
    }
}

},{"../ecs":"96EPF","../components":"2B3cB","@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"2B3cB":[function(require,module,exports) {
/* components.ts
    * All ECS components
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Component", ()=>Component);
parcelHelpers.export(exports, "MoveComponent", ()=>MoveComponent);
parcelHelpers.export(exports, "ImageComponent", ()=>ImageComponent);
parcelHelpers.export(exports, "PositionComponent", ()=>PositionComponent);
parcelHelpers.export(exports, "DimensionComponent", ()=>DimensionComponent);
class Component {
    constructor(name){
        this.name = name;
    }
}
class MoveComponent extends Component {
    constructor(){
        super("move");
    }
}
class ImageComponent extends Component {
    constructor(image, srcPos, srcDim){
        super("image");
        this.image = image;
        this.srcPos = srcPos;
        this.srcDim = srcDim;
    }
}
class PositionComponent extends Component {
    constructor(position){
        super("position");
        this.position = position;
    }
}
class DimensionComponent extends Component {
    constructor(dimensions){
        super("dimensions");
        this.dimensions = dimensions;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"4nnHI":[function(require,module,exports) {
/* playermove.ts
    * Move the player around the screen
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MovePlayer", ()=>MovePlayer);
var _ecs = require("../ecs");
var _utils = require("../../utils");
var _components = require("../components");
class MovePlayer extends (0, _ecs.System) {
    speed = 2;
    foot = 1;
    frame = new (0, _utils.Vec2D)(0, 0);
    constructor(){
        super([
            (0, _components.MoveComponent)
        ], "move", (_, __, game)=>{
            //this.speed = 0.03 * game.mapDimensions.x
            this.moveX = 0;
            this.moveY = 0;
            let moving = Array(4).fill(false) // [up, left, down, right]
            ;
            // Key checking
            if (keys["w"] || keys["ArrowUp"]) {
                moving[0] = true;
                if (keys["a"] || keys["ArrowLeft"] || keys["d"] || keys["ArrowRight"]) this.moveY += Math.sin(45) * this.speed;
                else this.moveY += this.speed;
            }
            if (keys["s"] || keys["ArrowDown"]) {
                moving[2] = true;
                if (keys["a"] || keys["ArrowLeft"] || keys["d"] || keys["ArrowRight"]) this.moveY -= Math.sin(45) * this.speed;
                else this.moveY -= this.speed;
            }
            if (keys["a"] || keys["ArrowLeft"]) {
                moving[1] = true;
                if (keys["w"] || keys["ArrowUp"] || keys["s"] || keys["ArrowDown"]) this.moveX += Math.sin(45) * this.speed;
                else this.moveX += this.speed;
            }
            if (keys["d"] || keys["ArrowRight"]) {
                moving[3] = true;
                if (keys["w"] || keys["ArrowUp"] || keys["s"] || keys["ArrowDown"]) this.moveX -= Math.sin(45) * this.speed;
                else this.moveX -= this.speed;
            }
            // Bounds checking
            if (game.mapOffset.x >= 0) {
                game.mapOffset.x = 0;
                this.moveX = this.moveX > 0 ? 0 : this.moveX;
            }
            if (game.mapOffset.x <= -Math.floor(game.mapDimensions.x * game.playerSize.x - game.canvas.width)) {
                game.mapOffset.x = -Math.floor(game.mapDimensions.x * game.playerSize.x - game.canvas.width);
                this.moveX = this.moveX < 0 ? 0 : this.moveX;
            }
            if (game.mapOffset.y >= 0) {
                game.mapOffset.y = 0;
                this.moveY = this.moveY > 0 ? 0 : this.moveY;
            }
            if (game.mapOffset.y <= -Math.floor(game.mapDimensions.y * game.playerSize.y - game.canvas.height)) {
                game.mapOffset.y = -Math.floor(game.mapDimensions.y * game.playerSize.y - game.canvas.height);
                this.moveY = this.moveY < 0 ? 0 : this.moveY;
            }
            for(let i = 0; i < 4; i++){
                // If holding opposite direction key, cancel
                moving[i] && moving[(i + 2) % 4] && (moving[i] = false, moving[(i + 2) % 4] = false);
                i == 0 ? moving[i] && (moving[i + 1] || moving[i + 3]) && (moving[i + 1] = false, moving[i + 3] = false) : i == 2 && moving[i] && (moving[i - 1] || moving[i + 1]) && (moving[i - 1] = false, moving[i + 1] = false);
            }
            // Set the direction of the player to the truthy value
            let moveDir = moving.indexOf(true);
            if (!moving.every((move)=>move === false)) {
                // set the sprite row to the direction
                this.frame.y = moveDir;
                // every 12 frames
                if (game.frames % 12 == 0) switch(moveDir){
                    case 0:
                    case 2:
                        if (this.frame.x == 0) this.frame.x = this.foot;
                        else {
                            this.foot == 1 ? this.foot = 2 : this.foot = 1;
                            this.frame.x = 0;
                        }
                        break;
                    case 1:
                    case 3:
                        this.frame.x == 0 ? this.frame.x = 1 : this.frame.x = 0;
                        break;
                }
            } else this.frame.x = 0;
            game.ecs.entities[0].setComponent(new (0, _components.ImageComponent)(game.assets.images[0], (0, _utils.Vec2D).multiply(this.frame, null, 32), new (0, _utils.Vec2D)(32)));
            // game.mapOffset.x >= -1 ? this.moveX > 0 ? 0 : this.moveX : game.mapOffset.x <= -Math.floor((game.mapDimensions.x*game.playerSize.x)-game.canvas.width) ? this.moveX < 0 ? 0 : this.moveX : this.moveX;
            game.mapOffset = (0, _utils.Vec2D).add(game.mapOffset, new (0, _utils.Vec2D)(this.moveX, this.moveY));
        });
    }
}
const keys = [];
document.addEventListener("keydown", (e)=>{
    keys[e.key] = true;
});
document.addEventListener("keyup", (e)=>{
    keys[e.key] = false;
});

},{"../ecs":"96EPF","../../utils":"52QlR","../components":"2B3cB","@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"4zenl":[function(require,module,exports) {
/* assetloader.ts
    * Pre-loads all assets
    * Credit to https://github.com/tobyck/goose-chase/blob/master/src/engine/asset_loader.ts for the idea
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AssetType", ()=>AssetType);
parcelHelpers.export(exports, "AssetLoader", ()=>AssetLoader);
let AssetType;
(function(AssetType) {
    AssetType[AssetType["image"] = 0] = "image";
    AssetType[AssetType["audio"] = 1] = "audio";
})(AssetType || (AssetType = {}));
class AssetLoader {
    #assets;
    constructor(assets){
        this.#assets = assets;
    }
    loadAsset(asset) {
        return new Promise((resolve, reject)=>{
            if (asset.type === AssetType.image) {
                const image = new Image();
                image.src = asset.path;
                image.onload = (_)=>resolve(image);
                image.onerror = reject;
            } else if (asset.type === AssetType.audio) {
                const audio = new Audio();
                audio.src = asset.path;
                audio.oncanplaythrough = (_)=>resolve(audio);
                audio.onerror = reject;
            }
        });
    }
    async loadAssets() {
        const ASSETS = await Promise.all(this.#assets.map((asset)=>this.loadAsset(asset)));
        let images = [], audio = [];
        ASSETS.forEach((asset)=>{
            if (asset.tagName == "IMG") images.push(asset);
            else if (asset.tagName == "AUDIO") audio.push(asset);
        });
        return {
            images: images,
            audio: audio
        };
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"b4oyH"}],"1TO1v":[function(require,module,exports) {
module.exports = JSON.parse('{"name":"the_adventures_of_stewin","author":"Maxwell Robati","version":"0.1.0","license":"MIT","source":"src/main.ts","targets":{"bundle":{"sourceMap":false,"optimize":true,"outputFormat":"commonjs","distDir":"build"}},"scripts":{"watch":"parcel watch","build":"parcel build --no-cache"},"dependencies":{"parcel":"latest"}}');

},{}]},["3mPmv","zQOKN"], "zQOKN", "parcelRequire94c2")

