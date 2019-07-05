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
	* Click [here](http://jeremydorn.com/json-editor/?schema=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&value=N4IgtgpgLghiBcoDOsBOUEhAXwDQlQHtCwkFhtsg&theme=foundation6&iconlib=foundation3&object_layout=normal&show_errors=interaction&display_required_only) to start the external editor pre-populated with the suggested settings, or [here](http://jeremydorn.com/json-editor/?schema=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&value=N4IgtgpgLghiBcoDOsBOUEgPYFcpIEsATCEAGhAAcYoALTGJJaJAenJBj1q1UwBEIAOyEEkHITEgDhopAAIAijggoOSAMaoIwhKADuxOggAcABjMVaEAgHNaGeADYLAX1cVUWLGHGIQAGZYAJ4QfP4EYLaYQaGoAHSUQtEUYDCUeiAoMASofqAw2nD+SLTppPBUWAA2wRwa3qhEfiAATK2WlgDMAJyWAIz9lgAsJgCsZEMTwxZkZvXVjC2FXvoAtDggHiAa1QQaANaZtliYOJTZueLuFESNmYUQxchllBUg2hoYFA28zZhjADsgMmJhBTh60y6wwWSwYqFWayEWx+e0Ox1OlVw+GIpBuID29kcBSKmVK5UwGlyu1IP0a/0qgI6ZD6ZC6Y1hTAYXwIWCEawgAA8pAQhHjUfsjiVoJkAG6FAgwABG1XeQVOFHl1RUmAAJOr5ABqeT9Lb4nh5Cokp5k17vKmoGn1ektVqArpkVpgsjDQGc5Y8vlrMpCIgonZoqXICAARxUQg0Vs4gaEfgA2tHiSB5ahFSr3krChwtTrKlBUDrtlAhVmULnkpgAFQAYQAMgBJZsAaUbZrIoGrgtr5dF0Uq7ag8n0fIA5JPC6hbBB4iuzQBdTwQN40TCLNTubbUUVQUcPUklO2YSg1Op0v4tIaWVouT1mCatMY9V8TR+TWZODlUThSoYBTAVhTAUVxQjSUyVjeNEweFN02QAJBUyA4IDqSoLWYYsahwaR4DMeI3xuAcazJEcG0qAAVax5ACHAhHkMVZTCeQUCwC54nXTdt0cQJeAgdi+APKtUFAg58g+GAiF5BASLI7ZzkuPJMkiMcQFU2ArkSBtUnSKicnU/xHmeLJL0qT5vh2F0ASGH0ZjIcxLBceYgK5ECESwdYw22XZYP8E4YhCMI+xAct0juXgzxtC8KUqa9amde9MH6QEnw9Xp+kmEFeh/MwnE9YZiqGP1POWHz1k2ALIwxBgoBPDQIpi1A1n0OKLPJN5MBs1KmldYYPX6ExiufKETH9eFEU6uqgtAEKsTwQgSFaxoBS621Eo+CAvgGhkQDGJwPQ6YYyDGEwTB9Ubpu8xFoMC9FgsxbAVtxdbeCRLaEt66y9ts35BswLpAXG/piuGS6fTMKbKpm3zvvm57QAaUMCBPPkNICTAAApdQXeQAF4ifkcsVAASg4OhdBezBCzoLwfHDCBqjw/xB2HestJXeJqiwQ4ICIXjtiQNCMKw3cBcwsNNQIoj+nE7ZC0OfRCgZa1uqs3b9rvYHKksMYxhGK6yHcu7OGqtZrglFGQCWt6cTWg8KCiw4ZMk+TMRI1p8RoZqNKiRrmv0lJwCM/wVajS34peHb+r1w7LHkI3k9csh5HN+H7sRm2YLth2dJM65RYOHBqmqH647+nZqVVA6WicVofQ/T0KojYDk0x/khRFMVwye6POao7nMAAZUgCuFD2TCp2geQNBoXmLc5tYACsMerVBgjJms1iIXNKEoU9xNdyT3cyT2FOI+InHxbFVqTTTMAf3FQ44NIMn8Nqq8s+OAYbiDWYGVujGzZF0DyHcvKW0RMiZG0cHaxHCqfEADNaBMzAIHLSaCMHv0Ml/UAUdf49XeAnOyaUDYZ1ThndOmcLAWxWLnAe9U6aVCLlcT64RNbbRrslW85D9YgBOtdVouUITnUsICcwcwyBMlymMXoZt+jN19F0BhVtHosIokOEep5Ki835oLYW4YxboX8JhbCBJpZC3wtqBWLtwC5C8FwmOWt/66wEYdLo3iLqQzGLlVo3iGFgV7pBfu8DMjDxKNRLSrZvAHFFDOeQJwsD+QcW7aSl85LXyUmMBxpjMi4STEgR0mAinxCwLYaI2xDEyzJKUyotShYVKqRFDJHtsmYmQA02SXsWnVO2DmPMqoZLqkwJAhcMQYBszxK4IAA=&theme=foundation6&iconlib=foundation3&object_layout=normal&show_errors=interaction&display_required_only) to start it pre-populated with the demo-adventure.
	* Note that to load your own adventure.js, you must remove all ``/*comments*/`` from the object, as well as the opening ``var adventure = `` and closing ``;``.

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
