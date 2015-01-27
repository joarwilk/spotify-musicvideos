if window.location.pathname == '/watch'
  window.location = '/collection/playlists#watch'
window.stop()
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
    sync = new Synchronizer()
    spotify = new SpotifyInterface()

    ui.onTabShown spotify.runPlayerQuery
    ui.onTabHidden spotify.stopPlayerQuery

    spotify.onTrack sync.onTrack
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
      $('#section-user').addClass 'hidden' # User tab is open by defaut
      ui.showWatchTab()

    console.log  loadImmediately, 'load imme'
