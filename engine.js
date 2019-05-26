var time;
var editorMode = true;

//Big Red Button
function start() {
    if (editorMode) startEditor();
    go(adventure.meta.start);
    window.requestAnimationFrame(onAnimationFrameHandler);
}



function startEditor() {
    for (var id in adventure.rooms) {
        var img = $('<img>')
            .attr('src', 'img/' + adventure.rooms[id].img)
            .attr('alt', id)
            .attr('id', 'thumbnail-'+id)
            .click({'go' : id}, clickHandler);
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
        grabbed.trigger('grabbed-drag', pt);//e);

    }). on('mouseup', function () {
        var grabbed = $('.grabbed');
        if (grabbed.length === 0) return;
        grabbed.removeClass('grabbed');
    });

}





//Click event functions
function go(id) {
    div = buildRoom(id);
    $('#room').empty().append(div);
}

function text(args) {
    var svg = document.getElementById('overlay_svg');
    var t = document.createElementNS(svg.namespaceURI, 'text');
    svg.appendChild(t);

    t = $(t)
        .html(args.string)
        .data('ttl', 5000)
        .attr('x', '1em')
        .attr('y', '1.5em');
    //TODO: functionality to read in attributes like args.class
}

//Event handlers
function clickHandler(e) {
    var click = e.data;
    if ('go' in click) {
        go(click.go);
    }
    if ('text' in click) {
        text(click.text);
    }
}
function onAnimationFrameHandler(ts) {
    //OH THE MEMORIIIIIIES
    if (!time) time = ts;
    var deltaTime = ts-time;
    time = ts;

    $('#overlay_svg').find('text').each(function (index, value) {
        var t = $(this);
        var ttl = t.data('ttl') - deltaTime;
        t.data('ttl', ttl);
        if (ttl < 1200) {
                t.css('opacity', ttl/1200);
        }
        if (ttl < 0) {
            t.remove();
        }
    });

    window.requestAnimationFrame(onAnimationFrameHandler);
}



function buildRoom(id) {
    var room = adventure.rooms[id];
    var img = $('<img>')
        .attr('src', 'img/'+room.img)
        .attr('usemap', '#'+id+'_map');
    var map = $('<map></map>')
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
            area.click(hotspot.click, clickHandler);
        }
        map.append(area);
    }

    if (editorMode) editorLoadRoom(room);

    var div = $('<div></div>')
        .append(img)
        .append(map);
    return div;
}






