class PlayerManager

  CROSSFADE_STEP_SIZE = 50

  constructor: () ->
    @callbacks =
      onVideoChanged: []

    @timer = null

    @isFirstVideo = true
    @playing = false

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

    # Make sure we always know the play state
    document.addEventListener 'player_play', (e) => @playing = true
    document.addEventListener 'player_pause', (e) => @playing = false

  init: (callback) ->
    unless @initiated
      @initiated = true

      if (@tracks?.current)
        @getVideoFromTrack @tracks.current, (video) =>
          @players.current = new Player(@tracks.current, video.id.videoId, true)
          callback()
      else
        @players.current = new Player(null, '', true)
        callback()

  setActive: (isActive) ->
    if isActive
      document.removeEventListener 'player_track_change', @updateCurrentTracks
      document.addEventListener 'player_track_change', @onTrack

      if @tracks?
        @onTrack detail: [@tracks.current, @tracks.next]
    else
      # Unload the players
      @players.current.remove()
      @players.next?.remove()

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

    # Verify that we only reload the players
    # when the tracks actually change
    if @isFirstVideo or event.detail[0]._pid != @tracks.current._pid

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

          @startTimer()

      # if not, load the video into the current player
      else
        @players.current.setTrack event.detail[0]

        isFirst = @isFirstVideo
        @getVideoFromTrack event.detail[0], (video) =>
          @players.current.onReady () =>
            @players.current.loadVideo video.id.videoId

            # Ugly hack to show an image instead of a spinner
            # when the first video is paused
            if isFirst
              @players.current.YT.addEventListener 'onStateChange', (state) =>
                return unless isFirst
                @players.current.togglePlay true if state.data == 3

                if state.data == 1
                  isFirst = false
                  @players.current.togglePlay false unless @playing

            @startTimer()

          for callback in @callbacks.onVideoChanged
            callback video

        @isFirstVideo = false
        @preloadTrack event.detail[1]


    # If we're playing the same track again, make sure to rewind
    else if !@isFirstVideo and event.detail[0]._pid == @tracks.current._pid
      @players.current.seekTo 0
      #@timer.reset()

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

  startTimer: () =>
    clearInterval @timer

    duration = 0
    @timer = setInterval () =>
      # If we haven't recieved the duration from the player
      if isNaN duration or parseInt duration == 0
        duration = @players.current.YT.getDuration() * 1000

        # If the video duration is still loading
        if isNaN duration or parseInt duration == 0
          return

      current = (@players.current.YT.getCurrentTime() * 1000) + 1000

      if duration <= current
        context = $('#app-player').contents()
        $('#next', context).click()

        clearInterval @timer
    , 500

  onVideoChanged: (callback) ->
    @callbacks.onVideoChanged.push callback

  getVideoFromTrack: (track, callback) ->
    params =
      part: 'id,snippet'
      q: "#{track.name} #{track.artistName} offical video"
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'

    return $.getJSON 'https://content.googleapis.com/youtube/v3/search', params, (data) ->
      callback(data.items[0])
