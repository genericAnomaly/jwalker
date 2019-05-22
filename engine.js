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
        g[0].appendChild(shape[0]);
        g[0].appendChild(handles[0]);
        //Split out the coordinates into an array
        var coords = hotspot.area.coords.split(',');
        //Case Switch (but it's ifs 'cos i don't care for case/switch syntax)
        if (hotspot.area.shape == 'rect') {
            var area = $(svg('rect'))
                .attr('x', coords[0])
                .attr('y', coords[1])
                .attr('width', coords[2]-coords[0])
                .attr('height', coords[3]-coords[1]);
        } else if (hotspot.area.shape == 'circle') {
            var area = $(svg('circle'))
                .attr('cx', coords[0])
                .attr('cy', coords[1])
                .attr('r', coords[2]);
        } else if (hotspot.area.shape == 'poly') {
            var area = $(svg('polygon'));
            var points = ''
            for (var i=0; i<coords.length; i+=2) {
                points += coords[i] + ',' + coords[i+1] + ' ';
                var handle = $(svg('rect'))
                    .attr('x', coords[i])
                    .attr('y', coords[i+1])
                    .attr('width', 8)
                    .attr('height', 8)
                    .data('points-index', i/2)
                    .addClass('editor-hotspot-handle')
                    .on('updatePosition', {'i' : i, 'obj' : area}, function(e, args) {
                        $(this).attr('x', args.pt.x);
                        $(this).attr('y', args.pt.y);
                    })
                    .on('mousedown', function() {
                        $(this).addClass('grabbed');
                    });
                handles[0].appendChild(handle[0]);
            }
            area.attr('points', points);
        }
        if (area==null) continue; //break out the loop in case of malformed hotspot
        //Common properties on the hotspot
        area.attr('id', 'editor_' + hotspot_id)
            .data('id', hotspot_id)
            .addClass('editor-hotspot')
            .addClass('editor-'+hotspot.area.class);
        shape[0].appendChild(area[0]);
        //Add it to the overlay
        $('#overlay_svg_hotspot_editor')[0].appendChild(g[0]);
    }

    //Create a document level listener for mouse movement to handle point-handle movement.
    //TODO: move this to an editor init function or something; it only ever needs to be called once, not per-room
    $(document).on('mousemove', function(e) {
        var grabbed = $('.grabbed');
        if (grabbed.length === 0) return;
        var pt = getLocalCoords(e, $('#overlay_svg'));
        grabbed.trigger('updatePosition', {'pt' : pt});
    }). on('mouseup', function () {
        var grabbed = $('.grabbed');
        if (grabbed.length === 0) return;
        grabbed.removeClass('grabbed');
    });
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





/*
Probably don't need this...
function getDOMObject(mixed) {
    //Helper function since jQuery doesn't like working in the svg namespace
    //mixed may be a DOM Object, a JQuery Object, or a string matching an ID
    var obj = null;
    if (mixed instanceof jQuery) {
        obj = mixed[0];
    } else if (mixed instanceof HTMLElement) {
        obj = mixed;
    } else if (typeof mixed == "string") {
        obj = document.getElementById(mixed);
    }
    return obj;
}
*/

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



const DEBUG = true;
function debug(object) {
    if (DEBUG) console.log(object);
}
