class PlayerManager

  CROSSFADE_STEP_SIZE = 25

  constructor: () ->
    @YTAPILoaded = false

    @players = {
      current: null
      next: null
    }

    document.addEventListener 'player_track_change', (e) =>
      # If we've preloaded this track, swap it into the "current" slot
      if @players.next and @players.next.track._pid == e.detail[0]._pid
        @players.current = new Player('current-player', @players.next)

      @preloadTrack e.detail[1]

  init: () ->
    YTAPILoadInterval = setInterval () =>
      if window.YT && window.YT.Player
        clearInterval YTAPILoadInterval

        @YTAPILoaded = true
    ,  100

  preloadTrack: (track) =>
    @getVideoIdFromTrack track, (id) =>
      @players.next = new PreloadPlayer('preload-player')
      @players.next.loadVideo id

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
