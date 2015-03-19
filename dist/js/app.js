var AppUI,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

AppUI = (function() {
  var POPUP_TRANSITION_DURATION;

  POPUP_TRANSITION_DURATION = 300;

  function AppUI(wrapperUI) {
    this.onMouseMove = __bind(this.onMouseMove, this);
    this.onTrackChange = __bind(this.onTrackChange, this);
    this.onTrack = __bind(this.onTrack, this);
    this.onKey = __bind(this.onKey, this);
    this.reloadBinds = __bind(this.reloadBinds, this);
    this.isExpanded = false;
    this.isFullscreen = false;
    this.mouseActivityTimeout = 0;
    this.popupTimeout = {
      show: 0,
      hide: 0
    };
    this.wrapperUI = wrapperUI;
  }

  AppUI.prototype.init = function() {
    var contexts;
    contexts = $('#app-player').add($('#now-playing-widgets iframe'));
    $(window).keydown(this.onKey);
    $(window).mousemove($.throttle(100, this.onMouseMove));
    return document.addEventListener('player_track_change', this.onTrack);
  };

  AppUI.prototype.reloadBinds = function() {
    $('#app-player').contents().on({
      mousemove: $.throttle(100, this.onMouseMove),
      keydown: this.onKey
    });
    return $('#now-playing-widgets iframe').contents().on({
      mousemove: $.throttle(100, this.onMouseMove),
      keydown: this.onKey
    });
  };

  AppUI.prototype.onKey = function(e) {
    if (e.keyCode === 69) {
      this.toggleExpanded();
    }
    if (e.keyCode === 70) {
      this.toggleFullscreen();
      return this.toggleExpanded();
    }
  };

  AppUI.prototype.onTrack = function(event) {
    this.reloadBinds();
    return this.onTrackChange(event.detail[0]);
  };

  AppUI.prototype.onTrackChange = function(track) {
    if (!this.isExpanded) {
      return;
    }
    $('body').removeClass('show-popup');
    setTimeout(function() {
      $('#popup-name').html(track.name);
      return $('#popup-artist').html(track.artistName);
    }, POPUP_TRANSITION_DURATION);
    clearTimeout(this.popupTimeout.show);
    clearTimeout(this.popupTimeout.hide);
    this.popupTimeout.show = setTimeout(function() {
      return $('body').addClass('show-popup');
    }, 4000);
    return this.popupTimeout.hide = setTimeout(function() {
      return $('body').removeClass('show-popup');
    }, 9000);
  };

  AppUI.prototype.onVideoChanged = function(video) {
    $('#video-title').html(video.snippet.title);
    return $('#channel-name').html(video.snippet.channelTitle);
  };

  AppUI.prototype.onMouseMove = function() {
    $('body').removeClass('hide-controls');
    clearTimeout(this.mouseActivityTimeout);
    return this.mouseActivityTimeout = setTimeout(function() {
      return $('body').addClass('hide-controls');
    }, 2000);
  };

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
    $('body').toggleClass('watchmode', this.isExpanded);
    return setTimeout(function() {
      return $(window).resize();
    }, 500);
  };

  return AppUI;

})();



