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
    //var editor = document.getElementById('overlay_svg_hotspot_editor');

    for (var hotspot_id in room.map){
        var hotspot = room.map[hotspot_id];
        if (hotspot.area.shape == 'rect') {
            var coords = hotspot.area.coords.split(',');
            var area = $(createSVGElementIn('rect', 'overlay_svg_hotspot_editor'))
                .attr('id', 'editor_' + hotspot_id)
                .attr('x', coords[0])
                .attr('y', coords[1])
                .attr('width', coords[2]-coords[0])
                .attr('height', coords[3]-coords[1]);
        }
    }
}



function createSVGElementIn(tag, parent_id) {
    var p = document.getElementById(parent_id);
    var e = document.createElementNS(p.namespaceURI, tag);
    p.appendChild(e);
    return e;

}








const DEBUG = true;
function debug(object) {
    if (DEBUG) console.log(object);
}
