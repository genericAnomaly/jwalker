function goToRoom(id) {
    var room = adventure.rooms[id];
    var img = '<img src="img/'+room.img+'" usemap="#'+id+'_map" />';
    var map = '<map name="'+id+'_map">';
    for (var id in room.map){
        map += '<area shape="'+room.map[id].area.shape+'" coords="'+room.map[id].area.coords+'" '+getHref(room.map[id].click)+' >';
    }
    map += '</map>';
    document.getElementById('room').innerHTML = img + map;
}

function getHref(object) {
    if ('go' in object) {
        return 'href="javascript:goToRoom(\'' + object.go + '\');"';
    }
}



function go(id) {
    debug('go(' + id + ') called');
    debug(id);
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
    var img = $('<img src="img/'+room.img+'" usemap="#'+id+'_map" />');
    //var map = $('<map name="'+id+'_map"></map>');
    var map = $('<map></map>').attr('name', id+'_map');
    for (var hotspot_id in room.map){
        var hotspot = room.map[hotspot_id];
        var area = $('<area id="'+id+'_'+hotspot_id+'" shape="'+hotspot.area.shape+'" coords="'+hotspot.area.coords+'" />');
        if ('click' in hotspot) {
            area.click(hotspot.click, clickHandler);
        }
        map.append(area);
    }

    //document.getElementById('room').innerHTML = img + map;
    $('#room').html(img);
    $('#room').append(map);
}




const DEBUG = true;
function debug(object) {
    if (DEBUG) console.log(object);
}
