# TODO and Feature Wishlist

## High Priority
* ~~``click.sequence`` property.~~
* AJAX based save/load and a rudimentary AMP servelet for it.
* Implement and standardise interaction with the static "adventure" variable
* Function to preload all resources before starting the game.
* Finish cleaning up the loose spaghetti

## On hold
* Authoring tools are on-hold. In the meantime, the  JSON editor [here](http://jeremydorn.com/json-editor/) can accept a custom schema; use adventure.schema.json to get a nice drill-down property editor for the whole adventure.

## Todo
* Features
	* ~~Define and use variables and logic when defining adventure~~
	* ~~Define 'sequence' objects to chain multiple click objects together with rules for repetition~~
* Sounds
	* Framework for single-occurrence events
		* ~~**See plans for ``click.sequence`` property in clicks.md.**~~
		* ~~one-shot sfx when you click on something? like, imagining a dull thud when you touch the Orb in the den~~
		* sounds that trigger the first time you enter the room but not ever again (thinking here, voiceover work?)
			* Likely will take the form of an ``action`` property that may be attached to a room, something like room.``onEnter``, ``onExit``, hosting a repeat-once ``sequence``.
	* Define transformations and apply them to soundscape tracks
	* does "clicking sfx every time you click on something" mean a global, universal click sfx?
* Coding practices
	* Define resource paths in meta for stuff like demo/img
	* Resource preloading
	* Finish despaghettification:
		* Pack editor high-level functionality into a class
		* Need a high-level class for pseudo-globals currently living in ``window``, namely ``var adventure`` and ``function start()``
	* LogicJinn.evaluateExpression needs a safe implementation for mathematical evaluation
	* Add room exists check to ``go``, make sure all Jinn provided functions are checking their arguments and returning useful warn/error messages
* README.md could use some words.
* AJAX based save/load and a rudimentary AMP servelet for it.
	* JSONP seems the most accepted way to do this but the *inelegance*
	* ``Access-Control-Allow-Origin`` headers described [here](https://stackoverflow.com/questions/3506208/jquery-ajax-cross-domain) look promising...
	* Also this is maybe what node.js is for? Or electron?

## Reevaluate
* a dedicated back button that sends you back to the previous place you were, since it turns out it's hard to find pictures with at least one entrance and exit in-photo
	* per-room option to override back button with a custom click object.
	* Maybe stick it in a toggleable BacktrackerJinn since this is not standard behavior for the genre
		* BacktrackerJinn should also provide an Action so any hotspot can trigger it
* Preload adjacent rooms, possibly even keep them in the DOM to avoid the "blink" between rooms


## Authoring tools (on hold)
* IOJinn should add support for AJAX based save/load.
* Make sidebars toggleable
* "Room properties" sidebar **in progress**
	* edit key/id, ~~img~~, add and configure hotspots
		* dynamic, drillable hotspot properties
		* define property schema, which properties can go on what
	* at-a-glance room states for inbound and outbound edges
* ~~Thumbnail all rooms in Room List sidebar~~
	* textbox insta-filter for finding by id *quickly*
* "Editor" room view
	* Cleaner hotspot editing
		* Alt+Click polygon edges to add vert
		* Alt+Click polygon vert to remove it
		* Pseudo-root handle for Polygons, translated in toCoords
		* Better visual connection between active hotspot in window and in properties
			* Maybe even have Properties *only* show properties for a selected hotspot, like Flash?
	* Shortcut key to "create hotspot to last room"
* Flexbox chicanery to easily change the editor's view to highlight a certain panel, if that seems necessary
* Tuck the editor into classes

## Done
* ~~HUD text pop-up event~~, or just a hovering image in general.
* ~~customizable pointers~~
* ~~PROPER class-based customizable pointers~~
* ~~prevent players from using the tab functionality to find hotspots~~
* ~~Use jQuery binds instead of href="javascript:function(args)"~~
* Editor mode
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
