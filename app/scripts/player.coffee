class Player

  @ID = 0

  constructor: (track, videoId, isCurrent) ->
    @_id = Player.ID++

    $('.video-wrapper').prepend('<div id="player-' + @_id + '"></div>')

    @YT = new YT.Player "player-#{@_id}", {
      videoId: videoId
      playerVars:
        autoplay: 1
        controls: 0
        rel : 0 # Hide related videos
        disablekb: 1 # Disable Keyboard
        iv_load_policy: 3 # Disable annotations
        modestbranding : 1 # Hide some ui items
        hd: 1 # Highest Quality
        showinfo: 0 # Hide video information
        start: 1 # The first second is very commonly black and mute
    }

    @onReadyCallbacks = []
    playerLoadInterval = setInterval () =>
      if @YT.loadVideoById?
        clearInterval playerLoadInterval
        @playerIsReady = true

        @doBinds()

        for callback in @onReadyCallbacks
          callback()
    , 200


    @element = $('#player-' + @_id)
    @playerIsReady = false
    @track = track
    @isCurrent = isCurrent
    @volume = 100


  doBinds: () ->
    document.addEventListener 'player_set_video_volume', $.throttle 100, (e) => @setVolume e.detail[1] * 100
    document.addEventListener 'player_play', (e) => @togglePlay true
    document.addEventListener 'player_pause', (e) => @togglePlay false

    if @isCurrent
      document.addEventListener 'player_seek', (e) => @seekTo e.detail[1] / 1000

    @YT.addEventListener 'onStateChange', @onStateChange

  onReady: (callback) =>
    if @playerIsReady
      callback()
    else
      @onReadyCallbacks.push callback

  loadVideo: (id) =>
    @YT.loadVideoById id, 0, 'maxres'
    @YT.setPlaybackQuality 'highres'
    @YT.seekTo 2, true unless @isCurrent

    @onReady () =>
      @setVolume 0 unless @isCurrent

  togglePlay: (play) =>
    if play then @YT.playVideo() else @YT.pauseVideo()

  seekTo: (time) =>
    @YT.seekTo time, true

  setVolume: (volume) =>
    @volume = volume
    @YT.setVolume volume

  getVolume: () =>
    return @volume

  onStateChange: (state) =>
    if state.data == YT.PlayerState.PLAYING and !@isCurrent
      @YT.pauseVideo()

  setTrack: (track) =>
    @track = track

  makeCurrent: () =>
    @isCurrent = true
    @setVolume 0 # We always fade in the track, so start vol at 0
    @YT.playVideo()

    document.addEventListener 'player_seek', (e) => @seekTo e.detail[1] / 1000

  onVideoLoaded: () ->


  onFinished: () ->


  onBuffering: () ->

  remove: () ->
    @YT.destroy()
    @element.remove()