var Player,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Player = (function() {
  Player.ID = 0;

  function Player(track, videoId, isCurrent) {
    this.makeCurrent = __bind(this.makeCurrent, this);
    this.setTrack = __bind(this.setTrack, this);
    this.onStateChange = __bind(this.onStateChange, this);
    this.getVolume = __bind(this.getVolume, this);
    this.setVolume = __bind(this.setVolume, this);
    this.seekTo = __bind(this.seekTo, this);
    this.togglePlay = __bind(this.togglePlay, this);
    this.loadVideo = __bind(this.loadVideo, this);
    this.onReady = __bind(this.onReady, this);
    var playerLoadInterval;
    this._id = Player.ID++;
    $('.video-wrapper').prepend('<div id="player-' + this._id + '"></div>');
    this.YT = new YT.Player("player-" + this._id, {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        rel: 0,
        disablekb: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        hd: 1,
        showinfo: 0,
        start: 1
      }
    });
    this.onReadyCallbacks = [];
    playerLoadInterval = setInterval((function(_this) {
      return function() {
        var callback, _i, _len, _ref, _results;
        if (_this.YT.loadVideoById != null) {
          clearInterval(playerLoadInterval);
          _this.playerIsReady = true;
          _this.doBinds();
          _ref = _this.onReadyCallbacks;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            callback = _ref[_i];
            _results.push(callback());
          }
          return _results;
        }
      };
    })(this), 200);
    this.element = $('#player-' + this._id);
    this.playerIsReady = false;
    this.track = track;
    this.isCurrent = isCurrent;
    this.volume = 100;
  }

  Player.prototype.doBinds = function() {
    document.addEventListener('player_set_video_volume', $.throttle(50, (function(_this) {
      return function(e) {
        return _this.setVolume(e.detail[1] * 100);
      };
    })(this)));
    document.addEventListener('player_play', (function(_this) {
      return function(e) {
        return _this.togglePlay(true);
      };
    })(this));
    document.addEventListener('player_pause', (function(_this) {
      return function(e) {
        return _this.togglePlay(false);
      };
    })(this));
    if (this.isCurrent) {
      document.addEventListener('player_seek', (function(_this) {
        return function(e) {
          return _this.seekTo(e.detail[1] / 1000);
        };
      })(this));
    }
    return this.YT.addEventListener('onStateChange', this.onStateChange);
  };

  Player.prototype.onReady = function(callback) {
    if (this.playerIsReady) {
      return callback();
    } else {
      return this.onReadyCallbacks.push(callback);
    }
  };

  Player.prototype.loadVideo = function(id) {
    this.YT.loadVideoById(id, 0, 'maxres');
    this.YT.setPlaybackQuality('highres');
    if (!this.isCurrent) {
      this.YT.seekTo(2, true);
    }
    return this.onReady((function(_this) {
      return function() {
        if (!_this.isCurrent) {
          return _this.YT.setVolume(0);
        }
      };
    })(this));
  };

  Player.prototype.togglePlay = function(play) {
    if (play) {
      return this.YT.playVideo();
    } else {
      return this.YT.pauseVideo();
    }
  };

  Player.prototype.seekTo = function(time) {
    return this.YT.seekTo(time, true);
  };

  Player.prototype.setVolume = function(volume) {
    this.volume = volume;
    return this.YT.setVolume(volume);
  };

  Player.prototype.getVolume = function() {
    return this.volume;
  };

  Player.prototype.onStateChange = function(state) {
    if (state.data === YT.PlayerState.PLAYING && !this.isCurrent) {
      return this.YT.pauseVideo();
    }
  };

  Player.prototype.setTrack = function(track) {
    return this.track = track;
  };

  Player.prototype.makeCurrent = function() {
    this.isCurrent = true;
    this.YT.setVolume(0);
    this.YT.playVideo();
    return document.addEventListener('player_seek', (function(_this) {
      return function(e) {
        return _this.seekTo(e.detail[1] / 1000);
      };
    })(this));
  };

  Player.prototype.onVideoLoaded = function() {};

  Player.prototype.onFinished = function() {};

  Player.prototype.onBuffering = function() {};

  Player.prototype.remove = function() {
    this.YT.destroy();
    return this.element.remove();
  };

  return Player;

})();

var PlayerManager,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

