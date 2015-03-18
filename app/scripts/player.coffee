class Player

  @ID = 0

  constructor: (track, isCurrent) ->
    @_id = Player.ID++

    $('.video-wrapper').prepend('<div id="player-' + @_id + '"></div>')

    @YT = new YT.Player "player-#{@_id}", {
      videoId: ''
      playerVars:
        autoplay: 0
        controls: 0
        rel : 0 # Hide related videos
        disablekb: 1 # Disable Keyboard
        iv_load_policy: 3 # Disable annotations
        modestbranding : 1 # Hide some ui items
        hd: 1 # Highest Quality
        showinfo: 0 # Hide video information
        start: 1 # The first second is very commonly black and mute
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

    @element = $('#' + @_id)
    @APILoaded = false
    @track = track
    @isCurrent = isCurrent


  doBinds: () ->
    document.addEventListener 'player_set_volume', (e) => @setVolume e.detail[1] * 100
    document.addEventListener 'player_play', (e) => @togglePlay true
    document.addEventListener 'player_pause', (e) => @togglePlay false

    if @isCurrent
      document.addEventListener 'player_seek', (e) => @seekTo e.detail[1] / 1000

    @YT.addEventListener 'onStateChange', @onStateChange

  onAPILoad: () ->
    @APILoaded = true

  loadVideo: (id) ->
    if @playerIsReady
      @YT.loadVideoById id, 0, 'maxres'
      @YT.setPlaybackQuality 'highres'
      @YT.setVolume 0 unless @isCurrent
      @YT.seekTo 1, true
    else
      @cuedVideoId = id

  togglePlay: (play) ->


  seekTo: (time) =>
    @YT.seekTo time, true

  setVolume: (volume) =>
    @YT.setVolume volume

  getVolume: () =>
    return @YT.getVolume()

  onStateChange: (state) =>
    if state.data == YT.PlayerState.PLAYING and !@isCurrent
      @YT.pauseVideo()

  setTrack: (track) =>
    @track = track

  makeCurrent: () =>
    @isCurrent = true
    @YT.playVideo()

    document.addEventListener 'player_seek', (e) => @seekTo e.detail[1] / 1000

  onVideoLoaded: () ->


  onFinished: () ->


  onBuffering: () ->

  remove: () ->
    console.info 'removing ' + @_id
    @YT.destroy()
    @element.remove()

