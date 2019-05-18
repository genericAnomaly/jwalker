# TODO and Feature Wishlist

* Features
	* a dedicated back button that sends you back to the previous place you were, since it turns out it's hard to find pictures with at least one entrance and exit in-photo
		* per-room option to override back button with a custom click object.
	* ~~HUD text pop-up event~~, or just a hovering image in general.
	* ~~customizable pointers~~
	* ~~PROPER class-based customizable pointers~~
		* I sketched some hella sweet retro cursors for this for now
	* prevent players from using the tab functionality to find hotspots
	* anything more complex than the lamp trick i pulled is gonna require actual variables
	* development tools
* Sounds
	* clean looping
	* ability to play multiple tracks (ie, music and bird sfx) at the same time
	* can change music when you enter a new room or keep it running without starting over
	* one-shot sfx when you click on something? like, imagining a dull thud when you touch the Orb in the den
	* clicking sfx every time you click on something
	* sounds that trigger the first time you enter the room but not ever again (thinking here, voiceover work?)
* Coding practices
	* ~~Use jQuery binds instead of href="javascript:function(args)"~~
	* "Compatibility Mode" for running in mega-old browsers? Not essential at all.
	* Define resource paths in meta for stuff like demo/img
	* Preload adjacent rooms, possibly even keep them in the DOM to avoid the "blink" between rooms
	* Function to preload all resources before starting the game.
