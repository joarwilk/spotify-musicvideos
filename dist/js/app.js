define(function() {
  var Elements;
  return Elements = (function() {
    function Elements() {}

    return Elements;

  })();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvRWxlbWVudHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQUEsQ0FBTyxTQUFBLEdBQUE7QUFDTCxNQUFBLFFBQUE7U0FBTTtBQUVTLElBQUEsa0JBQUEsR0FBQSxDQUFiOztvQkFBQTs7T0FIRztBQUFBLENBQVAsQ0FBQSxDQUFBIiwiZmlsZSI6InNjcmlwdHMvRWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUgLT5cbiAgY2xhc3MgRWxlbWVudHNcblxuICAgIGNvbnN0cnVjdG9yOiAoKSAtPlxuIl19


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvb3ZlcmxheS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic2NyaXB0cy9vdmVybGF5LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiIl19
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
    this.player.loadVideoById(id, 0, 'maxres');
    return this.player.setPlaybackQuality('highres');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvcGxheWVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLE1BQUE7O0FBQUE7QUFFRSxNQUFBLHdHQUFBOztBQUFBLEVBQUEsa0JBQUEsR0FBcUIsQ0FBQSxDQUFyQixDQUFBOztBQUFBLEVBQ0EsY0FBQSxHQUFpQixDQURqQixDQUFBOztBQUFBLEVBRUEsZ0JBQUEsR0FBbUIsQ0FGbkIsQ0FBQTs7QUFBQSxFQUdBLGVBQUEsR0FBa0IsQ0FIbEIsQ0FBQTs7QUFBQSxFQUlBLGtCQUFBLEdBQXFCLENBSnJCLENBQUE7O0FBQUEsRUFLQSxhQUFBLEdBQWdCLENBTGhCLENBQUE7O0FBT2EsRUFBQSxnQkFBQyxTQUFELEVBQVksV0FBWixHQUFBO0FBR1gsSUFBQSxJQUFHLFdBQUEsWUFBdUIsTUFBMUI7QUFDRSxNQUFBLElBQUMsQ0FBQSxFQUFELEdBQU0sV0FBVyxDQUFDLEVBQWxCLENBREY7S0FBQSxNQUFBO0FBR0UsTUFBQSxJQUFDLENBQUEsRUFBRCxHQUFVLElBQUEsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFWLENBQWlCLFNBQWpCLEVBQTRCO0FBQUEsUUFDcEMsT0FBQSxFQUFVLEVBRDBCO0FBQUEsUUFFcEMsVUFBQSxFQUNFO0FBQUEsVUFBQSxRQUFBLEVBQVUsQ0FBVjtBQUFBLFVBQ0EsUUFBQSxFQUFVLENBRFY7QUFBQSxVQUVBLEdBQUEsRUFBTSxDQUZOO0FBQUEsVUFHQSxTQUFBLEVBQVcsQ0FIWDtBQUFBLFVBSUEsY0FBQSxFQUFnQixDQUpoQjtBQUFBLFVBS0EsY0FBQSxFQUFpQixDQUxqQjtBQUFBLFVBTUEsRUFBQSxFQUFJLENBTko7QUFBQSxVQU9BLFFBQUEsRUFBVSxDQVBWO1NBSGtDO09BQTVCLENBQVYsQ0FIRjtLQUFBO0FBQUEsSUFnQkEsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFBLENBQUcsR0FBQSxHQUFLLFNBQVIsQ0FoQlgsQ0FBQTtBQUFBLElBa0JBLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FsQkEsQ0FIVztFQUFBLENBUGI7O0FBQUEsbUJBOEJBLE9BQUEsR0FBUyxTQUFBLEdBQUEsQ0E5QlQsQ0FBQTs7QUFBQSxtQkFvQ0EsU0FBQSxHQUFXLFNBQUMsRUFBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLGFBQVIsQ0FBc0IsRUFBdEIsRUFBMEIsQ0FBMUIsRUFBOEIsUUFBOUIsQ0FBQSxDQUFBO1dBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxrQkFBUixDQUE0QixTQUE1QixFQUZTO0VBQUEsQ0FwQ1gsQ0FBQTs7QUFBQSxtQkF3Q0EsTUFBQSxHQUFRLFNBQUMsSUFBRCxHQUFBLENBeENSLENBQUE7O0FBQUEsbUJBMkNBLGFBQUEsR0FBZSxTQUFDLEtBQUQsR0FBQTtBQUNiO0FBQUE7Ozs7T0FEYTtFQUFBLENBM0NmLENBQUE7O0FBQUEsbUJBa0RBLGFBQUEsR0FBZSxTQUFBLEdBQUEsQ0FsRGYsQ0FBQTs7QUFBQSxtQkFxREEsVUFBQSxHQUFZLFNBQUEsR0FBQSxDQXJEWixDQUFBOztBQUFBLG1CQXdEQSxXQUFBLEdBQWEsU0FBQSxHQUFBLENBeERiLENBQUE7O2dCQUFBOztJQUZGLENBQUEiLCJmaWxlIjoic2NyaXB0cy9wbGF5ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQbGF5ZXJcblxuICBZVF9TVEFURV9VTlNUQVJURUQgPSAtMVxuICBZVF9TVEFURV9FTkRFRCA9IDBcbiAgWVRfU1RBVEVfUExBWUlORyA9IDFcbiAgWVRfU1RBVEVfUEFVU0VEID0gMlxuICBZVF9TVEFURV9CVUZGRVJJTkcgPSAzXG4gIFlUX1NUQVRFX0NVRUQgPSA1XG5cbiAgY29uc3RydWN0b3I6IChlbGVtZW50SUQsIG90aGVyUGxheWVyKSAtPlxuICAgICMgV2UncmUgY3JlYXRpbmcgdGhpcyBwbGF5ZXIgZnJvbSBhbm90aGVyIG9uZVxuICAgICMgZS5nLiBhIHByZWxvYWRQbGF5ZXIgdGhhdCBoYXMgYmVlbiB0cmFuc2l0aW9uZWQgaW5cbiAgICBpZiBvdGhlclBsYXllciBpbnN0YW5jZW9mIFBsYXllclxuICAgICAgQFlUID0gb3RoZXJQbGF5ZXIuWVRcbiAgICBlbHNlXG4gICAgICBAWVQgPSBuZXcgd2luZG93LllULlBsYXllciBlbGVtZW50SUQsIHtcbiAgICAgICAgdmlkZW9JZDogJydcbiAgICAgICAgcGxheWVyVmFyczpcbiAgICAgICAgICBhdXRvcGxheTogMVxuICAgICAgICAgIGNvbnRyb2xzOiAxICMgU2hvdWxkIGJlIDBcbiAgICAgICAgICByZWwgOiAwXG4gICAgICAgICAgZGlzYWJsZWtiOiAxICMgRGlzYWJsZSBLZXlib2FyZFxuICAgICAgICAgIGl2X2xvYWRfcG9saWN5OiAzICMgRGlzYWJsZSBhbm5vdGF0aW9uc1xuICAgICAgICAgIG1vZGVzdGJyYW5kaW5nIDogMSAjIEhpZGUgc29tZSB1aSBpdGVtc1xuICAgICAgICAgIGhkOiAxICMgSGlnaGVzdCBRdWFsaXR5XG4gICAgICAgICAgc2hvd2luZm86IDAgIyBIaWRlIHZpZGVvIGluZm9ybWF0aW9uXG4gICAgICB9XG5cbiAgICBAZWxlbWVudCA9ICQoJyMnICsgZWxlbWVudElEKVxuXG4gICAgQGRvQmluZHMoKVxuXG4gIGRvQmluZHM6ICgpIC0+XG4gICAgI2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ3BsYXllcl9zZWVrJywgKGUpIC0+IEBzZWVrVG8gYXJnc1sxXSwgdHJ1ZVxuICAgICNkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdwbGF5ZXJfc2V0X3ZvbHVtZScsIChlKSAtPiBAc2V0Vm9sdW1lIGFyZ3NbMV1cblxuICAgICNAWVQuYWRkRXZlbnRMaXN0ZW5lciAnb25TdGF0ZUNoYW5nZScsIEBvblN0YXRlQ2hhbmdlXG5cbiAgbG9hZFZpZGVvOiAoaWQpIC0+XG4gICAgQHBsYXllci5sb2FkVmlkZW9CeUlkIGlkLCAwLCAnbWF4cmVzJ1xuICAgIEBwbGF5ZXIuc2V0UGxheWJhY2tRdWFsaXR5ICdoaWdocmVzJ1xuXG4gIHNlZWtUbzogKHRpbWUpIC0+XG5cblxuICBvblN0YXRlQ2hhbmdlOiAoc3RhdGUpIC0+XG4gICAgIyMjc3dpdGNoIHN0YXRlOlxuICAgICAgd2hlbiBZVF9TVEFURV9FTkRFRDpcblxuICAgICAgYnJlYWtcbiAgICAjIyNcblxuICBvblZpZGVvTG9hZGVkOiAoKSAtPlxuXG5cbiAgb25GaW5pc2hlZDogKCkgLT5cblxuXG4gIG9uQnVmZmVyaW5nOiAoKSAtPlxuXG4iXX0=
var PlayerManager;

PlayerManager = (function() {
  var CROSSFADE_STEP_SIZE;

  CROSSFADE_STEP_SIZE = 25;

  function PlayerManager() {
    this.YTAPILoaded = false;
    document.addEventListener('player_track_change', function(e) {
      this.preloadTrack(e.detail[1]);
      console.info(e);
      return console.info('Current track', e.detail[0]);
    });
  }

  PlayerManager.prototype.init = function() {
    var YTAPILoadInterval;
    return YTAPILoadInterval = setInterval((function(_this) {
      return function() {
        if (window.YT && window.YT.Player) {
          clearInterval(YTAPILoadInterval);
        }
        return _this.YTAPILoaded = true;
      };
    })(this), 100);
  };

  PlayerManager.prototype.preloadTrack = function(track) {
    return this.getVideoIdFromTrack(track, function(id) {
      var player;
      player = new PreloadPlayer('preload-player');
      return player.loadVideo(id);
    });
  };

  PlayerManager.prototype.crossfade = function(current, next, duration, onFinished) {
    var interval, step;
    if (!(current instanceof Player && next instanceof Player)) {
      throw new Exception('PlayerManager::crossfade requires two valid players');
    }
    current.element.fadeOut(duration);
    next.element.fadeIn(duration);
    step = 0;
    return interval = setInterval(function() {
      var progress;
      progress = (step * CROSSFADE_STEP_SIZE) / duration;
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
    var params, query;
    query = encodeURIComponent(this.track.name + " " + this.track.artistName + " offical video");
    params = {
      part: 'id%2Csnippet',
      q: query,
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'
    };
    return $.getJSON('https://content.googleapis.com/youtube/v3/search', params, function(data) {
      return callback(data.items[0].id.videoId);
    });
  };

  return PlayerManager;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvcGxheWVybWFuYWdlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBOztBQUFBO0FBRUUsTUFBQSxtQkFBQTs7QUFBQSxFQUFBLG1CQUFBLEdBQXNCLEVBQXRCLENBQUE7O0FBRWEsRUFBQSx1QkFBQSxHQUFBO0FBQ1gsSUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLEtBQWYsQ0FBQTtBQUFBLElBRUEsUUFBUSxDQUFDLGdCQUFULENBQTJCLHFCQUEzQixFQUFpRCxTQUFDLENBQUQsR0FBQTtBQUMvQyxNQUFBLElBQUMsQ0FBQSxZQUFELENBQWMsQ0FBQyxDQUFDLE1BQU8sQ0FBQSxDQUFBLENBQXZCLENBQUEsQ0FBQTtBQUFBLE1BQ0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFiLENBREEsQ0FBQTthQUVBLE9BQU8sQ0FBQyxJQUFSLENBQWMsZUFBZCxFQUE4QixDQUFDLENBQUMsTUFBTyxDQUFBLENBQUEsQ0FBdkMsRUFIK0M7SUFBQSxDQUFqRCxDQUZBLENBRFc7RUFBQSxDQUZiOztBQUFBLDBCQVVBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixRQUFBLGlCQUFBO1dBQUEsaUJBQUEsR0FBb0IsV0FBQSxDQUFZLENBQUEsU0FBQSxLQUFBLEdBQUE7YUFBQSxTQUFBLEdBQUE7QUFDOUIsUUFBQSxJQUFHLE1BQU0sQ0FBQyxFQUFQLElBQWEsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUExQjtBQUNFLFVBQUEsYUFBQSxDQUFjLGlCQUFkLENBQUEsQ0FERjtTQUFBO2VBR0EsS0FBQyxDQUFBLFdBQUQsR0FBZSxLQUplO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBWixFQUtqQixHQUxpQixFQURoQjtFQUFBLENBVk4sQ0FBQTs7QUFBQSwwQkFrQkEsWUFBQSxHQUFjLFNBQUMsS0FBRCxHQUFBO1dBQ1osSUFBQyxDQUFBLG1CQUFELENBQXFCLEtBQXJCLEVBQTRCLFNBQUMsRUFBRCxHQUFBO0FBQzFCLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFhLElBQUEsYUFBQSxDQUFlLGdCQUFmLENBQWIsQ0FBQTthQUNBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLEVBQWpCLEVBRjBCO0lBQUEsQ0FBNUIsRUFEWTtFQUFBLENBbEJkLENBQUE7O0FBQUEsMEJBMkJBLFNBQUEsR0FBVyxTQUFDLE9BQUQsRUFBVSxJQUFWLEVBQWdCLFFBQWhCLEVBQTBCLFVBQTFCLEdBQUE7QUFDVCxRQUFBLGNBQUE7QUFBQSxJQUFBLElBQUEsQ0FBQSxDQUFPLE9BQUEsWUFBbUIsTUFBbkIsSUFBOEIsSUFBQSxZQUFnQixNQUFyRCxDQUFBO0FBQ0UsWUFBVSxJQUFBLFNBQUEsQ0FBVyxxREFBWCxDQUFWLENBREY7S0FBQTtBQUFBLElBR0EsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFoQixDQUF3QixRQUF4QixDQUhBLENBQUE7QUFBQSxJQUlBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBYixDQUFvQixRQUFwQixDQUpBLENBQUE7QUFBQSxJQU1BLElBQUEsR0FBTyxDQU5QLENBQUE7V0FPQSxRQUFBLEdBQVcsV0FBQSxDQUFZLFNBQUEsR0FBQTtBQUNyQixVQUFBLFFBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxDQUFDLElBQUEsR0FBTyxtQkFBUixDQUFBLEdBQStCLFFBQTFDLENBQUE7QUFFQSxNQUFBLElBQUcsUUFBQSxJQUFZLENBQWY7QUFDRSxRQUFBLGFBQUEsQ0FBYyxRQUFkLENBQUEsQ0FBQTtlQUNBLFVBQUEsQ0FBQSxFQUZGO09BQUEsTUFBQTtBQUlFLFFBQUEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBQyxDQUFBLEdBQUksUUFBTCxDQUFBLEdBQWlCLE9BQU8sQ0FBQyxTQUFSLENBQUEsQ0FBbkMsQ0FBQSxDQUFBO2VBQ0EsSUFBSSxDQUFDLFNBQUwsQ0FBZSxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQWpCLENBQUEsQ0FBZixFQUxGO09BSHFCO0lBQUEsQ0FBWixFQVVULG1CQVZTLEVBUkY7RUFBQSxDQTNCWCxDQUFBOztBQUFBLDBCQStDQSxtQkFBQSxHQUFxQixTQUFDLEtBQUQsRUFBUSxRQUFSLEdBQUE7QUFDbkIsUUFBQSxhQUFBO0FBQUEsSUFBQSxLQUFBLEdBQVEsa0JBQUEsQ0FBc0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFSLEdBQWEsR0FBYixHQUFnQixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQXZCLEdBQWtDLGdCQUF2RCxDQUFSLENBQUE7QUFBQSxJQUVBLE1BQUEsR0FDRTtBQUFBLE1BQUEsSUFBQSxFQUFPLGNBQVA7QUFBQSxNQUNBLENBQUEsRUFBRyxLQURIO0FBQUEsTUFFQSxHQUFBLEVBQU0seUNBRk47S0FIRixDQUFBO1dBT0EsQ0FBQyxDQUFDLE9BQUYsQ0FBVyxrREFBWCxFQUE4RCxNQUE5RCxFQUFzRSxTQUFDLElBQUQsR0FBQTthQUNwRSxRQUFBLENBQVMsSUFBSSxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQUUsQ0FBQyxFQUFFLENBQUMsT0FBMUIsRUFEb0U7SUFBQSxDQUF0RSxFQVJtQjtFQUFBLENBL0NyQixDQUFBOzt1QkFBQTs7SUFGRixDQUFBIiwiZmlsZSI6InNjcmlwdHMvcGxheWVybWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFBsYXllck1hbmFnZXJcblxuICBDUk9TU0ZBREVfU1RFUF9TSVpFID0gMjVcblxuICBjb25zdHJ1Y3RvcjogKCkgLT5cbiAgICBAWVRBUElMb2FkZWQgPSBmYWxzZVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAncGxheWVyX3RyYWNrX2NoYW5nZScsIChlKSAtPlxuICAgICAgQHByZWxvYWRUcmFjayBlLmRldGFpbFsxXVxuICAgICAgY29uc29sZS5pbmZvIGVcbiAgICAgIGNvbnNvbGUuaW5mbyAnQ3VycmVudCB0cmFjaycsIGUuZGV0YWlsWzBdXG5cbiAgaW5pdDogKCkgLT5cbiAgICBZVEFQSUxvYWRJbnRlcnZhbCA9IHNldEludGVydmFsICgpID0+XG4gICAgICBpZiB3aW5kb3cuWVQgJiYgd2luZG93LllULlBsYXllclxuICAgICAgICBjbGVhckludGVydmFsIFlUQVBJTG9hZEludGVydmFsXG5cbiAgICAgIEBZVEFQSUxvYWRlZCA9IHRydWVcbiAgICAsICAxMDBcblxuICBwcmVsb2FkVHJhY2s6ICh0cmFjaykgLT5cbiAgICBAZ2V0VmlkZW9JZEZyb21UcmFjayB0cmFjaywgKGlkKSAtPlxuICAgICAgcGxheWVyID0gbmV3IFByZWxvYWRQbGF5ZXIoJ3ByZWxvYWQtcGxheWVyJylcbiAgICAgIHBsYXllci5sb2FkVmlkZW8gaWRcblxuICAjIFRyYW5zaXRpb24gdGhlIHZvbHVtZSBvZiB0aGUgbmV4dCB0cmFjayBpbnRvIHRoZSBpbml0aWFsXG4gICMgdm9sdW1lIG9mIHRoZSBjdXJyZW50IHRyYWNrLCB3aGlsZSBmYWRpbmcgb3V0XG4gICMgdGhlIGN1cnJlbnQgdHJhY2suXG4gICMgV2hlbiB3ZSdyZSBmaW5pc2hlZCwgZmlyZSB0aGUgb25GaW5pc2hlZCBjYWxsYmFja1xuICBjcm9zc2ZhZGU6IChjdXJyZW50LCBuZXh0LCBkdXJhdGlvbiwgb25GaW5pc2hlZCkgLT5cbiAgICB1bmxlc3MgY3VycmVudCBpbnN0YW5jZW9mIFBsYXllciBhbmQgbmV4dCBpbnN0YW5jZW9mIFBsYXllclxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignUGxheWVyTWFuYWdlcjo6Y3Jvc3NmYWRlIHJlcXVpcmVzIHR3byB2YWxpZCBwbGF5ZXJzJylcblxuICAgIGN1cnJlbnQuZWxlbWVudC5mYWRlT3V0IGR1cmF0aW9uXG4gICAgbmV4dC5lbGVtZW50LmZhZGVJbiBkdXJhdGlvblxuXG4gICAgc3RlcCA9IDBcbiAgICBpbnRlcnZhbCA9IHNldEludGVydmFsICgpIC0+XG4gICAgICBwcm9ncmVzcyA9IChzdGVwICogQ1JPU1NGQURFX1NURVBfU0laRSkgLyBkdXJhdGlvblxuXG4gICAgICBpZiBwcm9ncmVzcyA+PSAxXG4gICAgICAgIGNsZWFySW50ZXJ2YWwgaW50ZXJ2YWxcbiAgICAgICAgb25GaW5pc2hlZCgpXG4gICAgICBlbHNlXG4gICAgICAgIGN1cnJlbnQuc2V0Vm9sdW1lICgxIC0gcHJvZ3Jlc3MpICogY3VycmVudC5nZXRWb2x1bWUoKVxuICAgICAgICBuZXh0LnNldFZvbHVtZSBwcm9ncmVzcy5jdXJyZW50LmdldFZvbHVtZSgpXG5cbiAgICAsIENST1NTRkFERV9TVEVQX1NJWkVcblxuICBnZXRWaWRlb0lkRnJvbVRyYWNrOiAodHJhY2ssIGNhbGxiYWNrKSAtPlxuICAgIHF1ZXJ5ID0gZW5jb2RlVVJJQ29tcG9uZW50IFwiI3tAdHJhY2submFtZX0gI3tAdHJhY2suYXJ0aXN0TmFtZX0gb2ZmaWNhbCB2aWRlb1wiXG5cbiAgICBwYXJhbXMgPVxuICAgICAgcGFydDogJ2lkJTJDc25pcHBldCdcbiAgICAgIHE6IHF1ZXJ5XG4gICAgICBrZXk6ICdBSXphU3lEM3VmVWRPUU14WUVXdjB5TFZ2UG52dXFTcFNMVExmUFUnXG5cbiAgICAkLmdldEpTT04gJ2h0dHBzOi8vY29udGVudC5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaCcsIHBhcmFtcywgKGRhdGEpIC0+XG4gICAgICBjYWxsYmFjayhkYXRhLml0ZW1zWzBdLmlkLnZpZGVvSWQpXG4iXX0=
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

  return PreloadPlayer;

})(Player);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvcHJlbG9hZFBsYXllci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBO0VBQUE7K0JBQUE7O0FBQUE7QUFFRSxrQ0FBQSxDQUFBOztBQUFhLEVBQUEsdUJBQUMsU0FBRCxHQUFBO0FBQ1gsSUFBQSwrQ0FBTSxTQUFOLENBQUEsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQUEsQ0FGQSxDQURXO0VBQUEsQ0FBYjs7QUFBQSwwQkFLQSxPQUFBLEdBQVMsU0FBQSxHQUFBO1dBQ1AsUUFBUSxDQUFDLGdCQUFULENBQTJCLG1CQUEzQixFQUErQyxTQUFDLENBQUQsR0FBQTthQUFPLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSyxDQUFBLENBQUEsQ0FBaEIsRUFBUDtJQUFBLENBQS9DLEVBRE87RUFBQSxDQUxULENBQUE7O3VCQUFBOztHQUYwQixPQUE1QixDQUFBIiwiZmlsZSI6InNjcmlwdHMvcHJlbG9hZFBsYXllci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFByZWxvYWRQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXJcblxuICBjb25zdHJ1Y3RvcjogKGVsZW1lbnRJRCkgLT5cbiAgICBzdXBlcihlbGVtZW50SUQpXG5cbiAgICBAZWxlbWVudC5oaWRlKClcblxuICBkb0JpbmRzOiAoKSAtPlxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ3BsYXllcl9zZXRfdm9sdW1lJywgKGUpIC0+IEBzZXRWb2x1bWUgYXJnc1sxXSJdfQ==
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BvdGlmeWludGVyZmFjZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxnQkFBQTtFQUFBLGtGQUFBOztBQUFBO0FBQ0UsTUFBQSxRQUFBOztBQUFBLEVBQUEsUUFBQSxHQUFXLElBQVgsQ0FBQTs7QUFHYSxFQUFBLDBCQUFBLEdBQUE7QUFDWCw2REFBQSxDQUFBO0FBQUEsMkRBQUEsQ0FBQTtBQUFBLDJEQUFBLENBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsQ0FBZixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsU0FBRCxHQUFhLEtBRGIsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLFdBQUQsR0FBZ0IsRUFIaEIsQ0FBQTtBQUFBLElBS0EsSUFBQyxDQUFBLGNBQUQsQ0FBQSxDQUxBLENBQUE7QUFBQSxJQU9BLElBQUMsQ0FBQSxTQUFELEdBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBUyxFQUFUO0FBQUEsTUFDQSxXQUFBLEVBQWEsRUFEYjtBQUFBLE1BRUEsT0FBQSxFQUFTLEVBRlQ7QUFBQSxNQUdBLE1BQUEsRUFBUSxFQUhSO0FBQUEsTUFJQSxlQUFBLEVBQWlCLEVBSmpCO0tBUkYsQ0FBQTtBQUFBLElBY0EsSUFBQyxDQUFBLE1BQUQsR0FDRTtBQUFBLE1BQUEsT0FBQSxFQUFTLElBQUMsQ0FBQSxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQXJCLENBQStCLFNBQS9CLENBQVQ7QUFBQSxNQUNBLFFBQUEsRUFBVSxDQURWO0FBQUEsTUFFQSxJQUFBLEVBQU0sSUFBQyxDQUFBLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBcEIsQ0FBQSxDQUZOO0FBQUEsTUFHQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBdEIsQ0FBQSxDQUhSO0FBQUEsTUFJQSxRQUFBLEVBQVUsQ0FKVjtLQWZGLENBRFc7RUFBQSxDQUhiOztBQUFBLDZCQXlCQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtB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QUFBQSw2QkE4SEEsZUFBQSxHQUFpQixTQUFBLEdBQUE7QUFDZixRQUFBLDRCQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsU0FBRCxHQUFhLEtBQWIsQ0FBQTtBQUNBO0FBQUE7U0FBQSwyQ0FBQTtvQkFBQTtBQUNFLG9CQUFBLGFBQUEsQ0FBYyxFQUFkLEVBQUEsQ0FERjtBQUFBO29CQUZlO0VBQUEsQ0E5SGpCLENBQUE7O0FBQUEsNkJBbUlBLGFBQUEsR0FBZSxTQUFBLEdBQUE7QUFDYixXQUFPLElBQUMsQ0FBQSxNQUFSLENBRGE7RUFBQSxDQW5JZixDQUFBOztBQUFBLDZCQXNJQSxXQUFBLEdBQWEsU0FBQyxRQUFELEdBQUE7V0FDWCxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUF2QixDQUE0QixRQUE1QixFQURXO0VBQUEsQ0F0SWIsQ0FBQTs7QUFBQSw2QkF5SUEsT0FBQSxHQUFTLFNBQUMsUUFBRCxHQUFBO1dBQ1AsSUFBQyxDQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBbkIsQ0FBd0IsUUFBeEIsRUFETztFQUFBLENBeklULENBQUE7O0FBQUEsNkJBNElBLE1BQUEsR0FBUSxTQUFDLFFBQUQsR0FBQTtXQUNOLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQWxCLENBQXVCLFFBQXZCLEVBRE07RUFBQSxDQTVJUixDQUFBOztBQUFBLDZCQStJQSxlQUFBLEdBQWlCLFNBQUMsUUFBRCxHQUFBO1dBQ2YsSUFBQyxDQUFBLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBM0IsQ0FBZ0MsUUFBaEMsRUFEZTtFQUFBLENBL0lqQixDQUFBOztBQUFBLEVBa0pBLGdCQUFDLENBQUEsR0FBRCxHQUFNLFNBQUEsR0FBQTs4QkFDSixXQUFBLFdBQWdCLElBQUEsZ0JBQUEsQ0FBQSxFQURaO0VBQUEsQ0FsSk4sQ0FBQTs7MEJBQUE7O0lBREYsQ0FBQSIsImZpbGUiOiJzY3JpcHRzL3Nwb3RpZnlpbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTcG90aWZ5SW50ZXJmYWNlXG4gIGluc3RhbmNlID0gbnVsbFxuXG5cbiAgY29uc3RydWN0b3I6ICgpIC0+XG4gICAgQGN1cnJlbnRUaW1lID0gMFxuICAgIEBzaG91bGRSdW4gPSBmYWxzZVxuXG4gICAgQGN1cnJlbnRQYXRoID0gJydcblxuICAgIEB1cGRhdGVFbGVtZW50cygpXG5cbiAgICBAY2FsbGJhY2tzID1cbiAgICAgIG9uU3RhdGU6IFtdXG4gICAgICBvblBsYXlTdGF0ZTogW11cbiAgICAgIG9uVHJhY2s6IFtdXG4gICAgICBvblNlZWs6IFtdXG4gICAgICBvblVzZXJOYXZpZ2F0ZWQ6IFtdXG5cbiAgICBAcGxheWVyID1cbiAgICAgIHBsYXlpbmc6IEBlbGVtZW50cy5wbGF5QnV0dG9uLmhhc0NsYXNzICdwbGF5aW5nJ1xuICAgICAgcG9zaXRpb246IDBcbiAgICAgIG5hbWU6IEBlbGVtZW50cy50cmFja05hbWUudGV4dCgpXG4gICAgICBhcnRpc3Q6IEBlbGVtZW50cy50cmFja0FydGlzdC50ZXh0KClcbiAgICAgIGR1cmF0aW9uOiAwXG5cbiAgdXBkYXRlRWxlbWVudHM6ICgpID0+XG4gICAgY29udGV4dCA9ICQoJyNhcHAtcGxheWVyJykuY29udGVudHMoKSAjIFRoZSBwbGF5ZXIgaWZyYW1lIHdpZGdldFxuXG4gICAgQGVsZW1lbnRzID1cbiAgICAgIHBsYXlCdXR0b246ICQoJyNwbGF5LXBhdXNlJywgY29udGV4dClcbiAgICAgIHRyYWNrTmFtZTogJCgnI3RyYWNrLW5hbWUgYScsIGNvbnRleHQpXG4gICAgICB0cmFja0FydGlzdDogJCgnI3RyYWNrLWFydGlzdCBhJywgY29udGV4dClcbiAgICAgIHRpbWVNYXJrZXI6ICQoJyN0cmFjay1jdXJyZW50JywgY29udGV4dClcbiAgICAgIGR1cmF0aW9uOiAkKCcjdHJhY2stbGVuZ3RoJywgY29udGV4dClcblxuICBydW5QbGF5ZXJRdWVyeTogKCkgPT5cbiAgICBAc2hvdWxkUnVuID0gdHJ1ZVxuICAgIEBwcmV2aW91c1RpbWVzdGFtcCA9IDBcblxuICAgIHVwZGF0ZVRpbWUgPSAodGltZXN0YW1wKSA9PlxuICAgICAgQHBsYXllci5wb3NpdGlvbiArPSB0aW1lc3RhbXAgLSBAcHJldmlvdXNUaW1lc3RhbXBcbiAgICAgIEBwcmV2aW91c1RpbWVzdGFtcCA9IHRpbWVzdGFtcFxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdXBkYXRlVGltZSBpZiBAc2hvdWxkUnVuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHVwZGF0ZVRpbWVcblxuICAgIEBpbnRlcnZhbHMgPVxuICAgICAgIyMjXG4gICAgICBUaGUgcG9zaXRpb24gaW50ZXJ2YWwgbG9va3MgYXQgdGhlIHNwb3RpZnlcbiAgICAgIHBsYXllciBET00gdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIGluIG1pbnV0ZXMgYW5kIHNlY29uZHMuIElmIHdlJ3JlIGRpZmZpbmdcbiAgICAgIHRvbyBtdWNoIHdpdGggb3VyIGludGVybmFsIHBvc2l0aW9uLCB0aGVcbiAgICAgIHVzZXIgaGFzIHNlZWtlZFxuICAgICAgIyMjXG4gICAgICBwb3NpdGlvbjogc2V0SW50ZXJ2YWwoKCkgPT5cbiAgICAgICAgcmV0dXJuIHVubGVzcyBAcGxheWVyLnBsYXlpbmdcblxuICAgICAgICB0aW1lTWFya2VyVGV4dCA9IEBlbGVtZW50cy50aW1lTWFya2VyLnRleHQoKVxuICAgICAgICBtYXJrZXJUZXh0U3BsaXQgPSB0aW1lTWFya2VyVGV4dC5zcGxpdCAnOidcblxuICAgICAgICBtaW51dGVzID0gcGFyc2VJbnQgbWFya2VyVGV4dFNwbGl0WzBdXG4gICAgICAgIHNlY29uZHMgPSBwYXJzZUludCBtYXJrZXJUZXh0U3BsaXRbMV1cblxuICAgICAgICBtaWxsaXNlY29uZHMgPSAxMDAwICogKG1pbnV0ZXMgKiA2MCArIHNlY29uZHMpXG5cbiAgICAgICAgaWYgTWF0aC5hYnMoQHBsYXllci5wb3NpdGlvbiAtIG1pbGxpc2Vjb25kcykgPiAzNTAwXG4gICAgICAgICAgQHBsYXllci5wb3NpdGlvbiA9IG1pbGxpc2Vjb25kc1xuXG4gICAgICAgICAgY29uc29sZS5sb2cgJ1NlZWsnXG4gICAgICAgICAgZm9yIGNhbGxiYWNrIGluIEBjYWxsYmFja3Mub25TZWVrXG4gICAgICAgICAgICBjYWxsYmFjayhtaWxsaXNlY29uZHMpXG4gICAgICAsIDIwMCksXG4gICAgICAjIyNcbiAgICAgIFRoZSB0cmFjayBpbnRlcnZhbCBsb29rcyBhdCB0aGUgcGxheSBidXR0b25cbiAgICAgIGFzIHdlbGwgYXMgdGhlIHRleHQgYW5kIHVwZGF0ZXMgdGhlIHBsYXllciBzdGF0ZVxuICAgICAgIyMjXG4gICAgICB0cmFjazogc2V0SW50ZXJ2YWwoKCkgPT5cbiAgICAgICAgQHVwZGF0ZUVsZW1lbnRzKClcblxuICAgICAgICBuYW1lID0gQGVsZW1lbnRzLnRyYWNrTmFtZVswXS5pbm5lclRleHRcbiAgICAgICAgYXJ0aXN0ID0gQGVsZW1lbnRzLnRyYWNrQXJ0aXN0WzBdLmlubmVyVGV4dFxuXG4gICAgICAgIHRyYWNrQ2hhbmdlZCA9IG5hbWUgIT0gQHBsYXllci5uYW1lXG4gICAgICAgIGFydGlzdENoYW5nZWQgPSBhcnRpc3QgIT0gQHBsYXllci5hcnRpc3RcblxuICAgICAgICBwbGF5U3RhdGVDaGFuZ2VkID0gQHBsYXllci5wbGF5aW5nICE9IEBlbGVtZW50cy5wbGF5QnV0dG9uLmhhc0NsYXNzICdwbGF5aW5nJ1xuXG4gICAgICAgIGlmIHBsYXlTdGF0ZUNoYW5nZWRcbiAgICAgICAgICBjb25zb2xlLmxvZyBpZiBAcGxheWVyLnBsYXlpbmcgdGhlbiAnUGF1c2VkJyBlbHNlICdTdGFydGVkJ1xuICAgICAgICAgIEBwbGF5ZXIucGxheWluZyA9IEBlbGVtZW50cy5wbGF5QnV0dG9uLmhhc0NsYXNzICdwbGF5aW5nJ1xuXG4gICAgICAgICAgZm9yIGNhbGxiYWNrIGluIEBjYWxsYmFja3Mub25QbGF5U3RhdGVcbiAgICAgICAgICAgIGNhbGxiYWNrKEBwbGF5ZXIucGxheWluZylcblxuICAgICAgICBpZiB0cmFja0NoYW5nZWQgb3IgYXJ0aXN0Q2hhbmdlZFxuICAgICAgICAgIEBwbGF5ZXIubmFtZSA9IG5hbWVcbiAgICAgICAgICBAcGxheWVyLmFydGlzdCA9IGFydGlzdFxuXG4gICAgICAgICAgIyBUdXJuIGEgbTpzIGZvcm1hdCBpbnRvIHNlY29uZHNcbiAgICAgICAgICBkdXJhdGlvbiA9IEBlbGVtZW50cy5kdXJhdGlvblswXS5pbm5lclRleHQuc3BsaXQoJzonKVxuICAgICAgICAgIEBwbGF5ZXIuZHVyYXRpb24gPSBwYXJzZUludChkdXJhdGlvblswXSAqIDYwKSArIHBhcnNlSW50KGR1cmF0aW9uWzFdKVxuICAgICAgICAgIGNvbnNvbGUubG9nIEBwbGF5ZXIuZHVyYXRpb25cblxuICAgICAgICAgIGZvciBjYWxsYmFjayBpbiBAY2FsbGJhY2tzLm9uVHJhY2tcbiAgICAgICAgICAgIGNhbGxiYWNrIEBnZXRQbGF5ZXJJbmZvKClcblxuICAgICAgICAgIGNvbnNvbGUubG9nIFwiQ3VycmVudCBzb25nOiAje25hbWV9ICN7YXJ0aXN0fVwiXG4gICAgICAsIDI1MCksXG4gICAgICAjIyNcbiAgICAgIFRoZSBVUkwgaW50ZXJ2YWwgY2hlY2tzIHRoZSBjdXJyZW50IFVSTFxuICAgICAgYW5kIGZpcmVzIHRoZSB1c2VyTmF2aWdhdGVkIGNhbGxiYWNrIHdoZW5cbiAgICAgIHRoZSB1c2VyIGhhcyBuYXZpZ2F0ZWRcblxuICAgICAgQSB3aW5kb3cub25QdXNoU3RhdGUtZXZlbnQgdGhhdCB0cmlnZ2Vyc1xuICAgICAgZm9yIGphdmFzY3JpcHQgaGlzdG9yeSBldmVudHMgYXMgd2VsbFxuICAgICAgd291bGQgYmUgYW1hemluZywgYnV0IHRoYXQgaXNuJ3RcbiAgICAgIGltcGxlbWVudGVkIGluIGJyb3dzZXJzIHlldFxuICAgICAgIyMjXG4gICAgICB1cmw6IHNldEludGVydmFsKCgpID0+XG4gICAgICAgIGlmIEBjdXJyZW50UGF0aCAhPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICBAY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcblxuICAgICAgICAgIGZvciBjYWxsYmFjayBpbiBAY2FsbGJhY2tzLm9uVXNlck5hdmlnYXRlZFxuICAgICAgICAgICAgY2FsbGJhY2sgQGN1cnJlbnRQYXRoXG4gICAgICAzMzMpXG5cbiAgc3RvcFBsYXllclF1ZXJ5OiAoKSA9PlxuICAgIEBzaG91bGRSdW4gPSBmYWxzZVxuICAgIGZvciBpZCBpbiBAaW50ZXJ2YWxzXG4gICAgICBjbGVhckludGVydmFsIGlkXG5cbiAgZ2V0UGxheWVySW5mbzogKCkgLT5cbiAgICByZXR1cm4gQHBsYXllclxuXG4gIG9uUGxheVN0YXRlOiAoY2FsbGJhY2spIC0+XG4gICAgQGNhbGxiYWNrcy5vblBsYXlTdGF0ZS5wdXNoIGNhbGxiYWNrXG5cbiAgb25UcmFjazogKGNhbGxiYWNrKSAtPlxuICAgIEBjYWxsYmFja3Mub25UcmFjay5wdXNoIGNhbGxiYWNrXG5cbiAgb25TZWVrOiAoY2FsbGJhY2spIC0+XG4gICAgQGNhbGxiYWNrcy5vblNlZWsucHVzaCBjYWxsYmFja1xuXG4gIG9uVXNlck5hdmlnYXRlZDogKGNhbGxiYWNrKSAtPlxuICAgIEBjYWxsYmFja3Mub25Vc2VyTmF2aWdhdGVkLnB1c2ggY2FsbGJhY2tcblxuICBAZ2V0OiAoKSAtPlxuICAgIGluc3RhbmNlID89IG5ldyBTcG90aWZ5SW50ZXJmYWNlKClcbiJdfQ==
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3BvdGlmeXVpLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFNBQUE7RUFBQSxrRkFBQTs7QUFBQTtBQUVlLEVBQUEsbUJBQUEsR0FBQTtBQUNYLHVEQUFBLENBQUE7QUFBQSx1REFBQSxDQUFBO0FBQUEsK0NBQUEsQ0FBQTtBQUFBLFFBQUEsa0JBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxTQUFELEdBQ0U7QUFBQSxNQUFBLFNBQUEsRUFBVyxFQUFYO0FBQUEsTUFDQSxVQUFBLEVBQVksRUFEWjtBQUFBLE1BRUEsV0FBQSxFQUFhLEVBRmI7S0FERixDQUFBO0FBQUEsSUFLQSxJQUFDLENBQUEsUUFBRCxHQUNFO0FBQUEsTUFBQSxHQUFBLEVBQUssSUFBTDtBQUFBLE1BQ0EsUUFBQSxFQUFVLElBRFY7QUFBQSxNQUVBLElBQUEsRUFBTSxDQUFBLENBQUcsTUFBSCxDQUZOO0FBQUEsTUFHQSxPQUFBLEVBQVMsSUFIVDtLQU5GLENBQUE7QUFBQSxJQVdBLGtCQUFBLEdBQXFCLFdBQUEsQ0FBWSxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO0FBQy9CLFlBQUEsd0JBQUE7QUFBQSxRQUFBLElBQUcsS0FBQyxDQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBZixDQUF5QixTQUF6QixDQUFIO0FBQ0U7QUFBQSxlQUFBLDJDQUFBO2dDQUFBO0FBQ0UsWUFBQSxRQUFBLENBQUEsQ0FBQSxDQURGO0FBQUEsV0FBQTtpQkFFQSxhQUFBLENBQWMsa0JBQWQsRUFIRjtTQUQrQjtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVosRUFLbkIsR0FMbUIsQ0FYckIsQ0FEVztFQUFBLENBQWI7O0FBQUEsc0JBbUJBLFNBQUEsR0FBVyxTQUFDLFFBQUQsR0FBQTtXQUNULElBQUMsQ0FBQSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQXJCLENBQTBCLFFBQTFCLEVBRFM7RUFBQSxDQW5CWCxDQUFBOztB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QSxrQ0FBQTtBQUFBLElBQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBbkIsQ0FBZ0MsUUFBaEMsQ0FBQSxDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFkLENBQXdCLFFBQXhCLENBREEsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBZCxDQUFvQixPQUFwQixDQUEyQixDQUFDLElBQTVCLENBQUEsQ0FIQSxDQUFBO0FBS0E7QUFBQTtTQUFBLDJDQUFBOzBCQUFBO0FBQ0Usb0JBQUEsUUFBQSxDQUFBLEVBQUEsQ0FERjtBQUFBO29CQU5ZO0VBQUEsQ0E3RmQsQ0FBQTs7QUFBQSxzQkFzR0Esa0JBQUEsR0FBb0IsU0FBQSxHQUFBO1dBQ2xCLElBQUMsQ0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQW5CLENBQWdDLE1BQWhDLEVBRGtCO0VBQUEsQ0F0R3BCLENBQUE7O0FBQUEsc0JBeUdBLGtCQUFBLEdBQW9CLFNBQUEsR0FBQTtXQUNsQixJQUFDLENBQUEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFuQixDQUE2QixNQUE3QixFQURrQjtFQUFBLENBekdwQixDQUFBOzttQkFBQTs7SUFGRixDQUFBIiwiZmlsZSI6InNjcmlwdHMvc3BvdGlmeXVpLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3BvdGlmeVVJXG5cbiAgY29uc3RydWN0b3I6ICgpIC0+XG4gICAgQGNhbGxiYWNrcyA9XG4gICAgICBvblN0YXJ0ZWQ6IFtdXG4gICAgICBvblRhYlNob3duOiBbXVxuICAgICAgb25UYWJIaWRkZW46IFtdXG5cbiAgICBAZWxlbWVudHMgPVxuICAgICAgdGFiOiBudWxsXG4gICAgICBtZW51SXRlbTogbnVsbFxuICAgICAgYm9keTogJCAnYm9keSdcbiAgICAgIHdyYXBwZXI6IG51bGxcblxuICAgIHN0YXJ0Q2xhc3NJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+XG4gICAgICBpZiBAZWxlbWVudHMuYm9keS5oYXNDbGFzcyAnc3RhcnRlZCdcbiAgICAgICAgZm9yIGNhbGxiYWNrIGluIEBjYWxsYmFja3Mub25TdGFydGVkXG4gICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICBjbGVhckludGVydmFsIHN0YXJ0Q2xhc3NJbnRlcnZhbFxuICAgICwgMTAwKVxuXG4gIG9uU3RhcnRlZDogKGNhbGxiYWNrKSAtPlxuICAgIEBjYWxsYmFja3Mub25TdGFydGVkLnB1c2ggY2FsbGJhY2tcblxuICBvblRhYlNob3duOiAoY2FsbGJhY2spIC0+XG4gICAgQGNhbGxiYWNrcy5vblRhYlNob3duLnB1c2ggY2FsbGJhY2tcblxuICBvblRhYkhpZGRlbjogKGNhbGxiYWNrKSAtPlxuICAgIEBjYWxsYmFja3Mub25UYWJIaWRkZW4ucHVzaCBjYWxsYmFja1xuXG4gIG9uUmVzaXplOiAoKSA9PlxuICAgIHJldHVybiB1bmxlc3MgQGVsZW1lbnRzLndyYXBwZXJcblxuICAgIGhlaWdodCA9IEBlbGVtZW50cy53cmFwcGVyLmlubmVySGVpZ2h0KClcbiAgICBAZWxlbWVudHMud3JhcHBlci5jc3MgdG9wOiAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyIC0gaGVpZ2h0IC8gMlxuXG4gIGRvQmluZHM6ICgpIC0+XG4gICAgJChkb2N1bWVudCkub24gJ2NsaWNrJywgJyNuYXYtd2F0Y2gnLCBAc2hvd1dhdGNoVGFiXG4gICAgJCh3aW5kb3cpLm9uICdyZXNpemUnLCBAb25SZXNpemVcblxuICBsb2FkRXh0cmFSZXNvdXJjZXM6ICgpIC0+XG4gICAgIyBUT0RPOiBNb3ZlIHRoaXMgKyBmb250cyB0byBsb2NhbCBmaWxlIChmYXN0ZXIgbG9hZGluZylcbiAgICAkKCdoZWFkJykuYXBwZW5kKCc8bGluayBocmVmPVwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuMi4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiIHJlbD1cInN0eWxlc2hlZXRcIj4nKVxuXG4gICAgY2hyb21lLmV4dGVuc2lvbi5zZW5kUmVxdWVzdCB7IG1ldGhvZDogJ2dldFNjcmlwdCcsIGZpbGU6ICd2ZW5kb3IveW91dHViZScgfSwgKGpzKSAtPlxuICAgICAgd2luZG93LllUQ29uZmlnID0gaG9zdDogXCJodHRwOi8vd3d3LnlvdXR1YmUuY29tXCIgdW5sZXNzIHdpbmRvdy5ZVENvbmZpZ1xuICAgICAgZXZhbCBqcyAjIFNwb29reVxuXG4gIGF0dGFjaE1lbnVJdGVtOiAoKSAtPlxuICAgIG5hdk1lbnVIVE1MID0gXCJcIlwiXG4gICAgICA8bGk+XG4gICAgICAgIDxhIGRhdGEtaHJlZj1cImZvbGxvd1wiIGlkPVwibmF2LXdhdGNoXCIgY2xhc3M9XCJzdGFuZGFyZC1tZW51LWl0ZW1cIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXlvdXR1YmUtcGxheVwiPjwvaT5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdi10ZXh0XCI+V2F0Y2g8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgXCJcIlwiXG5cbiAgICBAZWxlbWVudHMubWVudUl0ZW0gPSAkKG5hdk1lbnVIVE1MKVxuICAgICAgLmluc2VydEJlZm9yZSgkKCcuaXRlbS1wcm9maWxlJykpXG4gICAgICAuZmluZCgnYScpXG5cbiAgY3JlYXRlV2F0Y2hUYWI6ICgpIC0+XG4gICAgdGFiSFRNTCA9IFwiXCJcIlxuICAgICAgPGRpdiBpZD1cInNlY3Rpb24td2F0Y2hcIiBjbGFzcz1cInN0YWNrZWQgaGlkZGVuXCI+PC9kaXY+XG4gICAgXCJcIlwiXG5cbiAgICBAZWxlbWVudHMudGFiID0gJCh0YWJIVE1MKS5pbnNlcnRBZnRlciAkKCcjc2VjdGlvbi1mb2xsb3cnKVxuXG4gICAgcmVxdWVzdCA9XG4gICAgICBtZXRob2Q6ICdnZXRWaWV3J1xuICAgICAgZmlsZTogJ3RhYidcbiAgICBjaHJvbWUuZXh0ZW5zaW9uLnNlbmRSZXF1ZXN0IHJlcXVlc3QsIChodG1sKSA9PlxuICAgICAgQGVsZW1lbnRzLnRhYi5odG1sKGh0bWwpXG4gICAgICBAZWxlbWVudHMudGhyb2JiZXIgPSBAZWxlbWVudHMudGFiLmZpbmQgJy50aHJvYmJlcidcbiAgICAgIEBlbGVtZW50cy53cmFwcGVyID0gQGVsZW1lbnRzLnRhYi5maW5kICcudmlkZW8td3JhcHBlcidcblxuICAgICAgQHNob3dMb2FkaW5nT3ZlcmxheSgpXG5cbiAgc2hvd1dhdGNoVGFiOiAoKSA9PlxuICAgICQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIyAkKCcjbWFpbiA+IGRpdicpLmFkZENsYXNzICdoaWRkZW4nXG5cbiAgICBAZWxlbWVudHMubWVudUl0ZW0uYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICBAZWxlbWVudHMudGFiLnJlbW92ZUNsYXNzICdoaWRkZW4nXG5cbiAgICBAZWxlbWVudHMudGFiLmZpbmQoJy5yb290Jykuc2hvdygpXG5cbiAgICAkKHdpbmRvdykucmVzaXplKClcblxuICAgIGZvciBjYWxsYmFjayBpbiBAY2FsbGJhY2tzLm9uVGFiU2hvd25cbiAgICAgIGNhbGxiYWNrKClcblxuICAgIGhpc3RvcnkucHVzaFN0YXRlIHt9LCAnV2F0Y2gnLCAnL3dhdGNoJ1xuXG4gIGhpZGVXYXRjaFRhYjogKCkgPT5cbiAgICBAZWxlbWVudHMubWVudUl0ZW0ucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBAZWxlbWVudHMudGFiLmFkZENsYXNzICdoaWRkZW4nXG5cbiAgICBAZWxlbWVudHMudGFiLmZpbmQoJy5yb290JykuaGlkZSgpXG5cbiAgICBmb3IgY2FsbGJhY2sgaW4gQGNhbGxiYWNrcy5vblRhYkhpZGRlblxuICAgICAgY2FsbGJhY2soKVxuXG4gIHNob3dMb2FkaW5nT3ZlcmxheTogKCkgLT5cbiAgICBAZWxlbWVudHMudGhyb2JiZXIucmVtb3ZlQ2xhc3MgJ2hpZGUnXG5cbiAgaGlkZUxvYWRpbmdPdmVybGF5OiAoKSAtPlxuICAgIEBlbGVtZW50cy50aHJvYmJlci5hZGRDbGFzcyAnaGlkZSdcblxuIl19
var Synchronizer;

Synchronizer = (function() {
  function Synchronizer() {}

  Synchronizer.prototype.onTrack = function(track) {
    return console.log(chrome);
  };

  return Synchronizer;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc3luY2hyb25pemVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFlBQUE7O0FBQUE7NEJBRUU7O0FBQUEseUJBQUEsT0FBQSxHQUFTLFNBQUMsS0FBRCxHQUFBO1dBQ1AsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaLEVBRE87RUFBQSxDQUFULENBQUE7O3NCQUFBOztJQUZGLENBQUEiLCJmaWxlIjoic2NyaXB0cy9zeW5jaHJvbml6ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTeW5jaHJvbml6ZXJcblxuICBvblRyYWNrOiAodHJhY2spIC0+XG4gICAgY29uc29sZS5sb2cgY2hyb21lIy5zdG9yYWdlLmxvY2FsLnNldCh7J3ZhbHVlJzogMn0pIl19
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQWhCLEtBQTZCLFFBQWhDO0FBRUUsRUFBQSxNQUFNLENBQUMsUUFBUCxHQUFtQiw2QkFBbkIsQ0FGRjtDQUFBOztBQUFBLENBSUcsU0FBQSxHQUFBO0FBQ0QsTUFBQSw0QkFBQTtBQUFBLEVBQUEsRUFBQSxHQUFTLElBQUEsU0FBQSxDQUFBLENBQVQsQ0FBQTtBQUFBLEVBQ0EsRUFBRSxDQUFDLE9BQUgsQ0FBQSxDQURBLENBQUE7QUFBQSxFQUVBLEVBQUUsQ0FBQyxrQkFBSCxDQUFBLENBRkEsQ0FBQTtBQUFBLEVBSUEsT0FBQSxHQUFjLElBQUEsYUFBQSxDQUFBLENBSmQsQ0FBQTtBQUFBLEVBT0EsZUFBQSxHQUFrQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQWhCLEtBQXlCLFFBUDNDLENBQUE7QUFBQSxFQVdBLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQXpCLENBQXFDLFNBQUMsT0FBRCxFQUFVLE1BQVYsRUFBa0IsWUFBbEIsR0FBQTtBQUNuQyxRQUFBLEtBQUE7QUFBQSxJQUFBLEtBQUEsR0FBWSxJQUFBLFdBQUEsQ0FBWSxPQUFPLENBQUMsS0FBcEIsRUFBMkI7QUFBQSxNQUFBLE1BQUEsRUFBUSxPQUFPLENBQUMsSUFBaEI7S0FBM0IsQ0FBWixDQUFBO1dBQ0EsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsRUFGbUM7RUFBQSxDQUFyQyxDQVhBLENBQUE7QUFBQSxFQWVBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUEsR0FBQTtBQUNoQixJQUFBLEVBQUUsQ0FBQyxjQUFILENBQUEsQ0FBQSxDQUFBO0FBQUEsSUFDQSxFQUFFLENBQUMsY0FBSCxDQUFBLENBREEsQ0FBQTtBQUFBLElBR0EsT0FBTyxDQUFDLElBQVIsQ0FBQSxDQUhBLENBQUE7QUFLQSxJQUFBLElBQUcsZUFBSDthQUNFLENBQUEsQ0FBRyxVQUFILENBQWEsQ0FBQyxJQUFkLENBQUEsRUFERjtLQU5nQjtFQUFBLENBQWxCLENBZkEsQ0FBQTtTQXdCQSxFQUFFLENBQUMsU0FBSCxDQUFhLFNBQUEsR0FBQTtBQUNYLFFBQUEscUJBQUE7QUFBQSxJQUFBLE1BQUEsR0FBYSxJQUFBLE1BQUEsQ0FBQSxDQUFiLENBQUE7QUFBQSxJQUNBLElBQUEsR0FBVyxJQUFBLFlBQUEsQ0FBQSxDQURYLENBQUE7QUFBQSxJQUVBLE9BQUEsR0FBYyxJQUFBLGdCQUFBLENBQUEsQ0FGZCxDQUFBO0FBQUEsSUFJQSxFQUFFLENBQUMsVUFBSCxDQUFjLE9BQU8sQ0FBQyxjQUF0QixDQUpBLENBQUE7QUFBQSxJQUtBLEVBQUUsQ0FBQyxXQUFILENBQWUsT0FBTyxDQUFDLGVBQXZCLENBTEEsQ0FBQTtBQUFBLElBT0EsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsSUFBSSxDQUFDLE9BQXJCLENBUEEsQ0FBQTtBQUFBLElBUUEsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsTUFBTSxDQUFDLFdBQXZCLENBUkEsQ0FBQTtBQUFBLElBU0EsT0FBTyxDQUFDLE1BQVIsQ0FBZSxNQUFNLENBQUMsSUFBdEIsQ0FUQSxDQUFBO0FBQUEsSUFVQSxPQUFPLENBQUMsV0FBUixDQUFvQixNQUFNLENBQUMsV0FBM0IsQ0FWQSxDQUFBO0FBQUEsSUFXQSxPQUFPLENBQUMsZUFBUixDQUF3QixTQUFDLElBQUQsR0FBQTtBQUN0QixNQUFBLElBQUcsSUFBQSxLQUFXLFFBQWQ7ZUFDRSxFQUFFLENBQUMsWUFBSCxDQUFBLEVBREY7T0FEc0I7SUFBQSxDQUF4QixDQVhBLENBQUE7QUFlQSxJQUFBLElBQUcsZUFBSDtBQUNFLE1BQUEsQ0FBQSxDQUFHLFVBQUgsQ0FBYSxDQUFDLElBQWQsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLENBQUEsQ0FBRyxlQUFILENBQWtCLENBQUMsUUFBbkIsQ0FBNkIsUUFBN0IsQ0FEQSxDQUFBO2FBRUEsRUFBRSxDQUFDLFlBQUgsQ0FBQSxFQUhGO0tBaEJXO0VBQUEsQ0FBYixFQXpCQztBQUFBLENBQUEsQ0FBSCxDQUFBLENBSkEsQ0FBQSIsImZpbGUiOiJzY3JpcHRzL21haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpZiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy93YXRjaCdcbiAgIyBUaGUgcGxheWxpc3QgcGFnZSBoYXMgdGhlIGZhc3Rlc3QgbG9hZCB0aW1lXG4gIHdpbmRvdy5sb2NhdGlvbiA9ICcvY29sbGVjdGlvbi9wbGF5bGlzdHMjd2F0Y2gnXG5cbmRvIC0+XG4gIHVpID0gbmV3IFNwb3RpZnlVSSgpXG4gIHVpLmRvQmluZHMoKVxuICB1aS5sb2FkRXh0cmFSZXNvdXJjZXMoKVxuXG4gIG1hbmFnZXIgPSBuZXcgUGxheWVyTWFuYWdlcigpXG5cbiAgIyBDaGVjayBpZiB0aGUgdXNlciByZXF1ZXN0ZWQgL3dhdGNoXG4gIGxvYWRJbW1lZGlhdGVseSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoID09ICcjd2F0Y2gnXG5cbiAgIyBNZXNzYWdlcyBhcmUgZW1pdHRlZCBpbiBzcG90aWZ5LmpzXG4gICMgYW5kIHRoZW4gcmVsYXllZCBieSBiYWNrZ3JvdW5kLmpzXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lciAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIC0+XG4gICAgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQgcmVxdWVzdC50aXRsZSwgZGV0YWlsOiByZXF1ZXN0LmFyZ3NcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50IGV2ZW50XG5cbiAgJChkb2N1bWVudCkucmVhZHkgKCkgLT5cbiAgICB1aS5hdHRhY2hNZW51SXRlbSgpXG4gICAgdWkuY3JlYXRlV2F0Y2hUYWIoKVxuXG4gICAgbWFuYWdlci5pbml0KClcblxuICAgIGlmIGxvYWRJbW1lZGlhdGVseVxuICAgICAgJCgnI292ZXJsYXknKS5zaG93KClcblxuICB1aS5vblN0YXJ0ZWQgKCkgLT5cbiAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKClcbiAgICBzeW5jID0gbmV3IFN5bmNocm9uaXplcigpXG4gICAgc3BvdGlmeSA9IG5ldyBTcG90aWZ5SW50ZXJmYWNlKClcblxuICAgIHVpLm9uVGFiU2hvd24gc3BvdGlmeS5ydW5QbGF5ZXJRdWVyeVxuICAgIHVpLm9uVGFiSGlkZGVuIHNwb3RpZnkuc3RvcFBsYXllclF1ZXJ5XG5cbiAgICBzcG90aWZ5Lm9uVHJhY2sgc3luYy5vblRyYWNrXG4gICAgc3BvdGlmeS5vblRyYWNrIHBsYXllci5jaGFuZ2VUcmFja1xuICAgIHNwb3RpZnkub25TZWVrIHBsYXllci5zZWVrXG4gICAgc3BvdGlmeS5vblBsYXlTdGF0ZSBwbGF5ZXIub25QbGF5U3RhdGVcbiAgICBzcG90aWZ5Lm9uVXNlck5hdmlnYXRlZCAocGF0aCkgLT5cbiAgICAgIGlmIHBhdGggaXNudCAnL3dhdGNoJ1xuICAgICAgICB1aS5oaWRlV2F0Y2hUYWIoKVxuXG4gICAgaWYgbG9hZEltbWVkaWF0ZWx5XG4gICAgICAkKCcjb3ZlcmxheScpLmhpZGUoKVxuICAgICAgJCgnI3NlY3Rpb24tdXNlcicpLmFkZENsYXNzICdoaWRkZW4nICMgVXNlciB0YWIgaXMgb3BlbiBieSBkZWZhdXRcbiAgICAgIHVpLnNob3dXYXRjaFRhYigpXG4iXX0=