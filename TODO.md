# TODO and Feature Wishlist

## High Priority
* adventure editor/toolkit [see below]
* Function to preload all resources before starting the game.

## Authoring tools

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
	* ~~Represent hotspots in this mode with interactive pieces within the SVG overlay~~
	 	* ~~Implement visible hotspots in the overlay SVG~~
		* ~~Implement handles for editable hotspots~~
    	* ~~Handles define allowed movement: bound X, bound Y, unbound~~
	* ~~Bind hotspot movement to the corresponding values in ``hotspot.area`` directly.~~
	* ~~Modifier key or right click to "follow hotspot" in the editor~~
	* Shortcut key to "create hotspot to last room"
* Flexbox chicanery to easily change the editor's view to highlight a certain panel, if that seems necessary
* Oh by the way, did I mention that for the sake of parity of development, I'm gonna put the editor mode code directly alongside the gameplay mode code and hinge on a boolean. Will this be a terrible effing idea? ![STAY TUNED](https://cdn.discordapp.com/attachments/509546131852886017/579533942957277195/unknown.png)
	* Maybe compartmentalise the editor just a little more.

## Todo
* Features
	* Define and use variables and logic when defining adventure
	* Define 'sequence' objects to chain multiple click objects together with rules for repetition
* Sounds
	* one-shot sfx when you click on something? like, imagining a dull thud when you touch the Orb in the den
	* sounds that trigger the first time you enter the room but not ever again (thinking here, voiceover work?)
	* Define transformations and apply them to soundscape tracks
	* ~~clean looping~~
	* ~~ability to play multiple tracks (ie, music and bird sfx) at the same time~~
	* ~~can change music when you enter a new room or keep it running without starting over~~
	* ~~clicking sfx every time you click on something~~
* Coding practices
	* Define resource paths in meta for stuff like demo/img
	* Resource preloading
	* Clean up all the spaghetti in the window, incorporate it into appropriate classes.

## Reevaluate
* a dedicated back button that sends you back to the previous place you were, since it turns out it's hard to find pictures with at least one entrance and exit in-photo
	* per-room option to override back button with a custom click object.
* Preload adjacent rooms, possibly even keep them in the DOM to avoid the "blink" between rooms

## Done
* ~~HUD text pop-up event~~, or just a hovering image in general.
* ~~customizable pointers~~
* ~~PROPER class-based customizable pointers~~
	* *I sketched some hella sweet retro cursors for this for now*
* ~~prevent players from using the tab functionality to find hotspots~~
* ~~Use jQuery binds instead of href="javascript:function(args)"~~
