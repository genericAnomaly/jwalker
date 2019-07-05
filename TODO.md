# TODO and Feature Wishlist

## High Priority
* Function to preload all resources before starting the game.
	* Should do resource paths too
* Better save/load
* Implement and standardise interaction with the static "adventure" variable

## Todo
* README.md could use some words.
* Coding practices
	* make sure all Jinn provided functions are checking their arguments and returning useful warn/error messages
		* This is a big one in terms of author utility
	* Define resource paths in meta for stuff like demo/img
	* Resource preloading
	* Finish despaghettification:
		* Need a high-level class (probably a core Jinn) for keeping track of pseudo-globals currently living in ``window``, namely ``var adventure`` and ``function start()``
* InteractionJinn
	* Ability to define events other than clicks
		* sounds that trigger the first time you enter the room but not ever again (thinking here, voiceover work?)
			* Likely will take the form of an ``action`` property that may be attached to a room, something like room.``onEnter``, ``onExit``, hosting a repeat-once ``sequence``.
* AudioJinn
	* Define transformations and apply them to soundscape tracks
	* clicking sfx every time you click on something
		* does this mean a global, universal click sfx?
* IOJinn
	* AJAX based save/load and a rudimentary AMP servelet for it.
		* JSONP seems the most accepted way to do this but the *inelegance*
		* ``Access-Control-Allow-Origin`` headers described [here](https://stackoverflow.com/questions/3506208/jquery-ajax-cross-domain) might allow for an arbitrary url storage solution...
* OverlayJinn
	* Clean up text to use <textarea> if that's supported yet
* RoomJinn
	* Rename to NavigationJinn
	* Add room exists check to ``go``
	* ``backtrack`` action
		* Either a ``back`` action or a parameter for ``go``
		* add it to RoomJinn / NavigationJinn, have it keep a stack of ``go``s
		* per-room option to override designated back button with a substitute action
			* Something like "onBacktrack, do ACTION, allowBacktrack = true|false"
		* Action availability should be configurable globally too
	* Presentational sugar
		* "dissolve" transition between screens using [mask](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) and [mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)
* LogicJinn
	* We will need to either implement or (more likely) adopt a pre-existing library for mathematical evaluation.
		* There are libraries, but they're somewhat locked behind understanding the node.js workflow
* Room states

## Reevaluate
* a dedicated back button that sends you back to the previous place you were, since it turns out it's hard to find pictures with at least one entrance and exit in-photo

## On hold
* Authoring tools are on-hold. In the meantime, the  JSON editor [here](http://jeremydorn.com/json-editor/) can accept a custom schema; use adventure.schema.json to get a nice drill-down property editor for the whole adventure.
	* As of the implementation of conditional logic, you must ensure that you enable the boolean option "Only show required properties by default," otherwise a infinite recursion lock will occur when adding new hotspots.
	* Click [here](http://jeremydorn.com/json-editor/?schema=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&value=N4IgtgpgLghiBcoDOsBOUEhAXwDQlQHtCwkFhtsg&theme=foundation6&iconlib=foundation3&object_layout=normal&show_errors=interaction&display_required_only) to start the external editor pre-populated with the suggested settings. Note that to load your own adventure.js, you must remove all ``/*comments*/`` from the object, as well as the opening ``var adventure = `` and closing ``;``.
	* Click [here](http://jeremydorn.com/json-editor/?schema=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&value=N4IgtgpgLghiBcoDOsBOUEgPYFcpIEsATCEAGhAAcYoALTGJJaJAenJBj1q1UwBEIAOyEEkHITEgDhopAAIAijggoOSAMaoIwhKADuxOggAcABjMVaEAgHNaGeADYLAX1cVUWLGHGIQAGZYAJ4QfP4EYLaYQaGoAHSUQtEUYDCUeiAoMASofqAw2nD+SLTppPBUWAA2wRwa3qhEfiAATK2WlgDMAJyWAIz9lgAsJgCsZEMTwxZkZvXVjC2FXvoAtDggHiAa1QQaANaZtliYOJTZueLuFESNmYUQxchllBUg2hoYFA28zZhjADsgMmJhBTh60y6wwWSwYqFWayEWx+e0Ox1OlVw+GIpBuID29kcBSKmVK5UwGlyu1IP0a/0qgI6ZD6ZC6Y1hTAYXwIWCEawgAA8pAQhHjUfsjiVoJkAG6FAgwABG1XeQVOFHl1RUmAAJOr5ABqeT9Lb4nh5Cokp5k17vKmoGn1ektVqArpkVpgsjDQGc5Y8vlrMpCIgonZoqXICAARxUQg0Vs4gaEfgA2tHiSB5ahFSr3krChwtTrKlBUDrtlAhVmULnkpgAFQAYQAMgBJZsAaUbZrIoGrgtr5dF0Uq7ag8n0fIA5JPC6hbBB4iuzQBdTwQN40TCLNTubbUUVQUcPUklO2YSg1Op0v4tIaWVouT1mCatMY9V8TR+TWZODlUThSoYBTAVhTAUVxQjSUyVjeNEweFN02QAJBUyA4IDqSoLWYYsahwaR4DMeI3xuAcazJEcG0qAAVax5ACHAhHkMVZTCeQUCwC54nXTdt0cQJeAgdi+APKtUFAg58g+GAiF5BASLI7ZzkuPJMkiMcQFU2ArkSBtUnSKicnU/xHmeLJL0qT5vh2F0ASGH0ZjIcxLBceYgK5ECESwdYw22XZYP8E4YhCMI+xAct0juXgzxtC8KUqa9amde9MH6QEnw9Xp+kmEFeh/MwnE9YZiqGP1POWHz1k2ALIwxBgoBPDQIpi1A1n0OKLPJN5MBs1KmldYYPX6ExiufKETH9eFEU6uqgtAEKsTwQgSFaxoBS621Eo+CAvgGhkQDGJwPQ6YYyDGEwTB9Ubpu8xFoMC9FgsxbAVtxdbeCRLaEt66y9ts35BswLpAXG/piuGS6fTMKbKpm3zvvm57QAaUMCBPPkNICTAAApdQXeQAF4ifkcsVAASg4OhdBezBCzoLwfHDCBqjw/xB2HestJXeJqiwQ4ICIXjtiQNCMKw3cBcwsNNQIoj+nE7ZC0OfRCgZa1uqs3b9rvYHKksMYxhGK6yHcu7OGqtZrglFGQCWt6cTWg8KCiw4ZMk+TMRI1p8RoZqNKiRrmv0lJwCM/wVajS34peHb+r1w7LHkI3k9csh5HN+H7sRm2YLth2dJM65RYOHBqmqH647+nZqVVA6WicVofQ/T0KojYDk0x/khRFMVwye6POao7nMAAZUgCuFD2TCp2geQNBoXmLc5tYACsMerVBgjJms1iIXNKEoU9xNdyT3cyT2FOI+InHxbFVqTTTMAf3FQ44NIMn8Nqq8s+OAYbiDWYGVujGzZF0DyHcvKW0RMiZG0cHaxHCqfEADNaBMzAIHLSaCMHv0Ml/UAUdf49XeAnOyaUDYZ1ThndOmcLAWxWLnAe9U6aVCLlcT64RNbbRrslW85D9YgBOtdVouUITnUsICcwcwyBMlymMXoZt+jN19F0BhVtHosIokOEep5Ki835oLYW4YxboX8JhbCBJpZC3wtqBWLtwC5C8FwmOWt/66wEYdLo3iLqQzGLlVo3iGFgV7pBfu8DMjDxKNRLSrZvAHFFDOeQJwsD+QcW7aSl85LXyUmMBxpjMi4STEgR0mAinxCwLYaI2xDEyzJKUyotShYVKqRFDJHtsmYmQA02SXsWnVO2DmPMqoZLqkUhQBcCAAgwDZhAdwQAAA==&theme=foundation6&iconlib=foundation3&object_layout=normal&show_errors=interaction&display_required_only) to start it pre-populated with the demo-adventure.

## Authoring tools (on hold)
* UI
	* Make sidebars toggleable
	* Flexbox chicanery to easily change the editor's view to highlight a certain panel, if that seems necessary
	* "Room List" sidebar
		* textbox insta-filter for finding by id *quickly*
		* Drag room to editing area to quickly make a go hotspot
	* "Room properties" sidebar
		* edit key/id, ~~img~~, add and configure hotspots
			* dynamic, drillable hotspot properties
			* define property schema, which properties can go on what
		* at-a-glance room states for inbound and outbound edges
* Functionality
	* Pack editor high-level functionality into a Jinn
	* IOJinn should add support for AJAX based save/load.
* "Editor" room view
	* Cleaner hotspot editing
		* Alt+Click polygon edges to add vert
		* Alt+Click polygon vert to remove it
		* Pseudo-root handle for Polygons, translated in toCoords
		* Better visual connection between active hotspot in window and in properties
			* Maybe even have Properties *only* show properties for a selected hotspot, like Flash?
	* Shortcut key to "create hotspot to last room"

## Done
* ~~Finish cleaning up the loose spaghetti~~ Got the worst of it
* ~~one-shot sfx when you click on something? like, imagining a dull thud when you touch the Orb in the den~~ Doable with a non-repeating sequence
* ~~Define and use variables and logic when defining adventure~~
* ~~Define 'sequence' objects to chain multiple click objects together with rules for repetition~~
* ~~HUD text pop-up event~~, or just a hovering image in general.
* ~~customizable pointers~~
* ~~PROPER class-based customizable pointers~~
* ~~prevent players from using the tab functionality to find hotspots~~
* ~~Use jQuery binds instead of href="javascript:function(args)"~~
* Editor mode
	* ~~Thumbnail all rooms in Room List sidebar~~
	* ~~Represent hotspots in this mode with interactive pieces within the SVG overlay~~
		* ~~Implement visible hotspots in the overlay SVG~~
		* ~~Implement handles for editable hotspots~~
		* ~~Handles define allowed movement: bound X, bound Y, unbound~~
	* ~~Bind hotspot movement to the corresponding values in ``hotspot.area`` directly.~~
	* ~~Modifier key or right click to "follow hotspot" in the editor~~
* Audio
	* ~~clean looping~~
	* ~~ability to play multiple tracks (ie, music and bird sfx) at the same time~~
	* ~~can change music when you enter a new room or keep it running without starting over~~
	* ~~sfx on click~~
* ~~Clean up most of the spaghetti in the window, incorporate it into appropriate classes.~~
