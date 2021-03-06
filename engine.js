var editorMode = false;
const DEBUG = true;

//Big Red Button
function start() {
    //If the editor is requested, activate the editor
    if(window.location.hash == '#editor') startEditor();

    //Invoke the Core Jinn
    InteractionJinn.invoke();
    AnimationJinn.invoke();

    //Invoke lesser Jinn
    OverlayJinn.invoke();
    AudioJinn.invoke();
    RoomJinn.invoke();
    LogicJinn.invoke();

    //Go to the first room of the Adventure
    InteractionJinn.clickHandler( {'data' : {'go' : adventure.meta.start} } );
}







//Core Jinn

class InteractionJinn {
    //Core Jinn: Core Jinn are invoked before peripheral Jinn. Generally, they should not directly act on a peripheral Jinn; rather, peripheral Jinn register their methods with core Jinn when they're first invoked
    //The primary function of this Jinn is to handle user input/interactions, and dispatch it to the correct Jinn

    static invoke() {
        InteractionJinn.clickHandlers = {};
    }

    static register(key, func) {
        //Register a click function w/ the Interaction Jinn
        //key is the key which will define the click event (i.e. go, text, sfx)
        //func is the function the value at the key will be passed to.
        InteractionJinn.clickHandlers[key] = func;
    }

    static clickHandler(e) {
        var click = e.data;
        for (var key in click) {
            if (key in InteractionJinn.clickHandlers) {
                InteractionJinn.clickHandlers[key](click[key]);
            }
        }
    }

    /*
    static actionGo(id) {
        AudioJinn.playTracks(adventure.rooms[id].tracks);
        var div = buildRoom(id);
        $('#room').empty().append(div);
        if (editorMode) editorLoadRoom(id);//adventure.rooms[id]);
    } */

}

class AnimationJinn {
    //The AnimationJinn presides over AnimationFrame events.
    //Other pieces of the engine may register their own step functions with this Jinn

    static invoke() {
        AnimationJinn.time = 0;
        AnimationJinn.registeredFunctions = [];
        window.requestAnimationFrame(AnimationJinn.animationFrameHandler);
    }

    static register(func) {
        //Register a step function w/ the Animation Jinn.
        //Step functions *must* accept a deltaTime parameter.
        //This will likely go through several revisions to accommodate growing experience w/ this kinda junk
        AnimationJinn.registeredFunctions.push(func);
    }

    static animationFrameHandler(ts) { //time prime. primetime.
        var deltaTime = ts-AnimationJinn.time;
        AnimationJinn.time = ts;

        for (const func of AnimationJinn.registeredFunctions) {
            func(deltaTime);
        }

        window.requestAnimationFrame(AnimationJinn.animationFrameHandler);
    }

}

//Peripheral Jinn

class OverlayJinn {
    //Lesser Jinn resposible for handling the click.text property
    //Will likely evolve into a more full-featured "overlay" Jinn as more overlay-related functionality is needed

    static invoke() {
        InteractionJinn.register('text',  OverlayJinn.text);
        AnimationJinn.register(OverlayJinn.step);
    }


    static step(dt) {
        $('#overlay_svg').find('text').each(function (index, value) {
            var t = $(this);
            var ttl = t.data('ttl') - dt;
            t.data('ttl', ttl);
            if (ttl < 1200) {
                    t.css('opacity', ttl/1200);
            }
            if (ttl < 0) {
                t.remove();
            }
        });
    }

    static text(args) {
        var svg = document.getElementById('overlay_svg');
        var t = document.createElementNS(svg.namespaceURI, 'text');
        svg.appendChild(t);

        var classAttr = '';
        if ('class' in args) {
            classAttr = args.class;
        }

        t = $(t)
            .html(args.string)
            .data('ttl', 5000)
            .attr('x', '1em')
            .attr('y', '1.5em')
            .attr('class', classAttr);
    }

}

class AudioJinn {

    static invoke () {
        AudioJinn.sfx = {};
        AudioJinn.tracks = {};

        AudioJinn.loadSFX(adventure.sfx);
        AudioJinn.loadTracks(adventure.tracks);

        InteractionJinn.register('sfx',   AudioJinn.playSFX);
    }

