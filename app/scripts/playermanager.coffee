class PlayerManager

  CROSSFADE_STEP_SIZE = 50

  constructor: () ->
    @callbacks =
      onVideoChanged: []

    @YTAPILoaded = false
    @crossfadeShouldStop = false

    @players = {
      current: null
      next: null
    }

    @tracks = {}

    YTAPILoadInterval = setInterval () =>
      if window.YT && window.YT.Player
        clearInterval YTAPILoadInterval


        @YTAPILoaded = true
    ,  100

    # Store the track - even if inactive - so we can start mid-song
    document.addEventListener 'player_track_change', @updateCurrentTracks

  init: () ->
    @players.current = new Player(null, true)

  setActive: (isActive) ->
    if isActive
      document.removeEventListener 'player_track_change', @updateCurrentTracks
      document.addEventListener 'player_track_change', @onTrack

      if @tracks.current
        @onTrack detail: [@tracks.current, @tracks.next]
    else
      document.addEventListener 'player_track_change', @updateCurrentTracks
      document.removeEventListener 'player_track_change', @onTrack

  preloadTrack: (track) =>
    @getVideoFromTrack track, (video) =>
      @players.next?.remove()
      @players.next = new Player(track, false)
      @players.next.loadVideo video.id.videoId

  updateCurrentTracks: (event) =>
    @tracks =
      current: event.detail[0]
      next: event.detail[1]

  onTrack: (event) =>
    id = 0

    # Sometimes the track event is fired multiple times
    # this if statement verifies that we only refresh the players
    # when the tracks actually change
    if @tracks.current? and !(event.detail[0]._pid == @tracks.current._pid)
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
          @players.current.loadVideo video.id.videoId

          for callback in @callbacks.onVideoChanged
            callback video

        @preloadTrack event.detail[1]
    @updateCurrentTracks event

  # Transition the volume of the next track into the initial
  # volume of the current track, while fading out
  # the current track.
  # When we're finished, fire the onFinished callback
  crossfade: (duration, onFinished) ->
    $('#player-' + @players.current._id).css opacity: 0

    @players.next.isCrossfading = true

    targetVolume = @players.current.getVolume()
    step = 0
    interval = setInterval () =>
      if @crossfadeShouldStop
        clearInterval interval
        return

      progress = (step++ * CROSSFADE_STEP_SIZE) / duration
      console.info progress, (1 - progress) * targetVolume

      if progress >= 1
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
