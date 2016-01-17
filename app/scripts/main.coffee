if window.location.pathname == '/watch'
  # The playlist page has the fastest load time
  window.location = '/collection/playlists#watch'

do ->
  ui = new SpotifyUI()
  ui.doBinds()
  ui.loadExtraResources()

  appUI = new AppUI()

  manager = new PlayerManager()

  # Check if the user requested /watch
  loadImmediately = window.location.hash == '#watch'

  # Messages are emitted in spotify.js
  # and then relayed by background.js
  chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
    console.info request.title
    event = new CustomEvent request.title, detail: request.args
    document.dispatchEvent event

  $(document).ready () ->
    ui.attachMenuItem()
    ui.createWatchTab()

    appUI.init()

    # For some unknown reason, the Collection nav item
    # stops working when we're in watch mode
    # This little trick fixes that
    $('#nav-collection').click (e) ->
      console.log e
      e.preventDefault()
      $('#nav-follow').click()
      #if e.hasOwnProperty('originalEvent')
        #$(this).click()
      return false

    if loadImmediately
      $('#overlay').show()

  ui.onStarted () ->
    spotify = new SpotifyInterface()

    manager.onVideoChanged appUI.onVideoChanged
    manager.onVideoChanged spotify.onVideoChanged

    spotify.onUserNavigated (path) ->
      if path isnt '/watch'
        ui.hideWatchTab()

    if loadImmediately
      $('#overlay').hide()
      $('#section-user').addClass 'hidden' # User tab is open by defaut
      ui.showWatchTab()

      manager.init () ->
        manager.setActive true
    else
      ui.onTabShown () ->
        manager.init () ->
          manager.setActive true


