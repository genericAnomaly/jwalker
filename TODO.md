# TODO and Feature Wishlist

## High Priority
* ~~``click.sequence`` property.~~
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
		* **See plans for ``click.sequence`` property in clicks.md.**
		* one-shot sfx when you click on something? like, imagining a dull thud when you touch the Orb in the den
		* sounds that trigger the first time you enter the room but not ever again (thinking here, voiceover work?)
	* Define transformations and apply them to soundscape tracks
	* does "clicking sfx every time you click on something" mean a global, universal click sfx?
* Coding practices
	* Define resource paths in meta for stuff like demo/img
	* Resource preloading
	* ~~Clean up **all** the spaghetti in the window, incorporate it into appropriate classes.~~
	* Finish despaghettification:
		* Pack editor high-level functionality into a class
		* Need a high-level class for pseudo-globals currently living in ``window``, namely ``var adventure`` and ``function start()``
* README.md could use some words.
* Add room exists check to ``go``, make sure all Jinn provided functions are checking their arguments and returning useful warn/error messages

## Reevaluate
* a dedicated back button that sends you back to the previous place you were, since it turns out it's hard to find pictures with at least one entrance and exit in-photo
	* per-room option to override back button with a custom click object.
* Preload adjacent rooms, possibly even keep them in the DOM to avoid the "blink" between rooms


## Authoring tools (on hold)
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
	* *I sketched some hella sweet retro cursors for this for now*
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
