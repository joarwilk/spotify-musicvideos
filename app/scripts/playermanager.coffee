class PlayerManager

  CROSSFADE_STEP_SIZE = 25

  constructor: () ->
    @YTAPILoaded = false

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
    if isActive
      document.addEventListener 'player_track_change', @onTrack
      @onTrack detail: [@tracks.current, @tracks.next]
    else
      document.removeEventListener 'player_track_change', @onTrack

  preloadTrack: (track) =>
    @getVideoIdFromTrack track, (id) =>
      @players.next = new PreloadPlayer('preload-player', track)
      @players.next.loadVideo id

  onTrack: (event) =>
    # If we've preloaded this track, swap it into the "current" slot
    if @players.next and @players.next.track._pid == event.detail[0]._pid
      @getVideoIdFromTrack track, (id) =>
        @players.current = new Player('primary-player', event.detail[0], @players.next)
        @players.current.loadVideo id
    else
      @getVideoIdFromTrack track, (id) =>
        @players.current = new Player('primary-player', event.detail[0])
        @players.current.loadVideo id

    @preloadTrack event.detail[1]

  # Transition the volume of the next track into the initial
  # volume of the current track, while fading out
  # the current track.
  # When we're finished, fire the onFinished callback
  crossfade: (duration, onFinished) ->
    @players.current.element.fadeOut duration
    @players.next.element.fadeIn duration

    step = 0
    interval = setInterval () ->
      progress = (step++ * CROSSFADE_STEP_SIZE) / duration

      if progress >= 1
        clearInterval interval
        onFinished()
      else
        current.setVolume (1 - progress) * current.getVolume()
        next.setVolume progress.current.getVolume()

    , CROSSFADE_STEP_SIZE

  getVideoIdFromTrack: (track, callback) ->
    params =
      part: 'id,snippet'
      q: "#{track.name} #{track.artistName} offical video"
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'

    $.getJSON 'https://content.googleapis.com/youtube/v3/search', params, (data) ->
      callback(data.items[0].id.videoId)
