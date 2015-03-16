class PreloadPlayer extends Player

  YT_STATE_UNSTARTED = -1
  YT_STATE_ENDED = 0
  YT_STATE_PLAYING = 1
  YT_STATE_PAUSED = 2
  YT_STATE_BUFFERING = 3
  YT_STATE_CUED = 5

  constructor: (elementID, track) ->
    super(elementID, track)

    @isCrossfading = false
    #@element.hide()

  doBinds: () ->
    document.addEventListener 'player_set_volume', (e) => @setVolume e.detail[1] * 100

    @YT.addEventListener 'onStateChange', @onStateChange

  loadVideo: (id) ->
    super(id)

  onStateChange: (state) =>
    if state.data == YT_STATE_PLAYING and !@isCrossfading
      @YT.pauseVideo()