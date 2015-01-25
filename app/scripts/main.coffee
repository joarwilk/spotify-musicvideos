if window.location.pathname == '/watch'
  window.location = '/collection/playlists#watch'

do ->
  ui = new SpotifyUI()
  ui.doBinds()
  ui.loadExtraResources()

  loadImmediately = window.location.hash == '#watch'

  $(document).ready () ->
    ui.attachMenuItem()
    ui.createWatchTab()

    if loadImmediately
      $('#overlay').show()

  ui.onStarted () ->
    player = new Player()
    spotify = SpotifyInterface.get()

    ui.onTabShown spotify.runPlayerQuery
    ui.onTabHidden spotify.stopPlayerQuery

    spotify.onTrack player.changeTrack
    spotify.onSeek player.seek
    spotify.onPlayState player.onPlayState
    spotify.onUserNavigated (path) ->
      if path is '/watch'
        ui.showWatchTab()
      else
        ui.hideWatchTab()

    if loadImmediately
      $('#overlay').hide()
      ui.showWatchTab()

    console.log  loadImmediately, 'load imme'
