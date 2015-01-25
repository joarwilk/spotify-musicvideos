class Player


  constructor: () ->
    @currentTrack = null

    YTAPILoadInterval = 0
    YTAPILoadInterval = setInterval () =>
      if window.YT && window.YT.Player
        clearInterval YTAPILoadInterval
        @player = new window.YT.Player 'youtube-frame', {
          videoId: ''
          playerVars: {
            'autoplay': 1
            'controls': 1
            'rel' : 0
            'disablekb': 1
            'iv_load_policy': 3
            'modestbranding ': 1
            'hd': 1
            'showinfo': 0
          }
        }

        if @currentTrack is not null
          @changeTrack @currentTrack
    , 100

  changeTrack: (track) =>
    @currentTrack =
      name: track.name
      artist: track.artist
      position: 0

    @queryYoutubeVideos (items) =>
      console.log items
      video = items[0]

      # Since we can't use the onReady youtube events due to sandboxing
      # we have to check load state with an interval
      YTPlayerLoadInterval = setInterval =>
        return unless @player and @player.loadVideoById

        @player.loadVideoById(video.id.videoId, 0, 'maxres')
        @player.setPlaybackQuality('highres')
        @player.mute()
        @player.seekTo(1, true);

        clearInterval YTPlayerLoadInterval
        console.log 'loaded'
      , 250

      ###
      interval = setInterval () =>
        return if @player.getDuration() == 0
        clearInterval interval

        query = "#{track.name} #{track.artist} official"
        $.getJSON "https://api.soundcloud.com/tracks.json?q=#{query}&client_id=b45b1aa10f1ac2941910a7f0d10f8e28&app_version=9dc8303", (items) =>

          for item, i in items
            diff = Math.abs((item.duration / 1000) - @player.getDuration())

            if diff < 2
              console.log "Using " + item.title
              params =
                youtube: video.id.videoId
                ytime: @player.getDuration()
                soundcloud: item.permalink_url
                stime: parseInt item.duration / 1000

              $.getJSON('http://localhost:8888/delay', params, (delay) ->
                console.log delay
              ).error((a,b) -> console.error(a, b))

              break
      , 200
      ###

  seek: (position) =>
    console.log 'seeking to', position / 1000
    @player.seekTo(position / 1000 + 2, true);

  onPlayState: (shouldPlay) =>
    if shouldPlay then @player.playVideo() else @player.pauseVideo()

  queryYoutubeVideos: (callback) ->
    query = encodeURIComponent(@currentTrack.name + ' ' + @currentTrack.artist + ' offical video')
    $.getJSON('https://content.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=' + query + '&key=AIzaSyD3ufUdOQMxYEWv0yLVvPnvuqSpSLTLfPU', (data) ->
      callback(data.items)
    )