    static loadSFX (sfx) {
        for (var key in sfx) {
            AudioJinn.sfx[key] = sfx[key];
            var a = new Audio();
            a.src = 'sfx/' + sfx[key].src;
            AudioJinn.sfx[key].audio = a;
            //TODO: load-safety, make the AudioJinn aware of whether or not resources are loaded
        }
    }

    static loadTracks (tracks) {
        for (var key in tracks) {
            AudioJinn.tracks[key] = tracks[key];
            var a = new Audio();
            a.src = 'tracks/' + tracks[key].src;
            a.loop = true;
            AudioJinn.tracks[key].audio = a;
        }
    }


    static playSFX (sfx) {
        if (('key' in sfx) == false) return;
        var key = sfx.key;

        var volume = 1.0;
        if ('volume' in sfx) {
             volume = sfx.volume;
        }

        if (key in AudioJinn.sfx) {
            AudioJinn.sfx[key].audio.volume = volume;
            AudioJinn.sfx[key].audio.play();
        }
    }

    static playTracks (tracks) {
        if (tracks == undefined) tracks = {};
        for (var key in AudioJinn.tracks) {
            if (key in tracks) {
                AudioJinn.tracks[key].audio.play();
                AudioJinn.tracks[key].audio.volume = tracks[key]; //TODO: targetVolume and easing
                AudioJinn.tracks[key].audio.loop = true;
            } else {
                AudioJinn.tracks[key].audio.volume = 0; //Don't pause it, but we should have a catcher for when a loop ends to pause it if volume is 0
                AudioJinn.tracks[key].audio.loop = false; //Or maybe just this; just disable looping when a track becomes inaudible
            }
        }
    }

}

class RoomJinn {

    static invoke() {
        InteractionJinn.register('go', RoomJinn.go);
    }

    static go(id) {
        AudioJinn.playTracks(adventure.rooms[id].tracks);
        var div = RoomJinn.buildRoom(id);
        $('#room').empty().append(div);
        if (editorMode) editorLoadRoom(id); //TODO: incorporate editor junk into its own Jinn
    }


    //NB: this helper function includes spaghetti references to window.adventure
    static buildRoom(id) {
        var room = adventure.rooms[id];
        var img = $('<img>')
            .attr('src', 'img/'+room.img)
            .attr('usemap', '#'+id+'_map');
        var map = $('<map/>')
            .attr('name', id+'_map');
        for (var hotspot_id in room.map){
            var hotspot = room.map[hotspot_id];
            var area = $('<area>')
                .attr('id', id+'_'+hotspot_id)
                .attr('shape', hotspot.area.shape)
                .attr('coords', hotspot.area.coords)
                .attr('class', hotspot.area.class)
                .attr('tabindex', -1);
            if ('click' in hotspot) {
                area.click(hotspot.click, InteractionJinn.clickHandler);
            }
            map.append(area);
        }
        var div = $('<div/>')
            .append(img)
            .append(map);
        return div;
    }

}

class IOJinn {
    //The IOJinn handles saving and loading Adventures and (eventually) adventure states

    static getJSON() {
        //stringify the adventure into JSON and return it.
        //Get and Load JSON are the only direct references to global `adventure` in the IOJinn
        return JSON.stringify(adventure, null, 4);
    }

    static loadJSON(json) {
        //TODO: This function contains global references that will likely need cleanup during further despaghettification
        //Parse a JSON string and load the adventure stored within
        //Precondition: json is a string in JSON format representing an adventure
        //Get and Load JSON are the only direct references to global `adventure` in the IOJinn
        try {
            var obj = JSON.parse(this.result);
            adventure = obj;
            start();
        } catch (error) {
            debug(error);
        }
    }

    static offerDirectDownload() {
        var json = IOJinn.getJSON();
        var data = new Blob([json], {type : 'application/json'});
        if (typeof IOJinn.exportURI !== 'undefined') {
            window.URL.revokeObjectURL(IOJinn.exportURI);
        }
        IOJinn.exportURI = window.URL.createObjectURL(data);
        var link = $('<a/>')
            .attr('href', IOJinn.exportURI)
            .attr('target', '_blank')
            .attr('download', adventure.meta.name + '-' + Date.now() + '.json' );

        $(document.body).append(link);
        link[0].click();
        //BUG
        //For reasons I cannot get to the bottom of, this blanks the Mozilla inspector, presumably because it becomes disassociated from the window by "following" the href
        //The demo here (https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download) does not
        //But even directly copying over the example (with adjusted paths) with no jquery interference gives the buggy result
        //As this is an editor feature likely to be superceded and it still technically works, I'm not gonna chase this down right now
        link.remove();
    }

