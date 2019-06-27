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

## Reevaluate
* a dedicated back button that sends you back to the previous place you were, since it turns out it's hard to find pictures with at least one entrance and exit in-photo

## On hold
* Authoring tools are on-hold. In the meantime, the  JSON editor [here](http://jeremydorn.com/json-editor/) can accept a custom schema; use adventure.schema.json to get a nice drill-down property editor for the whole adventure.

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
