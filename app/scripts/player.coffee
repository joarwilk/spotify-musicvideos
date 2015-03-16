class Player

  YT_STATE_UNSTARTED = -1
  YT_STATE_ENDED = 0
  YT_STATE_PLAYING = 1
  YT_STATE_PAUSED = 2
  YT_STATE_BUFFERING = 3
  YT_STATE_CUED = 5

  constructor: (elementID, otherPlayer) ->
    # We're creating this player from another one
    # e.g. a preloadPlayer that has been transitioned in
    if otherPlayer instanceof Player
      @YT = otherPlayer.YT
    else
      @YT = new window.YT.Player elementID, {
        videoId: ''
        playerVars:
          autoplay: 1
          controls: 1 # Should be 0
          rel : 0
          disablekb: 1 # Disable Keyboard
          iv_load_policy: 3 # Disable annotations
          modestbranding : 1 # Hide some ui items
          hd: 1 # Highest Quality
          showinfo: 0 # Hide video information
      }

    @element = $('#' + elementID)

    @doBinds()

  doBinds: () ->
    #document.addEventListener 'player_seek', (e) -> @seekTo args[1], true
    #document.addEventListener 'player_set_volume', (e) -> @setVolume args[1]

    #@YT.addEventListener 'onStateChange', @onStateChange

  loadVideo: (id) ->
    @YT.loadVideoById id, 0, 'maxres'
    @YT.setPlaybackQuality 'highres'

  seekTo: (time) ->


  onStateChange: (state) ->
    ###switch state:
      when YT_STATE_ENDED:

      break
    ###

  onVideoLoaded: () ->


  onFinished: () ->


  onBuffering: () ->

