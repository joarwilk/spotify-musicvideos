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

    startClassInterval = 0
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

  doBinds: () ->
    $(document).on 'click', '#nav-watch', @showWatchTab

    $(document).on 'click', '#nav-items > li > a:not(#nav-watch, #nav-search)', @hideWatchTab

  loadExtraResources: () ->
    $('head').append('<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">')

    chrome.extension.sendRequest cmd: 'read_script', (js) =>
      YTConfig = host: "http://www.youtube.com"  unless window["YTConfig"]
      eval js

    #$.getScript('<script src="https://www.youtube.com/iframe_api"></script>')

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
    chrome.extension.sendRequest cmd: 'read_file', (html) =>
      @elements.tab.html(html)
      @elements.throbber = @elements.tab.find '.throbber'
      @showLoadingOverlay()

  showWatchTab: () =>
    $('.active').removeClass 'active'
   # $('#main > div').addClass 'hidden'

    @elements.menuItem.addClass 'active'
    @elements.tab.removeClass 'hidden'

    @elements.tab.find('.root').show()

    height = @elements.tab.find('.video-wrapper').innerHeight()
    @elements.tab.find('.video-wrapper').css top: $(window).height() / 2 - height / 2

    for callback in @callbacks.onTabShown
      callback()

    history.pushState {}, 'Watch', '/watch'

  hideWatchTab: () =>
    @elements.menuItem.removeClass 'active'
    @elements.tab.addClass 'hidden'

    @elements.tab.find('.root').hide()

    for callback in @callbacks.onTabHidden
      callback()

  showLoadingOverlay: () ->
    @elements.throbber.removeClass 'hide'

  hideLoadingOverlay: () ->
    @elements.throbber.addClass 'hide'

