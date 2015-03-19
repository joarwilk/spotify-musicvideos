# Handles everything UI-related that is outside
# of the actual watch tab (menu items, css load etc)

class SpotifyUI

  constructor: () ->
    @callbacks =
      onStarted: []
      onTabShown: []
      onTabHidden: []

    @elements =
      tab: null
      menuItem: null
      body: $ 'body'
      wrapper: null

    startClassInterval = setInterval(() =>
      if @elements.body.hasClass 'started'
        for callback in @callbacks.onStarted
          callback()
        clearInterval startClassInterval
    , 100)

  onStarted: (callback) ->
    @callbacks.onStarted.push callback

  onTabShown: (callback) ->
    @callbacks.onTabShown.push callback

  onTabHidden: (callback) ->
    @callbacks.onTabHidden.push callback

  onResize: () =>
    return unless @elements.wrapper

    height = @elements.wrapper.innerHeight()
    @elements.wrapper.css top: $(window).height() / 2 - height / 2

  doBinds: () ->
    $(document).on 'click', '#nav-watch', @showWatchTab
    $(window).on 'resize', @onResize

  loadExtraResources: () ->
    # TODO: Move this + fonts to local file (faster loading)
    $('head').append('<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">')

    chrome.extension.sendRequest { method: 'getScript', file: 'vendor/youtube' }, (js) ->
      window.YTConfig = host: "http://www.youtube.com" unless window.YTConfig
      eval js # Spooky

  attachMenuItem: () ->
    navMenuHTML = """
      <li>
        <a data-href="follow" id="nav-watch" class="standard-menu-item">
          <i class="fa fa-youtube-play"></i>
          <span class="nav-text">Watch</span>
        </a>
      </li>
    """

    @elements.menuItem = $(navMenuHTML)
      .insertBefore($('.item-profile'))
      .find('a')

  createWatchTab: () ->
    tabHTML = """
      <div id="section-watch" class="stacked hidden"></div>
    """

    @elements.tab = $(tabHTML).insertAfter $('#section-follow')

    request =
      method: 'getView'
      file: 'tab'
    chrome.extension.sendRequest request, (html) =>
      @elements.tab.html(html)
      @elements.throbber = @elements.tab.find '.throbber'
      @elements.wrapper = @elements.tab.find '.video-wrapper'

      @showLoadingOverlay()

  showWatchTab: () =>
    $('body').addClass 'watching'
    $('.active').removeClass 'active'
   # $('#main > div').addClass 'hidden'

    @elements.menuItem.addClass 'active'
    @elements.tab.removeClass 'hidden'

    @elements.tab.find('.root').show()

    $(window).resize()

    for callback in @callbacks.onTabShown
      callback()

    history.pushState {}, 'Watch', '/watch'

  hideWatchTab: () =>
    $('body').removeClass 'watching'

    @elements.menuItem.removeClass 'active'
    @elements.tab.addClass 'hidden'

    @elements.tab.find('.root').hide()

    for callback in @callbacks.onTabHidden
      callback()

  showLoadingOverlay: () ->
    @elements.throbber.removeClass 'hide'

  hideLoadingOverlay: () ->
    @elements.throbber.addClass 'hide'