function editorLoadRoom(room) {
    //Clear the overlay
    $('#overlay_svg_hotspot_editor').empty();
    for (var hotspot_id in room.map){
        //Grab the hotspot
        var hotspot = room.map[hotspot_id];
        //Create a group for this hotspot and its handles and populate it
        var g = $(svg('g'))
            .attr('id', 'editor_hotspot_'+hotspot_id);
        var handles = $(svg('g'));
        var shape = $(svg('g'));
        g.appendChild(shape);
        g.appendChild(handles);
        //Split out the coordinates into an array
        var coords = hotspot.area.coords.split(',');

        //Case Switch (but it's ifs 'cos i don't care for case/switch syntax)
        if (hotspot.area.shape == 'rectUNCLE') { //See what I did there? all this code is technically still live and easy to read and grab from, but tucked out of the way because RECTUNCLE
            var x = ( parseFloat(coords[0]) + parseFloat(coords[2]) )  /2;
            var y = ( parseFloat(coords[1]) + parseFloat(coords[3]) )  /2;
            var width = coords[2]-coords[0];
            var height = coords[3]-coords[1];

            var area = $(svg('rect'));



            g.setPos = function(x, y) {
                return this
                    .attr('transform', 'translate(' + x +' '+ y + ')' )
                    .data('x', x)
                    .data('y', y);
            };


            area.setWidth = function(w) {
                return this.attr('width', w).attr('x', -w/2);
            };
            area.setHeight = function(h) {
                return this.attr('height', h).attr('y', -h/2);
            };


            g.setPos(x, y);
            area.setWidth(coords[2]-coords[0]);
            area.setHeight(coords[3]-coords[1]);


            var root = createHandle();
            root
                .on('updatePosition', {'g' : g}, function(e, args) {
                    e.data.g.setPos(args.pt.x, args.pt.y);
                })
                .on('mousedown', function() {
                    $(this).addClass('grabbed');
                })
            handles.appendChild(root);

            var west = createHandle();
            west.data('target', g)
            west.setPos(width/2, 0);

            handles.appendChild(west);
























        } else if (hotspot.area.shape == 'rect') {
            var h = new Hotspot(hotspot);
            h.get$()
                ;

            $('#overlay_svg_hotspot_editor').appendChild(h.get$());










        } else if (hotspot.area.shape == 'circle') {
            var area = $(svg('circle'))
                .attr('cx', coords[0])
                .attr('cy', coords[1])
                .attr('r', coords[2]);
            var radius = $().svg('rect')
                .attr('x', coords[0])
                .attr('y', coords[1]-coords[2])
                .attr('width', 8)
                .attr('height', 8)
                .addClass('editor-hotspot-handle')
                .on('mousedown', function() {
                    $(this).addClass('grabbed');
                })
                .on('updatePosition', {'for' : area}, function(e, args) {
                    //Reposition the handle (can be excised if other position stuff goes on in for)
                    $(this).attr('x', args.pt.x);
                    $(this).attr('y', args.pt.y);
                    var rad = Math.sqrt(Math.pow(e.data.for.attr('cx')-args.pt.x, 2)+Math.pow(e.data.for.attr('cy')-args.pt.y, 2));
                    e.data.for.attr('r', rad);

                });
                handles.appendChild(radius);
            var root = $().svg('rect')
                .attr('x', coords[0])
                .attr('y', coords[1])
                .attr('width', 8)
                .attr('height', 8)
                .addClass('editor-hotspot-handle')
                .addClass('handle-root')
                .on('mousedown', function() {
                    $(this).addClass('grabbed');
                })
                .on('updatePosition', {'for' : area}, function(e, args) {
                    //Reposition the handle (can be excised if other position stuff goes on in for)
                    $(this).attr('x', args.pt.x);
                    $(this).attr('y', args.pt.y);
                    e.data.for.attr('cx', args.pt.x);
                    e.data.for.attr('cy', args.pt.y);
                });
            handles.appendChild(root);

            //OK so bear w/ me here.
            //I think we just need to move the container, not the primitives.

        } else if (hotspot.area.shape == 'poly') {
            var area = $(svg('polygon'));
            var points = ''
            for (var i=0; i<coords.length; i+=2) {
                points += coords[i] + ',' + coords[i+1];
                if (i+2<coords.length) points += ' ';//add a space on all but the last pair
                var handle = $(svg('rect'))
                    .attr('x', coords[i])
                    .attr('y', coords[i+1])
                    .attr('width', 8)
                    .attr('height', 8)
                    .addClass('editor-hotspot-handle')
                    .on('updatePosition', {'i' : i, 'poly' : area}, function(e, args) {
                        //Reposition the handle
                        $(this).attr('x', args.pt.x);
                        $(this).attr('y', args.pt.y);
                        //Update <poly> element
                        var poly = e.data.poly;
                        var points = poly.attr('points');
                        points = points.split(' ');
                        points[e.data.i/2] = Math.floor(args.pt.x) + ',' + Math.floor(args.pt.y);
                        points = points.join(' ');
                        poly.attr('points', points);
                        //TODO: trigger the <poly> to update the underlying <shape>
                        //IDEA: It might make more sense for the underlying <poly> to handle this update using a bubbled-up updatePosition trigger and an array of its handles tucked into its data? BIG SHRUG? Actually yeah I think it would. Handle just worries about updating it's position (and if there's a constraint on it?) then bubbles up the event to updateGraphics. Yeah, that's what's happening here. Test it with the circle resizer, if it goes off we'll do it here. AHHAHAHHAHA! SCIENCE!
                        //COMMENT: That might make sense here but it's a tad wonky. Maybe have a "onVertexChange" for <poly>s and trigger that on vert move?
                    })
                    .on('mousedown', function() {
                        $(this).addClass('grabbed');
                    });
                handles.appendChild(handle);
            }
            area.attr('points', points);
        }
        if (area==null) continue; //break out the loop in case of malformed hotspot
        //Common properties on the hotspot
        area.attr('id', 'editor_' + hotspot_id)
            .data('id', hotspot_id)
            .addClass('editor-hotspot')
            .addClass('editor-'+hotspot.area.class);
        shape.appendChild(area);
        //Add it to the overlay
        $('#overlay_svg_hotspot_editor').appendChild(g);
    }


}


function svg(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
}

function createSVGElementIn(tag, parent_id) {
    var p = document.getElementById(parent_id);
    var e = document.createElementNS(p.namespaceURI, tag);
    p.appendChild(e);
    return e;
}





