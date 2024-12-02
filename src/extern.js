import * as P from "./puzzle.js";
import * as T from "./tile.js";


function puzzle_json__import(id, get_puzzle_function){
    const w = get_puzzle_function(id);
    return w;
}

function puzzle__import(id, get_puzzle_function){
    const w = puzzle_json__import(id, get_puzzle_function);
    const empty_tile = T.tile__empty();
    const p = P.puzzle__empty();
    for (let y=0 ; y<w.height ; y+=1){
        for (let x=0 ; x<w.width ; x+=1){
            p.world[y][x] = T.tile__set_color(empty_tile, w.tile_types[w.world[y][x]]).color;
        }
    }
    p.coords = {x: w.initial_x, y: w.initial_y, dir: w.initial_dir, gas: w.initial_gas, color: "black"};
    p.moves = w.instruction_types;
    p.commands = new Array(w.nb_functions);
    for (let i=0 ; i<w.nb_functions ; i+=1){
        p.commands[i] = new Array(w.functions[`F${i}`]);
    }
    return p;
}

export{ puzzle__import, puzzle_json__import };