    static enableDragAndDropLoading() {
         //Based on https://www.html5rocks.com/en/tutorials/file/dndfiles/
        var dropZone = document;
        dropZone.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }, false);
        dropZone.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if(!e.dataTransfer.files) return;
            var file = e.dataTransfer.files[0]
            var reader = new FileReader();
            reader.onload = function(e) {
                IOJinn.loadJSON(this.result);
            }
            reader.readAsText(file);
        }, false);
    }


}

class LogicJinn {
    //The LogicJinn handles the flow of conditions and loops described in the adventure
    //It provides the click.sequence and click.variable property

    static invoke() {
        InteractionJinn.register('sequence', LogicJinn.sequence);
        InteractionJinn.register('set', LogicJinn.set);
        InteractionJinn.register('condition', LogicJinn.condition);
    }

    static sequence(args) {
        //if the index counter hasn't been initialised yet, initialise it.
        if (('i' in args) == false) args.i = 0;

        if (args.i < args.actions.length) {
            var action = args.actions[args.i];
            args.i ++;  //it is so wild to me that this works
            //Forward the selected click to the InteractionJinn
            InteractionJinn.clickHandler( {'data' : action} );
        }
        if (args.i >= args.actions.length && 'repeat' in args) {
            if (args.repeat == "forever") args.i = 0;
            if (args.repeat == "last") args.i = args.actions.length-1;
        }

    }

    static set(args) {
        var result = LogicJinn.evaluateExpression(args.value);
        debug(result);
        adventure.variables[args.variable] = result;
    }

    static condition(args) {
        //Perform conditional logic
        var satisfied = LogicJinn.evaluateExpression(args.if);
        if (satisfied) {
            var action = args.then;
        } else {
            var action = args.else;
        }
        InteractionJinn.clickHandler( {'data' : action} );
    }




    static evaluateExpression(expression) {

        //If the expression is already a primitive, skip this and just return it
        if (typeof expression !== 'string') return expression;

        //Inject referenced values from adventure variable table
        var pattern = /\$(\w+)/g;   //Pattern to find words prefixed by $
        expression = expression.replace(pattern, function (match, varname) {
            if (varname in adventure.variables) return adventure.variables[varname];
            warn('Attempting to evaluate undeclared variable ' + match + '; using 0', args);
            return 0;
        });

        //TODO: This should validate and parse out the math with regex and recursion.
        //For now, we're gonna use eval; rationale: there is not yet a use case where the json provider couldn't already tamper with the js.
        return eval(expression);
    }

}


//Editor stuff pending being incorporated into a class

function startEditor() {
    editorMode = true;

    //Show editor panels (TODO: replace this with a function to build them from scratch maybe)
    $('#editor-roomlist').show();
    $('#editor-properties').show();
    $('#button-export').show();
    $('#drop-zone').show();

    $('#roomlist-panel').empty();
    for (var id in adventure.rooms) {
        var img = $('<img>')
            .attr('src', 'img/' + adventure.rooms[id].img)
            .attr('alt', id)
            .attr('id', 'thumbnail-'+id)
            .click({'go' : id}, InteractionJinn.clickHandler);
        var span = $('<span></span>').html(id);
        var li = $('<li></li>')
            .append(img)
            .append(span);
        $('#roomlist-panel').append(li);
    }

    //Create a document level listener for mouse movement to handle point-handle movement.
    $(document).on('mousemove', function(e) {
        var grabbed = $('.grabbed');
        if (grabbed.length === 0) return;
        //If a handle is currently grabbed, trigger our custom grabbed-drag event, and pre-digest it to local coordinates
        var pt = getLocalCoords(e, $('#overlay_svg'));
        grabbed.trigger('grabbed-drag', pt);

    }).on('mouseup', function () {
        var grabbed = $('.grabbed');
        if (grabbed.length === 0) return;
        grabbed.trigger('grabbed-drag-end');
        grabbed.removeClass('grabbed');
    }).on('keydown', function (e) {
        //debug(e);
        if (e.key == 'Shift') {
            $('#overlay_svg_hotspot_editor').addClass('passthru');
        }
    }).on('keyup', function (e) {
        if (e.key == 'Shift') {
            $('#overlay_svg_hotspot_editor').removeClass('passthru');
        }
    });

    $('#button-export').on('click', function() {
        //exportAdventure();
        IOJinn.offerDirectDownload();
    })
    IOJinn.enableDragAndDropLoading();

}

