var AppUI;

AppUI = (function() {
  function AppUI(wrapperUI) {
    this.isExpanded = false;
    this.isFullscreen = false;
    this.wrapperUI = wrapperUI;
  }

  AppUI.prototype.onTrackChange = function(track) {
    $('#popup-name').html(track.name);
    return $('#popup-artist').html(track.artistName);
  };

  AppUI.prototype.onVideoChanged = function(video) {
    $('#video-title').html(video.snippet.title);
    return $('#channel-name').html(video.snippet.channelTitle);
  };

  AppUI.prototype.showTrackBubble = function() {};

  AppUI.prototype.toggleFullscreen = function() {
    var doc;
    this.toggleExpanded();
    this.isFullscreen = !this.isFullscreen;
    doc = document.documentElement;
    if (this.isFullscreen) {
      if (doc.requestFullscreen) {
        return doc.requestFullscreen();
      } else if (doc.webkitRequestFullscreen) {
        return doc.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        return document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen();
      }
    }
  };

  AppUI.prototype.toggleExpanded = function() {
    this.isExpanded = !this.isExpanded;
    return this.wrapperUI.elements.tab.toggleClass('expanded', this.isExpanded);
  };

  return AppUI;

})();



var Player,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Player = (function() {
  var YT_STATE_BUFFERING, YT_STATE_CUED, YT_STATE_ENDED, YT_STATE_PAUSED, YT_STATE_PLAYING, YT_STATE_UNSTARTED;

  YT_STATE_UNSTARTED = -1;

  YT_STATE_ENDED = 0;

  YT_STATE_PLAYING = 1;

  YT_STATE_PAUSED = 2;

  YT_STATE_BUFFERING = 3;

  YT_STATE_CUED = 5;

  Player.playerID = 0;

  function Player(track, isNext) {
    this.setVolume = __bind(this.setVolume, this);
    var id, playerLoadInterval;
    id = this.playerID++;
    $('.video-wrapper').append('<div id="player-' + id + '"></div>');
    this.YT = new YT.Player("player-" + id, {
      videoId: '',
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        disablekb: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        hd: 1,
        showinfo: 0
      }
    });
    playerLoadInterval = setInterval((function(_this) {
      return function() {
        if (_this.YT.loadVideoById != null) {
          clearInterval(playerLoadInterval);
          _this.playerIsReady = true;
          _this.doBinds();
          if (_this.cuedVideoId) {
            _this.loadVideo(_this.cuedVideoId);
            return _this.cuedVideoId = 0;
          }
        }
      };
    })(this), 200);
    this.cuedVideoId = 0;
    this.element = $('#' + elementID);
    this.APILoaded = false;
    this.track = track;
  }

  Player.prototype.doBinds = function() {
    document.addEventListener('player_seek', (function(_this) {
      return function(e) {
        return _this.seekTo(e.detail[0]);
      };
    })(this));
    document.addEventListener('player_set_volume', (function(_this) {
      return function(e) {
        return _this.setVolume(e.detail[1] * 100);
      };
    })(this));
    return this.YT.addEventListener('onStateChange', this.onStateChange);
  };

  Player.prototype.onAPILoad = function() {
    return this.APILoaded = true;
  };

  Player.prototype.loadVideo = function(id) {
    if (this.playerIsReady) {
      console.info('player', id);
      this.YT.loadVideoById(id, 0, 'maxres');
      return this.YT.setPlaybackQuality('highres');
    } else {
      return this.cuedVideoId = id;
    }
  };

  Player.prototype.seekTo = function(time) {
    console.info('seek', time);
    return this.YT.seekTo(time, true);
  };

  Player.prototype.setVolume = function(volume) {
    return this.YT.setVolume(volume);
  };

  Player.prototype.onStateChange = function(state) {

    /*switch state:
      when YT_STATE_ENDED:
    
      break
     */
  };

  Player.prototype.makeCurrent = function() {};

  Player.prototype.onVideoLoaded = function() {};

  Player.prototype.onFinished = function() {};

  Player.prototype.onBuffering = function() {};

  return Player;

})();

