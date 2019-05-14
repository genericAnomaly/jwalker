* Features
	* a dedicated back button that sends you back to the previous place you were, since it turns out it's hard to find pictures with at least one entrance and exit in-photo
	* ltfish wanted the ability to have text in some way come up as a pop-up when you click on objects, not sure what he precisely envisioned for that. i'll ask him to make a mock-up
	* customizable pointers
	* block the tab function maybe?? it's been a godsend for testing my hitbox shapes but for the player, this is a game about exploring, maybe i want them to go "ohhh i could click the window the whole time?"
	* anything more complex than the lamp trick i pulled is gonna require actual variables
	* development tools
	* option to override back button option to provide an ovedrride transition
* Sounds
	* clean looping
	* ability to play multiple tracks (ie, music and bird sfx) at the same time
	* can change music when you enter a new room or keep it running without starting over
	* one-shot sfx when you click on something? like, imagining a dull thud when you touch the Orb in the den
	* clicking sfx every time you click on something
	* sounds that trigger the first time you enter the room but not ever again (thinking here, voiceover work?)
* Coding practices
	* Use jQuery binds instead of href="javascript:function(args)"
	* "Compatibility Mode" for running in mega-old browsers? Not essential at all.
	* Define resource paths in meta for stuff like demo/img
	* Preload adjacent rooms, possibly even keep them in the DOM to avoid the "blink" between rooms
