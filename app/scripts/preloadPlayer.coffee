class PreloadPlayer extends Player

  YT_STATE_UNSTARTED = -1
  YT_STATE_ENDED = 0
  YT_STATE_PLAYING = 1
  YT_STATE_PAUSED = 2
  YT_STATE_BUFFERING = 3
  YT_STATE_CUED = 5

  constructor: (elementID, track) ->
    super(elementID, track)

    @element.hide()

  doBinds: () ->
    document.addEventListener 'player_set_volume', (e) -> @setVolume args[1]

  loadVideo: (id) ->
    super(id)

    console.info ('loadvideo')

  onStateChange: (state) ->
    if state == YT_STATE_PLAYING
      @YT.pauseVideo()