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






function buildRoom(id) {
    var room = adventure.rooms[id];
    var img = '<img src="img/'+room.img+'" usemap="#'+id+'_map" />';
    var map = '<map name="'+id+'_map">';
    for (var map_id in room.map){
        map += '<area id="'+id+'_'+map_id+'" shape="'+room.map[map_id].area.shape+'" coords="'+room.map[map_id].area.coords+'" '+getHref(room.map[map_id].click)+' >';
    }
    map += '</map>';
    document.getElementById('room').innerHTML = img + map;
}