var PlayerManager,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

PlayerManager = (function() {
  var CROSSFADE_STEP_SIZE;

  CROSSFADE_STEP_SIZE = 25;

  function PlayerManager() {
    this.onTrack = __bind(this.onTrack, this);
    this.preloadTrack = __bind(this.preloadTrack, this);
    var YTAPILoadInterval;
    this.callbacks = {
      onVideoChanged: []
    };
    this.YTAPILoaded = false;
    this.crossfadeShouldStop = false;
    this.players = {
      current: null,
      next: null
    };
    this.tracks = {};
    YTAPILoadInterval = setInterval((function(_this) {
      return function() {
        var _ref, _ref1;
        if (window.YT && window.YT.Player) {
          clearInterval(YTAPILoadInterval);
          if ((_ref = _this.players.current) != null) {
            _ref.onAPILoad();
          }
          if ((_ref1 = _this.players.next) != null) {
            _ref1.onAPILoad();
          }
          return _this.YTAPILoaded = true;
        }
      };
    })(this), 100);
    document.addEventListener('player_track_change', (function(_this) {
      return function(e) {
        return _this.tracks = {
          current: e.detail[0],
          next: e.detail[1]
        };
      };
    })(this));
  }

  PlayerManager.prototype.setActive = function(isActive) {
    console.info(isActive, 'is active');
    if (isActive) {
      document.addEventListener('player_track_change', this.onTrack);
      return this.onTrack({
        detail: [this.tracks.current, this.tracks.next]
      });
    } else {
      return document.removeEventListener('player_track_change', this.onTrack);
    }
  };

  PlayerManager.prototype.preloadTrack = function(track) {
    return this.getVideoFromTrack(track, (function(_this) {
      return function(video) {
        _this.players.next = new PreloadPlayer('preload-player', track);
        return _this.players.next.loadVideo(video.id.videoId);
      };
    })(this));
  };

  PlayerManager.prototype.onTrack = function(event) {
    var id, _ref;
    id = 0;
    console.info('track', (_ref = this.players.next) != null ? _ref.track._pid : void 0, event.detail[0]._pid);
    if (this.players.next && this.players.next.track._pid === event.detail[0]._pid) {
      this.players.current = this.players.next;
      this.players.current.makeCurrent();
      this.stopCrossfade();
    } else {
      this.getVideoFromTrack(event.detail[0], (function(_this) {
        return function(video) {
          var callback, _i, _len, _ref1, _results;
          _this.players.current.loadVideo(video.id.videoId);
          _ref1 = _this.callbacks.onVideoChanged;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            callback = _ref1[_i];
            _results.push(callback(video));
          }
          return _results;
        };
      })(this));
    }
    return this.preloadTrack(event.detail[1]);
  };

  PlayerManager.prototype.crossfade = function(duration, onFinished) {
    var interval, step;
    this.players.current.element.fadeOut(duration);
    this.players.next.element.fadeIn(duration);
    this.players.next.isCrossfading = true;
    step = 0;
    return interval = setInterval((function(_this) {
      return function() {
        var progress;
        if (_this.crossfadeShouldStop) {
          clearInterval(interval);
          return;
        }
        progress = (step++ * CROSSFADE_STEP_SIZE) / duration;
        if (progress >= 1) {
          clearInterval(interval);
          return onFinished();
        } else {
          current.setVolume((1 - progress) * current.getVolume());
          return next.setVolume(progress.current.getVolume());
        }
      };
    })(this), CROSSFADE_STEP_SIZE);
  };

  PlayerManager.prototype.stopCrossfade = function() {
    return this.crossfadeShouldStop = true;
  };

  PlayerManager.prototype.onVideoChanged = function(callback) {
    return this.callbacks.onVideoChanged.push(callback);
  };

  PlayerManager.prototype.getVideoFromTrack = function(track, callback) {
    var params;
    params = {
      part: 'id,snippet',
      q: track.name + " " + track.artistName + " offical video",
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'
    };
    return $.getJSON('https://content.googleapis.com/youtube/v3/search', params, function(data) {
      return callback(data.items[0]);
    });
  };

  return PlayerManager;

})();

