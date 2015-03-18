# Handles buttons and popups inside the watch tab

class AppUI

  constructor: (wrapperUI) ->
    @isExpanded = false
    @isFullscreen = false

    @wrapperUI = wrapperUI

  init: () ->
    $(window).keydown (e) =>
      @toggleExpanded() if e.keyCode is 69


      if e.keyCode is 70
        @toggleFullscreen()
        @toggleExpanded()
    $(window).mousemove () ->
      console.log 'mousemoves'

  onTrackChange: (track) ->
    $('#popup-name').html(track.name)
    $('#popup-artist').html(track.artistName)

  onVideoChanged: (video) ->
    $('#video-title').html(video.snippet.title)
    $('#channel-name').html(video.snippet.channelTitle)

  showTrackBubble: () ->


  toggleFullscreen: () ->
    @toggleExpanded()

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


  toggleExpanded: () ->
    @isExpanded = !@isExpanded

    $('body').toggleClass 'watchmode', @isExpanded