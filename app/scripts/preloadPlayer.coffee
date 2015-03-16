class PreloadPlayer extends Player

  constructor: (elementID) ->
    super(elementID)

    @element.hide()

  doBinds: () ->
    document.addEventListener 'player_set_volume', (e) -> @setVolume args[1]