var PreloadPlayer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

PreloadPlayer = (function(_super) {
  var YT_STATE_BUFFERING, YT_STATE_CUED, YT_STATE_ENDED, YT_STATE_PAUSED, YT_STATE_PLAYING, YT_STATE_UNSTARTED;

  __extends(PreloadPlayer, _super);

  YT_STATE_UNSTARTED = -1;

  YT_STATE_ENDED = 0;

  YT_STATE_PLAYING = 1;

  YT_STATE_PAUSED = 2;

  YT_STATE_BUFFERING = 3;

  YT_STATE_CUED = 5;

  function PreloadPlayer(elementID, track) {
    this.onStateChange = __bind(this.onStateChange, this);
    PreloadPlayer.__super__.constructor.call(this, elementID, track);
    this.isCrossfading = false;
  }

  PreloadPlayer.prototype.doBinds = function() {
    document.addEventListener('player_set_volume', (function(_this) {
      return function(e) {
        return _this.setVolume(e.detail[1] * 100);
      };
    })(this));
    return this.YT.addEventListener('onStateChange', this.onStateChange);
  };

  PreloadPlayer.prototype.loadVideo = function(id) {
    return PreloadPlayer.__super__.loadVideo.call(this, id);
  };

  PreloadPlayer.prototype.onStateChange = function(state) {
    if (state.data === YT_STATE_PLAYING && !this.isCrossfading) {
      return this.YT.pauseVideo();
    }
  };

  return PreloadPlayer;

})(Player);

var SpotifyInterface;

SpotifyInterface = (function() {
  function SpotifyInterface() {
    this.callbacks = {
      onUserNavigated: []
    };
    this.currentPath = window.location.pathname;
    setInterval((function(_this) {
      return function() {
        var callback, _i, _len, _ref, _results;
        if (_this.currentPath !== window.location.pathname) {
          _this.currentPath = window.location.pathname;
          _ref = _this.callbacks.onUserNavigated;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            callback = _ref[_i];
            _results.push(callback(_this.currentPath));
          }
          return _results;
        }
      };
    })(this), 333);
  }

  SpotifyInterface.prototype.onUserNavigated = function(callback) {
    return this.callbacks.onUserNavigated.push(callback);
  };

  SpotifyInterface.prototype.onVideoChanged = function(video) {};

  return SpotifyInterface;

})();

