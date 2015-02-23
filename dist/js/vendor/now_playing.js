!function(program, ctx) {
  /**
   * @param {string} i
   * @return {?}
   */
  function require(i) {
    var val = vals[i];
    if (!val) {
      var f = ctx[i];
      if (!f) {
        throw new Error("module " + i + " not found");
      }
      val = vals[i] = {};
      var obj = val.exports = {};
      f.call(obj, require, val, obj, window);
    }
    return val.exports;
  }
  var vals = require.cache = {};
  /**
   * @param {string} opt_attributes
   * @return {?}
   */
  require.resolve = function(opt_attributes) {
    return opt_attributes;
  };
  /**
   * @return {?}
   */
  require.node = function() {
    return{};
  };
  var codeSegments;
  /** @type {RegExp} */
  var rSlash = /(@loc)\b/g;
  /** @type {function (this:(string|{length: number}), *=): string} */
  var join = Array.prototype.join;
  /**
   * @param {string} s
   * @param {?} child
   * @param {?} callback
   * @param {?} array
   * @return {?}
   */
  var add = function(s, child, callback, array) {
    /**
     * @param {?} m
     * @return {?}
     */
    var fn = function(m) {
      var name = s.replace(rSlash, m);
      return ctx[name] ? name : null;
    };
    /** @type {Array} */
    var classes = [];
    /**
     * @return {undefined}
     */
    var func = function() {
      /** @type {string} */
      var prop = join.call(arguments, "-");
      if (-1 === classes.indexOf(prop)) {
        classes.push(prop);
      }
    };
    if (array) {
      func(child, callback, array);
      func(child, array);
    }
    if (callback) {
      func(child, callback);
    }
    func(child);
    func("en");
    var i;
    var result;
    /** @type {number} */
    i = 0;
    for (;i < codeSegments.length;i++) {
      func(codeSegments[i]);
    }
    var segments = s.split("/");
    /** @type {Array} */
    var data = [];
    i = segments.length;
    for (;i > 1;i--) {
      /** @type {string} */
      var name = segments.slice(0, i).join("/") + "/" + path;
      var _method = ctx[name];
      if (_method) {
        data = require(name);
        break;
      }
    }
    /** @type {number} */
    i = 0;
    for (;i < data.length;i++) {
      func(data[i]);
    }
    /** @type {number} */
    i = 0;
    for (;i < classes.length;i++) {
      if (result = fn(classes[i])) {
        return result;
      }
    }
    throw new Error(s + " not found.");
  };
  /**
   * @param {string} key
   * @return {undefined}
   */
  var runTest = function(key) {
    var parts = key.replace(/_/g, "-").toLowerCase().split("-");
    var last = parts[0];
    var restoreScript = parts[1];
    var selector = parts[2];
    /**
     * @param {string} p
     * @return {?}
     */
    require.loc = function(p) {
      return require(add(p, last, restoreScript, selector));
    };
    require(program);
  };
  /** @type {string} */
  var path = "@supported-languages.json";
  try {
    codeSegments = require("./" + path);
    var util = require("./@sp.js");
    util.request("session_query", [], null, function(localize) {
      runTest(localize.language);
    }, function() {
      runTest("en");
    });
  } catch (d) {
    /**
     * @param {string} location
     * @return {?}
     */
    require.loc = function(location) {
      throw new Error(location + " not found");
    };
    require(program);
  }
}("./scripts/main.js", {
  /**
   * @param {?} require
   * @return {undefined}
   */
  "./scripts/main.js" : function(require) {
    var env = require("./scripts/config.js");
    var options = require("./node_modules/spotify-live/index.js");
    var opts = options("spotify:player");
    var ast = require("./node_modules/spotify-events/player.js");
    var exp = require("./features.json");
    var Model = require("./node_modules/spotify-client-logger/src/logger.js");
    var Assertion = require("./node_modules/spotify-feature-manager/src/feature-manager.js");
    var Block = require("./node_modules/spotify-live-models/index.js");
    options.register(require("./node_modules/spotify-live-models/album.js"));
    options.register(require("./node_modules/spotify-live-models/artist.js"));
    options.register(require("./node_modules/spotify-live-models/playlist.js"));
    options.register(require("./node_modules/spotify-live-models/track.js"));
    options.register(require("./node_modules/spotify-live-models/player.js"));
    options.register(require("./node_modules/spotify-live-models/application.js"));
    options("spotify:application").update({
      version : env.get("version")
    });
    require("./node_modules/spotify-handlebars/index.js").register({
      href : require("./node_modules/spotify-handlebars/helpers/href.js"),
      type : require("./node_modules/spotify-handlebars/helpers/type.js"),
      loc : require("./node_modules/spotify-handlebars/helpers/loc.js")
    });
    var path = require("./node_modules/spotify-cosmos-api/index.js");
    var a = require("./scripts/utils/DOM_class_utils.js");
    var l = a.addClass;
    var al = a.removeClass;
    var il = a.validateClass;
    var nodes = require("./scripts/utils/is_curated.js");
    var inspect = require("./node_modules/spotify-glue-cat/templates/media-object.hbs");
    var url = require("./node_modules/pubsub-js/src/pubsub.js");
    var Promise = require("./scripts/presentation/recs_view_scroller.js");
    var ArrayBuffer = require("./scripts/presentation/scroller.js");
    var Route = require("./scripts/collections/collection_playlists.js");
    var Script = require("./scripts/collections/collection_tracks.js");
    var Client = require("./scripts/utils/image_resolver.js");
    var PositionError = require("./scripts/presentation/height_adjuster.js");
    var Test = require("./scripts/utils/player_listener.js");
    var Connection = require("./scripts/utils/logger.js");
    var Node = require("./node_modules/spotify-dom-logger/dom-logger.js");
    var obj = new Assertion(exp, options, Block);
    /** @type {(Element|null)} */
    var root = document.querySelector(".wrapper");
    var req = new Test(options, opts, url);
    var arrayBuf = new ArrayBuffer(l, al);
    var client = new Client(url, options, env);
    var model = new Model;
    var t = new Node({
      logger : model
    });
    var ret = new Connection(url, model, obj);
    var _error = new PositionError(env.get("titleHeight"), env.get("mediaHeight"));
    var route = new Route(url, path, env, client, il, nodes);
    var request = new Script(url, path, env, client);
    var self = new Promise("related-music-view", inspect, l, al, url, arrayBuf, _error);
    self.setTitle(env.get("relatedMusic"));
    self.setAdMessage(env.get("adMessage"));
    self.setNoRecsMessage(env.get("noRecsMessage"));
    root.appendChild(self.el);
    obj.init().then(function() {
      var NTX_ab_npr_playlists = obj.get("NTX_ab_npr_playlists");
      model.setConstant({
        NTX_ab_npr_playlists : NTX_ab_npr_playlists
      });
      if (1 === NTX_ab_npr_playlists) {
        route.init();
      } else {
        request.init();
        ast.attach();
        ast.update();
      }
      t.init();
      ret.startLogging();
      req.startListening();
    }).catch(function(err) {
      model.error({
        targetType : "feature_init_error",
        error : err
      });
    });
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./@sp.js" : function($sanitize, module) {
    module.exports = $sanitize("./node_modules/quickstart-spotify/spotify-api.js").SP;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {?} a
   * @return {undefined}
   */
  "./node_modules/quickstart-spotify/spotify-api.js" : function(require, dataAndEvents, a) {
    var e = require("./node_modules/api/scripts/core.js");
    var path = require(window._getSpotifyModule ? "./node_modules/api/scripts/core.desktop.js" : "./node_modules/api/scripts/core.browser.js");
    a.SpotifyApi = e;
    a.SP = path;
    a.LangModule = e.LangModule;
  },
  /**
   * @param {Object} require
   * @param {Object} context
   * @return {undefined}
   */
  "./node_modules/api/scripts/core.js" : function(require, context) {
    /**
     * @return {undefined}
     */
    function self() {
      this._modules = {};
      this._requested = {};
      /** @type {Array} */
      this._moduleQueue = [];
      /** @type {Array} */
      this._delayedFns = [];
      /** @type {number} */
      this._parallelReqs = 4;
      /** @type {Array} */
      this._contextStack = [];
      /** @type {boolean} */
      this._deferredFlush = false;
      /** @type {boolean} */
      this._useLoadingTimeout = false;
      this._patchRequestOpen();
    }
    /**
     * @param {?} config
     * @param {Function} callback
     * @return {?}
     */
    function require(config, callback) {
      return self.api._require("__main__", {
        /**
         * @return {undefined}
         */
        callback : function() {
        },
        waiting : 1 / 0
      }, [], config, callback);
    }
    var mod = {};
    /**
     * @param {string} tmplName
     * @return {undefined}
     */
    self.AnalyticsContext = function(tmplName) {
      /** @type {string} */
      this.name = tmplName;
      /** @type {number} */
      this.id = self.AnalyticsContext._nextId++;
      /** @type {number} */
      this.references = 0;
      this._begin();
    };
    /** @type {number} */
    self.AnalyticsContext._nextId = 1;
    /**
     * @return {undefined}
     */
    self.AnalyticsContext.prototype.addReference = function() {
      this.references++;
    };
    /**
     * @return {undefined}
     */
    self.AnalyticsContext.prototype.removeReference = function() {
      this.references--;
      if (0 === this.references) {
        this._end();
      }
    };
    /**
     * @return {undefined}
     */
    self.AnalyticsContext.prototype._begin = function() {
      self.api.request("core_context_begin", [this.id, this.name], this);
    };
    /**
     * @return {undefined}
     */
    self.AnalyticsContext.prototype._end = function() {
      self.api.request("core_context_end", [this.id], this);
    };
    /**
     * @param {?} value
     * @param {?} $sanitize
     * @return {undefined}
     */
    self.prototype.analyticsContext = function(value, $sanitize) {
      var copies = new self.AnalyticsContext(value);
      copies.addReference();
      this._contextStack.push(copies);
      try {
        $sanitize();
      } finally {
        this._contextStack.pop();
        copies.removeReference();
      }
    };
    /**
     * @param {?} func
     * @param {Array} id
     * @return {undefined}
     */
    self.Callback = function(func, id) {
      this._func = func;
      this._setContextStack(id || self.api._contextStack);
    };
    /**
     * @param {Function} value
     * @param {?} args
     * @return {undefined}
     */
    self.Callback.prototype.apply = function(value, args) {
      try {
        var _contextStack = self.api._contextStack;
        self.api._contextStack = this._contextStack;
        this._func.apply(value, args);
      } catch (o) {
        setTimeout(function() {
          throw o;
        }, 0);
      } finally {
        self.api._contextStack = _contextStack;
        this.clear();
      }
    };
    /**
     * @param {Function} obj
     * @return {undefined}
     */
    self.Callback.prototype.call = function(obj) {
      this.apply(obj, Array.prototype.slice.call(arguments, 1));
    };
    /**
     * @return {?}
     */
    self.Callback.prototype.copy = function() {
      return new this.constructor(this._func, this._contextStack);
    };
    /**
     * @return {undefined}
     */
    self.Callback.prototype.clear = function() {
      this._releaseContextStack();
      delete this._func;
      delete this._contextStack;
    };
    /**
     * @param {Object} models
     * @return {undefined}
     */
    self.Callback.prototype._setContextStack = function(models) {
      /** @type {number} */
      var i = 0;
      var l = models.length;
      for (;l > i;++i) {
        models[i].addReference();
      }
      this._contextStack = models.slice(0);
    };
    /**
     * @return {undefined}
     */
    self.Callback.prototype._releaseContextStack = function() {
      var left = this._contextStack;
      /** @type {number} */
      var b = 0;
      var a = left.length;
      for (;a > b;++b) {
        left[a - b - 1].removeReference();
      }
    };
    /**
     * @param {Function} data
     * @return {?}
     */
    self.prototype.callback = function(data) {
      return new self.Callback(data);
    };
    /**
     * @return {?}
     */
    self.prototype._getContextIdForRequest = function() {
      var data = this._contextStack;
      return data.length ? data[data.length - 1].id : 0;
    };
    window.addEventListener("message", function(e) {
      if (e.source == window && "api-delay" == e.data) {
        e.stopPropagation();
        var q = self.api._delayedFns.splice(0);
        /** @type {number} */
        var i = 0;
        var l = q.length;
        for (;l > i;i++) {
          q[i].call();
        }
      }
    });
    /**
     * @param {string} keepData
     * @return {undefined}
     */
    self.prototype._prepareFlush = function(keepData) {
      if (!this._deferredFlush) {
        if (!("core_flush" == keepData)) {
          /** @type {boolean} */
          this._deferredFlush = true;
          this.defer(this, this._flushRequests);
        }
      }
    };
    /**
     * @return {undefined}
     */
    self.prototype._flushRequests = function() {
      /** @type {boolean} */
      this._deferredFlush = false;
      this.request("core_flush", []);
    };
    /**
     * @param {Function} func
     * @param {Function} callback
     * @return {undefined}
     */
    self.prototype.defer = function(func, callback) {
      if (1 == this._delayedFns.push(this.bind(this.callback(callback), func))) {
        window.postMessage("api-delay", "*");
      }
    };
    /**
     * @param {Object} fun
     * @param {?} elems
     * @param {string} key
     * @param {string} arg
     * @return {?}
     */
    self.prototype._evalModule = function(fun, elems, key, arg) {
      return/\.lang$/.test(key) ? this._evalLangModule(key, arg) : this._evalJSModule(fun, elems, key, arg);
    };
    /**
     * @param {Object} obj
     * @param {?} second
     * @param {string} file
     * @param {string} source
     * @return {?}
     */
    self.prototype._evalJSModule = function(obj, second, file, source) {
      var t = this;
      var fromIndex = {
        __name : file
      };
      /**
       * @param {Object} a
       * @param {Function} matcherFunction
       * @return {?}
       */
      var lt = function(a, matcherFunction) {
        /** @type {boolean} */
        fromIndex.__waiting = true;
        /**
         * @return {?}
         */
        var later = function() {
          return fromIndex.__waiting = false, matcherFunction.apply(this, arguments);
        };
        return later.__native = true, t._require(file, obj, second, a, later);
      };
      try {
        return source = "'use strict';" + source + "\n//@ sourceURL=" + file, (new Function("require", "exports", "SP", "_code", "eval(_code)")).call({}, lt, fromIndex, this, source), fromIndex;
      } catch (er) {
        throw er.message += " in " + file, er;
      }
    };
    /**
     * @param {string} dataAndEvents
     * @param {?} strings
     * @return {undefined}
     */
    self.LangModule = function(dataAndEvents, strings) {
      /** @type {string} */
      this.__name = dataAndEvents;
      this.strings = strings;
    };
    /**
     * @param {string} name
     * @return {?}
     */
    self.LangModule.prototype.get = function(name) {
      var blockMarkerEnd;
      var end;
      var body = this.strings.hasOwnProperty(name) ? this.strings[name] : name;
      /** @type {string} */
      var optsData = "";
      /** @type {number} */
      var pos = 0;
      for (;(blockMarkerEnd = body.indexOf("{", pos)) > -1 && (end = body.indexOf("}", blockMarkerEnd + 1), -1 != end);) {
        var iterable = arguments[parseInt(body.substring(blockMarkerEnd + 1, end)) + 1];
        optsData += void 0 !== iterable ? body.substring(pos, blockMarkerEnd) + iterable : body.substring(pos, end + 1);
        pos = end + 1;
      }
      return pos ? optsData + body.substring(pos) : body;
    };
    /**
     * @param {string} keepData
     * @param {string} v
     * @return {?}
     */
    self.prototype._evalLangModule = function(keepData, v) {
      try {
        return new self.LangModule(keepData, JSON.parse(v));
      } catch (ex) {
        throw new Error('Cannot import language file "' + keepData + '": ' + ex.message);
      }
    };
    /**
     * @param {Object} self
     * @return {undefined}
     */
    self.prototype._fireCallbacks = function(self) {
      for (;self && (self.waiting--, !self.waiting);) {
        self.unpacked.forEach(function(c) {
          var i = c.position;
          var prop = self.args[i];
          var p = c.property;
          if (!(p in prop)) {
            throw new Error('No "' + p + '" exported in module "' + prop.__name + '"');
          }
          self.args[i] = prop[p];
        });
        self.callback.apply({}, self.args);
        /** @type {number} */
        self.waiting = 1 / 0;
        self = self.parent;
      }
    };
    /**
     * @param {string} url
     * @param {Function} onSuccess
     * @return {undefined}
     */
    self.prototype._createRequest = function(url, onSuccess) {
      var xhr;
      var backoff;
      var tref;
      var i;
      /** @type {XMLHttpRequest} */
      xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      /**
       * @return {undefined}
       */
      xhr.onreadystatechange = function() {
        var r;
        var a;
        var b;
        if (r = 4 === xhr.readyState) {
          if (clearTimeout(tref), i) {
            throw new Error('Could not load file "' + url + '"; Timed out.');
          }
          if (a = 0 === xhr.status && !!xhr.responseText, b = 200 === xhr.status || a, !b) {
            throw new Error('Could not load file "' + url + '"; Not found.');
          }
          onSuccess(xhr.responseText);
        }
      };
      if (this._useLoadingTimeout) {
        /** @type {number} */
        backoff = 1500;
        /** @type {number} */
        tref = setTimeout(function() {
          /** @type {boolean} */
          i = true;
          xhr.abort();
        }, backoff);
      }
      xhr.send(null);
    };
    /**
     * @param {Object} self
     * @param {?} elems
     * @param {string} key
     * @param {number} i
     * @param {string} dataAndEvents
     * @return {undefined}
     */
    self.prototype._loadModule = function(self, elems, key, i, dataAndEvents) {
      var $ = this;
      var label = this._modules[key];
      if (label && !label.__waiting) {
        self.args[i] = this._modules[key];
        if (dataAndEvents) {
          self.unpacked.push({
            property : dataAndEvents,
            position : i
          });
        }
        this._fireCallbacks(self);
      } else {
        if (this._requested[key] || !this._parallelReqs) {
          this.defer(this, function() {
            this._loadModule(self, elems, key, i, dataAndEvents);
          });
        } else {
          /** @type {boolean} */
          this._requested[key] = true;
          this._parallelReqs--;
          this._createRequest(key, function(obj) {
            $._parallelReqs++;
            var v0 = $._modules[key] = $._evalModule(self, elems, key, obj);
            self.args[i] = v0;
            if (dataAndEvents) {
              self.unpacked.push({
                property : dataAndEvents,
                position : i
              });
            }
            $._fireCallbacks(self);
          });
        }
      }
    };
    /**
     * @param {string} selector
     * @return {?}
     */
    self.prototype._resolveModule = function(selector) {
      if (!/\.lang$/.test(selector)) {
        var t = selector.match(/^(\$(?:[^\/]+)\/)(?!scripts)(.*)/);
        if (t) {
          selector = t[1] + "scripts/" + t[2];
        }
        selector += ".js";
      }
      return selector;
    };
    /**
     * @param {string} filename
     * @param {Object} game
     * @param {Array} path
     * @param {(Array|string)} deps
     * @param {Function} callback
     * @return {undefined}
     */
    self.prototype._require = function(filename, game, path, deps, callback) {
      if ("string" == typeof deps && (deps = [deps]), !deps || !deps.length) {
        throw new Error("Missing modules argument to require().");
      }
      if (!callback || "function" != typeof callback) {
        throw new Error("Missing callback function argument to require().");
      }
      var expected = deps.length;
      var data = {
        name : filename,
        parent : game,
        waiting : expected,
        /** @type {Function} */
        callback : callback,
        args : new Array(expected),
        unpacked : []
      };
      game.waiting++;
      /** @type {number} */
      var i = 0;
      var expectedOutput = expected;
      for (;expectedOutput > i;i++) {
        var arg = deps[i];
        if (!arg) {
          throw new Error("Empty module name in require.");
        }
        var node = arg.split("#");
        arg = this._resolveModule(node[0]);
        node = node[1];
        var args = path.slice(0);
        var type = path.indexOf(arg);
        if (args.push(arg), -1 != type) {
          throw args = args.slice(type).join(" -> "), new Error('Circular Dependency on Module "' + arg + '": ' + args);
        }
        this._loadModule(data, args, arg, i, node);
      }
    };
    /**
     * @param {Object} args
     * @param {number} i
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    self.prototype.varargs = function(args, i, dataAndEvents) {
      if (i || (i = 0), Array.isArray(args[i])) {
        if (args.length > i + 1) {
          throw new Error("Ambiguous use of varargs");
        }
        args = args[i];
        /** @type {number} */
        i = 0;
      }
      return i || dataAndEvents ? Array.prototype.slice.call(args, i) : args;
    };
    /**
     * @param {Object} args
     * @param {number} dataName
     * @return {?}
     */
    self.prototype.uris = function(args, dataName) {
      var sources = this.varargs(args, dataName);
      /** @type {Array} */
      var arr = [];
      /** @type {number} */
      var i = 0;
      var l = sources.length;
      for (;l > i;i++) {
        arr.push(sources[i].uri);
      }
      return arr;
    };
    /**
     * @param {Function} func
     * @param {Function} object
     * @return {?}
     */
    self.prototype.bind = function(func, object) {
      if (arguments.length > 2) {
        /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
        var __slice = Array.prototype.slice;
        /** @type {function (this:Function, (Object|null|undefined), ...[*]): Function} */
        var nativeBind = Function.prototype.bind;
        if (nativeBind && func.bind === nativeBind) {
          return nativeBind.apply(func, __slice.call(arguments, 1));
        }
        /** @type {Array.<?>} */
        var args = __slice.call(arguments, 2);
        return function() {
          return func.apply(object, arguments.length ? args.concat(__slice.call(arguments)) : args);
        };
      }
      return function() {
        return func.apply(object, arguments);
      };
    };
    /**
     * @param {Object} fn
     * @param {Function} parentClass
     * @return {?}
     */
    self.prototype.inherit = function(fn, parentClass) {
      /**
       * @return {undefined}
       */
      var F = function() {
      };
      return F.prototype = fn._superClass = parentClass.prototype, fn.prototype = new F, fn.prototype.constructor = fn, fn;
    };
    /**
     * @return {undefined}
     */
    self.prototype._patchRequestOpen = function() {
      /** @type {function (this:XMLHttpRequest, string, string, (boolean|null)=, (null|string)=, (null|string)=): undefined} */
      var matcherFunction = XMLHttpRequest.prototype.open;
      /** @type {Element} */
      var a = document.createElement("a");
      /** @type {Location} */
      var loc = window.location;
      /**
       * @param {string} method
       * @param {string} url
       * @return {undefined}
       */
      XMLHttpRequest.prototype.open = function(method, url) {
        var props = matcherFunction.apply(this, arguments);
        return a.href = url, (":" == a.protocol && !a.hostname || a.protocol == loc.protocol && a.hostname == loc.hostname) && this.setRequestHeader("X-Spotify-Requested-With", "XMLHttpRequest"), props;
      };
    };
    /**
     * @param {?} p
     * @return {?}
     */
    self.prototype.resolvePath = function(p) {
      return p;
    };
    /** @type {Object} */
    mod.require = require;
    /**
     * @return {?}
     */
    String.prototype.decodeForText = function() {
      return this.toString();
    };
    String.prototype.decodeForHtml = function() {
      var prevSources = {
        "&" : "&amp;",
        "<" : "&lt;",
        ">" : "&gt;"
      };
      /**
       * @param {?} i
       * @return {?}
       */
      var evalScript = function(i) {
        return prevSources[i];
      };
      return function() {
        return this.replace(/[&<>]/g, evalScript);
      };
    }();
    /**
     * @return {?}
     */
    String.prototype.decodeForLink = function() {
      return encodeURI(this);
    };
    self.Bases = {
      uri : "spotify",
      url : "http://open.spotify.com"
    };
    self.Exps = {
      spotify : /^spotify:(.+)$/,
      http : /^https?:\/\/(play|open)\.spotify\.com\/(.+)$/
    };
    /**
     * @return {?}
     */
    String.prototype.toSpotifyURL = function() {
      /** @type {(Array.<string>|null)} */
      var match = this.match(self.Exps.spotify);
      if (!match) {
        return this;
      }
      /** @type {Array.<string>} */
      var path = match.pop().replace(/:$/, "").split(/:/);
      /** @type {string} */
      var state = path.shift();
      return "search" == state && (path = [path.join(":")]), path.unshift(self.Bases.url, state), path.join("/");
    };
    /**
     * @return {?}
     */
    String.prototype.toSpotifyURI = function() {
      /** @type {(Array.<string>|null)} */
      var match = this.match(self.Exps.http);
      if (!match) {
        return this;
      }
      /** @type {Array.<string>} */
      var t = match.pop().replace(/\/$/, "").split(/\//);
      return t.unshift(self.Bases.uri), t.join(":");
    };
    /**
     * @return {?}
     */
    String.prototype.toSpotifyLink = function() {
      return this.toSpotifyURI();
    };
    /** @type {function (): undefined} */
    context.exports = self;
  },
  /**
   * @param {?} Event
   * @param {Object} opts
   * @return {undefined}
   */
  "./node_modules/api/scripts/core.desktop.js" : function(Event, opts) {
    var self = Event("./node_modules/api/scripts/core.js");
    !function() {
      /** @type {boolean} */
      self.prototype._throwError = true;
      var tmp;
      var _this = window._getSpotifyModule("bridge");
      try {
        tmp = window._getSpotifyModule("core");
      } catch (r) {
      }
      if (tmp) {
        /**
         * @param {string} data
         * @param {Function} onSuccess
         * @return {undefined}
         */
        self.prototype._createRequest = function(data, onSuccess) {
          this.defer(this, function() {
            var rs = tmp.readFile(data);
            if (void 0 === rs) {
              throw new Error('Could not load module "' + data + '"; Not found.');
            }
            onSuccess(rs);
          });
        };
      }
      /**
       * @param {string} name
       * @param {Array} lab
       * @param {Function} elems
       * @param {Function} fn
       * @param {Function} callback
       * @return {undefined}
       */
      self.prototype.request = function(name, lab, elems, fn, callback) {
        var context = this._getContextIdForRequest();
        /** @type {string} */
        var attempted = JSON.stringify({
          name : name,
          args : lab,
          context : context
        });
        _this.executeRequest(attempted, {
          /**
           * @param {?} args
           * @return {undefined}
           */
          onSuccess : function(args) {
            if (fn) {
              fn.call(elems, JSON.parse(args));
            }
          },
          /**
           * @param {?} data
           * @return {undefined}
           */
          onFailure : function(data) {
            /** @type {*} */
            data = JSON.parse(data);
            if (callback) {
              callback.call(elems, data);
            }
          }
        });
        this._prepareFlush(name);
      };
      self.api = new self;
      /** @type {string} */
      self.api.container = "desktop";
    }();
    opts.exports = self.api;
  },
  /**
   * @param {?} Event
   * @param {Object} opts
   * @return {undefined}
   */
  "./node_modules/api/scripts/core.browser.js" : function(Event, opts) {
    var self = Event("./node_modules/api/scripts/core.js");
    !function() {
      /** @type {number} */
      var equiv_class_id = 0;
      var _callbacks = {};
      /** @type {boolean} */
      self.prototype._throwError = true;
      /** @type {boolean} */
      self.prototype._useLoadingTimeout = true;
      var doc = window.manifest;
      var action = doc && doc.VendorIdentifier || "unknown";
      var next_block = doc && doc.BundleVersion || "";
      if (!next_block.match(/^\d+\.\d+\.\d+$/)) {
        /** @type {string} */
        next_block = "0.0.0";
      }
      var options = window.dependencies;
      var name = options["static"];
      var c = name.replace(/\/([^\/]*)$/, "");
      /** @type {string} */
      var id = c + "/";
      /** @type {Array} */
      var stack = ["en.loc"];
      /** @type {(Array.<string>|null)} */
      var eventPath = window.location.search.match(/locale=([^&]+)/);
      if (eventPath) {
        /** @type {Array.<string>} */
        stack = eventPath.pop().split(",");
        /** @type {number} */
        var i = stack.length;
        for (;i--;) {
          /** @type {string} */
          var current = stack[i];
          /** @type {string} */
          stack[i] = -1 != current.indexOf(".loc") ? current : current + ".loc";
        }
      }
      var key;
      var match = {};
      /** @type {string} */
      var value = "en";
      if (options.locale && !Array.isArray(options.locale)) {
        var keys = options.locale;
        var index;
        for (index in keys) {
          key = keys[index];
          index += ".loc";
          /** @type {number} */
          var mod = 0;
          var ll = key.length;
          for (;ll > mod;mod++) {
            /** @type {boolean} */
            match[index + "/" + key[mod]] = true;
          }
          /** @type {boolean} */
          match[index + "/scripts/momentLang.js"] = true;
        }
        /** @type {number} */
        var offset = 0;
        /** @type {number} */
        var il = stack.length;
        for (;il > offset;offset++) {
          if (key = stack[offset].replace(".loc", ""), options.locale[key] && options.locale[key].length) {
            value = key;
            break;
          }
        }
      }
      if (window.manifest && Array.isArray(doc.SupportedLanguages)) {
        var uri = doc.SupportedLanguages;
        /** @type {number} */
        var j = 0;
        /** @type {number} */
        var spaces = stack.length;
        for (;spaces > j;j++) {
          key = stack[j].replace(".loc", "");
          var camelKey = uri.indexOf(key);
          if (-1 != camelKey) {
            value = key;
            break;
          }
        }
      }
      /** @type {function (string): ?} */
      var proceed = self.prototype._resolveModule;
      /**
       * @param {string} element
       * @return {?}
       */
      self.prototype._resolveModule = function(element) {
        var j;
        var value = proceed(element);
        var keys = value.match(/^\$([a-z\-\_]+)(\/.*)/);
        /** @type {boolean} */
        var path = false;
        /** @type {boolean} */
        var result = false;
        if (keys) {
          path = keys[1];
          j = keys[2];
        } else {
          if (/^\//.exec(value)) {
            /** @type {boolean} */
            result = true;
          }
        }
        /** @type {boolean} */
        var s = false;
        if (/\.lang$/.exec(value) || /momentLang\.js$/.exec(value)) {
          if (path) {
            s = stack[0];
            /** @type {string} */
            value = "$" + path + "/" + (j = "/" + s + j);
          } else {
            value = /^\//.test(value) ? value : "/" + value;
            /** @type {string} */
            var url = "";
            /** @type {number} */
            var i = 0;
            var l = stack.length;
            for (;l > i && (s = stack[i], url = s + value, !match[url]);i++) {
            }
            /** @type {string} */
            value = (result ? "/" : "") + url;
          }
        }
        return path && options[path] ? value = options[path] + j : (path ? value = "/" + path + j : result || (value = "/" + value), value = (path ? c : name) + value), value;
      };
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      if (MutationObserver) {
        /** @type {MutationObserver} */
        var mo = new MutationObserver(function(values) {
          /** @type {number} */
          var css = 0;
          /** @type {number} */
          var valuesLen = values.length;
          for (;valuesLen > css;css++) {
            /** @type {(MutationRecord|null)} */
            var value = values[css];
            /** @type {(NodeList|null)} */
            var match = value.addedNodes;
            if (!match.length) {
              return this;
            }
            /** @type {string} */
            var url = name + "/$";
            /** @type {number} */
            var j = 0;
            /** @type {number} */
            var spaces = match.length;
            for (;spaces > j;j++) {
              var link = match[j];
              if ("link" == link.tagName.toLowerCase() && /^\$/.test(link.getAttribute("href"))) {
                var s = link.href;
                link.href = s.replace(url, id);
              }
            }
          }
        });
        mo.observe(document.head, {
          childList : true
        });
      } else {
        /**
         * @param {Event} doc
         * @return {undefined}
         */
        var init = function(doc) {
          if (doc.target === document.head) {
            var employees = document.head.querySelectorAll('link[href^="$"]');
            /** @type {string} */
            var url = name + "/$";
            /** @type {number} */
            var i = 0;
            var l = employees.length;
            for (;l > i;i++) {
              var link = employees[i];
              if (/^\$/.test(link.getAttribute("href"))) {
                var s = link.href;
                link.href = s.replace(url, id);
              }
            }
          }
        };
        document.head.addEventListener("DOMSubtreeModified", init);
      }
      if ("XDomainRequest" in window) {
        var getQuery = self.prototype._createRequest;
        /**
         * @param {string} url
         * @param {Function} onSuccess
         * @return {?}
         */
        self.prototype._createRequest = function(url, onSuccess) {
          if (!/^http/.test(url)) {
            return getQuery(url, onSuccess);
          }
          /** @type {XDomainRequest} */
          var xdr = new XDomainRequest;
          /**
           * @return {undefined}
           */
          xdr.onprogress = function() {
          };
          /**
           * @return {?}
           */
          xdr.onerror = function() {
            throw new Error('Could not load module "' + url + '"; Not found.');
          };
          /**
           * @return {undefined}
           */
          xdr.onload = function() {
            onSuccess(xdr.responseText);
          };
          xdr.open("GET", url);
          xdr.send(null);
        };
      }
      var old = {
        hermes_register_schema : 1
      };
      /**
       * @param {string} name
       * @param {Array} lab
       * @param {Function} elems
       * @param {Function} onSuccess
       * @param {Function} callback
       * @return {?}
       */
      self.prototype.request = function(name, lab, elems, onSuccess, callback) {
        /** @type {Window} */
        var o = window.top;
        if (o === window) {
          return this;
        }
        var data = {
          type : "bridge_request",
          id : equiv_class_id++,
          name : name,
          args : lab,
          appVendor : action,
          appVersion : next_block
        };
        if (old[name] && (data.deps = options), "session_query" == name) {
          /** @type {Function} */
          var parser = onSuccess;
          /**
           * @param {Object} obj
           * @return {?}
           */
          onSuccess = function(obj) {
            return obj && (obj.language = value), parser.call(this, obj);
          };
        }
        return o.postMessage(JSON.stringify(data), "*"), onSuccess ? (_callbacks[data.id] = {
          /** @type {Function} */
          success : onSuccess,
          /** @type {Function} */
          failed : callback,
          /** @type {Function} */
          caller : elems
        }, void this._prepareFlush(name)) : this;
      };
      /**
       * @param {MessageEvent} browserEvent
       * @return {?}
       */
      self.prototype._requestReply = function(browserEvent) {
        var data = browserEvent.data;
        if ("string" == typeof data) {
          try {
            /** @type {*} */
            data = JSON.parse(data);
          } catch (e) {
            return this;
          }
        }
        var opts = _callbacks[data.id];
        return opts ? void(data.success && opts.success ? opts.success.call(opts.caller, data.payload) : !data.success && (opts.failed && opts.failed.call(opts.caller, data.payload))) : this;
      };
      /**
       * @param {string} _
       * @return {?}
       */
      self.prototype.resolvePath = function(_) {
        /** @type {string} */
        var from = "._resolve_";
        var res = this._resolveModule(_ + from);
        var resultItems = _.split(".");
        if (resultItems.length > 1) {
          var result = resultItems[resultItems.length - 1];
          if ("js" !== result) {
            res = res.replace("scripts/", "");
          }
          /** @type {string} */
          var to = ".js";
          res = res.slice(0, -(from.length + to.length));
        } else {
          res = res.replace(from, "");
        }
        return res;
      };
      self.api = new self;
      /** @type {string} */
      self.api.container = "web";
      window.addEventListener("message", self.api._requestReply, false);
      /** @type {string} */
      self.Bases.url = "https://play.spotify.com";
      /**
       * @return {?}
       */
      String.prototype.toSpotifyLink = function() {
        return this.toSpotifyURL();
      };
      document.documentElement.addEventListener("click", function(event) {
        /** @type {(EventTarget|null)} */
        var element = event.target;
        do {
          if ("a" === element.nodeName.toLowerCase()) {
            break;
          }
        } while ((element = element.parentNode) && element !== document.body);
        if (element && element !== document.body) {
          var target = element.href;
          /** @type {null} */
          var deep = null;
          if (self.Exps.http.test(target)) {
            deep = target.toSpotifyURI();
          } else {
            if (self.Exps.spotify.test(target)) {
              deep = target;
            }
          }
          if (deep) {
            if (!event.defaultPrevented) {
              event.preventDefault();
              self.api.request("application_open_uri", [deep, null]);
            }
          }
        }
      });
      /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
      var __slice = Array.prototype.slice;
      if (!Array.prototype.indexOf) {
        /**
         * @param {string} obj
         * @param {number=} from
         * @return {number}
         * @template T
         */
        Array.prototype.indexOf = function(obj, from) {
          /** @type {number} */
          var len = this.length >>> 0;
          /** @type {number} */
          var i = 0 > from ? Math.max(0, len + from) : from || 0;
          for (;len > i;i++) {
            if (this[i] === obj) {
              return i;
            }
          }
          return-1;
        };
      }
      if (!String.prototype.trim) {
        /**
         * @return {string}
         */
        String.prototype.trim = function() {
          return String(this).replace(/^\s+|\s+$/g, "");
        };
      }
      if (!Function.prototype.bind) {
        /**
         * @param {(Object|null|undefined)} object
         * @return {Function}
         */
        Function.prototype.bind = function(object) {
          /** @type {Function} */
          var Base = this;
          /** @type {(Array.<?>|null)} */
          var a = arguments.length > 1 ? __slice.call(arguments, 1) : null;
          /**
           * @return {undefined}
           */
          var F = function() {
          };
          /**
           * @return {?}
           */
          var bound = function() {
            /** @type {(Object|null|undefined)} */
            var value = object;
            /** @type {number} */
            var b = arguments.length;
            if (this instanceof bound) {
              F.prototype = Base.prototype;
              value = new F;
            }
            var result = a || b ? Base.apply(value, a && b ? a.concat(__slice.call(arguments)) : a || arguments) : Base.call(value);
            return value == object ? result : value;
          };
          return bound;
        };
      }
      (function() {
        if (window.metadata) {
          /** @type {string} */
          var tag = "[" + window.metadata.identifier + " " + window.metadata.version + "]";
          /** @type {(Console|null)} */
          var console = window.console;
          /** @type {function (this:Function, ...[*]): *} */
          var apply = Function.prototype.apply;
          /** @type {Array} */
          var methods = ["debug", "error", "info", "log", "warn"];
          if (console) {
            methods.forEach(function(fnName) {
              var fn = console[fnName];
              if (fn) {
                /**
                 * @return {?}
                 */
                console[fnName] = function() {
                  /** @type {Array.<?>} */
                  var args = __slice.call(arguments);
                  return "string" == typeof args[0] ? args[0] = tag + " " + args[0] : args.unshift(tag), apply.call(fn, console, args);
                };
              }
            });
          }
        }
      })();
      var listener = {
        _modifiers : {},
        _keymap : {},
        _ignore : {},
        _bindings : {},
        /**
         * @return {undefined}
         */
        _empty : function() {
        },
        /**
         * @return {undefined}
         */
        init : function() {
          self.api.request("keyboard_get_bindings", [], this, function(modified) {
            var field;
            for (field in modified) {
              if (modified.hasOwnProperty(field)) {
                this[field] = modified[field];
              }
            }
          }.bind(this), this._empty);
          window.addEventListener("keydown", this.handleOwn.bind(this, false));
          window.addEventListener("keyup", this.handleOwn.bind(this, true));
        },
        /**
         * @param {?} dataAndEvents
         * @param {Event} event
         * @return {?}
         */
        handleOwn : function(dataAndEvents, event) {
          var current = event.target;
          if (this._ignore[current.tagName.toLowerCase()]) {
            return this;
          }
          var bid = this._keymap[event.which || event.keyCode];
          if (!bid) {
            return this;
          }
          var key = this._modifiers;
          if (event.altKey) {
            bid |= key.alt;
          }
          if (event.metaKey) {
            bid |= key.meta;
          }
          if (event.ctrlKey) {
            bid |= key.ctrl;
          }
          if (event.shiftKey) {
            bid |= key.shift;
          }
          var b = this._bindings[bid];
          return b ? (event.preventDefault(), event.stopPropagation(), void(dataAndEvents && self.api.request("keyboard_trigger_binding", [b], this, this._empty, this._empty))) : this;
        }
      };
      listener.init();
    }();
    opts.exports = self.api;
  },
  /**
   * @param {Node} require
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/config.js" : function(require, module) {
    var relatedMusic = require.loc("./locale/@loc/main.json");
    var getActual = require("./node_modules/spotify-live/index.js");
    var pkg = require("./package.json");
    var core = require("./node_modules/pubsub-js/src/pubsub.js");
    var o = {
      mediaModifiersPlaylists : "media-object-small media-object-horizontal media-object-link",
      mediaModifiersTracks : "media-object-small media-object-horizontal",
      mediaModifiersBig : "col-lg-3 col-md-4 col-sm-6 big",
      mediaHeight : 53,
      titleHeight : 54,
      relatedMusic : relatedMusic.RelatedMusic,
      relatedPlaylists : relatedMusic.RelatedPlaylists,
      adMessage : relatedMusic.AdRecs,
      noRecsMessage : relatedMusic.NoRecs,
      device : "web",
      country : "US",
      language : "en",
      CDN_URL : "https://d3rt1990lpmkn.cloudfront.net/",
      version : pkg.version
    };
    getActual("spotify:client").query("session(country, language, device)", function(opt_attributes, data) {
      if (data && data.session) {
        o.device = data.session.device;
        o.language = data.session.language;
        o.country = data.session.country;
      } else {
        core.publish("sessionDataError", opt_attributes);
      }
    });
    module.exports = {
      /**
       * @param {string} name
       * @return {?}
       */
      get : function(name) {
        return o[name];
      },
      /**
       * @param {string} key
       * @param {Function} value
       * @return {undefined}
       */
      set : function(key, value) {
        /** @type {Function} */
        o[key] = value;
      }
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./features.json" : function(dataAndEvents, module) {
    module.exports = {
      NTX_ab_npr_playlists : {
        active : false,
        groups : [{
          description : "gets playlists instead of tracks",
          bucket : [0, 0]
        }]
      }
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} $
   * @return {undefined}
   */
  "./scripts/utils/DOM_class_utils.js" : function(dataAndEvents, $) {
    /**
     * @param {string} klass
     * @param {Element} elem
     * @return {?}
     */
    function hasClass(klass, elem) {
      return elem.className.contains(klass, " ");
    }
    /**
     * @param {string} klass
     * @param {Element} className
     * @return {undefined}
     */
    function addClass(klass, className) {
      if (!hasClass(klass, className)) {
        className.className = (className.className + " " + klass).clean();
      }
    }
    /**
     * @param {string} klass
     * @param {?} element
     * @return {undefined}
     */
    function removeClass(klass, element) {
      element.className = element.className.replace(new RegExp("(^|\\s)" + klass + "(?:\\s|$)"), "$1");
    }
    /**
     * @param {string} str
     * @return {?}
     */
    function isEmpty(str) {
      var filtered = str.replace(/:/g, "");
      return filtered = filtered.replace(/%/g, ""), filtered = filtered.replace(/\./g, "");
    }
    if (!("contains" in String.prototype)) {
      /**
       * @param {string} element
       * @param {string} value
       * @return {?}
       */
      String.prototype.contains = function(element, value) {
        return-1 !== String.prototype.indexOf.call(this, element, value);
      };
    }
    /**
     * @return {string}
     */
    String.prototype.trim = function() {
      return String(this).replace(/^\s+|\s+$/g, "");
    };
    /**
     * @return {?}
     */
    String.prototype.clean = function() {
      return String(this).replace(/\s+/g, " ").trim();
    };
    $.exports = {
      /** @type {function (string, ?): undefined} */
      removeClass : removeClass,
      /** @type {function (string, Element): undefined} */
      addClass : addClass,
      /** @type {function (string, Element): ?} */
      hasClass : hasClass,
      /** @type {function (string): ?} */
      validateClass : isEmpty
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/utils/is_curated.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      return spy && -1 !== spy.indexOf("spotify:user:spotify");
    }
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/utils/image_resolver.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {Object} attr
     * @param {Object} config
     * @return {undefined}
     */
    function create(spy, attr, config) {
      /** @type {Object} */
      this.pubsub = spy;
      /** @type {Object} */
      this.live = attr;
      /** @type {Object} */
      this.config = config;
      this.imageURICache = {};
    }
    /**
     * @param {number} arg
     * @param {string} actual
     * @return {?}
     */
    create.prototype._buildWebURLBase = function(arg, actual) {
      /** @type {string} */
      var optsData = "";
      return actual ? optsData = "thumb" === actual || ("artist_image" === actual || "cover" == actual) ? actual + "/" : "image/" : arg && (optsData = 60 === arg || (85 === arg || (120 === arg || (140 === arg || (165 === arg || (230 === arg || 640 === arg))))) ? arg + "/" : "300/"), this.config.get("CDN_URL") + optsData;
    };
    /**
     * @param {string} attributes
     * @return {?}
     */
    create.prototype._getImageId = function(attributes) {
      var args;
      var s;
      return "spotify:mosaic" === attributes.substring(0, 14) || "spotify:image" === attributes.substring(0, 13) ? (args = attributes.split(":"), s = args[2], 6 === args.length && (s = s + args[3] + args[4] + args[5]), s) : attributes;
    };
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    create.prototype.fetch = function(url, callback) {
      var context = this;
      return this.imageURICache[url] ? this.imageURICache[url] : void this.live(url).query("image", function(dataAndEvents, args) {
        if (args) {
          if (args.image) {
            context.imageURICache[url] = args.image;
            context.pubsub.publish("imageReady", {
              image : args.image,
              DOMClass : callback
            });
          }
        }
      });
    };
    /**
     * @param {string} opt_attributes
     * @param {Function} name
     * @param {Function} method
     * @return {?}
     */
    create.prototype.resolve = function(opt_attributes, name, method) {
      return "web" !== this.config.get("device") ? opt_attributes : this._buildWebURLBase(name, method) + this._getImageId(opt_attributes);
    };
    /** @type {function (Object, Object, Object): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/utils/player_listener.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} o
     * @param {?} var_args
     * @return {undefined}
     */
    function create(spy, o, var_args) {
      /** @type {Object} */
      this.live = spy;
      this.player = o;
      this.pubsub = var_args;
      /** @type {string} */
      this.currentTrack = "";
      /** @type {string} */
      this.currentContext = "";
    }
    /**
     * @param {string} attributes
     * @return {undefined}
     */
    create.prototype._setCurrentTrack = function(attributes) {
      if (attributes) {
        if (attributes !== this.currentTrack) {
          if (-1 !== attributes.indexOf(":ad:")) {
            this.pubsub.publish("adPlaying");
          } else {
            /** @type {string} */
            this.currentTrack = attributes;
            this.pubsub.publish("newTrack", attributes);
          }
        }
      }
    };
    /**
     * @param {string} opt_attributes
     * @return {undefined}
     */
    create.prototype._setCurrentContext = function(opt_attributes) {
      if (opt_attributes) {
        if (opt_attributes !== this.currentContext) {
          /** @type {string} */
          this.currentContext = opt_attributes;
          this.pubsub.publish("newContext", opt_attributes);
        }
      }
    };
    /**
     * @param {Object} data
     * @return {undefined}
     */
    create.prototype._handlePlayerUpdate = function(data) {
      if (data.track) {
        this._setCurrentTrack(data.track.get("uri"));
      }
      if (data.context) {
        this._setCurrentContext(data.context.get("uri"));
      }
    };
    /**
     * @return {undefined}
     */
    create.prototype.startListening = function() {
      this.live("spotify:player").query("track(uri)", function(dataAndEvents, req) {
        if (!dataAndEvents) {
          if (req) {
            if (req.track) {
              if (req.track.uri) {
                this._setCurrentTrack(req.track.uri);
              }
            }
          }
        }
      }.bind(this));
      this.player.on("update", this._handlePlayerUpdate.bind(this));
    };
    /** @type {function (Object, ?, ?): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/utils/logger.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {Object} attr
     * @param {?} var_args
     * @return {undefined}
     */
    function create(spy, attr, var_args) {
      /** @type {Object} */
      this.pubsub = spy;
      /** @type {Object} */
      this.logger = attr;
      this.fm = var_args;
      /** @type {string} */
      this.currentTrack = "";
    }
    /**
     * @return {undefined}
     */
    create.prototype.startLogging = function() {
      var self = this;
      this.logger.userImpression({
        event_version : "appStart"
      });
      this.pubsub.subscribe("newTrack", function(dataAndEvents, title) {
        self.currentTrack = title;
      });
      this.pubsub.subscribe("fetchFail", function(dataAndEvents, obj) {
        self.logger.error({
          event_version : "fetch_fail",
          error : obj.msg,
          context : obj.track
        });
      });
      this.pubsub.subscribe("sessionDataError", function(err) {
        self.logger.error({
          event_version : "session data error",
          error : err
        });
      });
      this.pubsub.subscribe("schemaRegistrationError", function(fmt) {
        self.logger.error(fmt);
      });
    };
    /** @type {function (Object, Object, ?): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} leaf
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/presentation/recs_view_scroller.js" : function(leaf, module) {
    /**
     * @param {Object} spy
     * @param {?} attr
     * @param {?} spec
     * @param {Object} col
     * @param {?} opt_domHelper
     * @param {Object} var_args
     * @param {?} minutes
     * @return {undefined}
     */
    function create(spy, attr, spec, col, opt_domHelper, var_args, minutes) {
      /** @type {Object} */
      this.scroller = var_args;
      this.heightAdjuster = minutes;
      parent.call(this, spy, attr, spec, col, opt_domHelper);
      this.scroller.init(this.recsContainerEl);
    }
    var parent = leaf("./scripts/presentation/recs_view.js");
    /** @type {Object} */
    create.prototype = Object.create(parent.prototype);
    /**
     * @return {?}
     */
    create.prototype.setEventListeners = function() {
      var self = this;
      return window.addEventListener("resize", function() {
        self.heightAdjuster.adjust(self.recsContainerEl);
        setTimeout(function() {
          self.scroller.reset();
        }, 100);
      }), parent.prototype.setEventListeners.call(this);
    };
    /**
     * @param {?} mapper
     * @param {?} graphics
     * @return {?}
     */
    create.prototype.showRecs = function(mapper, graphics) {
      var self = this;
      return this.scroller.jumpToPx(0), this.pubsub.publish("resetScroller"), setTimeout(function() {
        self.heightAdjuster.adjust(self.recsContainerEl);
      }, 1E3), setTimeout(function() {
        self.scroller.reset();
      }, 1100), parent.prototype.showRecs.call(this, mapper, graphics);
    };
    /** @type {function (Object, ?, ?, Object, ?, Object, ?): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/presentation/scroller.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {Function} attr
     * @return {undefined}
     */
    function $(spy, attr) {
      /** @type {boolean} */
      this._scrollbarHidden = false;
      /** @type {Object} */
      this.addClass = spy;
      /** @type {Function} */
      this.removeClass = attr;
    }
    /**
     * @param {HTMLElement} el
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    $.prototype.init = function(el, deepDataAndEvents) {
      /** @type {HTMLElement} */
      this._el = el;
      /** @type {number} */
      this._scrollPosition = this._scrollerAt = 0;
      this._build(deepDataAndEvents);
      this._bindEvents();
      this._setDimensions();
      /** @type {null} */
      this.scrollingTimeout = null;
    };
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    $.prototype._build = function(deepDataAndEvents) {
      if (deepDataAndEvents) {
        this._scrollbar = this._el.querySelector(".scrollbar");
        this._scrollDragArea = this._el.querySelector(".scroller-drag-area");
        this._scroller = this._el.querySelector(".scroller");
      } else {
        /** @type {Element} */
        this._scrollbar = document.createElement("div");
        /** @type {string} */
        this._scrollbar.className = "scrollbar";
        /** @type {Element} */
        this._scrollDragArea = document.createElement("div");
        /** @type {string} */
        this._scrollDragArea.className = "scroller-drag-area";
        /** @type {Element} */
        this._scroller = document.createElement("div");
        /** @type {string} */
        this._scroller.className = "scroller";
        this._scroller.appendChild(this._scrollDragArea);
        this._scrollbar.appendChild(this._scroller);
        this._el.appendChild(this._scrollbar);
      }
      this._innerPane = this._el.querySelector(".scroll-inner-area");
    };
    /**
     * @return {undefined}
     */
    $.prototype._setDimensions = function() {
      this._elHeight = this._el.offsetHeight;
      this._contentHeight = this._innerPane.offsetHeight;
      /** @type {number} */
      this._scrollMax = this._elHeight - this._contentHeight;
      this._scrollbarHeight = this._scrollbar.offsetHeight;
      /** @type {number} */
      var imgHeight = this._elHeight / this._contentHeight;
      /** @type {number} */
      var newHeight = this._scrollbarHeight * imgHeight;
      if (20 > newHeight) {
        /** @type {number} */
        newHeight = 20;
      }
      /** @type {string} */
      this._scroller.style.height = newHeight + "px";
      /** @type {number} */
      this._scrollerSpace = this._scrollbarHeight - newHeight;
      if (this._contentHeight < this._elHeight) {
        this._hideBar();
      } else {
        this._showBar();
      }
    };
    /**
     * @return {undefined}
     */
    $.prototype.reset = function() {
      this.jumpToPx(0);
      this._scrollbar.removeAttribute("style");
      this._setDimensions();
    };
    /**
     * @return {undefined}
     */
    $.prototype._hideBar = function() {
      /** @type {string} */
      this._scrollbar.style.display = "none";
      /** @type {boolean} */
      this._scrollbarHidden = true;
    };
    /**
     * @return {undefined}
     */
    $.prototype._showBar = function() {
      /** @type {string} */
      this._scrollbar.style.display = "block";
      /** @type {boolean} */
      this._scrollbarHidden = false;
    };
    /**
     * @param {Event} event
     * @return {undefined}
     */
    $.prototype._onMouseWheel = function(event) {
      if (!this._scrollbarHidden) {
        event.preventDefault();
        /** @type {number} */
        var _scrollPosition = 0;
        if (event.wheelDeltaY) {
          /** @type {number} */
          _scrollPosition = event.wheelDeltaY / 3;
        } else {
          if (event.detail) {
            /** @type {number} */
            _scrollPosition = 3 * -event.detail;
          } else {
            if (event.wheelDelta) {
              /** @type {number} */
              _scrollPosition = event.wheelDelta / 3;
            }
          }
        }
        this._scrollPosition += _scrollPosition;
        this._doScroll();
      }
    };
    /**
     * @return {undefined}
     */
    $.prototype._doScroll = function() {
      var el = this;
      if (this._scrollPosition > 1) {
        /** @type {number} */
        this._scrollPosition = 1;
      }
      if (this._scrollPosition < this._scrollMax) {
        this._scrollPosition = this._scrollMax;
      }
      /** @type {string} */
      this._innerPane.style.top = this._scrollPosition + "px";
      this._setScrollerPosition();
      if (this.scrollingTimeout) {
        clearInterval(this.scrollingTimeout);
      }
      var className = this._el;
      this.addClass("scrolling", className);
      /** @type {number} */
      this.scrollingTimeout = setTimeout(function() {
        el.removeClass("scrolling", className);
      }, 1E3);
    };
    /**
     * @return {undefined}
     */
    $.prototype._setScrollerPosition = function() {
      /** @type {number} */
      var _scrollerAt = Math.round(this._scrollPosition / this._scrollMax * 100);
      if (_scrollerAt > 100) {
        /** @type {number} */
        _scrollerAt = 100;
      }
      /** @type {number} */
      this._scrollerAt = this._scrollerSpace / 100 * _scrollerAt;
      /** @type {string} */
      this._scroller.style.top = this._scrollerAt + "px";
    };
    /**
     * @return {undefined}
     */
    $.prototype._bindEvents = function() {
      var self = this;
      this._el.addEventListener("mousewheel", function(event) {
        self._onMouseWheel(event);
      }, false);
      this._el.addEventListener("DOMMouseScroll", function(event) {
        self._onMouseWheel(event);
      }, false);
      this._scroller.addEventListener("mousedown", function(arg) {
        self._startDragScroller(arg);
      }, false);
      this._scrollbar.addEventListener("mousedown", function(e) {
        return e.target === self._scrollDragArea ? false : void self._handleBarClick(e);
      }, false);
    };
    /**
     * @param {Object} event
     * @return {undefined}
     */
    $.prototype._startDragScroller = function(event) {
      event.preventDefault();
      this._startY = this._scroller.offsetTop;
      this._initialMouseY = event.clientY;
      var t = this;
      /**
       * @param {undefined} el
       * @return {undefined}
       */
      this.listener = function(el) {
        t._doMoveMouse(el);
      };
      window.addEventListener("mousemove", this.listener, false);
      window.addEventListener("mouseup", t._endMoveMouse.bind(this), false);
      document.addEventListener("mouseout", t._mouseOutWindow.bind(this), false);
      this.addClass("dragging", this._el);
    };
    /**
     * @param {HTMLElement} e
     * @return {undefined}
     */
    $.prototype._mouseOutWindow = function(e) {
      e = e ? e : window.event;
      var element = e.relatedTarget || e.toElement;
      if (!(element && "HTML" != element.nodeName)) {
        window.removeEventListener("mousemove", this.listener, false);
      }
      this.removeClass("dragging", this._el);
    };
    /**
     * @param {HTMLElement} e
     * @return {undefined}
     */
    $.prototype._doMoveMouse = function(e) {
      e = e ? e : window.event;
      /** @type {number} */
      var _startY = e.clientY - this._initialMouseY;
      this._scrollerAt = _startY + this._startY;
      /** @type {number} */
      var dataAndEvents = this._scrollerAt / this._scrollerSpace * 100;
      this._setMainScrollPercent(dataAndEvents);
    };
    /**
     * @return {undefined}
     */
    $.prototype._endMoveMouse = function() {
      window.removeEventListener("mousemove", this.listener, false);
      this.removeClass("dragging", this._el);
    };
    /**
     * @param {(Object|string)} recurring
     * @return {undefined}
     */
    $.prototype.jumpToPx = function(recurring) {
      /** @type {number} */
      this._scrollPosition = recurring ? -recurring : 0;
      /** @type {string} */
      this._innerPane.style.top = this._scrollPosition + "px";
      this._setScrollerPosition();
    };
    /**
     * @param {Object} e
     * @return {undefined}
     */
    $.prototype._handleBarClick = function(e) {
      if (e.preventDefault(), e.target !== this._scroller) {
        var _scrollerSpace = e.layerY || e.offsetY;
        _scrollerSpace -= this._scroller.offsetHeight / 2;
        /** @type {number} */
        var dataAndEvents = _scrollerSpace / this._scrollerSpace * 100;
        this._setMainScrollPercent(dataAndEvents);
        this._startDragScroller(e);
      }
    };
    /**
     * @param {number} dataAndEvents
     * @return {undefined}
     */
    $.prototype._setMainScrollPercent = function(dataAndEvents) {
      /** @type {number} */
      this._scrollPosition = -1 * (Math.abs(this._scrollMax) / 100) * dataAndEvents;
      this._doScroll();
    };
    /**
     * @return {undefined}
     */
    $.prototype.resize = function() {
      this._setDimensions();
    };
    /** @type {function (Object, Function): undefined} */
    module.exports = $;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/presentation/height_adjuster.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {number} attr
     * @return {undefined}
     */
    function create(spy, attr) {
      /** @type {Object} */
      this.titleHeight = spy;
      /** @type {number} */
      this.mediaHeight = attr;
    }
    /**
     * @param {Element} viewport
     * @return {undefined}
     */
    create.prototype.adjust = function(viewport) {
      /** @type {number} */
      var mediaHeight = Math.floor((window.innerHeight - this.titleHeight) / this.mediaHeight) * this.mediaHeight;
      viewport.setAttribute("style", "height: " + mediaHeight + "px;");
    };
    /** @type {function (Object, number): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} leaf
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/collections/collection_playlists.js" : function(leaf, module) {
    /**
     * @param {Object} spy
     * @param {?} attr
     * @param {?} spec
     * @param {Object} var_args
     * @param {?} minutes
     * @param {?} moduleNames
     * @return {undefined}
     */
    function create(spy, attr, spec, var_args, minutes, moduleNames) {
      /** @type {Object} */
      this.imageResolver = var_args;
      this.validateClass = minutes;
      this.isCurated = moduleNames;
      parent.call(this, spy, attr, spec);
    }
    var parent = leaf("./scripts/collections/collection.js");
    /** @type {Object} */
    create.prototype = Object.create(parent.prototype);
    /** @type {string} */
    create.prototype._RESULT_KEY = "playlist";
    /** @type {string} */
    create.prototype._FETCH_URL = "hm://related-playlists-view/track/";
    /**
     * @param {Object} data
     * @return {?}
     */
    create.prototype._decorateResult = function(data) {
      var imageUrl;
      var restoreScript;
      var modifiers;
      return data && (data.followers_count && (data.name && data.uri)) ? (restoreScript = this.validateClass(data.uri), modifiers = this.config.get("mediaModifiersPlaylists") + " " + restoreScript, this.isCurated(data.uri) && (modifiers += " curated"), imageUrl = data.image_url ? this.imageResolver.resolve(data.image_url, 60) : this.imageResolver.fetch(data.uri, restoreScript), {
        uri : data.uri,
        imageUrl : imageUrl,
        name : decodeURIComponent(data.name),
        modifiers : modifiers,
        meta : data.followers_count + " Followers",
        followers : data.followers_count,
        description : "",
        hasDescription : false,
        hasMeta : true,
        owner : {
          name : data.owner_name,
          uri : data.owner_uri
        }
      }) : false;
    };
    /**
     * @param {?} b
     * @param {?} a
     * @return {?}
     */
    create.prototype._sortByFollowers = function(b, a) {
      return a.followers_count - b.followers_count;
    };
    /**
     * @param {Array} results
     * @param {?} content
     * @return {undefined}
     */
    create.prototype._filterResults = function(results, content) {
      var prevTag = results.sort(this._sortByFollowers);
      parent.prototype._filterResults.call(this, prevTag, content);
    };
    /** @type {function (Object, ?, ?, Object, ?, ?): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} leaf
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/collections/collection_tracks.js" : function(leaf, module) {
    /**
     * @param {Object} spy
     * @param {?} attr
     * @param {?} spec
     * @param {Object} var_args
     * @return {undefined}
     */
    function create(spy, attr, spec, var_args) {
      /** @type {Object} */
      this.imageResolver = var_args;
      parent.call(this, spy, attr, spec);
    }
    var parent = leaf("./scripts/collections/collection.js");
    /** @type {Object} */
    create.prototype = Object.create(parent.prototype);
    /** @type {string} */
    create.prototype._RESULT_KEY = "tracks";
    /** @type {string} */
    create.prototype._FETCH_URL = "hm://radio-apollo/v1/tracks";
    /**
     * @param {Object} item
     * @return {?}
     */
    create.prototype._decorateResult = function(item) {
      var options = {
        artists : [{
          uri : item.artistUri,
          name : item.artistName
        }],
        modifiers : this.config.get("mediaModifiersTracks"),
        imageUrl : this.imageResolver.resolve(item.imageUri, 60),
        uri : item.uri,
        name : item.name
      };
      return options.uri && (options.name && options.imageUrl) ? options : false;
    };
    /**
     * @param {string} id
     * @return {?}
     */
    create.prototype._createFetchObj = function(id) {
      return{
        url : this._FETCH_URL + "?seed=" + id
      };
    };
    /** @type {function (Object, ?, ?, Object): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./@supported-languages.json" : function(dataAndEvents, module) {
    /** @type {Array} */
    module.exports = ["arb", "bn", "de", "el", "en", "es-419", "es", "fi", "fr", "fr-ca", "hi", "hu", "id", "it", "ja", "ko", "nl", "pl", "pt-br", "ro", "ru", "sv", "ta", "th", "tr", "zh-hant", "zsm"];
  },
  /**
   * @param {?} require
   * @param {Object} mod
   * @return {undefined}
   */
  "./node_modules/spotify-live/index.js" : function(require, mod) {
    var constructor = require("./node_modules/prime/index.js");
    var complete = require("./node_modules/prime/defer.js");
    var Dispatcher = require("./node_modules/prime/emitter.js");
    var next = require("./node_modules/mout/lang/kindOf.js");
    var assert = require("./node_modules/mout/object/forIn.js");
    var forOwn = require("./node_modules/mout/lang/isPlainObject.js");
    var flag = require("./node_modules/mout/object/filter.js");
    var getActual = require("./node_modules/mout/object/mixIn.js");
    var helper = require("./node_modules/mout/array/difference.js");
    var each = require("./node_modules/mout/array/forEach.js");
    var indexOf = require("./node_modules/mout/array/combine.js");
    var inspect = require("./node_modules/mout/array/append.js");
    var func = require("./node_modules/mout/array/remove.js");
    var $ = require("./node_modules/mout/array/filter.js");
    var get = require("./node_modules/mout/array/map.js");
    var prompt = require("./node_modules/finally/index.js");
    /** @type {function (this:(Array.<T>|{length: number}), *=, *=, ...[T]): Array.<T>} */
    var apsp = Array.prototype.splice;
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var _ = Array.prototype.slice;
    var err = Dispatcher.EMIT_SYNC;
    var RegExp = require("./node_modules/spotify-live/util/range.js").Range;
    var trim = require("./node_modules/spotify-live/util/parser.js");
    /**
     * @param {Object} obj
     * @return {?}
     */
    var getType = function(obj) {
      if (obj instanceof Promise || obj instanceof type) {
        return "live";
      }
      if (forOwn(obj)) {
        return "Array" === next(obj.operations) ? "list" : "object";
      }
      var string = next(obj);
      return "Array" === string ? "list" : "String" === string ? "string" : null;
    };
    /**
     * @param {Object} obj
     * @return {?}
     */
    var serialize = function(obj) {
      return obj instanceof type || obj instanceof Promise ? obj.serialize() : obj;
    };
    var Promise = constructor({
      mixin : Dispatcher,
      /**
       * @param {number} config
       * @return {undefined}
       */
      constructor : function(config) {
        this.length = config || 0;
        /** @type {Array} */
        this._index = [];
      },
      /**
       * @param {Function} index
       * @param {(Function|string)} length
       * @param {Object} data
       * @param {boolean} deepDataAndEvents
       * @return {?}
       */
      _mesh : function(index, length, data, deepDataAndEvents) {
        /** @type {number} */
        index = +index || 0;
        /** @type {number} */
        length = +length || 0;
        if (!data) {
          /** @type {Array} */
          data = [];
        }
        if (index > this.length) {
          /** @type {Function} */
          this.length = index;
        }
        if (index + length > this.length) {
          /** @type {number} */
          length = this.length - index;
        }
        var size = data.length;
        var regex = new RegExp(index, index + length);
        var reg = new RegExp(index, index + size);
        if (length) {
          this._index = regex.extract(this._index);
        }
        if (size) {
          this._index = reg.insert(this._index);
        }
        data = get(data, function(obj) {
          switch(getType(obj)) {
            case "object":
              return traverse(obj, deepDataAndEvents);
            case "list":
              return callback(obj, deepDataAndEvents);
          }
          return obj;
        });
        var bulk;
        /** @type {number} */
        var i = 6E4;
        if (data.length > i) {
          /** @type {number} */
          var offset = 0;
          /** @type {boolean} */
          var symbols = !!length;
          for (;offset < data.length || symbols;) {
            var globalDefQueue = data.slice(offset, offset + i);
            /** @type {Array.<?>} */
            var fn = apsp.apply(this, [offset + index, symbols ? length : 0].concat(globalDefQueue));
            if (symbols) {
              /** @type {Array.<?>} */
              bulk = fn;
            }
            offset += i;
            /** @type {boolean} */
            symbols = false;
          }
        } else {
          /** @type {Array.<?>} */
          bulk = apsp.apply(this, [index, length].concat(data));
        }
        if (length || size) {
          var msg = {
            /** @type {Function} */
            index : index,
            insert : data,
            remove : bulk
          };
          this.emit("update", msg);
          if (deepDataAndEvents) {
            this.emit("publish", msg);
          }
        }
        return bulk;
      },
      /**
       * @param {?} opt_attributes
       * @return {?}
       */
      update : function(opt_attributes) {
        return this._update(opt_attributes);
      },
      /**
       * @param {string} event
       * @return {?}
       */
      publish : function(event) {
        return this._update(event, true);
      },
      /**
       * @param {Function} elem
       * @param {boolean} deepDataAndEvents
       * @return {?}
       */
      _update : function(elem, deepDataAndEvents) {
        var attrs;
        switch(next(elem)) {
          case "Array":
            /** @type {Array} */
            attrs = [{
              index : 0,
              remove : this.length,
              /** @type {Function} */
              insert : elem
            }];
            break;
          case "Object":
            attrs = elem.operations;
            break;
          default:
            /** @type {Array} */
            attrs = [];
        }
        return each(attrs, function(s) {
          if (s.length) {
            this.length = s.length;
          }
          this._mesh(s.index, s.remove, s.insert, deepDataAndEvents);
        }, this), this;
      },
      /**
       * @return {?}
       */
      serialize : function() {
        var prevSources;
        return prevSources = 1 === this._index.length && this.length === this._index[this._index.length - 1].end ? [] : {
          length : this.length
        }, each(this._index, function(first) {
          var i = first.start;
          for (;i < first.end;i++) {
            prevSources[i] = serialize(this[i]);
          }
        }, this), prevSources;
      },
      /**
       * @param {string} id
       * @param {Function} success
       * @param {number} c
       * @return {?}
       */
      query : function(id, success, c) {
        if (!c) {
          /** @type {number} */
          c = EOF;
        }
        var response;
        return load(this, {
          query : trim(id)
        }, function(dataAndEvents, resp, multiline) {
          if (success) {
            if (multiline && c === EOF) {
              complete(function() {
                success(null, resp);
              });
            } else {
              success(null, resp);
            }
          } else {
            response = resp;
          }
        }, !success || c === b), success ? this : response;
      },
      /**
       * @param {?} obj
       * @return {undefined}
       */
      _wait : function(obj) {
        var self = this;
        if (this._waiting || (this._waiting = []), this._required || (this._required = []), each(this._waiting, function(arr) {
          obj = arr.remove(obj);
        }), obj.length) {
          var cnl = this._required.length;
          each(obj, function(b) {
            self._required = b.merge(self._required);
          });
          if (0 === cnl) {
            complete(function() {
              each(this._required, function(b) {
                self._waiting = b.merge(self._waiting);
              });
              this.emit("wait", this._required);
              var timer;
              if (exports.debug) {
                /** @type {number} */
                timer = setTimeout(function() {
                  console.warn(self, "is waiting for", self._waiting);
                  /** @type {null} */
                  timer = null;
                }, 2E3);
              }
              each(this._required, function(name) {
                self.get(name, function(fmt) {
                  return fmt ? console.error(fmt) : (self._waiting = name.remove(self._waiting), void(exports.debug && (console.log(self, "done waiting for", name), !self._waiting.length && (timer && clearTimeout(timer)))));
                });
              });
              delete this._required;
            }, this);
          }
        }
      },
      /**
       * @param {?} obj
       * @param {Function} next
       * @return {undefined}
       */
      _get : function(obj, next) {
        var self = this;
        /**
         * @return {?}
         */
        var contains = function() {
          var b = self._index;
          return each(obj, function(a) {
            b = a.subtract(b);
          }), b;
        };
        var suiteView = contains();
        if (suiteView.length) {
          this._wait(suiteView);
          /**
           * @return {undefined}
           */
          var one = function() {
            var codeSegments = contains();
            if (!codeSegments.length) {
              self.off("update", one);
              next();
            }
          };
          this.on("update", one);
        } else {
          next(null, true);
        }
      },
      /**
       * @param {string} name
       * @param {Function} value
       * @return {?}
       */
      get : function(name, value) {
        if (1 === arguments.length && "number" == typeof name) {
          return this[name];
        }
        var key;
        var c;
        var attr;
        var seen = this;
        /** @type {Array.<?>} */
        var funcs = _.call(arguments);
        /** @type {boolean} */
        var buf = false;
        /** @type {boolean} */
        var found = false;
        if (each(funcs, function(err, i) {
          if ("Function" === next(err)) {
            /** @type {Array.<?>} */
            var line = funcs.splice(i, 2);
            return key = line[0], c = line[1] || EOF, false;
          }
        }), name instanceof RegExp) {
          /** @type {Array.<?>} */
          attr = funcs;
          if (attr.length > 1) {
            /** @type {boolean} */
            buf = true;
          }
        } else {
          if ("Array" === next(name)) {
            /** @type {boolean} */
            buf = true;
            /** @type {string} */
            attr = name;
          } else {
            /** @type {boolean} */
            var compareResult = !isNaN(+value);
            if (!compareResult) {
              value = name + 1;
            }
            /** @type {boolean} */
            found = !compareResult;
            /** @type {Array} */
            attr = [new RegExp(name, value)];
          }
        }
        /**
         * @param {boolean} next
         * @return {?}
         */
        var fn = function(next) {
          if (found) {
            return seen[name];
          }
          if (next) {
            return get(attr, function(config) {
              return _.call(seen, config.start, config.end);
            });
          }
          var value = attr[0];
          return _.call(seen, value.start, value.end);
        };
        /**
         * @return {?}
         */
        var success = function() {
          return key.apply(null, [null].concat(fn(true)));
        };
        return key ? (c === b ? success() : this._get(attr, function(dataAndEvents, multiline) {
          if (multiline && c === EOF) {
            complete(success);
          } else {
            success();
          }
        }), this) : fn(buf);
      }
    });
    var obj = {};
    var type = constructor({
      mixin : Dispatcher,
      /**
       * @param {?} uri
       * @return {undefined}
       */
      constructor : function(uri) {
        this.uri = uri;
        this._data = {};
        this.emit("init", err);
      },
      /**
       * @param {?} name
       * @return {?}
       */
      "delete" : function(name) {
        var testSource = this._data;
        var ref = testSource[name];
        return delete testSource[name], ref;
      },
      /**
       * @return {undefined}
       */
      emit : function() {
        var stringValue = this.uri;
        if (stringValue) {
          /** @type {Array} */
          var keys = instance.keys;
          /** @type {Array} */
          var values = instance.values;
          /** @type {Array.<?>} */
          var args = _.call(arguments);
          args.splice(1, 0, this);
          each(keys, function(pattern, i) {
            if (stringValue.match(pattern)) {
              var promise = values[i];
              promise.emit.apply(promise, args);
            }
          });
        }
        Dispatcher.prototype.emit.apply(this, arguments);
      },
      /**
       * @param {?} opt_attributes
       * @return {?}
       */
      update : function(opt_attributes) {
        return this._update(opt_attributes);
      },
      /**
       * @param {string} event
       * @return {?}
       */
      publish : function(event) {
        return this._update(event, true);
      },
      /**
       * @param {?} event
       * @param {boolean} deepDataAndEvents
       * @return {?}
       */
      _update : function(event, deepDataAndEvents) {
        var resultItems = this._data;
        var core = this._emit;
        if (!core) {
          var arr2 = getActual({}, resultItems);
          core = this._emit = {
            publish : {},
            update : {}
          };
          complete(function() {
            var obj = flag(core.update, function(dataAndEvents, i) {
              return resultItems[i] !== arr2[i];
            });
            var source = flag(core.publish, function(dataAndEvents, i) {
              return resultItems[i] !== arr2[i];
            });
            delete this._emit;
            var prop;
            for (prop in obj) {
              this.emit("update", obj, err);
              break;
            }
            for (prop in source) {
              this.emit("publish", source, err);
              break;
            }
          }, this);
        }
        return assert(event, function(obj, i) {
          var result = resultItems[i];
          var type = getType(obj);
          if ("list" === type && result instanceof Promise) {
            result._update(obj, deepDataAndEvents);
          } else {
            if ("object" === type) {
              obj = traverse(obj, deepDataAndEvents);
            } else {
              if ("list" === type) {
                obj = callback(obj, deepDataAndEvents);
              }
            }
            resultItems[i] = core.update[i] = obj;
            if (deepDataAndEvents) {
              core.publish[i] = obj;
            }
          }
        }, this), this;
      },
      /**
       * @return {?}
       */
      serialize : function() {
        var result = {};
        var testSource = this._data;
        var name;
        for (name in testSource) {
          result[name] = serialize(testSource[name]);
        }
        return result;
      },
      /**
       * @param {string} source
       * @param {Function} success
       * @param {number} c
       * @return {?}
       */
      query : function(source, success, c) {
        if (!c) {
          /** @type {number} */
          c = EOF;
        }
        var response;
        return setup(this, trim(source), function(dataAndEvents, resp, deepDataAndEvents) {
          if (success) {
            if (deepDataAndEvents && (c !== a && c !== b)) {
              complete(function() {
                success(null, resp);
              });
            } else {
              success(null, resp);
            }
          } else {
            response = resp;
          }
        }, !success || c === b), success ? this : response;
      },
      /**
       * @param {?} obj
       * @return {undefined}
       */
      _wait : function(obj) {
        var name = this._waiting || (this._waiting = []);
        var keys = this._required || (this._required = []);
        var names = helper(obj, name);
        if (names.length) {
          var il = keys.length;
          indexOf(keys, names);
          if (0 === il) {
            complete(function() {
              inspect(name, keys);
              this.emit("wait", keys);
              var error;
              var timer;
              if (exports.debug) {
                error = this.uri;
                /** @type {number} */
                timer = setTimeout(function() {
                  console.warn(error, "is waiting _for", name);
                  /** @type {null} */
                  timer = null;
                }, 2E3);
              }
              var component = this;
              each(keys, function(newName) {
                component.get(newName, function(fmt) {
                  return fmt ? console.error(fmt) : (func(name, newName), void(exports.debug && (console.log(error, "done waiting for", newName), !name.length && (timer && clearTimeout(timer)))));
                });
              });
              delete this._required;
            }, this);
          }
        }
      },
      /**
       * @param {?} id
       * @param {Function} next
       * @return {undefined}
       */
      _get : function(id, next) {
        var event = this;
        var data = this._data;
        var existing = $(id, function(override) {
          return!(override in data);
        });
        if (existing.length) {
          this._wait(existing);
          /**
           * @param {?} types
           * @return {undefined}
           */
          var one = function(types) {
            var i;
            for (i in types) {
              func(existing, i);
            }
            if (!existing.length) {
              event.off("update", one);
              next();
            }
          };
          this.on("update", one);
        } else {
          next(null, true);
        }
      },
      /**
       * @param {string} name
       * @return {?}
       */
      get : function(name) {
        var old = this._data;
        if (1 === arguments.length && "string" == typeof name) {
          return old[name];
        }
        var j;
        var c;
        var attr;
        /** @type {Array.<?>} */
        var funcs = _.call(arguments);
        each(funcs, function(err, i) {
          if ("Function" === next(err)) {
            /** @type {Array.<?>} */
            var item = funcs.splice(i, 2);
            return j = item[0], c = item[1] || EOF, false;
          }
        });
        /** @type {boolean} */
        var udataCur = false;
        if ("Array" === next(name)) {
          /** @type {string} */
          attr = name;
          /** @type {boolean} */
          udataCur = true;
        } else {
          /** @type {Array.<?>} */
          attr = funcs;
          if (attr.length > 1) {
            /** @type {boolean} */
            udataCur = true;
          }
        }
        /**
         * @param {boolean} value
         * @return {?}
         */
        var fn = function(value) {
          return value ? get(attr, function(name) {
            return old[name];
          }) : old[attr[0]];
        };
        /**
         * @return {undefined}
         */
        var success = function() {
          j.apply(null, [null].concat(fn(true)));
        };
        return j ? (c === b ? success() : this._get(attr, function(dataAndEvents, multiline) {
          if (multiline && c === EOF) {
            complete(success);
          } else {
            success();
          }
        }), this) : fn(udataCur);
      }
    });
    /**
     * @param {Node} self
     * @param {Array} obj
     * @param {Function} cb
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    var setup = function(self, obj, cb, deepDataAndEvents) {
      var flags = {};
      if (!obj) {
        /** @type {Array} */
        obj = [];
      }
      var str = get(obj, "key");
      if (!str.length) {
        return cb(null, flags, true);
      }
      /**
       * @param {Array} dataType
       * @param {boolean} files
       * @return {undefined}
       */
      var run = function(dataType, files) {
        var r = prompt();
        r.parallel(obj, function(args) {
          var field = this;
          var key = args.key;
          var value = self._data[key];
          if (value instanceof Promise) {
            load(value, args, function(dataAndEvents, value, deepDataAndEvents) {
              if (!deepDataAndEvents) {
                /** @type {boolean} */
                files = false;
              }
              field.done(null, flags[key] = value);
            }, deepDataAndEvents);
          } else {
            if (value instanceof type) {
              setup(value, args.query, function(dataAndEvents, value, deepDataAndEvents) {
                if (!deepDataAndEvents) {
                  /** @type {boolean} */
                  files = false;
                }
                field.done(null, flags[key] = value);
              }, deepDataAndEvents);
            } else {
              field.done(null, flags[key] = value);
            }
          }
        });
        r.finally(function(outErr) {
          cb(outErr, flags, files);
        });
      };
      if (deepDataAndEvents) {
        run(null, true);
      } else {
        self._get(str, run);
      }
    };
    /**
     * @param {Array} value
     * @param {Object} args
     * @param {Function} callback
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    var load = function(value, args, callback, deepDataAndEvents) {
      /** @type {Array} */
      var flags = [];
      var r = args.range;
      if (r || (r = new RegExp(0, value.length)), !r.length) {
        return callback(null, flags, true);
      }
      var a = r.start;
      var rl = r.end;
      /**
       * @param {Array} event
       * @param {boolean} arg
       * @return {undefined}
       */
      var next = function(event, arg) {
        /** @type {Array} */
        var progressValues = [];
        /** @type {number} */
        var numHashedBlocks = 0;
        /**
         * @param {Node} value
         * @return {undefined}
         */
        var run = function(value) {
          progressValues.push(function() {
            var field = this;
            /** @type {number} */
            var key = numHashedBlocks++;
            if (value instanceof type) {
              setup(value, args.query, function(dataAndEvents, value, deepDataAndEvents) {
                if (!deepDataAndEvents) {
                  /** @type {boolean} */
                  arg = false;
                }
                field.done(null, flags[key] = value);
              }, deepDataAndEvents);
            } else {
              if (value instanceof Promise) {
                load(value, args, function(dataAndEvents, value, deepDataAndEvents) {
                  if (!deepDataAndEvents) {
                    /** @type {boolean} */
                    arg = false;
                  }
                  field.done(null, flags[key] = value);
                }, deepDataAndEvents);
              } else {
                field.done(null, flags[key] = value);
              }
            }
          });
        };
        var name = a;
        for (;rl > name;name++) {
          run(value[name], name);
        }
        prompt(progressValues).finally(function(basis) {
          callback(basis, flags, arg);
        });
      };
      if (deepDataAndEvents) {
        next(null, true);
      } else {
        value._get([r], next);
      }
    };
    var state = {
      values : [],
      keys : []
    };
    var cfg = {
      values : [],
      keys : []
    };
    /**
     * @param {Object} event
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    var traverse = function(event, deepDataAndEvents) {
      var child;
      var val = event.uri;
      if (val) {
        var current = obj[val];
        if (current) {
          child = current;
        } else {
          var Splice;
          each(state.keys, function(pattern, a) {
            return val.match(pattern) ? !(Splice = state.values[a]) : void 0;
          });
          child = obj[val] = Splice ? new Splice(val) : new type(val);
          each(cfg.keys, function(pattern, prop) {
            if (val.match(pattern)) {
              cfg.values[prop].call(child, child);
            }
          });
        }
      } else {
        child = new type;
      }
      return child._update(event, deepDataAndEvents);
    };
    /**
     * @param {?} arg
     * @param {boolean} deepDataAndEvents
     * @return {?}
     */
    var callback = function(arg, deepDataAndEvents) {
      var self = new Promise;
      return self._update(arg, deepDataAndEvents);
    };
    /**
     * @param {Object} spy
     * @return {?}
     */
    var exports = function(spy) {
      switch(spy || (spy = {}), getType(spy)) {
        case "list":
          return callback(spy);
        case "string":
          return traverse({
            uri : spy
          });
        case "object":
          return traverse(spy);
        case "live":
          return spy;
      }
      return null;
    };
    /**
     * @param {(RegExp|string)} parent
     * @param {(RegExp|string)} node
     * @return {?}
     */
    exports.register = function(parent, node) {
      if (1 === arguments.length) {
        if (node = parent, parent = node.matches, node.register) {
          node.register();
        } else {
          if ("Object" === next(node)) {
            return assert(node, function(view) {
              exports.register(view);
            }), this;
          }
        }
      }
      return node.prototype instanceof type ? (state.keys.unshift(parent), state.values.unshift(node)) : "Function" === next(node) && (cfg.keys.push(parent), cfg.values.push(node)), this;
    };
    var instance = {
      keys : [],
      values : []
    };
    /**
     * @param {(RegExp|string)} opt_attributes
     * @param {Function} name
     * @param {Function} method
     * @return {?}
     */
    exports.subscribe = function(opt_attributes, name, method) {
      if (opt_attributes.matches) {
        opt_attributes = opt_attributes.matches;
      }
      var client;
      var i = opt_attributes.toString();
      /** @type {Array} */
      var keys = instance.keys;
      /** @type {Array} */
      var values = instance.values;
      return each(keys, function(dstUri, name) {
        return dstUri.toString() === i ? !(client = values[name]) : void 0;
      }), client || (keys.push(opt_attributes), values.push(client = new Dispatcher)), client.on(name, method), this;
    };
    /**
     * @param {(RegExp|string)} opt_attributes
     * @param {string} event
     * @param {Function} method
     * @return {?}
     */
    exports.unsubscribe = function(opt_attributes, event, method) {
      if (opt_attributes.matches) {
        opt_attributes = opt_attributes.matches;
      }
      var router;
      var o = opt_attributes.toString();
      /** @type {Array} */
      var keys = instance.keys;
      /** @type {Array} */
      var values = instance.values;
      return each(keys, function(dstUri, i) {
        return dstUri.toString() === o ? !(router = values[i]) : void 0;
      }), router && router.off(event, method), this;
    };
    /**
     * @param {?} name
     * @return {undefined}
     */
    exports.delete = function(name) {
      delete obj[name];
    };
    /** @type {number} */
    var EOF = exports.ASYNC = 0;
    /** @type {number} */
    var b = exports.SYNC = 1;
    /** @type {number} */
    var a = exports.ASAP = 2;
    exports.Model = type;
    exports.List = Promise;
    /** @type {function (Object): ?} */
    mod.exports = exports;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {string} manager
   * @return {undefined}
   */
  "./node_modules/spotify-events/player.js" : function(require, dataAndEvents, manager) {
    /**
     * @param {Object} err
     * @return {?}
     */
    function cb(err) {
      return "[data-context][data-uri" + err.operator + err.uri + "]";
    }
    /**
     * @param {?} err
     * @param {string} val
     * @return {?}
     */
    function next(err, val) {
      var desc = cb(err);
      return desc + " [data-context-index=" + val + "]";
    }
    /**
     * @param {string} n
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    function f(n, dataAndEvents) {
      /** @type {Array} */
      var data = [{
        uri : n,
        operator : "="
      }];
      var id = isArray(n);
      if (n !== id && data.push({
        uri : id,
        operator : "="
      }), dataAndEvents) {
        var o = n.match(/^spotify:internal:(.*?):sorted/);
        if (o) {
          var url = "spotify:" + o[1];
          data.push({
            uri : url,
            operator : "="
          });
          id = isArray("spotify:" + o[1]);
          if (id !== url) {
            data.push({
              uri : "spotify:" + id,
              operator : "="
            });
          }
        } else {
          data.push({
            uri : n.replace(/^spotify:/, "spotify:internal:") + ":sorted",
            operator : "^="
          });
          if (n !== id) {
            data.push({
              uri : id.replace(/^spotify:/, "spotify:internal:") + ":sorted",
              operator : "^="
            });
          }
        }
      }
      return data;
    }
    /**
     * @param {string} value
     * @param {string} val
     * @param {number} version
     * @return {?}
     */
    function check(value, val, version) {
      var match = f(val);
      var o = clean(value, match, version) || [];
      var res = f(val, true);
      var c = handler(value, res, version) || [];
      var d = search(value, res, version) || [];
      return jQuery([c, o, d]);
    }
    /**
     * @param {string} target
     * @param {?} v
     * @param {number} error
     * @return {?}
     */
    function handler(target, v, error) {
      var url = parse(v, function(evt) {
        return cb(evt);
      });
      var elem = url.join(", ");
      var ret = target.search(elem);
      return ret = filter(error, ret);
    }
    /**
     * @param {string} str
     * @param {?} string
     * @param {(number|string)} num
     * @return {?}
     */
    function clean(str, string, num) {
      var ast = parse(string, function(err) {
        return next(err, num);
      });
      return str.search(ast.join(", "));
    }
    /**
     * @param {string} text
     * @param {?} name
     * @param {number} error
     * @return {?}
     */
    function search(text, name, error) {
      var parsed = parse(name, function(evt) {
        return cb(evt);
      });
      /** @type {string} */
      var b = "[data-range]";
      parsed = parse(parsed, function(a) {
        /** @type {string} */
        var name = a + " " + b;
        /** @type {string} */
        var c = a + b;
        /** @type {string} */
        var s = [name, c].join(", ");
        return s;
      });
      var reversed = text.search(parsed.join(", "));
      return filter(error, reversed);
    }
    /**
     * @param {number} severity
     * @param {Object} arr
     * @return {?}
     */
    function filter(severity, arr) {
      var activeClassName = null != severity ? new rchecked(severity, severity + 1) : null;
      return arr && (activeClassName && (arr = arr.filter(function(sel) {
        sel = jQuery(sel);
        var value = sel.data("range");
        return value ? (value = rchecked.fromString(value), value.contains(activeClassName)) : true;
      }))), arr;
    }
    /**
     * @param {?} obj
     * @param {?} object
     * @return {?}
     */
    function toArray(obj, object) {
      return obj = isArray($(obj).get("origin") || obj), object = isArray($(object).get("origin") || object), obj === object;
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function isArray(value) {
      var iterator = nodes.from(value);
      return iterator ? iterator.toString() : value;
    }
    var getActual = require("./node_modules/mout/array/indexOf.js");
    var fn = require("./node_modules/mout/array/difference.js");
    var parseInt = (require("./node_modules/mout/array/combine.js"), require("./node_modules/mout/array/forEach.js"));
    var parse = require("./node_modules/mout/array/map.js");
    var $ = require("./node_modules/spotify-live/index.js");
    var rchecked = require("./node_modules/spotify-live/util/range.js").Range;
    var nodes = require("./node_modules/spotify-liburi/src/uri.js");
    var Events = require("./node_modules/spotify-events/center.js");
    var jQuery = require("./node_modules/spotify-events/node_modules/elements/index.js");
    var Block = require("./node_modules/spotify-events/selection/index.js");
    /** @type {string} */
    var form = "spotify:player";
    /** @type {string} */
    var base = "current";
    /** @type {string} */
    var end = "paused";
    /** @type {string} */
    var IN_CLASS = "playing";
    /**
     * @param {Object} obj
     * @return {?}
     */
    var find = function(obj) {
      var self = obj.matches("[data-play-source]") ? obj : obj.parent("[data-play-source]");
      return self && self.data("play-source");
    };
    /**
     * @param {?} __
     * @param {Object} self
     * @return {undefined}
     */
    var callback = function(__, self) {
      var $this = $(form);
      var res = $this.get("context");
      var option = $this.get("index");
      var cycleID = $this.get("playing");
      if (void 0 !== res && (void 0 !== option && void 0 !== cycleID)) {
        var api = func(self);
        if (api) {
          var start;
          var sel;
          var target = self.matches("[data-context-index]") ? self : self.parent("[data-context-index]");
          var key = find(self);
          var value = self.data("range");
          if (value) {
            sel = rchecked.fromString(value);
            start = sel.start;
          } else {
            /** @type {(null|number)} */
            start = target ? +target.data("context-index") : null;
          }
          var suiteView = res && res.get("uri");
          var round = toArray(suiteView, api);
          /** @type {boolean} */
          var num = false;
          if (round && (num = sel ? null == option ? false : sel.contains(new rchecked(option, option + 1)) : null != start ? start === option : true), num) {
            $this.emit(cycleID ? "pause" : "resume");
          } else {
            var args = {
              context : {
                uri : api
              },
              index : start,
              playing : true,
              source : key,
              reason : "playbtn"
            };
            if (sel) {
              /** @type {Array} */
              args.range = [sel.start, sel.end];
            }
            $this.emit("play", args);
          }
        }
      }
    };
    /**
     * @param {Node} el
     * @return {?}
     */
    var setElementValue = function(el) {
      var args = el.tagName.toLowerCase();
      /** @type {Array} */
      var tags = ["input", "textarea", "button", "select", "optgroup", "option", "a"];
      return getActual(tags, args) > -1;
    };
    /**
     * @param {Object} event
     * @return {undefined}
     */
    var update = function(event) {
      /** @type {boolean} */
      var t = 13 === event.keyCode;
      if (t) {
        if (setElementValue(event.target)) {
          return;
        }
        var a = Block.getIndicesGlobal();
        if (a) {
          var url = a.uri;
          var idx = a.indices[0];
          var keys = a.containers[0];
          if (url && void 0 !== idx) {
            var self = $(form);
            var key = find(keys);
            self.emit("play", {
              context : {
                uri : url
              },
              index : idx,
              source : key,
              reason : "clickrow"
            });
            event.preventDefault();
            event.stopPropagation();
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    var one = function() {
      var helper = $(form);
      if (helper.get("context")) {
        toCamelCase();
      }
    };
    /**
     * @return {undefined}
     */
    var pdataOld = function() {
      toCamelCase();
    };
    /**
     * @param {Event} e
     * @param {Object} context
     * @return {undefined}
     */
    var close = function(e, context) {
      var self = $(form);
      var result = jQuery(e.target);
      var o = result.matches("[data-button=play]") || result.parent("[data-button=play]");
      if (!o) {
        var i = context.parent("[data-context]");
        var u = i.data("uri");
        /** @type {number} */
        var idx = +context.data("context-index");
        var key = find(context);
        self.emit("play", {
          context : {
            uri : u
          },
          index : idx,
          source : key,
          reason : "clickrow"
        });
      }
    };
    /**
     * @param {Object} target
     * @return {?}
     */
    var func = function(target) {
      target = jQuery(target);
      var i = target.matches("[data-context]") ? target : target.parent("[data-context]");
      if (i) {
        return i.data("uri");
      }
    };
    /**
     * @param {string} attributes
     * @return {undefined}
     */
    var init = function(attributes) {
      var cDigit = attributes.search("[data-button=play]");
      if (cDigit) {
        parseInt(cDigit, function(name) {
          var input = func(name);
          var search = $(input);
          var results = search.get("tracks");
          if (results) {
            done(name, results.length);
            if (!search._hasPlayButtonUpdateHandler) {
              /** @type {boolean} */
              search._hasPlayButtonUpdateHandler = true;
              results.on("update", function() {
                done(name, results.length);
              });
            }
          }
        });
      }
    };
    /**
     * @param {Element} e
     * @param {number} total
     * @return {undefined}
     */
    var done = function(e, total) {
      if (0 === total) {
        e.setAttribute("disabled", "");
      } else {
        e.removeAttribute("disabled");
      }
    };
    var self = jQuery(document);
    /**
     * @return {?}
     */
    manager.attach = function() {
      var obj = $(form);
      return obj.on("update", one), self.on("keydown", update), self.delegate("dblclick", "[data-context] [data-list-item]", close), self.delegate("click", "[data-button=play]", callback), Events.on("scroll-show-after", pdataOld), this;
    };
    /**
     * @return {?}
     */
    manager.detach = function() {
      var $this = $(form);
      return $this.off("update", one), self.off("keydown", update), self.undelegate("dblclick", "[data-context] [data-list-item]", close), self.undelegate("click", "[data-button=play]", callback), Events.off("scroll-show-after", pdataOld), this;
    };
    /** @type {function (?): ?} */
    var toCamelCase = manager.update = function(opt_attributes) {
      opt_attributes = jQuery(opt_attributes) || self;
      var helper = $(form);
      return init(opt_attributes), helper.get("context", "index", "playing", function(dataAndEvents, io, lowVersion, reverse) {
        var err;
        if (io) {
          var value = io.get("uri");
          err = check(opt_attributes, value, lowVersion);
        }
        var data = opt_attributes.search("[data-playback-active=true]");
        if (data) {
          var cDigit = err ? fn(data, err) : data;
          parseInt(cDigit, function(root) {
            root = jQuery(root);
            /** @type {string} */
            var klass = [base, end, IN_CLASS].join(" ");
            root.removeClass(klass).removeAttribute("data-playback-active");
          });
        }
        if (err) {
          var str = data ? fn(err, data) : err;
          parseInt(str, function(page) {
            page = jQuery(page);
            /** @type {string} */
            var id = [base, reverse ? IN_CLASS : end].join(" ");
            page.addClass(id).data("playback-active", true);
          });
          var r = fn(err, str);
          parseInt(r, function(root) {
            root = jQuery(root);
            /** @type {string} */
            var klass = reverse ? end : IN_CLASS;
            /** @type {string} */
            var className = reverse ? IN_CLASS : end;
            if (root.hasClass(klass)) {
              root.removeClass(klass);
            }
            if (!root.hasClass(className)) {
              root.addClass(className);
            }
          });
        }
      }), this;
    };
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} binding
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/album.js" : function(require, dataAndEvents, binding) {
    /**
     * @param {Object} a
     * @return {undefined}
     */
    function open(a) {
      $timeout("album_metadata", [a.uri], function(dataAndEvents, attributes) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        a.update(attributes);
      });
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function read(options) {
      var type = lang.from(options.uri).type;
      options.update({
        local : type === lang.Type.LOCAL_ALBUM
      });
    }
    /**
     * @param {Object} s
     * @return {undefined}
     */
    function onSuccess(s) {
      var req = {
        type : "list",
        uri : s.uri
      };
      $timeout("album_tracks_snapshot", [req, 0, 0, false], function(dataAndEvents, newlines) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        $timeout("album_tracks_snapshot", [req, 0, newlines.length, false], function(dataAndEvents, c) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          /** @type {Array} */
          var deps = [];
          var name = lang.from(s.uri).id;
          var actual = getActual(c.metadata, function(value, index) {
            var doc = group({
              uri : c.array[index]
            }, value);
            /** @type {number} */
            var i = doc.disc ? doc.disc - 1 : 0;
            return doc.unavailable = !doc.playable, activate(doc), deps[i] || (deps[i] = {
              tracks : [],
              uri : name ? lang.albumURI(name, i + 1).toURI() : ""
            }), deps[i].tracks.push(doc), doc;
          });
          s.update({
            tracks : actual,
            discs : deps
          });
        });
      });
    }
    /**
     * @param {Object} item
     * @return {undefined}
     */
    function activate(item) {
      if (item.album && item.album.uri) {
        var originalType = lang.from(item.album.uri).type;
        /** @type {boolean} */
        item.album.local = originalType === lang.Type.LOCAL_ALBUM;
      }
      if (item.artists) {
        /** @type {number} */
        var id = 0;
        var cnl = item.artists.length;
        for (;cnl > id;id++) {
          var options = item.artists[id];
          if (options.uri) {
            var type = lang.from(options.uri).type;
            /** @type {boolean} */
            options.local = type === lang.Type.LOCAL_ARTIST;
          }
        }
      }
    }
    /**
     * @param {Object} body
     * @param {?} update
     * @return {undefined}
     */
    function init(body, update) {
      var throttledUpdate = requestAnimationFrame(update, "local");
      var radius = requestAnimationFrame(update, "tracks");
      var id = requestAnimationFrame(update, "discs");
      /** @type {Array} */
      var attributes = ["artists", "image", "images", "name", "playable", "type", "availability", "date", "label", "copyrights"];
      /** @type {boolean} */
      var l = !!$(update, attributes).length;
      if (l) {
        open(body);
      }
      if (radius || id) {
        onSuccess(body);
      }
      if (throttledUpdate) {
        read(body);
      }
    }
    var utils = require("./node_modules/spotify-live/index.js");
    var lang = require("./node_modules/spotify-liburi/src/uri.js");
    var $ = require("./node_modules/mout/array/intersection.js");
    var requestAnimationFrame = require("./node_modules/mout/array/contains.js");
    var getActual = require("./node_modules/mout/array/map.js");
    var group = require("./node_modules/mout/object/mixIn.js");
    var $timeout = require("./node_modules/spotify-live-models/util/bridge.js").request;
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:album:[0-9a-zA-Z]+$|^spotify:local:[^:]*:[^:]*$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      utils.subscribe(attributes, "wait", init);
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      utils.unsubscribe(attributes, "wait", init);
    };
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} binding
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/artist.js" : function(require, dataAndEvents, binding) {
    /**
     * @param {Object} self
     * @return {undefined}
     */
    function handler(self) {
      fix("artist_metadata", [self.uri], function(dataAndEvents, attributes) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        if (!attributes.image) {
          if (!self.get("image")) {
            /** @type {string} */
            attributes.image = "";
          }
        }
        if (!attributes.images) {
          if (!self.get("images")) {
            /** @type {Array} */
            attributes.images = [];
          }
        }
        self.update(attributes);
      });
    }
    /**
     * @param {Object} self
     * @return {undefined}
     */
    function callback(self) {
      var type = lang.from(self.uri).type;
      self.update({
        local : type === lang.Type.LOCAL_ARTIST
      });
    }
    /**
     * @param {Object} value
     * @param {Array} obj
     * @return {undefined}
     */
    function method(value, obj) {
      var str = inspect(obj, "local");
      /** @type {boolean} */
      var i = false;
      /** @type {Array} */
      var j = ["image", "images", "name", "popularity"];
      /** @type {number} */
      var b = 0;
      var a = obj.length;
      for (;a > b;b++) {
        if (inspect(j, obj[b])) {
          /** @type {boolean} */
          i = true;
          break;
        }
      }
      if (i) {
        handler(value);
      }
      if (str) {
        callback(value);
      }
    }
    var lang = require("./node_modules/spotify-liburi/src/uri.js");
    var inspect = require("./node_modules/mout/array/contains.js");
    var $ = require("./node_modules/spotify-live/index.js");
    var fix = require("./node_modules/spotify-live-models/util/bridge.js").request;
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:artist:|^spotify:local:[^:]*$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      $.subscribe(attributes, "wait", method);
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      $.unsubscribe(attributes, "wait", method);
    };
  },
  /**
   * @param {?} require
   * @param {?} deepDataAndEvents
   * @param {Object} binding
   * @param {?} dataAndEvents
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/playlist.js" : function(require, deepDataAndEvents, binding, dataAndEvents) {
    /**
     * @param {Object} context
     * @return {undefined}
     */
    function render(context) {
      debug("playlist_event_wait_any", [context.uri], function(dataAndEvents, response) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        var that = response.data.uri ? self(response.data.uri) : context;
        if ("change" === response.type) {
          response.data.isFollowing = response.data.subscribed;
          that.update(response.data);
        }
        render(that);
      });
    }
    /**
     * @param {Object} v
     * @return {undefined}
     */
    function complete(v) {
      debug("playlist_event_wait", [v.uri], function(dataAndEvents, options) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        switch(options.type) {
          case "change":
            v.update(options.data);
            break;
          case "insert":
            parse(v, options.index, options.uris);
            break;
          case "remove":
            cb(v, options.indices);
            break;
          case "move":
            callback(v, options.indices, options.index);
        }
        complete(v);
      });
    }
    /**
     * @param {Node} style
     * @return {?}
     */
    function normalize(style) {
      /** @type {Array} */
      var out = [];
      if (!style._hasTracks) {
        return out;
      }
      var copies = style.get("tracks");
      var items = style.get("rows");
      return copies && out.push(copies), items && out.push(items), out;
    }
    /**
     * @param {Object} style
     * @param {number} cb
     * @param {Array} parts
     * @return {undefined}
     */
    function parse(style, cb, parts) {
      var target = normalize(style);
      if (0 !== target.length) {
        path.insert(target, cb, new Array(parts.length));
        start(style, cb, parts.length);
      }
    }
    /**
     * @param {Node} name
     * @param {?} item
     * @return {undefined}
     */
    function cb(name, item) {
      path.remove(normalize(name), item);
    }
    /**
     * @param {Node} style
     * @param {?} filename
     * @param {?} x
     * @return {undefined}
     */
    function callback(style, filename, x) {
      path.move(normalize(style), filename, x);
    }
    /**
     * @param {Object} file
     * @param {boolean} callback
     * @return {undefined}
     */
    function send(file, callback) {
      debug("playlist_metadata", [file.uri], function(dataAndEvents, attributes) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        file.update(attributes);
        if (callback) {
          if (!attributes.images) {
            next(file);
          }
        }
      });
    }
    /**
     * @param {Object} file
     * @return {undefined}
     */
    function next(file) {
      debug("playlist_profile", [file.uri], function(dataAndEvents, attributes) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        if (!attributes.image) {
          /** @type {string} */
          attributes.image = "";
        }
        if (!attributes.images) {
          /** @type {Array} */
          attributes.images = [];
        }
        file.update(attributes);
      });
    }
    /**
     * @param {Object} m
     * @return {undefined}
     */
    function update(m) {
      debug("playlist_popularity", [m.uri], function(dataAndEvents, attributes) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        m.update(attributes);
        console.info('populari', attributes, m)
      });
    }
    /**
     * @param {Object} opts
     * @return {undefined}
     */
    function onSuccess(opts) {
      var options = {
        uri : opts.uri,
        type : "list"
      };
      debug("playlist_tracks_snapshot", [options, 0, 0, false], function(dataAndEvents, newlines) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        var srv = new length(newlines.length);
        var results = new length(newlines.length);
        opts.update({
          tracks : srv,
          rows : results
        });
        srv.on("wait", function(selected) {
          template(opts, srv, selected);
        });
        results.on("wait", function(completeEvent) {
          stop(opts, results, completeEvent);
        });
        if (0 === srv.length) {
          /** @type {boolean} */
          opts._hasTracks = true;
        }
      });
    }
    /**
     * @param {Object} args
     * @param {number} f
     * @param {?} ui
     * @return {undefined}
     */
    function start(args, f, ui) {
      var a = args.get("tracks");
      var b = args.get("rows");
      if (a || b) {
        var options = {
          uri : args.uri,
          type : "list"
        };
        debug("playlist_tracks_snapshot", [options, f, ui, false], function(dataAndEvents, str) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          var results = constructor(str);
          var registry = {
            length : str.length,
            index : f,
            remove : ui,
            insert : results.tracks
          };
          var out = {
            length : str.length,
            index : f,
            remove : ui,
            insert : results.rows
          };
          a.update({
            operations : [registry]
          });
          b.update({
            operations : [out]
          });
          /** @type {boolean} */
          args._hasTracks = true;
        });
      }
    }
    /**
     * @param {string} string
     * @return {?}
     */
    function quote(string) {
      return string.replace("spotify:", "spotify:row:" + (++UID).toString(36) + ":");
    }
    /**
     * @param {Object} config
     * @return {?}
     */
    function constructor(config) {
      /** @type {Array} */
      var params = [];
      /** @type {Array} */
      var assigns = [];
      /** @type {number} */
      var i = 0;
      var l = config.array.length;
      for (;l > i;i++) {
        var track = config.metadata[i];
        var options = nopt({
          uri : config.array[i]
        }, track.track || track);
        if (init(options), errorHandler(options), options.unavailable = !options.playable, delete options.images, options.album && delete options.album.images, options.artists) {
          /** @type {number} */
          var id = 0;
          var cnl = options.artists.length;
          for (;cnl > id;id++) {
            delete options.artists[id].images;
          }
        }
        var data = options.addedBy;
        if ("string" == typeof data) {
          data = {
            name : options.addedBy,
            username : options.addedBy,
            uri : lang.profileURI(options.addedBy).toURI()
          };
        }
        var vvar = {
          uri : quote(options.uri),
          track : options,
          dateAdded : options.dateAdded,
          addedBy : data
        };
        params.push(options);
        assigns.push(vvar);
        delete options.dateAdded;
        delete options.addedBy;
      }
      console.info('construct', config, params, assigns, options)
      return{
        tracks : params,
        rows : assigns
      };
    }
    /**
     * @param {Object} data
     * @return {undefined}
     */
    function init(data) {
      if (!("album" in data)) {
        data.album = {
          uri : "",
          name : "",
          local : false
        };
      }
      if (!("artists" in data)) {
        /** @type {Array} */
        data.artists = [];
      }
      if (!("advertisement" in data)) {
        /** @type {boolean} */
        data.advertisement = false;
      }
      if (!("availability" in data)) {
        /** @type {string} */
        data.availability = "unavailable";
      }
      if (!("disc" in data)) {
        /** @type {number} */
        data.disc = 0;
      }
      if (!("duration" in data)) {
        /** @type {number} */
        data.duration = 0;
      }
      if (!("explicit" in data)) {
        /** @type {boolean} */
        data.explicit = false;
      }
      if (!("image" in data)) {
        /** @type {string} */
        data.image = "";
      }
      if (!("local" in data)) {
        /** @type {boolean} */
        data.local = false;
      }
      if (!("name" in data)) {
        /** @type {string} */
        data.name = "";
      }
      if (!("number" in data)) {
        /** @type {number} */
        data.number = 0;
      }
      if (!("playable" in data)) {
        /** @type {boolean} */
        data.playable = false;
      }
      if (!("popularity" in data)) {
        /** @type {number} */
        data.popularity = 0;
      }
      if (!("starred" in data)) {
        /** @type {boolean} */
        data.starred = false;
      }
      if (!("unavailable" in data)) {
        /** @type {boolean} */
        data.unavailable = true;
      }
      console.info('init', data)
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function errorHandler(options) {
      if (options.album && options.album.uri) {
        var originalType = lang.from(options.album.uri).type;
        /** @type {boolean} */
        options.album.local = originalType === lang.Type.LOCAL_ALBUM;
      }
      if (options.artists) {
        /** @type {number} */
        var id = 0;
        var cnl = options.artists.length;
        for (;cnl > id;id++) {
          var self = options.artists[id];
          if (self.uri) {
            var type = lang.from(self.uri).type;
            /** @type {boolean} */
            self.local = type === lang.Type.LOCAL_ARTIST;
          }
        }
      }
    }
    /**
     * @param {Object} file
     * @param {?} element
     * @return {undefined}
     */
    function resume(file, element) {
      var program;
      var inverse;
      var o;
      var restoreScript;
      var s;
      var elementRect = trigger(element, "availableOffline");
      var classes = trigger(element, "shouldBeOffline");
      var $element = trigger(element, "offlineProgress");
      /** @type {Array} */
      var columnIds = ["collaborative", "subscribed", "published", "name", "owner", "description", "allows"];
      $(element, function(type) {
        if ("tracks" === type) {
          /** @type {boolean} */
          program = true;
        }
        if ("rows" === type) {
          /** @type {boolean} */
          inverse = true;
        }
        if ("popularity" === type) {
          /** @type {boolean} */
          o = true;
        }
        if ("image" === type || "images" === type) {
          /** @type {boolean} */
          restoreScript = true;
        }
        if (!s) {
          if (trigger(columnIds, type)) {
            /** @type {boolean} */
            s = true;
          }
        }
      });
      if (s) {
        send(file, restoreScript);
      } else {
        if (restoreScript) {
          next(file);
        }
      }
      if (o) {
        update(file);
      }
      if (program || inverse) {
        onSuccess(file);
      }
      if (elementRect || classes) {
        load(file);
      }
      if ($element) {
        run(file);
      }
      console.info('resume', file, this)
    }
    /**
     * @param {Object} delta
     * @return {undefined}
     */
    function animate(delta) {
      complete(delta);
      if (dataAndEvents._getSpotifyModule) {
        render(delta);
      }
    }
    /**
     * @param {Object} context
     * @param {Object} index
     * @return {undefined}
     */
    function key(context, index) {
      if ("shouldBeOffline" in index) {
        parsePage(context, index.shouldBeOffline);
      } else {
        if ("availableOffline" in index) {
          parsePage(context, index.availableOffline);
        }
      }
    }
    /**
     * @param {Object} source
     * @return {undefined}
     */
    function load(source) {
      _this.subscribe({
        url : "sp://offline/v1/resources?uri=" + source.uri
      }, function(operation, req) {
        if (operation) {
          if (!operation.response || -104 !== operation.response.getStatusCode()) {
            throw operation;
          }
          if (dataAndEvents._getSpotifyModule) {
            debug("offline_query_state", [source.uri], function(dataAndEvents, x) {
              if (dataAndEvents) {
                throw dataAndEvents;
              }
              getValue(source, {
                offline_availability : x.enabled ? "yes" : "no"
              });
            });
          } else {
            getValue(source, {
              offline_availability : "no"
            });
          }
        } else {
          var attributes = req.body.resources;
          getValue(source, attributes);
        }
      });
    }
    /**
     * @param {Object} element
     * @param {?} opt_attributes
     * @return {undefined}
     */
    function getValue(element, opt_attributes) {
      /** @type {boolean} */
      var availableOffline = false;
      switch(opt_attributes.offline_availability) {
        case "waiting":
          /** @type {boolean} */
          availableOffline = true;
          break;
        case "downloading":
          /** @type {boolean} */
          availableOffline = true;
          break;
        case "yes":
          /** @type {boolean} */
          availableOffline = true;
      }
      element.update({
        availableOffline : availableOffline,
        shouldBeOffline : availableOffline
      });
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function run(options) {
      _this.subscribe({
        url : "sp://offline/v1/progress?uri=" + options.uri
      }, function(operation, def) {
        if (operation) {
          if (!operation.response || -104 !== operation.response.getStatusCode()) {
            throw operation;
          }
          if (dataAndEvents._getSpotifyModule) {
            debug("offline_query_state", [options.uri], function(dataAndEvents, $animator) {
              if (dataAndEvents) {
                throw dataAndEvents;
              }
              options.update({
                offlineProgress : $animator.enabled ? 1 : 0
              });
            });
          } else {
            options.update({
              offlineProgress : 0
            });
          }
        } else {
          var progress = def.body.progress;
          options.update({
            offlineProgress : progress.percent_complete || 0
          });
        }
      });
    }
    /**
     * @param {Object} data
     * @param {boolean} id
     * @return {undefined}
     */
    function parsePage(data, id) {
      /** @type {string} */
      var method = id ? "post" : "delete";
      _this[method]({
        url : "sp://offline/v1/resources?uri=" + data.uri
      }, function(operation) {
        if (operation) {
          if (operation.response && -104 === operation.response.getStatusCode()) {
            if (dataAndEvents._getSpotifyModule) {
              /** @type {string} */
              var options = id ? "offline_enable_sync" : "offline_disable_sync";
              debug(options, [data.uri], function(dataAndEvents) {
                if (dataAndEvents) {
                  getValue(data, {
                    offline_availability : id ? "no" : "yes"
                  });
                }
              });
            } else {
              getValue(data, {
                offline_availability : id ? "no" : "yes"
              });
            }
          } else {
            getValue(data, {
              offline_availability : id ? "no" : "yes"
            });
          }
        }
      });
    }
    /**
     * @param {Object} options
     * @param {?} srv
     * @param {?} data
     * @return {undefined}
     */
    function template(options, srv, data) {
      if (data.toString() !== options._lastRequestedRanges) {
        options._lastRequestedRanges = data.toString();
        $(data, function(touch) {
          start(options, touch.start, touch.length);
        });
      }
    }
    /**
     * @param {Object} options
     * @param {?} callback
     * @param {?} e
     * @return {undefined}
     */
    function stop(options, callback, e) {
      if (e.toString() !== options._lastRequestedRanges) {
        options._lastRequestedRanges = e.toString();
        $(e, function(touch) {
          start(options, touch.start, touch.length);
        });
      }
    }
    /**
     * @param {Array} opts
     * @param {Function} elements
     * @return {undefined}
     */
    function view(opts, elements) {
      debug("playlist_tracks_clear", [{
        uri : opts.uri,
        type : "list"
      }], elements);
    }
    /**
     * @param {Array} arg
     * @param {?} str
     * @param {Function} val
     * @return {undefined}
     */
    function method(arg, str, val) {
      debug("playlist_tracks_append", [{
        uri : arg.uri,
        type : "list"
      }].concat(str), val);
    }
    /**
     * @param {Array} module
     * @param {Object} effect
     * @param {?} a
     * @return {undefined}
     */
    function remove(module, effect, a) {
      var self;
      /**
       * @param {(boolean|number|string)} a
       * @param {?} end
       * @return {?}
       */
      var index = function(a, end) {
        return end - getActual(effect.operations, function(dataAndEvents, rule, b) {
          return a > b && (rule.remove && rule.index < end) ? dataAndEvents + 1 : dataAndEvents;
        }, 0);
      };
      /** @type {number} */
      var i = 0;
      /** @type {boolean} */
      var s = false;
      /**
       * @param {boolean} d
       * @return {undefined}
       */
      var val = function(d) {
        if (d) {
          if (console) {
            console.error("Error addRemove tracks", d);
          }
        }
        if (d || effect.operations.length === ++i) {
          if (a) {
            if (!s) {
              /** @type {boolean} */
              s = true;
              a(d);
            }
          }
        }
      };
      /** @type {number} */
      var h = 0;
      for (;self = effect.operations[h];h++) {
        if (null == self.insert) {
          /** @type {Array} */
          self.insert = [];
        }
        if (null != self.remove) {
          debug("playlist_tracks_remove", [{
            uri : module.uri,
            type : "list"
          }, index(h, self.index), self.atIndex], val);
        }
        if (self.insert.length) {
          if (self.atIndex) {
            debug("playlist_tracks_insert", [{
              uri : module.uri,
              type : "list"
            }, index(h, self.index), self.atIndex].concat(self.insert), val);
          } else {
            debug("playlist_tracks_append", [{
              uri : module.uri,
              type : "list"
            }].concat(self.insert), val);
          }
        }
      }
    }
    var trigger = require("./node_modules/mout/array/contains.js");
    var $ = require("./node_modules/mout/array/forEach.js");
    var nopt = (require("./node_modules/mout/array/map.js"), require("./node_modules/mout/object/mixIn.js"));
    var getActual = require("./node_modules/mout/array/reduce.js");
    var self = require("./node_modules/spotify-live/index.js");
    var lang = require("./node_modules/spotify-liburi/src/uri.js");
    var length = self.List;
    var _this = (require("./node_modules/spotify-live/util/range.js").Range, require("./node_modules/spotify-live-models/util/cosmos.js"));
    var debug = require("./node_modules/spotify-live-models/util/bridge.js").request;
    var path = require("./node_modules/spotify-live-models/util/list.js");
    /** @type {number} */
    var UID = 1E3;
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:user:(.*):playlist|^spotify:internal:temp_playlist:|^spotify:temp-playlist:|^spotify:user:[^:]+:starred$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      self.subscribe(attributes, "append-tracks", method);
      self.subscribe(attributes, "clear-tracks", view);
      self.subscribe(attributes, "add-remove-tracks", remove);
      self.subscribe(attributes, "wait", resume);
      self.subscribe(attributes, "init", animate);
      self.subscribe(attributes, "publish", key);
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      self.unsubscribe(attributes, "append-tracks", method);
      self.unsubscribe(attributes, "clear-tracks", view);
      self.unsubscribe(attributes, "add-remove-tracks", remove);
      self.unsubscribe(attributes, "wait", resume);
      self.unsubscribe(attributes, "init", animate);
      self.unsubscribe(attributes, "publish", key);
    };
  },
  /**
   * @param {?} require
   * @param {?} deepDataAndEvents
   * @param {Object} binding
   * @param {?} dataAndEvents
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/track.js" : function(require, deepDataAndEvents, binding, dataAndEvents) {
    /**
     * @param {Object} b
     * @param {?} update
     * @return {undefined}
     */
    function resume(b, update) {
      if (requestAnimationFrame(update, "unavailable")) {
        b.get("playable", function(deepDataAndEvents, dataAndEvents) {
          if (deepDataAndEvents) {
            throw deepDataAndEvents;
          }
          b.update({
            unavailable : !dataAndEvents
          });
        }, self.ASAP);
      }
      /** @type {boolean} */
      var n = !!$(update, i).length;
      if (n) {
        callback(b);
      }
      var id = requestAnimationFrame(update, "shouldBeOffline");
      var throttledUpdate = requestAnimationFrame(update, "offlineProgress");
      if (id || throttledUpdate) {
        start(b);
      }
    }
    /**
     * @param {Object} self
     * @return {undefined}
     */
    function callback(self) {
      valueOf("track_metadata", [self.uri], function(dataAndEvents, attributes) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        self.update(attributes);
      });
    }
    /**
     * @param {Object} args
     * @return {undefined}
     */
    function start(args) {
      core.subscribe({
        url : "sp://offline/v1/resources?uri=" + args.uri
      }, function(operation, req) {
        if (operation) {
          if (!operation.response || -104 !== operation.response.getStatusCode()) {
            throw operation;
          }
          onSuccess(args, {
            offline_availability : "no"
          });
        } else {
          var suiteView = req.body.resources;
          onSuccess(args, suiteView);
        }
      });
    }
    /**
     * @param {Object} callback
     * @param {?} obj
     * @return {undefined}
     */
    function onSuccess(callback, obj) {
      /** @type {boolean} */
      var shouldBeOffline = false;
      /** @type {number} */
      var offlineProgress = 0;
      switch(obj.offline_availability) {
        case "waiting":
          /** @type {boolean} */
          shouldBeOffline = true;
          /** @type {number} */
          offlineProgress = 0;
          break;
        case "downloading":
          /** @type {boolean} */
          shouldBeOffline = true;
          /** @type {number} */
          offlineProgress = 0.5;
          break;
        case "yes":
          /** @type {boolean} */
          shouldBeOffline = true;
          /** @type {number} */
          offlineProgress = 1;
      }
      callback.update({
        shouldBeOffline : shouldBeOffline,
        offlineProgress : offlineProgress
      });
    }
    /**
     * @param {Object} d
     * @param {boolean} up
     * @return {undefined}
     */
    function findFirst(d, up) {
      /** @type {string} */
      var o = up ? "library_star" : "library_unstar";
      valueOf(o, ["spotify:user:@", d.uri], function(dataAndEvents) {
        if (dataAndEvents) {
          d.update({
            starred : !up
          });
        }
      });
    }
    /**
     * @return {undefined}
     */
    function init() {
      valueOf("track_event_wait_any", [], function(dataAndEvents, response) {
        if (d) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          init();
          if ("change" === response.type) {
            if (void 0 !== response.data.playable) {
              /** @type {boolean} */
              response.data.unavailable = !response.data.playable;
            }
            self(response.data.uri).update(response.data);
          }
        }
      });
    }
    /**
     * @param {Object} d
     * @param {Object} data
     * @return {undefined}
     */
    function method(d, data) {
      if ("starred" in data) {
        findFirst(d, data.starred);
      }
    }
    var d;
    var self = require("./node_modules/spotify-live/index.js");
    var $ = require("./node_modules/mout/array/intersection.js");
    var requestAnimationFrame = require("./node_modules/mout/array/contains.js");
    var valueOf = require("./node_modules/spotify-live-models/util/bridge.js").request;
    var core = require("./node_modules/spotify-live-models/util/cosmos.js");
    /** @type {Array} */
    var i = ["album", "artists", "availability", "disc", "duration", "explicit", "image", "local", "name", "number", "placeholder", "playable", "popularity", "starred"];
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:track:|^spotify:local:[^:]*:[^:]*:[^:]*:\d*$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      if (!d) {
        /** @type {boolean} */
        d = true;
        self.subscribe(attributes, "wait", resume);
        self.subscribe(attributes, "publish", method);
        if (dataAndEvents._getSpotifyModule) {
          init();
        }
      }
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      if (d) {
        /** @type {boolean} */
        d = false;
        self.unsubscribe(attributes, "wait", resume);
        self.unsubscribe(attributes, "publish", method);
      }
    };
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} binding
   * @param {Window} $window
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/player.js" : function(require, dataAndEvents, binding, $window) {
    /**
     * @param {string} id
     * @param {?} name
     * @return {?}
     */
    function contains(id, name) {
      return name ? id + ":" + name : id;
    }
    /**
     * @param {Function} callback
     * @return {?}
     */
    function remove(callback) {
      var result = $("spotify:player").get("referrer");
      return result ? callback(null, result) : void $("spotify:application").get("appURI", "arguments", function(err, model, name) {
        return err ? callback(err) : void callback(null, contains(model, name));
      });
    }
    /**
     * @param {?} val
     * @param {?} result
     * @param {Function} callback
     * @return {undefined}
     */
    function notify(val, result, callback) {
      /** @type {Array.<?>} */
      val = me.call(val, result.start, result.end);
      var actual = getActual();
      inspect(val, function(game, i) {
        actual.then(function() {
          var template = this;
          game.get("playable", function(regex, dataAndEvents) {
            if (regex || dataAndEvents === false) {
              template.continue(regex);
            } else {
              template.break(null, i + result.start);
            }
          });
        });
      });
      actual.finally(function(basis, mongoObject) {
        callback(basis, mongoObject);
      });
    }
    /**
     * @param {?} source
     * @param {?} output
     * @param {Object} key
     * @param {Function} o
     * @param {number} index
     * @return {undefined}
     */
    function callback(source, output, key, o, index) {
      var options = new Promise({
        context : key,
        /** @type {Function} */
        tracks : o
      });
      if (void 0 !== index) {
        /** @type {number} */
        options.index = index;
      }
      options.play_origin.source = source;
      options.play_origin.reason = output;
      self.get("player", function(dataAndEvents, params) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        remove(function(dataAndEvents, deepDataAndEvents) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          params.setReferrer(deepDataAndEvents);
          params.play(options);
        });
      });
    }
    /**
     * @param {Object} obj
     * @param {Object} params
     * @return {undefined}
     */
    function update(obj, params) {
      var context = params.context;
      var index = params.index;
      var source = params.source || "unknown";
      var output = params.reason || "unknown";
      var attributes = {
        playing : true
      };
      var expectationResult = params.range && new Range(params.range[0], params.range[1]);
      if (context ? (attributes.context = context, attributes.index = void 0 === index ? null : index) : (context = obj.get("context"), void 0 !== index && (attributes.index = index)), obj.update(attributes), context) {
        var i = context.uri;
        var type = nodes.from(i).type;
        /** @type {boolean} */
        var stream = type === nodes.Type.TRACK;
        if (stream) {
          callback(source, output, i, [i]);
        } else {
          /** @type {boolean} */
          var isCSS = type === nodes.Type.PLAYLIST;
          var tr = $(i).get("tracks");
          if (!isCSS && (tr && tr.length > 0)) {
            var group = jQuery(tr, function(module) {
              return module.uri;
            });
            if (expectationResult) {
              notify(tr, expectationResult, function(dataAndEvents, time) {
                if (dataAndEvents || void 0 === time) {
                  method(obj);
                } else {
                  callback(source, output, i, group, time);
                }
              });
            } else {
              callback(source, output, i, group, index);
            }
          } else {
            var data = e.stateFromUri(i);
            data.context = i;
            data.play_origin.source = source;
            data.play_origin.reason = output;
            if (void 0 !== index) {
              data.index = index;
            }
            self.get("player", function(dataAndEvents, buffer) {
              if (dataAndEvents) {
                throw dataAndEvents;
              }
              remove(function(dataAndEvents, deepDataAndEvents) {
                if (dataAndEvents) {
                  throw dataAndEvents;
                }
                buffer.setReferrer(deepDataAndEvents);
                buffer.play(data);
              });
            });
          }
        }
      }
    }
    /**
     * @param {Array} index
     * @param {Object} context
     * @return {undefined}
     */
    function init(index, context) {
      var c = context.context;
      var j = context.index;
      index.update({
        context : c,
        index : context.isIndexRemoved ? -1 : j
      });
      j++;
      var app = c.uri;
      var scripts = $(app).get("tracks");
      var attributes = new Promise({
        context : app,
        index : j,
        tracks : jQuery(scripts, function(module) {
          return module.uri;
        })
      });
      self.get("player", function(dataAndEvents, m) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        m.update(attributes);
      });
    }
    /**
     * @param {Object} options
     * @return {?}
     */
    function play(options) {
      var args = options.play_origin || {};
      /** @type {null} */
      var context = null;
      return options.context && (context = {
        uri : options.context || options.track
      }), {
        playing : options.playing,
        context : context,
        index : options.index || 0,
        track : {
          uri : options.track
        },
        origin : {
          source : args.source,
          reason : args.reason,
          referrer : args.referrer,
          referrerVersion : args.referrer_version,
          referrerVendor : args.referrer_vendor
        }
      };
    }
    /**
     * @param {Object} obj
     * @return {undefined}
     */
    function method(obj) {
      self.get("player", function(dataAndEvents, res) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        res.getState(function(dataAndEvents, properties) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          /** @type {*} */
          properties = JSON.parse(properties.getBody());
          obj.update(play(properties));
        });
      });
    }
    /**
     * @param {Array} props
     * @return {undefined}
     */
    function animate(props) {
      props.update({
        playing : false
      });
      self.get("player", function(dataAndEvents, gridStore) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        gridStore.pause();
      });
    }
    /**
     * @param {Array} container
     * @return {undefined}
     */
    function resume(container) {
      container.update({
        playing : true
      });
      self.get("player", function(dataAndEvents, res) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        res.resume();
      });
    }
    /**
     * @param {?} session
     * @return {undefined}
     */
    function success(session) {
      if (assert(session, "player")) {
        $("spotify:application").get("appURI", "version", "arguments", function(deepDataAndEvents, context, dataAndEvents, elem) {
          if (deepDataAndEvents) {
            throw deepDataAndEvents;
          }
          if ("0.0.0" === dataAndEvents) {
            if ($window.console) {
              if (console.warn) {
                console.warn("missing version from the spotify:application model");
              }
            }
          }
          var target = contains(context, elem);
          self.update({
            player : new e(resolver, target, dataAndEvents, "com.spotify")
          });
        });
      }
    }
    /**
     * @param {?} params
     * @return {undefined}
     */
    function attributes(params) {
      if (params) {
        throw params;
      }
      method($("spotify:player"));
    }
    var y;
    var resolver = require("./node_modules/spotify-cosmos-api/index.js").resolver;
    var collection = require("./node_modules/spotify-player/lib/v1/index.js");
    var $ = require("./node_modules/spotify-live/index.js");
    var nodes = require("./node_modules/spotify-liburi/src/uri.js");
    var assert = require("./node_modules/mout/array/contains.js");
    var jQuery = require("./node_modules/mout/array/map.js");
    var inspect = require("./node_modules/mout/array/forEach.js");
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var me = Array.prototype.slice;
    var Range = require("./node_modules/spotify-live/util/range.js").Range;
    var getActual = require("./node_modules/finally/index.js");
    var e = collection.Player;
    var Promise = collection.PlayerState;
    var self = $("spotify#cosmos");
    /** @type {RegExp} */
    var opt_attributes = binding.matches = /^spotify:player$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      if (!y) {
        /** @type {boolean} */
        y = true;
        $.subscribe(opt_attributes, "play", update);
        $.subscribe(opt_attributes, "pause", animate);
        $.subscribe(opt_attributes, "resume", resume);
        $.subscribe(opt_attributes, "wait", method);
        $.subscribe(opt_attributes, "update-context", init);
        self.on("wait", success);
        self.get("player", function(dataAndEvents, m) {
          if (y) {
            if (dataAndEvents) {
              throw dataAndEvents;
            }
            m.subscribe(attributes);
          }
        });
        /** @type {boolean} */
        y = true;
      }
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      if (y) {
        /** @type {boolean} */
        y = false;
        $.unsubscribe(opt_attributes, "play", update);
        $.unsubscribe(opt_attributes, "pause", animate);
        $.unsubscribe(opt_attributes, "resume", resume);
        $.unsubscribe(opt_attributes, "wait", method);
        $.unsubscribe(opt_attributes, "update-context", init);
        self.off("wait", success);
        self.get("player", function(dataAndEvents, dojo) {
          if (!y) {
            if (dataAndEvents) {
              throw dataAndEvents;
            }
            if (dojo.unsubscribe) {
              dojo.unsubscribe(attributes);
            }
          }
        });
        /** @type {boolean} */
        y = false;
      }
    };
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} binding
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/application.js" : function(require, dataAndEvents, binding) {
    /**
     * @return {undefined}
     */
    function save() {
      success("application_event_wait", [], function(dataAndEvents, event) {
        if (a) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          var m = $("spotify:application");
          switch(event.data && (event.data.arguments && m.update({
            arguments : event.data.arguments.join(":")
          })), event.type) {
            case "activate":
              m.update({
                active : true
              });
              break;
            case "deactivate":
              m.update({
                active : false
              });
          }
          save(m);
        }
      });
    }
    /**
     * @param {Array} $scope
     * @param {?} params
     * @return {undefined}
     */
    function init($scope, params) {
      if (debug(params, "version")) {
        $scope.update({
          version : "0.0.0"
        });
      }
      success("application_query", [], function(dataAndEvents, options) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        var attributes = {};
        if (options.uri) {
          attributes.appURI = options.uri;
        }
        if (options.arguments) {
          attributes.arguments = options.arguments.join(":");
        }
        if (options.active) {
          attributes.active = options.active;
        }
        $scope.update(attributes);
      });
    }
    /**
     * @param {?} index
     * @param {Array} context
     * @return {undefined}
     */
    function key(index, context) {
      success("application_open_uri", [context.uri]);
    }
    /**
     * @param {Node} arr
     * @param {Array} str
     * @return {undefined}
     */
    function method(arr, str) {
      arr.get("appURI", function(deepDataAndEvents, dataAndEvents) {
        if (deepDataAndEvents) {
          throw deepDataAndEvents;
        }
        success("application_open_uri", [str.uri, dataAndEvents]);
      });
    }
    var a;
    var debug = require("./node_modules/mout/array/contains.js");
    var $ = require("./node_modules/spotify-live/index.js");
    var success = require("./node_modules/spotify-live-models/util/bridge.js").request;
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:application$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      if (!a) {
        /** @type {boolean} */
        a = true;
        $.subscribe(attributes, "push-history-state", key);
        $.subscribe(attributes, "replace-history-state", method);
        $.subscribe(attributes, "wait", init);
        save();
      }
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      if (a) {
        /** @type {boolean} */
        a = false;
        $.unsubscribe(attributes, "push-history-state", key);
        $.unsubscribe(attributes, "replace-history-state", method);
        $.unsubscribe(attributes, "wait", init);
      }
    };
  },
  /**
   * @param {?} $
   * @param {?} dataAndEvents
   * @param {Object} options
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/index.js" : function($, dataAndEvents, options) {
    options.album = $("./node_modules/spotify-live-models/album.js");
    options.application = $("./node_modules/spotify-live-models/application.js");
    options.artist = $("./node_modules/spotify-live-models/artist.js");
    options.client = $("./node_modules/spotify-live-models/client.js");
    options.clientStorage = $("./node_modules/spotify-live-models/client-storage.js");
    options.player = $("./node_modules/spotify-live-models/player.js");
    options.playlist = $("./node_modules/spotify-live-models/playlist.js");
    options.sortlist = $("./node_modules/spotify-live-models/sortlist.js");
    options.track = $("./node_modules/spotify-live-models/track.js");
    options.user = $("./node_modules/spotify-live-models/user.js");
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} $animateProvider
   * @return {undefined}
   */
  "./node_modules/spotify-handlebars/index.js" : function(require, dataAndEvents, $animateProvider) {
    var assert = require("./node_modules/mout/lang/kindOf.js");
    var parser = require("./node_modules/handlebars/dist/cjs/handlebars.runtime.js")["default"];
    /**
     * @param {Object} params
     * @return {?}
     */
    $animateProvider.register = function(params) {
      if ("Function" === assert(params)) {
        /** @type {Object} */
        var p = params;
        params = {};
        params[p.displayName] = p;
      }
      var key;
      for (key in params) {
        parser.registerHelper(key, params[key]);
      }
      return this;
    };
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {Object} State
   * @param {Object} obj
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/index.js" : function($sanitize, dataAndEvents, State, obj) {
    var $ = obj.window || {};
    var options = obj.process;
    var Ajaxy = $sanitize("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/index.js");
    var Stub = $sanitize("./node_modules/spotify-cosmos-api/scripts/resolver.js").Resolver;
    /** @type {null} */
    var Resource = null;
    /** @type {null} */
    var callback = null;
    var item = $._getSpotifyModule && ("function" == typeof $._getSpotifyModule && $._getSpotifyModule("bridge"));
    var validOptions = options && (options.title && /node(\.exe)*$/.test(options.argv[0]));
    if (!validOptions) {
      if (item) {
        Resource = $sanitize("./node_modules/spotify-cosmos-api/env/bootstrap.native.js").NativeResolver;
        callback = new Resource(item);
      } else {
        Resource = $sanitize("./node_modules/spotify-cosmos-api/env/bootstrap.web.js").WebResolver;
        callback = new Resource;
      }
    }
    State.Resolver = Stub;
    State.Action = Ajaxy.request.Action;
    State.Request = Ajaxy.request.Request;
    State.Response = Ajaxy.response.Response;
    State.resolver = callback ? new Stub(callback) : null;
  },
  /**
   * @param {?} inspect
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/presentation/recs_view.js" : function(inspect, module) {
    /**
     * @param {Object} spy
     * @param {Function} attr
     * @param {Function} var_args
     * @param {Function} col
     * @param {?} minutes
     * @return {undefined}
     */
    function create(spy, attr, var_args, col, minutes) {
      /** @type {Object} */
      this.id = spy;
      /** @type {Function} */
      this.template = attr;
      /** @type {Function} */
      this.addClass = var_args;
      /** @type {Function} */
      this.removeClass = col;
      this.pubsub = minutes;
      this._createContainer();
      this.setEventListeners();
      /** @type {string} */
      this.noRecsMessage = "No Recommendations Available";
      /** @type {string} */
      this.adMessage = "More recommendations after this advertisement";
      /** @type {string} */
      this.titleEl.innerHTML = "Related Playlists";
      /** @type {string} */
      this.currentTrack = "";
    }
    var str = inspect("./scripts/interfaces/recs_view.js");
    /** @type {Object} */
    create.prototype = Object.create(str);
    /**
     * @return {undefined}
     */
    create.prototype._createContainer = function() {
      /** @type {Element} */
      this.el = document.createElement("div");
      /** @type {string} */
      this.el.className = "view-container";
      this.el.id = this.id;
      /** @type {Element} */
      this.titleContainerEl = document.createElement("div");
      /** @type {string} */
      this.titleContainerEl.className = "section-divider";
      /** @type {Element} */
      this.titleEl = document.createElement("H1");
      /** @type {string} */
      this.titleEl.className = "title";
      this.titleContainerEl.appendChild(this.titleEl);
      this.el.appendChild(this.titleContainerEl);
      /** @type {Element} */
      this.recsContainerEl = document.createElement("div");
      /** @type {string} */
      this.recsContainerEl.className = "recs-container nano-scroll";
      /** @type {Element} */
      this.innerAreaEl = document.createElement("div");
      /** @type {string} */
      this.innerAreaEl.className = "scroll-inner-area";
      /** @type {Element} */
      this.throbberEl = document.createElement("div");
      /** @type {string} */
      this.throbberEl.innerHTML = "<div></div>";
      /** @type {string} */
      this.throbberEl.className = "throbber-initial";
      this.el.appendChild(this.throbberEl);
      this.recsContainerEl.appendChild(this.innerAreaEl);
      this.el.appendChild(this.recsContainerEl);
    };
    /**
     * @return {undefined}
     */
    create.prototype.setEventListeners = function() {
      var params = this;
      this.pubsub.subscribe("newTrack", this.showLoader.bind(this));
      this.pubsub.subscribe("adPlaying", this.showAdMessage.bind(this));
      this.pubsub.subscribe("fetchFail", this.showNoRecsMessage.bind(this));
      this.pubsub.subscribe("fetchSuccess", this.showRecs.bind(this));
      this.pubsub.subscribe("imageReady", function(dataAndEvents, value) {
        params.addImage(value.image, value.DOMClass);
      });
      this.innerAreaEl.addEventListener("click", this._handleRecClick.bind(this));
    };
    /**
     * @param {?} html
     * @return {undefined}
     */
    create.prototype.setTitle = function(html) {
      this.titleEl.innerHTML = html;
    };
    /**
     * @param {string} dataAndEvents
     * @return {undefined}
     */
    create.prototype.setAdMessage = function(dataAndEvents) {
      /** @type {string} */
      this.adMessage = dataAndEvents;
    };
    /**
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    create.prototype.setNoRecsMessage = function(dataAndEvents) {
      this.noRecsMessage = dataAndEvents;
    };
    /**
     * @return {undefined}
     */
    create.prototype.showAdMessage = function() {
      this.innerAreaEl.innerHTML = this.adMessage;
      this.hideLoader();
    };
    /**
     * @return {undefined}
     */
    create.prototype.showNoRecsMessage = function() {
      this.innerAreaEl.innerHTML = this.noRecsMessage;
      this.hideLoader();
    };
    /**
     * @param {?} deepDataAndEvents
     * @param {?} dataAndEvents
     * @return {undefined}
     */
    create.prototype.showRecs = function(deepDataAndEvents, dataAndEvents) {
      /** @type {number} */
      var i = 0;
      var codeSegments = dataAndEvents.recs;
      var n = codeSegments.length;
      var html = 1 > n ? this.noRecsMessage : "";
      for (;n > i;i++) {
        html += this.template(codeSegments[i]);
      }
      this.hideLoader();
      this.innerAreaEl.innerHTML = html;
    };
    /**
     * @param {string} invert
     * @param {string} name
     * @return {undefined}
     */
    create.prototype.addImage = function(invert, name) {
      var parentElement = this.innerAreaEl.querySelector("." + name);
      if (parentElement) {
        /** @type {string} */
        parentElement.querySelector(".mo-image").style.backgroundImage = "url(" + invert + ")";
      }
    };
    /**
     * @param {Event} e
     * @return {?}
     */
    create.prototype._handleRecClick = function(e) {
      var attributes;
      var el = e.target;
      for (;el;el = el.parentNode) {
        if (attributes = el.getAttribute("data-uri")) {
          return void this.pubsub.publish("recClicked", attributes);
        }
        if (el.className === this.el.className) {
          return;
        }
      }
    };
    /**
     * @return {undefined}
     */
    create.prototype.showLoader = function() {
      this.removeClass("hide", this.throbberEl);
      this.addClass("hide", this.innerAreaEl);
    };
    /**
     * @return {undefined}
     */
    create.prototype.hideLoader = function() {
      this.addClass("hide", this.throbberEl);
      this.removeClass("hide", this.innerAreaEl);
    };
    /** @type {function (Object, Function, Function, Function, ?): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} inspect
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/collections/collection.js" : function(inspect, module) {
    /**
     * @param {Object} spy
     * @param {Function} attr
     * @param {Object} config
     * @return {undefined}
     */
    function create(spy, attr, config) {
      /** @type {Object} */
      this.pubsub = spy;
      /** @type {Function} */
      this.cosmos = attr;
      /** @type {Object} */
      this.config = config;
      this.fetchRequest = {
        track : "",
        complete : false
      };
    }
    var str = inspect("./scripts/interfaces/collection.js");
    /** @type {Object} */
    create.prototype = Object.create(str);
    /**
     * @return {undefined}
     */
    create.prototype.init = function() {
      this.pubsub.subscribe("newTrack", this._prepareFetch.bind(this));
    };
    /** @type {string} */
    create.prototype._RESULT_KEY = "items";
    /** @type {string} */
    create.prototype._FETCH_URL = "";
    /**
     * @param {?} dataAndEvents
     * @param {string} track
     * @return {undefined}
     */
    create.prototype._prepareFetch = function(dataAndEvents, track) {
      /** @type {string} */
      this.fetchRequest.track = track;
      /** @type {boolean} */
      this.fetchRequest.complete = false;
      this._fetch(track, this._createFetchObj(track));
      this._setFetchTimeout(track);
    };
    /**
     * @param {string} name
     * @return {?}
     */
    create.prototype._createFetchObj = function(name) {
      return{
        url : this._FETCH_URL + name.substr(14)
      };
    };
    /**
     * @param {?} event
     * @return {undefined}
     */
    create.prototype._setFetchTimeout = function(event) {
      var fixHook = this;
      setTimeout(function() {
        fixHook._handleFetchCompletion(event, false, "fetch_timeout");
      }, 5E3);
    };
    /**
     * @param {?} track
     * @param {boolean} recurring
     * @param {string} msg
     * @return {undefined}
     */
    create.prototype._handleFetchCompletion = function(track, recurring, msg) {
      if (!(this.fetchRequest.track !== track)) {
        if (!this.fetchRequest.complete) {
          /** @type {boolean} */
          this.fetchRequest.complete = true;
          if (recurring) {
            this.pubsub.publish("fetchSuccess", {
              recs : msg,
              track : track
            });
          } else {
            this.pubsub.publish("fetchFail", {
              msg : msg,
              track : track
            });
          }
        }
      }
    };
    /**
     * @param {string} track
     * @param {string} optgroup
     * @return {undefined}
     */
    create.prototype._fetch = function(track, optgroup) {
      var webshims = this;
      this.cosmos.resolver.get(optgroup, function(dataAndEvents, deepDataAndEvents) {
        if (dataAndEvents) {
          webshims._handleFetchCompletion(track, false, "cosmos resolver error");
        } else {
          webshims._checkResults(deepDataAndEvents, track);
        }
      });
    };
    /**
     * @param {Object} deepDataAndEvents
     * @param {?} track
     * @return {undefined}
     */
    create.prototype._checkResults = function(deepDataAndEvents, track) {
      var b;
      try {
        /** @type {*} */
        b = JSON.parse(deepDataAndEvents.getBody());
        if (b && (b[this._RESULT_KEY] && b[this._RESULT_KEY].length)) {
          this._filterResults(b[this._RESULT_KEY], track);
        } else {
          this._handleFetchCompletion(track, false, "no " + this._RESULT_KEY);
        }
      } catch (output) {
        console.log(output);
        this._handleFetchCompletion(track, false, "json parse error");
      }
    };
    /**
     * @param {Array} results
     * @param {?} track
     * @return {undefined}
     */
    create.prototype._filterResults = function(results, track) {
      var collection = this;
      /** @type {Array} */
      var out = [];
      /**
       * @param {Object} datum
       * @return {undefined}
       */
      var getEnumerableProperties = function(datum) {
        var copies = collection._decorateResult(datum);
        if (copies) {
          out.push(copies);
        }
      };
      /** @type {number} */
      var currentParam = 0;
      var iLength = results.length;
      for (;iLength > currentParam;currentParam++) {
        getEnumerableProperties(results[currentParam]);
      }
      this._handleFetchCompletion(track, true, out);
    };
    /**
     * @param {Object} datum
     * @return {?}
     */
    create.prototype._decorateResult = function(datum) {
      return datum;
    };
    /** @type {function (Object, Function, Object): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-dom-logger/dom-logger.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @return {undefined}
     */
    function create(spy) {
      if (spy = spy || {}, this.document = spy.document || document, spy.logger) {
        this.logger = spy.logger;
      } else {
        var Logger = require("./node_modules/spotify-client-logger/src/logger.js");
        this.logger = new Logger;
      }
    }
    /** @type {Array} */
    create.GATHERED_ATTRIBUTES = ["data-log-click", "data-log-context", "data-log-data"];
    /**
     * @return {undefined}
     */
    create.prototype.init = function() {
      this.document.addEventListener("click", this._handleClick.bind(this), true);
    };
    /**
     * @param {(Array|Element)} contains
     * @return {undefined}
     */
    create.prototype.logClick = function(contains) {
      /** @type {(Array|Element)} */
      var elem = contains;
      /** @type {string} */
      var msg = "unknown-element";
      var target = this._gatherAttributes(create.GATHERED_ATTRIBUTES, elem);
      if (target.values["data-log-click"].length) {
        elem = target.nodes["data-log-click"].pop();
        msg = target.values["data-log-click"].pop();
      }
      var e = target.values["data-log-data"] ? this._mergeJSONStrings(target.values["data-log-data"]) : {};
      var segs = target.values["data-log-context"].join("/");
      if (elem.getAttribute("data-log-click-as-select")) {
        this.logger.userSelect(msg, e, segs);
      } else {
        this.logger.userHit(msg, e, segs);
      }
    };
    /**
     * @param {Event} e
     * @return {undefined}
     */
    create.prototype._handleClick = function(e) {
      this.logClick(e.target);
    };
    /**
     * @param {Array} results
     * @return {?}
     */
    create.prototype._mergeJSONStrings = function(results) {
      try {
        results = results.map(function(file_data) {
          return JSON.parse(file_data);
        });
      } catch (t) {
        console.log("Failed to parse data-log-data (needs to be proper JSON):", results);
        /** @type {Array} */
        results = [];
      }
      return results.reduce(function(el, attrs) {
        return Object.keys(attrs).forEach(function(attr) {
          el[attr] = attrs[attr];
        }), el;
      }, {});
    };
    /**
     * @param {Array} varNames
     * @param {Node} elem
     * @param {Object} host
     * @return {?}
     */
    create.prototype._gatherAttributes = function(varNames, elem, host) {
      var self = host || {
        nodes : {},
        values : {}
      };
      if (elem.parentNode) {
        if (elem.parentNode.getAttribute) {
          this._gatherAttributes(varNames, elem.parentNode, self);
        }
      }
      /** @type {number} */
      var i = 0;
      for (;i < varNames.length;i++) {
        var name = varNames[i];
        var copies = elem.getAttribute(name);
        self.values[name] = self.values[name] || [];
        self.nodes[name] = self.nodes[name] || [];
        if (copies) {
          self.values[name].push(copies);
          self.nodes[name].push(elem);
        }
      }
      return self;
    };
    /** @type {function (Object): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-client-logger/src/logger.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @return {undefined}
     */
    function me(spy) {
      this.timers = {};
      if (o) {
        /** @type {boolean} */
        this.showInConsole = spy && "false" === spy.console ? false : value && "false" === value ? false : true;
      }
    }
    var include = require("./node_modules/spotify-bridge-request/index.js");
    /** @type {boolean} */
    var o = "undefined" != typeof console;
    /** @type {boolean} */
    var value = false;
    /** @type {string} */
    var funcToCall = "Success client-log";
    /** @type {string} */
    var hi = "Failed client-log";
    var state = {
      LOG : "log",
      ERROR : "error"
    };
    var INFO_STATE_LOAD_TIMER = {
      USER_IMPRESSION : "user:impression",
      USER_HIT : "user:hit",
      USER_SELECT : "user:select",
      USER_HOVER : "user:hover",
      USER_HOLD_TIMER : "user:hold",
      INFO_TIMER_DEFAULT : "info:timer",
      INFO_STATE_LOAD_TIMER : "info:state_load_timer",
      INFO_DEFAULT : "info:default",
      INFO_WARN : "info:warn",
      ERROR_DEFAULT : "error:default",
      ERROR_USER_ACTION_FAIL : "error:user_action_fail",
      ERROR_RENDER_FAIL : "error:render_fail"
    };
    /**
     * @param {Object} object
     * @param {Object} iterable
     * @return {undefined}
     */
    var toArray = function(object, iterable) {
      var key;
      for (key in iterable) {
        if (!object[key]) {
          object[key] = iterable[key];
        }
      }
    };
    try {
      /** @type {(null|string)} */
      value = window.localStorage.getItem("spotify_client_logger");
    } catch (d) {
    }
    /**
     * @param {?} objects
     * @param {Function} regex
     * @return {undefined}
     */
    me.prototype._requester = function(objects, regex) {
      include("application_client_event", objects, regex);
    };
    /**
     * @param {string} dataAndEvents
     * @param {Object} str
     * @return {?}
     */
    me.prototype._buildBackendData = function(dataAndEvents, str) {
      var expires;
      var context;
      /** @type {string} */
      var optsData = "";
      var result = {};
      if (str.length < 2 && (str = str[0]), Array.isArray(str)) {
        result = "object" == typeof str[1] ? str[1] : {};
        result.event_version = str[0];
        result.context = str[2];
      } else {
        if ("string" == typeof str) {
          return["", dataAndEvents, str, optsData, {}];
        }
        if ("object" != typeof str) {
          throw dataAndEvents + " must log either an object literal or a string";
        }
        /** @type {Object} */
        result = str;
      }
      return(dataAndEvents === INFO_STATE_LOAD_TIMER.USER_HIT || dataAndEvents === INFO_STATE_LOAD_TIMER.USER_SELECT) && (result.event_version || (result.event_version = ""), result.target_uri || (result.target_uri = ""), result.name || (result.name = "")), result.event_version ? (expires = result.event_version || "", delete result.event_version) : expires = "", result.context ? (context = result.context, delete result.context) : context = "", this.constant && toArray(result, this.constant), [context,
      dataAndEvents, expires, optsData, result];
    };
    /**
     * @param {?} name
     * @return {undefined}
     */
    me.prototype._log = function(name) {
      var self = this;
      /**
       * @param {boolean} dataAndEvents
       * @return {undefined}
       */
      var r20 = function(dataAndEvents) {
        if (dataAndEvents && self.showInConsole) {
          self._logInConsole(state.ERROR, hi, name);
        } else {
          if (self.showInConsole) {
            self._logInConsole(state.LOG, funcToCall, name);
          }
        }
      };
      this._requester(name, r20);
    };
    /**
     * @param {string} type
     * @param {string} code
     * @param {?} keepData
     * @return {undefined}
     */
    me.prototype._logInConsole = function(type, code, keepData) {
      var log = console[type] ? console[type] : console.log;
      if ("object" == typeof log) {
        /** @type {Function} */
        log = Function.prototype.bind.call(log, console);
      }
      log.apply(console, [code, keepData]);
    };
    /**
     * @return {undefined}
     */
    me.prototype.userImpression = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.USER_IMPRESSION, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.userHit = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.USER_HIT, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.userSelect = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.USER_SELECT, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.userHover = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.USER_HOVER, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.userHold = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.USER_HOLD_TIMER, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.info = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.INFO_DEFAULT, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.infoWarn = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.INFO_WARN, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.infoStageLoadTimer = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.INFO_STATE_LOAD_TIMER, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.infoTimer = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.INFO_TIMER_DEFAULT, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.error = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.ERROR_DEFAULT, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.errorUserActionFail = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.ERROR_USER_ACTION_FAIL, expectedArgs));
    };
    /**
     * @return {undefined}
     */
    me.prototype.errorRenderFail = function() {
      /** @type {Array.<?>} */
      var expectedArgs = Array.prototype.slice.call(arguments, 0);
      this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.ERROR_RENDER_FAIL, expectedArgs));
    };
    /**
     * @param {?} key
     * @return {undefined}
     */
    me.prototype.startTimer = function(key) {
      /** @type {number} */
      this.timers[key] = (new Date).getTime();
    };
    /**
     * @param {?} i
     * @param {Object} host
     * @return {undefined}
     */
    me.prototype.logTimer = function(i, host) {
      if (this.timers[i]) {
        var self = host || {};
        self.timerName = i;
        /** @type {number} */
        self.elapsedTime = ((new Date).getTime() - this.timers[i]) / 1E3;
        this._log(this._buildBackendData(INFO_STATE_LOAD_TIMER.INFO_TIMER_DEFAULT, self));
      }
    };
    /**
     * @param {?} obj
     * @return {undefined}
     */
    me.prototype.setConstant = function(obj) {
      if ("object" == typeof obj) {
        this.constant = obj;
      }
    };
    /** @type {function (Object): undefined} */
    module.exports = me;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-feature-manager/src/feature-manager.js" : function(require, module) {
    var getActual = require("./node_modules/spotify-bridge-request/index.js");
    var RSVP = require("./node_modules/spotify-feature-manager/node_modules/rsvp/dist/rsvp.js");
    /** @type {Array} */
    var employees = ["device", "country"];
    /**
     * @param {Object} spy
     * @param {Object} attr
     * @param {?} state
     * @return {undefined}
     */
    var $ = function(spy, attr, state) {
      if (!spy || "object" != typeof spy) {
        throw "No Config File or Config File is not an object";
      }
      /** @type {Object} */
      this.config = spy;
      /** @type {Object} */
      this.live = attr;
      this.liveModels = state;
      /** @type {boolean} */
      this.intialized = false;
      this.feature = {};
      this._init();
    };
    /**
     * @return {undefined}
     */
    $.prototype._init = function() {
      if (this.live && this.liveModels) {
        this.live.register(this.liveModels.application);
        this.live.register(this.liveModels.client);
        this._getAppArgs();
        this._getSessionData().then(function(req) {
          this.sessionData = req.session;
          this._checkTestEligibility();
        }.bind(this)).catch(function(dataAndEvents) {
          /** @type {boolean} */
          this.sessionData = false;
          /** @type {string} */
          this.intialized = dataAndEvents;
        }.bind(this));
      } else {
        this._fetchTestGroups();
      }
    };
    /**
     * @return {undefined}
     */
    $.prototype._getAppArgs = function() {
      this.live("spotify:application").query("arguments", function(dataAndEvents, options) {
        if (!dataAndEvents) {
          if (options.arguments) {
            this._handleAppArgs(options.arguments);
          }
        }
      }.bind(this));
      this.live("spotify:application").on("update", function(options) {
        if ("arguments" in options) {
          this._handleAppArgs(options.arguments);
        }
      }.bind(this));
    };
    /**
     * @param {string} pair
     * @return {undefined}
     */
    $.prototype._handleAppArgs = function(pair) {
      var def = pair.split(":");
      var name = def[0];
      var value = def[1];
      /** @type {RegExp} */
      var rchecked = /^\d+$/;
      if (value) {
        if ("false" === value) {
          /** @type {boolean} */
          value = false;
        }
        if (rchecked.test(value)) {
          /** @type {number} */
          value = parseFloat(value);
        }
      }
      if (this.config[name]) {
        this.feature[name] = value;
        /** @type {boolean} */
        this.config[name].set = true;
      }
    };
    /**
     * @return {?}
     */
    $.prototype._getSessionData = function() {
      var _getSessionData = new RSVP.Promise(function(cb, $sanitize) {
        this.live("spotify:client").query("session(country, device)", function(dataAndEvents, outErr) {
          if (dataAndEvents) {
            $sanitize("error getting session data");
          } else {
            cb(outErr);
          }
        });
      }.bind(this));
      return _getSessionData;
    };
    /**
     * @param {Object} user
     * @param {string} type
     * @return {?}
     */
    $.prototype._notQualified = function(user, type) {
      return user[type] && -1 === user[type].indexOf(this.sessionData[type]);
    };
    /**
     * @return {undefined}
     */
    $.prototype._checkTestEligibility = function() {
      var key;
      var i;
      var value;
      /** @type {number} */
      var l = employees.length;
      for (key in this.config) {
        if (value = this.config[key], !this.config[key].set) {
          /** @type {number} */
          i = 0;
          for (;l > i;i++) {
            if (this._notQualified(value, employees[i])) {
              /** @type {boolean} */
              this.feature[key] = false;
              /** @type {boolean} */
              this.config[key].set = true;
            }
          }
        }
      }
      this._fetchTestGroups();
    };
    /**
     * @return {undefined}
     */
    $.prototype._fetchTestGroups = function() {
      var ex;
      var restoreScript = this._createPromiseArray();
      RSVP.all(restoreScript).then(function() {
        if (this.initQueue) {
          this.initQueue.resolve(this.feature);
        }
        /** @type {string} */
        this.intialized = "success";
      }.bind(this)).catch(function(dataAndEvents) {
        /** @type {string} */
        ex = "error getting test-group for: " + dataAndEvents;
        if (this.initQueue) {
          this.initQueue.reject(ex);
        }
        /** @type {string} */
        this.intialized = ex;
      }.bind(this));
    };
    /**
     * @return {?}
     */
    $.prototype._createPromiseArray = function() {
      var key;
      /** @type {Array} */
      var buffer = [];
      for (key in this.config) {
        if (this.config[key].active) {
          if (!this.config[key].set) {
            buffer.push(this._getFeatureStatus(key));
          }
        }
      }
      return buffer;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    $.prototype._getFeatureStatus = function(key) {
      var _getFeatureStatus = new RSVP.Promise(function($sanitize, i) {
        if (this.config[key].set) {
          $sanitize();
        } else {
          this._requester(key, function(deepDataAndEvents, dataAndEvents) {
            if (deepDataAndEvents) {
              i(key);
            } else {
              /** @type {string} */
              this.feature[key] = "0";
              this.config[key].num = dataAndEvents.testGroup;
              this._getUsersGroup(key);
              $sanitize();
            }
          }.bind(this));
        }
      }.bind(this));
      return _getFeatureStatus;
    };
    /**
     * @param {?} keepData
     * @param {Function} regex
     * @return {?}
     */
    $.prototype._requester = function(keepData, regex) {
      return getActual("session_test_group", [keepData], regex);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    $.prototype._getUsersGroup = function(key) {
      var typePattern;
      /** @type {number} */
      var y = 0;
      var x = this.config[key].groups.length;
      for (;x > y;y++) {
        if (typePattern = this.config[key].groups[y], this._isUserInGroup(key, typePattern)) {
          return void(this.feature[key] = typePattern.value || 1);
        }
      }
    };
    /**
     * @param {?} key
     * @param {?} args
     * @return {?}
     */
    $.prototype._isUserInGroup = function(key, args) {
      var largest;
      var index;
      var num = this.config[key].num;
      return args.bucket ? (largest = args.bucket[0], index = args.bucket[1], num > largest && index > num ? true : false) : false;
    };
    /**
     * @return {?}
     */
    $.prototype.init = function() {
      var enabled = new RSVP.Promise(function(success, reject) {
        if (this.intialized) {
          if ("success" === this.intialized) {
            success(this.feature);
          } else {
            reject(this.intialized);
          }
        } else {
          this.initQueue = {
            /** @type {Function} */
            resolve : success,
            /** @type {Function} */
            reject : reject
          };
        }
      }.bind(this));
      return enabled;
    };
    /**
     * @param {string} name
     * @return {?}
     */
    $.prototype.get = function(name) {
      return this.feature[name] || false;
    };
    /** @type {function (Object, Object, ?): undefined} */
    module.exports = $;
  },
  /**
   * @param {?} prim
   * @param {Object} module
   * @param {?} deepDataAndEvents
   * @param {?} dataAndEvents
   * @return {undefined}
   */
  "./node_modules/spotify-handlebars/helpers/href.js" : function(prim, module, deepDataAndEvents, dataAndEvents) {
    var next = prim("./node_modules/spotify-handlebars/util/link.js");
    /** @type {boolean} */
    var err = !!dataAndEvents._getSpotifyModule;
    /**
     * @param {Object} spy
     * @return {?}
     */
    var a = function(spy) {
      return err ? spy : next(spy, "https://play.spotify.com");
    };
    /** @type {string} */
    a.displayName = "href";
    /** @type {function (Object): ?} */
    module.exports = a;
  },
  /**
   * @param {?} prim
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-handlebars/helpers/type.js" : function(prim, module) {
    var next = prim("./node_modules/spotify-handlebars/util/type.js");
    /**
     * @param {Object} spy
     * @return {?}
     */
    var store = function(spy) {
      if (arguments.length <= 2) {
        return next(spy);
      }
      var options = arguments[arguments.length - 1];
      /** @type {boolean} */
      var r = false;
      var ch = next(spy);
      /** @type {number} */
      var j = 1;
      for (;j < arguments.length - 1;j++) {
        if (ch == arguments[j]) {
          /** @type {boolean} */
          r = true;
          break;
        }
      }
      return r ? options.fn(this) : options.inverse(this);
    };
    /** @type {string} */
    store.displayName = "type";
    /** @type {function (Object): ?} */
    module.exports = store;
  },
  /**
   * @param {?} proxy
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-handlebars/helpers/loc.js" : function(proxy, module) {
    var require = proxy("./node_modules/mout/object/mixIn.js");
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var __slice = Array.prototype.slice;
    var resolved = {};
    /**
     * @param {Object} spy
     * @return {?}
     */
    var format = function(spy) {
      var source = resolved[spy];
      if (!source) {
        return "";
      }
      /** @type {Array.<?>} */
      var args = __slice.call(arguments, 1);
      var context = {};
      if ("object" == typeof args[args.length - 1]) {
        context = args.pop();
      }
      var hash = context.hash;
      return source.replace(/\{([\w-]+)\}/g, function(dataAndEvents, value) {
        var descr;
        /** @type {number} */
        var i = +value;
        return descr = isNaN(i) ? hash[value] : args[i], null != descr ? descr : "";
      });
    };
    /** @type {string} */
    format.displayName = "loc";
    /**
     * @param {?} responder
     * @return {?}
     */
    format.register = function(responder) {
      return require(resolved, responder), this;
    };
    /** @type {function (Object): ?} */
    module.exports = format;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-glue-cat/templates/media-object.hbs" : function(require, module) {
    var Handlebars = require("./node_modules/handlebars/dist/cjs/handlebars.runtime.js")["default"];
    var ok = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
      /**
       * @return {?}
       */
      function on() {
        return "data-context";
      }
      /** @type {Array} */
      this.compilerInfo = [4, ">= 1.0.0"];
      helpers = this.merge(helpers, Handlebars.helpers);
      partials = this.merge(partials, Handlebars.partials);
      data = data || {};
      var stack1;
      var stack2;
      var options;
      /** @type {string} */
      var buffer = "";
      var helperMissing = helpers.helperMissing;
      var escapeExpression = this.escapeExpression;
      /** @type {string} */
      var functionType = "function";
      var self = this;
      var blockHelperMissing = helpers.blockHelperMissing;
      return buffer += '<div class="media-object media-object-' + escapeExpression((stack2 = helpers.type || depth0 && depth0.type, options = {
        hash : {},
        data : data
      }, stack2 ? stack2.call(depth0, depth0 && depth0.uri, options) : helperMissing.call(depth0, "type", depth0 && depth0.uri, options))) + " ", (stack2 = helpers.modifiers) ? stack1 = stack2.call(depth0, {
        hash : {},
        data : data
      }) : (stack2 = depth0 && depth0.modifiers, stack1 = typeof stack2 === functionType ? stack2.call(depth0, {
        hash : {},
        data : data
      }) : stack2), buffer += escapeExpression(stack1) + '"\n  ', options = {
        hash : {},
        inverse : self.program(1, on, data),
        fn : self.noop,
        data : data
      }, (stack2 = helpers.noContext) ? stack1 = stack2.call(depth0, options) : (stack2 = depth0 && depth0.noContext, stack1 = typeof stack2 === functionType ? stack2.call(depth0, options) : stack2), helpers.noContext || (stack1 = blockHelperMissing.call(depth0, stack1, {
        hash : {},
        inverse : self.program(1, on, data),
        fn : self.noop,
        data : data
      })), (stack1 || 0 === stack1) && (buffer += stack1), buffer += ' data-uri="', (stack2 = helpers.uri) ? stack1 = stack2.call(depth0, {
        hash : {},
        data : data
      }) : (stack2 = depth0 && depth0.uri, stack1 = typeof stack2 === functionType ? stack2.call(depth0, {
        hash : {},
        data : data
      }) : stack2), buffer += escapeExpression(stack1) + '"\n  data-log-context="media-object" data-log-data=\'{ "name": "', (stack2 = helpers.name) ? stack1 = stack2.call(depth0, {
        hash : {},
        data : data
      }) : (stack2 = depth0 && depth0.name, stack1 = typeof stack2 === functionType ? stack2.call(depth0, {
        hash : {},
        data : data
      }) : stack2), buffer += escapeExpression(stack1) + '", "target_uri": "', (stack2 = helpers.uri) ? stack1 = stack2.call(depth0, {
        hash : {},
        data : data
      }) : (stack2 = depth0 && depth0.uri, stack1 = typeof stack2 === functionType ? stack2.call(depth0, {
        hash : {},
        data : data
      }) : stack2), buffer += escapeExpression(stack1) + '" }\' data-contextmenu>\n  <div class="mo-wrapper">\n    <div class="mo-image-wrapper">\n      <a href="' + escapeExpression((stack2 = helpers.href || depth0 && depth0.href, options = {
        hash : {},
        data : data
      }, stack2 ? stack2.call(depth0, depth0 && depth0.uri, options) : helperMissing.call(depth0, "href", depth0 && depth0.uri, options))) + '" data-uri="', (stack2 = helpers.uri) ? stack1 = stack2.call(depth0, {
        hash : {},
        data : data
      }) : (stack2 = depth0 && depth0.uri, stack1 = typeof stack2 === functionType ? stack2.call(depth0, {
        hash : {},
        data : data
      }) : stack2), buffer += escapeExpression(stack1) + '" title="', (stack2 = helpers.name) ? stack1 = stack2.call(depth0, {
        hash : {},
        data : data
      }) : (stack2 = depth0 && depth0.name, stack1 = typeof stack2 === functionType ? stack2.call(depth0, {
        hash : {},
        data : data
      }) : stack2), buffer += escapeExpression(stack1) + '" data-log-click="media-image">\n        ', stack1 = self.invokePartial(partials["./node_modules/spotify-glue-cat/templates/media/image.hbs"], "./node_modules/spotify-glue-cat/templates/media/image.hbs", depth0, helpers, partials, data), (stack1 || 0 === stack1) && (buffer += stack1), buffer += "\n      </a>\n      ", stack1 = self.invokePartial(partials["./node_modules/spotify-glue-cat/templates/media/controllers.hbs"], "./node_modules/spotify-glue-cat/templates/media/controllers.hbs",
      depth0, helpers, partials, data), (stack1 || 0 === stack1) && (buffer += stack1), buffer += "\n    </div>\n    ", stack1 = self.invokePartial(partials["./node_modules/spotify-glue-cat/templates/media/info.hbs"], "./node_modules/spotify-glue-cat/templates/media/info.hbs", depth0, helpers, partials, data), (stack1 || 0 === stack1) && (buffer += stack1), buffer += "\n  </div>\n</div>\n";
    });
    Handlebars.registerPartial("./node_modules/spotify-glue-cat/templates/media-object.hbs", ok);
    require("./node_modules/spotify-glue-cat/templates/media/image.hbs");
    require("./node_modules/spotify-glue-cat/templates/media/controllers.hbs");
    require("./node_modules/spotify-glue-cat/templates/media/info.hbs");
    module.exports = ok;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @param {?} arg
   * @return {undefined}
   */
  "./node_modules/pubsub-js/src/pubsub.js" : function(dataAndEvents, module, arg) {
    !function(root, factory) {
      if ("object" == typeof arg && module) {
        module.exports = factory();
      } else {
        if ("function" == typeof define && define.amd) {
          define(factory);
        } else {
          root.PubSub = factory();
        }
      }
    }("object" == typeof window && window || this, function() {
      /**
       * @param {?} css
       * @return {?}
       */
      function isArray(css) {
        var selector;
        for (selector in css) {
          if (css.hasOwnProperty(selector)) {
            return true;
          }
        }
        return false;
      }
      /**
       * @param {?} dataAndEvents
       * @return {?}
       */
      function callback(dataAndEvents) {
        return function() {
          throw dataAndEvents;
        };
      }
      /**
       * @param {?} onComplete
       * @param {string} id
       * @param {string} result
       * @return {undefined}
       */
      function finish(onComplete, id, result) {
        try {
          onComplete(id, result);
        } catch (node) {
          setTimeout(callback(node), 0);
        }
      }
      /**
       * @param {?} callback
       * @param {string} code
       * @param {string} result
       * @return {undefined}
       */
      function close(callback, code, result) {
        callback(code, result);
      }
      /**
       * @param {string} n
       * @param {string} property
       * @param {string} a
       * @param {boolean} deepDataAndEvents
       * @return {undefined}
       */
      function resolve(n, property, a, deepDataAndEvents) {
        var k;
        var o = data[property];
        /** @type {function (?, string, string): undefined} */
        var cb = deepDataAndEvents ? close : finish;
        if (data.hasOwnProperty(property)) {
          for (k in o) {
            if (o.hasOwnProperty(k)) {
              cb(o[k], n, a);
            }
          }
        }
      }
      /**
       * @param {string} value
       * @param {string} base
       * @param {boolean} deepDataAndEvents
       * @return {?}
       */
      function format(value, base, deepDataAndEvents) {
        return function() {
          /** @type {string} */
          var url = String(value);
          /** @type {number} */
          var trimPosition = url.lastIndexOf(".");
          resolve(value, value, base, deepDataAndEvents);
          for (;-1 !== trimPosition;) {
            /** @type {string} */
            url = url.substr(0, trimPosition);
            /** @type {number} */
            trimPosition = url.lastIndexOf(".");
            resolve(value, url, base);
          }
        };
      }
      /**
       * @param {string} s
       * @return {?}
       */
      function parse(s) {
        /** @type {string} */
        var id = String(s);
        /** @type {boolean} */
        var isIconPrecomposed = Boolean(data.hasOwnProperty(id) && isArray(data[id]));
        /** @type {number} */
        var index = id.lastIndexOf(".");
        for (;!isIconPrecomposed && -1 !== index;) {
          /** @type {string} */
          id = id.substr(0, index);
          /** @type {number} */
          index = id.lastIndexOf(".");
          /** @type {boolean} */
          isIconPrecomposed = Boolean(data.hasOwnProperty(id) && isArray(data[id]));
        }
        return isIconPrecomposed;
      }
      /**
       * @param {string} obj
       * @param {string} data
       * @param {boolean} recurring
       * @param {boolean} deepDataAndEvents
       * @return {?}
       */
      function log(obj, data, recurring, deepDataAndEvents) {
        var f = format(obj, data, deepDataAndEvents);
        var url = parse(obj);
        return url ? (recurring === true ? f() : setTimeout(f, 0), true) : false;
      }
      var _this = {};
      var data = {};
      /** @type {number} */
      var ccNum = -1;
      return _this.publish = function(event, opt_attributes) {
        return log(event, opt_attributes, false, _this.immediateExceptions);
      }, _this.publishSync = function(walkers, msg) {
        return log(walkers, msg, true, _this.immediateExceptions);
      }, _this.subscribe = function(opt_attributes, name) {
        if ("function" != typeof name) {
          return false;
        }
        if (!data.hasOwnProperty(opt_attributes)) {
          data[opt_attributes] = {};
        }
        /** @type {string} */
        var n = "uid_" + String(++ccNum);
        return data[opt_attributes][n] = name, n;
      }, _this.unsubscribe = function(opt_attributes) {
        var d;
        var a;
        var prefix;
        /** @type {boolean} */
        var string = "string" == typeof opt_attributes;
        /** @type {boolean} */
        var found = false;
        for (d in data) {
          if (data.hasOwnProperty(d)) {
            if (a = data[d], string && a[opt_attributes]) {
              delete a[opt_attributes];
              found = opt_attributes;
              break;
            }
            if (!string) {
              for (prefix in a) {
                if (a.hasOwnProperty(prefix)) {
                  if (a[prefix] === opt_attributes) {
                    delete a[prefix];
                    /** @type {boolean} */
                    found = true;
                  }
                }
              }
            }
          }
        }
        return found;
      }, _this;
    });
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/center.js" : function(require, module) {
    var Type = require("./node_modules/prime/emitter.js");
    module.exports = new Type;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} binding
   * @param {number} $rootScope
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/client.js" : function(require, dataAndEvents, binding, $rootScope) {
    /**
     * @param {Object} elm
     * @return {undefined}
     */
    function run(elm) {
      shift("user_metadata", ["spotify:user:@"], function(dataAndEvents, player) {
        if (dataAndEvents) {
          if ($rootScope.__spotify && $rootScope.__spotify.username) {
            var username = $rootScope.__spotify.username;
            elm.update({
              currentUser : {
                uri : self.profileURI(username).toURI(),
                username : username
              }
            });
          }
          throw dataAndEvents;
        }
        elm.update({
          currentUser : {
            uri : self.profileURI(player.username).toURI(),
            name : player.name,
            username : player.username
          }
        });
      });
    }
    /**
     * @param {Function} callback
     * @return {undefined}
     */
    function flush(callback) {
      shift("client_features", [], function(err, data) {
        return err ? callback(err) : void callback(null, data.features);
      });
    }
    /**
     * @param {Object} ui
     * @return {undefined}
     */
    function start(ui) {
      shift("session_query", [], function(dataAndEvents, session) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        ui.update({
          session : session
        });
        init(ui);
      });
    }
    /**
     * @param {Object} ui
     * @return {undefined}
     */
    function init(ui) {
      shift("session_event_wait", [], function(dataAndEvents, e) {
        if (p) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          if ("change" === e.type) {
            ui.get("session").update(e.data);
          }
          init(ui);
        }
      });
    }
    /**
     * @param {?} n
     * @param {Object} self
     * @return {undefined}
     */
    function f(n, self) {
      var len = self.uris;
      var ctx = self.x;
      var a = self.y;
      var i = self.context && self.context.uri || null;
      var index = self.index;
      shift("client_show_context_ui", [len, ctx, a, i, index]);
    }
    /**
     * @param {?} str
     * @param {Object} data
     * @return {undefined}
     */
    function method(str, data) {
      if ($rootScope === window) {
        if (window.top) {
          if (window.top.postMessage) {
            window.top.postMessage({
              type : "client_show_context_ui",
              name : "client_show_context_ui",
              data : data
            }, "*");
          }
        }
      }
    }
    /**
     * @param {Object} e
     * @param {string} whitespace
     * @return {undefined}
     */
    function resume(e, whitespace) {
      if (whitespace.indexOf("currentUser") > -1) {
        run(e);
      }
      if (whitespace.indexOf("session") > -1) {
        start(e);
      }
    }
    /**
     * @param {Object} msg
     * @param {Array} arg
     * @return {undefined}
     */
    function fn(msg, arg) {
      if (h) {
        var attributes = {};
        hasOwnProperty(arg, function(att) {
          /** @type {boolean} */
          attributes[att] = false;
        });
        msg.update(attributes);
      } else {
        /** @type {boolean} */
        h = true;
        flush(function(dataAndEvents, attributes) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          msg.update(attributes);
          /** @type {Array} */
          var arr = [];
          hasOwnProperty(arg, function(chunk) {
            if (!(chunk in attributes)) {
              arr.push(chunk);
            }
          });
          fn(msg, arr);
        });
      }
    }
    /**
     * @param {Object} data
     * @return {undefined}
     */
    function done(data) {
      var container_features = $rootScope.__spotify || {};
      var m = $(container_features.container_features || {});
      m.on("wait", function(curLoop) {
        var item;
        var attributes = {};
        /** @type {number} */
        var i = 0;
        for (;item = curLoop[i];i++) {
          /** @type {boolean} */
          attributes[item] = false;
        }
        m.update(attributes);
      });
      var foo = $({});
      foo.on("wait", function(key) {
        fn(foo, key);
      });
      data.update({
        features : foo,
        containerFeatures : m
      });
      if ($rootScope.__spotify) {
        if ($rootScope.__spotify.username) {
          data.update({
            currentUser : {
              username : $rootScope.__spotify.username
            }
          });
        }
      }
      run(data);
    }
    var p;
    var h;
    var hasOwnProperty = require("./node_modules/mout/array/forEach.js");
    var $ = require("./node_modules/spotify-live/index.js");
    var shift = require("./node_modules/spotify-live-models/util/bridge.js").request;
    var self = require("./node_modules/spotify-liburi/src/uri.js");
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:client$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      if (!p) {
        /** @type {boolean} */
        p = true;
        $.subscribe(attributes, "wait", resume);
        $.subscribe(attributes, "init", done);
        $.subscribe(attributes, "show-context-menu", f);
        $.subscribe(attributes, "show-context-menu-v2", method);
      }
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      if (p) {
        /** @type {boolean} */
        p = false;
        $.unsubscribe(attributes, "wait", resume);
        $.unsubscribe(attributes, "init", done);
        $.unsubscribe(attributes, "show-context-menu", f);
        $.unsubscribe(attributes, "show-context-menu-v2", method);
      }
    };
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} self
   * @param {?} editor
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/client-storage.js" : function(require, dataAndEvents, self, editor) {
    /**
     * @param {?} index
     * @param {Object} id
     * @return {undefined}
     */
    function key(index, id) {
      str = toString(str, id);
      editor.top.postMessage({
        type : "client_storage",
        name : "broadcast_client_storage",
        data : id
      }, "*");
    }
    /**
     * @param {Array} obj
     * @param {?} attributes
     * @return {undefined}
     */
    function method(obj, attributes) {
      editor.top.postMessage({
        type : "client_storage",
        name : "set_client_storage",
        data : attributes
      }, "*");
      obj.update(attributes);
    }
    /**
     * @param {?} data
     * @param {Document} task
     * @return {undefined}
     */
    function optgroup(data, task) {
      var attributes = {};
      var m = $(r);
      worker(task.body, function(value, name) {
        var a = compile(str, name);
        /** @type {boolean} */
        var b = void 0 !== m.get(name);
        if (a || b) {
          attributes[name] = value;
        }
        if (a) {
          helper(str, name);
        }
      });
      m.update(attributes);
    }
    var a;
    var item;
    var worker = require("./node_modules/mout/object/forOwn.js");
    var toString = require("./node_modules/mout/array/combine.js");
    var helper = require("./node_modules/mout/array/remove.js");
    var compile = require("./node_modules/mout/array/contains.js");
    /** @type {string} */
    var r = "spotify:client-storage";
    var $ = require("./node_modules/spotify-live/index.js");
    var core = require("./node_modules/spotify-live-models/util/cosmos.js");
    var cfg = {
      broadcast : "sp://messages/v1/client-storage"
    };
    /** @type {Array} */
    var str = [];
    /** @type {RegExp} */
    var attributes = self.matches = new RegExp("^" + r + "$");
    /**
     * @return {undefined}
     */
    self.register = function() {
      if (!a) {
        $.subscribe(attributes, "wait", key);
        $.subscribe(attributes, "publish", method);
        item = core.subscribe({
          url : cfg.broadcast
        }, optgroup);
        /** @type {boolean} */
        a = true;
      }
    };
    /**
     * @return {undefined}
     */
    self.unregister = function() {
      if (a) {
        $.unsubscribe(attributes, "wait", key);
        $.unsubscribe(attributes, "publish", method);
        if (item) {
          item.cancel();
          /** @type {null} */
          item = null;
        }
        /** @type {number} */
        str.length = 0;
        /** @type {boolean} */
        a = false;
      }
    };
    self._endpoints = cfg;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} binding
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/sortlist.js" : function(require, dataAndEvents, binding) {
    /**
     * @param {Object} obj
     * @param {?} options
     * @param {Object} node
     * @param {Function} fn
     * @return {undefined}
     */
    function construct(obj, options, node, fn) {
      var rvar = node && obj.get("indices");
      var el = $(obj.get("origin"));
      var attributes = nodes.getSortData(el, options, node, rvar);
      obj.update(attributes);
      if (fn) {
        children(function() {
          fn();
        });
      }
    }
    /**
     * @param {Object} el
     * @param {?} depMaps
     * @param {Function} task
     * @return {undefined}
     */
    function init(el, depMaps, task) {
      var followingChild = depMaps;
      var node = (followingChild && el.get("indices"), el.get("tracking"));
      var restoreScript = el.get("sort").split("|");
      /** @type {string} */
      var r20 = el.get("asc") ? "asc" : "desc";
      if ("asc" === r20) {
        nodes.sort(el.uri, node, restoreScript, r20, function(dataAndEvents, pending) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          construct(el, pending, followingChild, task);
        });
      } else {
        var test = $(node);
        /** @type {function (?, Function, Function, string): undefined} */
        var apply = (test.get("tracks"), test.get("rows"), function(putativeSpy, obj, elems, name) {
          if (putativeSpy) {
            throw putativeSpy;
          }
          var value = fn.call(obj).reverse();
          var indices = fn.call(elems).reverse();
          var attributes = {
            indices : indices
          };
          attributes[name] = value;
          el.update(attributes);
          if (task) {
            children(function() {
              task();
            });
          }
        });
        $(node).get("tracks", "indices", function(value, walkers, node) {
          apply(value, walkers, node, "tracks");
        });
        $(node).get("rows", "indices", function(value, walkers, node) {
          apply(value, walkers, node, "rows");
        });
      }
    }
    /**
     * @param {Array} options
     * @return {undefined}
     */
    function method(options) {
      var descending = options.uri.match(/^spotify:internal:(.*?):sorted:([^:]+):([^:]+)/);
      if (descending) {
        /** @type {boolean} */
        var asc = "descending" === descending[3] ? false : true;
        var o = "spotify:" + descending[1];
        var objects = o;
        if (!asc) {
          objects = options.uri.replace(":descending", ":ascending");
        }
        options.update({
          origin : o,
          tracking : objects,
          sort : descending[2],
          asc : asc
        });
      }
    }
    /**
     * @param {Object} ui
     * @param {(Array|number)} anim
     * @return {undefined}
     */
    function start(ui, anim) {
      var obj = ui.get("tracking");
      if (obj) {
        var array = $(obj);
        if (requestAnimationFrame(anim, "tracks")) {
          if (!ui._hasAddedSortListener) {
            /** @type {boolean} */
            ui._hasAddedSortListener = true;
            array.get("tracks", function(dataAndEvents, listener) {
              if (dataAndEvents) {
                throw dataAndEvents;
              }
              init(ui, null, function(dataAndEvents) {
                if (dataAndEvents) {
                  throw dataAndEvents;
                }
                listener.on("update", function(depMaps) {
                  init(ui, depMaps);
                });
              });
            });
          }
        }
        if (requestAnimationFrame(anim, "rows")) {
          if (!ui._hasAddedSortListener) {
            /** @type {boolean} */
            ui._hasAddedSortListener = true;
            array.get("rows", function(dataAndEvents, listener) {
              if (dataAndEvents) {
                throw dataAndEvents;
              }
              init(ui, null, function(dataAndEvents) {
                if (dataAndEvents) {
                  throw dataAndEvents;
                }
                listener.on("update", function(depMaps) {
                  init(ui, depMaps);
                });
              });
            });
          }
        }
        /** @type {Array} */
        var oldconfig = ["tracks", "rows", "indices"];
        anim = extend(anim, oldconfig);
        if (anim.length) {
          Node(anim, function(name) {
            array.get(name, function(dataAndEvents, value) {
              if (dataAndEvents) {
                throw dataAndEvents;
              }
              var attributes = {};
              attributes[name] = value;
              ui.update(attributes);
            });
          });
        }
      }
    }
    var $ = require("./node_modules/spotify-live/index.js");
    var extend = require("./node_modules/mout/array/difference.js");
    var Node = require("./node_modules/mout/array/forEach.js");
    var requestAnimationFrame = require("./node_modules/mout/array/contains.js");
    var children = require("./node_modules/prime/defer.js");
    var nodes = require("./node_modules/spotify-live-models/util/sort.js");
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var fn = Array.prototype.slice;
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:internal:.*:sorted/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      $.subscribe(attributes, "init", method);
      $.subscribe(attributes, "wait", start);
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      $.unsubscribe(attributes, "init", method);
      $.unsubscribe(attributes, "wait", start);
    };
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} binding
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/user.js" : function(require, dataAndEvents, binding) {
    /**
     * @param {Object} self
     * @return {undefined}
     */
    function fn(self) {
      t("user_metadata", [self.uri], function(dataAndEvents, attributes) {
        if (dataAndEvents) {
          var username = lang.from(self.uri).username;
          throw username && self.update({
            username : username
          }), dataAndEvents;
        }
        attributes.name = attributes.name || "";
        attributes.image = attributes.image || "";
        attributes.images = attributes.images || [];
        self.update(attributes);
      });
    }
    /**
     * @param {Object} obj
     * @return {undefined}
     */
    function save(obj) {
      t("user_associated_artist", [obj.uri], function(dataAndEvents, response) {
        if (dataAndEvents) {
          throw dataAndEvents;
        }
        /** @type {(null|{uri: ??})} */
        var artist = response.artist ? {
          uri : response.artist
        } : null;
        obj.update({
          artist : artist
        });
      });
    }
    /**
     * @param {Object} e
     * @param {?} obj
     * @return {undefined}
     */
    function set(e, obj) {
      var actual = getActual(obj, "artist");
      /** @type {Array} */
      var i = ["currentUser", "name", "username", "image", "images", "subscribed"];
      /** @type {boolean} */
      var s = !!assert(obj, i).length;
      if (s) {
        fn(e);
      }
      if (actual) {
        save(e);
      }
    }
    var $ = require("./node_modules/spotify-live/index.js");
    var lang = require("./node_modules/spotify-liburi/src/uri.js");
    var getActual = require("./node_modules/mout/array/contains.js");
    var assert = require("./node_modules/mout/array/intersection.js");
    var t = require("./node_modules/spotify-live-models/util/bridge.js").request;
    /** @type {RegExp} */
    var attributes = binding.matches = /^spotify:user:[^:]+$/;
    /**
     * @return {undefined}
     */
    binding.register = function() {
      $.subscribe(attributes, "wait", set);
    };
    /**
     * @return {undefined}
     */
    binding.unregister = function() {
      $.unsubscribe(attributes, "wait", set);
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/arb/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Related Music",
      RelatedPlaylists : "Related Playlists",
      NoRecs : "No Recommendations Available",
      NowPlayingRecs : "Now Playing Recommendations",
      AdRecs : "More recommendations after this advertisement"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/bn/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Related Music",
      RelatedPlaylists : "Related Playlists",
      NoRecs : "No Recommendations Available",
      NowPlayingRecs : "Now Playing Recommendations",
      AdRecs : "More recommendations after this advertisement"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/de/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "\u00c4hnliche Musik",
      RelatedPlaylists : "\u00c4hnliche Playlists",
      NoRecs : "Keine Empfehlungen verf\u00fcgbar",
      NowPlayingRecs : "Empfehlungen werden abgespielt",
      AdRecs : "Weitere Empfehlungen nach dieser Werbung"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/el/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "\u0391\u03bd\u03c4\u03af\u03c3\u03c4\u03bf\u03b9\u03c7\u03b7 \u03bc\u03bf\u03c5\u03c3\u03b9\u03ba\u03ae",
      RelatedPlaylists : "\u0391\u03bd\u03c4\u03af\u03c3\u03c4\u03bf\u03b9\u03c7\u03b5\u03c2 \u03bb\u03af\u03c3\u03c4\u03b5\u03c2",
      NoRecs : "\u0394\u03b5\u03bd \u03c5\u03c0\u03ac\u03c1\u03c7\u03bf\u03c5\u03bd \u03b4\u03b9\u03b1\u03b8\u03ad\u03c3\u03b9\u03bc\u03b5\u03c2 \u03c0\u03c1\u03bf\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2",
      NowPlayingRecs : "\u03a4\u03ce\u03c1\u03b1 \u03b1\u03ba\u03bf\u03cd\u03c2 \u03c0\u03c1\u03bf\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2",
      AdRecs : "\u03a0\u03b5\u03c1\u03b9\u03c3\u03c3\u03cc\u03c4\u03b5\u03c1\u03b5\u03c2 \u03c0\u03c1\u03bf\u03c4\u03ac\u03c3\u03b5\u03b9\u03c2 \u03bc\u03b5\u03c4\u03ac \u03b1\u03c0\u03cc \u03b1\u03c5\u03c4\u03ae \u03c4\u03b7 \u03b4\u03b9\u03b1\u03c6\u03ae\u03bc\u03b9\u03c3\u03b7"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/en/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Related Music",
      RelatedPlaylists : "Related Playlists",
      NoRecs : "No Recommendations Available",
      NowPlayingRecs : "Now Playing Recommendations",
      AdRecs : "More recommendations after this advertisement"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/es-419/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "M\u00fasica relacionada",
      RelatedPlaylists : "Playlists relacionadas",
      NoRecs : "No hay recomendaciones disponibles",
      NowPlayingRecs : "Recomendaciones de la Reproducci\u00f3n en curso",
      AdRecs : "M\u00e1s recomendaciones despu\u00e9s de este anuncio"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/es/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "M\u00fasica relacionada",
      RelatedPlaylists : "Playlists relacionadas",
      NoRecs : "No hay recomendaciones disponibles",
      NowPlayingRecs : "Escuchando recomendaciones",
      AdRecs : "M\u00e1s recomendaciones tras este anuncio"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/fi/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Samantapaista musiikkia",
      RelatedPlaylists : "Liittyv\u00e4t soittolistat",
      NoRecs : "Ei suosituksia",
      NowPlayingRecs : "Soitetaan suositeltuja kappaleita",
      AdRecs : "Lis\u00e4\u00e4 suosituksia t\u00e4m\u00e4n mainoksen j\u00e4lkeen"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/fr/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Musique similaire",
      RelatedPlaylists : "Playlists similaires",
      NoRecs : "Aucune recommandation",
      NowPlayingRecs : "Recommandations \u00c0 l'\u00e9coute",
      AdRecs : "Retrouvez d'autres recommandations apr\u00e8s la pub"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/fr-ca/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Musique similaire",
      RelatedPlaylists : "Listes de lecture similaires",
      NoRecs : "Aucune recommandation",
      NowPlayingRecs : "Recommandations En cours de lecture",
      AdRecs : "Retrouvez d'autres recommandations apr\u00e8s la publicit\u00e9"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/hi/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Related Music",
      RelatedPlaylists : "Related Playlists",
      NoRecs : "No Recommendations Available",
      NowPlayingRecs : "Now Playing Recommendations",
      AdRecs : "More recommendations after this advertisement"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/hu/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Hasonl\u00f3 zene",
      RelatedPlaylists : "Hasonl\u00f3 lej\u00e1tsz\u00e1si list\u00e1k",
      NoRecs : "Nem \u00e9rhet\u0151 el aj\u00e1nl\u00e1s",
      NowPlayingRecs : "Aj\u00e1nl\u00e1sok lej\u00e1tsz\u00e1sa",
      AdRecs : "Tov\u00e1bbi aj\u00e1nl\u00e1sok a hirdet\u00e9s ut\u00e1n"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/id/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Musik Terkait",
      RelatedPlaylists : "Daftar Putar Terkait",
      NoRecs : "Rekomendasi Tidak Tersedia",
      NowPlayingRecs : "Rekomendasi Putar Sekarang",
      AdRecs : "Rekomendasi lainnya setelah iklan ini"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/it/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Musica correlata",
      RelatedPlaylists : "Playlist collegate",
      NoRecs : "Nessun suggerimento disponibile",
      NowPlayingRecs : "Suggerimenti per Ora in riproduzione",
      AdRecs : "Altri suggerimenti dopo questo annuncio"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/ja/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "\u95a2\u9023\u66f2",
      RelatedPlaylists : "\u95a2\u9023\u30d7\u30ec\u30a4\u30ea\u30b9\u30c8",
      NoRecs : "\u5229\u7528\u3067\u304d\u308b\u304a\u3059\u3059\u3081\u66f2\u304c\u3042\u308a\u307e\u305b\u3093",
      NowPlayingRecs : "\u73fe\u5728\u3001\u304a\u3059\u3059\u3081\u66f2\u3092\u518d\u751f\u3057\u3066\u3044\u307e\u3059",
      AdRecs : "\u3053\u306e\u5e83\u544a\u306e\u5f8c\u306b\u304a\u3059\u3059\u3081\u3092\u8ffd\u52a0\u8868\u793a"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/ko/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Related Music",
      RelatedPlaylists : "Related Playlists",
      NoRecs : "No Recommendations Available",
      NowPlayingRecs : "Now Playing Recommendations",
      AdRecs : "More recommendations after this advertisement"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/nl/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Vergelijkbare muziek",
      RelatedPlaylists : "Gerelateerde afspeellijsten",
      NoRecs : "Er zijn geen beschikbare aanbevelingen",
      NowPlayingRecs : "Er worden nu aanbevelingen afgespeeld.",
      AdRecs : "Meer aanbevelingen na deze reclame."
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/pl/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Powi\u0105zana muzyka",
      RelatedPlaylists : "Podobne playlisty",
      NoRecs : "Brak dost\u0119pnych rekomendacji",
      NowPlayingRecs : "Odtwarzanie rekomendowanych utwor\u00f3w",
      AdRecs : "Wi\u0119cej rekomendowanych utwor\u00f3w po wyemitowaniu tej rekamy"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/pt-br/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "M\u00fasicas relacionadas",
      RelatedPlaylists : "Playlists relacionadas",
      NoRecs : "Sem recomenda\u00e7\u00f5es dispon\u00edveis",
      NowPlayingRecs : "Recomenda\u00e7\u00f5es de Tocando agora",
      AdRecs : "Mais recomenda\u00e7\u00f5es depois da propaganda"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/ro/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Muzic\u0103 similar\u0103",
      RelatedPlaylists : "Liste de redare conexe",
      NoRecs : "Nu exist\u0103 recomand\u0103ri disponibile",
      NowPlayingRecs : "Se redau recomand\u0103rile \u00een acest moment",
      AdRecs : "Mai multe recomand\u0103ri dup\u0103 acest anun\u0163 publicitar"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/ru/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "\u041f\u043e\u0445\u043e\u0436\u0430\u044f \u043c\u0443\u0437\u044b\u043a\u0430",
      RelatedPlaylists : "\u041f\u043e\u0445\u043e\u0436\u0438\u0435 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442\u044b",
      NoRecs : "\u041d\u0435\u0442 \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0439",
      NowPlayingRecs : "\u0421\u0435\u0439\u0447\u0430\u0441 \u0438\u0433\u0440\u0430\u0435\u0442 \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c\u0430\u044f \u043c\u0443\u0437\u044b\u043a\u0430",
      AdRecs : "\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438 \u043f\u043e\u0441\u043b\u0435 \u0440\u0435\u043a\u043b\u0430\u043c\u044b"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/sv/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Liknande musik",
      RelatedPlaylists : "Liknande spellistor",
      NoRecs : "Det finns inga tillg\u00e4ngliga rekommendationer",
      NowPlayingRecs : "Rekommendationer f\u00f6r Spelas nu",
      AdRecs : "Fler rekommendationer kommer efter reklaminslaget"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/ta/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Related Music",
      RelatedPlaylists : "Related Playlists",
      NoRecs : "No Recommendations Available",
      NowPlayingRecs : "Now Playing Recommendations",
      AdRecs : "More recommendations after this advertisement"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/th/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "\u0e40\u0e1e\u0e25\u0e07\u0e17\u0e35\u0e48\u0e40\u0e01\u0e35\u0e48\u0e22\u0e27\u0e02\u0e49\u0e2d\u0e07",
      RelatedPlaylists : "\u0e40\u0e1e\u0e25\u0e22\u0e4c\u0e25\u0e34\u0e2a\u0e15\u0e4c\u0e17\u0e35\u0e48\u0e40\u0e01\u0e35\u0e48\u0e22\u0e27\u0e02\u0e49\u0e2d\u0e07",
      NoRecs : "\u0e44\u0e21\u0e48\u0e21\u0e35\u0e40\u0e1e\u0e25\u0e07\u0e17\u0e35\u0e48\u0e41\u0e19\u0e30\u0e19\u0e33",
      NowPlayingRecs : "\u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e25\u0e48\u0e19\u0e40\u0e1e\u0e25\u0e07\u0e17\u0e35\u0e48\u0e41\u0e19\u0e30\u0e19\u0e33",
      AdRecs : "\u0e1e\u0e1a\u0e01\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e41\u0e19\u0e30\u0e19\u0e33\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e40\u0e15\u0e34\u0e21\u0e2b\u0e25\u0e31\u0e07\u0e42\u0e06\u0e29\u0e13\u0e32\u0e19\u0e35\u0e49"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/tr/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Benzer M\u00fczikler",
      RelatedPlaylists : "Benzer \u00c7alma Listeleri",
      NoRecs : "Kullan\u0131labilir \u00d6neri Yok",
      NowPlayingRecs : "\u015eimdi \u00c7al\u0131n\u0131yor \u00d6nerileri",
      AdRecs : "Bu reklamdan sonra daha fazla \u00f6neri"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/zh-hant/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "\u76f8\u95dc\u97f3\u6a02",
      RelatedPlaylists : "\u76f8\u95dc\u64ad\u653e\u6e05\u55ae",
      NoRecs : "\u6c92\u6709\u5efa\u8b70\u7684\u6b4c\u66f2",
      NowPlayingRecs : "\u6b63\u5728\u64ad\u653e\u5efa\u8b70\u7684\u6b4c\u66f2",
      AdRecs : "\u5ee3\u544a\u5f8c\u5c07\u6709\u66f4\u591a\u63a8\u85a6\u6b4c\u66f2"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./locale/zsm/main.json" : function(dataAndEvents, module) {
    module.exports = {
      RelatedMusic : "Muzik Berkaitan",
      RelatedPlaylists : "Playlist Berkaitan",
      NoRecs : "Tiada Cadangan Tersedia",
      NowPlayingRecs : "Cadangan Dimainkan Kini",
      AdRecs : "Lebih banyak cadangan selepas iklan ini"
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} $
   * @return {undefined}
   */
  "./package.json" : function(dataAndEvents, $) {
    $.exports = {
      name : "now-playing-recs",
      version : "2.2.2",
      license : "SpotifyInternal",
      publishConfig : {
        registry : "http://npm-registry.spotify.net"
      },
      dependencies : {
        "spotify-client-logger" : "^0.2.0",
        "spotify-dom-logger" : "*",
        "spotify-feature-manager" : ">=0.1.0",
        "spotify-glue-cat" : "~13.0.0",
        "spotify-handlebars" : "~1.1.1",
        "spotify-cosmos-api" : "~1.0.0",
        "spotify-live" : "1.x",
        "spotify-live-models" : "1.x",
        "spotify-events" : "1.x",
        "finally" : "0.0.4",
        prime : "~0.4.0",
        "travis-cov" : "~0.2.4",
        "pubsub-js" : "~1.4.2"
      },
      main : "scripts/main",
      devDependencies : {
        grunt : "~0.4.1",
        "grunt-exec" : "~0.4.2",
        "stitch-manifest-gen" : "~0.3.4",
        "grunt-contrib-watch" : "~0.5.3",
        "grunt-contrib-copy" : "~0.4.1",
        "grunt-contrib-clean" : "~0.5.0",
        "grunt-contrib-less" : "~0.7.0",
        "grunt-spotify-lints" : "~0.8.0",
        "grunt-replace" : "~0.7.7",
        matchdep : "~0.3.0",
        "grunt-spotify-wsppush" : "~0.2.0",
        handlebars : "~1.3.0",
        quickstart : "^1.0.0",
        "quickstart-handlebars" : "^0.5.0",
        "quickstart-spotify" : "^0.5.0",
        mocha : "~1.14.0",
        proxyquire : "~0.5.1",
        jsdom : "~0.8.8",
        "load-grunt-tasks" : "~0.4.0",
        "grunt-mocha-test" : "~0.7.0",
        "mocha-teamcity-cov-reporter" : ">=0.0.1",
        blanket : "~1.1.5",
        "mocha-cobertura-reporter" : "~1.0.4",
        "grunt-spotlet-bumplanguages" : "*",
        sinon : "~1.9.1",
        "grunt-jscpd" : "0.0.10",
        "spotify-smartling-sync" : "~0.3.2",
        "spotify-packager" : "^1.0.0",
        "uglify-js" : "^2.4.14"
      },
      scripts : {
        prepackage : "grunt prod",
        test : "grunt mochaTest --env=prod"
      },
      config : {
        "travis-cov" : {
          threshold : 50
        }
      }
    };
  },
  /**
   * @param {?} $
   * @param {Object} mod
   * @param {Function} exports
   * @return {undefined}
   */
  "./node_modules/spotify-live/util/range.js" : function($, mod, exports) {
    var copy = $("./node_modules/prime/index.js");
    var number = $("./node_modules/mout/array/map.js");
    var slice = $("./node_modules/mout/array/slice.js");
    var Range = copy({
      /**
       * @param {?} attributes
       * @param {(Node|string)} callback
       * @return {undefined}
       */
      constructor : function(attributes, callback) {
        this.update(attributes, callback);
      },
      /**
       * @param {?} opt_attributes
       * @param {?} to
       * @return {?}
       */
      update : function(opt_attributes, to) {
        if (null != opt_attributes && (this.start = opt_attributes), null != to && (this.end = to), null == this.start || null == this.end) {
          throw new Error("invalid range");
        }
        if (this.start > this.end) {
          throw new Error("invalid range");
        }
        return this.length = this.end - this.start, this;
      },
      /**
       * @return {?}
       */
      copy : function() {
        return new Range(this.start, this.end);
      },
      /**
       * @param {Object} val
       * @return {?}
       */
      above : function(val) {
        return val ? this.start >= val.end : false;
      },
      /**
       * @param {Object} val
       * @return {?}
       */
      below : function(val) {
        return val ? this.end <= val.start : false;
      },
      /**
       * @param {Object} arc
       * @return {?}
       */
      adjacent : function(arc) {
        return arc ? this.end === arc.start || this.start === arc.end : false;
      },
      /**
       * @param {Object} b
       * @return {?}
       */
      intersects : function(b) {
        return b ? !this.above(b) && !this.below(b) : false;
      },
      /**
       * @param {Object} element
       * @return {?}
       */
      contains : function(element) {
        return element ? this.start <= element.start && this.end >= element.end : false;
      },
      /**
       * @param {Object} arg
       * @return {?}
       */
      contained : function(arg) {
        var a;
        if (a = arg instanceof Range ? arguments : arg, !a) {
          return false;
        }
        /** @type {number} */
        var i = 0;
        for (;arg = a[i];i++) {
          if (arg.start <= this.start && arg.end >= this.end) {
            return true;
          }
        }
        return false;
      },
      /**
       * @param {Object} start
       * @param {Object} i
       * @return {?}
       */
      fits : function(start, i) {
        return start || i ? start ? i ? this.start >= start.end && this.end <= i.start : this.start >= start.end : this.end <= i.start : true;
      },
      /**
       * @param {?} obj
       * @param {?} start
       * @return {?}
       */
      between : function(obj, start) {
        return obj || start ? obj ? start ? this.end > obj.end && this.start < start.start ? new Range(Math.max(obj.end, this.start), Math.min(start.start, this.end)) : null : this.end <= obj.end ? null : new Range(Math.max(obj.end, this.start), this.end) : this.start >= start.start ? null : new Range(this.start, Math.min(this.end, start.start)) : this.copy();
      },
      /**
       * @param {string} a
       * @return {?}
       */
      intersection : function(a) {
        var codeSegments;
        /** @type {Array} */
        var result = [];
        codeSegments = a instanceof Range ? arguments : a;
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          var range = codeSegments[i];
          if (this.below(range)) {
            break;
          }
          if (range.intersects(this)) {
            result.push(new Range(Math.max(this.start, range.start), Math.min(this.end, range.end)));
          }
        }
        return result;
      },
      /**
       * @param {Function} x
       * @return {?}
       */
      subtract : function(x) {
        var resultItems;
        /** @type {Array} */
        var out = [];
        resultItems = x instanceof Range ? arguments : x;
        /** @type {number} */
        var i = -1;
        for (;i < resultItems.length;i++) {
          var suiteView = resultItems[i];
          var result = resultItems[i + 1];
          var copies = this.between(suiteView, result);
          if (copies) {
            out.push(copies);
          }
        }
        return out;
      },
      /**
       * @param {Object} a
       * @return {?}
       */
      extract : function(a) {
        var tokens = a instanceof Range ? slice(arguments) : a.slice();
        /** @type {number} */
        var i = 0;
        for (;i < tokens.length;i++) {
          var lastRange = tokens[i - 1];
          var t = tokens[i];
          /** @type {null} */
          var range = null;
          if (this.below(t)) {
            range = new Range(t.start - this.length, t.end - this.length);
          } else {
            if (this.intersects(t)) {
              var sectors = t.subtract(this);
              if (2 === sectors.length) {
                range = new Range(sectors[0].start, sectors[1].end - this.length);
              } else {
                if (1 === sectors.length) {
                  if (t.end > this.end) {
                    range = new Range(sectors[0].start - this.length, sectors[0].end - this.length);
                  } else {
                    if (this.start > t.start) {
                      range = new Range(sectors[0].start, sectors[0].end);
                    }
                  }
                } else {
                  tokens.splice(i--, 1);
                }
              }
            } else {
              tokens.splice(i, 1, t.copy());
            }
          }
          if (range) {
            if (lastRange && lastRange.end === range.start) {
              tokens.splice(i-- - 1, 2, new Range(lastRange.start, range.end));
            } else {
              tokens.splice(i, 1, range);
            }
          }
        }
        return tokens;
      },
      /**
       * @param {Object} x
       * @return {?}
       */
      insert : function(x) {
        var list = x instanceof Range ? slice(arguments) : x.slice();
        /** @type {number} */
        var i = 0;
        for (;i < list.length;i++) {
          var range = list[i];
          if (this.start >= range.end) {
            list.splice(i, 1, range.copy());
          } else {
            if (this.start > range.start && this.start < range.end) {
              list.splice(i, 1, new Range(range.start, this.start), new Range(this.start, range.end));
            } else {
              list.splice(i, 1, new Range(range.start + this.length, range.end + this.length));
            }
          }
        }
        return this.merge(list);
      },
      /**
       * @param {?} parent
       * @return {?}
       */
      merge : function(parent) {
        var a;
        if (a = parent instanceof Range ? arguments : parent, a = number(a, function(dataBuffer) {
          return dataBuffer.copy();
        }), !a.length) {
          return[this.copy()];
        }
        /** @type {number} */
        var i = -1;
        var l = a.length;
        for (;l > i;i++) {
          var model = a[i];
          var that = a[i + 1];
          var item = this.between(model, that);
          if (item) {
            if (!model && that) {
              if (item.end === that.start) {
                that.update(item.start, that.end);
              } else {
                i++;
                a.unshift(item);
              }
            } else {
              if (model && that) {
                if (model.end === item.start && item.end === that.start) {
                  model.update(model.start, that.end);
                  a.splice(i-- + 1, 1);
                } else {
                  if (model.end === item.start) {
                    model.update(model.start, item.end);
                  } else {
                    if (item.end === that.start) {
                      that.update(item.start, that.end);
                    } else {
                      a.splice(i + 1, 0, item);
                    }
                  }
                }
              } else {
                if (model) {
                  if (!that) {
                    if (model.end === item.start) {
                      model.update(model.start, item.end);
                    } else {
                      i++;
                      a.push(item);
                    }
                  }
                }
              }
            }
          }
        }
        return a;
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      remove : function(obj) {
        var codeSegments;
        codeSegments = obj instanceof Range ? arguments : obj;
        /** @type {Array} */
        var result = [];
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          var pending = codeSegments[i].subtract(this);
          if (pending.length) {
            result.push.apply(result, pending);
          }
        }
        return result;
      },
      /**
       * @return {?}
       */
      toIndices : function() {
        /** @type {Array} */
        var bucket = [];
        var value = this.start;
        for (;value < this.end;value++) {
          bucket.push(value);
        }
        return bucket;
      },
      /**
       * @return {?}
       */
      toString : function() {
        return[this.start, this.end] + "";
      }
    });
    /**
     * @param {?} value
     * @return {?}
     */
    Range.fromString = function(value) {
      var t = value.split(",");
      return new Range(+t[0], +t[1]);
    };
    /**
     * @param {Array} values
     * @return {?}
     */
    Range.fromIndices = function(values) {
      values.sort(function(a, b) {
        return a > b ? 1 : -1;
      });
      var val;
      var value;
      /** @type {Array} */
      var rangeList = [];
      /** @type {number} */
      var i = 0;
      for (;i < values.length;i++) {
        val = values[i];
        value = val;
        for (;values[i + 1] - values[i] === 1;) {
          value = values[i + 1];
          i++;
        }
        rangeList.push(new Range(val, value + 1));
      }
      return rangeList;
    };
    /**
     * @param {Object} spy
     * @param {Function} val
     * @return {?}
     */
    exports = function(spy, val) {
      return new Range(spy, val);
    };
    /** @type {Function} */
    mod.exports = exports;
    exports.Range = Range;
    /** @type {function (Array): ?} */
    exports.fromIndices = Range.fromIndices;
    /** @type {function (?): ?} */
    exports.fromString = Range.fromString;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-live/util/parser.js" : function(require, module) {
    var Base = require("./node_modules/spotify-live/util/range.js");
    /**
     * @param {Object} spy
     * @return {?}
     */
    var remove = function(spy) {
      /** @type {Array} */
      var removed = [];
      /** @type {string} */
      var y = "(";
      /** @type {string} */
      var self = ")";
      /** @type {string} */
      var nil = "[";
      /** @type {string} */
      var needle = "]";
      /** @type {string} */
      var u = " ";
      /** @type {string} */
      var lastX = ",";
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var index = 0;
      /** @type {number} */
      var f = 0;
      /** @type {Array} */
      var result = [];
      /** @type {Array} */
      var items = [];
      /** @type {string} */
      var t = "";
      /** @type {number} */
      var lastIdx = 0;
      /** @type {number} */
      var MIDNUM = 0;
      /** @type {number} */
      var MIDNUMLET = 0;
      /** @type {number} */
      var idx = 0;
      for (;idx < spy.length + 1;idx++) {
        var x = spy.charAt(idx);
        if (!f) {
          if (lastIdx) {
            if (x === needle) {
              MIDNUMLET--;
              var value = spy.substring(lastIdx + 1, idx);
              items.push({
                key : t,
                range : Base.fromString(value)
              });
              /** @type {number} */
              lastIdx = 0;
              /** @type {string} */
              t = "";
            }
          } else {
            if (/\w/.exec(x)) {
              t += x;
            } else {
              if (!!t) {
                if (!(x && (x !== u && (x !== y && (x !== lastX && x !== nil))))) {
                  if (x === nil) {
                    MIDNUMLET++;
                    /** @type {number} */
                    lastIdx = idx;
                  } else {
                    items.push({
                      key : t
                    });
                    /** @type {string} */
                    t = "";
                  }
                }
              }
            }
          }
        }
        if (x === y ? (MIDNUM++, f++ || (i = idx + 1)) : x === self && (MIDNUM--, 0 === --f && (index = idx, result[items.length - 1] = spy.substring(i, index))), -1 === MIDNUM || -1 === MIDNUMLET) {
          throw new Error("query syntax error");
        }
      }
      if (0 !== MIDNUM || 0 !== MIDNUMLET) {
        throw new Error("query syntax error");
      }
      /** @type {number} */
      idx = 0;
      for (;idx < items.length;idx++) {
        var str = result[idx];
        var o = items[idx];
        var node = {
          key : o.key
        };
        if (str) {
          node.query = remove(str);
        }
        if (o.range) {
          node.range = o.range;
        }
        removed.push(node);
      }
      return removed;
    };
    /** @type {function (Object): ?} */
    module.exports = remove;
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {Function} exports
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/bridge.js" : function($sanitize, dataAndEvents, exports) {
    var params = $sanitize("./node_modules/quickstart-spotify/spotify-api.js").SP;
    /**
     * @param {string} options
     * @param {Array} lab
     * @param {Function} original
     * @return {undefined}
     */
    var get = function(options, lab, original) {
      params.request(options, lab || [], null, function(delay) {
        if (original) {
          original(null, delay);
        }
      }, function(e) {
        /** @type {string} */
        var o = JSON.stringify(lab);
        /** @type {string} */
        var msg = " (bridge message: '" + options + "', args: " + o + ")";
        /** @type {string} */
        var message = e.message + msg;
        /** @type {Error} */
        var error = new Error(message);
        error.name = e.error;
        if (original) {
          original(error);
        }
      });
    };
    /** @type {function (string, Array, Function): undefined} */
    exports.request = get;
  },
  /**
   * @param {?} $resource
   * @param {?} dataAndEvents
   * @param {Object} self
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/cosmos.js" : function($resource, dataAndEvents, self) {
    /**
     * @param {string} o
     * @param {Array} lab
     * @return {?}
     */
    function exec(o, lab) {
      return o.method = self.cosmos.Action.DELETE, get(o, lab);
    }
    /**
     * @param {string} name
     * @param {Function} lab
     * @return {?}
     */
    function test(name, lab) {
      return name.method = self.cosmos.Action.GET, get(name, lab);
    }
    /**
     * @param {string} opt_attributes
     * @param {Function} name
     * @return {?}
     */
    function setup(opt_attributes, name) {
      return opt_attributes.method = self.cosmos.Action.SUB, get(opt_attributes, name);
    }
    /**
     * @param {string} p
     * @param {Array} lab
     * @return {?}
     */
    function f(p, lab) {
      return p.method = self.cosmos.Action.POST, get(p, lab);
    }
    /**
     * @param {string} p
     * @param {Array} lab
     * @return {?}
     */
    function put(p, lab) {
      return p.method = self.cosmos.Action.PUT, get(p, lab);
    }
    /**
     * @param {string} filter
     * @param {Array} lab
     * @return {?}
     */
    function next(filter, lab) {
      return filter.method = self.cosmos.Action.HEAD, get(filter, lab);
    }
    /**
     * @param {string} req
     * @param {Array} lab
     * @return {?}
     */
    function get(req, lab) {
      var method = req.method;
      delete req.method;
      var result;
      var hasMembers;
      return onSuccess(req.url, function(deepDataAndEvents, event) {
        if (deepDataAndEvents) {
          return lab && lab(deepDataAndEvents);
        }
        if (!hasMembers) {
          var attributes = new self.cosmos.Request(method || self.cosmos.Action.GET, event, req.headers, req.body);
          result = self.cosmos.resolver.resolve(attributes, function(deepDataAndEvents, response) {
            if (lab) {
              if (deepDataAndEvents) {
                return lab(deepDataAndEvents);
              }
              try {
                lab(null, {
                  body : JSON.parse(response.getBody() || "{}"),
                  headers : response.getHeaders(),
                  status : response.getStatusCode()
                });
              } catch (payload) {
                /** @type {Object} */
                payload.response = response;
                lab(payload);
              }
            }
          });
        }
      }), {
        /**
         * @return {?}
         */
        cancel : function() {
          return result && result.cancel ? (result.cancel(), result = null) : hasMembers || (hasMembers = true), null;
        }
      };
    }
    /**
     * @param {string} responseText
     * @param {Function} callback
     * @return {undefined}
     */
    function onSuccess(responseText, callback) {
      if (responseText.indexOf("@") > -1) {
        second("spotify:client").query("currentUser(username)", function(err, req) {
          return err ? callback(err) : void callback(null, responseText.replace("@", users.getCanonicalUsername(req.currentUser.username)));
        }, l);
      } else {
        callback(null, responseText);
      }
    }
    var second = ($resource("./node_modules/prime/emitter.js"), $resource("./node_modules/spotify-live/index.js"));
    var user = $resource("./node_modules/spotify-cosmos-api/index.js");
    var users = $resource("./node_modules/spotify-liburi/src/uri.js");
    var l = second.ASAP;
    /** @type {function (string, Array): ?} */
    self.request = get;
    /** @type {function (string, Function): ?} */
    self.get = test;
    /** @type {function (string, Array): ?} */
    self.post = f;
    /** @type {function (string, Function): ?} */
    self.subscribe = setup;
    /** @type {function (string, Array): ?} */
    self.delete = exec;
    /** @type {function (string, Array): ?} */
    self.put = put;
    /** @type {function (string, Array): ?} */
    self.head = next;
    self.cosmos = user;
    /** @type {function (string, Function): undefined} */
    self.sanitizeURL = onSuccess;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Node} exports
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/list.js" : function(require, dataAndEvents, exports) {
    /**
     * @param {Array} funcs
     * @param {number} t
     * @param {Function} m21
     * @return {undefined}
     */
    function transform(funcs, t, m21) {
      if (funcs.length) {
        /** @type {Array} */
        var operations = [{
          index : t,
          /** @type {Function} */
          insert : m21
        }];
        each(funcs, function(vec) {
          vec.update({
            operations : operations
          });
        });
      }
    }
    /**
     * @param {?} obj
     * @param {?} element
     * @return {undefined}
     */
    function compile(obj, element) {
      if (obj.length) {
        var elementRect = events.fromIndices(element);
        /** @type {number} */
        var index = 0;
        var operations = process(elementRect, function(match) {
          var evt = {
            index : match.start - index,
            remove : match.length
          };
          return index += match.length, evt;
        });
        each(obj, function(vec) {
          vec.update({
            operations : operations
          });
        });
      }
    }
    /**
     * @param {Array} items
     * @param {?} name
     * @param {?} start
     * @return {undefined}
     */
    function start(items, name, start) {
      if (items.length) {
        var last = events.fromIndices(name);
        /** @type {number} */
        var pos = 0;
        var ret = process(last, function(text) {
          var evt = {
            index : text.start - pos,
            remove : text.length
          };
          return text.start < start && (pos += text.length), evt;
        });
        each(items, function(vec) {
          var value = process(name, function(dim) {
            return vec[dim];
          });
          var operations = ret.slice();
          operations.push({
            index : start - pos,
            insert : value
          });
          vec.update({
            operations : operations
          });
        });
      }
    }
    var each = require("./node_modules/mout/array/forEach.js");
    var process = require("./node_modules/mout/array/map.js");
    var events = require("./node_modules/spotify-live/util/range.js").Range;
    /** @type {function (Array, number, Function): undefined} */
    exports.insert = transform;
    /** @type {function (?, ?): undefined} */
    exports.remove = compile;
    /** @type {function (Array, ?, ?): undefined} */
    exports.move = start;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/interfaces/recs_view.js" : function(dataAndEvents, module) {
    var JsDiff = {
      /**
       * @return {undefined}
       */
      _createContainer : function() {
      },
      /**
       * @return {undefined}
       */
      setEventListeners : function() {
      },
      /**
       * @return {undefined}
       */
      setTitle : function() {
      },
      /**
       * @return {undefined}
       */
      setAdMessage : function() {
      },
      /**
       * @return {undefined}
       */
      setNoRecsMessage : function() {
      },
      /**
       * @return {undefined}
       */
      showAdMessage : function() {
      },
      /**
       * @return {undefined}
       */
      showNoRecsMessage : function() {
      },
      /**
       * @return {undefined}
       */
      showRecs : function() {
      },
      /**
       * @return {undefined}
       */
      addImage : function() {
      },
      /**
       * @return {undefined}
       */
      _handleRecClick : function() {
      },
      /**
       * @return {undefined}
       */
      showLoader : function() {
      },
      /**
       * @return {undefined}
       */
      hideLoader : function() {
      }
    };
    module.exports = JsDiff;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./scripts/interfaces/collection.js" : function(dataAndEvents, module) {
    var Users = {
      /**
       * @return {undefined}
       */
      init : function() {
      },
      /**
       * @return {undefined}
       */
      _prepareFetch : function() {
      },
      /**
       * @return {undefined}
       */
      _createFetchObj : function() {
      },
      /**
       * @return {undefined}
       */
      _setFetchTimeout : function() {
      },
      /**
       * @return {undefined}
       */
      _handleFetchCompletion : function() {
      },
      /**
       * @return {undefined}
       */
      _fetch : function() {
      },
      /**
       * @return {undefined}
       */
      _parseResponse : function() {
      }
    };
    module.exports = Users;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-handlebars/util/link.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} dir
     * @return {?}
     */
    module.exports = function(spy, dir) {
      spy = spy || "";
      var eventPath = spy.match(/^spotify:(.+)$/);
      if (!eventPath) {
        return spy;
      }
      var parts = eventPath.pop().replace(/:$/, "").split(/:/);
      var value = parts.shift();
      return "search" === value && (parts = [parts.join(":")]), parts.unshift(dir, value), parts.join("/");
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-handlebars/util/type.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    module.exports = function(spy) {
      if (!spy || !spy.split) {
        return null;
      }
      var codeSegments = spy.split(":");
      /** @type {null} */
      var str = null;
      switch(codeSegments[1]) {
        case "album":
          if (4 == codeSegments.length) {
            return "disc";
          }
          if (3 == codeSegments.length) {
            return "album";
          }
          break;
        case "artist":
          if (3 == codeSegments.length) {
            return "artist";
          }
          break;
        case "track":
          if (3 == codeSegments.length) {
            return "track";
          }
          break;
        case "local":
          if (6 === codeSegments.length) {
            return "track";
          }
          if (4 === codeSegments.length) {
            return "album";
          }
          if (3 === codeSegments.length) {
            return "artist";
          }
          break;
        case "user":
          if (codeSegments.length > 3 && "collection" == codeSegments[3]) {
            return "collection";
          }
          if (codeSegments.length > 3 && (codeSegments.length <= 5 && "facebook" != codeSegments[2])) {
            return "playlist";
          }
          if (3 == codeSegments.length) {
            return "user";
          }
        ;
      }
      return str;
    };
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-glue-cat/templates/media/image.hbs" : function(require, module) {
    var Handlebars = require("./node_modules/handlebars/dist/cjs/handlebars.runtime.js")["default"];
    var ok = Handlebars.template(function(Handlebars, depth0, helpers, dataAndEvents, params) {
      /**
       * @param {Object} item
       * @param {Object} msgs
       * @return {?}
       */
      function program1(item, msgs) {
        var buf;
        /** @type {string} */
        var optsData = "";
        return optsData += "\n  ", buf = helpers["if"].call(item, item && item.imageUrl, {
          hash : {},
          inverse : self.noop,
          fn : self.program(2, data, msgs),
          data : msgs
        }), (buf || 0 === buf) && (optsData += buf), optsData += "\n";
      }
      /**
       * @param {Object} depth0
       * @param {Object} response
       * @return {?}
       */
      function data(depth0, response) {
        var udataCur;
        var stack2;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n    <div class="mo-image-background-color">\n      <div class="mo-image-background" style="background-image: url(', (stack2 = helpers.imageUrl) ? udataCur = stack2.call(depth0, {
          hash : {},
          data : response
        }) : (stack2 = depth0 && depth0.imageUrl, udataCur = typeof stack2 === functionType ? stack2.call(depth0, {
          hash : {},
          data : response
        }) : stack2), optsData += removeListener(udataCur) + ')"></div>\n    </div>\n  ';
      }
      /**
       * @return {?}
       */
      function nodes() {
        return'\n  <div class="mo-image mo-starred-wrapper">\n    <svg class="mo-starred" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet">\n      <text x="5" y="9.8">&#xf14b;</text>\n    </svg>\n  </div>\n';
      }
      /**
       * @param {Object} item
       * @param {Object} data
       * @return {?}
       */
      function program8(item, data) {
        var buf;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n  <div class="mo-image" ', buf = helpers["if"].call(item, item && item.imageUrl, {
          hash : {},
          inverse : self.noop,
          fn : self.program(7, on, data),
          data : data
        }), (buf || 0 === buf) && (optsData += buf), optsData += '>\n    <span class="mo-verified">\n      <span class="spoticon-check-16"></span>\n    </span>\n  </div>\n';
      }
      /**
       * @param {Object} depth0
       * @param {Object} cb
       * @return {?}
       */
      function on(depth0, cb) {
        var udataCur;
        var stack2;
        /** @type {string} */
        var optsData = "";
        return optsData += 'style="background-image: url(', (stack2 = helpers.imageUrl) ? udataCur = stack2.call(depth0, {
          hash : {},
          data : cb
        }) : (stack2 = depth0 && depth0.imageUrl, udataCur = typeof stack2 === functionType ? stack2.call(depth0, {
          hash : {},
          data : cb
        }) : stack2), optsData += removeListener(udataCur) + ')"';
      }
      /** @type {Array} */
      this.compilerInfo = [4, ">= 1.0.0"];
      helpers = this.merge(helpers, Handlebars.helpers);
      params = params || {};
      var buf;
      var stack1;
      var options;
      /** @type {string} */
      var optsData = "";
      /** @type {string} */
      var functionType = "function";
      var removeListener = this.escapeExpression;
      var self = this;
      var helperMissing = helpers.helperMissing;
      return optsData += '<svg class="mo-placeholder" viewBox="0 0 10 10" preserveAspectRatio="xMidYMid meet">\n  <text class="playlist-placeholder" x="5" y="9.8">&#xf135;</text>\n  <text class="album-placeholder" x="5" y="9.8">&#xf101;</text>\n  <text class="artist-placeholder" x="5" y="9.8">&#xf103;</text>\n  <text class="user-placeholder" x="5" y="9.8">&#xf15d;</text>\n</svg>\n\n', stack1 = helpers.type || depth0 && depth0.type, options = {
        hash : {},
        inverse : self.noop,
        fn : self.program(1, program1, params),
        data : params
      }, buf = stack1 ? stack1.call(depth0, depth0 && depth0.uri, "user", "artist", options) : helperMissing.call(depth0, "type", depth0 && depth0.uri, "user", "artist", options), (buf || 0 === buf) && (optsData += buf), optsData += "\n\n", buf = helpers["if"].call(depth0, depth0 && depth0.starred, {
        hash : {},
        inverse : self.program(6, program8, params),
        fn : self.program(4, nodes, params),
        data : params
      }), (buf || 0 === buf) && (optsData += buf), optsData += '\n<div class="mo-overlay"></div>';
    });
    Handlebars.registerPartial("./node_modules/spotify-glue-cat/templates/media/image.hbs", ok);
    module.exports = ok;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-glue-cat/templates/media/controllers.hbs" : function(require, module) {
    var Handlebars = require("./node_modules/handlebars/dist/cjs/handlebars.runtime.js")["default"];
    var ok = Handlebars.template(function(Handlebars, options, item, dataAndEvents, params) {
      /**
       * @param {Object} depth0
       * @param {Object} data
       * @return {?}
       */
      function program1(depth0, data) {
        var buf;
        var stack1;
        var options;
        /** @type {string} */
        var optsData = "";
        return optsData += "\n  ", stack1 = item.type || depth0 && depth0.type, options = {
          hash : {},
          inverse : self.noop,
          fn : self.program(2, move, data),
          data : data
        }, buf = stack1 ? stack1.call(depth0, depth0 && depth0.uri, "track", "album", options) : jQuery.call(depth0, "type", depth0 && depth0.uri, "track", "album", options), (buf || 0 === buf) && (optsData += buf), optsData += "\n  ", stack1 = item.type || depth0 && depth0.type, options = {
          hash : {},
          inverse : self.noop,
          fn : self.program(4, program14, data),
          data : data
        }, buf = stack1 ? stack1.call(depth0, depth0 && depth0.uri, "playlist", options) : jQuery.call(depth0, "type", depth0 && depth0.uri, "playlist", options), (buf || 0 === buf) && (optsData += buf), optsData += "\n";
      }
      /**
       * @param {?} context
       * @param {Object} e
       * @return {?}
       */
      function move(context, e) {
        var iterator;
        var index;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n    <button type="button" data-button="add" class="btn btn-add btn-icon btn-large btn-link mo-add" data-tooltip="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : e
        }, iterator ? iterator.call(context, "Save", index) : jQuery.call(context, "loc", "Save", index))) + '" data-tooltip-add="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : e
        }, iterator ? iterator.call(context, "Save", index) : jQuery.call(context, "loc", "Save", index))) + '" data-tooltip-remove="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : e
        }, iterator ? iterator.call(context, "Remove", index) : jQuery.call(context, "loc", "Remove", index))) + '" data-log-click="add-button"></button>\n  ';
      }
      /**
       * @param {Function} selector
       * @param {Object} data
       * @return {?}
       */
      function program14(selector, data) {
        var stack1;
        var el;
        var options;
        /** @type {string} */
        var buffer = "";
        return buffer += "\n    ", options = {
          hash : {},
          inverse : self.program(5, filter, data),
          fn : self.noop,
          data : data
        }, (el = item.currentUserPlaylist) ? stack1 = el.call(selector, options) : (el = selector && selector.currentUserPlaylist, stack1 = typeof el === string ? el.call(selector, options) : el), item.currentUserPlaylist || (stack1 = blockHelperMissing.call(selector, stack1, {
          hash : {},
          inverse : self.program(5, filter, data),
          fn : self.noop,
          data : data
        })), (stack1 || 0 === stack1) && (buffer += stack1), buffer += "\n  ";
      }
      /**
       * @param {?} context
       * @param {Object} feature
       * @return {?}
       */
      function filter(context, feature) {
        var iterator;
        var index;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n    <button type="button" data-button="add" class="btn btn-add btn-icon btn-large btn-link mo-add" data-tooltip="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : feature
        }, iterator ? iterator.call(context, "Follow", index) : jQuery.call(context, "loc", "Follow", index))) + '" data-tooltip-add="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : feature
        }, iterator ? iterator.call(context, "Follow", index) : jQuery.call(context, "loc", "Follow", index))) + '" data-tooltip-remove="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : feature
        }, iterator ? iterator.call(context, "Unfollow", index) : jQuery.call(context, "loc", "Unfollow", index))) + '" data-log-click="follow-button"></button>\n    ';
      }
      /**
       * @param {Function} b
       * @param {Object} task
       * @return {?}
       */
      function add(b, task) {
        var j;
        var i;
        /** @type {string} */
        var optsData = "";
        return optsData += 'data-range="', (i = item.start) ? j = i.call(b, {
          hash : {},
          data : task
        }) : (i = b && b.start, j = typeof i === string ? i.call(b, {
          hash : {},
          data : task
        }) : i), optsData += callback(j) + ",", (i = item.end) ? j = i.call(b, {
          hash : {},
          data : task
        }) : (i = b && b.end, j = typeof i === string ? i.call(b, {
          hash : {},
          data : task
        }) : i), optsData += callback(j) + '"';
      }
      /**
       * @param {?} context
       * @param {Object} task
       * @return {?}
       */
      function remove(context, task) {
        var iterator;
        var index;
        /** @type {string} */
        var optsData = "";
        return optsData += ' data-tooltip="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : task
        }, iterator ? iterator.call(context, "HoldToPreview", index) : jQuery.call(context, "loc", "HoldToPreview", index))) + '"';
      }
      /**
       * @param {?} context
       * @param {Object} cb
       * @return {?}
       */
      function map(context, cb) {
        var iterator;
        var index;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n  <button type="button" data-button="contextmenu" class="btn btn-link btn-icon btn-large spoticon-more-24 mo-more" data-tooltip="' + callback((iterator = item.loc || context && context.loc, index = {
          hash : {},
          data : cb
        }, iterator ? iterator.call(context, "More", index) : jQuery.call(context, "loc", "More", index))) + '" data-log-click="context-menu-button"></button>\n';
      }
      /**
       * @return {?}
       */
      function on() {
        return'\n<button type="button" class="media-delete btn btn-link btn-icon" data-log-click="delete-button"></button>\n';
      }
      /** @type {Array} */
      this.compilerInfo = [4, ">= 1.0.0"];
      item = this.merge(item, Handlebars.helpers);
      params = params || {};
      var value;
      var type;
      var data;
      /** @type {string} */
      var sanitized = "";
      var jQuery = item.helperMissing;
      var callback = this.escapeExpression;
      var self = this;
      /** @type {string} */
      var string = "function";
      var blockHelperMissing = item.blockHelperMissing;
      return type = item.type || options && options.type, data = {
        hash : {},
        inverse : self.noop,
        fn : self.program(1, program1, params),
        data : params
      }, value = type ? type.call(options, options && options.uri, "playlist", "track", "album", data) : jQuery.call(options, "type", options && options.uri, "playlist", "track", "album", data), (value || 0 === value) && (sanitized += value), sanitized += '\n\n<button type="button" data-button="play" class="btn btn-large btn-play btn-icon mo-play" data-log-click="play-button"\n  ', data = {
        hash : {},
        inverse : self.noop,
        fn : self.program(7, add, params),
        data : params
      }, (type = item.range) ? value = type.call(options, data) : (type = options && options.range, value = typeof type === string ? type.call(options, data) : type), item.range || (value = blockHelperMissing.call(options, value, {
        hash : {},
        inverse : self.noop,
        fn : self.program(7, add, params),
        data : params
      })), (value || 0 === value) && (sanitized += value), data = {
        hash : {},
        inverse : self.noop,
        fn : self.program(9, remove, params),
        data : params
      }, (type = item.preview) ? value = type.call(options, data) : (type = options && options.preview, value = typeof type === string ? type.call(options, data) : type), item.preview || (value = blockHelperMissing.call(options, value, {
        hash : {},
        inverse : self.noop,
        fn : self.program(9, remove, params),
        data : params
      })), (value || 0 === value) && (sanitized += value), sanitized += "></button>\n\n", type = item.type || options && options.type, data = {
        hash : {},
        inverse : self.noop,
        fn : self.program(11, map, params),
        data : params
      }, value = type ? type.call(options, options && options.uri, "playlist", "track", "album", data) : jQuery.call(options, "type", options && options.uri, "playlist", "track", "album", data), (value || 0 === value) && (sanitized += value), sanitized += "\n\n", data = {
        hash : {},
        inverse : self.noop,
        fn : self.program(13, on, params),
        data : params
      }, (type = item.canDelete) ? value = type.call(options, data) : (type = options && options.canDelete, value = typeof type === string ? type.call(options, data) : type), item.canDelete || (value = blockHelperMissing.call(options, value, {
        hash : {},
        inverse : self.noop,
        fn : self.program(13, on, params),
        data : params
      })), (value || 0 === value) && (sanitized += value), sanitized += "\n";
    });
    Handlebars.registerPartial("./node_modules/spotify-glue-cat/templates/media/controllers.hbs", ok);
    module.exports = ok;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-glue-cat/templates/media/info.hbs" : function(require, module) {
    var Handlebars = require("./node_modules/handlebars/dist/cjs/handlebars.runtime.js")["default"];
    var ok = Handlebars.template(function(Handlebars, depth0, helpers, dataAndEvents, data) {
      /**
       * @return {?}
       */
      function normal() {
        return "meta";
      }
      /**
       * @return {?}
       */
      function on() {
        return "description";
      }
      /**
       * @return {?}
       */
      function nodes() {
        return "subtitle";
      }
      /**
       * @param {Function} depth0
       * @param {Object} data
       * @return {?}
       */
      function program9(depth0, data) {
        var stack1;
        var stack2;
        var options;
        /** @type {string} */
        var buffer = "";
        return buffer += '\n      <div class="mo-subtitle text-muted one-line">\n        ', options = {
          hash : {},
          inverse : self.noop,
          fn : self.program(8, fn, data),
          data : data
        }, (stack2 = helpers.artists) ? stack1 = stack2.call(depth0, options) : (stack2 = depth0 && depth0.artists, stack1 = typeof stack2 === functionType ? stack2.call(depth0, options) : stack2), helpers.artists || (stack1 = blockHelperMissing.call(depth0, stack1, {
          hash : {},
          inverse : self.noop,
          fn : self.program(8, fn, data),
          data : data
        })), (stack1 || 0 === stack1) && (buffer += stack1), buffer += "\n        ", options = {
          hash : {},
          inverse : self.noop,
          fn : self.program(10, program10, data),
          data : data
        }, (stack2 = helpers.owner) ? stack1 = stack2.call(depth0, options) : (stack2 = depth0 && depth0.owner, stack1 = typeof stack2 === functionType ? stack2.call(depth0, options) : stack2), helpers.owner || (stack1 = blockHelperMissing.call(depth0, stack1, {
          hash : {},
          inverse : self.noop,
          fn : self.program(10, program10, data),
          data : data
        })), (stack1 || 0 === stack1) && (buffer += stack1), buffer += "\n      </div>\n    ";
      }
      /**
       * @param {Object} depth0
       * @param {Object} task
       * @return {?}
       */
      function fn(depth0, task) {
        var udataCur;
        var stack1;
        var options;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n          <a title="', (stack1 = helpers.name) ? udataCur = stack1.call(depth0, {
          hash : {},
          data : task
        }) : (stack1 = depth0 && depth0.name, udataCur = typeof stack1 === functionType ? stack1.call(depth0, {
          hash : {},
          data : task
        }) : stack1), optsData += escapeExpression(udataCur) + '" href="' + escapeExpression((stack1 = helpers.href || depth0 && depth0.href, options = {
          hash : {},
          data : task
        }, stack1 ? stack1.call(depth0, depth0 && depth0.uri, options) : helperMissing.call(depth0, "href", depth0 && depth0.uri, options))) + '" data-uri="', (stack1 = helpers.uri) ? udataCur = stack1.call(depth0, {
          hash : {},
          data : task
        }) : (stack1 = depth0 && depth0.uri, udataCur = typeof stack1 === functionType ? stack1.call(depth0, {
          hash : {},
          data : task
        }) : stack1), optsData += escapeExpression(udataCur) + '" data-log-click="artist-name">', (stack1 = helpers.name) ? udataCur = stack1.call(depth0, {
          hash : {},
          data : task
        }) : (stack1 = depth0 && depth0.name, udataCur = typeof stack1 === functionType ? stack1.call(depth0, {
          hash : {},
          data : task
        }) : stack1), optsData += escapeExpression(udataCur) + "</a>\n        ";
      }
      /**
       * @param {Object} depth0
       * @param {Object} data
       * @return {?}
       */
      function program10(depth0, data) {
        var udataCur;
        var stack1;
        var options;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n          <a title="', (stack1 = helpers.name) ? udataCur = stack1.call(depth0, {
          hash : {},
          data : data
        }) : (stack1 = depth0 && depth0.name, udataCur = typeof stack1 === functionType ? stack1.call(depth0, {
          hash : {},
          data : data
        }) : stack1), optsData += escapeExpression(udataCur) + '" href="' + escapeExpression((stack1 = helpers.href || depth0 && depth0.href, options = {
          hash : {},
          data : data
        }, stack1 ? stack1.call(depth0, depth0 && depth0.uri, options) : helperMissing.call(depth0, "href", depth0 && depth0.uri, options))) + '" data-uri="', (stack1 = helpers.uri) ? udataCur = stack1.call(depth0, {
          hash : {},
          data : data
        }) : (stack1 = depth0 && depth0.uri, udataCur = typeof stack1 === functionType ? stack1.call(depth0, {
          hash : {},
          data : data
        }) : stack1), optsData += escapeExpression(udataCur) + '" data-log-click="owner-name">', (stack1 = helpers.name) ? udataCur = stack1.call(depth0, {
          hash : {},
          data : data
        }) : (stack1 = depth0 && depth0.name, udataCur = typeof stack1 === functionType ? stack1.call(depth0, {
          hash : {},
          data : data
        }) : stack1), optsData += escapeExpression(udataCur) + "</a>\n        ";
      }
      /**
       * @param {?} depth0
       * @param {Object} data
       * @return {?}
       */
      function program1(depth0, data) {
        var udataCur;
        var stack2;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n      <div class="mo-description">', (stack2 = helpers.description) ? udataCur = stack2.call(depth0, {
          hash : {},
          data : data
        }) : (stack2 = depth0 && depth0.description, udataCur = typeof stack2 === functionType ? stack2.call(depth0, {
          hash : {},
          data : data
        }) : stack2), optsData += escapeExpression(udataCur) + "</div>\n    ";
      }
      /**
       * @param {Object} depth0
       * @param {Object} data
       * @return {?}
       */
      function program14(depth0, data) {
        var udataCur;
        var stack2;
        /** @type {string} */
        var optsData = "";
        return optsData += '\n      <div class="mo-meta">', (stack2 = helpers.meta) ? udataCur = stack2.call(depth0, {
          hash : {},
          data : data
        }) : (stack2 = depth0 && depth0.meta, udataCur = typeof stack2 === functionType ? stack2.call(depth0, {
          hash : {},
          data : data
        }) : stack2), optsData += escapeExpression(udataCur) + "</div>\n    ";
      }
      /** @type {Array} */
      this.compilerInfo = [4, ">= 1.0.0"];
      helpers = this.merge(helpers, Handlebars.helpers);
      data = data || {};
      var stack2;
      var stack1;
      var options;
      /** @type {string} */
      var buffer = "";
      /** @type {string} */
      var functionType = "function";
      var escapeExpression = this.escapeExpression;
      var helperMissing = helpers.helperMissing;
      var self = this;
      var blockHelperMissing = helpers.blockHelperMissing;
      return buffer += '<div class="mo-info ', stack2 = helpers["if"].call(depth0, depth0 && depth0.meta, {
        hash : {},
        inverse : self.noop,
        fn : self.program(1, normal, data),
        data : data
      }), (stack2 || 0 === stack2) && (buffer += stack2), buffer += " ", stack2 = helpers["if"].call(depth0, depth0 && depth0.description, {
        hash : {},
        inverse : self.noop,
        fn : self.program(3, on, data),
        data : data
      }), (stack2 || 0 === stack2) && (buffer += stack2), buffer += " ", options = {
        hash : {},
        inverse : self.program(5, nodes, data),
        fn : self.noop,
        data : data
      }, (stack1 = helpers.hideSubtitle) ? stack2 = stack1.call(depth0, options) : (stack1 = depth0 && depth0.hideSubtitle, stack2 = typeof stack1 === functionType ? stack1.call(depth0, options) : stack1), helpers.hideSubtitle || (stack2 = blockHelperMissing.call(depth0, stack2, {
        hash : {},
        inverse : self.program(5, nodes, data),
        fn : self.noop,
        data : data
      })), (stack2 || 0 === stack2) && (buffer += stack2), buffer += '" data-log-context="media-info">\n  <div class="mo-info-wrapper">\n    <a class="mo-title" title="', (stack1 = helpers.name) ? stack2 = stack1.call(depth0, {
        hash : {},
        data : data
      }) : (stack1 = depth0 && depth0.name, stack2 = typeof stack1 === functionType ? stack1.call(depth0, {
        hash : {},
        data : data
      }) : stack1), buffer += escapeExpression(stack2) + '" href="' + escapeExpression((stack1 = helpers.href || depth0 && depth0.href, options = {
        hash : {},
        data : data
      }, stack1 ? stack1.call(depth0, depth0 && depth0.uri, options) : helperMissing.call(depth0, "href", depth0 && depth0.uri, options))) + '" data-uri="', (stack1 = helpers.uri) ? stack2 = stack1.call(depth0, {
        hash : {},
        data : data
      }) : (stack1 = depth0 && depth0.uri, stack2 = typeof stack1 === functionType ? stack1.call(depth0, {
        hash : {},
        data : data
      }) : stack1), buffer += escapeExpression(stack2) + '" data-log-click="media-title">\n      <span class="mo-title-border">\n        ', (stack1 = helpers.name) ? stack2 = stack1.call(depth0, {
        hash : {},
        data : data
      }) : (stack1 = depth0 && depth0.name, stack2 = typeof stack1 === functionType ? stack1.call(depth0, {
        hash : {},
        data : data
      }) : stack1), buffer += escapeExpression(stack2) + '\n        <span class="ellipsis">&nbsp;</span>\n      </span>\n    </a>\n\n    ', options = {
        hash : {},
        inverse : self.program(7, program9, data),
        fn : self.noop,
        data : data
      }, (stack1 = helpers.hideSubtitle) ? stack2 = stack1.call(depth0, options) : (stack1 = depth0 && depth0.hideSubtitle, stack2 = typeof stack1 === functionType ? stack1.call(depth0, options) : stack1), helpers.hideSubtitle || (stack2 = blockHelperMissing.call(depth0, stack2, {
        hash : {},
        inverse : self.program(7, program9, data),
        fn : self.noop,
        data : data
      })), (stack2 || 0 === stack2) && (buffer += stack2), buffer += "\n\n    ", stack2 = helpers["if"].call(depth0, depth0 && depth0.description, {
        hash : {},
        inverse : self.noop,
        fn : self.program(12, program1, data),
        data : data
      }), (stack2 || 0 === stack2) && (buffer += stack2), buffer += "\n\n    ", stack2 = helpers["if"].call(depth0, depth0 && depth0.meta, {
        hash : {},
        inverse : self.noop,
        fn : self.program(14, program14, data),
        data : data
      }), (stack2 || 0 === stack2) && (buffer += stack2), buffer += '\n    <div class="media-link-hider"></div>\n    ', (stack1 = helpers.customContent) ? stack2 = stack1.call(depth0, {
        hash : {},
        data : data
      }) : (stack1 = depth0 && depth0.customContent, stack2 = typeof stack1 === functionType ? stack1.call(depth0, {
        hash : {},
        data : data
      }) : stack1), (stack2 || 0 === stack2) && (buffer += stack2), buffer += "\n  </div>\n</div>\n";
    });
    Handlebars.registerPartial("./node_modules/spotify-glue-cat/templates/media/info.hbs", ok);
    module.exports = ok;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} self
   * @return {undefined}
   */
  "./node_modules/spotify-events/selection/index.js" : function(require, dataAndEvents, self) {
    var round = require("./node_modules/spotify-events/node_modules/elements/index.js");
    var $ = require("./node_modules/spotify-live/index.js");
    var getActual = require("./node_modules/mout/array/map.js");
    var form = require("./node_modules/spotify-events/center.js");
    var that = require("./node_modules/spotify-events/selection/controller.js");
    var item = require("./node_modules/spotify-events/selection/containers.js");
    var view = require("./node_modules/spotify-events/selection/model.js");
    var helper = require("./node_modules/spotify-events/selection/rows.js");
    var nodes = require("./node_modules/spotify-events/selection/positions.js");
    var Node = require("./node_modules/spotify-events/util/Position.js");
    /**
     * @return {undefined}
     */
    self.attach = function() {
      var el = round(document);
      el.on("mousedown", that.handleMouseDown);
      el.on("mousemove", that.handleMouseMove);
      el.on("mouseup", that.handleMouseUp);
      el.on("dragend", that.handleDragEnd);
      el.on("keydown", that.handleKeyDown);
      el.on("focus", that.handleFocus, true);
      form.on("scroll-show-before", that.handleScrollShowBefore);
      form.on("update-indices", that.handleUpdateIndices);
      $("spotify:application").on("update", that.handleApplicationUpdate);
    };
    /**
     * @return {undefined}
     */
    self.detach = function() {
      var el = round(document);
      el.off("mousedown", that.handleMouseDown);
      el.off("mousemove", that.handleMouseMove);
      el.off("mouseup", that.handleMouseUp);
      el.off("dragend", that.handleDragEnd);
      el.off("keydown", that.handleKeyDown);
      el.off("focus", that.handleFocus, true);
      form.off("scroll-show-before", that.handleScrollShowBefore);
      form.off("update-indices", that.handleUpdateIndices);
      $("spotify:application").off("update", that.handleApplicationUpdate);
    };
    /**
     * @return {undefined}
     */
    self.update = function() {
      item.update();
    };
    /**
     * @param {?} date
     * @param {(Array|string)} key
     * @return {undefined}
     */
    self.add = function(date, key) {
      that.handleAddByUri(date, key);
    };
    /**
     * @return {?}
     */
    self.hasHoles = function() {
      return view.hasHoles();
    };
    /**
     * @param {Element} node
     * @return {?}
     */
    self.isNodeSelected = function(node) {
      if (node = "innerHTML" in node ? node : node[0], !node) {
        return false;
      }
      var item = nodes.getFromNode(node);
      return item ? view.isSelected(item) : false;
    };
    /**
     * @return {undefined}
     */
    self.reset = function() {
      view.clear();
      helper.update();
      item.reset();
    };
    /**
     * @return {undefined}
     */
    self.clear = function() {
      view.clear();
      helper.update();
    };
    /**
     * @param {?} from
     * @param {?} y
     * @return {undefined}
     */
    self.setOrigin = function(from, y) {
      view.setOrigin(new Node(from, y));
    };
    /**
     * @param {?} from
     * @param {?} month
     * @return {undefined}
     */
    self.setFocus = function(from, month) {
      view.setFocus(new Node(from, month));
    };
    /**
     * @return {?}
     */
    self.getOrigin = function() {
      var index = view.getOrigin();
      return index ? {
        containerIndex : index.containerIndex,
        index : index.index
      } : null;
    };
    /**
     * @return {?}
     */
    self.getFocus = function() {
      var index = view.getFocus();
      return index ? {
        containerIndex : index.containerIndex,
        index : index.index
      } : null;
    };
    /**
     * @return {?}
     */
    self.getIndicesPerList = function() {
      var resultItems = view.selections;
      /** @type {Array} */
      var results = [];
      /** @type {number} */
      var i = 0;
      for (;i < resultItems.length;i++) {
        var result = resultItems[i];
        if (result && result.length) {
          var obj = view.getIndicesForContainer(i);
          if (!obj) {
            continue;
          }
          var url = item.getUri(i);
          if (!url) {
            continue;
          }
          var log = {
            containerIndex : i,
            uri : url,
            indices : obj
          };
          var origin = $(url).get("origin");
          if (origin) {
            var buf = $(url).get("indices");
            var actual = getActual(obj, function(off) {
              return buf[off];
            });
            log.origin = {
              uri : origin,
              indices : actual
            };
          }
          results.push(log);
        }
      }
      return results;
    };
    /**
     * @return {?}
     */
    self.getIndicesGlobal = function() {
      var codeSegments = view.selections;
      var values = item.elements;
      /** @type {Array} */
      var indices = [];
      /** @type {Array} */
      var eventPath = [];
      if (0 === values.length) {
        return null;
      }
      var result = round(values[0]);
      var route = result.matches("[data-context]") ? result : result.parent("[data-context]");
      var url = route && route.data("uri");
      if (!url) {
        return null;
      }
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        var list = codeSegments[i];
        if (list && list.length) {
          var token;
          /** @type {number} */
          var _j = 0;
          for (;token = list[_j];_j++) {
            var start = token.start;
            for (;start < token.end;start++) {
              indices.push(nodes.getGlobalIndexFromPosition(new Node(i, start)));
              eventPath.push(round(values[i]));
            }
          }
        }
      }
      return{
        uri : url,
        indices : indices,
        containers : eventPath
      };
    };
    /**
     * @return {?}
     */
    self.getUris = function() {
      var styleNodes = view.selections;
      /** @type {Array} */
      var tasks = [];
      /** @type {number} */
      var id = 0;
      for (;id < styleNodes.length;id++) {
        var vals = styleNodes[id];
        if (vals && vals.length) {
          var element = item.getUri(id);
          if (!element) {
            continue;
          }
          var assert = $(element).get("tracks");
          if (!assert) {
            continue;
          }
          /** @type {number} */
          var i = 0;
          for (;i < vals.length;i++) {
            var node;
            var val = vals[i];
            var scripts = assert.get(val.start, val.end);
            /** @type {number} */
            var path = 0;
            for (;node = scripts[path];path++) {
              tasks.push(node.get("uri"));
            }
          }
        }
      }
      return tasks;
    };
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {?} __exports__
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/scripts/resolver.js" : function($sanitize, dataAndEvents, __exports__) {
    /**
     * @param {number} x
     * @return {?}
     */
    function fix(x) {
      return x >= 200 && 299 >= x;
    }
    /**
     * @param {?} resolver
     * @return {undefined}
     */
    function Promise(resolver) {
      if (!resolver || "function" != typeof resolver.resolve) {
        throw TypeError("Incorrect resolver argument");
      }
      this._resolver = resolver;
    }
    /**
     * @param {string} req
     * @return {undefined}
     */
    function filter(req) {
      if (!req || "function" != typeof req.close) {
        throw new TypeError("Invalid `request` argument.");
      }
      /** @type {string} */
      this._request = req;
    }
    var Ajaxy = $sanitize("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/index.js");
    var Request = Ajaxy.request.Request;
    var query = Ajaxy.request.Action;
    var Combo = Ajaxy.response.Response;
    /**
     * @param {?} opt_attributes
     * @param {Function} name
     * @return {?}
     */
    Promise.prototype.resolve = function(opt_attributes, name) {
      return this._resolve(opt_attributes, name);
    };
    /**
     * @param {string} name
     * @param {Function} obj
     * @return {?}
     */
    Promise.prototype.get = function(name, obj) {
      return this._resolveFromParams(query.GET, name, obj);
    };
    /**
     * @param {Object} url
     * @param {Function} node
     * @return {?}
     */
    Promise.prototype.post = function(url, node) {
      return this._resolveFromParams(query.POST, url, node);
    };
    /**
     * @param {string} opt_attributes
     * @param {Function} name
     * @return {?}
     */
    Promise.prototype.subscribe = function(opt_attributes, name) {
      return this._resolveFromParams(query.SUB, opt_attributes, name);
    };
    /**
     * @param {Object} option
     * @param {Function} res
     * @return {?}
     */
    Promise.prototype.patch = function(option, res) {
      return this._resolveFromParams(query.PATCH, option, res);
    };
    /**
     * @param {?} attributes
     * @param {Function} fn
     * @return {?}
     */
    Promise.prototype._resolve = function(attributes, fn) {
      /**
       * @param {Object} obj
       * @return {?}
       */
      function handler(obj) {
        var response = Combo.fromObject(obj);
        if (!response) {
          /** @type {Error} */
          var err = new Error("Failed to parse response: " + JSON.stringify(obj));
          return fn(err);
        }
        if (fix(response.getStatusCode())) {
          return fn(null, response);
        }
        var msg = response.getHeader("error") || "Request failed with status code " + response.getStatusCode();
        /** @type {Error} */
        err = new Error(msg);
        return err.response = response, fn(err, response);
      }
      /**
       * @param {?} err
       * @return {?}
       */
      function next(err) {
        return fn(err instanceof Error ? err : new Error("Request failed: " + JSON.stringify(err)));
      }
      if (!(fn && "function" == typeof fn)) {
        /**
         * @return {undefined}
         */
        fn = function() {
        };
      }
      var callback = attributes.getAction() === query.SUB ? this._resolver.subscribe : this._resolver.resolve;
      var buttonElement = callback.call(this._resolver, attributes, handler, next);
      return new filter(buttonElement);
    };
    /**
     * @param {?} _req
     * @param {Object} options
     * @param {Function} name
     * @return {?}
     */
    Promise.prototype._resolveFromParams = function(_req, options, name) {
      options = options || {};
      var params = "string" == typeof options ? options : options.url;
      var data = options.headers;
      var body = options.body;
      var req = new Request(_req, params, data, body);
      return this._resolve(req, name);
    };
    /**
     * @return {undefined}
     */
    filter.prototype.cancel = function() {
      if (this._request) {
        this._request.close();
        /** @type {null} */
        this._request = null;
      }
    };
    /** @type {function (?): undefined} */
    __exports__.Resolver = Promise;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {?} module
   * @param {?} collection
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/env/bootstrap.native.js" : function(require, dataAndEvents, module, collection) {
    /**
     * @param {?} opt_parent
     * @return {?}
     */
    function Node(opt_parent) {
      if (!(this instanceof Node)) {
        return new Node;
      }
      if (!opt_parent) {
        throw new TypeError("Missing `spBridge` parameter");
      }
      Entity.call(this);
      this._bridge = opt_parent;
      /** @type {boolean} */
      this._deferredFlush = false;
    }
    var e = collection.SpotifyApi;
    /** @type {boolean} */
    var s = !(!e || (!e.api || "function" != typeof e.api.request));
    var Entity = require("./node_modules/spotify-cosmos-api/env/bootstrap.js").Resolver;
    var assert = require("./node_modules/spotify-cosmos-api/node_modules/spotify-deferred/src/deferred.js");
    Node.prototype = new Entity;
    /** @type {function (?): ?} */
    Node.prototype.constructor = Node;
    /** @type {function (?): ?} */
    module.NativeResolver = Node;
    /**
     * @return {undefined}
     */
    Node.prototype._prepareCoreFlush = function() {
      if (!this._deferredFlush) {
        /** @type {boolean} */
        this._deferredFlush = true;
        this._defer(this, this._flushRequests);
      }
    };
    /**
     * @return {undefined}
     */
    Node.prototype._flushRequests = function() {
      /** @type {boolean} */
      this._deferredFlush = false;
      /** @type {string} */
      var deepDataAndEvents = JSON.stringify({
        name : "core_flush",
        args : []
      });
      this._sendBridgeRequest(deepDataAndEvents, {
        /**
         * @return {undefined}
         */
        onSuccess : function() {
        },
        /**
         * @return {undefined}
         */
        onFailure : function() {
        }
      });
    };
    /**
     * @param {Object} func
     * @param {Function} proxy
     * @return {undefined}
     */
    Node.prototype._defer = function(func, proxy) {
      assert(proxy.bind(func));
    };
    /**
     * @param {string} opt_attributes
     * @param {?} callback
     * @param {?} child
     * @return {undefined}
     */
    Node.prototype._sendRequest = function(opt_attributes, callback, child) {
      child = child.serialize ? child.serialize() : child;
      /** @type {Array} */
      var typePattern = [callback, child];
      var obj = {
        self : this,
        id : callback,
        type : opt_attributes
      };
      if (s) {
        this._sendApiRequest(opt_attributes, typePattern, obj, this._handleResponse, this._handleError);
      } else {
        this._sendCosmosRequest(opt_attributes, typePattern, obj, this._handleResponse, this._handleError);
      }
    };
    /**
     * @param {string} opt_attributes
     * @param {Array} args
     * @param {Function} obj
     * @param {Function} callback
     * @param {Function} func
     * @return {undefined}
     */
    Node.prototype._sendCosmosRequest = function(opt_attributes, args, obj, callback, func) {
      /** @type {string} */
      var deepDataAndEvents = JSON.stringify({
        name : opt_attributes,
        args : args
      });
      this._sendBridgeRequest(deepDataAndEvents, {
        /**
         * @param {?} data
         * @return {undefined}
         */
        onSuccess : function(data) {
          callback.call(obj, JSON.parse(data));
        },
        /**
         * @param {?} data
         * @return {undefined}
         */
        onFailure : function(data) {
          /** @type {*} */
          data = JSON.parse(data);
          func.call(obj, data);
        }
      });
      this._prepareCoreFlush();
    };
    /**
     * @param {string} deepDataAndEvents
     * @param {Object} opt_attributes
     * @return {undefined}
     */
    Node.prototype._sendBridgeRequest = function(deepDataAndEvents, opt_attributes) {
      this._bridge.executeRequest(deepDataAndEvents, opt_attributes || {});
    };
    /**
     * @param {string} o
     * @param {Array} lab
     * @param {Function} elements
     * @param {Function} callback
     * @param {Function} next_callback
     * @return {undefined}
     */
    Node.prototype._sendApiRequest = function(o, lab, elements, callback, next_callback) {
      e.api.request(o, lab, elements, callback, next_callback);
    };
    /**
     * @param {(Array|string)} response
     * @return {undefined}
     */
    Node.prototype._handleResponse = function(response) {
      this.self._dispatchResponse(this.id, this.type, response.responses && response.responses[0] || response);
    };
    /**
     * @param {?} walkers
     * @return {undefined}
     */
    Node.prototype._handleError = function(walkers) {
      this.self._dispatchResponse(this.id, this.type, walkers);
    };
    /**
     * @param {?} opt_attributes
     * @param {Function} name
     * @param {Function} method
     * @return {?}
     */
    Node.prototype.resolve = function(opt_attributes, name, method) {
      /**
       * @param {Function} doc
       * @param {Function} me
       * @return {undefined}
       */
      function fn(doc, me) {
        this._defer(this, doc.bind(this, me));
        child.close();
      }
      var child = this._resolve(opt_attributes, fn.bind(this, name), fn.bind(this, method));
      return child;
    };
    /**
     * @param {?} opt_attributes
     * @param {Function} name
     * @param {Function} method
     * @return {?}
     */
    Node.prototype.subscribe = function(opt_attributes, name, method) {
      /**
       * @param {Function} callback
       * @param {?} next
       * @return {undefined}
       */
      function router(callback, next) {
        callback.call(this, next);
        remote.pull();
      }
      var remote = this._resolve(opt_attributes, router.bind(this, name), router.bind(this, method));
      return remote;
    };
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {?} module
   * @param {Object} params
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/env/bootstrap.web.js" : function(require, dataAndEvents, module, params) {
    /**
     * @param {string} options
     * @return {?}
     */
    function constructor(options) {
      return this instanceof constructor ? (SuperClass.call(this), this._target = options || "*", this._handleResponse = this._handleResponse.bind(this), this._requestMessageType = "cosmos-request", this._responseMessageType = "cosmos-response", this._requestIdPrefix = "cosmos_", void this.attach()) : new constructor(options);
    }
    var helper = require("./node_modules/spotify-cosmos-api/node_modules/spotify-deferred/src/deferred.js");
    var SuperClass = require("./node_modules/spotify-cosmos-api/env/bootstrap.js").Resolver;
    constructor.prototype = new SuperClass;
    /** @type {function (string): ?} */
    constructor.prototype.constructor = constructor;
    /** @type {function (string): ?} */
    module.WebResolver = constructor;
    /**
     * @param {string} opt_attributes
     * @param {?} callback
     * @param {?} data
     * @return {undefined}
     */
    constructor.prototype._sendRequest = function(opt_attributes, callback, data) {
      var listener = params.window.top;
      var msg = {
        type : this._requestMessageType,
        resolver : this._id,
        id : this._requestIdPrefix + callback,
        name : opt_attributes,
        payload : data.serialize ? data.serialize() : data
      };
      listener.postMessage(JSON.stringify(msg), this._target);
    };
    /**
     * @param {Object} response
     * @return {undefined}
     */
    constructor.prototype._handleResponse = function(response) {
      var data = response.data;
      if ("string" == typeof data) {
        try {
          /** @type {*} */
          data = JSON.parse(response.data);
        } catch (n) {
          return;
        }
      }
      if (data.type == this._responseMessageType && (data.resolver == this._id && data.payload)) {
        var endpoint = data.id || "";
        /** @type {number} */
        var rvar = parseInt(endpoint.replace(this._requestIdPrefix, ""), 10);
        var label = data.name || "";
        if (rvar) {
          if (label) {
            this._dispatchResponse(rvar, label, data.payload);
          }
        }
      }
    };
    /**
     * @return {undefined}
     */
    constructor.prototype.attach = function() {
      var global = params.window;
      if (global.addEvent && !global.addEventListener) {
        global.addEvent("onmessage", this._handleResponse);
      } else {
        global.addEventListener("message", this._handleResponse, false);
      }
    };
    /**
     * @return {undefined}
     */
    constructor.prototype.detach = function() {
      var node = params.window;
      if (node.removeEvent && !node.removeEventListener) {
        node.removeEvent("onmessage", this._handleResponse);
      } else {
        node.removeEventListener("message", this._handleResponse, false);
      }
    };
    /**
     * @param {?} opt_attributes
     * @param {Function} name
     * @param {Function} method
     * @return {?}
     */
    constructor.prototype.resolve = function(opt_attributes, name, method) {
      /**
       * @param {Function} doc
       * @param {Function} me
       * @return {undefined}
       */
      function fn(doc, me) {
        helper(doc.bind(this, me));
        child.close();
      }
      var child = this._resolve(opt_attributes, fn.bind(this, name), fn.bind(this, method));
      return child;
    };
    /**
     * @param {?} opt_attributes
     * @param {Function} name
     * @param {Function} method
     * @return {?}
     */
    constructor.prototype.subscribe = function(opt_attributes, name, method) {
      return this._resolve(opt_attributes, name, method);
    };
  },
  /**
   * @param {?} topic
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/index.js" : function(topic, module) {
    var out = topic("./node_modules/spotify-events/node_modules/elements/base.js");
    topic("./node_modules/spotify-events/node_modules/elements/attributes.js");
    topic("./node_modules/spotify-events/node_modules/elements/events.js");
    topic("./node_modules/spotify-events/node_modules/elements/insertion.js");
    topic("./node_modules/spotify-events/node_modules/elements/traversal.js");
    topic("./node_modules/spotify-events/node_modules/elements/delegation.js");
    module.exports = out;
  },
  /**
   * @param {?} get
   * @param {?} dataAndEvents
   * @param {Array} input
   * @param {Window} global
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/sort.js" : function(get, dataAndEvents, input, global) {
    /**
     * @param {?} key
     * @param {Text} s
     * @param {?} id
     * @param {?} value
     * @return {undefined}
     */
    function text(key, s, id, value) {
      s = escape(s, id);
      flags[key] = value;
      storage(function() {
        if (value === flags[key]) {
          delete flags[key];
          value(null, s);
        }
      });
    }
    /**
     * @param {?} id
     * @param {?} e
     * @param {string} deepDataAndEvents
     * @param {?} value
     * @return {?}
     */
    function _initialize(id, e, deepDataAndEvents, value) {
      var worker = workers[id];
      if (worker) {
        return flags[id] = value, done[id] = (done[id] || 0) + 1, worker.postMessage({
          reset : true
        }), void _start(e, worker, deepDataAndEvents);
      }
      /** @type {Worker} */
      worker = new Worker(workerUrl);
      /** @type {Worker} */
      workers[id] = worker;
      flags[id] = value;
      _start(e, worker, deepDataAndEvents);
      /** @type {Array} */
      var all = [];
      worker.addEventListener("message", function(response) {
        if (response.data.reset) {
          return done[id]--, void(all.length = 0);
        }
        if (!done[id] && (all = all.concat(response.data.items), response.data.last)) {
          workers[id].terminate();
          var callback = flags[id];
          delete flags[id];
          delete workers[id];
          callback(null, all);
        }
      });
    }
    /**
     * @param {?} node
     * @param {?} event
     * @param {string} deepDataAndEvents
     * @return {undefined}
     */
    function _start(node, event, deepDataAndEvents) {
      var nodes = children(node);
      c(event, nodes, 0, {
        property : deepDataAndEvents
      });
    }
    /**
     * @return {?}
     */
    function handler() {
      var e = ids.toString();
      var ret = escape.toString();
      var y = children.toString();
      var querystring = c.toString();
      /** @type {string} */
      var o = [ret, y, querystring].join(", ");
      /** @type {string} */
      var text = "(" + e + ")(" + o + ")";
      /** @type {Blob} */
      var b = new Blob([text], {
        type : "text/javascript"
      });
      var res = URL.createObjectURL(b);
      return res;
    }
    /**
     * @return {?}
     */
    function go() {
      return workerUrl ? _initialize : global.Worker && (global.Blob && global.URL) ? (workerUrl = handler(), _initialize) : text;
    }
    /**
     * @param {string} result
     * @return {?}
     */
    function callback(result) {
      result = result.toLowerCase();
      var query;
      /** @type {Array} */
      var queries = ["the ", "(the) "];
      /** @type {number} */
      var q = 0;
      for (;query = queries[q];q++) {
        if (0 === result.indexOf(query)) {
          return result.replace(query, "").trim();
        }
      }
      return result.trim();
    }
    /**
     * @param {Array} buffer
     * @param {Object} obj
     * @param {Array} conditions
     * @return {?}
     */
    function update(buffer, obj, conditions) {
      var clone = $(buffer, function(doc, subkey) {
        /** @type {Array} */
        var values = [];
        var element = obj && obj[subkey];
        /** @type {number} */
        var i = 0;
        for (;i < conditions.length;i++) {
          var a;
          var optgroup = conditions[i];
          var parent = groups[optgroup];
          a = parent ? element && element.get(optgroup) || "" : doc.get(optgroup);
          if (a instanceof List) {
            a = $(a, function($templateCache) {
              return callback($templateCache.get("name"));
            }).join();
          } else {
            if (a instanceof Model) {
              a = callback(a.get("name"));
            } else {
              if ("string" == typeof a) {
                a = callback(a);
              } else {
                if ("number" == typeof a) {
                  if (creatorsMap[optgroup]) {
                    /** @type {number} */
                    a = -a;
                  }
                }
              }
            }
          }
          values.push(a);
        }
        return{
          uri : doc.get("uri"),
          index : subkey,
          values : values
        };
      });
      return clone;
    }
    /**
     * @param {Function} obj
     * @param {?} element
     * @param {Array} callback
     * @param {string} regex
     * @param {Function} cb
     * @return {undefined}
     */
    function test(obj, element, callback, regex, cb) {
      var items = data(element).get("rows");
      data(element).get("tracks", function(outErr, funcs) {
        if (outErr) {
          return cb(outErr);
        }
        if (0 === funcs.length) {
          return void cb(null, []);
        }
        /** @type {Array} */
        var h2 = [];
        /** @type {Array} */
        var buffer = [];
        /** @type {Array} */
        var root = [];
        each(funcs, function(element, m) {
          if (element) {
            buffer.push(element);
            var item;
            if (items) {
              item = items[m];
              root.push(item);
            }
            /** @type {number} */
            var j = 0;
            for (;j < callback.length;j++) {
              var optgroup = callback[j];
              var g = groups[optgroup];
              if (g) {
                if (item) {
                  if (void 0 === item.get(optgroup)) {
                    h2.push(function() {
                      item.get(optgroup, this.done);
                    });
                  }
                }
              } else {
                if (void 0 === element.get(optgroup)) {
                  h2.push(function() {
                    element.get(optgroup, this.done);
                  });
                }
              }
            }
          }
        });
        on(h2).finally(function(dataAndEvents) {
          if (dataAndEvents) {
            throw dataAndEvents;
          }
          var value = update(buffer, root, callback);
          var group = go();
          group(obj, value, "values", function(err, results) {
            return err ? cb(err) : ("desc" === regex && results.reverse(), void cb(null, results));
          });
        });
      });
    }
    /**
     * @param {Object} o
     * @param {Array} e
     * @return {?}
     */
    function match(o, e) {
      var ret = $(o.insert, function(dataAndEvents, i) {
        return fn(e, o.index + i);
      }).sort(function(av, bv) {
        return bv > av ? -1 : av > bv ? 1 : void 0;
      });
      return ret;
    }
    /**
     * @param {Node} o
     * @param {?} elem
     * @return {?}
     */
    function run(o, elem) {
      /** @type {Array} */
      var _results = [];
      /** @type {number} */
      var s = 0;
      for (;s < o.remove.length;s++) {
        _results.push(fn(elem, o.index + s));
      }
      return _results;
    }
    /**
     * @param {Node} t
     * @param {?} data
     * @param {Object} dataAndEvents
     * @param {?} name
     * @return {?}
     */
    function Init(t, data, dataAndEvents, name) {
      var allEls = t.get("tracks");
      var entries = t.get("rows");
      if (!entries && !allEls) {
        return{};
      }
      /** @type {Array} */
      var result = [];
      var obj = {};
      if (allEls && (obj.tracks = $(data, function(context) {
        var j = context.index;
        return result.push(j), allEls[j];
      })), entries && (obj.rows = $(data, function(first) {
        var i = first.index;
        return result.push(i), entries[i];
      })), obj.indices = result, dataAndEvents) {
        /** @type {Object} */
        var test = dataAndEvents;
        var l = test.insert.length && test.remove.length;
        if (!l) {
          obj.addedIndices = match(test, result);
          if (name) {
            obj.removedIndices = run(test, name);
          }
        }
      }
      return obj;
    }
    var workerUrl;
    var on = get("./node_modules/finally/index.js");
    var data = get("./node_modules/spotify-live/index.js");
    var each = get("./node_modules/mout/array/forEach.js");
    var $ = get("./node_modules/mout/array/map.js");
    var fn = get("./node_modules/mout/array/indexOf.js");
    var storage = get("./node_modules/prime/defer.js");
    var List = get("./node_modules/spotify-live/index.js").List;
    var Model = get("./node_modules/spotify-live/index.js").Model;
    var ids = get("./node_modules/spotify-live-models/util/sortworker.js");
    var escape = get("./node_modules/spotify-live-models/util/sorter.js");
    var children = get("./node_modules/spotify-live-models/util/chunker.js");
    var c = get("./node_modules/spotify-live-models/util/poster.js");
    var workers = {};
    var flags = {};
    var done = {};
    var groups = {
      dateAdded : true,
      addedBy : true
    };
    var creatorsMap = {
      dateAdded : true
    };
    /** @type {function (?, Text, ?, ?): undefined} */
    input.defaultSorter = text;
    /** @type {function (?, ?, string, ?): ?} */
    input.workerSorter = _initialize;
    /** @type {function (): ?} */
    input.createWorkerFile = handler;
    /** @type {function (): ?} */
    input.getSorter = go;
    /** @type {function (string): ?} */
    input.makeSearchString = callback;
    /** @type {function (Array, Object, Array): ?} */
    input.prepareTracks = update;
    /** @type {function (Function, ?, Array, string, Function): undefined} */
    input.sort = test;
    /** @type {function (Object, Array): ?} */
    input.getAddedIndices = match;
    /** @type {function (Node, ?): ?} */
    input.getRemovedIndices = run;
    /** @type {function (Node, ?, Object, ?): ?} */
    input.getSortData = Init;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} obj
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/index.js" : function(require, dataAndEvents, obj) {
    obj.message = require("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/message.js");
    obj.request = require("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/request.js");
    obj.response = require("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/response.js");
    obj.playerstate = require("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/player_state.js");
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @param {?} dataAndEvents
   * @param {Window} global
   * @return {undefined}
   */
  "./node_modules/prime/defer.js" : function(require, module, dataAndEvents, global) {
    var condition = require("./node_modules/mout/lang/kindOf.js");
    var getActual = require("./node_modules/mout/time/now.js");
    var assert = require("./node_modules/mout/array/forEach.js");
    var func = require("./node_modules/mout/array/indexOf.js");
    var params = {
      timeout : {},
      frame : [],
      immediate : []
    };
    /**
     * @param {Array} options
     * @param {Function} callback
     * @param {?} data
     * @param {Function} fn
     * @return {?}
     */
    var request = function(options, callback, data, fn) {

      /**
       * @return {undefined}
       */
      var next = function() {
        check(options);
      };
      if (!options.length) {
        fn(next);
      }
      var i = {
        /** @type {Function} */
        callback : callback,
        context : data
      };
      return options.push(i), function() {
        var a = func(options, i);
        if (a > -1) {
          options.splice(a, 1);
        }
      };
    };
    /**
     * @param {Array} other
     * @return {undefined}
     */
    var check = function(other) {
      var actual = getActual();
      assert(other.splice(0), function(subscription) {
        subscription.callback.call(subscription.context, actual);
      });
    };
    /**
     * @param {Object} spy
     * @param {?} state
     * @param {?} context
     * @return {?}
     */
    var $ = function(spy, state, context) {
      return "Number" === condition(state) ? $.timeout(spy, state, context) : $.immediate(spy, state);
    };
    if (global.process && process.nextTick) {
      /**
       * @param {Function} callback
       * @param {?} data
       * @return {?}
       */
      $.immediate = function(callback, data) {
        return request(params.immediate, callback, data, process.nextTick);
      };
    } else {
      if (global.setImmediate) {
        /**
         * @param {Function} callback
         * @param {?} data
         * @return {?}
         */
        $.immediate = function(callback, data) {
          return request(params.immediate, callback, data, setImmediate);
        };
      } else {
        if (global.postMessage && global.addEventListener) {
          addEventListener("message", function(e) {
            if (e.source === global) {
              if ("@deferred" === e.data) {
                e.stopPropagation();
                check(params.immediate);
              }
            }
          }, true);
          /**
           * @param {Function} callback
           * @param {?} data
           * @return {?}
           */
          $.immediate = function(callback, data) {
            return request(params.immediate, callback, data, function() {
              postMessage("@deferred", "*");
            });
          };
        } else {
          /**
           * @param {Function} callback
           * @param {?} data
           * @return {?}
           */
          $.immediate = function(callback, data) {
            return request(params.immediate, callback, data, function(fnc) {
              setTimeout(fnc, 0);
            });
          };
        }
      }
    }
    var taskComplete = global.requestAnimationFrame || (global.webkitRequestAnimationFrame || (global.mozRequestAnimationFrame || (global.oRequestAnimationFrame || (global.msRequestAnimationFrame || function(fnc) {
      setTimeout(fnc, 1E3 / 60);
    }))));
    /**
     * @param {Function} callback
     * @param {?} body
     * @return {?}
     */
    $.frame = function(callback, body) {
      return request(params.frame, callback, body, taskComplete);
    };
    var hasMembers;
    /**
     * @param {Function} callback
     * @param {?} time
     * @param {?} fn
     * @return {?}
     */
    $.timeout = function(callback, time, fn) {
      var to = params.timeout;
      return hasMembers || (hasMembers = $.immediate(function() {
        /** @type {null} */
        hasMembers = null;
        params.timeout = {};
      })), request(to[time] || (to[time] = []), callback, fn, function(fnc) {
        setTimeout(fnc, time);
      });
    };
    /** @type {function (Object, ?, ?): ?} */
    module.exports = $;
  },
  /**
   * @param {?} getCallback
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/prime/emitter.js" : function(getCallback, module) {
    var callback = getCallback("./node_modules/mout/array/indexOf.js");
    var fn = getCallback("./node_modules/mout/array/forEach.js");
    var cb = getCallback("./node_modules/prime/index.js");
    var defer = getCallback("./node_modules/prime/defer.js");
    /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
    var __slice = Array.prototype.slice;
    var Emitter = cb({
      /**
       * @param {string} name
       * @param {Function} value
       * @return {?}
       */
      on : function(name, value) {
        var listeners = this._listeners || (this._listeners = {});
        var bucket = listeners[name] || (listeners[name] = []);
        return-1 === callback(bucket, value) && bucket.push(value), this;
      },
      /**
       * @param {string} event
       * @param {Function} value
       * @return {?}
       */
      off : function(event, value) {
        var list;
        var listeners = this._listeners;
        if (listeners && (list = listeners[event])) {
          var pos = callback(list, value);
          if (pos > -1) {
            list.splice(pos, 1);
          }
          if (!list.length) {
            delete listeners[event];
          }
          var key;
          for (key in listeners) {
            return this;
          }
          delete this._listeners;
        }
        return this;
      },
      /**
       * @param {string} name
       * @return {?}
       */
      emit : function(name) {
        var that = this;
        /** @type {Array.<?>} */
        var args = __slice.call(arguments, 1);
        /**
         * @return {undefined}
         */
        var emit = function() {
          var copy;
          var options = that._listeners;
          if (options) {
            if (copy = options[name]) {
              fn(copy.slice(0), function(alertCallback) {
                return alertCallback.apply(that, args);
              });
            }
          }
        };
        return args[args.length - 1] === Emitter.EMIT_SYNC ? (args.pop(), emit()) : defer(emit), this;
      }
    });
    Emitter.EMIT_SYNC = {};
    module.exports = Emitter;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/prime/index.js" : function(require, module) {
    var hasOwn = require("./node_modules/mout/object/hasOwn.js");
    var mixIn = require("./node_modules/mout/object/mixIn.js");
    var create = require("./node_modules/mout/lang/createObject.js");
    var mix = require("./node_modules/mout/lang/kindOf.js");
    /** @type {boolean} */
    var s = true;
    try {
      Object.defineProperty({}, "~", {});
      Object.getOwnPropertyDescriptor({}, "~");
    } catch (a) {
      /** @type {boolean} */
      s = false;
    }
    /** @type {boolean} */
    var u = !{
      valueOf : 0
    }.propertyIsEnumerable("valueOf");
    /** @type {Array} */
    var internalNames = ["toString", "valueOf"];
    /** @type {RegExp} */
    var delegateEventSplitter = /^constructor|inherits|mixin$/;
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    var implement = function(opt_attributes) {
      var cache = this.prototype;
      var prop;
      for (prop in opt_attributes) {
        if (!prop.match(delegateEventSplitter)) {
          if (s) {
            /** @type {(ObjectPropertyDescriptor|undefined)} */
            var desc = Object.getOwnPropertyDescriptor(opt_attributes, prop);
            if (desc) {
              Object.defineProperty(cache, prop, desc);
              continue;
            }
          }
          cache[prop] = opt_attributes[prop];
        }
      }
      if (u) {
        /** @type {number} */
        var j = 0;
        for (;prop = internalNames[j];j++) {
          var value = opt_attributes[prop];
          if (value !== Object.prototype[prop]) {
            cache[prop] = value;
          }
        }
      }
      return this;
    };
    /**
     * @param {Object} proto
     * @return {?}
     */
    var extend = function(proto) {
      if ("Function" === mix(proto)) {
        proto = {
          constructor : proto
        };
      }
      var superprime = proto.inherits;
      var constructor = hasOwn(proto, "constructor") ? proto.constructor : superprime ? function() {
        return superprime.apply(this, arguments);
      } : function() {
      };
      if (superprime) {
        mixIn(constructor, superprime);
        var superproto = superprime.prototype;
        var module = constructor.prototype = create(superproto);
        constructor.parent = superproto;
        module.constructor = constructor;
      }
      if (!constructor.implement) {
        /** @type {function (?): ?} */
        constructor.implement = implement;
      }
      var mixins = proto.mixin;
      if (mixins) {
        if ("Array" !== mix(mixins)) {
          /** @type {Array} */
          mixins = [mixins];
        }
        /** @type {number} */
        var m = 0;
        for (;m < mixins.length;m++) {
          constructor.implement(create(mixins[m].prototype));
        }
      }
      return constructor.implement(proto);
    };
    /** @type {function (Object): ?} */
    module.exports = extend;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/finally/index.js" : function(require, module) {
    var getActual = require("./node_modules/prime/index.js");
    var g = require("./node_modules/mout/lang/kindOf.js");
    var build = require("./node_modules/mout/array/map.js");
    var toArray = require("./node_modules/mout/array/slice.js");
    var callback = require("./node_modules/mout/array/forEach.js");
    var makeIterator = require("./node_modules/mout/array/reduce.js");
    var builder = require("./node_modules/mout/collection/forEach.js");
    var isArray = require("./node_modules/mout/collection/map.js");
    /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
    var self = Array.prototype.push;
    var Stream = getActual({
      /**
       * @return {undefined}
       */
      constructor : function() {
        /** @type {Array} */
        this._seq = [];
      },
      /**
       * @return {?}
       */
      then : function() {
        return this._push(this._callbacks(arguments)), this;
      },
      /**
       * @param {Function} matcherFunction
       * @param {(Function|string)} args
       * @return {?}
       */
      _parallel : function(matcherFunction, args) {
        var self = this;
        return function() {
          var v = new exports(self, self._index++);
          self._controls.push(v);
          matcherFunction.apply(v, args ? args.concat(toArray(arguments)) : arguments);
        };
      },
      /**
       * @param {Array} value
       * @param {(Function|string)} message
       * @return {undefined}
       */
      _push : function(value, message) {
        if (value.length) {
          this._seq.push(build(value, function(orig) {
            return this._parallel(orig, message);
          }, this));
        }
      },
      /**
       * @param {Object} callback
       * @return {?}
       */
      _callbacks : function(callback) {
        return makeIterator(callback, function(pending, args) {
          return "Array" === g(args) ? self.apply(pending, args) : pending.push(args), pending;
        }, []);
      },
      /**
       * @param {?} scheme
       * @return {?}
       */
      sequential : function(scheme) {
        var udataCur = this._callbacks(toArray(arguments, 1));
        return builder(scheme, function(dataAndEvents, deepDataAndEvents) {
          this._push(udataCur, [dataAndEvents, deepDataAndEvents]);
        }, this), this;
      },
      /**
       * @param {Array} callback
       * @param {Function} orig
       * @return {?}
       */
      parallel : function(callback, orig) {
        var m3 = isArray(callback, function(dataAndEvents, deepDataAndEvents) {
          return this._parallel(orig, [dataAndEvents, deepDataAndEvents]);
        }, this);
        return m3.length && this._seq.push(m3), this;
      },
      /**
       * @return {?}
       */
      "finally" : function() {
        return this.then.apply(this, arguments), this._continue.call(this), this;
      },
      /**
       * @return {?}
       */
      run : function() {
        return this._continue.apply(this, arguments), this;
      },
      /**
       * @return {undefined}
       */
      _break : function() {
        this._seq.splice(0, this._seq.length - 1);
        this._continue.apply(this, arguments);
      },
      /**
       * @param {?} outErr
       * @param {Object} content
       * @return {undefined}
       */
      _spread : function(outErr, content) {
        var cb = this._next();
        if (cb) {
          if (cb = cb[0]) {
            if (!(content && content.length)) {
              /** @type {Array} */
              content = [void 0];
            }
            this._length = content.length;
            callback(content, function(srcFiles) {
              cb(outErr, srcFiles);
            });
          }
        }
      },
      /**
       * @return {undefined}
       */
      _continue : function() {
        var content = this._next();
        if (content) {
          this._length = content.length;
          /** @type {Arguments} */
          var args = arguments;
          callback(content, function(wrapper) {
            wrapper.apply(null, args);
          });
        }
      },
      /**
       * @return {?}
       */
      _next : function() {
        var e = this._seq.shift();
        if (e) {
          return this._controls && callback(this._controls, function(process) {
            process._kill();
          }), this._arguments = [], this._errors = [], this._controls = [], this._index = 0, e;
        }
      },
      /**
       * @param {?} i
       * @param {(Node|string)} err
       * @param {?} offsetPosition
       * @return {undefined}
       */
      _done : function(i, err, offsetPosition) {
        if (this._arguments[i] = offsetPosition, err && this._errors.push(err), --this._length) {
          this._controls[i]._kill();
        } else {
          /** @type {null} */
          var context = null;
          if (1 === this._errors.length) {
            context = this._errors[0];
          } else {
            if (this._errors.length) {
              /** @type {Error} */
              context = new Error(build(this._errors, function(m1) {
                return m1.message;
              }).join("\n"));
            }
          }
          this._continue.apply(this, [context].concat(this._arguments));
        }
      }
    });
    /**
     * @param {Function} self
     * @param {?} mapper
     * @return {undefined}
     */
    var exports = function(self, mapper) {
      var n;
      /**
       * @return {undefined}
       */
      this._kill = function() {
        /** @type {boolean} */
        n = true;
      };
      /**
       * @return {undefined}
       */
      this.break = function() {
        if (!n) {
          self._break.apply(self, arguments);
        }
      };
      /**
       * @return {undefined}
       */
      this.continue = function() {
        if (!n) {
          self._continue.apply(self, arguments);
        }
      };
      /**
       * @param {?} fulfilled
       * @param {Object} err
       * @return {undefined}
       */
      this.spread = function(fulfilled, err) {
        if (!n) {
          self._spread(fulfilled, err);
        }
      };
      /**
       * @param {Array} recurring
       * @param {?} end
       * @return {undefined}
       */
      this.done = function(recurring, end) {
        if (!n) {
          self._done.call(self, mapper, recurring, end);
        }
      };
    };
    /**
     * @return {?}
     */
    module.exports = function() {
      var a = new Stream;
      return a.then.apply(a, arguments), a;
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/lang/kindOf.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      return null === spy ? "Null" : spy === Undefined ? "Undefined" : rquickExpr.exec(ostring.call(spy))[1];
    }
    var Undefined;
    /** @type {RegExp} */
    var rquickExpr = /^\[object (.*)\]$/;
    /** @type {function (this:*): string} */
    var ostring = Object.prototype.toString;
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/lang/isPlainObject.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      return!!spy && ("object" == typeof spy && spy.constructor === Object);
    }
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/object/forIn.js" : function(require, module) {
    /**
     * @return {undefined}
     */
    function checkDontEnum() {
      /** @type {Array} */
      _dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
      /** @type {boolean} */
      i = true;
      var key;
      for (key in{
        toString : null
      }) {
        /** @type {boolean} */
        i = false;
      }
    }
    /**
     * @param {Object} proto
     * @param {?} v
     * @param {?} type
     * @return {undefined}
     */
    function create(proto, v, type) {
      var key;
      /** @type {number} */
      var l = 0;
      if (null == i) {
        checkDontEnum();
      }
      for (key in proto) {
        if (exec(v, proto, key, type) === false) {
          break;
        }
      }
      if (i) {
        var constructor = proto.constructor;
        /** @type {boolean} */
        var d = !!constructor && proto === constructor.prototype;
        for (;(key = _dontEnums[l++]) && ("constructor" === key && (d || !hasOwn(proto, key)) || (proto[key] === Object.prototype[key] || exec(v, proto, key, type) !== false));) {
        }
      }
    }
    /**
     * @param {Function} func
     * @param {Object} obj
     * @param {string} key
     * @param {?} str
     * @return {?}
     */
    function exec(func, obj, key, str) {
      return func.call(str, obj[key], key, obj);
    }
    var i;
    var _dontEnums;
    var hasOwn = require("./node_modules/mout/object/hasOwn.js");
    /** @type {function (Object, ?, ?): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/object/filter.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {?} fn
     * @param {?} options
     * @return {?}
     */
    function create(spy, fn, options) {
      fn = func(fn, options);
      var flags = {};
      return check(spy, function(value, key, xs) {
        if (fn(value, key, xs)) {
          flags[key] = value;
        }
      }), flags;
    }
    var check = require("./node_modules/mout/object/forOwn.js");
    var func = require("./node_modules/mout/function/makeIterator_.js");
    /** @type {function (Object, ?, ?): ?} */
    module.exports = create;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/object/mixIn.js" : function($sanitize, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function spy(spy) {
      var t;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var len = arguments.length;
      for (;++i < len;) {
        t = arguments[i];
        if (null != t) {
          MAP(t, clone, spy);
        }
      }
      return spy;
    }
    /**
     * @param {?} dataAndEvents
     * @param {?} events
     * @return {undefined}
     */
    function clone(dataAndEvents, events) {
      this[events] = dataAndEvents;
    }
    var MAP = $sanitize("./node_modules/mout/object/forOwn.js");
    /** @type {function (Object): ?} */
    module.exports = spy;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/object/forOwn.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {Function} fn
     * @param {Function} scope
     * @return {undefined}
     */
    function create(spy, fn, scope) {
      check(spy, function(dataAndEvents, key) {
        return next(spy, key) ? fn.call(scope, spy[key], key, spy) : void 0;
      });
    }
    var next = require("./node_modules/mout/object/hasOwn.js");
    var check = require("./node_modules/mout/object/forIn.js");
    /** @type {function (Object, Function, Function): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/difference.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      var args = toArray(arguments, 1);
      var expectation = expect(check(spy), function(thisObj) {
        return!command(args, function(callback) {
          return makeIterator(callback, thisObj);
        });
      });
      return expectation;
    }
    var check = require("./node_modules/mout/array/unique.js");
    var expect = require("./node_modules/mout/array/filter.js");
    var command = require("./node_modules/mout/array/some.js");
    var makeIterator = require("./node_modules/mout/array/contains.js");
    var toArray = require("./node_modules/mout/array/slice.js");
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} opts
   * @return {undefined}
   */
  "./node_modules/mout/array/forEach.js" : function(dataAndEvents, opts) {
    /**
     * @param {Object} spy
     * @param {Function} fn
     * @param {Function} obj
     * @return {undefined}
     */
    function has(spy, fn, obj) {
      if (null != spy) {
        /** @type {number} */
        var i = -1;
        var l = spy.length;
        for (;++i < l && fn.call(obj, spy[i], i, spy) !== false;) {
        }
      }
    }
    /** @type {function (Object, Function, Function): undefined} */
    opts.exports = has;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/combine.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {?} values
     * @return {?}
     */
    function create(spy, values) {
      if (null == values) {
        return spy;
      }
      /** @type {number} */
      var i = -1;
      var valuesLen = values.length;
      for (;++i < valuesLen;) {
        if (-1 === check(spy, values[i])) {
          spy.push(values[i]);
        }
      }
      return spy;
    }
    var check = require("./node_modules/mout/array/indexOf.js");
    /** @type {function (Object, ?): ?} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/append.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} coord
     * @return {?}
     */
    function t(spy, coord) {
      if (null == coord) {
        return spy;
      }
      var l = spy.length;
      /** @type {number} */
      var b = -1;
      var nodeListLen = coord.length;
      for (;++b < nodeListLen;) {
        spy[l + b] = coord[b];
      }
      return spy;
    }
    /** @type {function (Object, ?): ?} */
    module.exports = t;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/remove.js" : function($sanitize, module) {
    /**
     * @param {Object} spy
     * @param {?} attr
     * @return {undefined}
     */
    function create(spy, attr) {
      var i = createEl(spy, attr);
      if (-1 !== i) {
        spy.splice(i, 1);
      }
    }
    var createEl = $sanitize("./node_modules/mout/array/indexOf.js");
    /** @type {function (Object, ?): undefined} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/filter.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {?} callback
     * @param {?} thisObj
     * @return {?}
     */
    function reject(spy, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      /** @type {Array} */
      var eventPath = [];
      if (null == spy) {
        return eventPath;
      }
      var cur;
      /** @type {number} */
      var i = -1;
      var l = spy.length;
      for (;++i < l;) {
        cur = spy[i];
        if (callback(cur, i, spy)) {
          eventPath.push(cur);
        }
      }
      return eventPath;
    }
    var makeIterator = require("./node_modules/mout/function/makeIterator_.js");
    /** @type {function (Object, ?, ?): ?} */
    module.exports = reject;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/map.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {?} callback
     * @param {?} thisObj
     * @return {?}
     */
    function map(spy, callback, thisObj) {
      callback = makeIterator(callback, thisObj);
      /** @type {Array} */
      var output = [];
      if (null == spy) {
        return output;
      }
      /** @type {number} */
      var i = -1;
      var l = spy.length;
      for (;++i < l;) {
        output[i] = callback(spy[i], i, spy);
      }
      return output;
    }
    var makeIterator = require("./node_modules/mout/function/makeIterator_.js");
    /** @type {function (Object, ?, ?): ?} */
    module.exports = map;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/indexOf.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} val
     * @param {number} index
     * @return {?}
     */
    function indexOf(spy, val, index) {
      if (index = index || 0, null == spy) {
        return-1;
      }
      var l = spy.length;
      var i = 0 > index ? l + index : index;
      for (;l > i;) {
        if (spy[i] === val) {
          return i;
        }
        i++;
      }
      return-1;
    }
    /** @type {function (Object, ?, number): ?} */
    module.exports = indexOf;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/intersection.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      var args = toArray(arguments, 1);
      var expectation = expect(check(spy), function(thisObj) {
        return g(args, function(callback) {
          return makeIterator(callback, thisObj);
        });
      });
      return expectation;
    }
    var check = require("./node_modules/mout/array/unique.js");
    var expect = require("./node_modules/mout/array/filter.js");
    var g = require("./node_modules/mout/array/every.js");
    var makeIterator = require("./node_modules/mout/array/contains.js");
    var toArray = require("./node_modules/mout/array/slice.js");
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/contains.js" : function($sanitize, module) {
    /**
     * @param {Object} spy
     * @param {?} attr
     * @return {?}
     */
    function create(spy, attr) {
      return-1 !== createEl(spy, attr);
    }
    var createEl = $sanitize("./node_modules/mout/array/indexOf.js");
    /** @type {function (Object, ?): ?} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/reduce.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} callback
     * @param {?} event
     * @return {?}
     */
    function filter(spy, callback, event) {
      /** @type {boolean} */
      var r = arguments.length > 2;
      var basis = event;
      if (null == spy || !spy.length) {
        if (r) {
          return event;
        }
        throw new Error("reduce of empty array with no initial value");
      }
      /** @type {number} */
      var index = -1;
      var length = spy.length;
      for (;++index < length;) {
        if (r) {
          basis = callback(basis, spy[index], index, spy);
        } else {
          basis = spy[index];
          /** @type {boolean} */
          r = true;
        }
      }
      return basis;
    }
    /** @type {function (Object, ?, ?): ?} */
    module.exports = filter;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/slice.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {number} num
     * @param {Function} len
     * @return {?}
     */
    function wrap(spy, num, len) {
      var start = spy.length;
      /** @type {number} */
      num = null == num ? 0 : 0 > num ? Math.max(start + num, 0) : Math.min(num, start);
      len = null == len ? start : 0 > len ? Math.max(start + len, 0) : Math.min(len, start);
      /** @type {Array} */
      var str = [];
      for (;len > num;) {
        str.push(spy[num++]);
      }
      return str;
    }
    /** @type {function (Object, number, Function): ?} */
    module.exports = wrap;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} context
   * @return {undefined}
   */
  "./node_modules/spotify-liburi/src/uri.js" : function($sanitize, context) {
    /**
     * @param {Object} spy
     * @param {Object} prop
     * @return {undefined}
     */
    function self(spy, prop) {
      /** @type {Object} */
      this.type = spy;
      var n;
      for (n in prop) {
        if ("function" != typeof prop[n]) {
          this[n] = prop[n];
        }
      }
    }
    var jQuery = $sanitize("./node_modules/spotify-liburi/node_modules/spotify-crypto/src/base62.js");
    /** @type {string} */
    var existing = "spotify:";
    /** @type {string} */
    var base = "http://play.spotify.com/";
    /** @type {string} */
    var delimiter = "https://play.spotify.com/";
    /** @type {string} */
    var path = "http://open.spotify.com/";
    /** @type {string} */
    var win = "https://open.spotify.com/";
    /** @type {TypeError} */
    var er = new TypeError("Invalid Spotify URI!");
    var options = (new TypeError("Not implemented!"), {
      URI : 0,
      URL : 1
    });
    /**
     * @param {string} href
     * @return {?}
     */
    var parseURL = function(href) {
      var components;
      /** @type {number} */
      var format = options.URL;
      if (0 == href.indexOf(existing)) {
        components = href.slice(existing.length).split(":");
        /** @type {number} */
        format = options.URI;
      } else {
        if (0 == href.indexOf(base)) {
          components = href.slice(base.length).split("/");
        } else {
          if (0 == href.indexOf(delimiter)) {
            components = href.slice(delimiter.length).split("/");
          } else {
            if (0 == href.indexOf(path)) {
              components = href.slice(path.length).split("/");
            } else {
              if (0 != href.indexOf(win)) {
                throw er;
              }
              components = href.slice(win.length).split("/");
            }
          }
        }
      }
      return{
        format : format,
        components : components
      };
    };
    /**
     * @param {?} value
     * @param {number} parent
     * @return {?}
     */
    var $ = function(value, parent) {
      return value = encodeURIComponent(value), parent == options.URI ? value.replace(/%20/g, "+") : value;
    };
    /**
     * @param {string} value
     * @param {number} string
     * @return {?}
     */
    var callback = function(value, string) {
      var link = string == options.URI ? value.replace(/\+/g, "%20") : value;
      return decodeURIComponent(link);
    };
    /**
     * @param {Object} data
     * @param {number} item
     * @return {?}
     */
    var update = function(data, item) {
      var few;
      if (data.id) {
        few = jQuery.fromHex(data.id, 22);
      }
      var content;
      var i;
      var len;
      console.info(data)
      switch(data.type) {
        case self.Type.ALBUM:
          return content = [self.Type.ALBUM, few], data.disc && content.push(data.disc), content;
        case self.Type.AD:
          return[self.Type.AD, data.id];
        case self.Type.ARTIST:
          return[self.Type.ARTIST, few];
        case self.Type.ARTIST_TOPLIST:
          return[self.Type.ARTIST, few, self.Type.TOP, data.toplist];
        case self.Type.SEARCH:
          return[self.Type.SEARCH, $(data.query, item)];
        case self.Type.TRACK:
          return[self.Type.TRACK, few];
        case self.Type.TRACKSET:
          /** @type {Array} */
          var rest = [];
          /** @type {number} */
          i = 0;
          len = data.tracks.length;
          for (;len > i;i++) {
            rest.push(jQuery.fromHex(data.tracks[i].id, 22));
          }
          return rest = [rest.join(",")], null !== data.index && rest.push("#", data.index), [self.Type.TRACKSET, $(data.name)].concat(rest);
        case self.Type.FACEBOOK:
          return[self.Type.USER, self.Type.FACEBOOK, data.uid];
        case self.Type.AUDIO_FILE:
          return[self.Type.AUDIO_FILE, data.extension, data.id];
        case self.Type.FOLDER:
          return[self.Type.USER, $(data.username, item), self.Type.FOLDER, data.id];
        case self.Type.FOLLOWERS:
          return[self.Type.USER, $(data.username, item), self.Type.FOLLOWERS];
        case self.Type.FOLLOWING:
          return[self.Type.USER, $(data.username, item), self.Type.FOLLOWING];
        case self.Type.PLAYLIST:
          return[self.Type.USER, $(data.username, item), self.Type.PLAYLIST, few];
        case self.Type.STARRED:
          return[self.Type.USER, $(data.username, item), self.Type.STARRED];
        case self.Type.TEMP_PLAYLIST:
          return[self.Type.TEMP_PLAYLIST, data.origin, data.data];
        case self.Type.CONTEXT_GROUP:
          return[self.Type.CONTEXT_GROUP, data.origin, data.name];
        case self.Type.USER_TOPLIST:
          return[self.Type.USER, $(data.username, item), self.Type.TOP, data.toplist];
        case self.Type.USET_TOP_TRACKS:
          return[self.Type.USER, $(data.username, item), self.Type.TOPLIST];
        case self.Type.TOPLIST:
          return[self.Type.TOP, data.toplist].concat(data.global ? [self.Type.GLOBAL] : ["country", data.country]);
        case self.Type.INBOX:
          return[self.Type.USER, $(data.username, item), self.Type.INBOX];
        case self.Type.ROOTLIST:
          return[self.Type.USER, $(data.username, item), self.Type.ROOTLIST];
        case self.Type.PUBLISHED_ROOTLIST:
          return[self.Type.USER, $(data.username, item), self.Type.PUBLISHED_ROOTLIST];
        case self.Type.COLLECTION_TRACK_LIST:
          return[self.Type.USER, $(data.username, item), self.Type.COLLECTION_TRACK_LIST, few];
        case self.Type.PROFILE:
          return data.args && data.args.length > 0 ? [self.Type.USER, $(data.username, item)].concat(data.args) : [self.Type.USER, $(data.username, item)];
        case self.Type.LOCAL_ARTIST:
          return[self.Type.LOCAL, $(data.artist, item)];
        case self.Type.LOCAL_ALBUM:
          return[self.Type.LOCAL, $(data.artist, item), $(data.album, item)];
        case self.Type.LOCAL:
          return[self.Type.LOCAL, $(data.artist, item), $(data.album, item), $(data.track, item), data.duration];
        case self.Type.LIBRARY:
          return[self.Type.USER, $(data.username, item), self.Type.LIBRARY].concat(data.category ? [data.category] : []);
        case self.Type.IMAGE:
          return[self.Type.IMAGE, data.id];
        case self.Type.MOSAIC:
          return content = data.ids.slice(0), content.unshift(self.Type.MOSAIC), content;
        case self.Type.RADIO:
          return[self.Type.RADIO, data.args];
        case self.Type.APPLICATION:
          /** @type {Array} */
          content = [self.Type.APP, data.id];
          var rawParams = data.args || [];
          /** @type {number} */
          i = 0;
          len = rawParams.length;
          for (;len > i;++i) {
            content.push($(rawParams[i], item));
          }
          return content;
        case self.Type.COLLECTION_ALBUM:
          return[self.Type.USER, $(data.username, item), self.Type.COLLECTION, self.Type.ALBUM, few];
        case self.Type.COLLECTION_MISSING_ALBUM:
          return[self.Type.USER, $(data.username, item), self.Type.COLLECTION, self.Type.ALBUM, few, "missing"];
        case self.Type.COLLECTION_ARTIST:
          return[self.Type.USER, $(data.username, item), self.Type.COLLECTION, self.Type.ARTIST, few];
        case self.Type.COLLECTION:
          return[self.Type.USER, $(data.username, item), self.Type.COLLECTION].concat(data.category ? [data.category] : []);
        default:
          throw er;;
      }
    };
    /**
     * @param {Object} parts
     * @param {number} value
     * @return {?}
     */
    var parse = function(parts, value) {
      var val;
      var index;
      var l;
      /** @type {number} */
      var i = 0;
      /**
       * @return {?}
       */
      var decodeURIComponent = function() {
        return parts[i++];
      };
      /**
       * @return {?}
       */
      var decode = function() {
        var val = decodeURIComponent();
        return 22 == val.length ? jQuery.toHex(val, 32) : val;
      };
      /**
       * @return {?}
       */
      var consume = function() {
        return parts.slice(i);
      };
      /**
       * @return {?}
       */
      var $ = function() {
        /** @type {string} */
        var comma = value == options.URI ? ":" : "/";
        return parts.slice(i).join(comma);
      };
      var la = decodeURIComponent();
          console.info('la', la)
      switch(la) {
        case self.Type.ALBUM:
          return self.albumURI(decode(), parseInt(decodeURIComponent(), 10));
        case self.Type.AD:
          return self.adURI(decode());
        case self.Type.ARTIST:
          return val = decode(), decodeURIComponent() == self.Type.TOP ? self.artistToplistURI(val, decodeURIComponent()) : self.artistURI(val);
        case self.Type.AUDIO_FILE:
          return self.audioFileURI(decodeURIComponent(), decodeURIComponent());
        case self.Type.TEMP_PLAYLIST:
          return self.temporaryPlaylistURI(decodeURIComponent(), $());
        case self.Type.SEARCH:
          return self.searchURI(callback($(), value));
        case self.Type.TRACK:
          return self.trackURI(decode());
        case self.Type.TRACKSET:
          var current = callback(decodeURIComponent());
          var content = decodeURIComponent();
          var v = decodeURIComponent();
          /** @type {number} */
          var depth = parseInt(decodeURIComponent(), 10);
          if ("%23" !== v || isNaN(depth)) {
            /** @type {null} */
            depth = null;
          }
          /** @type {Array} */
          var matched = [];
          if (content) {
            content = callback(content).split(",");
            /** @type {number} */
            index = 0;
            l = content.length;
            for (;l > index;index++) {
              var item = content[index];
              matched.push(self.trackURI(jQuery.toHex(item, 32)));
            }
          }
          return self.tracksetURI(matched, current, depth);
        case self.Type.CONTEXT_GROUP:
          return self.contextGroupURI(decodeURIComponent(), decodeURIComponent());
        case self.Type.TOP:
          var viewpath = decodeURIComponent();
          return decodeURIComponent() == self.Type.GLOBAL ? self.toplistURI(viewpath, null, true) : self.toplistURI(viewpath, decodeURIComponent(), false);
        case self.Type.USER:
          var opt_e = callback(decodeURIComponent(), value);
          var key = decodeURIComponent();
          if (opt_e == self.Type.FACEBOOK && null != key) {
            return self.facebookURI(parseInt(key, 10));
          }
          if (null != key) {
            var b = (function() {
            switch(key) {
              case self.Type.PLAYLIST:
                return self.playlistURI(opt_e, decode());
              case self.Type.FOLDER:
                return self.folderURI(opt_e, decode());
              case self.Type.COLLECTION_TRACK_LIST:
                return self.collectionTrackList(opt_e, decode());
              case self.Type.COLLECTION:
                var k = decodeURIComponent();
                switch(k) {
                  case self.Type.ALBUM:
                    return val = decode(), "missing" === decodeURIComponent() ? self.collectionMissingAlbumURI(opt_e, val) : self.collectionAlbumURI(opt_e, val);
                  case self.Type.ARTIST:
                    return self.collectionArtistURI(opt_e, decode());
                  default:
                    return self.collectionURI(opt_e, k);
                }
              ;
              case self.Type.STARRED:
                return self.starredURI(opt_e);
              case self.Type.FOLLOWERS:
                return self.followersURI(opt_e);
              case self.Type.FOLLOWING:
                return self.followingURI(opt_e);
              case self.Type.TOP:
                return self.userToplistURI(opt_e, decodeURIComponent());
              case self.Type.INBOX:
                return self.inboxURI(opt_e);
              case self.Type.ROOTLIST:
                return self.rootlistURI(opt_e);
              case self.Type.PUBLISHED_ROOTLIST:
                return self.publishedRootlistURI(opt_e);
              case self.Type.TOPLIST:
                return self.userTopTracksURI(opt_e);
              case self.Type.LIBRARY:
                return self.libraryURI(opt_e, decodeURIComponent());
            }
            })()
            console.log(b)
            return b;
          }
          var target = consume();
          return null != key && target.length > 0 ? self.profileURI(opt_e, [key].concat(target)) : null != key ? self.profileURI(opt_e, [key]) : self.profileURI(opt_e);
        case self.Type.LOCAL:
          var result = decodeURIComponent();
          var onComplete = result && callback(result, value);
          var data = decodeURIComponent();
          var funcToCall = data && callback(data, value);
          var json = decodeURIComponent();
          var millis = json && callback(json, value);
          var cDigit = decodeURIComponent();
          /** @type {number} */
          var b = parseInt(cDigit, 10);
          return void 0 !== json ? self.localURI(onComplete, funcToCall, millis, b) : void 0 !== data ? self.localAlbumURI(onComplete, funcToCall) : self.localArtistURI(onComplete);
        case self.Type.IMAGE:
          return self.imageURI(decode());
        case self.Type.MOSAIC:
          return self.mosaicURI(parts.slice(i));
        case self.Type.RADIO:
          return self.radioURI($());
        default:
          val = la === self.Type.APP ? decodeURIComponent() : la;
          var results = consume();
          /** @type {number} */
          index = 0;
          l = results.length;
          for (;l > index;++index) {
            results[index] = callback(results[index], value);
          }
          return self.applicationURI(val, results);
      }
      throw er;
    };
    /**
     * @return {?}
     */
    self.prototype.toAppType = function() {
      if (this.type == self.Type.APPLICATION) {
        return self.applicationURI(this.id, this.args);
      }
      var a = update(this, options.URL);
      var strong = a.shift();
      var i = a.length;
      if (i) {
        for (;i--;) {
          a[i] = callback(a[i], options.URL);
        }
      }
      if (this.type == self.Type.RADIO) {
        a = a.shift().split(":");
      }
      var b = self.applicationURI(strong, a);
      return b;
    };
    /**
     * @return {?}
     */
    self.prototype.toRealType = function() {
      return this.type == self.Type.APPLICATION ? parse([this.id].concat(this.args), options.URI) : new self(null, this);
    };
    /**
     * @return {?}
     */
    self.prototype.toURI = function() {
      return existing + update(this, options.URI).join(":");
    };
    /**
     * @return {?}
     */
    self.prototype.toString = function() {
      return this.toURI();
    };
    /**
     * @param {boolean} prefix
     * @return {?}
     */
    self.prototype.toURLPath = function(prefix) {
      var a = update(this, options.URL);
      if (a[0] === self.Type.APP && a.shift(), a[0] != self.Type.TRACKSET) {
        /** @type {Array} */
        var t = [];
        /** @type {number} */
        var idx = 0;
        var al = a.length;
        for (;al > idx;idx++) {
          var next = a[idx];
          if (next) {
            t.push(next);
          }
        }
        /** @type {Array} */
        a = t;
      }
      var id = a.join("/");
      return prefix ? "/" + id : id;
    };
    /**
     * @return {?}
     */
    self.prototype.toPlayURL = function() {
      return base + this.toURLPath();
    };
    /**
     * @return {?}
     */
    self.prototype.toURL = function() {
      return this.toPlayURL();
    };
    /**
     * @return {?}
     */
    self.prototype.toOpenURL = function() {
      return path + this.toURLPath();
    };
    /**
     * @return {?}
     */
    self.prototype.toSecurePlayURL = function() {
      return delimiter + this.toURLPath();
    };
    /**
     * @return {?}
     */
    self.prototype.toSecureURL = function() {
      return this.toSecurePlayURL();
    };
    /**
     * @return {?}
     */
    self.prototype.toSecureOpenURL = function() {
      return win + this.toURLPath();
    };
    /**
     * @return {?}
     */
    self.prototype.idToByteString = function() {
      var value = jQuery.fromHex(this.id);
      var ret = jQuery.toBytes(value);
      ret = ret.map(function(lo) {
        return String.fromCharCode(lo);
      }).join("");
      for (;ret.length < 16;) {
        /** @type {string} */
        ret = String.fromCharCode(0) + ret;
      }
      return ret;
    };
    self.Type = {
      EMPTY : "empty",
      ALBUM : "album",
      AD : "ad",
      APP : "app",
      APPLICATION : "application",
      ARTIST : "artist",
      ARTIST_TOPLIST : "artist-toplist",
      AUDIO_FILE : "audiofile",
      COLLECTION : "collection",
      COLLECTION_ALBUM : "collection-album",
      COLLECTION_MISSING_ALBUM : "collection-missing-album",
      COLLECTION_ARTIST : "collection-artist",
      CONTEXT_GROUP : "context-group",
      FACEBOOK : "facebook",
      FOLDER : "folder",
      FOLLOWERS : "followers",
      FOLLOWING : "following",
      GLOBAL : "global",
      IMAGE : "image",
      INBOX : "inbox",
      LOCAL_ARTIST : "local-artist",
      LOCAL_ALBUM : "local-album",
      LOCAL : "local",
      LIBRARY : "library",
      MOSAIC : "mosaic",
      PLAYLIST : "playlist",
      PROFILE : "profile",
      PUBLISHED_ROOTLIST : "published-rootlist",
      RADIO : "radio",
      ROOTLIST : "rootlist",
      COLLECTION_TRACK_LIST : "collectiontracklist",
      SEARCH : "search",
      STARRED : "starred",
      TEMP_PLAYLIST : "temp-playlist",
      TOP : "top",
      TOPLIST : "toplist",
      TRACK : "track",
      TRACKSET : "trackset",
      USER : "user",
      USER_TOPLIST : "user-toplist",
      USET_TOP_TRACKS : "user-top-tracks"
    };
    /**
     * @param {?} url
     * @return {?}
     */
    self.fromString = function(url) {
      var o = parseURL(url);
      return parse(o.components, o.format);
    };
    /**
     * @param {Object} data
     * @return {?}
     */
    self.from = function(data) {
      try {
        return data instanceof self ? data : "object" == typeof data && data.type ? new self(null, data) : self.fromString(data.toString());
      } catch (t) {
        return null;
      }
    };
    /**
     * @param {string} arg
     * @param {string} a
     * @param {Object} opt_options
     * @return {?}
     */
    self.fromByteString = function(arg, a, opt_options) {
      /** @type {Array} */
      var data = [];
      /** @type {number} */
      var i = 0;
      for (;i < a.length;i++) {
        data.push(a.charCodeAt(i));
      }
      var value = jQuery.fromBytes(data, 22);
      value = jQuery.toHex(value);
      var options = opt_options || {};
      return options.id = value, new self(arg, options);
    };
    /**
     * @param {Function} dataAndEvents
     * @return {?}
     */
    self.clone = function(dataAndEvents) {
      return dataAndEvents instanceof self ? new self(null, dataAndEvents) : null;
    };
    /**
     * @param {?} deepDataAndEvents
     * @return {?}
     */
    self.getCanonical = function(deepDataAndEvents) {
      return this.getCanonical(deepDataAndEvents);
    };
    /**
     * @param {?} haystack
     * @return {?}
     */
    self.getCanonicalUsername = function(haystack) {
      return $(haystack, options.URI);
    };
    /**
     * @param {string} objId
     * @return {?}
     */
    self.getDisplayUsername = function(objId) {
      return callback(objId, options.URI);
    };
    /**
     * @param {string} val
     * @return {?}
     */
    self.idToHex = function(val) {
      return 22 == val.length ? jQuery.toHex(val, 32) : val;
    };
    /**
     * @param {string} which
     * @return {?}
     */
    self.hexToId = function(which) {
      return 32 == which.length ? jQuery.fromHex(which, 22) : which;
    };
    /**
     * @return {?}
     */
    self.emptyURI = function() {
      return new self(self.Type.EMPTY, {});
    };
    /**
     * @param {(Object|string)} value
     * @param {number} dataAndEvents
     * @return {?}
     */
    self.albumURI = function(value, dataAndEvents) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.ALBUM, {
        id : value,
        disc : dataAndEvents
      });
    };
    /**
     * @param {string} term
     * @return {?}
     */
    self.adURI = function(term) {
      return new self(self.Type.AD, {
        id : term
      });
    };
    /**
     * @param {string} extension
     * @param {string} term
     * @return {?}
     */
    self.audioFileURI = function(extension, term) {
      return new self(self.Type.AUDIO_FILE, {
        id : term,
        extension : extension
      });
    };
    /**
     * @param {(Object|string)} value
     * @return {?}
     */
    self.artistURI = function(value) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.ARTIST, {
        id : value
      });
    };
    /**
     * @param {(Object|string)} value
     * @param {?} dataAndEvents
     * @return {?}
     */
    self.artistToplistURI = function(value, dataAndEvents) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.ARTIST_TOPLIST, {
        id : value,
        toplist : dataAndEvents
      });
    };
    /**
     * @param {string} q
     * @return {?}
     */
    self.searchURI = function(q) {
      return new self(self.Type.SEARCH, {
        query : q
      });
    };
    /**
     * @param {(Object|string)} value
     * @return {?}
     */
    self.trackURI = function(value) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.TRACK, {
        id : value
      });
    };
    /**
     * @param {Function} results
     * @param {string} name
     * @param {?} x
     * @return {?}
     */
    self.tracksetURI = function(results, name, x) {
      return new self(self.Type.TRACKSET, {
        /** @type {Function} */
        tracks : results,
        name : name || "",
        index : isNaN(x) ? null : x
      });
    };
    /**
     * @param {number} uid
     * @return {?}
     */
    self.facebookURI = function(uid) {
      return new self(self.Type.FACEBOOK, {
        uid : uid
      });
    };
    /**
     * @param {string} var_args
     * @return {?}
     */
    self.followersURI = function(var_args) {
      return new self(self.Type.FOLLOWERS, {
        username : var_args
      });
    };
    /**
     * @param {string} var_args
     * @return {?}
     */
    self.followingURI = function(var_args) {
      return new self(self.Type.FOLLOWING, {
        username : var_args
      });
    };
    /**
     * @param {string} var_args
     * @param {(Object|string)} value
     * @return {?}
     */
    self.playlistURI = function(var_args, value) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.PLAYLIST, {
        username : var_args,
        id : value
      });
    };
    /**
     * @param {string} var_args
     * @param {(Object|string)} value
     * @return {?}
     */
    self.folderURI = function(var_args, value) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.FOLDER, {
        username : var_args,
        id : value
      });
    };
    /**
     * @param {string} var_args
     * @param {(Object|string)} value
     * @return {?}
     */
    self.collectionTrackList = function(var_args, value) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.COLLECTION_TRACK_LIST, {
        username : var_args,
        id : value
      });
    };
    /**
     * @param {string} var_args
     * @return {?}
     */
    self.starredURI = function(var_args) {
      return new self(self.Type.STARRED, {
        username : var_args
      });
    };
    /**
     * @param {string} var_args
     * @param {?} dataAndEvents
     * @return {?}
     */
    self.userToplistURI = function(var_args, dataAndEvents) {
      return new self(self.Type.USER_TOPLIST, {
        username : var_args,
        toplist : dataAndEvents
      });
    };
    /**
     * @param {string} var_args
     * @return {?}
     */
    self.userTopTracksURI = function(var_args) {
      return new self(self.Type.USET_TOP_TRACKS, {
        username : var_args
      });
    };
    /**
     * @param {?} path
     * @param {string} recurring
     * @param {boolean} v33
     * @return {?}
     */
    self.toplistURI = function(path, recurring, v33) {
      return new self(self.Type.TOPLIST, {
        toplist : path,
        country : recurring,
        global : !!v33
      });
    };
    /**
     * @param {string} var_args
     * @return {?}
     */
    self.inboxURI = function(var_args) {
      return new self(self.Type.INBOX, {
        username : var_args
      });
    };
    /**
     * @param {string} var_args
     * @return {?}
     */
    self.rootlistURI = function(var_args) {
      return new self(self.Type.ROOTLIST, {
        username : var_args
      });
    };
    /**
     * @param {string} var_args
     * @return {?}
     */
    self.publishedRootlistURI = function(var_args) {
      return new self(self.Type.PUBLISHED_ROOTLIST, {
        username : var_args
      });
    };
    /**
     * @param {string} onComplete
     * @return {?}
     */
    self.localArtistURI = function(onComplete) {
      return new self(self.Type.LOCAL_ARTIST, {
        artist : onComplete
      });
    };
    /**
     * @param {string} onComplete
     * @param {?} funcToCall
     * @return {?}
     */
    self.localAlbumURI = function(onComplete, funcToCall) {
      return new self(self.Type.LOCAL_ALBUM, {
        artist : onComplete,
        album : funcToCall
      });
    };
    /**
     * @param {string} onComplete
     * @param {string} funcToCall
     * @param {?} millis
     * @param {number} v12
     * @return {?}
     */
    self.localURI = function(onComplete, funcToCall, millis, v12) {
      return new self(self.Type.LOCAL, {
        artist : onComplete,
        album : funcToCall,
        track : millis,
        duration : v12
      });
    };
    /**
     * @param {string} var_args
     * @param {Array} category
     * @return {?}
     */
    self.libraryURI = function(var_args, category) {
      return new self(self.Type.LIBRARY, {
        username : var_args,
        category : category
      });
    };
    /**
     * @param {string} var_args
     * @param {Array} key
     * @return {?}
     */
    self.collectionURI = function(var_args, key) {
      return new self(self.Type.COLLECTION, {
        username : var_args,
        category : key
      });
    };
    /**
     * @param {string} origin
     * @param {Object} task
     * @return {?}
     */
    self.temporaryPlaylistURI = function(origin, task) {
      return new self(self.Type.TEMP_PLAYLIST, {
        origin : origin,
        data : task
      });
    };
    /**
     * @param {string} origin
     * @param {string} errorName
     * @return {?}
     */
    self.contextGroupURI = function(origin, errorName) {
      return new self(self.Type.CONTEXT_GROUP, {
        origin : origin,
        name : errorName
      });
    };
    /**
     * @param {?} var_args
     * @param {Array} newArgs
     * @return {?}
     */
    self.profileURI = function(var_args, newArgs) {
      return new self(self.Type.PROFILE, {
        username : var_args,
        args : newArgs
      });
    };
    /**
     * @param {(Object|string)} value
     * @return {?}
     */
    self.imageURI = function(value) {
      return 22 == value.length && (value = jQuery.toHex(value, 32)), new self(self.Type.IMAGE, {
        id : value
      });
    };
    /**
     * @param {Array} ids
     * @return {?}
     */
    self.mosaicURI = function(ids) {
      return new self(self.Type.MOSAIC, {
        ids : ids
      });
    };
    /**
     * @param {(Object|string)} args
     * @return {?}
     */
    self.radioURI = function(args) {
      return args = "undefined" == typeof args ? "" : args, new self(self.Type.RADIO, {
        args : args
      });
    };
    /**
     * @param {string} el
     * @param {Object} args
     * @return {?}
     */
    self.applicationURI = function(el, args) {
      return args = "undefined" == typeof args ? [] : args, new self(self.Type.APPLICATION, {
        id : el,
        args : args
      });
    };
    /**
     * @param {string} var_args
     * @param {string} objects
     * @return {?}
     */
    self.collectionAlbumURI = function(var_args, objects) {
      return new self(self.Type.COLLECTION_ALBUM, {
        username : var_args,
        id : objects
      });
    };
    /**
     * @param {string} var_args
     * @param {string} objects
     * @return {?}
     */
    self.collectionMissingAlbumURI = function(var_args, objects) {
      return new self(self.Type.COLLECTION_MISSING_ALBUM, {
        username : var_args,
        id : objects
      });
    };
    /**
     * @param {string} var_args
     * @param {string} term
     * @return {?}
     */
    self.collectionArtistURI = function(var_args, term) {
      return new self(self.Type.COLLECTION_ARTIST, {
        username : var_args,
        id : term
      });
    };
    /** @type {function (Object, Object): undefined} */
    context.exports = self;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {?} self
   * @param {Object} browser
   * @return {undefined}
   */
  "./node_modules/spotify-events/selection/controller.js" : function(require, dataAndEvents, self, browser) {
    /**
     * @param {Event} e
     * @return {?}
     */
    function fail(e) {
      return e.target === document.documentElement;
    }
    /**
     * @param {Event} event
     * @return {?}
     */
    function callback(event) {
      var output = log(event.target);
      var units = output.matches(a) ? output : output.parent(a);
      return units && units[0];
    }
    /**
     * @param {Event} e
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    function done(e, deepDataAndEvents) {
      if (!fail(e)) {
        /** @type {boolean} */
        M = false;
        var error = callback(e);
        if (error) {
          onKeyDown(e, error, deepDataAndEvents);
        } else {
          remove(e);
        }
      }
    }
    /**
     * @param {MouseEvent} event
     * @param {Node} attribute
     * @param {boolean} deepDataAndEvents
     * @return {undefined}
     */
    function onKeyDown(event, attribute, deepDataAndEvents) {
      var events = trigger(event);
      /** @type {boolean} */
      var children = 1 === events;
      var index = node.getFromNode(attribute);
      if (index) {
        var self = path.isSelected(index);
        var target = has() ? event.metaKey : event.ctrlKey;
        var deep = event.shiftKey || target;
        /** @type {boolean} */
        var copy = !event.shiftKey;
        if ($() || (target = deep = false, copy = true), deep && (copy && (self && children))) {
          if (!deepDataAndEvents) {
            return;
          }
          setClass(index);
        } else {
          if (copy) {
            if (children && (self && !deepDataAndEvents)) {
              return;
            }
            if (deep && !deepDataAndEvents) {
              return;
            }
            handler(index, event, deepDataAndEvents);
          } else {
            if (deepDataAndEvents) {
              return;
            }
            toggle(index);
          }
        }
        m.update();
      }
    }
    /**
     * @param {Event} e
     * @return {undefined}
     */
    function remove(e) {
      var output = log(e.target);
      var data = output.matches("[data-sort]") || output.parent("[data-sort]");
      var len = path.selections.length;
      if (!data) {
        if (len) {
          path.clear();
          m.update();
        }
      }
      if (!len || len && !data) {
        if ($()) {
          /** @type {boolean} */
          u = true;
        }
      }
    }
    /**
     * @param {Event} node
     * @return {undefined}
     */
    function add(node) {
      if (M) {
        var current = callback(node);
        if (current) {
          click(node, current);
        } else {
          func(node);
        }
        /** @type {boolean} */
        M = false;
      }
    }
    /**
     * @param {Event} dataAndEvents
     * @param {Node} img
     * @return {undefined}
     */
    function click(dataAndEvents, img) {
      var start = node.getFromNode(img);
      if (start) {
        path.clear();
        path.add(start);
        path.setFocus(start);
        path.setOrigin(start);
        m.update();
      }
    }
    /**
     * @return {undefined}
     */
    function func() {
      path.clear();
      m.update();
    }
    /**
     * @param {Event} e
     * @return {undefined}
     */
    function exec(e) {
      if (!fail(e)) {
        done(e, true);
        /** @type {boolean} */
        u = false;
      }
    }
    /**
     * @param {Event} key
     * @return {?}
     */
    function listener(key) {
      if (u) {
        var child = callback(key);
        if (!child) {
          return path.clear(), void m.update();
        }
        var index = node.getFromNode(child);
        if (index) {
          var start = path.getOrigin();
          if (!start) {
            path.setOrigin(index);
            start = index;
          }
          path.setFocus(index);
          var end = index;
          if (path.add(start, end), end !== start) {
            /** @type {boolean} */
            var isBackward = 1 === node.getDirection(start, end);
            var pre = isBackward ? start : end;
            var p = isBackward ? end : start;
            var c = node.getClosest(pre, "up");
            if (c && c !== p) {
              var cache = new Node(0, 0);
              path.remove(cache, c);
            }
            var suiteView = node.getClosest(p, "down");
            if (suiteView && suiteView !== pre) {
              /** @type {number} */
              var name = api.elements.length - 1;
              var i = api.getContainerLength(name);
              if (i > 0) {
                var t = new Node(name, i);
                path.remove(suiteView, t);
              }
            }
          }
          m.update();
        }
      }
    }
    /**
     * @return {undefined}
     */
    function compassResult() {
      /** @type {boolean} */
      u = false;
    }
    /**
     * @param {?} self
     * @return {undefined}
     */
    function setClass(self) {
      var next = path.getOrigin();
      var value = path.getFocus();
      var step = node.getDirection(next, value);
      if (!step) {
        /** @type {number} */
        step = 1;
      }
      var params;
      var data;
      var timeout = self.isSame(next);
      var isFunction = self.isSame(value);
      if (timeout || isFunction) {
        params = dataAttr(self, "up");
        data = dataAttr(self, "down");
      }
      if (timeout) {
        path.setOrigin(1 === step ? data || params : params || data);
      }
      if (self.isSame(value)) {
        path.setFocus(1 === step ? params || data : data || params);
      }
      path.remove(self);
    }
    /**
     * @param {string} type
     * @return {undefined}
     */
    function toggle(type) {
      var base = path.getOrigin();
      var name = path.getFocus();
      if (base) {
        if (name) {
          if (!base.isSame(name)) {
            path.remove(base, name);
          }
        }
      }
      if (!base) {
        base = new Node(0, 0);
        path.setOrigin(base);
      }
      path.add(base, type);
      path.setFocus(type);
    }
    /**
     * @param {?} start
     * @param {MouseEvent} event
     * @return {undefined}
     */
    function handler(start, event) {
      var m = path.getOrigin();
      var events = trigger(event);
      /** @type {boolean} */
      var a = 1 === events;
      /** @type {boolean} */
      var o = 2 === events;
      var s = path.isSelected(start);
      var element = has() ? event.metaKey : event.ctrlKey;
      var delegateElement = event.shiftKey || element;
      if (!$()) {
        /** @type {boolean} */
        element = delegateElement = false;
      }
      /** @type {boolean} */
      var program = !delegateElement && (!u && a);
      /** @type {boolean} */
      var inverse = !s && o;
      if (program || inverse) {
        path.clear();
      }
      path.add(start);
      path.setFocus(start);
      var guest;
      if (m && !m.isSame(start)) {
        var data = node.getClosest(start, "down");
        if (guest = data && path.isSelected(data), !guest) {
          var r = node.getClosest(start, "up");
          guest = r && path.isSelected(r);
        }
      }
      if (!guest) {
        path.setOrigin(start);
      }
    }
    /**
     * @param {Object} e
     * @return {undefined}
     */
    function run(e) {
      /** @type {boolean} */
      M = true;
      /** @type {boolean} */
      var events = 38 === e.keyCode;
      /** @type {boolean} */
      var callback = 40 === e.keyCode;
      /** @type {boolean} */
      var context = 27 === e.keyCode;
      if (events || (callback || context)) {
        var a = path.getOrigin();
        var b = path.getFocus();
        var start = b && node.getClosest(b, callback ? "down" : "up");
        if (!events && !callback || (e.metaKey || (e.ctrlKey || !start))) {
          if (context) {
            path.clear();
          }
        } else {
          if (e.shiftKey && ($() && (a && b))) {
            /** @type {number} */
            var oldIndex = callback ? 1 : -1;
            var index = node.getDirection(a, b);
            /** @type {boolean} */
            var active = 0 === index;
            if (active || oldIndex === index) {
              path.add(start);
              position(start);
            } else {
              path.remove(b);
            }
          } else {
            path.clear();
            path.add(start);
            path.setOrigin(start);
            position(start);
            e.preventDefault();
          }
          path.setFocus(start);
        }
        m.update();
      }
    }
    /**
     * @param {?} event
     * @return {undefined}
     */
    function prev(event) {
      var attributes = event.pageNode && event.pageNode[0];
      m.update(attributes);
    }
    /**
     * @param {(Object|boolean|number|string)} event
     * @return {undefined}
     */
    function fn(event) {
      if (event.arguments) {
        path.clear();
        m.update();
        api.reset();
      }
    }
    /**
     * @param {string} element
     * @param {(Function|string)} id
     * @return {?}
     */
    function init(element, id) {
      var options = log("[data-uri=" + element + "]");
      var name = options && extend(api.elements, options[0]);
      var validOptions = options && options.matches("[data-context]");
      if (validOptions) {
        var object = node.getPositionFromGlobalIndex(id);
        name = object.containerIndex;
        id = object.index;
      } else {
        if (-1 === name) {
          return void(console && (console.warn && console.warn("No container matching this uri was found or selection doesn't know about the container. Possibly you need to run events.update.")));
        }
      }
      if (!$()) {
        path.clear();
      }
      var start = new Node(name, id);
      if (!path.getOrigin()) {
        path.setOrigin(start);
      }
      path.setFocus(start);
      path.add(start);
      m.update();
      position(start);
    }
    /**
     * @param {Object} opts
     * @return {undefined}
     */
    function d(opts) {
      var props = extend(api.elements, opts.container);
      path.updateIndices(props, opts.before, opts.after);
    }
    /**
     * @param {MouseEvent} event
     * @return {?}
     */
    function trigger(event) {
      switch(event.button) {
        case 0:
          return 1;
        case 2:
          return 2;
        case 1:
          return 3;
        default:
          return 0;
      }
    }
    /**
     * @return {?}
     */
    function has() {
      if (!browser.window) {
        return false;
      }
      if (!browser.window.navigator) {
        return false;
      }
      var ua = browser.window.navigator.userAgent || "";
      return ua.indexOf("Mac") > -1;
    }
    /**
     * @return {?}
     */
    function $() {
      return browser.window ? !!browser.window._getSpotifyModule : false;
    }
    /**
     * @param {(Error|string)} data
     * @param {string} key
     * @return {?}
     */
    function dataAttr(data, key) {
      for (;data;) {
        if (data = node.getClosest(data, key), data && path.isSelected(data)) {
          return data;
        }
      }
      return null;
    }
    /**
     * @param {?} start
     * @return {undefined}
     */
    function position(start) {
      var range = node.getNodeFromPosition(start);
      if (range) {
        var elemTop = range.getBoundingClientRect().top;
        if (0 > elemTop || elemTop >= window.innerHeight) {
          range.scrollIntoView(0 > elemTop);
        }
      }
    }
    var log = require("./node_modules/spotify-events/node_modules/elements/index.js");
    var extend = require("./node_modules/mout/array/indexOf.js");
    var path = require("./node_modules/spotify-events/selection/model.js");
    var m = require("./node_modules/spotify-events/selection/rows.js");
    var api = require("./node_modules/spotify-events/selection/containers.js");
    var node = require("./node_modules/spotify-events/selection/positions.js");
    var Node = require("./node_modules/spotify-events/util/Position.js");
    /** @type {boolean} */
    var u = false;
    /** @type {boolean} */
    var M = false;
    /** @type {string} */
    var a = "[data-list-item]";
    /** @type {function (Event, boolean): undefined} */
    self.handleMouseDown = done;
    /** @type {function (Event): undefined} */
    self.handleMouseUp = exec;
    /** @type {function (Event): ?} */
    self.handleMouseMove = listener;
    /** @type {function (): undefined} */
    self.handleDragEnd = compassResult;
    /** @type {function (Object): undefined} */
    self.handleKeyDown = run;
    /** @type {function (Event): undefined} */
    self.handleFocus = add;
    /** @type {function (?): undefined} */
    self.handleScrollShowBefore = prev;
    /** @type {function ((Object|boolean|number|string)): undefined} */
    self.handleApplicationUpdate = fn;
    /** @type {function (string, (Function|string)): ?} */
    self.handleAddByUri = init;
    /** @type {function (Object): undefined} */
    self.handleUpdateIndices = d;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} self
   * @return {undefined}
   */
  "./node_modules/spotify-events/selection/containers.js" : function(require, dataAndEvents, self) {
    /**
     * @return {undefined}
     */
    function reset() {
      /** @type {number} */
      elements.length = 0;
    }
    /**
     * @return {undefined}
     */
    function on() {
      var dontCloseTags = $(document).search("[data-list]");
      if (dontCloseTags) {
        indexOf(dontCloseTags, function(i) {
          if (-1 === fn(elements, i)) {
            elements.push(i);
          }
        });
      }
    }
    /**
     * @param {number} index
     * @return {?}
     */
    function end(index) {
      var $page = $(elements[index]);
      if (!$page) {
        return 0;
      }
      var value = $page.data("uri");
      if (!value) {
        return 0;
      }
      var items = isFunction(value).get("tracks");
      return items ? items.length : 0;
    }
    /**
     * @param {number} id
     * @return {?}
     */
    function load(id) {
      var elem = elements[id];
      var nType = elem && elem.getAttribute("data-uri");
      return nType || null;
    }
    var $ = require("./node_modules/spotify-events/node_modules/elements/index.js");
    var isFunction = require("./node_modules/spotify-live/index.js");
    var indexOf = require("./node_modules/mout/array/forEach.js");
    var fn = require("./node_modules/mout/array/indexOf.js");
    /** @type {Array} */
    var elements = [];
    /** @type {Array} */
    self.elements = elements;
    /** @type {function (): undefined} */
    self.reset = reset;
    /** @type {function (): undefined} */
    self.update = on;
    /** @type {function (number): ?} */
    self.getContainerLength = end;
    /** @type {function (number): ?} */
    self.getUri = load;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} self
   * @return {undefined}
   */
  "./node_modules/spotify-events/selection/model.js" : function(require, dataAndEvents, self) {
    /**
     * @return {?}
     */
    function attr() {
      return value;
    }
    /**
     * @return {?}
     */
    function object() {
      return result;
    }
    /**
     * @param {?} date
     * @return {undefined}
     */
    function select(date) {
      value = date;
    }
    /**
     * @param {?} date
     * @return {undefined}
     */
    function distance(date) {
      result = date;
    }
    /**
     * @param {?} date
     * @param {(Object|boolean|number|string)} callback
     * @return {undefined}
     */
    function set(date, callback) {
      var value = callback || date;
      if (-1 === angular.getDirection(date, value)) {
        var input = date;
        date = value;
        value = input;
      }
      var result = f(date, value);
      /** @type {number} */
      var key = 0;
      var id = result.length;
      for (;id > key;key++) {
        var name = date.containerIndex + key;
        var path = map[name] || (map[name] = []);
        map[name] = result[key].merge(path);
      }
    }
    /**
     * @param {?} obj
     * @param {?} val
     * @return {undefined}
     */
    function loop(obj, val) {
      var value = val || obj;
      if (-1 === angular.getDirection(obj, value)) {
        var last = obj;
        obj = value;
        value = last;
      }
      var values = f(obj, value);
      /** @type {number} */
      var idx = 0;
      var valuesLen = values.length;
      for (;valuesLen > idx;idx++) {
        var objUid = obj.containerIndex + idx;
        var suiteView = map[objUid] || (map[objUid] = []);
        map[objUid] = values[idx].remove(suiteView);
      }
    }
    /**
     * @return {undefined}
     */
    function clear() {
      /** @type {number} */
      map.length = 0;
      /** @type {null} */
      result = value = null;
    }
    /**
     * @param {?} name
     * @param {string} args
     * @param {?} arg
     * @return {undefined}
     */
    function start(name, args, arg) {
      if (map[name]) {
        var val;
        /** @type {Array} */
        var file = [];
        /** @type {number} */
        var key = 0;
        for (;val = map[name][key];key++) {
          var j = val.start;
          for (;j < val.end;j++) {
            var _j = args.indexOf(j);
            if (-1 !== _j) {
              file = (new Buffer(arg[_j], arg[_j] + 1)).merge(file);
            }
          }
        }
        map[name] = file;
        if (value) {
          if (value.containerIndex === name) {
            value = callback(value, args, arg);
          }
        }
        if (result) {
          if (result.containerIndex === name) {
            result = callback(result, args, arg);
          }
        }
      }
    }
    /**
     * @param {?} state
     * @param {string} collection
     * @param {?} args
     * @return {?}
     */
    function callback(state, collection, args) {
      var i = collection.indexOf(state.index);
      return-1 !== i && (state.index = args[i]), state;
    }
    /**
     * @param {?} t
     * @param {?} re
     * @return {?}
     */
    function f(t, re) {
      /** @type {Array} */
      var returned = [];
      var target = t.containerIndex;
      var radio = re.containerIndex;
      var value = target;
      for (;radio >= value;value++) {
        var start;
        var bodyLen = value === target ? t.index : 0;
        if (value === radio) {
          start = re.index;
        } else {
          var len = nodes.getContainerLength(value);
          if (len > 0) {
            /** @type {number} */
            start = len - 1;
          }
        }
        returned.push(void 0 === start ? new Buffer(0, 0) : new Buffer(bodyLen, start + 1));
      }
      return returned;
    }
    /**
     * @param {?} d
     * @return {?}
     */
    function end(d) {
      var r = map[d.containerIndex];
      if (!r) {
        return false;
      }
      var b = new Buffer(d.index, d.index + 1);
      return b.contained(r);
    }
    /**
     * @return {?}
     */
    function check() {
      var codeSegments = template(map, function(newlines) {
        return newlines.length;
      });
      return codeSegments.length > 1 ? true : 1 === codeSegments.length && codeSegments[0] ? codeSegments[0].length > 1 : false;
    }
    /**
     * @param {number} key
     * @return {?}
     */
    function add(key) {
      var list = map[key];
      /** @type {Array} */
      var errors = [];
      if (list && list.length) {
        /** @type {number} */
        var p = 0;
        var len = list.length;
        for (;len > p;p++) {
          var n = list[p];
          var i = n.start;
          for (;i < n.end;i++) {
            errors.push(i);
          }
        }
      }
      return errors.length ? errors : null;
    }
    var Buffer = require("./node_modules/spotify-live/util/range.js");
    var nodes = require("./node_modules/spotify-events/selection/containers.js");
    var angular = require("./node_modules/spotify-events/selection/positions.js");
    var template = require("./node_modules/mout/array/filter.js");
    /** @type {Array} */
    var map = [];
    /** @type {null} */
    var value = null;
    /** @type {null} */
    var result = null;
    /** @type {Array} */
    self.selections = map;
    /** @type {function (): ?} */
    self.getOrigin = attr;
    /** @type {function (): ?} */
    self.getFocus = object;
    /** @type {function (?): undefined} */
    self.setOrigin = select;
    /** @type {function (?): undefined} */
    self.setFocus = distance;
    /** @type {function (?, (Object|boolean|number|string)): undefined} */
    self.add = set;
    /** @type {function (?, ?): undefined} */
    self.remove = loop;
    /** @type {function (): undefined} */
    self.clear = clear;
    /** @type {function (?, string, ?): undefined} */
    self.updateIndices = start;
    /** @type {function (?): ?} */
    self.isSelected = end;
    /** @type {function (): ?} */
    self.hasHoles = check;
    /** @type {function (number): ?} */
    self.getIndicesForContainer = add;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Array} output
   * @return {undefined}
   */
  "./node_modules/spotify-events/selection/rows.js" : function(require, dataAndEvents, output) {
    /**
     * @param {?} opt_attributes
     * @return {undefined}
     */
    function next(opt_attributes) {
      var index = getIndex(opt_attributes);
      var context = load(opt_attributes);
      var value = fn(index, context);
      var key = fn(context, index);
      parseInt(index, function(ctx) {
        $(ctx).removeClass(className);
      });
      parseInt(value, function(ctx) {
        $(ctx).removeClass(klass);
      });
      parseInt(key, function(source_id) {
        $(source_id).addClass(klass);
      });
      var selector = p.getFocus();
      if (selector) {
        var elem = nodes.getNodeFromPosition(selector);
        if (elem) {
          $(elem).addClass(className);
        }
      }
    }
    /**
     * @param {string} element
     * @return {?}
     */
    function getIndex(element) {
      var cDigit = element ? [element] : tree.elements;
      /** @type {Array} */
      var passes = [];
      return parseInt(cDigit, function(href) {
        var r20 = $(href).search(prefix + "." + klass);
        if (r20) {
          text(passes, r20);
        }
      }), passes;
    }
    /**
     * @param {(Object|boolean|number|string)} scope
     * @return {?}
     */
    function load(scope) {
      /** @type {Array} */
      var passes = [];
      var els = tree.elements;
      return parseInt(p.selections, function(classNames, i) {
        if (classNames) {
          /** @type {Array} */
          var leaks = [];
          /** @type {number} */
          var c = 0;
          var cnl = classNames.length;
          for (;cnl > c;c++) {
            var anim = classNames[c];
            var from = anim.start;
            var end = anim.end;
            for (;end > from;from++) {
              leaks.push("[data-index=" + from + "]");
            }
          }
          if (leaks.length > 0) {
            var r20 = $(scope || els[i]).search(leaks.join(","));
            if (r20) {
              text(passes, r20);
            }
          }
        }
      }), passes;
    }
    var $ = require("./node_modules/spotify-events/node_modules/elements/index.js");
    var fn = require("./node_modules/mout/array/difference.js");
    var parseInt = require("./node_modules/mout/array/forEach.js");
    var text = require("./node_modules/mout/array/append.js");
    var p = require("./node_modules/spotify-events/selection/model.js");
    var tree = require("./node_modules/spotify-events/selection/containers.js");
    var nodes = require("./node_modules/spotify-events/selection/positions.js");
    /** @type {string} */
    var prefix = "[data-list-item]";
    /** @type {string} */
    var klass = "selected";
    /** @type {string} */
    var className = "selection-focus";
    /** @type {function (?): undefined} */
    output.update = next;
  },
  /**
   * @param {?} proceed
   * @param {?} dataAndEvents
   * @param {?} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/selection/positions.js" : function(proceed, dataAndEvents, module) {
    /**
     * @param {?} e
     * @param {string} key
     * @return {?}
     */
    function get(e, key) {
      /** @type {boolean} */
      var name = "down" === key;
      var value = e.containerIndex;
      var n = e.index;
      var isFunction = self.getContainerLength(value);
      var nameSuffix = name ? n + 1 : n - 1;
      return isFunction > nameSuffix && nameSuffix >= 0 ? new Module(value, nameSuffix) : (value = name ? value + 1 : value - 1, isFunction = self.getContainerLength(value), isFunction ? (nameSuffix = name ? 0 : isFunction - 1, new Module(value, nameSuffix)) : null);
    }
    /**
     * @param {Node} node
     * @return {?}
     */
    function visit(node) {
      if (!node.parentNode) {
        return null;
      }
      if (!node.hasAttribute("data-index")) {
        return null;
      }
      var a = self.elements;
      if (0 === a.length) {
        return null;
      }
      /** @type {number} */
      var id = 0;
      var al = a.length;
      for (;al > id;id++) {
        if (a[id] && fn(a[id], node)) {
          /** @type {number} */
          var moduleName = +node.getAttribute("data-index");
          return new Module(id, moduleName);
        }
      }
      return null;
    }
    /**
     * @param {?} parent
     * @param {Node} next
     * @return {?}
     */
    function fn(parent, next) {
      for (;next && next.parentNode !== parent;) {
        next = next.parentNode;
      }
      return!!next;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    function add(child) {
      var context = self.elements[child.containerIndex];
      if (!context) {
        return null;
      }
      var horizontalOffset = value(context).find("[data-index=" + child.index + "]");
      return horizontalOffset ? horizontalOffset[0] : null;
    }
    /**
     * @param {Object} a
     * @param {Object} b
     * @return {?}
     */
    function extend(a, b) {
      return a && b ? a.containerIndex !== b.containerIndex ? a.containerIndex < b.containerIndex ? 1 : -1 : a.index === b.index ? 0 : a.index < b.index ? 1 : -1 : 0;
    }
    /**
     * @param {string} y
     * @return {?}
     */
    function Vector(y) {
      var chunk;
      /** @type {string} */
      var tileV = y;
      /** @type {number} */
      var name = 0;
      /** @type {number} */
      var x = 0;
      /** @type {number} */
      var i = 0;
      var l = self.elements.length;
      for (;l > i && (chunk = self.getContainerLength(i), x += chunk, !(x > y));i++) {
        /** @type {number} */
        name = i + 1;
        tileV -= chunk;
      }
      return new Module(name, tileV);
    }
    /**
     * @param {Object} conf
     * @return {?}
     */
    function Test(conf) {
      var n = conf.index;
      /** @type {number} */
      var i = conf.containerIndex - 1;
      for (;i >= 0;i--) {
        n += self.getContainerLength(i);
      }
      return n;
    }
    var value = proceed("./node_modules/spotify-events/node_modules/elements/index.js");
    var self = proceed("./node_modules/spotify-events/selection/containers.js");
    var Module = proceed("./node_modules/spotify-events/util/Position.js");
    /** @type {function (?, string): ?} */
    module.getClosest = get;
    /** @type {function (Node): ?} */
    module.getFromNode = visit;
    /** @type {function (?): ?} */
    module.getNodeFromPosition = add;
    /** @type {function (Object, Object): ?} */
    module.getDirection = extend;
    /** @type {function (string): ?} */
    module.getPositionFromGlobalIndex = Vector;
    /** @type {function (Object): ?} */
    module.getGlobalIndexFromPosition = Test;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-feature-manager/node_modules/rsvp/dist/rsvp.js" : function(dataAndEvents, module) {
    (function() {
      /**
       * @param {(Array|NodeList)} obj
       * @param {Function} value
       * @return {?}
       */
      function indexOf(obj, value) {
        /** @type {number} */
        var i = 0;
        var l = obj.length;
        for (;l > i;i++) {
          if (obj[i] === value) {
            return i;
          }
        }
        return-1;
      }
      /**
       * @param {Object} object
       * @return {?}
       */
      function callbacksFor(object) {
        var events = object._promiseCallbacks;
        return events || (events = object._promiseCallbacks = {}), events;
      }
      /**
       * @param {string} name
       * @param {Object} value
       * @return {?}
       */
      function configure(name, value) {
        return "onerror" === name ? void config.on("error", value) : 2 !== arguments.length ? config[name] : void(config[name] = value);
      }
      /**
       * @param {Object} arg
       * @return {?}
       */
      function isObject(arg) {
        return "function" == typeof arg || "object" == typeof arg && null !== arg;
      }
      /**
       * @param {?} name
       * @return {?}
       */
      function call(name) {
        return "function" == typeof name;
      }
      /**
       * @param {Object} o
       * @return {?}
       */
      function _clone(o) {
        return "object" == typeof o && null !== o;
      }
      /**
       * @return {undefined}
       */
      function TemplateClass() {
      }
      /**
       * @return {undefined}
       */
      function noop() {
      }
      /**
       * @param {?} arg
       * @return {?}
       */
      function fn(arg) {
        try {
          return arg.then;
        } catch (e) {
          return result.error = e, result;
        }
      }
      /**
       * @param {Function} s
       * @param {Function} obj
       * @param {Function} val
       * @param {Function} value
       * @return {?}
       */
      function isString(s, obj, val, value) {
        try {
          s.call(obj, val, value);
        } catch (result) {
          return result;
        }
      }
      /**
       * @param {Object} arg
       * @param {?} event
       * @param {Function} message
       * @return {undefined}
       */
      function log(arg, event, message) {
        config.async(function(promise) {
          /** @type {boolean} */
          var r = false;
          var e = isString(message, event, function(data) {
            if (!r) {
              /** @type {boolean} */
              r = true;
              if (event !== data) {
                emit(promise, data);
              } else {
                publish(promise, data);
              }
            }
          }, function(isXML) {
            if (!r) {
              /** @type {boolean} */
              r = true;
              fulfill(promise, isXML);
            }
          }, "Settle: " + (promise._label || " unknown promise"));
          if (!r) {
            if (e) {
              /** @type {boolean} */
              r = true;
              fulfill(promise, e);
            }
          }
        }, arg);
      }
      /**
       * @param {Object} error
       * @param {Object} promise
       * @return {undefined}
       */
      function done(error, promise) {
        if (promise._state === FULFILLED) {
          publish(error, promise._result);
        } else {
          if (error._state === REJECTED) {
            fulfill(error, promise._result);
          } else {
            reject(promise, void 0, function(data) {
              if (promise !== data) {
                emit(error, data);
              } else {
                publish(error, data);
              }
            }, function(isXML) {
              fulfill(error, isXML);
            });
          }
        }
      }
      /**
       * @param {Object} promise
       * @param {?} obj
       * @return {undefined}
       */
      function finish(promise, obj) {
        if (obj.constructor === promise.constructor) {
          done(promise, obj);
        } else {
          var str = fn(obj);
          if (str === result) {
            fulfill(promise, result.error);
          } else {
            if (void 0 === str) {
              publish(promise, obj);
            } else {
              if (call(str)) {
                log(promise, obj, str);
              } else {
                publish(promise, obj);
              }
            }
          }
        }
      }
      /**
       * @param {?} value
       * @param {?} data
       * @return {undefined}
       */
      function emit(value, data) {
        if (value === data) {
          publish(value, data);
        } else {
          if (isObject(data)) {
            finish(value, data);
          } else {
            publish(value, data);
          }
        }
      }
      /**
       * @param {Object} promise
       * @return {undefined}
       */
      function publishRejection(promise) {
        if (promise._onerror) {
          promise._onerror(promise._result);
        }
        next(promise);
      }
      /**
       * @param {Object} promise
       * @param {Function} value
       * @return {undefined}
       */
      function publish(promise, value) {
        if (promise._state === PENDING) {
          /** @type {Function} */
          promise._result = value;
          /** @type {number} */
          promise._state = FULFILLED;
          if (0 === promise._subscribers.length) {
            if (config.instrument) {
              instrument("fulfilled", promise);
            }
          } else {
            config.async(next, promise);
          }
        }
      }
      /**
       * @param {Object} promise
       * @param {?} value
       * @return {undefined}
       */
      function fulfill(promise, value) {
        if (promise._state === PENDING) {
          /** @type {number} */
          promise._state = REJECTED;
          promise._result = value;
          config.async(publishRejection, promise);
        }
      }
      /**
       * @param {Object} promise
       * @param {?} opt_attributes
       * @param {Function} obj
       * @param {Function} silent
       * @return {undefined}
       */
      function reject(promise, opt_attributes, obj, silent) {
        var subscribers = promise._subscribers;
        var length = subscribers.length;
        /** @type {null} */
        promise._onerror = null;
        subscribers[length] = opt_attributes;
        /** @type {Function} */
        subscribers[length + FULFILLED] = obj;
        /** @type {Function} */
        subscribers[length + REJECTED] = silent;
        if (0 === length) {
          if (promise._state) {
            config.async(next, promise);
          }
        }
      }
      /**
       * @param {Object} promise
       * @return {undefined}
       */
      function next(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;
        if (config.instrument && instrument(settled === FULFILLED ? "fulfilled" : "rejected", promise), 0 !== subscribers.length) {
          var v;
          var child;
          var typePattern = promise._result;
          /** @type {number} */
          var i = 0;
          for (;i < subscribers.length;i += 3) {
            v = subscribers[i];
            child = subscribers[i + settled];
            if (v) {
              notify(settled, v, child, typePattern);
            } else {
              child(typePattern);
            }
          }
          /** @type {number} */
          promise._subscribers.length = 0;
        }
      }
      /**
       * @return {undefined}
       */
      function FileSystem() {
        /** @type {null} */
        this.error = null;
      }
      /**
       * @param {?} next
       * @param {Function} _
       * @return {?}
       */
      function callback(next, _) {
        try {
          return next(_);
        } catch (result) {
          return target.error = result, target;
        }
      }
      /**
       * @param {number} settled
       * @param {Object} promise
       * @param {?} node
       * @param {Function} args
       * @return {?}
       */
      function notify(settled, promise, node, args) {
        var value;
        var ctor;
        var post_via_agent;
        var u;
        var r = call(node);
        if (r) {
          if (value = callback(node, args), value === target ? (u = true, ctor = value.error, value = null) : post_via_agent = true, promise === value) {
            return void fulfill(promise, new TypeError("A promises callback cannot return that same promise."));
          }
        } else {
          /** @type {Function} */
          value = args;
          /** @type {boolean} */
          post_via_agent = true;
        }
        if (!(promise._state !== PENDING)) {
          if (r && post_via_agent) {
            emit(promise, value);
          } else {
            if (u) {
              fulfill(promise, ctor);
            } else {
              if (settled === FULFILLED) {
                publish(promise, value);
              } else {
                if (settled === REJECTED) {
                  fulfill(promise, value);
                }
              }
            }
          }
        }
      }
      /**
       * @param {Object} self
       * @param {?} callback
       * @return {undefined}
       */
      function fetch(self, callback) {
        try {
          callback(function(chunk) {
            emit(self, chunk);
          }, function(isXML) {
            fulfill(self, isXML);
          });
        } catch (udataCur) {
          fulfill(self, udataCur);
        }
      }
      /**
       * @param {number} deepDataAndEvents
       * @param {number} val
       * @param {string} value
       * @return {?}
       */
      function writeByte(deepDataAndEvents, val, value) {
        return deepDataAndEvents === FULFILLED ? {
          state : "fulfilled",
          value : value
        } : {
          state : "rejected",
          reason : value
        };
      }
      /**
       * @param {Function} obj
       * @param {string} input
       * @param {boolean} recurring
       * @param {Object} dataAndEvents
       * @return {undefined}
       */
      function clone(obj, input, recurring, dataAndEvents) {
        /** @type {Function} */
        this._instanceConstructor = obj;
        this.promise = new obj(noop, dataAndEvents);
        /** @type {boolean} */
        this._abortOnReject = recurring;
        if (this._validateInput(input)) {
          /** @type {string} */
          this._input = input;
          this.length = input.length;
          this._remaining = input.length;
          this._init();
          if (0 === this.length) {
            publish(this.promise, this._result);
          } else {
            this.length = this.length || 0;
            this._enumerate();
            if (0 === this._remaining) {
              publish(this.promise, this._result);
            }
          }
        } else {
          fulfill(this.promise, this._validationError());
        }
      }
      /**
       * @return {?}
       */
      function freeze() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
      }
      /**
       * @return {?}
       */
      function forEach() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }
      /**
       * @param {undefined} resolver
       * @param {string} target
       * @return {undefined}
       */
      function Promise(resolver, target) {
        /** @type {number} */
        this._id = counter++;
        /** @type {string} */
        this._label = target;
        this._state = void 0;
        this._result = void 0;
        /** @type {Array} */
        this._subscribers = [];
        if (config.instrument) {
          instrument("created", this);
        }
        if (noop !== resolver) {
          if (!call(resolver)) {
            freeze();
          }
          if (!(this instanceof Promise)) {
            forEach();
          }
          fetch(this, resolver);
        }
      }
      /**
       * @return {undefined}
       */
      function Entity() {
        this.value = void 0;
      }
      /**
       * @param {?} parent
       * @return {?}
       */
      function promote(parent) {
        try {
          return parent.then;
        } catch (path) {
          return number.value = path, number;
        }
      }
      /**
       * @param {Function} fn
       * @param {Function} obj
       * @param {?} arg
       * @return {?}
       */
      function get(fn, obj, arg) {
        try {
          fn.apply(obj, arg);
        } catch (path) {
          return number.value = path, number;
        }
      }
      /**
       * @param {Object} a
       * @param {Array} input
       * @return {?}
       */
      function makeArray(a, input) {
        var p;
        var i;
        var ret = {};
        var al = a.length;
        /** @type {Array} */
        var c = new Array(al);
        /** @type {number} */
        var e = 0;
        for (;al > e;e++) {
          c[e] = a[e];
        }
        /** @type {number} */
        i = 0;
        for (;i < input.length;i++) {
          p = input[i];
          ret[p] = c[i + 1];
        }
        return ret;
      }
      /**
       * @param {Object} args
       * @return {?}
       */
      function each(args) {
        var len = args.length;
        /** @type {Array} */
        var obj = new Array(len - 1);
        /** @type {number} */
        var i = 1;
        for (;len > i;i++) {
          obj[i - 1] = args[i];
        }
        return obj;
      }
      /**
       * @param {Function} callback
       * @param {?} context
       * @return {?}
       */
      function $(callback, context) {
        return{
          /**
           * @param {Function} err
           * @param {Function} value
           * @return {?}
           */
          then : function(err, value) {
            return callback.call(context, err, value);
          }
        };
      }
      /**
       * @param {Object} value
       * @param {?} obj
       * @param {Function} properties
       * @param {Function} selector
       * @return {?}
       */
      function check(value, obj, properties, selector) {
        var values = get(properties, selector, obj);
        return values === number && fulfill(value, values.value), value;
      }
      /**
       * @param {Object} value
       * @param {Object} callback
       * @param {Function} obj
       * @param {Function} owner
       * @return {?}
       */
      function remove(value, callback, obj, owner) {
        return promise.all(callback).then(function(until) {
          var type = get(obj, owner, until);
          return type === number && fulfill(value, type.value), value;
        });
      }
      /**
       * @param {Object} parent
       * @return {?}
       */
      function parse(parent) {
        return parent && "object" == typeof parent ? parent.constructor === promise ? true : promote(parent) : false;
      }
      /**
       * @param {Function} obj
       * @param {string} value
       * @param {Object} dataAndEvents
       * @return {undefined}
       */
      function Assertion(obj, value, dataAndEvents) {
        this._superConstructor(obj, value, false, dataAndEvents);
      }
      /**
       * @param {Function} code
       * @param {string} string
       * @param {Object} node
       * @return {undefined}
       */
      function a(code, string, node) {
        this._superConstructor(code, string, true, node);
      }
      /**
       * @param {Function} walkers
       * @param {string} mom
       * @param {Object} dataAndEvents
       * @return {undefined}
       */
      function PropertiesPromiseArray(walkers, mom, dataAndEvents) {
        this._superConstructor(walkers, mom, false, dataAndEvents);
      }
      /**
       * @return {?}
       */
      function accountGeneric() {
        return function() {
          process.nextTick(flush);
        };
      }
      /**
       * @return {?}
       */
      function useMutationObserver() {
        /** @type {number} */
        var iterations = 0;
        /** @type {MutationObserver} */
        var observer = new BrowserMutationObserver(flush);
        /** @type {Text} */
        var node = document.createTextNode("");
        return observer.observe(node, {
          characterData : true
        }), function() {
          /** @type {number} */
          node.data = iterations = ++iterations % 2;
        };
      }
      /**
       * @return {?}
       */
      function initMessageChannel() {
        /** @type {MessageChannel} */
        var channel = new MessageChannel;
        return channel.port1.onmessage = flush, function() {
          channel.port2.postMessage(0);
        };
      }
      /**
       * @return {?}
       */
      function make() {
        return function() {
          setTimeout(flush, 1);
        };
      }
      /**
       * @return {undefined}
       */
      function flush() {
        /** @type {number} */
        var key = 0;
        for (;id > key;key += 2) {
          var f = o[key];
          var current = o[key + 1];
          f(current);
          o[key] = void 0;
          o[key + 1] = void 0;
        }
        /** @type {number} */
        id = 0;
      }
      /**
       * @param {Function} callback
       * @param {Object} arg
       * @return {undefined}
       */
      function async(callback, arg) {
        config.async(callback, arg);
      }
      /**
       * @return {undefined}
       */
      function on() {
        config.on.apply(config, arguments);
      }
      /**
       * @return {undefined}
       */
      function off() {
        config.off.apply(config, arguments);
      }
      var EventTarget = {
        /**
         * @param {Object} object
         * @return {?}
         */
        mixin : function(object) {
          return object.on = this.on, object.off = this.off, object.trigger = this.trigger, object._promiseCallbacks = void 0, object;
        },
        /**
         * @param {string} name
         * @param {Function} value
         * @return {undefined}
         */
        on : function(name, value) {
          var copy;
          var options = callbacksFor(this);
          copy = options[name];
          if (!copy) {
            /** @type {Array} */
            copy = options[name] = [];
          }
          if (-1 === indexOf(copy, value)) {
            copy.push(value);
          }
        },
        /**
         * @param {string} event
         * @param {Function} value
         * @return {?}
         */
        off : function(event, value) {
          var a;
          var b;
          var _ref1 = callbacksFor(this);
          return value ? (a = _ref1[event], b = indexOf(a, value), void(-1 !== b && a.splice(b, 1))) : void(_ref1[event] = []);
        },
        /**
         * @param {string} eventName
         * @param {?} data
         * @return {undefined}
         */
        trigger : function(eventName, data) {
          var callbacks;
          var callback;
          var allCallbacks = callbacksFor(this);
          if (callbacks = allCallbacks[eventName]) {
            /** @type {number} */
            var i = 0;
            for (;i < callbacks.length;i++) {
              (callback = callbacks[i])(data);
            }
          }
        }
      };
      var config = {
        instrument : false
      };
      EventTarget.mixin(config);
      var String;
      /** @type {Function} */
      String = Array.isArray ? Array.isArray : function(spy) {
        return "[object Array]" === Object.prototype.toString.call(spy);
      };
      /** @type {Function} */
      var toString = String;
      /** @type {function (): number} */
      var now = Date.now || function() {
        return(new Date).getTime();
      };
      /** @type {function ((Object|null), (Object|null)=): Object} */
      var createObject = Object.create || function(object) {
        if (arguments.length > 1) {
          throw new Error("Second argument not supported");
        }
        if ("object" != typeof object) {
          throw new TypeError("Argument must be an object");
        }
        return TemplateClass.prototype = object, new TemplateClass;
      };
      /** @type {Array} */
      var items = [];
      /**
       * @param {string} name
       * @param {Object} promise
       * @param {Object} child
       * @return {undefined}
       */
      var instrument = function(name, promise, child) {
        if (1 === items.push({
          name : name,
          payload : {
            guid : promise._guidKey + promise._id,
            eventName : name,
            detail : promise._result,
            childGuid : child && promise._guidKey + child._id,
            label : promise._label,
            timeStamp : now(),
            stack : (new Error(promise._label)).stack
          }
        })) {
          setTimeout(function() {
            var item;
            /** @type {number} */
            var i = 0;
            for (;i < items.length;i++) {
              item = items[i];
              config.trigger(item.name, item.payload);
            }
            /** @type {number} */
            items.length = 0;
          }, 50);
        }
      };
      var PENDING = void 0;
      /** @type {number} */
      var FULFILLED = 1;
      /** @type {number} */
      var REJECTED = 2;
      var result = new FileSystem;
      var target = new FileSystem;
      /**
       * @param {Object} str
       * @return {?}
       */
      clone.prototype._validateInput = function(str) {
        return toString(str);
      };
      /**
       * @return {?}
       */
      clone.prototype._validationError = function() {
        return new Error("Array Methods must be provided an Array");
      };
      /**
       * @return {undefined}
       */
      clone.prototype._init = function() {
        /** @type {Array} */
        this._result = new Array(this.length);
      };
      /** @type {function (Function, string, boolean, Object): undefined} */
      var parent = clone;
      /**
       * @return {undefined}
       */
      clone.prototype._enumerate = function() {
        var n = this.length;
        var promise = this.promise;
        var ancestor = this._input;
        /** @type {number} */
        var m = 0;
        for (;promise._state === PENDING && n > m;m++) {
          this._eachEntry(ancestor[m], m);
        }
      };
      /**
       * @param {string} attributes
       * @param {number} $conditional
       * @return {undefined}
       */
      clone.prototype._eachEntry = function(attributes, $conditional) {
        var $ = this._instanceConstructor;
        if (_clone(attributes)) {
          if (attributes.constructor === $ && attributes._state !== PENDING) {
            /** @type {null} */
            attributes._onerror = null;
            this._settledAt(attributes._state, $conditional, attributes._result);
          } else {
            this._willSettleAt($.resolve(attributes), $conditional);
          }
        } else {
          this._remaining--;
          this._result[$conditional] = this._makeResult(FULFILLED, $conditional, attributes);
        }
      };
      /**
       * @param {number} deepDataAndEvents
       * @param {number} $conditional
       * @param {string} isXML
       * @return {undefined}
       */
      clone.prototype._settledAt = function(deepDataAndEvents, $conditional, isXML) {
        var promise = this.promise;
        if (promise._state === PENDING) {
          this._remaining--;
          if (this._abortOnReject && deepDataAndEvents === REJECTED) {
            fulfill(promise, isXML);
          } else {
            this._result[$conditional] = this._makeResult(deepDataAndEvents, $conditional, isXML);
          }
        }
        if (0 === this._remaining) {
          publish(promise, this._result);
        }
      };
      /**
       * @param {number} deepDataAndEvents
       * @param {number} val
       * @param {string} value
       * @return {?}
       */
      clone.prototype._makeResult = function(deepDataAndEvents, val, value) {
        return value;
      };
      /**
       * @param {Object} error
       * @param {number} val
       * @return {undefined}
       */
      clone.prototype._willSettleAt = function(error, val) {
        var hooks = this;
        reject(error, void 0, function(isXML) {
          hooks._settledAt(FULFILLED, val, isXML);
        }, function(isXML) {
          hooks._settledAt(REJECTED, val, isXML);
        });
      };
      /**
       * @param {Object} callback
       * @param {number} type
       * @return {?}
       */
      var all = function(callback, type) {
        return(new parent(this, callback, true, type)).promise;
      };
      /**
       * @param {Object} str
       * @param {?} errback
       * @return {?}
       */
      var execute = function(str, errback) {
        /**
         * @param {?} chunk
         * @return {undefined}
         */
        function data(chunk) {
          emit(promise, chunk);
        }
        /**
         * @param {?} value
         * @return {undefined}
         */
        function silent(value) {
          fulfill(promise, value);
        }
        var Promise = this;
        var promise = new Promise(noop, errback);
        if (!toString(str)) {
          return fulfill(promise, new TypeError("You must pass an array to race.")), promise;
        }
        var end = str.length;
        /** @type {number} */
        var key = 0;
        for (;promise._state === PENDING && end > key;key++) {
          reject(Promise.resolve(str[key]), void 0, data, silent);
        }
        return promise;
      };
      /**
       * @param {?} opt_attributes
       * @param {Function} name
       * @return {?}
       */
      var cast = function(opt_attributes, name) {
        var GridStore = this;
        if (opt_attributes && ("object" == typeof opt_attributes && opt_attributes.constructor === GridStore)) {
          return opt_attributes;
        }
        var udataCur = new GridStore(noop, name);
        return emit(udataCur, opt_attributes), udataCur;
      };
      /**
       * @param {string} value
       * @param {?} errback
       * @return {?}
       */
      var when = function(value, errback) {
        var Promise = this;
        var promise = new Promise(noop, errback);
        return fulfill(promise, value), promise;
      };
      /** @type {string} */
      var guidKey = "rsvp_" + now() + "-";
      /** @type {number} */
      var counter = 0;
      /** @type {function (undefined, string): undefined} */
      var promise = Promise;
      /** @type {function (?, Function): ?} */
      Promise.cast = cast;
      /** @type {function (Object, number): ?} */
      Promise.all = all;
      /** @type {function (Object, ?): ?} */
      Promise.race = execute;
      /** @type {function (?, Function): ?} */
      Promise.resolve = cast;
      /** @type {function (string, ?): ?} */
      Promise.reject = when;
      Promise.prototype = {
        /** @type {function (undefined, string): undefined} */
        constructor : Promise,
        _guidKey : guidKey,
        /**
         * @param {?} reason
         * @return {undefined}
         */
        _onerror : function(reason) {
          config.trigger("error", reason);
        },
        /**
         * @param {Function} resolved
         * @param {Function} rejectCallback
         * @param {Object} label
         * @return {?}
         */
        then : function(resolved, rejectCallback, label) {
          var promise = this;
          var settled = promise._state;
          if (settled === FULFILLED && !resolved || settled === REJECTED && !rejectCallback) {
            return config.instrument && instrument("chained", this, this), this;
          }
          /** @type {null} */
          promise._onerror = null;
          var thenPromise = new this.constructor(noop, label);
          var typePattern = promise._result;
          if (config.instrument && instrument("chained", promise, thenPromise), settled) {
            var to = arguments[settled - 1];
            config.async(function() {
              notify(settled, thenPromise, to, typePattern);
            });
          } else {
            reject(promise, thenPromise, resolved, rejectCallback);
          }
          return thenPromise;
        },
        /**
         * @param {Function} rejectCallback
         * @param {Object} label
         * @return {?}
         */
        "catch" : function(rejectCallback, label) {
          return this.then(null, rejectCallback, label);
        },
        /**
         * @param {Function} callback
         * @param {Object} label
         * @return {?}
         */
        "finally" : function(callback, label) {
          var constructor = this.constructor;
          return this.then(function(dataAndEvents) {
            return constructor.resolve(callback()).then(function() {
              return dataAndEvents;
            });
          }, function(dataAndEvents) {
            return constructor.resolve(callback()).then(function() {
              throw dataAndEvents;
            });
          }, label);
        }
      };
      var number = new Entity;
      var copy = new Entity;
      /**
       * @param {Object} proto
       * @param {Object} str
       * @return {?}
       */
      var create = function(proto, str) {
        /**
         * @return {?}
         */
        var empty = function() {
          var item;
          var selector = this;
          /** @type {number} */
          var i = arguments.length;
          /** @type {Array} */
          var events = new Array(i + 1);
          /** @type {boolean} */
          var target = false;
          /** @type {number} */
          var idx = 0;
          for (;i > idx;++idx) {
            if (item = arguments[idx], !target) {
              if (target = parse(item), target === copy) {
                var value = new promise(noop);
                return fulfill(value, copy.value), value;
              }
              if (target) {
                if (target !== true) {
                  item = $(target, item);
                }
              }
            }
            events[idx] = item;
          }
          var key = new promise(noop);
          return events[i] = function(isXML, chunk) {
            if (isXML) {
              fulfill(key, isXML);
            } else {
              if (void 0 === str) {
                emit(key, chunk);
              } else {
                if (str === true) {
                  emit(key, each(arguments));
                } else {
                  if (toString(str)) {
                    emit(key, makeArray(arguments, str));
                  } else {
                    emit(key, chunk);
                  }
                }
              }
            }
          }, target ? remove(key, events, proto, selector) : check(key, events, proto, selector);
        };
        return empty.__proto__ = proto, empty;
      };
      /**
       * @param {Object} callback
       * @param {number} type
       * @return {?}
       */
      var find = function(callback, type) {
        return promise.all(callback, type);
      };
      /** @type {Object} */
      Assertion.prototype = createObject(parent.prototype);
      /** @type {function (Function, string, boolean, Object): undefined} */
      Assertion.prototype._superConstructor = parent;
      /** @type {function (number, number, string): ?} */
      Assertion.prototype._makeResult = writeByte;
      /**
       * @return {?}
       */
      Assertion.prototype._validationError = function() {
        return new Error("allSettled must be called with an array");
      };
      /**
       * @param {string} name
       * @param {string} data
       * @return {?}
       */
      var _data = function(name, data) {
        return(new Assertion(promise, name, data)).promise;
      };
      /**
       * @param {Object} url
       * @param {?} er
       * @return {?}
       */
      var onerror = function(url, er) {
        return promise.race(url, er);
      };
      /** @type {function (Function, string, Object): undefined} */
      var Test = a;
      /** @type {Object} */
      a.prototype = createObject(parent.prototype);
      /** @type {function (Function, string, boolean, Object): undefined} */
      a.prototype._superConstructor = parent;
      /**
       * @return {undefined}
       */
      a.prototype._init = function() {
        this._result = {};
      };
      /**
       * @param {Function} b
       * @return {?}
       */
      a.prototype._validateInput = function(b) {
        return b && "object" == typeof b;
      };
      /**
       * @return {?}
       */
      a.prototype._validationError = function() {
        return new Error("Promise.hash must be called with an object");
      };
      /**
       * @return {undefined}
       */
      a.prototype._enumerate = function() {
        var promise = this.promise;
        var txs = this._input;
        /** @type {Array} */
        var children = [];
        var p;
        for (p in txs) {
          if (promise._state === PENDING) {
            if (txs.hasOwnProperty(p)) {
              children.push({
                position : p,
                entry : txs[p]
              });
            }
          }
        }
        /** @type {number} */
        var l = children.length;
        /** @type {number} */
        this._remaining = l;
        var child;
        /** @type {number} */
        var i = 0;
        for (;promise._state === PENDING && l > i;i++) {
          child = children[i];
          this._eachEntry(child.entry, child.position);
        }
      };
      /**
       * @param {string} fn
       * @param {string} cb
       * @return {?}
       */
      var hash = function(fn, cb) {
        return(new Test(promise, fn, cb)).promise;
      };
      /** @type {Object} */
      PropertiesPromiseArray.prototype = createObject(Test.prototype);
      /** @type {function (Function, string, boolean, Object): undefined} */
      PropertiesPromiseArray.prototype._superConstructor = parent;
      /** @type {function (number, number, string): ?} */
      PropertiesPromiseArray.prototype._makeResult = writeByte;
      /**
       * @return {?}
       */
      PropertiesPromiseArray.prototype._validationError = function() {
        return new Error("hashSettled must be called with an object");
      };
      var scheduleFlush;
      /**
       * @param {string} caller
       * @param {string} progback
       * @return {?}
       */
      var unresolvedThen = function(caller, progback) {
        return(new PropertiesPromiseArray(promise, caller, progback)).promise;
      };
      /**
       * @param {?} failing_message
       * @return {?}
       */
      var report = function(failing_message) {
        throw setTimeout(function() {
          throw failing_message;
        }), failing_message;
      };
      /**
       * @param {Object} label
       * @return {?}
       */
      var defer = function(label) {
        var deferred = {};
        return deferred.promise = new promise(function(resolve, reject) {
          /** @type {Function} */
          deferred.resolve = resolve;
          /** @type {Function} */
          deferred.reject = reject;
        }, label), deferred;
      };
      /**
       * @param {Function} callback
       * @param {?} cb
       * @param {number} label
       * @return {?}
       */
      var map = function(callback, cb, label) {
        return promise.all(callback, label).then(function(results) {
          if (!call(cb)) {
            throw new TypeError("You must pass a function as map's second argument.");
          }
          var l = results.length;
          /** @type {Array} */
          var next = new Array(l);
          /** @type {number} */
          var i = 0;
          for (;l > i;i++) {
            next[i] = cb(results[i]);
          }
          return promise.all(next, label);
        });
      };
      /**
       * @param {string} opt_attributes
       * @param {Function} name
       * @return {?}
       */
      var resolve = function(opt_attributes, name) {
        return promise.resolve(opt_attributes, name);
      };
      /**
       * @param {string} ex
       * @param {?} err
       * @return {?}
       */
      var promiseReject = function(ex, err) {
        return promise.reject(ex, err);
      };
      /**
       * @param {Object} callback
       * @param {?} fn
       * @param {number} label
       * @return {?}
       */
      var filter = function(callback, fn, label) {
        return promise.all(callback, label).then(function(employees) {
          if (!call(fn)) {
            throw new TypeError("You must pass a function as filter's second argument.");
          }
          var l = employees.length;
          /** @type {Array} */
          var array = new Array(l);
          /** @type {number} */
          var i = 0;
          for (;l > i;i++) {
            array[i] = fn(employees[i]);
          }
          return promise.all(array, label).then(function(safe) {
            /** @type {Array} */
            var e = new Array(l);
            /** @type {number} */
            var c = 0;
            /** @type {number} */
            var i = 0;
            for (;l > i;i++) {
              if (safe[i]) {
                e[c] = employees[i];
                c++;
              }
            }
            return e.length = c, e;
          });
        });
      };
      /** @type {number} */
      var id = 0;
      /**
       * @param {Function} callback
       * @param {Object} value
       * @return {undefined}
       */
      var asap = function(callback, value) {
        /** @type {Function} */
        o[id] = callback;
        /** @type {Object} */
        o[id + 1] = value;
        id += 2;
        if (2 === id) {
          scheduleFlush();
        }
      };
      /** @type {(Window|{})} */
      var browserGlobal = "undefined" != typeof window ? window : {};
      var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
      /** @type {boolean} */
      var vvar = "undefined" != typeof Uint8ClampedArray && ("undefined" != typeof importScripts && "undefined" != typeof MessageChannel);
      /** @type {Array} */
      var o = new Array(1E3);
      scheduleFlush = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? accountGeneric() : BrowserMutationObserver ? useMutationObserver() : vvar ? initMessageChannel() : make();
      /** @type {function (Function, Object): undefined} */
      config.async = asap;
      if ("undefined" != typeof window && "object" == typeof window.__PROMISE_INSTRUMENTATION__) {
        var callbacks = window.__PROMISE_INSTRUMENTATION__;
        configure("instrument", true);
        var eventName;
        for (eventName in callbacks) {
          if (callbacks.hasOwnProperty(eventName)) {
            on(eventName, callbacks[eventName]);
          }
        }
      }
      var vow = {
        /** @type {function (Object, ?): ?} */
        race : onerror,
        /** @type {function (undefined, string): undefined} */
        Promise : promise,
        /** @type {function (string, string): ?} */
        allSettled : _data,
        /** @type {function (string, string): ?} */
        hash : hash,
        /** @type {function (string, string): ?} */
        hashSettled : unresolvedThen,
        /** @type {function (Object, Object): ?} */
        denodeify : create,
        /** @type {function (): undefined} */
        on : on,
        /** @type {function (): undefined} */
        off : off,
        /** @type {function (Function, ?, number): ?} */
        map : map,
        /** @type {function (Object, ?, number): ?} */
        filter : filter,
        /** @type {function (string, Function): ?} */
        resolve : resolve,
        /** @type {function (string, ?): ?} */
        reject : promiseReject,
        /** @type {function (Object, number): ?} */
        all : find,
        /** @type {function (?): ?} */
        rethrow : report,
        /** @type {function (Object): ?} */
        defer : defer,
        EventTarget : EventTarget,
        /** @type {function (string, Object): ?} */
        configure : configure,
        /** @type {function (Function, Object): undefined} */
        async : async
      };
      if ("function" == typeof define && define.amd) {
        define(function() {
          return vow;
        });
      } else {
        if ("undefined" != typeof module && module.exports) {
          module.exports = vow;
        } else {
          if ("undefined" != typeof this) {
            this.RSVP = vow;
          }
        }
      }
    }).call(this);
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {?} args
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/env/bootstrap.js" : function($sanitize, dataAndEvents, args) {
    /**
     * @return {?}
     */
    function self() {
      return this instanceof self ? (this._id = counter++, this._requestID = 0, void(this._handlers = {})) : new self;
    }
    var Connection = $sanitize("./node_modules/spotify-cosmos-api/env/request.js").ClientRequest;
    /** @type {number} */
    var counter = 0;
    /** @type {function (): ?} */
    args.Resolver = self;
    /**
     * @param {number} name
     * @param {?} fn
     * @return {?}
     */
    self.prototype._addHandler = function(name, fn) {
      return this._handlers[name] = fn, this;
    };
    /**
     * @param {?} eventName
     * @return {?}
     */
    self.prototype._removeHandler = function(eventName) {
      return this._handlers[eventName] = null, this;
    };
    /**
     * @return {?}
     */
    self.prototype._sendRequest = function() {
      throw new Error("Resolver _sendRequest not implemented.");
    };
    /**
     * @return {?}
     */
    self.prototype._handleResponse = function() {
      throw new Error("Resolver _handleResponse not implemented.");
    };
    /**
     * @param {number} name
     * @param {Object} response
     * @param {?} obj
     * @return {undefined}
     */
    self.prototype._dispatchResponse = function(name, response, obj) {
      var config = this._handlers[name];
      if (config) {
        config._handleResponse(response, obj);
      }
    };
    /**
     * @param {Function} opt_attributes
     * @param {Function} keepData
     * @param {Function} val
     * @return {?}
     */
    self.prototype._resolve = function(opt_attributes, keepData, val) {
      if (!opt_attributes || (!keepData || (!val || ("function" != typeof keepData || "function" != typeof val)))) {
        throw new TypeError("Invalid argument length for `resolve`.");
      }
      /** @type {number} */
      var options = ++this._requestID;
      var conn = new Connection(this, options, opt_attributes, keepData, val);
      return this._addHandler(options, conn), conn.onClose = this._removeHandler.bind(this), conn.open(), conn;
    };
    /**
     * @return {?}
     */
    self.prototype.resolve = function() {
      throw new Error("Resolver resolve not implemented.");
    };
    /**
     * @return {?}
     */
    self.prototype.subscribe = function() {
      throw new Error("Resolver subscribe not implemented.");
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/util/Position.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} position
     * @return {undefined}
     */
    var Entity = function(spy, position) {
      /** @type {Object} */
      this.containerIndex = spy;
      this.index = position;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Entity.prototype.isSame = function(index) {
      return this.containerIndex === index.containerIndex && this.index === index.index;
    };
    /** @type {function (Object, ?): undefined} */
    module.exports = Entity;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/sortworker.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} d
     * @param {?} callback
     * @param {Object} lang
     * @return {undefined}
     */
    module.exports = function(spy, d, callback, lang) {
      var obj = lang || self;
      /** @type {Array} */
      var all = [];
      obj.addEventListener("message", function(self) {
        if (self.data.reset) {
          return all.length = 0, void obj.postMessage({
            reset : true
          });
        }
        if (all = all.concat(self.data.items), self.data.last) {
          var q = spy(all, self.data.property);
          var r = d(q);
          callback(obj, r, 0);
        }
      }, false);
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/sorter.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} size
     * @return {?}
     */
    module.exports = function(spy, size) {
      return spy.sort(function(a, b) {
        var a1 = a[size];
        var a2 = b[size];
        if (a1.length !== a2.length) {
          throw new Error("The number of values to be compared is not equal");
        }
        /** @type {number} */
        var i = 0;
        for (;i < a1.length;i++) {
          var v1 = a1[i];
          var v2 = a2[i];
          if (v1.localeCompare) {
            var typeOfVar2 = v1.localeCompare(v2);
            if (0 !== typeOfVar2) {
              return typeOfVar2;
            }
          } else {
            if (v2 > v1) {
              return-1;
            }
            if (v1 > v2) {
              return 1;
            }
          }
        }
        return a.index < b.index ? -1 : 1;
      }), spy;
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/poster.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} str
     * @param {?} v
     * @param {number} prop
     * @param {Object} obj
     * @return {undefined}
     */
    module.exports = function log(str, v, prop, obj) {
      var data = {
        items : v[prop]
      };
      if (obj) {
        var key;
        for (key in obj) {
          data[key] = obj[key];
        }
      }
      if (prop === v.length - 1) {
        /** @type {boolean} */
        data.last = true;
      }
      str.postMessage(data);
      if (!data.last) {
        log(str, v, prop + 1, obj);
      }
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-live-models/util/chunker.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} uri
     * @return {?}
     */
    module.exports = function(spy, uri) {
      /**
       * @param {string} array
       * @param {number} segments
       * @return {?}
       */
      function next(array, segments) {
        segments = segments || 2;
        /** @type {Array} */
        var rv = [];
        if (null == array) {
          return rv;
        }
        var segmentLength;
        /** @type {number} */
        var minLength = Math.floor(array.length / segments);
        /** @type {number} */
        var a = array.length % segments;
        /** @type {number} */
        var i = 0;
        var l = array.length;
        /** @type {number} */
        var b = 0;
        for (;l > i;) {
          /** @type {number} */
          segmentLength = minLength;
          if (a > b) {
            segmentLength++;
          }
          rv.push(array.slice(i, i + segmentLength));
          b++;
          i += segmentLength;
        }
        return rv;
      }
      var perLine = uri || 50;
      /** @type {number} */
      var item = Math.ceil(spy.length / perLine);
      var i = next(spy, item);
      return i;
    };
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/base.js" : function(require, module) {
    var constructor = require("./node_modules/prime/index.js");
    var forOwn = require("./node_modules/mout/array/forEach.js");
    var map = require("./node_modules/mout/array/map.js");
    var filter = require("./node_modules/mout/array/filter.js");
    var makeIterator = require("./node_modules/mout/array/every.js");
    var factory = require("./node_modules/mout/array/some.js");
    /** @type {number} */
    var UID = 0;
    var cDigit = document.__counter;
    /** @type {string} */
    var queueHooks = document.__counter = (cDigit ? parseInt(cDigit, 36) + 1 : 0).toString(36);
    /** @type {string} */
    var key = "uid:" + queueHooks;
    /**
     * @param {number} el
     * @return {?}
     */
    var init = function(el) {
      return el === window ? "window" : el === document ? "document" : el === document.documentElement ? "html" : el[key] || (el[key] = (UID++).toString(36));
    };
    var statesData = {};
    var JsDiff = constructor({
      /**
       * @param {Object} obj
       * @param {Node} results
       * @return {?}
       */
      constructor : function makeArray(obj, results) {
        if (null == obj) {
          return this && this.constructor === makeArray ? new ObservableArray : null;
        }
        var data;
        var name;
        if (obj.constructor !== ObservableArray) {
          if (data = new ObservableArray, "string" == typeof obj) {
            return data.search ? (data[data.length++] = results || document, data.search(obj)) : null;
          }
          if (obj.nodeType || obj === window) {
            /** @type {Object} */
            data[data.length++] = obj;
          } else {
            if (obj.length) {
              var old = {};
              /** @type {number} */
              var key = 0;
              var id = obj.length;
              for (;id > key;key++) {
                var elements = makeArray(obj[key], results);
                if (elements && elements.length) {
                  /** @type {number} */
                  var elIdx = 0;
                  var idxEnd = elements.length;
                  for (;idxEnd > elIdx;elIdx++) {
                    var element = elements[elIdx];
                    name = init(element);
                    if (!old[name]) {
                      data[data.length++] = element;
                      /** @type {boolean} */
                      old[name] = true;
                    }
                  }
                }
              }
            }
          }
        } else {
          /** @type {Object} */
          data = obj;
        }
        return data.length ? 1 === data.length ? (name = init(data[0]), statesData[name] || (statesData[name] = data)) : data : null;
      }
    });
    var ObservableArray = constructor({
      inherits : JsDiff,
      /**
       * @return {undefined}
       */
      constructor : function() {
        /** @type {number} */
        this.length = 0;
      },
      /**
       * @return {?}
       */
      unlink : function() {
        return this.map(function(slide) {
          return delete statesData[init(slide)], slide;
        });
      },
      /**
       * @param {Function} thisv
       * @param {?} target
       * @return {?}
       */
      forEach : function(thisv, target) {
        return forOwn(this, thisv, target), this;
      },
      /**
       * @param {Function} mapper
       * @param {?} thisArg
       * @return {?}
       */
      map : function(mapper, thisArg) {
        return map(this, mapper, thisArg);
      },
      /**
       * @param {Function} expr
       * @param {?} thisObj
       * @return {?}
       */
      filter : function(expr, thisObj) {
        return filter(this, expr, thisObj);
      },
      /**
       * @param {?} thisObj
       * @param {?} opt_obj
       * @return {?}
       */
      every : function(thisObj, opt_obj) {
        return makeIterator(this, thisObj, opt_obj);
      },
      /**
       * @param {?} bind
       * @param {?} callback
       * @return {?}
       */
      some : function(bind, callback) {
        return factory(this, bind, callback);
      }
    });
    module.exports = JsDiff;
  },
  /**
   * @param {?} errorCallback
   * @param {Object} s
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/events.js" : function(errorCallback, s) {
    var view = errorCallback("./node_modules/prime/emitter.js");
    var cb = errorCallback("./node_modules/spotify-events/node_modules/elements/base.js");
    /** @type {Element} */
    var docElem = document.documentElement;
    /** @type {Function} */
    var compile = docElem.addEventListener ? function(object, name, method, deepDataAndEvents) {
      return object.addEventListener(name, method, deepDataAndEvents || false), method;
    } : function(object, name, fpNotify) {
      return object.attachEvent("on" + name, fpNotify), fpNotify;
    };
    /** @type {Function} */
    var detachEvent = docElem.removeEventListener ? function(element, event, value, capture) {
      element.removeEventListener(event, value, capture || false);
    } : function(element, event, value) {
      element.detachEvent("on" + event, value);
    };
    cb.implement({
      /**
       * @param {string} name
       * @param {Function} value
       * @param {boolean} deepDataAndEvents
       * @return {?}
       */
      on : function(name, value, deepDataAndEvents) {
        return this.forEach(function(str) {
          var ret = cb(str);
          /** @type {string} */
          var key = name + (deepDataAndEvents ? ":capture" : "");
          view.prototype.on.call(ret, key, value);
          var cache = ret._domListeners || (ret._domListeners = {});
          if (!cache[key]) {
            cache[key] = compile(str, name, function(e) {
              view.prototype.emit.call(ret, key, e || window.event, view.EMIT_SYNC);
            }, deepDataAndEvents);
          }
        });
      },
      /**
       * @param {string} event
       * @param {Function} value
       * @param {boolean} useCapture
       * @return {?}
       */
      off : function(event, value, useCapture) {
        return this.forEach(function(str) {
          var pdataOld;
          var listener;
          var self = cb(str);
          /** @type {string} */
          var i = event + (useCapture ? ":capture" : "");
          var domListeners = self._domListeners;
          var listeners = self._listeners;
          if (domListeners && ((pdataOld = domListeners[i]) && (listeners && ((listener = listeners[i]) && (view.prototype.off.call(self, i, value), !self._listeners || !self._listeners[event]))))) {
            detachEvent(str, event, pdataOld);
            delete domListeners[event];
            var l;
            for (l in domListeners) {
              return;
            }
            delete self._domListeners;
          }
        });
      },
      /**
       * @return {?}
       */
      emit : function() {
        /** @type {Arguments} */
        var args = arguments;
        return this.forEach(function(str) {
          view.prototype.emit.apply(cb(str), args);
        });
      }
    });
    s.exports = cb;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/attributes.js" : function(require, module) {
    var $ = require("./node_modules/spotify-events/node_modules/elements/base.js");
    var trim = require("./node_modules/mout/string/trim.js");
    var expect = require("./node_modules/mout/array/forEach.js");
    var getActual = require("./node_modules/mout/array/filter.js");
    var get = require("./node_modules/mout/array/indexOf.js");
    $.implement({
      /**
       * @param {string} element
       * @param {string} val
       * @return {?}
       */
      setAttribute : function(element, val) {
        return this.forEach(function(fn) {
          fn.setAttribute(element, val);
        });
      },
      /**
       * @param {string} attribute
       * @return {?}
       */
      getAttribute : function(attribute) {
        var node = this[0].getAttributeNode(attribute);
        return node && node.specified ? node.value : null;
      },
      /**
       * @param {Object} attribute
       * @return {?}
       */
      hasAttribute : function(attribute) {
        var elem = this[0];
        if (elem.hasAttribute) {
          return elem.hasAttribute(attribute);
        }
        var val = elem.getAttributeNode(attribute);
        return!(!val || !val.specified);
      },
      /**
       * @param {string} name
       * @return {?}
       */
      removeAttribute : function(name) {
        return this.forEach(function(elem) {
          var attr = elem.getAttributeNode(name);
          if (attr) {
            elem.removeAttributeNode(attr);
          }
        });
      }
    });
    var attributes = {};
    expect(["type", "value", "name", "href", "title", "id"], function(i) {
      /**
       * @param {string} val
       * @return {?}
       */
      attributes[i] = function(val) {
        return void 0 !== val ? this.forEach(function(qs) {
          /** @type {string} */
          qs[i] = val;
        }) : this[0][i];
      };
    });
    expect(["checked", "disabled", "selected"], function(key) {
      /**
       * @param {string} dataAndEvents
       * @return {?}
       */
      attributes[key] = function(dataAndEvents) {
        return void 0 !== dataAndEvents ? this.forEach(function($cookies) {
          /** @type {boolean} */
          $cookies[key] = !!dataAndEvents;
        }) : !!this[0][key];
      };
    });
    /**
     * @param {string} str
     * @return {?}
     */
    var hasClass = function(str) {
      var obj = trim(str).replace(/\s+/g, " ").split(" ");
      var cache = {};
      return getActual(obj, function(data) {
        return "" === data || cache[data] ? void 0 : cache[data] = data;
      }).sort();
    };
    /**
     * @param {string} a
     * @return {?}
     */
    attributes.className = function(a) {
      return void 0 !== a ? this.forEach(function(backgroundv) {
        backgroundv.className = hasClass(a).join(" ");
      }) : hasClass(this[0].className).join(" ");
    };
    $.implement({
      /**
       * @param {string} attribute
       * @param {number} value
       * @return {?}
       */
      attribute : function(attribute, value) {
        var iterator = attributes[attribute];
        return iterator ? iterator.call(this, value) : null != value ? this.setAttribute(attribute, value) : null === value ? this.removeAttribute(attribute) : void 0 === value ? this.getAttribute(attribute) : void 0;
      }
    });
    $.implement(attributes);
    $.implement({
      /**
       * @return {?}
       */
      check : function() {
        return this.checked(true);
      },
      /**
       * @return {?}
       */
      uncheck : function() {
        return this.checked(false);
      },
      /**
       * @return {?}
       */
      disable : function() {
        return this.disabled(true);
      },
      /**
       * @return {?}
       */
      enable : function() {
        return this.disabled(false);
      },
      /**
       * @return {?}
       */
      select : function() {
        return this.selected(true);
      },
      /**
       * @return {?}
       */
      deselect : function() {
        return this.selected(false);
      }
    });
    $.implement({
      /**
       * @return {?}
       */
      classNames : function() {
        return hasClass(this[0].className);
      },
      /**
       * @param {string} name
       * @return {?}
       */
      hasClass : function(name) {
        return get(this.classNames(), name) > -1;
      },
      /**
       * @param {string} klass
       * @return {?}
       */
      addClass : function(klass) {
        return this.forEach(function(el) {
          var cls = el.className;
          var value = hasClass(cls + " " + klass).join(" ");
          if (cls !== value) {
            el.className = value;
          }
        });
      },
      /**
       * @param {string} name
       * @return {?}
       */
      removeClass : function(name) {
        return this.forEach(function(span) {
          var comments = hasClass(span.className);
          expect(hasClass(name), function(eventName) {
            var c = get(comments, eventName);
            if (c > -1) {
              comments.splice(c, 1);
            }
          });
          span.className = comments.join(" ");
        });
      }
    });
    /**
     * @return {?}
     */
    $.prototype.toString = function() {
      var tag = this.tag();
      var id = this.id();
      var dig = this.classNames();
      var str = tag;
      return id && (str += "#" + id), dig.length && (str += "." + dig.join(".")), str;
    };
    /** @type {string} */
    var property = null == document.createElement("div").textContent ? "innerText" : "textContent";
    $.implement({
      /**
       * @return {?}
       */
      tag : function() {
        return this[0].tagName.toLowerCase();
      },
      /**
       * @param {string} h
       * @return {?}
       */
      html : function(h) {
        return void 0 !== h ? this.forEach(function(e) {
          /** @type {string} */
          e.innerHTML = h;
        }) : this[0].innerHTML;
      },
      /**
       * @param {string} value
       * @return {?}
       */
      text : function(value) {
        return void 0 !== value ? this.forEach(function(results) {
          /** @type {string} */
          results[property] = value;
        }) : this[0][property];
      },
      /**
       * @param {string} key
       * @param {Object} v
       * @return {?}
       */
      data : function(key, v) {
        switch(v) {
          case void 0:
            return this.getAttribute("data-" + key);
          case null:
            return this.removeAttribute("data-" + key);
          default:
            return this.setAttribute("data-" + key, v);
        }
      }
    });
    module.exports = $;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/insertion.js" : function(require, module) {
    var toString = require("./node_modules/spotify-events/node_modules/elements/base.js");
    toString.implement({
      /**
       * @param {Object} str
       * @return {?}
       */
      appendChild : function(str) {
        return this[0].appendChild(toString(str)[0]), this;
      },
      /**
       * @param {Object} str
       * @param {Object} actual
       * @return {?}
       */
      insertBefore : function(str, actual) {
        return this[0].insertBefore(toString(str)[0], toString(actual)[0]), this;
      },
      /**
       * @param {Object} str
       * @return {?}
       */
      removeChild : function(str) {
        return this[0].removeChild(toString(str)[0]), this;
      },
      /**
       * @param {Object} str
       * @param {Object} actual
       * @return {?}
       */
      replaceChild : function(str, actual) {
        return this[0].replaceChild(toString(str)[0], toString(actual)[0]), this;
      }
    });
    toString.implement({
      /**
       * @param {Object} str
       * @return {?}
       */
      before : function(str) {
        str = toString(str)[0];
        var obj = str.parentNode;
        return obj && this.forEach(function(select) {
          obj.insertBefore(select, str);
        }), this;
      },
      /**
       * @param {Object} str
       * @return {?}
       */
      after : function(str) {
        str = toString(str)[0];
        var nodeParent = str.parentNode;
        return nodeParent && this.forEach(function(newNode) {
          nodeParent.insertBefore(newNode, str.nextSibling);
        }), this;
      },
      /**
       * @param {Object} str
       * @return {?}
       */
      bottom : function(str) {
        return str = toString(str)[0], this.forEach(function(s) {
          str.appendChild(s);
        });
      },
      /**
       * @param {Object} str
       * @return {?}
       */
      top : function(str) {
        return str = toString(str)[0], this.forEach(function(s) {
          str.insertBefore(s, str.firstChild);
        });
      }
    });
    toString.implement({
      insert : toString.prototype.bottom,
      /**
       * @return {?}
       */
      remove : function() {
        return this.forEach(function(elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.removeChild(elem);
          }
        });
      },
      /**
       * @param {Object} str
       * @return {?}
       */
      replace : function(str) {
        return str = toString(str)[0], str.parentNode.replaceChild(this[0], str), this;
      }
    });
    module.exports = toString;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/traversal.js" : function(require, module) {
    var getName = require("./node_modules/mout/array/map.js");
    var query = require("./node_modules/spotify-events/node_modules/elements/node_modules/slick/index.js");
    var $ = require("./node_modules/spotify-events/node_modules/elements/base.js");
    /**
     * @param {string} type
     * @param {string} vvar
     * @return {?}
     */
    var formatValue = function(type, vvar) {
      return getName(query.parse(vvar || "*"), function(pageX) {
        return type + " " + pageX;
      }).join(", ");
    };
    /** @type {function (this:(Array.<T>|{length: number}), ...[T]): number} */
    var that = Array.prototype.push;
    $.implement({
      /**
       * @param {string} context
       * @return {?}
       */
      search : function(context) {
        if (1 === this.length) {
          return $(query.search(context, this[0], new $));
        }
        var callback;
        /** @type {Array} */
        var str = [];
        /** @type {number} */
        var lastIndex = 0;
        for (;callback = this[lastIndex];lastIndex++) {
          that.apply(str, query.search(context, callback));
        }
        return str = $(str), str && str.sort();
      },
      /**
       * @param {string} s
       * @return {?}
       */
      find : function(s) {
        if (1 === this.length) {
          return $(query.find(s, this[0]));
        }
        var a;
        /** @type {number} */
        var prop = 0;
        for (;a = this[prop];prop++) {
          var str = query.find(s, a);
          if (str) {
            return $(str);
          }
        }
        return null;
      },
      /**
       * @return {?}
       */
      sort : function() {
        return query.sort(this);
      },
      /**
       * @param {string} selector
       * @return {?}
       */
      matches : function(selector) {
        return query.matches(this[0], selector);
      },
      /**
       * @param {string} element
       * @return {?}
       */
      contains : function(element) {
        return query.contains(this[0], element);
      },
      /**
       * @param {string} obj
       * @return {?}
       */
      nextSiblings : function(obj) {
        return this.search(formatValue("~", obj));
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      nextSibling : function(obj) {
        return this.find(formatValue("+", obj));
      },
      /**
       * @param {string} obj
       * @return {?}
       */
      previousSiblings : function(obj) {
        return this.search(formatValue("!~", obj));
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      previousSibling : function(obj) {
        return this.find(formatValue("!+", obj));
      },
      /**
       * @param {string} obj
       * @return {?}
       */
      children : function(obj) {
        return this.search(formatValue(">", obj));
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      firstChild : function(obj) {
        return this.find(formatValue("^", obj));
      },
      /**
       * @param {string} obj
       * @return {?}
       */
      lastChild : function(obj) {
        return this.find(formatValue("!^", obj));
      },
      /**
       * @param {string} selector
       * @return {?}
       */
      parent : function(selector) {
        /** @type {Array} */
        var str = [];
        var node;
        /** @type {number} */
        var currentCharacter = 0;
        e: for (;node = this[currentCharacter];currentCharacter++) {
          for (;(node = node.parentNode) && node !== document;) {
            if (!selector || query.matches(node, selector)) {
              str.push(node);
              break e;
            }
          }
        }
        return $(str);
      },
      /**
       * @param {string} selector
       * @return {?}
       */
      parents : function(selector) {
        var node;
        /** @type {Array} */
        var str = [];
        /** @type {number} */
        var currentCharacter = 0;
        for (;node = this[currentCharacter];currentCharacter++) {
          for (;(node = node.parentNode) && node !== document;) {
            if (!selector || query.matches(node, selector)) {
              str.push(node);
            }
          }
        }
        return $(str);
      }
    });
    module.exports = $;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/delegation.js" : function(require, module) {
    var Map = require("./node_modules/prime/map.js");
    var $ = require("./node_modules/spotify-events/node_modules/elements/events.js");
    require("./node_modules/spotify-events/node_modules/elements/traversal.js");
    $.implement({
      /**
       * @param {string} type
       * @param {string} selector
       * @param {string} handle
       * @return {?}
       */
      delegate : function(type, selector, handle) {
        return this.forEach(function(str) {
          var self = $(str);
          var special = self._delegation || (self._delegation = {});
          var events = special[type] || (special[type] = {});
          var map = events[selector] || (events[selector] = new Map);
          if (!map.get(handle)) {
            /**
             * @param {Event} e
             * @return {?}
             */
            var action = function(e) {
              var res;
              var target = $(e.target || e.srcElement);
              var match = target.matches(selector) ? target : target.parent(selector);
              return match && (res = handle.call(self, e, match)), res;
            };
            map.set(handle, action);
            self.on(type, action);
          }
        });
      },
      /**
       * @param {string} event
       * @param {string} ev
       * @param {string} optgroup
       * @return {?}
       */
      undelegate : function(event, ev, optgroup) {
        return this.forEach(function(str) {
          var params;
          var _ref;
          var list;
          var self = $(str);
          if ((params = self._delegation) && ((_ref = params[event]) && (list = _ref[ev]))) {
            var method = list.get(optgroup);
            if (method) {
              self.off(event, method);
              list.remove(method);
              if (!list.count()) {
                delete _ref[ev];
              }
              var key;
              /** @type {boolean} */
              var d = true;
              /** @type {boolean} */
              var f = true;
              for (key in _ref) {
                /** @type {boolean} */
                d = false;
                break;
              }
              if (d) {
                delete params[event];
              }
              for (key in params) {
                /** @type {boolean} */
                f = false;
                break;
              }
              if (f) {
                delete self._delegation;
              }
            }
          }
        });
      }
    });
    module.exports = $;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} __exports__
   * @return {undefined}
   */
  "./node_modules/handlebars/dist/cjs/handlebars.runtime.js" : function(require, dataAndEvents, __exports__) {
    var base = require("./node_modules/handlebars/dist/cjs/handlebars/base.js");
    var SafeString = require("./node_modules/handlebars/dist/cjs/handlebars/safe-string.js")["default"];
    var Exception = require("./node_modules/handlebars/dist/cjs/handlebars/exception.js")["default"];
    var Utils = require("./node_modules/handlebars/dist/cjs/handlebars/utils.js");
    var runtime = require("./node_modules/handlebars/dist/cjs/handlebars/runtime.js");
    /**
     * @return {?}
     */
    var create = function() {
      var hb = new base.HandlebarsEnvironment;
      return Utils.extend(hb, base), hb.SafeString = SafeString, hb.Exception = Exception, hb.Utils = Utils, hb.VM = runtime, hb.template = function(spec) {
        return runtime.template(spec, hb);
      }, hb;
    };
    var Handlebars = create();
    /** @type {function (): ?} */
    Handlebars.create = create;
    __exports__["default"] = Handlebars;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-bridge-request/index.js" : function($sanitize, module) {
    var exports = $sanitize("./node_modules/quickstart-spotify/spotify-api.js").SP;
    /**
     * @param {Object} proto
     * @param {Array} attr
     * @param {?} callback
     * @return {undefined}
     */
    var compile = function(proto, attr, callback) {
      exports.request(proto, attr || [], null, function(mongoObject) {
        if (callback) {
          callback(null, mongoObject);
        }
      }, function(e) {
        /** @type {string} */
        var getter = JSON.stringify(attr);
        /** @type {string} */
        var msg = " (bridge message: '" + proto + "', args: " + getter + ")";
        /** @type {string} */
        var message = e.message + msg;
        /** @type {Error} */
        var error = new Error(message);
        error.name = e.error;
        if (callback) {
          callback(error);
        }
      });
    };
    /** @type {function (Object, Array, ?): undefined} */
    module.exports = compile;
  },
  /**
   * @param {?} dataAndEvents
   * @param {?} deepDataAndEvents
   * @param {?} result
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/message.js" : function(dataAndEvents, deepDataAndEvents, result) {
    /**
     * @param {number} err
     * @param {Object} data
     * @param {string} separator
     * @return {undefined}
     */
    function self(err, data, separator) {
      if (null == err) {
        throw new TypeError("Invalid `uri` argument for Message.");
      }
      /** @type {number} */
      this._uri = err;
      this._headers = {};
      this._body = this._encodeBody(separator || "");
      if (data) {
        this._setHeaders(data);
      }
    }
    result.Headers;
    result.Body;
    result.SerializedMessage;
    /** @type {function (number, Object, string): undefined} */
    result.Message = self;
    /**
     * @param {Object} json
     * @return {?}
     */
    self.fromObject = function(json) {
      return json && json.uri ? new self(json.uri, json.headers, json.body) : null;
    };
    /**
     * @param {Text} string
     * @return {?}
     */
    self.prototype._encodeBody = function(string) {
      return "string" != typeof string && (string = JSON.stringify(string)), string;
    };
    /**
     * @return {?}
     */
    self.prototype.getURI = function() {
      return this._uri;
    };
    /**
     * @return {?}
     */
    self.prototype.getMimeType = function() {
      return this._headers.accept;
    };
    /**
     * @param {string} name
     * @return {?}
     */
    self.prototype.getHeader = function(name) {
      return this._headers[name.toLowerCase()] || null;
    };
    /**
     * @return {?}
     */
    self.prototype.getHeaders = function() {
      var currentHeaders = this._headers;
      var result = {};
      var header;
      for (header in currentHeaders) {
        if (currentHeaders.hasOwnProperty(header)) {
          result[header] = currentHeaders[header];
        }
      }
      return result;
    };
    /**
     * @param {Object} rows
     * @return {?}
     */
    self.prototype._setHeaders = function(rows) {
      var vec = this._headers;
      var row;
      for (row in rows) {
        if (rows.hasOwnProperty(row)) {
          vec[row.toLowerCase()] = rows[row];
        }
      }
      return this;
    };
    /**
     * @return {?}
     */
    self.prototype.getBody = function() {
      return this._body;
    };
    /**
     * @return {?}
     */
    self.prototype.getJSONBody = function() {
      try {
        return JSON.parse(this._body);
      } catch (e) {
        return null;
      }
    };
    /**
     * @param {Object} methods
     * @param {?} x
     * @return {?}
     */
    self.prototype.copy = function(methods, x) {
      return new self(this._uri, this._copyHeaders(methods), "undefined" != typeof x ? x : this._body);
    };
    /**
     * @param {Object} a1
     * @return {?}
     */
    self.prototype._copyHeaders = function(a1) {
      var d;
      if (a1) {
        var p;
        var s = this._headers;
        d = {};
        for (p in s) {
          if (s.hasOwnProperty(p)) {
            d[p] = s[p];
          }
        }
        for (p in a1) {
          if (a1.hasOwnProperty(p)) {
            d[p.toLowerCase()] = a1[p];
          }
        }
      } else {
        d = this._headers;
      }
      return d;
    };
    /**
     * @return {?}
     */
    self.prototype.serialize = function() {
      return this.toJSON();
    };
    /**
     * @return {?}
     */
    self.prototype.toJSON = function() {
      return{
        uri : this._uri,
        headers : this._headers,
        body : this._body
      };
    };
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {Object} args
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/request.js" : function($sanitize, dataAndEvents, args) {
    /**
     * @param {string} arg
     * @param {string} next
     * @param {string} data
     * @param {boolean} capture
     * @return {?}
     */
    function self(arg, next, data, capture) {
      if (!(this instanceof self)) {
        return new self(arg, next, data, capture);
      }
      if (!arg) {
        throw new TypeError("Invalid `action` argument for Request.");
      }
      parent.call(this, next, data, capture);
      /** @type {string} */
      this._action = arg;
    }
    var inherit = $sanitize("./node_modules/spotify-inheritance/index.js").inherit;
    var parent = $sanitize("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/message.js").Message;
    args.Action = {
      DELETE : "DELETE",
      GET : "GET",
      HEAD : "HEAD",
      POST : "POST",
      PUT : "PUT",
      SUB : "SUB",
      PATCH : "PATCH"
    };
    args.SerializedRequest;
    inherit(self, parent);
    /** @type {function (string, string, string, boolean): ?} */
    args.Request = self;
    /**
     * @param {Object} obj
     * @return {?}
     */
    self.fromObject = function(obj) {
      return obj && (obj.action && obj.uri) ? new self(obj.action, obj.uri, obj.headers, obj.body) : null;
    };
    /**
     * @return {?}
     */
    self.prototype.getAction = function() {
      return this._action;
    };
    /**
     * @param {Object} methods
     * @param {?} x
     * @return {?}
     */
    self.prototype.copy = function(methods, x) {
      return new self(this._action, this._uri, this._copyHeaders(methods), "undefined" != typeof x ? x : this._body);
    };
    /**
     * @return {?}
     */
    self.prototype.toJSON = function() {
      return{
        action : this._action,
        uri : this._uri,
        headers : this._headers,
        body : this._body
      };
    };
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {?} data
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/response.js" : function($sanitize, dataAndEvents, data) {
    /**
     * @param {string} next
     * @param {string} value
     * @param {string} data
     * @param {boolean} capture
     * @return {?}
     */
    function self(next, value, data, capture) {
      if (!(this instanceof self)) {
        return new self(next, value, data, capture, opt_requestURI);
      }
      if ("undefined" == typeof value || null == value) {
        throw new TypeError("Invalid `status` argument for Response.");
      }
      parent.call(this, next, data, capture);
      /** @type {string} */
      this._status = value;
    }
    var inherit = $sanitize("./node_modules/spotify-inheritance/index.js").inherit;
    var parent = $sanitize("./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/message.js").Message;
    data.StatusCode = {
      OK : 200,
      CREATED : 201,
      ACCEPTED : 202,
      BAD_REQUEST : 400,
      UNAUTHORIZED : 401,
      FORBIDDEN : 403,
      NOT_FOUND : 404,
      METHOD_NOT_ALLOWED : 405,
      TIMED_OUT : 408,
      CONFLICT : 409,
      GONE : 410,
      INTERNAL_SERVER_ERROR : 500,
      NOT_IMPLEMENTED : 501,
      BAD_GATEWAY : 502,
      SERVICE_UNAVAILABLE : 503,
      ERROR_UNKNOWN : -100,
      ERROR_ALLOCATION_FAILED : -101,
      ERROR_INVALID_ENCODING : -102,
      ERROR_INFINITE_LOOP : -103,
      ERROR_RESOLVER_NOT_FOUND : -104
    };
    data.SerializedResponse;
    inherit(self, parent);
    /** @type {function (string, string, string, boolean): ?} */
    data.Response = self;
    /**
     * @param {Object} obj
     * @return {?}
     */
    self.fromObject = function(obj) {
      return obj && (obj.uri && obj.status) ? new self(obj.uri, obj.status, obj.headers, obj.body) : null;
    };
    /**
     * @return {?}
     */
    self.prototype.getMimeType = function() {
      return this._headers["content-type"];
    };
    /**
     * @return {?}
     */
    self.prototype.getStatusCode = function() {
      return this._status;
    };
    /**
     * @param {Object} methods
     * @param {?} x
     * @return {?}
     */
    self.prototype.copy = function(methods, x) {
      return new self(this._uri, this._status, this._copyHeaders(methods), "undefined" != typeof x ? x : this._body);
    };
    /**
     * @return {?}
     */
    self.prototype.toJSON = function() {
      return{
        uri : this._uri,
        status : this._status,
        headers : this._headers,
        body : this._body
      };
    };
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {?} responder
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/node_modules/cosmos-common-js/src/player_state.js" : function($sanitize, dataAndEvents, responder) {
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function handler(options) {
      me.call(this, ["action", "context", "tracks", "index", "playing", "loading", "track", "position", "duration", "volume", "options", "play_origin", "next_page_url", "prev_page_url"]);
      options = options || {};
      this.action = options.action;
      this.context = options.context;
      this.tracks = options.tracks;
      this.index = options.index;
      this.playing = options.playing;
      this.loading = options.loading;
      this.track = options.track;
      this.position = options.position;
      this.volume = options.volume;
      this.duration = options.duration;
      this.options = new run(options.options);
      this.play_origin = new callback(options.play_origin);
      this.next_page_url = options.next_page_url;
      this.prev_page_url = options.prev_page_url;
    }
    /**
     * @param {Object} details
     * @return {undefined}
     */
    function callback(details) {
      me.call(this, ["source", "source_context", "reason", "referrer", "referrer_version", "referrer_vendor"]);
      details = details || {};
      this.source = details.source || "unknown";
      this.source_context = details.source_context || "unknown";
      this.reason = details.reason || "unknown";
      this.referrer = details.referrer || "unknown";
      this.referrer_version = details.referrer_version || "unknown";
      this.referrer_vendor = details.referrer_vendor || "unknown";
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function run(options) {
      me.call(this, ["repeat", "shuffle", "can_repeat", "can_shuffle", "can_skip_prev", "can_skip_next", "can_seek", "use_dmca_rules"]);
      options = options || {};
      this.repeat = void 0 !== options.repeat ? options.repeat : false;
      this.shuffle = void 0 !== options.shuffle ? options.shuffle : false;
      this.can_repeat = void 0 !== options.can_repeat ? options.can_repeat : true;
      this.can_shuffle = void 0 !== options.can_shuffle ? options.can_shuffle : true;
      this.can_skip_prev = void 0 !== options.can_skip_prev ? options.can_skip_prev : true;
      this.can_skip_next = void 0 !== options.can_skip_next ? options.can_skip_next : true;
      this.can_seek = void 0 !== options.can_seek ? options.can_seek : true;
      this.use_dmca_rules = void 0 !== options.use_dmca_rules ? options.use_dmca_rules : false;
    }
    /**
     * @param {Array} e
     * @return {undefined}
     */
    function me(e) {
      this._props = e || [];
    }
    var bind = $sanitize("./node_modules/spotify-inheritance/index.js").inherit;
    bind(handler, me);
    /**
     * @return {?}
     */
    handler.prototype.serialize = function() {
      return!this.options || (this.options instanceof run || (this.options = new run(this.options))), !this.play_origin || (this.play_origin instanceof callback || (this.play_origin = new callback(this.play_origin))), this.constructor.prototype.serialize.call(this);
    };
    handler.ACTIONS = {
      UNKNOWN : "unknown",
      PLAY : "play",
      UPDATE : "update",
      STOP : "stop",
      RESUME : "resume",
      PAUSE : "pause",
      SKIP_PREV : "skip_prev",
      SKIP_NEXT : "skip_next"
    };
    bind(callback, me);
    bind(run, me);
    /**
     * @return {?}
     */
    me.prototype.serialize = function() {
      var id;
      var msg = {};
      /** @type {number} */
      var prop = 0;
      var cnl = this._props.length;
      for (;cnl > prop;prop++) {
        id = this._props[prop];
        if (void 0 !== this[id]) {
          msg[id] = this[id] instanceof me ? this[id].serialize() : this[id];
        }
      }
      return msg;
    };
    /** @type {function (Object): undefined} */
    responder.PlayerState = handler;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {?} node
   * @return {undefined}
   */
  "./node_modules/spotify-player/lib/v1/index.js" : function(require, dataAndEvents, node) {
    node.Player = require("./node_modules/spotify-player/lib/v1/player.js").Player;
    node.PlayerState = require("./node_modules/spotify-player/lib/v1/state.js").PlayerState;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/object/hasOwn.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {?} prop
     * @return {?}
     */
    function hasOwn(spy, prop) {
      return Object.prototype.hasOwnProperty.call(spy, prop);
    }
    /** @type {function (Object, ?): ?} */
    module.exports = hasOwn;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/lang/createObject.js" : function($sanitize, module) {
    /**
     * @param {Object} spy
     * @param {?} attr
     * @return {?}
     */
    function create(spy, attr) {
      /**
       * @return {undefined}
       */
      function Type() {
      }
      return Type.prototype = spy, createEl(new Type, attr);
    }
    var createEl = $sanitize("./node_modules/mout/object/mixIn.js");
    /** @type {function (Object, ?): ?} */
    module.exports = create;
  },
  /**
   * @param {?} every
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/unique.js" : function(every, module) {
    /**
     * @param {Object} spy
     * @param {Function} attr
     * @return {?}
     */
    function create(spy, attr) {
      return attr = attr || id, check(spy, function(deepDataAndEvents, key, tokens) {
        var nTokens = tokens.length;
        for (;++key < nTokens;) {
          if (attr(deepDataAndEvents, tokens[key])) {
            return false;
          }
        }
        return true;
      });
    }
    /**
     * @param {?} deepDataAndEvents
     * @param {?} e
     * @return {?}
     */
    function id(deepDataAndEvents, e) {
      return deepDataAndEvents === e;
    }
    var check = every("./node_modules/mout/array/filter.js");
    /** @type {function (Object, Function): ?} */
    module.exports = create;
  },
  /**
   * @param {?} format
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/some.js" : function(format, module) {
    /**
     * @param {Object} spy
     * @param {?} fn
     * @param {?} scope
     * @return {?}
     */
    function filter(spy, fn, scope) {
      fn = f(fn, scope);
      /** @type {boolean} */
      var event = false;
      if (null == spy) {
        return event;
      }
      /** @type {number} */
      var i = -1;
      var l = spy.length;
      for (;++i < l;) {
        if (fn(spy[i], i, spy)) {
          /** @type {boolean} */
          event = true;
          break;
        }
      }
      return event;
    }
    var f = format("./node_modules/mout/function/makeIterator_.js");
    /** @type {function (Object, ?, ?): ?} */
    module.exports = filter;
  },
  /**
   * @param {?} format
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/array/every.js" : function(format, module) {
    /**
     * @param {Object} spy
     * @param {?} v
     * @param {?} scope
     * @return {?}
     */
    function create(spy, v, scope) {
      v = f(v, scope);
      /** @type {boolean} */
      var els = true;
      if (null == spy) {
        return els;
      }
      /** @type {number} */
      var b = -1;
      var nodeListLen = spy.length;
      for (;++b < nodeListLen;) {
        if (!v(spy[b], b, spy)) {
          /** @type {boolean} */
          els = false;
          break;
        }
      }
      return els;
    }
    var f = format("./node_modules/mout/function/makeIterator_.js");
    /** @type {function (Object, ?, ?): ?} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {?} args
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/env/request.js" : function(require, dataAndEvents, args) {
    /**
     * @param {?} err
     * @param {?} key
     * @param {?} name
     * @param {Function} val
     * @param {?} count
     * @return {undefined}
     */
    function self(err, key, name, val, count) {
      this._requestId = key;
      this._resolver = err;
      this._requestData = name;
      /** @type {Function} */
      this._successCallback = val;
      this._errorCallback = count;
      /** @type {string} */
      this._status = self.status.INITIALIZED;
    }
    var getActual = require("./node_modules/spotify-cosmos-api/node_modules/spotify-deferred/src/deferred.js");
    /** @type {function (?, ?, ?, Function, ?): undefined} */
    args.ClientRequest = self;
    self.status = {
      INITIALIZED : "INITIALIZED",
      CLOSED : "CLOSED",
      OPEN : "OPEN"
    };
    self.messages = {
      OPEN : "cosmos_request_create",
      PULL : "cosmos_request_pull",
      CLOSE : "cosmos_request_cancel"
    };
    /**
     * @return {undefined}
     */
    self.prototype.open = function() {
      if (this._status === self.status.INITIALIZED) {
        /** @type {string} */
        this._status = self.status.OPEN;
        this._sendRequest(self.messages.OPEN, this._requestData);
      }
    };
    /**
     * @return {?}
     */
    self.prototype.pull = function() {
      return this._status === self.status.OPEN && this._sendRequest(self.messages.PULL, this._requestData), this._status;
    };
    /**
     * @return {undefined}
     */
    self.prototype.close = function() {
      if (this._status === self.status.OPEN) {
        this._status = self.status.CLOSE;
        this._sendRequest(self.messages.CLOSE);
      }
    };
    /**
     * @return {undefined}
     */
    self.prototype.onClose = function() {
    };
    /**
     * @param {string} opt_attributes
     * @param {?} callback
     * @return {undefined}
     */
    self.prototype._sendRequest = function(opt_attributes, callback) {
      this._resolver._sendRequest(opt_attributes, this._requestId, callback || {});
    };
    /**
     * @param {string} response
     * @param {Object} data
     * @return {?}
     */
    self.prototype._handleResponse = function(response, data) {
      var callback;
      if (data) {
        data.status;
      }
      return response === self.messages.CLOSE ? (this._successCallback = null, this._errorCallback = null, this._requestData = null, void this.onClose(this._requestId)) : (callback = this._successCallback, callback = "function" == typeof callback ? callback : function() {
      }, void getActual(callback.bind(this, data)));
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/time/now.js" : function(dataAndEvents, module) {
    /**
     * @return {?}
     */
    function css() {
      return css.get();
    }
    /** @type {Function} */
    css.get = "function" == typeof Date.now ? Date.now : function() {
      return+new Date;
    };
    /** @type {function (): ?} */
    module.exports = css;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/function/makeIterator_.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {?} el
     * @return {?}
     */
    function makeIterator(spy, el) {
      if (null == spy) {
        return Block;
      }
      switch(typeof spy) {
        case "function":
          return "undefined" != typeof el ? function(mapper, arg2, capture) {
            return spy.call(el, mapper, arg2, capture);
          } : spy;
        case "object":
          return function(val) {
            return deepMatches(val, spy);
          };
        case "string":
        ;
        case "number":
          return expect(spy);
      }
    }
    var Block = require("./node_modules/mout/function/identity.js");
    var expect = require("./node_modules/mout/function/prop.js");
    var deepMatches = require("./node_modules/mout/object/deepMatches.js");
    /** @type {function (Object, ?): ?} */
    module.exports = makeIterator;
  },
  /**
   * @param {?} globalEval
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/collection/forEach.js" : function(globalEval, module) {
    var factory = globalEval("./node_modules/mout/collection/make_.js");
    var require = globalEval("./node_modules/mout/array/forEach.js");
    var backbone = globalEval("./node_modules/mout/object/forOwn.js");
    module.exports = factory(require, backbone);
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/collection/map.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {?} fn
     * @param {?} options
     * @return {?}
     */
    function create(spy, fn, options) {
      return fn = func(fn, options), check(spy) && (null == spy.length && (spy = forOwn(spy))), newElement(spy, function(err, partials, xs) {
        return fn(err, partials, xs);
      });
    }
    var check = require("./node_modules/mout/lang/isObject.js");
    var forOwn = require("./node_modules/mout/object/values.js");
    var newElement = require("./node_modules/mout/array/map.js");
    var func = require("./node_modules/mout/function/makeIterator_.js");
    /** @type {function (Object, ?, ?): ?} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/node_modules/spotify-deferred/src/deferred.js" : function(require, module) {
    /**
     * @return {undefined}
     */
    function runCallbacks() {
      /** @type {Array.<?>} */
      var employees = collection.splice(0);
      if (employees.length) {
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var l = employees.length;
        for (;l > i;i++) {
          try {
            employees[i]();
          } finally {
          }
        }
      }
    }
    var player = require("./node_modules/spotify-cosmos-api/node_modules/spotify-deferred/node_modules/spotify-postrouter/src/postrouter.js");
    /** @type {Array} */
    var collection = [];
    /**
     * @return {undefined}
     */
    var addErrorMessage = function() {
      player.sendMessage("execute_deferreds");
    };
    player.addMessageHandler("execute_deferreds", runCallbacks);
    /**
     * @param {Object} spy
     * @return {undefined}
     */
    var spy = function(spy) {
      /** @type {boolean} */
      var t = !collection.length;
      collection.push(spy);
      if (t) {
        addErrorMessage();
      }
    };
    /** @type {function (Object): undefined} */
    module.exports = spy;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} __exports__
   * @return {undefined}
   */
  "./node_modules/handlebars/dist/cjs/handlebars/base.js" : function(require, dataAndEvents, __exports__) {
    /**
     * @param {Object} helpers
     * @param {Object} partials
     * @return {undefined}
     */
    function HandlebarsEnvironment(helpers, partials) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      registerDefaultHelpers(this);
    }
    /**
     * @param {Object} instance
     * @return {undefined}
     */
    function registerDefaultHelpers(instance) {
      instance.registerHelper("helperMissing", function(dataAndEvents) {
        if (2 === arguments.length) {
          return void 0;
        }
        throw new Exception("Missing helper: '" + dataAndEvents + "'");
      });
      instance.registerHelper("blockHelperMissing", function(str, options) {
        var inverse = options.inverse || function() {
        };
        var fn = options.fn;
        return isFunction(str) && (str = str.call(this)), str === true ? fn(this) : str === false || null == str ? inverse(this) : unCamelCase(str) ? str.length > 0 ? instance.helpers.each(str, options) : inverse(this) : fn(str);
      });
      instance.registerHelper("each", function(str, options) {
        var data;
        var fn = options.fn;
        var inverse = options.inverse;
        /** @type {number} */
        var i = 0;
        /** @type {string} */
        var ret = "";
        if (isFunction(str) && (str = str.call(this)), options.data && (data = createFrame(options.data)), str && "object" == typeof str) {
          if (unCamelCase(str)) {
            var len = str.length;
            for (;len > i;i++) {
              if (data) {
                /** @type {number} */
                data.index = i;
                /** @type {boolean} */
                data.first = 0 === i;
                /** @type {boolean} */
                data.last = i === str.length - 1;
              }
              ret += fn(str[i], {
                data : data
              });
            }
          } else {
            var key;
            for (key in str) {
              if (str.hasOwnProperty(key)) {
                if (data) {
                  /** @type {string} */
                  data.key = key;
                  /** @type {number} */
                  data.index = i;
                  /** @type {boolean} */
                  data.first = 0 === i;
                }
                ret += fn(str[key], {
                  data : data
                });
                i++;
              }
            }
          }
        }
        return 0 === i && (ret = inverse(this)), ret;
      });
      instance.registerHelper("if", function(a, options) {
        return isFunction(a) && (a = a.call(this)), !options.hash.includeZero && !a || Utils.isEmpty(a) ? options.inverse(this) : options.fn(this);
      });
      instance.registerHelper("unless", function(mapper, options) {
        return instance.helpers["if"].call(this, mapper, {
          fn : options.inverse,
          inverse : options.fn,
          hash : options.hash
        });
      });
      instance.registerHelper("with", function(a, options) {
        return isFunction(a) && (a = a.call(this)), Utils.isEmpty(a) ? void 0 : options.fn(a);
      });
      instance.registerHelper("log", function(context, options) {
        /** @type {number} */
        var level = options.data && null != options.data.level ? parseInt(options.data.level, 10) : 1;
        instance.log(level, context);
      });
    }
    /**
     * @param {number} level
     * @param {?} obj
     * @return {undefined}
     */
    function log(level, obj) {
      logger.log(level, obj);
    }
    var Utils = require("./node_modules/handlebars/dist/cjs/handlebars/utils.js");
    var Exception = require("./node_modules/handlebars/dist/cjs/handlebars/exception.js")["default"];
    /** @type {string} */
    var VERSION = "1.3.0";
    /** @type {string} */
    __exports__.VERSION = VERSION;
    /** @type {number} */
    var COMPILER_REVISION = 4;
    /** @type {number} */
    __exports__.COMPILER_REVISION = COMPILER_REVISION;
    var REVISION_CHANGES = {
      1 : "<= 1.0.rc.2",
      2 : "== 1.0.0-rc.3",
      3 : "== 1.0.0-rc.4",
      4 : ">= 1.0.0"
    };
    __exports__.REVISION_CHANGES = REVISION_CHANGES;
    var unCamelCase = Utils.isArray;
    var isFunction = Utils.isFunction;
    var toString = Utils.toString;
    /** @type {string} */
    var objectType = "[object Object]";
    /** @type {function (Object, Object): undefined} */
    __exports__.HandlebarsEnvironment = HandlebarsEnvironment;
    HandlebarsEnvironment.prototype = {
      /** @type {function (Object, Object): undefined} */
      constructor : HandlebarsEnvironment,
      logger : logger,
      /** @type {function (number, ?): undefined} */
      log : log,
      /**
       * @param {string} name
       * @param {Function} fn
       * @param {Function} inverse
       * @return {undefined}
       */
      registerHelper : function(name, fn, inverse) {
        if (toString.call(name) === objectType) {
          if (inverse || fn) {
            throw new Exception("Arg not supported with multiple helpers");
          }
          Utils.extend(this.helpers, name);
        } else {
          if (inverse) {
            /** @type {Function} */
            fn.not = inverse;
          }
          /** @type {Function} */
          this.helpers[name] = fn;
        }
      },
      /**
       * @param {string} name
       * @param {?} str
       * @return {undefined}
       */
      registerPartial : function(name, str) {
        if (toString.call(name) === objectType) {
          Utils.extend(this.partials, name);
        } else {
          this.partials[name] = str;
        }
      }
    };
    var logger = {
      methodMap : {
        0 : "debug",
        1 : "info",
        2 : "warn",
        3 : "error"
      },
      DEBUG : 0,
      INFO : 1,
      WARN : 2,
      ERROR : 3,
      level : 3,
      /**
       * @param {number} level
       * @param {?} obj
       * @return {undefined}
       */
      log : function(level, obj) {
        if (logger.level <= level) {
          var method = logger.methodMap[level];
          if ("undefined" != typeof console) {
            if (console[method]) {
              console[method].call(console, obj);
            }
          }
        }
      }
    };
    __exports__.logger = logger;
    /** @type {function (number, ?): undefined} */
    __exports__.log = log;
    /**
     * @param {Object} object
     * @return {?}
     */
    var createFrame = function(object) {
      var ret = {};
      return Utils.extend(ret, object), ret;
    };
    /** @type {function (Object): ?} */
    __exports__.createFrame = createFrame;
  },
  /**
   * @param {?} dataAndEvents
   * @param {?} deepDataAndEvents
   * @param {Object} __exports__
   * @return {undefined}
   */
  "./node_modules/handlebars/dist/cjs/handlebars/safe-string.js" : function(dataAndEvents, deepDataAndEvents, __exports__) {
    /**
     * @param {string} string
     * @return {undefined}
     */
    function SafeString(string) {
      /** @type {string} */
      this.string = string;
    }
    /**
     * @return {?}
     */
    SafeString.prototype.toString = function() {
      return "" + this.string;
    };
    /** @type {function (string): undefined} */
    __exports__["default"] = SafeString;
  },
  /**
   * @param {?} dataAndEvents
   * @param {?} deepDataAndEvents
   * @param {Object} __exports__
   * @return {undefined}
   */
  "./node_modules/handlebars/dist/cjs/handlebars/exception.js" : function(dataAndEvents, deepDataAndEvents, __exports__) {
    /**
     * @param {string} message
     * @param {Object} node
     * @return {undefined}
     */
    function Exception(message, node) {
      var line;
      if (node) {
        if (node.firstLine) {
          line = node.firstLine;
          message += " - " + line + ":" + node.firstColumn;
        }
      }
      var tmp = Error.prototype.constructor.call(this, message);
      /** @type {number} */
      var idx = 0;
      for (;idx < errorProps.length;idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }
      if (line) {
        this.lineNumber = line;
        this.column = node.firstColumn;
      }
    }
    /** @type {Array} */
    var errorProps = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
    /** @type {Error} */
    Exception.prototype = new Error;
    /** @type {function (string, Object): undefined} */
    __exports__["default"] = Exception;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Object} __exports__
   * @return {undefined}
   */
  "./node_modules/handlebars/dist/cjs/handlebars/utils.js" : function(require, dataAndEvents, __exports__) {
    /**
     * @param {?} key
     * @return {?}
     */
    function index(key) {
      return $cookies[key] || "&amp;";
    }
    /**
     * @param {?} obj
     * @param {Object} value
     * @return {undefined}
     */
    function extend(obj, value) {
      var key;
      for (key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          obj[key] = value[key];
        }
      }
    }
    /**
     * @param {string} value
     * @return {?}
     */
    function filter(value) {
      return value instanceof Promise ? value.toString() : value || 0 === value ? (value = "" + value, rchecked.test(value) ? value.replace(r20, index) : value) : "";
    }
    /**
     * @param {Object} str
     * @return {?}
     */
    function isEmpty(str) {
      return str || 0 === str ? isArray(str) && 0 === str.length ? true : false : true;
    }
    var Promise = require("./node_modules/handlebars/dist/cjs/handlebars/safe-string.js")["default"];
    var $cookies = {
      "&" : "&amp;",
      "<" : "&lt;",
      ">" : "&gt;",
      '"' : "&quot;",
      "'" : "&#x27;",
      "`" : "&#x60;"
    };
    /** @type {RegExp} */
    var r20 = /[&<>"'`]/g;
    /** @type {RegExp} */
    var rchecked = /[&<>"'`]/;
    /** @type {function (?, Object): undefined} */
    __exports__.extend = extend;
    /** @type {function (this:*): string} */
    var toString = Object.prototype.toString;
    /** @type {function (this:*): string} */
    __exports__.toString = toString;
    /**
     * @param {Object} obj
     * @return {?}
     */
    var isFunction = function(obj) {
      return "function" == typeof obj;
    };
    if (isFunction(/x/)) {
      /**
       * @param {Object} obj
       * @return {?}
       */
      isFunction = function(obj) {
        return "function" == typeof obj && "[object Function]" === toString.call(obj);
      };
    }
    /** @type {function (Object): ?} */
    __exports__.isFunction = isFunction;
    /** @type {function (*): boolean} */
    var isArray = Array.isArray || function(spy) {
      return spy && "object" == typeof spy ? "[object Array]" === toString.call(spy) : false;
    };
    /** @type {function (*): boolean} */
    __exports__.isArray = isArray;
    /** @type {function (string): ?} */
    __exports__.escapeExpression = filter;
    /** @type {function (Object): ?} */
    __exports__.isEmpty = isEmpty;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {Array} __exports__
   * @return {undefined}
   */
  "./node_modules/handlebars/dist/cjs/handlebars/runtime.js" : function(require, dataAndEvents, __exports__) {
    /**
     * @param {Object} compilerInfo
     * @return {undefined}
     */
    function checkRevision(compilerInfo) {
      var unlock = compilerInfo && compilerInfo[0] || 1;
      var revision = COMPILER_REVISION;
      if (unlock !== revision) {
        if (revision > unlock) {
          var versions = REVISION_CHANGES[revision];
          var cache = REVISION_CHANGES[unlock];
          throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + versions + ") or downgrade your runtime to an older version (" + cache + ").");
        }
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
      }
    }
    /**
     * @param {Function} templateSpec
     * @param {Object} env
     * @return {?}
     */
    function template(templateSpec, env) {
      if (!env) {
        throw new Exception("No environment passed to template");
      }
      /**
       * @param {?} partial
       * @param {string} name
       * @param {Object} context
       * @param {Object} helpers
       * @param {Object} partials
       * @param {Object} data
       * @return {?}
       */
      var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
        var result = env.VM.invokePartial.apply(this, arguments);
        if (null != result) {
          return result;
        }
        if (env.compile) {
          var options = {
            helpers : helpers,
            partials : partials,
            data : data
          };
          return partials[name] = env.compile(partial, {
            data : void 0 !== data
          }, env), partials[name](context, options);
        }
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      };
      var container = {
        escapeExpression : Utils.escapeExpression,
        /** @type {function (?, string, Object, Object, Object, Object): ?} */
        invokePartial : invokePartialWrapper,
        programs : [],
        /**
         * @param {number} expectedNumberOfNonCommentArgs
         * @param {Function} fn
         * @param {Object} data
         * @return {?}
         */
        program : function(expectedNumberOfNonCommentArgs, fn, data) {
          var programWrapper = this.programs[expectedNumberOfNonCommentArgs];
          return data ? programWrapper = program(expectedNumberOfNonCommentArgs, fn, data) : programWrapper || (programWrapper = this.programs[expectedNumberOfNonCommentArgs] = program(expectedNumberOfNonCommentArgs, fn)), programWrapper;
        },
        /**
         * @param {Object} param
         * @param {Object} common
         * @return {?}
         */
        merge : function(param, common) {
          var ret = param || common;
          return param && (common && (param !== common && (ret = {}, Utils.extend(ret, common), Utils.extend(ret, param)))), ret;
        },
        programWithDepth : env.VM.programWithDepth,
        noop : env.VM.noop,
        compilerInfo : null
      };
      return function(context, options) {
        options = options || {};
        var helpers;
        var partials;
        var namespace = options.partial ? options : env;
        if (!options.partial) {
          helpers = options.helpers;
          partials = options.partials;
        }
        var result = templateSpec.call(container, namespace, context, helpers, partials, options.data);
        return options.partial || env.VM.checkRevision(container.compilerInfo), result;
      };
    }
    /**
     * @param {Function} i
     * @param {Function} fn
     * @param {?} data
     * @return {?}
     */
    function programWithDepth(i, fn, data) {
      /** @type {Array.<?>} */
      var args = Array.prototype.slice.call(arguments, 3);
      /**
       * @param {?} context
       * @param {Object} options
       * @return {?}
       */
      var program = function(context, options) {
        return options = options || {}, fn.apply(this, [context, options.data || data].concat(args));
      };
      return program.program = i, program.depth = args.length, program;
    }
    /**
     * @param {number} expectedNumberOfNonCommentArgs
     * @param {Function} fn
     * @param {Object} data
     * @return {?}
     */
    function program(expectedNumberOfNonCommentArgs, fn, data) {
      /**
       * @param {?} context
       * @param {Object} options
       * @return {?}
       */
      var program = function(context, options) {
        return options = options || {}, fn(context, options.data || data);
      };
      return program.program = expectedNumberOfNonCommentArgs, program.depth = 0, program;
    }
    /**
     * @param {number} current
     * @param {string} context
     * @param {Object} me
     * @param {Object} helpers
     * @param {Function} partials
     * @param {Object} data
     * @return {?}
     */
    function invokePartial(current, context, me, helpers, partials, data) {
      var settings = {
        partial : true,
        helpers : helpers,
        /** @type {Function} */
        partials : partials,
        data : data
      };
      if (void 0 === current) {
        throw new Exception("The partial " + context + " could not be found");
      }
      return current instanceof Function ? current(me, settings) : void 0;
    }
    /**
     * @return {?}
     */
    function noop() {
      return "";
    }
    var Utils = require("./node_modules/handlebars/dist/cjs/handlebars/utils.js");
    var Exception = require("./node_modules/handlebars/dist/cjs/handlebars/exception.js")["default"];
    var COMPILER_REVISION = require("./node_modules/handlebars/dist/cjs/handlebars/base.js").COMPILER_REVISION;
    var REVISION_CHANGES = require("./node_modules/handlebars/dist/cjs/handlebars/base.js").REVISION_CHANGES;
    /** @type {function (Object): undefined} */
    __exports__.checkRevision = checkRevision;
    /** @type {function (Function, Object): ?} */
    __exports__.template = template;
    /** @type {function (Function, Function, ?): ?} */
    __exports__.programWithDepth = programWithDepth;
    /** @type {function (number, Function, Object): ?} */
    __exports__.program = program;
    /** @type {function (number, string, Object, Object, Function, Object): ?} */
    __exports__.invokePartial = invokePartial;
    /** @type {function (): ?} */
    __exports__.noop = noop;
  },
  /**
   * @param {?} require
   * @param {?} dataAndEvents
   * @param {?} exports
   * @return {undefined}
   */
  "./node_modules/spotify-player/lib/v1/player.js" : function(require, dataAndEvents, exports) {
    /**
     * @param {?} err
     * @param {?} key
     * @param {?} value
     * @param {?} isPercent
     * @return {undefined}
     */
    function self(err, key, value, isPercent) {
      if (!(err && (key && (value && isPercent)))) {
        throw new TypeError("Missing parameters for Player");
      }
      this._resolver = err;
      this._referrer = key;
      this._referrer_version = value;
      this._referrer_vendor = isPercent;
      this._addReferrerInfo = this._addReferrerInfo.bind(this);
    }
    var request = require("./node_modules/spotify-cosmos-api/index.js");
    var RegExp = require("./node_modules/spotify-player/lib/v1/state.js").PlayerState;
    var Request = request.Request;
    var _Response = request.Response;
    var query = request.Action;
    /** @type {string} */
    var alt = "sp://player/v1/main";
    /** @type {string} */
    var t = "hm://track-resolver/v1?uri=";
    /**
     * @param {Object} name
     * @return {?}
     */
    self.stateFromUri = function(name) {
      var self = new RegExp;
      return self.tracks = [], self.context = name, self.next_page_url = /^spotify:user:[^:]+:(playlist:|starred)/.test(name) ? name : t + encodeURI(name), self;
    };
    /**
     * @param {string} attributes
     * @param {?} callback
     * @return {?}
     */
    self.prototype.play = function(attributes, callback) {
      if (!(attributes instanceof RegExp)) {
        throw new TypeError("Invalid `playerState` argument");
      }
      return attributes.action = RegExp.ACTIONS.PLAY, this._sendRequest(attributes, callback);
    };
    /**
     * @param {?} opt_attributes
     * @param {?} callback
     * @return {?}
     */
    self.prototype.update = function(opt_attributes, callback) {
      if (!(opt_attributes instanceof RegExp)) {
        throw new TypeError("Invalid `playerState` argument");
      }
      return opt_attributes.action = RegExp.ACTIONS.UPDATE, this._sendRequest(opt_attributes, callback);
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    self.prototype.stop = function(callback) {
      var attributes = new RegExp;
      return attributes.action = RegExp.ACTIONS.STOP, this._sendRequest(attributes, callback);
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    self.prototype.resume = function(callback) {
      var attributes = new RegExp;
      return attributes.action = RegExp.ACTIONS.RESUME, this._sendRequest(attributes, callback);
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    self.prototype.pause = function(callback) {
      var attributes = new RegExp;
      return attributes.action = RegExp.ACTIONS.PAUSE, this._sendRequest(attributes, callback);
    };
    /**
     * @param {?} actual
     * @return {?}
     */
    self.prototype.skipPrev = function(actual) {
      var attributes = new RegExp;
      return attributes.action = RegExp.ACTIONS.SKIP_PREV, this._sendRequest(attributes, actual);
    };
    /**
     * @param {?} actual
     * @return {?}
     */
    self.prototype.skipNext = function(actual) {
      var attributes = new RegExp;
      return attributes.action = RegExp.ACTIONS.SKIP_NEXT, this._sendRequest(attributes, actual);
    };
    /**
     * @param {string} opt_attributes
     * @param {Function} testName
     * @return {?}
     */
    self.prototype._sendRequest = function(opt_attributes, testName) {
      this._addReferrerInfo(opt_attributes);
      var attributes = new Request(query.POST, alt, null, opt_attributes.serialize());
      return this._resolver.resolve(attributes, testName);
    };
    /**
     * @param {string} opt_attributes
     * @return {?}
     */
    self.prototype._addReferrerInfo = function(opt_attributes) {
      return opt_attributes.play_origin.referrer = this._referrer, opt_attributes.play_origin.referrer_version = this._referrer_version, opt_attributes.play_origin.referrer_vendor = this._referrer_vendor, opt_attributes;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    self.prototype._parseState = function(data) {
      try {
        /** @type {*} */
        var param = JSON.parse(data);
        return param = new RegExp(param), JSON.stringify(param.serialize());
      } catch (n) {
        return data;
      }
    };
    /**
     * @param {Function} callback
     * @return {?}
     */
    self.prototype.getState = function(callback) {
      var target = this;
      var attributes = new Request(query.GET, alt);
      return this._resolver.resolve(attributes, function(basis, resp) {
        var that = resp && resp.getBody();
        if (that) {
          var value = target._parseState(that);
          resp = new _Response(resp.getURI(), resp.getStatusCode(), resp.getHeaders(), value);
        }
        if ("function" == typeof callback) {
          callback(basis, resp);
        }
      });
    };
    /**
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    self.prototype.setReferrer = function(deepDataAndEvents) {
      if (deepDataAndEvents) {
        this._referrer = deepDataAndEvents;
      }
    };
    /**
     * @param {?} opt_attributes
     * @return {?}
     */
    self.prototype.subscribe = function(opt_attributes) {
      var attributes = new Request(query.SUB, alt);
      return this._resolver.resolve(attributes, opt_attributes);
    };
    /** @type {function (?, ?, ?, ?): undefined} */
    exports.Player = self;
  },
  /**
   * @param {?} $sanitize
   * @param {?} dataAndEvents
   * @param {?} responder
   * @return {undefined}
   */
  "./node_modules/spotify-player/lib/v1/state.js" : function($sanitize, dataAndEvents, responder) {
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function handler(options) {
      self.call(this, ["action", "context", "tracks", "index", "playing", "loading", "track", "position", "duration", "volume", "options", "play_origin", "next_page_url", "prev_page_url"]);
      options = options || {};
      this.action = options.action;
      this.context = options.context;
      this.tracks = options.tracks;
      this.index = options.index;
      this.playing = options.playing;
      this.loading = options.loading;
      this.track = options.track;
      this.position = options.position;
      this.volume = options.volume;
      this.duration = options.duration;
      this.options = new format(options.options);
      this.play_origin = new callback(options.play_origin);
      this.next_page_url = options.next_page_url;
      this.prev_page_url = options.prev_page_url;
    }
    /**
     * @param {Object} details
     * @return {undefined}
     */
    function callback(details) {
      self.call(this, ["source", "reason", "referrer", "referrer_version", "referrer_vendor"]);
      details = details || {};
      this.source = details.source || "unknown";
      this.reason = details.reason || "unknown";
      this.referrer = details.referrer || "unknown";
      this.referrer_version = details.referrer_version || "unknown";
      this.referrer_vendor = details.referrer_vendor || "unknown";
    }
    /**
     * @param {Object} options
     * @return {undefined}
     */
    function format(options) {
      self.call(this, ["repeat", "shuffle", "can_repeat", "can_shuffle", "can_skip_prev", "can_skip_next", "can_seek", "use_dmca_rules"]);
      options = options || {};
      this.repeat = void 0 !== options.repeat ? options.repeat : false;
      this.shuffle = void 0 !== options.shuffle ? options.shuffle : false;
      this.can_repeat = void 0 !== options.can_repeat ? options.can_repeat : true;
      this.can_shuffle = void 0 !== options.can_shuffle ? options.can_shuffle : true;
      this.can_skip_prev = void 0 !== options.can_skip_prev ? options.can_skip_prev : true;
      this.can_skip_next = void 0 !== options.can_skip_next ? options.can_skip_next : true;
      this.can_seek = void 0 !== options.can_seek ? options.can_seek : true;
      this.use_dmca_rules = void 0 !== options.use_dmca_rules ? options.use_dmca_rules : false;
    }
    /**
     * @param {Array} err
     * @return {undefined}
     */
    function self(err) {
      this._props = err || [];
    }
    var isArray = $sanitize("./node_modules/spotify-inheritance/inherit.js");
    isArray(handler, self);
    /**
     * @return {?}
     */
    handler.prototype.serialize = function() {
      return!this.options || (this.options instanceof format || (this.options = new format(this.options))), !this.play_origin || (this.play_origin instanceof callback || (this.play_origin = new callback(this.play_origin))), self.prototype.serialize.call(this);
    };
    handler.ACTIONS = {
      UNKNOWN : "unknown",
      PLAY : "play",
      UPDATE : "update",
      STOP : "stop",
      RESUME : "resume",
      PAUSE : "pause",
      SKIP_PREV : "skip_prev",
      SKIP_NEXT : "skip_next"
    };
    isArray(callback, self);
    isArray(format, self);
    /**
     * @return {?}
     */
    self.prototype.serialize = function() {
      var id;
      var msg = {};
      /** @type {number} */
      var prop = 0;
      var cnl = this._props.length;
      for (;cnl > prop;prop++) {
        id = this._props[prop];
        if (void 0 !== this[id]) {
          msg[id] = this[id] instanceof self ? this[id].serialize() : this[id];
        }
      }
      return msg;
    };
    /** @type {function (Object): undefined} */
    responder.PlayerState = handler;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/prime/map.js" : function($sanitize, module) {
    var indexOf = $sanitize("./node_modules/mout/array/indexOf.js");
    var _jqueryExtend = $sanitize("./node_modules/prime/index.js");
    var Collection = _jqueryExtend({
      /**
       * @return {undefined}
       */
      constructor : function() {
        /** @type {number} */
        this.length = 0;
        /** @type {Array} */
        this._values = [];
        /** @type {Array} */
        this._keys = [];
      },
      /**
       * @param {string} key
       * @param {Function} value
       * @return {?}
       */
      set : function(key, value) {
        var index = indexOf(this._keys, key);
        return-1 === index ? (this._keys.push(key), this._values.push(value), this.length++) : this._values[index] = value, this;
      },
      /**
       * @param {string} name
       * @return {?}
       */
      get : function(name) {
        var index = indexOf(this._keys, name);
        return-1 === index ? null : this._values[index];
      },
      /**
       * @return {?}
       */
      count : function() {
        return this.length;
      },
      /**
       * @param {Function} method
       * @param {Function} obj
       * @return {?}
       */
      forEach : function(method, obj) {
        /** @type {number} */
        var i = 0;
        var l = this.length;
        for (;l > i && method.call(obj, this._values[i], this._keys[i], this) !== false;i++) {
        }
        return this;
      },
      /**
       * @param {Function} fn
       * @param {Function} bind
       * @return {?}
       */
      map : function(fn, bind) {
        var results = new Collection;
        return this.forEach(function(value, key) {
          results.set(key, fn.call(bind, value, key, this));
        }, this), results;
      },
      /**
       * @param {Function} fn
       * @param {Function} bind
       * @return {?}
       */
      filter : function(fn, bind) {
        var ret = new Collection;
        return this.forEach(function(val, key) {
          if (fn.call(bind, val, key, this)) {
            ret.set(key, val);
          }
        }, this), ret;
      },
      /**
       * @param {Function} fn
       * @param {Function} elems
       * @return {?}
       */
      every : function(fn, elems) {
        /** @type {boolean} */
        var name = true;
        return this.forEach(function(i, index) {
          return fn.call(elems, i, index, this) ? void 0 : name = false;
        }, this), name;
      },
      /**
       * @param {Function} fn
       * @param {Function} bind
       * @return {?}
       */
      some : function(fn, bind) {
        /** @type {boolean} */
        var n = false;
        return this.forEach(function(Class, index) {
          return fn.call(bind, Class, index, this) ? !(n = true) : void 0;
        }, this), n;
      },
      /**
       * @param {string} obj
       * @return {?}
       */
      indexOf : function(obj) {
        var index = indexOf(this._values, obj);
        return index > -1 ? this._keys[index] : null;
      },
      /**
       * @param {?} obj
       * @return {?}
       */
      remove : function(obj) {
        var index = indexOf(this._values, obj);
        return-1 !== index ? (this._values.splice(index, 1), this.length--, this._keys.splice(index, 1)[0]) : null;
      },
      /**
       * @param {?} key
       * @return {?}
       */
      unset : function(key) {
        var index = indexOf(this._keys, key);
        return-1 !== index ? (this._keys.splice(index, 1), this.length--, this._values.splice(index, 1)[0]) : null;
      },
      /**
       * @return {?}
       */
      keys : function() {
        return this._keys.slice();
      },
      /**
       * @return {?}
       */
      values : function() {
        return this._values.slice();
      }
    });
    /**
     * @return {?}
     */
    var Type = function() {
      return new Collection;
    };
    Type.prototype = Collection.prototype;
    /** @type {function (): ?} */
    module.exports = Type;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/function/identity.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      return spy;
    }
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/function/prop.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function wrap(spy) {
      return function(dataAndEvents) {
        return dataAndEvents[spy];
      };
    }
    /** @type {function (Object): ?} */
    module.exports = wrap;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/object/deepMatches.js" : function(require, module) {
    /**
     * @param {Array} a
     * @param {?} v
     * @return {?}
     */
    function equal(a, v) {
      /** @type {number} */
      var s = -1;
      var al = a.length;
      for (;++s < al;) {
        if ($(a[s], v)) {
          return true;
        }
      }
      return false;
    }
    /**
     * @param {Object} target
     * @param {Array} arr
     * @return {?}
     */
    function every(target, arr) {
      /** @type {number} */
      var i = -1;
      var size = arr.length;
      for (;++i < size;) {
        if (!equal(target, arr[i])) {
          return false;
        }
      }
      return true;
    }
    /**
     * @param {Object} element
     * @param {Object} obj
     * @return {?}
     */
    function serialize(element, obj) {
      /** @type {boolean} */
      var n = true;
      return forOwn(obj, function(v, idx) {
        return $(element[idx], v) ? void 0 : n = false;
      }), n;
    }
    /**
     * @param {Object} spy
     * @param {Object} obj
     * @return {?}
     */
    function $(spy, obj) {
      return spy && "object" == typeof spy ? has(spy) && has(obj) ? every(spy, obj) : serialize(spy, obj) : spy === obj;
    }
    var forOwn = require("./node_modules/mout/object/forOwn.js");
    var has = require("./node_modules/mout/lang/isArray.js");
    /** @type {function (Object, Object): ?} */
    module.exports = $;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/collection/make_.js" : function($sanitize, module) {
    /**
     * @param {Object} spy
     * @param {Function} func
     * @param {(Array|Node|string)} statement
     * @return {?}
     */
    function wrap(spy, func, statement) {
      return function() {
        var args = makeArray(arguments);
        return null == args[0] ? statement : "number" == typeof args[0].length ? spy.apply(null, args) : func.apply(null, args);
      };
    }
    var makeArray = $sanitize("./node_modules/mout/array/slice.js");
    /** @type {function (Object, Function, (Array|Node|string)): ?} */
    module.exports = wrap;
  },
  /**
   * @param {?} prim
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/lang/isObject.js" : function(prim, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      return next(spy, "Object");
    }
    var next = prim("./node_modules/mout/lang/isKind.js");
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} every
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/object/values.js" : function(every, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      /** @type {Array} */
      var assigns = [];
      return check(spy, function(vvar) {
        assigns.push(vvar);
      }), assigns;
    }
    var check = every("./node_modules/mout/object/forOwn.js");
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/string/trim.js" : function(require, module) {
    /**
     * @param {Object} spy
     * @param {(Array|string)} chars
     * @return {?}
     */
    function create(spy, chars) {
      return spy = forOwn(spy), chars = chars || whitespace, expect(check(spy, chars), chars);
    }
    var forOwn = require("./node_modules/mout/lang/toString.js");
    var whitespace = require("./node_modules/mout/string/WHITE_SPACES.js");
    var expect = require("./node_modules/mout/string/ltrim.js");
    var check = require("./node_modules/mout/string/rtrim.js");
    /** @type {function (Object, (Array|string)): ?} */
    module.exports = create;
  },
  /**
   * @param {?} $sanitize
   * @param {Object} module
   * @param {?} dataAndEvents
   * @param {Node} global
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/node_modules/slick/index.js" : function($sanitize, module, dataAndEvents, global) {
    module.exports = "document" in global ? $sanitize("./node_modules/spotify-events/node_modules/elements/node_modules/slick/finder.js") : {
      parse : $sanitize("./node_modules/spotify-events/node_modules/elements/node_modules/slick/parser.js")
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-liburi/node_modules/spotify-crypto/src/base62.js" : function(dataAndEvents, module) {
    /**
     * @param {Array} stack
     * @param {number} fact
     * @param {number} b
     * @return {undefined}
     */
    function equal(stack, fact, b) {
      /** @type {number} */
      var a = 0;
      /** @type {number} */
      var i = 0;
      for (;i < stack.length;++i) {
        /** @type {number} */
        var c = stack[i] * fact + a;
        /** @type {number} */
        stack[i] = c % b;
        /** @type {number} */
        a = ~~(c / b);
      }
      for (;a;) {
        stack.push(a % b);
        /** @type {number} */
        a = ~~(a / b);
      }
    }
    /**
     * @param {Array} data
     * @param {Array} stack
     * @param {?} fact
     * @param {number} base
     * @return {undefined}
     */
    function push(data, stack, fact, base) {
      /** @type {number} */
      var b = 0;
      /** @type {number} */
      var i = 0;
      for (;i < stack.length;++i) {
        /** @type {number} */
        var c = ~~data[i] + stack[i] * fact + b;
        /** @type {number} */
        data[i] = c % base;
        /** @type {number} */
        b = ~~(c / base);
      }
      for (;b;) {
        /** @type {number} */
        c = ~~data[i] + b;
        /** @type {number} */
        data[i] = c % base;
        /** @type {number} */
        b = ~~(c / base);
        ++i;
      }
    }
    /**
     * @param {Array} codeSegments
     * @param {number} opt_attributes
     * @param {number} message
     * @return {?}
     */
    function assert(codeSegments, opt_attributes, message) {
      /** @type {Array} */
      var pdataCur = [0];
      /** @type {Array} */
      var stack = [1];
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;++i) {
        push(pdataCur, stack, codeSegments[i], message);
        equal(stack, opt_attributes, message);
      }
      return pdataCur;
    }
    /**
     * @param {?} arr
     * @param {string} obj
     * @return {?}
     */
    function contains(arr, obj) {
      /** @type {number} */
      var i = 0;
      /** @type {Array} */
      var matched = [];
      for (;i < arr.length;++i) {
        matched.push(obj[arr[i]]);
      }
      return matched.reverse();
    }
    /**
     * @param {Array} array
     * @param {number} opt_attributes
     * @return {?}
     */
    function makeArray(array, opt_attributes) {
      for (;array.length < opt_attributes;) {
        array.push(0);
      }
      return array;
    }
    /** @type {string} */
    var items = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = {};
    var obj = {};
    /** @type {number} */
    var i = 0;
    for (;i < items.length;++i) {
      /** @type {number} */
      obj[items[i]] = i;
    }
    /** @type {number} */
    i = 0;
    for (;16 > i;++i) {
      /** @type {number} */
      result["0123456789abcdef"[i]] = i;
    }
    /** @type {number} */
    i = 0;
    for (;16 > i;++i) {
      /** @type {number} */
      result["0123456789ABCDEF"[i]] = i;
    }
    module.exports = {
      /**
       * @param {Object} buffer
       * @param {number} opt_attributes
       * @return {?}
       */
      fromBytes : function(buffer, opt_attributes) {
        var checkSet = assert(buffer.slice(0).reverse(), 256, 62);
        return contains(makeArray(checkSet, opt_attributes), items).join("");
      },
      /**
       * @param {?} haystack
       * @param {number} opt_attributes
       * @return {?}
       */
      toBytes : function(haystack, opt_attributes) {
        var checkSet = assert(contains(haystack, obj), 62, 256);
        return makeArray(checkSet, opt_attributes).reverse();
      },
      /**
       * @param {(Object|string)} arr2
       * @param {number} opt_attributes
       * @return {?}
       */
      toHex : function(arr2, opt_attributes) {
        var checkSet = assert(contains(arr2, obj), 62, 16);
        return contains(makeArray(checkSet, opt_attributes), items).join("");
      },
      /**
       * @param {?} object
       * @param {number} opt_attributes
       * @return {?}
       */
      fromHex : function(object, opt_attributes) {
        var checkSet = assert(contains(object, result), 16, 62);
        return contains(makeArray(checkSet, opt_attributes), items).join("");
      }
    };
  },
  /**
   * @param {?} every
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/lang/isKind.js" : function(every, module) {
    /**
     * @param {Object} spy
     * @param {?} attr
     * @return {?}
     */
    function create(spy, attr) {
      return check(spy) === attr;
    }
    var check = every("./node_modules/mout/lang/kindOf.js");
    /** @type {function (Object, ?): ?} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/lang/isArray.js" : function(require, module) {
    var isKind = require("./node_modules/mout/lang/isKind.js");
    /** @type {function (*): boolean} */
    var JsDiff = Array.isArray || function(spy) {
      return isKind(spy, "Array");
    };
    /** @type {function (*): boolean} */
    module.exports = JsDiff;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/lang/toString.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    function create(spy) {
      return null == spy ? "" : spy.toString();
    }
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/string/WHITE_SPACES.js" : function(dataAndEvents, module) {
    /** @type {Array} */
    module.exports = [" ", "\n", "\r", "\t", "\f", "\x0B", "\u00a0", "\u1680", "\u180e", "\u2000", "\u2001", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200a", "\u2028", "\u2029", "\u202f", "\u205f", "\u3000"];
  },
  /**
   * @param {?} requestAnimationFrame
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/string/ltrim.js" : function(requestAnimationFrame, module) {
    /**
     * @param {Object} proto
     * @param {Array} attr
     * @return {?}
     */
    function compile(proto, attr) {
      proto = get_proto(proto);
      attr = attr || id;
      var i;
      var c;
      /** @type {number} */
      var start = 0;
      var len = proto.length;
      var n = attr.length;
      /** @type {boolean} */
      var content = true;
      for (;content && len > start;) {
        /** @type {boolean} */
        content = false;
        /** @type {number} */
        i = -1;
        c = proto.charAt(start);
        for (;++i < n;) {
          if (c === attr[i]) {
            /** @type {boolean} */
            content = true;
            start++;
            break;
          }
        }
      }
      return start >= len ? "" : proto.substr(start, len);
    }
    var get_proto = requestAnimationFrame("./node_modules/mout/lang/toString.js");
    var id = requestAnimationFrame("./node_modules/mout/string/WHITE_SPACES.js");
    /** @type {function (Object, Array): ?} */
    module.exports = compile;
  },
  /**
   * @param {?} require
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/mout/string/rtrim.js" : function(require, module) {
    /**
     * @param {Object} proto
     * @param {Array} chars
     * @return {?}
     */
    function trim(proto, chars) {
      proto = test(proto);
      chars = chars || whitespace;
      var i;
      var c;
      /** @type {number} */
      var end = proto.length - 1;
      var charLen = chars.length;
      /** @type {boolean} */
      var found = true;
      for (;found && end >= 0;) {
        /** @type {boolean} */
        found = false;
        /** @type {number} */
        i = -1;
        c = proto.charAt(end);
        for (;++i < charLen;) {
          if (c === chars[i]) {
            /** @type {boolean} */
            found = true;
            end--;
            break;
          }
        }
      }
      return end >= 0 ? proto.substring(0, end + 1) : "";
    }
    var test = require("./node_modules/mout/lang/toString.js");
    var whitespace = require("./node_modules/mout/string/WHITE_SPACES.js");
    /** @type {function (Object, Array): ?} */
    module.exports = trim;
  },
  /**
   * @param {?} inherit
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-inheritance/index.js" : function(inherit, module) {
    module.exports = {
      inherit : inherit("./node_modules/spotify-inheritance/inherit.js"),
      extend : inherit("./node_modules/spotify-inheritance/extend.js")
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/node_modules/slick/parser.js" : function(dataAndEvents, module) {
    /** @type {RegExp} */
    var r20 = /([-.*+?^${}()|[\]\/\\])/g;
    /** @type {RegExp} */
    var rreturn = /\\/g;
    /**
     * @param {string} str
     * @return {?}
     */
    var trim = function(str) {
      return(str + "").replace(r20, "\\$1");
    };
    /**
     * @param {string} value
     * @return {?}
     */
    var isString = function(value) {
      return(value + "").replace(rreturn, "");
    };
    /** @type {RegExp} */
    var u = RegExp("^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)".replace(/<combinator>/, "[" + trim(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])"));
    /**
     * @param {string} rawMatch
     * @return {undefined}
     */
    var parser = function(rawMatch) {
      this.combinator = rawMatch || " ";
      /** @type {string} */
      this.tag = "*";
    };
    /**
     * @return {?}
     */
    parser.prototype.toString = function() {
      if (!this.raw) {
        var e;
        var attr;
        /** @type {string} */
        var version = "";
        if (version += this.tag || "*", this.id && (version += "#" + this.id), this.classes && (version += "." + this.classList.join(".")), this.attributes) {
          /** @type {number} */
          e = 0;
          for (;attr = this.attributes[e++];) {
            version += "[" + attr.name + (attr.operator ? attr.operator + '"' + attr.value + '"' : "") + "]";
          }
        }
        if (this.pseudos) {
          /** @type {number} */
          e = 0;
          for (;attr = this.pseudos[e++];) {
            version += ":" + attr.name;
            if (attr.value) {
              version += "(" + attr.value + ")";
            }
          }
        }
        /** @type {string} */
        this.raw = version;
      }
      return this.raw;
    };
    /**
     * @return {undefined}
     */
    var a = function() {
      /** @type {number} */
      this.length = 0;
    };
    /**
     * @return {?}
     */
    a.prototype.toString = function() {
      if (!this.raw) {
        var buf;
        /** @type {string} */
        var optsData = "";
        /** @type {number} */
        var n = 0;
        for (;buf = this[n++];) {
          if (1 !== n) {
            optsData += " ";
          }
          if (" " !== buf.combinator) {
            optsData += buf.combinator + " ";
          }
          optsData += buf;
        }
        /** @type {string} */
        this.raw = optsData;
      }
      return this.raw;
    };
    /**
     * @param {?} event
     * @param {boolean} not
     * @param {(Object|boolean|number|string)} param
     * @param {(Object|boolean|number|string)} inplace
     * @param {string} text
     * @param {string} id
     * @param {string} val
     * @param {string} prop
     * @param {string} operator
     * @param {?} expr
     * @param {string} selector
     * @param {Array} bind
     * @param {string} name
     * @param {?} pred
     * @param {string} fx
     * @param {Object} type
     * @return {?}
     */
    var filter = function(event, not, param, inplace, text, id, val, prop, operator, expr, selector, bind, name, pred, fx, type) {
      var props;
      var p;
      if ((not || !this.length) && (props = this[this.length++] = new a, not)) {
        return "";
      }
      if (props || (props = this[this.length - 1]), (param || (inplace || !props.length)) && (p = props[props.length++] = new parser(param)), p || (p = props[props.length - 1]), text) {
        p.tag = isString(text);
      } else {
        if (id) {
          p.id = isString(id);
        } else {
          if (val) {
            var i = isString(val);
            var output = p.classes || (p.classes = {});
            if (!output[i]) {
              output[i] = trim(val);
              var bProperties = p.classList || (p.classList = []);
              bProperties.push(i);
              bProperties.sort();
            }
          } else {
            if (name) {
              type = type || fx;
              (p.pseudos || (p.pseudos = [])).push({
                type : 1 == bind.length ? "class" : "element",
                name : isString(name),
                escapedName : trim(name),
                value : type ? isString(type) : null,
                escapedValue : type ? trim(type) : null
              });
            } else {
              if (prop) {
                selector = selector ? trim(selector) : null;
                (p.attributes || (p.attributes = [])).push({
                  operator : operator,
                  name : isString(prop),
                  escapedName : trim(prop),
                  value : selector ? isString(selector) : null,
                  escapedValue : selector ? trim(selector) : null
                });
              }
            }
          }
        }
      }
      return "";
    };
    /**
     * @param {string} input
     * @return {undefined}
     */
    var test = function(input) {
      /** @type {number} */
      this.length = 0;
      var data;
      var that = this;
      /** @type {string} */
      var result = input;
      for (;input;) {
        if (data = input.replace(u, function() {
          return filter.apply(that, arguments);
        }), data === input) {
          throw new Error(result + " is an invalid expression");
        }
        input = data;
      }
    };
    /**
     * @return {?}
     */
    test.prototype.toString = function() {
      if (!this.raw) {
        var vvar;
        /** @type {Array} */
        var assigns = [];
        /** @type {number} */
        var n = 0;
        for (;vvar = this[n++];) {
          assigns.push(vvar);
        }
        /** @type {string} */
        this.raw = assigns.join(", ");
      }
      return this.raw;
    };
    var d = {};
    /**
     * @param {Object} spy
     * @return {?}
     */
    var create = function(spy) {
      return null == spy ? null : (spy = ("" + spy).replace(/^\s+|\s+$/g, ""), d[spy] || (d[spy] = new test(spy)));
    };
    /** @type {function (Object): ?} */
    module.exports = create;
  },
  /**
   * @param {?} require
   * @param {Object} context
   * @return {undefined}
   */
  "./node_modules/spotify-events/node_modules/elements/node_modules/slick/finder.js" : function(require, context) {
    var select = require("./node_modules/spotify-events/node_modules/elements/node_modules/slick/parser.js");
    /** @type {number} */
    var UID = 0;
    /** @type {string} */
    var Attribute = document.__counter = (parseInt(document.__counter || -1, 36) + 1).toString(36);
    /** @type {string} */
    var attribute = "uid:" + Attribute;
    /**
     * @param {Object} node
     * @param {boolean} dataAndEvents
     * @return {?}
     */
    var f = function(node, dataAndEvents) {
      if (node === window) {
        return "window";
      }
      if (node === document) {
        return "document";
      }
      if (node === document.documentElement) {
        return "html";
      }
      if (dataAndEvents) {
        var val = node.getAttribute(attribute);
        return val || (val = (UID++).toString(36), node.setAttribute(attribute, val)), val;
      }
      return node[attribute] || (node[attribute] = (UID++).toString(36));
    };
    /**
     * @param {Object} node
     * @return {?}
     */
    var append = function(node) {
      return f(node, true);
    };
    /** @type {function (*): boolean} */
    var escapeRegExp = Array.isArray || function(spy) {
      return "[object Array]" === Object.prototype.toString.call(spy);
    };
    /** @type {number} */
    var slick_ = 0;
    var params = {
      /**
       * @param {Element} tip
       * @param {string} elementId
       * @return {?}
       */
      GET_ELEMENT_BY_ID : function(tip, elementId) {
        return elementId = "slick_" + slick_++, tip.innerHTML = '<a id="' + elementId + '"></a>', !!this.getElementById(elementId);
      },
      /**
       * @param {Element} div
       * @return {?}
       */
      QUERY_SELECTOR : function(div) {
        return div.innerHTML = "_<style>:nth-child(2){}</style>", div.innerHTML = '<a class="MiX"></a>', 1 === div.querySelectorAll(".MiX").length;
      },
      /**
       * @param {?} a
       * @param {string} b
       * @return {?}
       */
      EXPANDOS : function(a, b) {
        return b = "slick_" + slick_++, a._custom_property_ = b, a._custom_property_ === b;
      },
      /**
       * @param {Object} root
       * @return {?}
       */
      MATCHES_SELECTOR : function(root) {
        /** @type {string} */
        root.className = "MiX";
        var getter = root.matchesSelector || (root.mozMatchesSelector || root.webkitMatchesSelector);
        if (getter) {
          try {
            getter.call(root, ":slick");
          } catch (n) {
            return getter.call(root, ".MiX") ? getter : false;
          }
        }
        return false;
      },
      /**
       * @param {HTMLElement} testNode
       * @return {?}
       */
      GET_ELEMENTS_BY_CLASS_NAME : function(testNode) {
        return testNode.innerHTML = '<a class="f"></a><a class="b"></a>', 1 !== testNode.getElementsByClassName("b").length ? false : (testNode.firstChild.className = "b", 2 !== testNode.getElementsByClassName("b").length ? false : (testNode.innerHTML = '<a class="a"></a><a class="f b a"></a>', 2 !== testNode.getElementsByClassName("a").length ? false : true));
      },
      /**
       * @param {Element} div
       * @return {?}
       */
      GET_ATTRIBUTE : function(div) {
        /** @type {string} */
        var classValue = "fus ro dah";
        return div.innerHTML = '<a class="' + classValue + '"></a>', div.firstChild.getAttribute("class") === classValue;
      }
    };
    /**
     * @param {Node} doc
     * @return {undefined}
     */
    var instantiateSizzle = function(doc) {
      /** @type {Node} */
      this.document = doc;
      var root = this.root = doc.documentElement;
      this.tested = {};
      /** @type {Function} */
      this.uniqueID = this.has("EXPANDOS") ? f : append;
      /** @type {function (Node, string): ?} */
      this.getAttribute = this.has("GET_ATTRIBUTE") ? function(node, attribute) {
        return node.getAttribute(attribute);
      } : function(node, attribute) {
        return node = node.getAttributeNode(attribute), node && node.specified ? node.value : null;
      };
      /** @type {function (Node, string): ?} */
      this.hasAttribute = root.hasAttribute ? function(element, attribute) {
        return element.hasAttribute(attribute);
      } : function(node, attribute) {
        return node = node.getAttributeNode(attribute), !(!node || !node.specified);
      };
      /** @type {function (Node, string): ?} */
      this.contains = doc.contains && root.contains ? function(element, activeClassName) {
        return element.contains(activeClassName);
      } : root.compareDocumentPosition ? function(element, ancestor) {
        return element === ancestor || !!(16 & element.compareDocumentPosition(ancestor));
      } : function(element, target) {
        do {
          if (target === element) {
            return true;
          }
        } while (target = target.parentNode);
        return false;
      };
      /** @type {(function (Node, Node): ?|null)} */
      this.sorter = root.compareDocumentPosition ? function(a, b) {
        return a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) ? -1 : a === b ? 0 : 1 : 0;
      } : "sourceIndex" in root ? function(a, b) {
        return a.sourceIndex && b.sourceIndex ? a.sourceIndex - b.sourceIndex : 0;
      } : doc.createRange ? function(a, b) {
        if (!a.ownerDocument || !b.ownerDocument) {
          return 0;
        }
        var aRange = a.ownerDocument.createRange();
        var bRange = b.ownerDocument.createRange();
        return aRange.setStart(a, 0), aRange.setEnd(a, 0), bRange.setStart(b, 0), bRange.setEnd(b, 0), aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
      } : null;
      this.failed = {};
      var matches = this.has("MATCHES_SELECTOR");
      if (matches) {
        /**
         * @param {?} elem
         * @param {string} expr
         * @return {?}
         */
        this.matchesSelector = function(elem, expr) {
          if (this.failed[expr]) {
            return null;
          }
          try {
            return matches.call(elem, expr);
          } catch (r) {
            return self.debug && console.warn("matchesSelector failed on " + expr), this.failed[expr] = true, null;
          }
        };
      }
      if (this.has("QUERY_SELECTOR")) {
        /**
         * @param {Node} node
         * @param {?} err
         * @return {?}
         */
        this.querySelectorAll = function(node, err) {
          if (this.failed[err]) {
            return true;
          }
          var n;
          var name;
          var error;
          var excludes;
          var elem;
          if (node !== this.document && (excludes = err[0].combinator, name = node.getAttribute("id"), error = err, name || (elem = node, name = "__slick__", elem.setAttribute("id", name)), err = "#" + name + " " + error, (excludes.indexOf("~") > -1 || excludes.indexOf("+") > -1) && (node = node.parentNode, node || (n = true))), !n) {
            try {
              n = node.querySelectorAll(err.toString());
            } catch (a) {
              if (self.debug) {
                console.warn("querySelectorAll failed on " + (error || err));
              }
              /** @type {boolean} */
              n = this.failed[error || err] = true;
            }
          }
          return elem && elem.removeAttribute("id"), n;
        };
      }
    };
    /**
     * @param {string} property
     * @return {?}
     */
    instantiateSizzle.prototype.has = function(property) {
      var results = this.tested;
      var match = results[property];
      if (null != match) {
        return match;
      }
      var root = this.root;
      var doc = this.document;
      var a = doc.createElement("div");
      a.setAttribute("style", "display: none;");
      root.appendChild(a);
      var fn = params[property];
      /** @type {boolean} */
      var result = false;
      if (fn) {
        try {
          result = fn.call(doc, a);
        } catch (u) {
        }
      }
      return self.debug && (!result && console.warn("document has no " + property)), root.removeChild(a), results[property] = result;
    };
    var a = {
      /**
       * @param {HTMLDocument} context
       * @param {Object} element
       * @param {?} forOwn
       * @return {?}
       */
      " " : function(context, element, forOwn) {
        var pattern;
        var result;
        /** @type {boolean} */
        var failuresLink = !element.id;
        /** @type {boolean} */
        var r20 = !element.tag;
        /** @type {boolean} */
        var typePattern = !element.classes;
        if (element.id && (context.getElementById && (this.has("GET_ELEMENT_BY_ID") && (pattern = context.getElementById(element.id), pattern && (pattern.getAttribute("id") === element.id && (result = [pattern], failuresLink = true, "*" === element.tag && (r20 = true)))))), !result && (element.classes && (context.getElementsByClassName && this.has("GET_ELEMENTS_BY_CLASS_NAME")) ? (result = context.getElementsByClassName(element.classList), typePattern = true, "*" === element.tag && (r20 = true)) :
        (result = context.getElementsByTagName(element.tag), "*" !== element.tag && (r20 = true)), !result || !result.length)) {
          return false;
        }
        /** @type {number} */
        var ri = 0;
        for (;pattern = result[ri++];) {
          if (r20 && (failuresLink && (typePattern && (!element.attributes && !element.pseudos))) || this.match(pattern, element, r20, failuresLink, typePattern)) {
            forOwn(pattern);
          }
        }
        return true;
      },
      /**
       * @param {Object} element
       * @param {Object} until
       * @param {?} proceed
       * @return {undefined}
       */
      ">" : function(element, until, proceed) {
        if (element = element.firstChild) {
          do {
            if (1 == element.nodeType) {
              if (this.match(element, until)) {
                proceed(element);
              }
            }
          } while (element = element.nextSibling);
        }
      },
      /**
       * @param {Object} element
       * @param {Object} until
       * @param {?} proceed
       * @return {undefined}
       */
      "+" : function(element, until, proceed) {
        for (;element = element.nextSibling;) {
          if (1 == element.nodeType) {
            if (this.match(element, until)) {
              proceed(element);
            }
            break;
          }
        }
      },
      /**
       * @param {Object} content
       * @param {Object} key
       * @param {?} callback
       * @return {undefined}
       */
      "^" : function(content, key, callback) {
        content = content.firstChild;
        if (content) {
          if (1 === content.nodeType) {
            if (this.match(content, key)) {
              callback(content);
            }
          } else {
            a["+"].call(this, content, key, callback);
          }
        }
      },
      /**
       * @param {Object} element
       * @param {Object} until
       * @param {?} proceed
       * @return {undefined}
       */
      "~" : function(element, until, proceed) {
        for (;element = element.nextSibling;) {
          if (1 === element.nodeType) {
            if (this.match(element, until)) {
              proceed(element);
            }
          }
        }
      },
      /**
       * @param {?} mapper
       * @param {?} graphics
       * @param {?} capture
       * @return {undefined}
       */
      "++" : function(mapper, graphics, capture) {
        a["+"].call(this, mapper, graphics, capture);
        a["!+"].call(this, mapper, graphics, capture);
      },
      /**
       * @param {?} mapper
       * @param {?} graphics
       * @param {?} capture
       * @return {undefined}
       */
      "~~" : function(mapper, graphics, capture) {
        a["~"].call(this, mapper, graphics, capture);
        a["!~"].call(this, mapper, graphics, capture);
      },
      /**
       * @param {Node} element
       * @param {Object} until
       * @param {?} proceed
       * @return {undefined}
       */
      "!" : function(element, until, proceed) {
        for (;element = element.parentNode;) {
          if (element !== this.document) {
            if (this.match(element, until)) {
              proceed(element);
            }
          }
        }
      },
      /**
       * @param {Node} element
       * @param {Object} until
       * @param {?} proceed
       * @return {undefined}
       */
      "!>" : function(element, until, proceed) {
        element = element.parentNode;
        if (element !== this.document) {
          if (this.match(element, until)) {
            proceed(element);
          }
        }
      },
      /**
       * @param {Object} element
       * @param {Object} until
       * @param {?} proceed
       * @return {undefined}
       */
      "!+" : function(element, until, proceed) {
        for (;element = element.previousSibling;) {
          if (1 == element.nodeType) {
            if (this.match(element, until)) {
              proceed(element);
            }
            break;
          }
        }
      },
      /**
       * @param {Node} elm
       * @param {Object} key
       * @param {?} process
       * @return {undefined}
       */
      "!^" : function(elm, key, process) {
        elm = elm.lastChild;
        if (elm) {
          if (1 == elm.nodeType) {
            if (this.match(elm, key)) {
              process(elm);
            }
          } else {
            a["!+"].call(this, elm, key, process);
          }
        }
      },
      /**
       * @param {Object} element
       * @param {Object} until
       * @param {?} proceed
       * @return {undefined}
       */
      "!~" : function(element, until, proceed) {
        for (;element = element.previousSibling;) {
          if (1 === element.nodeType) {
            if (this.match(element, until)) {
              proceed(element);
            }
          }
        }
      }
    };
    /**
     * @param {Node} obj
     * @param {string} array
     * @param {Object} str
     * @return {?}
     */
    instantiateSizzle.prototype.search = function(obj, array, str) {
      if (obj) {
        if (!obj.nodeType) {
          if (obj.document) {
            obj = obj.document;
          }
        }
      } else {
        obj = this.document;
      }
      var out = select(array);
      if (!out || !out.length) {
        throw new Error("invalid expression");
      }
      if (!str) {
        /** @type {Array} */
        str = [];
      }
      var oSpace;
      /** @type {function (Error): undefined} */
      var f = escapeRegExp(str) ? function(dataAndEvents) {
        /** @type {Error} */
        str[str.length] = dataAndEvents;
      } : function(dataAndEvents) {
        /** @type {Error} */
        str[str.length++] = dataAndEvents;
      };
      if (out.length > 1) {
        oSpace = {};
        /** @type {function (Error): undefined} */
        var func = f;
        /**
         * @param {Error} node
         * @return {undefined}
         */
        f = function(node) {
          var n = f(node);
          if (!oSpace[n]) {
            /** @type {boolean} */
            oSpace[n] = true;
            func(node);
          }
        };
      }
      var node;
      var nodes;
      var map;
      /** @type {number} */
      var p = 0;
      e: for (;array = out[p++];) {
        if (self.noQSA || (!this.querySelectorAll || (nodes = this.querySelectorAll(obj, array), nodes === true))) {
          if (1 === array.length) {
            map = array[0];
            a[map.combinator].call(this, obj, map, f);
          } else {
            var _ref1;
            var data;
            var uidList;
            /** @type {Array} */
            var stack = [obj];
            /**
             * @param {Object} element
             * @return {undefined}
             */
            var capture = function(element) {
              var uid = f(element);
              if (!uidList[uid]) {
                /** @type {boolean} */
                uidList[uid] = true;
                /** @type {Object} */
                data[data.length] = element;
              }
            };
            /** @type {number} */
            var i = 0;
            for (;map = array[i++];) {
              /** @type {Array} */
              data = [];
              uidList = {};
              /** @type {number} */
              var sp = 0;
              for (;_ref1 = stack[sp++];) {
                a[map.combinator].call(this, _ref1, map, capture);
              }
              if (!data.length) {
                continue e;
              }
              /** @type {Array} */
              stack = data;
            }
            if (0 === p) {
              /** @type {(Array|undefined)} */
              str = data;
            } else {
              /** @type {number} */
              var ii = 0;
              for (;ii < data.length;ii++) {
                f(data[ii]);
              }
            }
          }
        } else {
          if (nodes && nodes.length) {
            /** @type {number} */
            i = 0;
            for (;node = nodes[i++];) {
              if (node.nodeName > "@") {
                f(node);
              }
            }
          }
        }
      }
      return oSpace && (str && (str.length > 1 && this.sort(str))), str;
    };
    /**
     * @param {Function} obj
     * @return {?}
     */
    instantiateSizzle.prototype.sort = function(obj) {
      return this.sorter ? Array.prototype.sort.call(obj, this.sorter) : obj;
    };
    var pseudos = {
      /**
       * @return {?}
       */
      empty : function() {
        return!(this && 1 === this.nodeType || (this.innerText || (this.textContent || "")).length);
      },
      /**
       * @param {Object} selector
       * @return {?}
       */
      not : function(selector) {
        return!self.match(this, selector);
      },
      /**
       * @param {string} element
       * @return {?}
       */
      contains : function(element) {
        return(this.innerText || (this.textContent || "")).indexOf(element) > -1;
      },
      /**
       * @return {?}
       */
      "first-child" : function() {
        var prev = this;
        for (;prev = prev.previousSibling;) {
          if (1 == prev.nodeType) {
            return false;
          }
        }
        return true;
      },
      /**
       * @return {?}
       */
      "last-child" : function() {
        var curNode = this;
        for (;curNode = curNode.nextSibling;) {
          if (1 == curNode.nodeType) {
            return false;
          }
        }
        return true;
      },
      /**
       * @return {?}
       */
      "only-child" : function() {
        var prev = this;
        for (;prev = prev.previousSibling;) {
          if (1 == prev.nodeType) {
            return false;
          }
        }
        var curNode = this;
        for (;curNode = curNode.nextSibling;) {
          if (1 == curNode.nodeType) {
            return false;
          }
        }
        return true;
      },
      /**
       * @return {?}
       */
      "first-of-type" : function() {
        var node = this;
        var nodeName = node.nodeName;
        for (;node = node.previousSibling;) {
          if (node.nodeName == nodeName) {
            return false;
          }
        }
        return true;
      },
      /**
       * @return {?}
       */
      "last-of-type" : function() {
        var child = this;
        var nodeName = child.nodeName;
        for (;child = child.nextSibling;) {
          if (child.nodeName == nodeName) {
            return false;
          }
        }
        return true;
      },
      /**
       * @return {?}
       */
      "only-of-type" : function() {
        var prev = this;
        var nodeName = this.nodeName;
        for (;prev = prev.previousSibling;) {
          if (prev.nodeName == nodeName) {
            return false;
          }
        }
        var next = this;
        for (;next = next.nextSibling;) {
          if (next.nodeName == nodeName) {
            return false;
          }
        }
        return true;
      },
      /**
       * @return {?}
       */
      enabled : function() {
        return!this.disabled;
      },
      /**
       * @return {?}
       */
      disabled : function() {
        return this.disabled;
      },
      /**
       * @return {?}
       */
      checked : function() {
        return this.checked || this.selected;
      },
      /**
       * @return {?}
       */
      selected : function() {
        return this.selected;
      },
      /**
       * @return {?}
       */
      focus : function() {
        var ownerDocument = this.ownerDocument;
        return ownerDocument.activeElement === this && (this.href || (this.type || self.hasAttribute(this, "tabindex")));
      },
      /**
       * @return {?}
       */
      root : function() {
        return this === this.ownerDocument.documentElement;
      }
    };
    /**
     * @param {Node} element
     * @param {Object} selector
     * @param {boolean} regex
     * @param {boolean} el
     * @param {boolean} args
     * @return {?}
     */
    instantiateSizzle.prototype.match = function(element, selector, regex, el, args) {
      if (!self.noQSA && this.matchesSelector) {
        var result = this.matchesSelector(element, selector);
        if (null !== result) {
          return result;
        }
      }
      if (!regex && selector.tag) {
        var tag = element.nodeName.toLowerCase();
        if ("*" === selector.tag) {
          if ("@" > tag) {
            return false;
          }
        } else {
          if (tag != selector.tag) {
            return false;
          }
        }
      }
      if (!el && (selector.id && element.getAttribute("id") !== selector.id)) {
        return false;
      }
      var i;
      var input;
      if (!args && selector.classes) {
        var id = this.getAttribute(element, "class");
        if (!id) {
          return false;
        }
        for (input in selector.classes) {
          if (!RegExp("(^|\\s)" + selector.classes[input] + "(\\s|$)").test(id)) {
            return false;
          }
        }
      }
      var name;
      var val;
      if (selector.attributes) {
        /** @type {number} */
        i = 0;
        for (;input = selector.attributes[i++];) {
          var il = input.operator;
          var pattern = input.escapedValue;
          if (name = input.name, val = input.value, il) {
            var attr = this.getAttribute(element, name);
            if (null == attr) {
              return false;
            }
            switch(il) {
              case "^=":
                if (!RegExp("^" + pattern).test(attr)) {
                  return false;
                }
                break;
              case "$=":
                if (!RegExp(pattern + "$").test(attr)) {
                  return false;
                }
                break;
              case "~=":
                if (!RegExp("(^|\\s)" + pattern + "(\\s|$)").test(attr)) {
                  return false;
                }
                break;
              case "|=":
                if (!RegExp("^" + pattern + "(-|$)").test(attr)) {
                  return false;
                }
                break;
              case "=":
                if (attr !== val) {
                  return false;
                }
                break;
              case "*=":
                if (-1 === attr.indexOf(val)) {
                  return false;
                }
                break;
              default:
                return false;
            }
          } else {
            if (!this.hasAttribute(element, name)) {
              return false;
            }
          }
        }
      }
      if (selector.pseudos) {
        /** @type {number} */
        i = 0;
        for (;input = selector.pseudos[i++];) {
          if (name = input.name, val = input.value, pseudos[name]) {
            return pseudos[name].call(element, val);
          }
          if (null != val) {
            if (this.getAttribute(element, name) !== val) {
              return false;
            }
          } else {
            if (!this.hasAttribute(element, name)) {
              return false;
            }
          }
        }
      }
      return true;
    };
    /**
     * @param {string} element
     * @param {string} selector
     * @return {?}
     */
    instantiateSizzle.prototype.matches = function(element, selector) {
      var cur = select(selector);
      if (1 === cur.length && 1 === cur[0].length) {
        return this.match(element, cur[0][0]);
      }
      if (!self.noQSA && this.matchesSelector) {
        var result = this.matchesSelector(element, cur);
        if (null !== result) {
          return result;
        }
      }
      var container;
      var nodes = this.search(this.document, selector, {
        length : 0
      });
      /** @type {number} */
      var i = 0;
      for (;container = nodes[i++];) {
        if (element === container) {
          return true;
        }
      }
      return false;
    };
    var clt = {};
    /**
     * @param {Node} selector
     * @return {?}
     */
    var $ = function(selector) {
      var doc = selector || document;
      if (doc.ownerDocument ? doc = doc.ownerDocument : doc.document && (doc = doc.document), 9 !== doc.nodeType) {
        throw new TypeError("invalid document");
      }
      var value = f(doc);
      return clt[value] || (clt[value] = new instantiateSizzle(doc));
    };
    /**
     * @param {Object} spy
     * @param {?} selector
     * @return {?}
     */
    var self = function(spy, selector) {
      return self.search(spy, selector);
    };
    /**
     * @param {string} selector
     * @param {string} query
     * @param {Object} atts
     * @return {?}
     */
    self.search = function(selector, query, atts) {
      return $(query).search(query, selector, atts);
    };
    /**
     * @param {string} selector
     * @param {string} query
     * @return {?}
     */
    self.find = function(selector, query) {
      return $(query).search(query, selector)[0] || null;
    };
    /**
     * @param {string} node
     * @param {string} attribute
     * @return {?}
     */
    self.getAttribute = function(node, attribute) {
      return $(node).getAttribute(node, attribute);
    };
    /**
     * @param {Object} element
     * @param {string} attribute
     * @return {?}
     */
    self.hasAttribute = function(element, attribute) {
      return $(element).hasAttribute(element, attribute);
    };
    /**
     * @param {string} element
     * @param {string} value
     * @return {?}
     */
    self.contains = function(element, value) {
      return $(element).contains(element, value);
    };
    /**
     * @param {string} expr
     * @param {string} sel
     * @return {?}
     */
    self.matches = function(expr, sel) {
      return $(expr).matches(expr, sel);
    };
    /**
     * @param {Object} obj
     * @return {?}
     */
    self.sort = function(obj) {
      return obj && (obj.length > 1 && $(obj[0]).sort(obj)), obj;
    };
    self.parse = select;
    /** @type {function (Object, ?): ?} */
    context.exports = self;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-inheritance/inherit.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @param {Object} parent
     * @return {undefined}
     */
    var inherit = function(spy, parent) {
      /**
       * @return {undefined}
       */
      function f() {
      }
      var _super = parent.prototype;
      f.prototype = spy._super = _super;
      /** @type {Object} */
      f.prototype.constructor = parent;
      spy.prototype = new f;
    };
    /** @type {function (Object, Object): undefined} */
    module.exports = inherit;
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-cosmos-api/node_modules/spotify-deferred/node_modules/spotify-postrouter/src/postrouter.js" : function(dataAndEvents, module) {
    /**
     * @param {Event} e
     * @return {undefined}
     */
    function next(e) {
      var handler = handlers[e.type];
      if (handler) {
        handler.fn.call(this, e);
      }
    }
    /**
     * @param {MessageEvent} e
     * @return {undefined}
     */
    function init(e) {
      var msg = e.data;
      if ("string" == typeof msg) {
        try {
          /** @type {*} */
          msg = JSON.parse(msg);
        } catch (n) {
          return;
        }
      }
      var config = handlers[msg.type];
      if (!!config) {
        if (!("*" != config.origin && e.origin !== config.origin)) {
          config.fn.call(this, msg, e);
        }
      }
    }
    /** @type {function ((Function|null|string), number): number} */
    var val = val ? val : setTimeout;
    var uri = void 0;
    if ("undefined" != typeof window) {
      /** @type {string} */
      uri = window.location.origin || window.location.protocol + "//" + window.location.hostname;
    }
    var handlers = {};
    /** @type {boolean} */
    var a = false;
    /**
     * @return {undefined}
     */
    var doRequest = function() {
      if (window.attachEvent && !window.addEventListener) {
        window.attachEvent("onmessage", init);
      } else {
        window.addEventListener("message", init, false);
      }
    };
    /**
     * @param {string} id
     * @param {Function} callback
     * @param {string} options
     * @return {undefined}
     */
    var request = function(id, callback, options) {
      if ("undefined" == typeof window || (a || (doRequest(), a = true)), options || (options = uri), handlers[id]) {
        throw new Error('Rehandling of message "' + id + '" not allowed.');
      }
      handlers[id] = {
        /** @type {Function} */
        fn : callback,
        origin : options
      };
    };
    /**
     * @param {?} id
     * @param {boolean} t
     * @return {?}
     */
    var install = function(id, t) {
      return!handlers[id] || t && handlers[id].fn !== t ? false : (handlers[id] = null, true);
    };
    /**
     * @param {string} type
     * @param {Object} data
     * @param {(Function|string)} x
     * @param {string} url
     * @return {?}
     */
    var log = function(type, data, x, url) {
      return data = data || {}, data.type = type, "undefined" == typeof window ? val(next.bind(null, data)) : (x = x || window, url || (url = uri), void x.postMessage(JSON.stringify(data), url));
    };
    module.exports = {
      /** @type {function (string, Function, string): undefined} */
      addMessageHandler : request,
      /** @type {function (?, boolean): ?} */
      removeMessageHandler : install,
      /** @type {function (string, Object, (Function|string), string): ?} */
      sendMessage : log,
      WINDOW_ORIGIN : uri
    };
  },
  /**
   * @param {?} dataAndEvents
   * @param {Object} module
   * @return {undefined}
   */
  "./node_modules/spotify-inheritance/extend.js" : function(dataAndEvents, module) {
    /**
     * @param {Object} spy
     * @return {?}
     */
    var t = function(spy) {
      var source;
      /** @type {number} */
      var i = 1;
      for (;i < arguments.length;i++) {
        if (source = arguments[i]) {
          var prop;
          for (prop in source) {
            if (source.hasOwnProperty(prop)) {
              spy[prop] = source[prop];
            }
          }
        }
      }
      return spy;
    };
    /** @type {function (Object): ?} */
    module.exports = t;
  }
});
