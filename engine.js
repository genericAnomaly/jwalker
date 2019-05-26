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
        var pt = getLocalCoords(e, $('#overlay_svg'));
        grabbed.trigger('updatePosition', {'pt' : pt});
        debug(grabbed);
        if (typeof grabbed.setPos === 'function' ){
            debug('oooogity booooooogity!');
            grabbed.setPos(pt.x, pt.y);
        }
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
        if (hotspot.area.shape == 'rect') {
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





function getLocalCoords(e, svg) {
    //for mouse event `e`, return the localised coordinates of the mouse event within the SVG element
    //powered by some js magic I still don't understand discovered at https://stackoverflow.com/questions/12752519/svg-capturing-mouse-coordinates until this functionality becomes native

    //If we passed jQuery stuff instead of native, just yoink that.
    if (e.hasOwnProperty('originalEvent')) e = e.originalEvent;
    if (svg instanceof jQuery) svg = svg[0];

    //Get the tranformation matrix for screen coordinates to document coordinates by inverting the doc-to-screen matrix
    var transform = svg.getScreenCTM().inverse();

    var pt = svg.createSVGPoint();
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

class Hotspot {
    constructor(args) {
        this.initialArgs = args;

        //Declare and extract DisplayObject style vars from the args
        this.shape = args.area.shape;
        this.height = 0;
        this.width = 0;
        this.radius = 0;
        this.x = 0;
        this.y = 0;
        this.verts = [];

        //Set up the visible members
        this.gfx = {};
        this.gfx.root = $(svg('g'));
        if (this.shape == 'poly') this.shape = 'polygon';
        this.gfx.shape = $(svg(shape));


        //Turn the coords attribute into useable drawing data
        var coords = args.area.coords.split(',');
        if (this.shape == 'rect') {
            this.width = coords[2]-coords[0];
            this.height = coords[3]-coords[1];
            this.x = (coords[0]+coords[2])/2;
            this.y = (coords[1]+coords[3])/2;
        } else if (this.shape == 'circle') {
            this.x = coords[0];
            this.y = coords[1];
            this.radius = coords[2];
        } else if (this.shape == 'polygon') {
            for (var i=0; i+1<coords.length; i+=2) {
                this.verts.push({'x' : coords[i], 'y' : coords[i+1]});
            }
        }



        if (this.shape == 'rect') {
            this.setWidth(width);
            this.setHeight(height);
        }
        if (this.shape == 'circle') this.setRadius(radius);



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
                var vert [this.verts[i].x, this.verts[i].y].join(',')
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
