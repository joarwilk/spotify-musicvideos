class PlayerManager

  CROSSFADE_STEP_SIZE = 50

  constructor: () ->
    @callbacks =
      onVideoChanged: []

    @timer = null

    @YTAPILoaded = false
    @crossfadeShouldStop = false

    @players = {
      current: null
      next: null
    }

    @tracks = null

    YTAPILoadInterval = setInterval () =>
      if window.YT && window.YT.Player
        clearInterval YTAPILoadInterval


        @YTAPILoaded = true
    ,  100

    # Store the track - even if inactive - so we can start mid-song
    document.addEventListener 'player_track_change', @updateCurrentTracks

    document.addEventListener 'player_play', (e) => @timer?.start()
    document.addEventListener 'player_pause', (e) => @timer?.pause()


    document.addEventListener 'player_seek', (e) =>
      @timer?.jumpTo e.detail[1]

  init: () ->
    @players.current = new Player(null, '', true)

  setActive: (isActive) ->
    if isActive
      document.removeEventListener 'player_track_change', @updateCurrentTracks
      document.addEventListener 'player_track_change', @onTrack

      if @tracks?
        @onTrack detail: [@tracks.current, @tracks.next]
    else
      document.addEventListener 'player_track_change', @updateCurrentTracks
      document.removeEventListener 'player_track_change', @onTrack

  preloadTrack: (track) =>
    @getVideoFromTrack track, (video) =>
      @players.next?.remove()
      @players.next = new Player(track, video.id.videoId, false)

  updateCurrentTracks: (event) =>
    @tracks =
      current: event.detail[0]
      next: event.detail[1]

  onTrack: (event) =>
    id = 0

    # Is this the first track this session?
    isFirst = !@tracks?

    # Verify that we only reload the players
    # when the tracks actually change
    if isFirst or event.detail[0]._pid != @tracks.current._pid

      @timer?.stop()

      # If we've preloaded this track, swap it into the "current" slot
      if @players.next and @players.next.track._pid == event.detail[0]._pid
        #@stopCrossfade()

        @players.next.makeCurrent()
        @crossfade 600, () =>
          @players.current.remove()

          # Make the preloaded player the new main player
          @players.current = @players.next
          @players.next = null

          @preloadTrack event.detail[1]

      # if not, load the video into the current player
      else
        @players.current.setTrack event.detail[0]

        @getVideoFromTrack event.detail[0], (video) =>
          @players.current.onReady () =>
            @players.current.loadVideo video.id.videoId
          @players.current.togglePlay false if isFirst

          for callback in @callbacks.onVideoChanged
            callback video

        @preloadTrack event.detail[1]

      @players.current.onReady () =>

        id = setInterval () =>
          length = @players.current.YT.getDuration() * 1000

          return if length == 0

          clearInterval id

          @timer = new Timer(length - 100)
          @timer.start()
          @timer.onFinished (stepover) =>
            console.info 'finished'
            context = $('#now-playing').contents()
            $('#next', context).click()
            #duration = 8000
            # @players.next.makeCurrent()
            #@crossfade duration , () ->
        , 200


    # If we're playing the same track again, make sure to rewind
    else if !isFirst and event.detail[0]._pid != @tracks.current._pid
      @players.current.seekTo 0
      @timer.reset()

    @updateCurrentTracks event

  # Transition the volume of the next track into the initial
  # volume of the current track, while fading out
  # the current track.
  # When we're finished, fire the onFinished callback
  crossfade: (duration, onFinished) ->
    $('#player-' + @players.current._id).css opacity: 0

    targetVolume = @players.current.getVolume()
    step = 0
    interval = setInterval () =>
      if @crossfadeShouldStop
        clearInterval interval
        return

      progress = (step++ * CROSSFADE_STEP_SIZE) / duration

      if progress > 1
        clearInterval interval
        onFinished()
      else
        @players.current.setVolume parseInt((1 - progress) * targetVolume)
        @players.next.setVolume parseInt(progress * targetVolume)

    , CROSSFADE_STEP_SIZE

  stopCrossfade: () ->
    @crossfadeShouldStop = true

  onVideoChanged: (callback) ->
    @callbacks.onVideoChanged.push callback

  getVideoFromTrack: (track, callback) ->
    #console.error track
    params =
      part: 'id,snippet'
      q: "#{track.name} #{track.artistName} offical video"
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'

    return $.getJSON 'https://content.googleapis.com/youtube/v3/search', params, (data) ->
      callback(data.items[0])