function editorLoadRoom(id) {

    var room = adventure.rooms[id];

    //Clear the overlay
    $('#overlay_svg_hotspot_editor').empty();
    //$('#editor-properties').empty();


    //$('#editor-properties').empty();
    $('#editor-properties').html(`
        <br>
        ID: <strong>foyer</strong><button>[change]</button><br>
        Image: <input value="foyer.png">
        <br><br>
        n edges out<br>
        n edges in<br>
        <br>
        <strong>Hotspots</strong>
        `);
    $('#editor-properties').find('input')
        .data('room-id', id)
        .on('change', function() {
            var id = $(this).data('room-id')
            adventure.rooms[id].img = $(this).val();
            $('#room').find('img').attr('src', 'img/'+ $(this).val());
            $('#thumbnail-'+id).attr('src', 'img/'+ $(this).val());
        })

    //Load in hotspots
    for (var hotspot_id in room.map){
        //Make the DisplayElement Hotspot
        var hotspot = new Hotspot(room.map[hotspot_id], hotspot_id, id);
        $('#overlay_svg_hotspot_editor').appendChild(hotspot.get$());

        //Make properties for it
        var properties = new HotspotProperties(hotspot_id, id);
        $('#editor-properties').append(properties.$);

    }


}


//Window level helper functions

function svg(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
}

function getLocalCoords(e, context) {
    //for mouse event `e`, return the localised coordinates of the mouse event within the SVG element
    //I understand this mostly now, but a thorough explanation is at https://stackoverflow.com/questions/12752519/svg-capturing-mouse-coordinates

    //If we passed jQuery stuff instead of native, just yoink that.
    if (e.hasOwnProperty('originalEvent')) e = e.originalEvent;
    if (context instanceof jQuery) context = context[0];

    //Get the tranformation matrix for screen coordinates to document coordinates by inverting the doc-to-screen matrix
    var transform = context.getScreenCTM().inverse();

    var pt = context.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(transform);
    //NB: This appears to generate a significant bug in Mozilla Firefox when the main div is absolutely positioned and transformed. Commenting out that styling for now.
}


//JQuery extender functions

$.fn.appendChild = function(child) {
    child = $(child);
    this[0].appendChild(child[0])
    return this;
}




class DisplayElement {
    constructor(args) {
        //stash this for some reason i guess? TODO: remove me later if this never ends up getting used
        this.initialArgs = args;
        //Declare state variables
        this.x = 0;
        this.y = 0;

        //Build an empty boy
        this.gfx = {};  //Hey! NB! this.gfx is not hierarchical! it might look like that since it has a root in it but it's not! maybe it should be? MAYBE? like, this.gfx.root.children[i]
        this.gfx.root = $(svg('g'));

        //Make this object reachable from a fresh selector
        this.gfx.root.data('controller', this);
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
        var translate = [x, y].join(' ');
        this.gfx.root.attr('transform', 'translate('+translate+')');
    }
    get$() {
        return this.gfx.root;
    }


}
class Handle extends DisplayElement {
    constructor(args) {
        super(args)

        this.constrainAxis = null;
        this.isRootHandle = false;

        //Draw self
        this.gfx.root
            .addClass('editor-handle');
        this.gfx.shape = $(svg('rect'))
            .attr('width', 8)
            .attr('height', 8);

        //Stick them together into a display tree
        this.gfx.root.appendChild(this.gfx.shape);

        //Make draggable
        this.gfx.root.on('mousedown', function() {
            $(this).addClass('grabbed');
        }).on('grabbed-drag', function (e, args) {
            //"eff it, we'll DO IT LIVE" --noted shouting enthusiast BILLIOUS RILEY
            var controller = $(this).data('controller');
            controller.setHandlePos(args);
        }).on('grabbed-drag-end', function() {
            var controller = $(this).data('controller');
            controller.parent.syncToAdventure();
        });

    }

