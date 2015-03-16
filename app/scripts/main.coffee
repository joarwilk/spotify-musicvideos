if window.location.pathname == '/watch'
  # The playlist page has the fastest load time
  window.location = '/collection/playlists#watch'

do ->
  ui = new SpotifyUI()
  ui.doBinds()
  ui.loadExtraResources()

  manager = new PlayerManager()

  # Check if the user requested /watch
  loadImmediately = window.location.hash == '#watch'

  # Messages are emitted in spotify.js
  # and then relayed by background.js
  chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
    event = new CustomEvent request.title, detail: request.args
    document.dispatchEvent event

  $(document).ready () ->
    ui.attachMenuItem()
    ui.createWatchTab()

    manager.init()

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
      if path isnt '/watch'
        ui.hideWatchTab()

    if loadImmediately
      $('#overlay').hide()
      $('#section-user').addClass 'hidden' # User tab is open by defaut
      ui.showWatchTab()
