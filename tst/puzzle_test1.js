import * as puzzle_api from '../src/puzzle.js';

function test_1(){
    let puzzle_1=new puzzle_api.Puzzle();
    console.log(puzzle_1);
    console.log(puzzle_1.world[0][0]);
    console.log(puzzle_1.world[0][0].color);
    console.log(puzzle_1.world[0][0].get_tile_color());
}

test_1();
