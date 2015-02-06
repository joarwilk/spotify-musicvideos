class Synchronizer

  onTrack: (track) ->
    console.log chrome#.storage.local.set({'value': 2})