function getLocalCoords(e, context) {
    //for mouse event `e`, return the localised coordinates of the mouse event within the SVG element
    //powered by some js magic I still don't understand discovered at https://stackoverflow.com/questions/12752519/svg-capturing-mouse-coordinates until this functionality becomes native

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



$.fn.svg = function (tag) {
    return $(document.createElementNS('http://www.w3.org/2000/svg', tag));
}
$.fn.appendChild = function(child) {
    child = $(child);
    this[0].appendChild(child[0])
    return this;
}




function createHandle() {
    var g = $().svg('g');
    var rect = $().svg('rect')
        .attr('width', 8)
        .attr('height', 8)
        .addClass('editor-hotspot-handle')
    g.appendChild(rect);
    g.data('constrain-axis', 'none');
    g.constrain = function (axis) {
        return this.data('constrain-axis', axis);
    }
    g.setPos = function(x, y) {
        debug('setpos(' + x + ', ' + y + ')');
        if (this.data('constrain')=='x') x='0';
        if (this.data('constrain')=='y') y='0';
        this.attr('transform', 'translate(' + x + ' ' + y + ')');
        debug('translate(' + x + ' ' + y + ')');
    }
    g.on('mousedown', function() {
        $(this).addClass('grabbed');
    });
    return g;
}



class DisplayElement {
    constructor(args) {
        //stash this for some reason i guess? TODO: remove me later if this never ends up getting used
        this.initialArgs = args;
        //Declare state variables
        this.x = 0;
        this.y = 0;
        this.children = [];
        this.parent = null;

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


    getLocalCoords(screenX, screenY) {
        //for mouse event `e`, return the localised coordinates of the mouse event within the SVG element
        //powered by some js magic I still don't understand discovered at https://stackoverflow.com/questions/12752519/svg-capturing-mouse-coordinates until this functionality becomes native

        debug(this.parent);
        var context = this.parent.gfx.root[0]; //this.parent should be populated in the current flow but might need greater assurance it'll be populated

        //Get the tranformation matrix for screen coordinates to document coordinates by inverting the doc-to-screen matrix
        var transform = context.getScreenCTM().inverse();

        var pt = context.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(transform);
        //NB: This appears to generate a significant bug in Mozilla Firefox when the main div is absolutely positioned and transformed. Commenting out that styling for now.
    }



    //Let's, just, maybe put "recreate actionscript" on the back burner, k?
    /*
    addChild(c) {
        c.parent = this;
        this.children.push(c);
        this.gfx.root.appendChild(c.gfx.root)
    }
    */

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
            //debug('handle got dragged');
            //debug(args);
            //"eff it, we'll DO IT LIVE" --noted shouting enthusiast BILLIOUS RILEY
            var controller = $(this).data('controller');
            controller.setHandlePos(args);
        });

    }
    constrain(axis) {
        this.constrainAxis = axis;
        this.gfx.shape.addClass('handle-constrain-' + axis);
    }
    makeRoot() {
        this.isRootHandle = true;
        //TODO; add classes here
    }
    makeScaleXHandle(complement) {
        this.isScaleXHandle = true;
        //define other handles to mirror motion to?
    }
    makeScaleYHandle(complement) {
        this.isScaleYHandle = true;
    }
    makeVertexHandle(i) {
        this.isVertexHandle = true;
        this.vertexIndex = i;
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
            }
        }

    }

}


class Hotspot {
    constructor(args) {
        this.initialArgs = args;

        //Declare DisplayObject style vars
        this.shape = args.area.shape;
        this.height = 0;
        this.width = 0;
        this.radius = 0;
        this.x = 0;
        this.y = 0;
        this.verts = [];

        //A little on-the-fly keyword translation to keep me from going insane
        if (this.shape == 'poly') this.shape = 'polygon';

        //Set up the visible members
        this.gfx = {};
        this.gfx.root = $(svg('g'));
        this.gfx.shape = $(svg(this.shape))
            .addClass('editor-hotspot-area');
        this.gfx.handles = $(svg('g'));

        //Stick them together into a display tree
        //this.gfx.root.data('controller', this); //Is this necessary? I'ma leave it out unless I need it.
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





        //TODO: build the handles
        var h = {};
        //NB: do we need to remember all of these? friendlier var names? idk.

        if (this.shape !== 'polygon') {
            h.r = new Handle();
            h.r.makeRoot();
            h.r.gfx.root.addClass('handle-root');
            this.gfx.handles.appendChild(h.r.get$());
        }
        if (this.shape == 'rect') {
            h.e = new Handle();
            h.e.setPos(width/2, 0);
            h.e.makeScaleXHandle();
            this.gfx.handles.appendChild(h.e.get$());

            h.n = new Handle();
            h.n.setPos(0, height/2)
            h.n.makeScaleYHandle();
            this.gfx.handles.appendChild(h.n.get$());
        }
        if (this.shape == 'circle') {
            h.rad = new Handle();
            h.rad.setPos(0, this.radius)
            h.rad.makeRadiusHandle();
            this.gfx.handles.appendChild(h.rad.get$());
        }
        if (this.shape == 'polygon') {
            for (var i=0; i<this.verts.length; i++) {
                var v = new Handle();
                v.setPos(this.verts[i].x, this.verts[i].y);
                v.makeVertexHandle(i);
                this.gfx.handles.appendChild(v.get$());
                h.v[i] = v;
            }
        }

        //h.w = new Handle();
        //h.w.setPos(-width/2, 0);
        //h.w.constrain('y');
        //this.gfx.handles.appendChild(h.w.get$());

        for(var key in h) {
            h[key].parent = this;
        }



    }

    get$() {
        return this.gfx.root;
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
    setPos(x, y) {
        this.x = x;
        this.y = y;
        var translate = [x, y].join(' ');
        this.gfx.root.attr('transform', 'translate('+translate+')');
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
            coords.join(',');
        }
        return {'shape' : shape, 'coords' : coords};
    }

}





const DEBUG = true;
function debug(object) {
    if (DEBUG) console.log(object);
}