var SpotifyUI,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SpotifyUI = (function() {
  function SpotifyUI() {
    this.hideWatchTab = __bind(this.hideWatchTab, this);
    this.showWatchTab = __bind(this.showWatchTab, this);
    this.onResize = __bind(this.onResize, this);
    var startClassInterval;
    this.callbacks = {
      onStarted: [],
      onTabShown: [],
      onTabHidden: []
    };
    this.elements = {
      tab: null,
      menuItem: null,
      body: $('body'),
      wrapper: null
    };
    startClassInterval = setInterval((function(_this) {
      return function() {
        var callback, _i, _len, _ref;
        if (_this.elements.body.hasClass('started')) {
          _ref = _this.callbacks.onStarted;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            callback = _ref[_i];
            callback();
          }
          return clearInterval(startClassInterval);
        }
      };
    })(this), 100);
  }

  SpotifyUI.prototype.onStarted = function(callback) {
    return this.callbacks.onStarted.push(callback);
  };

  SpotifyUI.prototype.onTabShown = function(callback) {
    return this.callbacks.onTabShown.push(callback);
  };

  SpotifyUI.prototype.onTabHidden = function(callback) {
    return this.callbacks.onTabHidden.push(callback);
  };

  SpotifyUI.prototype.onResize = function() {
    var height;
    if (!this.elements.wrapper) {
      return;
    }
    height = this.elements.wrapper.innerHeight();
    return this.elements.wrapper.css({
      top: $(window).height() / 2 - height / 2
    });
  };

  SpotifyUI.prototype.doBinds = function() {
    $(document).on('click', '#nav-watch', this.showWatchTab);
    return $(window).on('resize', this.onResize);
  };

  SpotifyUI.prototype.loadExtraResources = function() {
    $('head').append('<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">');
    return chrome.extension.sendRequest({
      method: 'getScript',
      file: 'vendor/youtube'
    }, function(js) {
      if (!window.YTConfig) {
        window.YTConfig = {
          host: "http://www.youtube.com"
        };
      }
      return eval(js);
    });
  };

  SpotifyUI.prototype.attachMenuItem = function() {
    var navMenuHTML;
    navMenuHTML = "<li>\n  <a data-href=\"follow\" id=\"nav-watch\" class=\"standard-menu-item\">\n    <i class=\"fa fa-youtube-play\"></i>\n    <span class=\"nav-text\">Watch</span>\n  </a>\n</li>";
    return this.elements.menuItem = $(navMenuHTML).insertBefore($('.item-profile')).find('a');
  };

  SpotifyUI.prototype.createWatchTab = function() {
    var request, tabHTML;
    tabHTML = "<div id=\"section-watch\" class=\"stacked hidden\"></div>";
    this.elements.tab = $(tabHTML).insertAfter($('#section-follow'));
    request = {
      method: 'getView',
      file: 'tab'
    };
    return chrome.extension.sendRequest(request, (function(_this) {
      return function(html) {
        _this.elements.tab.html(html);
        _this.elements.throbber = _this.elements.tab.find('.throbber');
        _this.elements.wrapper = _this.elements.tab.find('.video-wrapper');
        return _this.showLoadingOverlay();
      };
    })(this));
  };

  SpotifyUI.prototype.showWatchTab = function() {
    var callback, _i, _len, _ref;
    $('.active').removeClass('active');
    this.elements.menuItem.addClass('active');
    this.elements.tab.removeClass('hidden');
    this.elements.tab.find('.root').show();
    $(window).resize();
    _ref = this.callbacks.onTabShown;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      callback = _ref[_i];
      callback();
    }
    return history.pushState({}, 'Watch', '/watch');
  };

  SpotifyUI.prototype.hideWatchTab = function() {
    var callback, _i, _len, _ref, _results;
    this.elements.menuItem.removeClass('active');
    this.elements.tab.addClass('hidden');
    this.elements.tab.find('.root').hide();
    _ref = this.callbacks.onTabHidden;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      callback = _ref[_i];
      _results.push(callback());
    }
    return _results;
  };

  SpotifyUI.prototype.showLoadingOverlay = function() {
    return this.elements.throbber.removeClass('hide');
  };

  SpotifyUI.prototype.hideLoadingOverlay = function() {
    return this.elements.throbber.addClass('hide');
  };

  return SpotifyUI;

})();

if (window.location.pathname === '/watch') {
  window.location = '/collection/playlists#watch';
}

(function() {
  var appUI, loadImmediately, manager, ui;
  ui = new SpotifyUI();
  ui.doBinds();
  ui.loadExtraResources();
  appUI = new AppUI();
  manager = new PlayerManager();
  loadImmediately = window.location.hash === '#watch';
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var event;
    event = new CustomEvent(request.title, {
      detail: request.args
    });
    return document.dispatchEvent(event);
  });
  $(document).ready(function() {
    ui.attachMenuItem();
    ui.createWatchTab();
    if (loadImmediately) {
      return $('#overlay').show();
    }
  });
  return ui.onStarted(function() {
    var player, spotify;
    player = new Player();
    spotify = new SpotifyInterface();
    setTimeout(function() {
      return manager.setActive(true);
    }, 500);
    manager.onVideoChanged(appUI.onVideoChanged);
    manager.onVideoChanged(spotify.onVideoChanged);
    spotify.onUserNavigated(function(path) {
      if (path !== '/watch') {
        return ui.hideWatchTab();
      }
    });
    if (loadImmediately) {
      $('#overlay').hide();
      $('#section-user').addClass('hidden');
      return ui.showWatchTab();
    }
  });
})();
