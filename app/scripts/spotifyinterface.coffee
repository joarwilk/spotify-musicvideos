class SpotifyInterface
  instance = null


  constructor: () ->
    @currentTime = 0
    @shouldRun = false

    @updateElements()

    @callbacks =
      onState: []
      onPlayState: []
      onTrack: []
      onSeek: []

    @player =
      playing: @elements.playButton.hasClass 'playing'
      position: 0
      name: @elements.trackName.text()
      artist: @elements.trackArtist.text()

  updateElements: () =>
    context = $('#app-player').contents() # The player iframe widget

    @elements =
      playButton: $('#play-pause', context)
      timeMarker: $('#track-current', context)
      trackName: $('#track-name a', context)
      trackArtist: $('#track-artist a', context)

  runPlayerQuery: () =>
    @shouldRun = true
    @previousTimestamp = 0

    updateTime = (timestamp) =>
      @player.position += timestamp - @previousTimestamp
      @previousTimestamp = timestamp

      requestAnimationFrame updateTime if @shouldRun
    requestAnimationFrame updateTime

    @intervals =
      position: setInterval(() =>
        return unless @player.playing

        timeMarkerText = @elements.timeMarker.text()
        markerTextSplit = timeMarkerText.split ':'

        minutes = parseInt markerTextSplit[0]
        seconds = parseInt markerTextSplit[1]

        milliseconds = 1000 * (minutes * 60 + seconds)

        if Math.abs(@player.position - milliseconds) > 3500
          @player.position = milliseconds

          console.log 'Seek'
          for callback in @callbacks.onSeek
            callback(milliseconds)
      , 200),
      track: setInterval(() =>
        @updateElements()

        name = @elements.trackName[0].innerText
        artist = @elements.trackArtist[0].innerText

        trackChanged = name != @player.name
        artistChanged = artist != @player.artist

        playStateChanged = @player.playing != @elements.playButton.hasClass 'playing'

        if playStateChanged
          console.log if @player.playing then 'Paused' else 'Started'
          @player.playing = @elements.playButton.hasClass 'playing'

          for callback in @callbacks.onPlayState
            callback(@player.playing)

        if trackChanged or artistChanged
          @player.name = name
          @player.artist = artist

          for callback in @callbacks.onTrack
            callback @getPlayerInfo()
          console.log "Current song: #{name} #{artist}"
      , 250)

  stopPlayerQuery: () =>
    @shouldRun = false
    for id in @intervals
      clearInterval id

  getPlayerInfo: () ->
    return @player

  onPlayState: (callback) ->
    @callbacks.onPlayState.push callback

  onTrack: (callback) ->
    @callbacks.onTrack.push callback

  onSeek: (callback) ->
    @callbacks.onSeek.push callback

  @get: () ->
    instance ?= new SpotifyInterface()
