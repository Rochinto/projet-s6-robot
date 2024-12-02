
export{ tile__empty, tile__copy, tile__set_color, tile__get_color, tile__set_cond, tile__get_cond, tile__set_effect, tile__get_effect };

function tile__empty(){
    return {color: 'black', cond: 'void', effect: 'none'};
}

function tile__copy(tile){
    const tile_new = tile__empty();
    Object.keys(tile).forEach((x) => {tile_new[x] = tile[x];});
    return tile_new;
}

function tile__get_color(tile){
    return tile.color;
}

function tile__get_cond(tile){
    return tile.cond;
}

function tile__get_effect(tile){
    return tile.effect;
}

function tile__set_color(tile, color){
    const tile_new = tile__copy(tile);
    tile_new.color = color;
    return tile_new;
}

function tile__set_cond(tile, cond){
    const tile_new = tile__copy(tile);
    tile_new.cond = cond;
    return tile_new;
}

function tile__set_effect(tile, effect){
    const tile_new = tile__copy(tile);
    tile_new.effect = effect;
    return tile_new;
}