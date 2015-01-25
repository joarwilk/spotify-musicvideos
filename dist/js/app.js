var Player,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Player = (function() {
  function Player() {
    this.onPlayState = __bind(this.onPlayState, this);
    this.seek = __bind(this.seek, this);
    this.changeTrack = __bind(this.changeTrack, this);
    var YTAPILoadInterval;
    this.currentTrack = null;
    YTAPILoadInterval = 0;
    YTAPILoadInterval = setInterval((function(_this) {
      return function() {
        console.log(_this.player);
        if (window.YT && window.YT.Player) {
          clearInterval(YTAPILoadInterval);
          _this.player = new window.YT.Player('youtube-frame', {
            videoId: '',
            playerVars: {
              'autoplay': 1,
              'controls': 1,
              'rel': 0,
              'disablekb': 1,
              'iv_load_policy': 3,
              'modestbranding ': 1,
              'hd': 1,
              'showinfo': 0
            }
          });
          if (_this.currentTrack === !null) {
            return _this.changeTrack(_this.currentTrack);
          }
        }
      };
    })(this), 100);
  }

  Player.prototype.changeTrack = function(track) {
    this.currentTrack = {
      name: track.name,
      artist: track.artist,
      position: 0
    };
    return this.queryYoutubeVideos((function(_this) {
      return function(items) {
        var interval, video;
        console.log(items);
        video = items[0];
        _this.player.loadVideoById(video.id.videoId, 0, 'maxres');
        _this.player.setPlaybackQuality('highres');
        _this.player.mute();
        _this.player.seekTo(1, true);
        return interval = setInterval(function() {
          var query;
          if (_this.player.getDuration() === 0) {
            return;
          }
          clearInterval(interval);
          query = "" + track.name + " " + track.artist + " official";
          return $.getJSON("https://api.soundcloud.com/tracks.json?q=" + query + "&client_id=b45b1aa10f1ac2941910a7f0d10f8e28&app_version=9dc8303", function(items) {
            var diff, i, item, params, _i, _len, _results;
            _results = [];
            for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
              item = items[i];
              diff = Math.abs((item.duration / 1000) - _this.player.getDuration());
              if (diff < 2) {
                console.log("Using " + item.title);
                params = {
                  youtube: video.id.videoId,
                  ytime: _this.player.getDuration(),
                  soundcloud: item.permalink_url,
                  stime: parseInt(item.duration / 1000)
                };
                $.getJSON('http://localhost:8888/delay', params, function(delay) {
                  return console.log(delay);
                }).error(function(a, b) {
                  return console.error(a, b);
                });
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          });
        }, 200);
      };
    })(this));
  };

  Player.prototype.seek = function(position) {
    console.log('seeking to', position / 1000);
    return this.player.seekTo(position / 1000 + 2, true);
  };

  Player.prototype.onPlayState = function(shouldPlay) {
    if (shouldPlay) {
      return this.player.playVideo();
    } else {
      return this.player.pauseVideo();
    }
  };

  Player.prototype.queryYoutubeVideos = function(callback) {
    var query;
    query = encodeURIComponent(this.currentTrack.name + ' ' + this.currentTrack.artist + ' offical video');
    return $.getJSON('https://content.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=' + query + '&key=AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU', function(data) {
      return callback(data.items);
    });
  };

  return Player;

})();

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
    this.updateElements();
    this.callbacks = {
      onState: [],
      onPlayState: [],
      onTrack: [],
      onSeek: []
    };
    this.player = {
      playing: this.elements.playButton.hasClass('playing'),
      position: 0,
      name: this.elements.trackName.text(),
      artist: this.elements.trackArtist.text()
    };
  }

  SpotifyInterface.prototype.updateElements = function() {
    var context;
    context = $('#app-player').contents();
    return this.elements = {
      playButton: $('#play-pause', context),
      timeMarker: $('#track-current', context),
      trackName: $('#track-name a', context),
      trackArtist: $('#track-artist a', context)
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
      track: setInterval((function(_this) {
        return function() {
          var artist, artistChanged, callback, name, playStateChanged, trackChanged, _i, _j, _len, _len1, _ref, _ref1;
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
            _ref1 = _this.callbacks.onTrack;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              callback = _ref1[_j];
              callback(_this.getPlayerInfo());
            }
            return console.log("Current song: " + name + " " + artist);
          }
        };
      })(this), 250)
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
    var startClassInterval;
    this.callbacks = {
      onStarted: [],
      onTabShown: [],
      onTabHidden: []
    };
    this.elements = {
      tab: null,
      menuItem: null,
      body: $('body')
    };
    startClassInterval = 0;
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

  SpotifyUI.prototype.doBinds = function() {
    $(document).on('click', '#nav-watch', this.showWatchTab);
    return $(document).on('click', '#nav-items > li > a:not(#nav-watch, #nav-search)', this.hideWatchTab);
  };

  SpotifyUI.prototype.loadExtraResources = function() {
    $('head').append('<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">');
    return chrome.extension.sendRequest({
      cmd: 'read_script'
    }, (function(_this) {
      return function(js) {
        return eval(js);
      };
    })(this));
  };

  SpotifyUI.prototype.attachMenuItem = function() {
    var navMenuHTML;
    navMenuHTML = "<li>\n  <a data-href=\"follow\" id=\"nav-watch\" class=\"standard-menu-item\">\n    <i class=\"fa fa-youtube-play\"></i>\n    <span class=\"nav-text\">Watch</span>\n  </a>\n</li>";
    return this.elements.menuItem = $(navMenuHTML).insertBefore($('.item-profile')).find('a');
  };

  SpotifyUI.prototype.createWatchTab = function() {
    var tabHTML;
    tabHTML = "<div id=\"section-watch\" class=\"stacked hidden\"></div>";
    this.elements.tab = $(tabHTML).insertAfter($('#section-follow'));
    return chrome.extension.sendRequest({
      cmd: 'read_file'
    }, (function(_this) {
      return function(html) {
        _this.elements.tab.html(html);
        _this.elements.throbber = _this.elements.tab.find('.throbber');
        return _this.showLoadingOverlay();
      };
    })(this));
  };

  SpotifyUI.prototype.showWatchTab = function() {
    var callback, height, _i, _len, _ref;
    $('.active').removeClass('active');
    this.elements.menuItem.addClass('active');
    this.elements.tab.removeClass('hidden');
    this.elements.tab.find('.root').fadeIn(600);
    height = this.elements.tab.find('.video-wrapper').innerHeight();
    this.elements.tab.find('.video-wrapper').css({
      top: $(window).height() / 2 - height / 2
    });
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
  var loadImmediately, ui;
  ui = new SpotifyUI();
  ui.doBinds();
  ui.loadExtraResources();
  loadImmediately = window.location.hash === '#watch';
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
    spotify = SpotifyInterface.get();
    ui.onTabShown(spotify.runPlayerQuery);
    ui.onTabHidden(spotify.stopPlayerQuery);
    spotify.onTrack(player.changeTrack);
    spotify.onSeek(player.seek);
    spotify.onPlayState(player.onPlayState);
    if (loadImmediately) {
      $('#overlay').hide();
      return ui.showWatchTab();
    }
  });
})();