

var Player;

Player = (function() {
  var YT_STATE_BUFFERING, YT_STATE_CUED, YT_STATE_ENDED, YT_STATE_PAUSED, YT_STATE_PLAYING, YT_STATE_UNSTARTED;

  YT_STATE_UNSTARTED = -1;

  YT_STATE_ENDED = 0;

  YT_STATE_PLAYING = 1;

  YT_STATE_PAUSED = 2;

  YT_STATE_BUFFERING = 3;

  YT_STATE_CUED = 5;

  function Player(elementID, otherPlayer) {
    if (otherPlayer instanceof Player) {
      this.YT = otherPlayer.YT;
    } else {
      this.YT = new window.YT.Player(elementID, {
        videoId: '',
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          disablekb: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          hd: 1,
          showinfo: 0
        }
      });
    }
    this.element = $('#' + elementID);
    this.doBinds();
  }

  Player.prototype.doBinds = function() {};

  Player.prototype.loadVideo = function(id) {
    this.YT.loadVideoById(id, 0, 'maxres');
    return this.YT.setPlaybackQuality('highres');
  };

  Player.prototype.seekTo = function(time) {};

  Player.prototype.onStateChange = function(state) {

    /*switch state:
      when YT_STATE_ENDED:
    
      break
     */
  };

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
    this.preloadTrack = __bind(this.preloadTrack, this);
    this.YTAPILoaded = false;
    this.players = {
      current: null,
      next: null
    };
    document.addEventListener('player_track_change', (function(_this) {
      return function(e) {
        if (_this.players.next && _this.players.next.track._pid === e.detail[0]._pid) {
          _this.players.current = new Player('current-player', _this.players.next);
        }
        return _this.preloadTrack(e.detail[1]);
      };
    })(this));
  }

  PlayerManager.prototype.init = function() {
    var YTAPILoadInterval;
    return YTAPILoadInterval = setInterval((function(_this) {
      return function() {
        if (window.YT && window.YT.Player) {
          clearInterval(YTAPILoadInterval);
          return _this.YTAPILoaded = true;
        }
      };
    })(this), 100);
  };

  PlayerManager.prototype.preloadTrack = function(track) {
    return this.getVideoIdFromTrack(track, (function(_this) {
      return function(id) {
        _this.players.next = new PreloadPlayer('preload-player');
        return _this.players.next.loadVideo(id);
      };
    })(this));
  };

  PlayerManager.prototype.crossfade = function(duration, onFinished) {
    var interval, step;
    this.players.current.element.fadeOut(duration);
    this.players.next.element.fadeIn(duration);
    step = 0;
    return interval = setInterval(function() {
      var progress;
      progress = (step++ * CROSSFADE_STEP_SIZE) / duration;
      if (progress >= 1) {
        clearInterval(interval);
        return onFinished();
      } else {
        current.setVolume((1 - progress) * current.getVolume());
        return next.setVolume(progress.current.getVolume());
      }
    }, CROSSFADE_STEP_SIZE);
  };

  PlayerManager.prototype.getVideoIdFromTrack = function(track, callback) {
    var params;
    params = {
      part: 'id,snippet',
      q: track.name + " " + track.artistName + " offical video",
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'
    };
    return $.getJSON('https://content.googleapis.com/youtube/v3/search', params, function(data) {
      return callback(data.items[0].id.videoId);
    });
  };

  return PlayerManager;

})();

var PreloadPlayer,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

PreloadPlayer = (function(_super) {
  __extends(PreloadPlayer, _super);

  function PreloadPlayer(elementID) {
    PreloadPlayer.__super__.constructor.call(this, elementID);
    this.element.hide();
  }

  PreloadPlayer.prototype.doBinds = function() {
    return document.addEventListener('player_set_volume', function(e) {
      return this.setVolume(args[1]);
    });
  };

  PreloadPlayer.prototype.loadVideo = function(id) {
    PreloadPlayer.__super__.loadVideo.call(this, id);
    return console.info('loadvideo');
  };

  return PreloadPlayer;

})(Player);

