# Handles buttons, mouse events and popups inside the watch tab

class AppUI

  POPUP_TRANSITION_DURATION = 300

  constructor: (wrapperUI) ->
    @isExpanded = false
    @isFullscreen = false

    @mouseActivityTimeout = 0

    @popupTimeout =
      show: 0
      hide: 0

    @wrapperUI = wrapperUI

  init: () ->
    contexts = $('#app-player').add($('#now-playing-widgets iframe'))

    $(window).keydown @onKey

    $(window).mousemove $.throttle 100, @onMouseMove

    document.addEventListener 'player_track_change', @onTrack

  reloadBinds: () =>
    $('#app-player').contents().on
      mousemove: $.throttle 100, @onMouseMove
      keydown: @onKey

    $('#now-playing-widgets iframe').contents().on
      mousemove: $.throttle 100, @onMouseMove
      keydown: @onKey

  onKey: (e) =>
    @toggleExpanded() if e.keyCode is 69

    if e.keyCode is 70
      @toggleFullscreen()
      @toggleExpanded()

  onTrack: (event) =>
    @reloadBinds()
    @onTrackChange event.detail[0]

  onTrackChange: (track) =>
    return unless @isExpanded

    $('body').removeClass 'show-popup'

    setTimeout () ->
      $('#popup-name').html(track.name)
      $('#popup-artist').html(track.artistName)
    , POPUP_TRANSITION_DURATION

    clearTimeout @popupTimeout.show
    clearTimeout @popupTimeout.hide

    @popupTimeout.show = setTimeout () ->
      $('body').addClass 'show-popup'
    , 4000

    @popupTimeout.hide = setTimeout () ->
      $('body').removeClass 'show-popup'
    , 9000

  onVideoChanged: (video) ->
    $('#video-title').html(video.snippet.title)
    $('#channel-name').html(video.snippet.channelTitle)

  onMouseMove: () =>
    $('body').removeClass 'hide-controls'

    clearTimeout @mouseActivityTimeout
    @mouseActivityTimeout = setTimeout () ->
      $('body').addClass 'hide-controls'
    , 2000

  toggleFullscreen: () =>
    @toggleExpanded() if @isExpanded # Something is wrong here

    @isFullscreen = !@isFullscreen

    doc = document.documentElement

    if @isFullscreen
      if doc.requestFullscreen
        doc.requestFullscreen()
      else if doc.webkitRequestFullscreen
        doc.webkitRequestFullscreen Element.ALLOW_KEYBOARD_INPUT

    else
      if document.exitFullscreen
        document.exitFullscreen()
      else if document.webkitExitFullscreen
        document.webkitExitFullscreen()

  toggleExpanded: () =>
    @isExpanded = !@isExpanded

    $('body').toggleClass 'watchmode', @isExpanded
