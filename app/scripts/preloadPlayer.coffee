class PreloadPlayer extends Player

  doBinds: () ->
    document.addEventListener 'player_set_volume', (e) -> @setVolume args[1]