class PlayerManager

  CROSSFADE_STEP_SIZE = 25

  constructor: () ->
    @YTAPILoaded = false

    document.addEventListener 'player_track_change', (e) ->
      @preloadTrack e.detail[1]
      console.info e
      console.info 'Current track', e.detail[0]

  init: () ->
    YTAPILoadInterval = setInterval () =>
      if window.YT && window.YT.Player
        clearInterval YTAPILoadInterval

      @YTAPILoaded = true
    ,  100

  preloadTrack: (track) ->
    @getVideoIdFromTrack track, (id) ->
      player = new PreloadPlayer('preload-player')
      player.loadVideo id

  # Transition the volume of the next track into the initial
  # volume of the current track, while fading out
  # the current track.
  # When we're finished, fire the onFinished callback
  crossfade: (current, next, duration, onFinished) ->
    unless current instanceof Player and next instanceof Player
      throw new Exception('PlayerManager::crossfade requires two valid players')

    current.element.fadeOut duration
    next.element.fadeIn duration

    step = 0
    interval = setInterval () ->
      progress = (step * CROSSFADE_STEP_SIZE) / duration

      if progress >= 1
        clearInterval interval
        onFinished()
      else
        current.setVolume (1 - progress) * current.getVolume()
        next.setVolume progress.current.getVolume()

    , CROSSFADE_STEP_SIZE

  getVideoIdFromTrack: (track, callback) ->
    query = encodeURIComponent "#{@track.name} #{@track.artistName} offical video"

    params =
      part: 'id%2Csnippet'
      q: query
      key: 'AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU'

    $.getJSON 'https://content.googleapis.com/youtube/v3/search', params, (data) ->
      callback(data.items[0].id.videoId)
