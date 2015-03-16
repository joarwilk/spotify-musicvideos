class Player

  YT_STATE_UNSTARTED = -1
  YT_STATE_ENDED = 0
  YT_STATE_PLAYING = 1
  YT_STATE_PAUSED = 2
  YT_STATE_BUFFERING = 3
  YT_STATE_CUED = 5

  constructor: (elementID, track, otherPlayer) ->
    # We're creating this player from another one
    # e.g. a preloadPlayer that has been transitioned in

    if otherPlayer instanceof Player
      @YT = otherPlayer.YT
    else
      # If the element is an iframe, the player has
      # already been loaded
      if $('#' + elementID).is 'iframe'
        @YT = new YT.Player elementID
        @doBinds()
      else
        @YT = new YT.Player elementID, {
          videoId: ''
          playerVars:
            autoplay: 0
            controls: 1 # Should be 0
            rel : 0
            disablekb: 1 # Disable Keyboard
            iv_load_policy: 3 # Disable annotations
            modestbranding : 1 # Hide some ui items
            hd: 1 # Highest Quality
            showinfo: 0 # Hide video information
        }

        playerLoadInterval = setInterval () =>
          if @YT.loadVideoById?
            clearInterval playerLoadInterval
            @playerIsReady = true

            @doBinds()

            if @cuedVideoId
              @loadVideo @cuedVideoId
              @cuedVideoId = 0
        , 200

    @cuedVideoId = 0

    @element = $('#' + elementID)
    @APILoaded = false
    @track = track


  doBinds: () ->
    document.addEventListener 'player_seek', (e) -> @seekTo e.detail[0]
    document.addEventListener 'player_set_volume', (e) -> @setVolume e.detail[1]

    @YT.addEventListener 'onStateChange', @onStateChange

  onAPILoad: () ->
    @APILoaded = true

  loadVideo: (id) ->
    if @playerIsReady
      console.info 'player', id
      @YT.loadVideoById id, 0, 'maxres'
      @YT.setPlaybackQuality 'highres'
    else
      @cuedVideoId = id

  seekTo: (time) ->

  setVolume: (volume) =>
    @YT.setVolume volume

  onStateChange: (state) ->
    ###switch state:
      when YT_STATE_ENDED:

      break
    ###

  onVideoLoaded: () ->


  onFinished: () ->


  onBuffering: () ->

