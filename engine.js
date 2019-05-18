function go(id) {
    debug('go(' + id + ') called');
    debug(id);
    div = buildRoom(id);
    $('#room').empty().append(div);
}


function clickHandler(e) {
    debug('clickHandler was called!')
    debug(e.data);
    var click = e.data;
    if ('go' in click) {
        debug('Click contains a \'go\' directive!');
        go(click.go);
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