PlayerManager = (function() {
  var CROSSFADE_STEP_SIZE;

  CROSSFADE_STEP_SIZE = 50;

  function PlayerManager() {
    this.startTimer = __bind(this.startTimer, this);
    this.onTrack = __bind(this.onTrack, this);
    this.updateCurrentTracks = __bind(this.updateCurrentTracks, this);
    this.preloadTrack = __bind(this.preloadTrack, this);
    var YTAPILoadInterval;
    this.callbacks = {
      onVideoChanged: []
    };
    this.timer = null;
    this.YTAPILoaded = false;
    this.crossfadeShouldStop = false;
    this.players = {
      current: null,
      next: null
    };
    this.tracks = null;
    YTAPILoadInterval = setInterval((function(_this) {
      return function() {
        if (window.YT && window.YT.Player) {
          clearInterval(YTAPILoadInterval);
          return _this.YTAPILoaded = true;
        }
      };
    })(this), 100);
    document.addEventListener('player_track_change', this.updateCurrentTracks);
  }

  PlayerManager.prototype.init = function() {
    return this.players.current = new Player(null, '', true);
  };

  PlayerManager.prototype.setActive = function(isActive) {
    if (isActive) {
      document.removeEventListener('player_track_change', this.updateCurrentTracks);
      document.addEventListener('player_track_change', this.onTrack);
      if (this.tracks != null) {
        return this.onTrack({
          detail: [this.tracks.current, this.tracks.next]
        });
      }
    } else {
      document.addEventListener('player_track_change', this.updateCurrentTracks);
      return document.removeEventListener('player_track_change', this.onTrack);
    }
  };

  PlayerManager.prototype.preloadTrack = function(track) {
    return this.getVideoFromTrack(track, (function(_this) {
      return function(video) {
        var _ref;
        if ((_ref = _this.players.next) != null) {
          _ref.remove();
        }
        return _this.players.next = new Player(track, video.id.videoId, false);
      };
    })(this));
  };

  PlayerManager.prototype.updateCurrentTracks = function(event) {
    return this.tracks = {
      current: event.detail[0],
      next: event.detail[1]
    };
  };

  PlayerManager.prototype.onTrack = function(event) {
    var id, isFirst;
    id = 0;
    isFirst = this.tracks == null;
    if (isFirst || event.detail[0]._pid !== this.tracks.current._pid) {
      if (this.players.next && this.players.next.track._pid === event.detail[0]._pid) {
        this.players.next.makeCurrent();
        this.crossfade(600, (function(_this) {
          return function() {
            _this.players.current.remove();
            _this.players.current = _this.players.next;
            _this.players.next = null;
            _this.preloadTrack(event.detail[1]);
            return _this.startTimer();
          };
        })(this));
      } else {
        this.players.current.setTrack(event.detail[0]);
        this.getVideoFromTrack(event.detail[0], (function(_this) {
          return function(video) {
            var callback, _i, _len, _ref, _results;
            _this.players.current.onReady(function() {
              _this.players.current.loadVideo(video.id.videoId);
              if (isFirst) {
                _this.players.current.togglePlay(false);
              }
              return _this.startTimer();
            });
            _ref = _this.callbacks.onVideoChanged;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              callback = _ref[_i];
              _results.push(callback(video));
            }
            return _results;
          };
        })(this));
        this.preloadTrack(event.detail[1]);
      }
    } else if (!isFirst && event.detail[0]._pid !== this.tracks.current._pid) {
      this.players.current.seekTo(0);
    }
    return this.updateCurrentTracks(event);
  };

  PlayerManager.prototype.crossfade = function(duration, onFinished) {
    var interval, step, targetVolume;
    $('#player-' + this.players.current._id).css({
      opacity: 0
    });
    targetVolume = this.players.current.getVolume();
    step = 0;
    return interval = setInterval((function(_this) {
      return function() {
        var progress;
        if (_this.crossfadeShouldStop) {
          clearInterval(interval);
          return;
        }
        progress = (step++ * CROSSFADE_STEP_SIZE) / duration;
        if (progress > 1) {
          clearInterval(interval);
          return onFinished();
        } else {
          _this.players.current.setVolume(parseInt((1 - progress) * targetVolume));
          return _this.players.next.setVolume(parseInt(progress * targetVolume));
        }
      };
    })(this), CROSSFADE_STEP_SIZE);
  };

  PlayerManager.prototype.stopCrossfade = function() {
    return this.crossfadeShouldStop = true;
  };

  PlayerManager.prototype.startTimer = function() {
    clearInterval(this.timer);
    return this.timer = setInterval((function(_this) {
      return function() {
        var context, current, duration;
        duration = _this.players.current.YT.getDuration() * 1000;
        current = (_this.players.current.YT.getCurrentTime() * 1000) + 1000;
        if (isNaN(duration || parseInt(duration === 0))) {
          return;
        }
        if (duration <= current) {
          context = $('#app-player').contents();
          $('#next', context).click();
          return clearInterval(_this.timer);
        }
      };
    })(this), 500);
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
    $('body').addClass('watching');
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
    $('body').removeClass('watching');
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

var Timer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Timer = (function() {
  function Timer(time) {
    this.stop = __bind(this.stop, this);
    this.reset = __bind(this.reset, this);
    this.pause = __bind(this.pause, this);
    this.endTime = time;
    this.currentTime = 0;
    this.prevTime = 0;
    console.info('timer created', time);
  }

  Timer.prototype.onFinished = function(callback) {
    return this.callback = callback;
  };

  Timer.prototype.jumpTo = function(time) {
    return this.currentTime = time;
  };

  Timer.prototype.start = function() {
    this.prevTime = new Date().getTime();
    return this.intervalID = setInterval((function(_this) {
      return function() {
        var time;
        time = new Date().getTime();
        _this.currentTime += time - _this.prevTime;
        _this.prevTime = time;
        if (_this.currentTime >= _this.endTime) {
          _this.stop();
          return _this.callback(_this.currentTime - _this.endTime);
        }
      };
    })(this), 200);
  };

  Timer.prototype.pause = function() {
    return clearInterval(this.intervalID);
  };

  Timer.prototype.reset = function() {
    return this.currentTime = 0;
  };

  Timer.prototype.stop = function() {
    this.pause();
    return this.currentTime = 0;
  };

  return Timer;

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
    console.info(request.title);
    event = new CustomEvent(request.title, {
      detail: request.args
    });
    return document.dispatchEvent(event);
  });
  $(document).ready(function() {
    ui.attachMenuItem();
    ui.createWatchTab();
    appUI.init();
    if (loadImmediately) {
      return $('#overlay').show();
    }
  });
  return ui.onStarted(function() {
    var spotify;
    spotify = new SpotifyInterface();
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
      ui.showWatchTab();
      manager.init();
      return manager.setActive(true);
    } else {
      return ui.onTabShown(function() {
        manager.init();
        return manager.setActive(true);
      });
    }
  });
})();
