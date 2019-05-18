function go(id) {
    debug('go(' + id + ') called');
    debug(id);
    div = buildRoom(id);
    $('#room').empty().append(div);
}
function text(args) {
    //args.string  :  <text to display>
    //TODO: args.class   :  <class to apply to text>

    var svg = document.getElementById('overlay_svg');
    var t = document.createElementNS(svg.namespaceURI, 'text');
    svg.appendChild(t);

    t = $(t)
        .html(args.string)
        .data('ttl', 5000)
        .attr('x', '1em')
        .attr('y', '1em');
}




function clickHandler(e) {
    debug('clickHandler was called!')
    debug(e.data);
    var click = e.data;
    if ('go' in click) {
        debug('Click contains a \'go\' directive!');
        go(click.go);
    }
    if ('text' in click) {
        debug('Click contains a \'text\' directive!');
        text(click.text);
    }
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
            .attr('class', hotspot.area.class);
        if ('click' in hotspot) {
            area.click(hotspot.click, clickHandler);
        }
        map.append(area);
    }
    var div = $('<div></div>')
        .append(img)
        .append(map);
    return div;
}




const DEBUG = true;
function debug(object) {
    if (DEBUG) console.log(object);
}
