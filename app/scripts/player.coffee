class Player

  @ID = 0

  constructor: (track, isCurrent) ->

    @_id = Player.ID++

    console.info 'player', @_id, isCurrent, track

    $('.video-wrapper').prepend('<div id="player-' + @_id + '"></div>')

    @YT = new YT.Player "player-#{@_id}", {
      videoId: ''
      playerVars:
        autoplay: 0
        controls: 0
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

    @element = $('#' + @_id)
    @APILoaded = false
    @track = track
    @isCurrent = isCurrent


  doBinds: () ->
    document.addEventListener 'player_seek', (e) => @seekTo e.detail[0]
    document.addEventListener 'player_set_volume', (e) => @setVolume e.detail[1] * 100
    document.addEventListener 'player_play', (e) => @togglePlay true
    document.addEventListener 'player_pause', (e) => @togglePlay false

    @YT.addEventListener 'onStateChange', @onStateChange

  onAPILoad: () ->
    @APILoaded = true

  loadVideo: (id) ->
    console.error 'loading video'
    if @playerIsReady
      @YT.loadVideoById id, 0, 'maxres'
      @YT.setPlaybackQuality 'highres'
    else
      console.info 'Cued video', id, @_id
      @cuedVideoId = id

  togglePlay: (play) ->


  seekTo: (time) ->
    console.info 'seek', time
    @YT.seekTo time, true

  setVolume: (volume) =>
    @YT.setVolume volume

  onStateChange: (state) =>
    console.log @isCurrent
    if state.data == YT.PlayerState.PLAYING and !@isCurrent
      @YT.pauseVideo()

  setTrack: (track) =>
    @track = track

  makeCurrent: () =>
    @isCurrent = true
    @YT.playVideo()

  onVideoLoaded: () ->


  onFinished: () ->


  onBuffering: () ->

  remove: () ->
    console.info 'removing ' + @_id
    @YT.destroy()
    @element.remove()