var SpotifyInterface,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SpotifyInterface = (function() {
  var instance;

  instance = null;

  function SpotifyInterface() {
    this.stopPlayerQuery = __bind(this.stopPlayerQuery, this);
    this.runPlayerQuery = __bind(this.runPlayerQuery, this);
    this.updateElements = __bind(this.updateElements, this);
    this.currentTime = 0;
    this.shouldRun = false;
    this.currentPath = '';
    this.updateElements();
    this.callbacks = {
      onState: [],
      onPlayState: [],
      onTrack: [],
      onSeek: [],
      onUserNavigated: []
    };
    this.player = {
      playing: this.elements.playButton.hasClass('playing'),
      position: 0,
      name: this.elements.trackName.text(),
      artist: this.elements.trackArtist.text(),
      duration: 0
    };
  }

  SpotifyInterface.prototype.updateElements = function() {
    var context;
    context = $('#app-player').contents();
    return this.elements = {
      playButton: $('#play-pause', context),
      trackName: $('#track-name a', context),
      trackArtist: $('#track-artist a', context),
      timeMarker: $('#track-current', context),
      duration: $('#track-length', context)
    };
  };

  SpotifyInterface.prototype.runPlayerQuery = function() {
    var updateTime;
    this.shouldRun = true;
    this.previousTimestamp = 0;
    updateTime = (function(_this) {
      return function(timestamp) {
        _this.player.position += timestamp - _this.previousTimestamp;
        _this.previousTimestamp = timestamp;
        if (_this.shouldRun) {
          return requestAnimationFrame(updateTime);
        }
      };
    })(this);
    requestAnimationFrame(updateTime);
    return this.intervals = {

      /*
      The position interval looks at the spotify
      player DOM to retrieve the current position
      in minutes and seconds. If we're diffing
      too much with our internal position, the
      user has seeked
       */
      position: setInterval((function(_this) {
        return function() {
          var callback, markerTextSplit, milliseconds, minutes, seconds, timeMarkerText, _i, _len, _ref, _results;
          if (!_this.player.playing) {
            return;
          }
          timeMarkerText = _this.elements.timeMarker.text();
          markerTextSplit = timeMarkerText.split(':');
          minutes = parseInt(markerTextSplit[0]);
          seconds = parseInt(markerTextSplit[1]);
          milliseconds = 1000 * (minutes * 60 + seconds);
          if (Math.abs(_this.player.position - milliseconds) > 3500) {
            _this.player.position = milliseconds;
            console.log('Seek');
            _ref = _this.callbacks.onSeek;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              callback = _ref[_i];
              _results.push(callback(milliseconds));
            }
            return _results;
          }
        };
      })(this), 200),

      /*
      The track interval looks at the play button
      as well as the text and updates the player state
       */
      track: setInterval((function(_this) {
        return function() {
          var artist, artistChanged, callback, duration, name, playStateChanged, trackChanged, _i, _j, _len, _len1, _ref, _ref1;
          _this.updateElements();
          name = _this.elements.trackName[0].innerText;
          artist = _this.elements.trackArtist[0].innerText;
          trackChanged = name !== _this.player.name;
          artistChanged = artist !== _this.player.artist;
          playStateChanged = _this.player.playing !== _this.elements.playButton.hasClass('playing');
          if (playStateChanged) {
            console.log(_this.player.playing ? 'Paused' : 'Started');
            _this.player.playing = _this.elements.playButton.hasClass('playing');
            _ref = _this.callbacks.onPlayState;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              callback = _ref[_i];
              callback(_this.player.playing);
            }
          }
          if (trackChanged || artistChanged) {
            _this.player.name = name;
            _this.player.artist = artist;
            duration = _this.elements.duration[0].innerText.split(':');
            _this.player.duration = parseInt(duration[0] * 60) + parseInt(duration[1]);
            console.log(_this.player.duration);
            _ref1 = _this.callbacks.onTrack;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              callback = _ref1[_j];
              callback(_this.getPlayerInfo());
            }
            return console.log("Current song: " + name + " " + artist);
          }
        };
      })(this), 250),

      /*
      The URL interval checks the current URL
      and fires the userNavigated callback when
      the user has navigated
      
      A window.onPushState-event that triggers
      for javascript history events as well
      would be amazing, but that isn't
      implemented in browsers yet
       */
      url: setInterval((function(_this) {
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
      })(this), 333)
    };
  };

  SpotifyInterface.prototype.stopPlayerQuery = function() {
    var id, _i, _len, _ref, _results;
    this.shouldRun = false;
    _ref = this.intervals;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      id = _ref[_i];
      _results.push(clearInterval(id));
    }
    return _results;
  };

  SpotifyInterface.prototype.getPlayerInfo = function() {
    return this.player;
  };

  SpotifyInterface.prototype.onPlayState = function(callback) {
    return this.callbacks.onPlayState.push(callback);
  };

  SpotifyInterface.prototype.onTrack = function(callback) {
    return this.callbacks.onTrack.push(callback);
  };

  SpotifyInterface.prototype.onSeek = function(callback) {
    return this.callbacks.onSeek.push(callback);
  };

  SpotifyInterface.prototype.onUserNavigated = function(callback) {
    return this.callbacks.onUserNavigated.push(callback);
  };

  SpotifyInterface.get = function() {
    return instance != null ? instance : instance = new SpotifyInterface();
  };

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

var Synchronizer;

Synchronizer = (function() {
  function Synchronizer() {}

  Synchronizer.prototype.onTrack = function(track) {
    return console.log(chrome);
  };

  return Synchronizer;

})();

if (window.location.pathname === '/watch') {
  window.location = '/collection/playlists#watch';
}

(function() {
  var loadImmediately, manager, ui;
  ui = new SpotifyUI();
  ui.doBinds();
  ui.loadExtraResources();
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
    manager.init();
    if (loadImmediately) {
      return $('#overlay').show();
    }
  });
  return ui.onStarted(function() {
    var player, spotify, sync;
    player = new Player();
    sync = new Synchronizer();
    spotify = new SpotifyInterface();
    ui.onTabShown(spotify.runPlayerQuery);
    ui.onTabHidden(spotify.stopPlayerQuery);
    spotify.onTrack(sync.onTrack);
    spotify.onTrack(player.changeTrack);
    spotify.onSeek(player.seek);
    spotify.onPlayState(player.onPlayState);
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