    makeRoot() {
        this.isRootHandle = true;
        this.gfx.root.addClass('handle-root');
    }
    makeScaleXHandle(complement) {
        this.isScaleXHandle = true;
        this.gfx.root.addClass('handle-resize-ew');
        //TODO: If we add complementary handles (such as east/west) or composite (such as northest), we should define which complementary/subordinate handles here
    }
    makeScaleYHandle(complement) {
        this.isScaleYHandle = true;
        this.gfx.root.addClass('handle-resize-ns');
    }
    makeVertexHandle(i) {
        this.isVertexHandle = true;
        this.vertexIndex = i;
    }
    makeRadiusHandle() {
        this.isRadiusHandle = true;
        this.gfx.root.addClass('handle-radius');
        this.gfx.shape.attr('rx', 4);
    }

    setHandlePos(pt) {
        //logic-handling for changing the position of a handle.
        //accepts position relative to root SVG
        if (this.isRootHandle) {
            this.parent.setPos(pt.x, pt.y);
        } else {
            var x = parseFloat(pt.x)-parseFloat(this.parent.x);
            var y = parseFloat(pt.y)-parseFloat(this.parent.y);
            if (this.isScaleXHandle) {
                this.setPos(x, 0);
                this.parent.setWidth(Math.abs(x*2));
            } else if (this.isScaleYHandle) {
                this.setPos(0, y);
                this.parent.setHeight(Math.abs(y*2));
            } else if (this.isRadiusHandle) {
                var r = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
                this.parent.setRadius(r);
                this.setPos(x, y);
            } else if (this.isVertexHandle) {
                this.setPos(x, y);
                this.parent.setVertPos(this.vertexIndex, x, y);
            } else {
                this.setPos(x, y);
            }
        }
        //this.parent.syncToAdventure();
    }

}
class Hotspot extends DisplayElement {
    constructor(args, hotspot_id, room_id) {
        super(args)

        //remember how to callback to the adventure object
        this.hotspot_id = hotspot_id;
        this.room_id = room_id;

        //Declare DisplayObject style vars
        this.shape = args.area.shape;
        this.height = 0;
        this.width = 0;
        this.radius = 0;
        this.verts = [];

        //A little on-the-fly keyword translation to keep me from going insane
        if (this.shape == 'poly') this.shape = 'polygon';

        //Set up the visible members
        this.gfx.shape = $(svg(this.shape))
            .addClass('editor-hotspot-area');
        this.gfx.handles = $(svg('g'));

        //Stick them together into a display tree
        this.gfx.root.appendChild(this.gfx.shape);
        this.gfx.root.appendChild(this.gfx.handles);

        //Turn the coords attribute into useable drawing data
        var coords = args.area.coords.split(',');
        if (this.shape == 'rect') {
            var width = coords[2]-coords[0];
            var height = coords[3]-coords[1];
            var x = ( parseFloat(coords[0]) + parseFloat(coords[2]) ) /2;
            var y = ( parseFloat(coords[1]) + parseFloat(coords[3]) ) /2;
            this.setWidth(width);
            this.setHeight(height);
            this.setPos(x, y);
        } else if (this.shape == 'circle') {
            var x = coords[0];
            var y = coords[1];
            var radius = coords[2];
            this.setRadius(radius);
            this.setPos(x, y);
        } else if (this.shape == 'polygon') {
            for (var i=0; i+1<coords.length; i+=2) {
                this.verts.push({'x' : coords[i], 'y' : coords[i+1]});
            }
            this.rebuildPolygon();
        }

        this.buildHandles();

    }

    buildHandles () {
        var handles = [];
        var h;
        if (this.shape !== 'polygon') {
            h = new Handle();
            h.makeRoot();
            handles.push(h);
        }
        if (this.shape == 'rect') {
            h = new Handle();
            h.setPos(this.width/2, 0);
            h.makeScaleXHandle();
            handles.push(h);
            h = new Handle();
            h.setPos(0, this.height/2)
            h.makeScaleYHandle();
            handles.push(h);
        }
        if (this.shape == 'circle') {
            h = new Handle();
            h.setPos(0, this.radius)
            h.makeRadiusHandle();
            handles.push(h);
        }
        if (this.shape == 'polygon') {
            for (var i=0; i<this.verts.length; i++) {
                h = new Handle();
                h.setPos(this.verts[i].x, this.verts[i].y);
                h.makeVertexHandle(i);
                handles.push(h);
            }
        }
        for(var i=0; i<handles.length; i++) {
            var handle = handles[i];
            handle.parent = this;
            this.gfx.handles.appendChild(handle.get$());
        }
    }

