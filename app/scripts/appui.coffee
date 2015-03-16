# Handles buttons and popups inside the watch tab

class AppUI

  constructor: (wrapperUI) ->
    @isExpanded = false
    @isFullscreen = false

    @wrapperUI = wrapperUI

  onTrackChange: (track) ->
    $('#popup-name').html(track.name)
    $('#popup-artist').html(track.artistName)

  onVideoChange: (video) ->
    console.info 'videochange', video
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

    @wrapperUI.elements.tab.toggleClass 'expanded', @isExpanded