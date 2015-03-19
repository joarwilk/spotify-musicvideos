class Timer
  constructor: (time) ->
    @endTime = time
    @currentTime = 0
    @prevTime = 0

  onFinished: (callback) ->
    @callback = callback

  jumpTo: (time) ->
    @currentTime = time

  start: () ->
    @prevTime = new Date().getTime()

    @intervalID = setInterval () =>
      # We use the date object beacause
      # I don't trust setInterval to be accurate
      time = new Date().getTime()
      @currentTime += time - @prevTime
      @prevTime = time

      console.info @endTime - @currentTime

      if @currentTime >= @endTime
        @stop()
        @callback(@currentTime - @endTime)
    , 200

  pause: () =>
    clearInterval @intervalID

  reset: () =>
    @currentTime = 0

  stop: () =>
    @pause()
    @currentTime = 0