    setWidth(w) {
        this.width = w;
        if (this.shape == 'rect') {
            this.gfx.shape.attr('width', w).attr('x', -w/2);
        } else if (this.shape == 'circle') {
            setRadius(w/2);
        }
    }
    setHeight(h) {
        this.height = h;
        if (this.shape == 'rect') {
            this.gfx.shape.attr('height', h).attr('y', -h/2);
        } else if (this.shape == 'circle') {
            setRadius(h/2);
        }
    }
    setRadius(r) {
        this.radius = r;
        this.gfx.shape.attr('r', r);
    }
    setVertPos(i, x, y) {
        var pt = {'x' : x, 'y' : y};
        this.verts[i] = pt;
        this.rebuildPolygon();

    }
    rebuildPolygon() {
        var points = [];
        for (var i=0; i<this.verts.length; i++) {
            points.push( [ this.verts[i].x, this.verts[i].y ].join(',') );
        }
        points = points.join(' ');
        this.gfx.shape.attr('points', points);
    }


    toMapArea() {
        var shape = this.shape;
        if (shape == 'polygon') shape = 'poly';
        var coords = '';
        if (this.shape == 'rect') {
            coords = [this.x-this.width/2, this.y-this.height/2, this.x+this.width/2, this.y+this.height/2].join(',');
        } else if (this.shape == 'circle') {
            coords = [this.x, this.y, this.radius].join(',');
        } else if (this.shape == 'polygon') {
            coords = [];
            for (var i=0; i<this.verts.length; i++) {
                var vert = [this.verts[i].x, this.verts[i].y].join(',');
                coords.push(vert);
            }
            coords = coords.join(',');
        }
        return {'shape' : shape, 'coords' : coords};
    }

    syncToAdventure() {
        var area = this.toMapArea();
        adventure.rooms[this.room_id].map[this.hotspot_id].area.shape = area.shape;
        adventure.rooms[this.room_id].map[this.hotspot_id].area.coords = area.coords;
    }
}

class HotspotProperties {

    constructor (id, room_id) {
        this.room_id = room_id;
        this.hotspot_id = id;

        var room = adventure.rooms[room_id];
        var hotspot = room.map[id];

        this.$ = $('<div/>');
        //okay. let's just do this the sloppy way for now.
        this.$
            .append($('<hr/>'))
            .append($('<span/>').html('ID: '))
            .append($('<span/>').html(id).attr('id', 'label-' + id))
            .append($('<button/>').html('[change]'))

        this.table = $('<table/>');
        this.$.append(this.table);
        //too late.
        this.addProperty('cursor', hotspot.area.class, function() {
            var room_id = $(this).data('room-id');
            var hotspot_id = $(this).data('hotspot-id');
            adventure.rooms[room_id].map[hotspot_id].area.class = $(this).val();
        } )
        this.addProperty('click.go', hotspot.click.go, function() {
            var room_id = $(this).data('room-id');
            var hotspot_id = $(this).data('hotspot-id');
            adventure.rooms[room_id].map[hotspot_id].click.go = $(this).val();
        } )

        if (hotspot.click.text){
            this.addProperty('click.text', hotspot.click.text.string, function() {
                var room_id = $(this).data('room-id');
                var hotspot_id = $(this).data('hotspot-id');
                adventure.rooms[room_id].map[hotspot_id].click.text.string = $(this).val();
            } )
        }
        //TODO: the ability to dynamically add properties.
    }

    addProperty(name, value, callback) {
        var row = $('<tr/>');
        var label = $('<td/>').html(name);
        var inputCell = $('<td/>')
        var input = $('<input/>');
        input.data('room-id', this.room_id)
        input.data('hotspot-id', this.hotspot_id)
        input.val(value);
        input.on('change', callback)
        row.append(label).append(inputCell.append(input));
        this.table.append(row);
    }

}












function warn(string, object) {
    //Editor mode function (destined for eventual editor jinn) used to warn the Adventure Author of non-fatal issues that appear to originate within the Adventure object
    //Will output a console warning ONLY if debug mode is enabled
    if (DEBUG) {
        if (object !== undefined) {
            console.warn(string, object);
        } else {
            console.warn(string);
        }
    }
}

function debug(object) {
    if (DEBUG) console.log(object);
}
