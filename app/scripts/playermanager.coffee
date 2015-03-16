class PlayerManager

  CROSSFADE_STEP_SIZE = 25

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

        # If we tried to load a video before
        # the YouTube API had loaded, the video
        # was put on hold. This call forces a
        # re-initialization of the player
        @players.current?.onAPILoad()
        @players.next?.onAPILoad()

        @YTAPILoaded = true
    ,  100

    # Store the track - even if inactive - so we can start mid-song
    document.addEventListener 'player_track_change', (e) =>
      @tracks =
        current: e.detail[0]
        next: e.detail[1]

  setActive: (isActive) ->
    console.info isActive, 'is active'
    if isActive
      document.addEventListener 'player_track_change', @onTrack
      @onTrack detail: [@tracks.current, @tracks.next]
    else
      document.removeEventListener 'player_track_change', @onTrack

  preloadTrack: (track) =>
    @getVideoFromTrack track, (video) =>
      @players.next = new PreloadPlayer('preload-player', track)
      @players.next.loadVideo video.id.videoId

  onTrack: (event) =>
    id = 0

    console.info 'track', @players.next?.track._pid, event.detail[0]._pid

    # If we've preloaded this track, swap it into the "current" slot
    if @players.next and @players.next.track._pid == event.detail[0]._pid
      @players.current = @players.next
      @players.current.makeCurrent()
      @stopCrossfade()
    else
      @getVideoFromTrack event.detail[0], (video) =>
        @players.current.loadVideo video.id.videoId

        for callback in @callbacks.onVideoChanged
            callback video

    @preloadTrack event.detail[1]

  # Transition the volume of the next track into the initial
  # volume of the current track, while fading out
  # the current track.
  # When we're finished, fire the onFinished callback
  crossfade: (duration, onFinished) ->
    @players.current.element.fadeOut duration
    @players.next.element.fadeIn duration

    @players.next.isCrossfading = true

    step = 0
    interval = setInterval () =>
      if @crossfadeShouldStop
        clearInterval interval
        return

      progress = (step++ * CROSSFADE_STEP_SIZE) / duration

      if progress >= 1
        clearInterval interval
        onFinished()
      else
        current.setVolume (1 - progress) * current.getVolume()
        next.setVolume progress.current.getVolume()

    , CROSSFADE_STEP_SIZE

  stopCrossfade: () ->
    @crossfadeShouldStop = true

  onVideoChanged: (callback) ->
    @callbacks.onVideoChanged.push callback

  getVideoFromTrack: (track, callback) ->
    params =
      part: 'id,snippet'
      q: "#{track.name} #{track.artistName} offical video"
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'

    return $.getJSON 'https://content.googleapis.com/youtube/v3/search', params, (data) ->
      callback(data.items[0])
