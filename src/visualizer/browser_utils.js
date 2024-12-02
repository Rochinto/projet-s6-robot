
import * as T from "../tile.js";
import * as P from "../puzzle.js";

import p0 from '../../tst/data/puzzle0.json' with { type: 'json' };
import p1 from '../../tst/data/puzzle1.json' with { type: 'json' };
import p2 from '../../tst/data/puzzle2.json' with { type: 'json' };

export {get_puzzle_json_by_id, world_to_string};


function get_puzzle_json_by_id(id){
    const puzzles = [p0, p1, p2];
    return puzzles[id];
}

function world_to_string(world){
    const result = new Array(12);
    for (let y=0; y<12; y++){
        result[y] = '';

        for (let x=0; x<16; x++){
            const color = T.tile__get_color(P.world__get_tile(world,x,y));
            if (color === 'black') result[y] = result[y]+' ';
            else result[y] = result[y]+color[0];
        }
    }

    return result;
}