class SpotifyInterface

  constructor: () ->
    @callbacks =
      onUserNavigated: []

    @currentPath = window.location.pathname

    setInterval () =>
      if @currentPath != window.location.pathname
        @currentPath = window.location.pathname

        for callback in @callbacks.onUserNavigated
          callback @currentPath
    , 333

  onUserNavigated: (callback) ->
    @callbacks.onUserNavigated.push callback

  onVideoChanged: (video) ->

