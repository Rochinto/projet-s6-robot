import * as puzzle_api from '../src/puzzle.js';

function test_display_tile(){
    let tile_1= new puzzle_api.Tile('red');
    console.log(puzzle_api.tile__display(tile_1));
}

function test_world_display(){
    let world_1=new puzzle_api.Puzzle();
    puzzle_api.world__display(world_1);
}

function test_getting_tile(){
  let world_1=new puzzle_api.Puzzle();
  world_1.world[0][0].color='green';
  console.log(puzzle_api.tile__get(world_1,0,0).get_tile_color());
}

function test_painting_tile(){
    let world_1=new puzzle_api.Puzzle();
    world_1.world[0][0].color='red';
    world_1.world[5][5].color='green';
    let new_tile=puzzle_api.tile__paint(world_1.world[5][5],'blue');
    console.log(world_1.world[5][5].get_tile_color());
    console.log(new_tile.color);
    world_1.world[5][5]=new_tile;
    console.log(world_1.world[5][5].get_tile_color());
    world_1.world[5][5].display();
    let tile_2=world_1.world[5][5].paint('green');
    tile_2.display();
    world_1.world[5][5].display();
    console.log("***************************DISPLAYING THE NEW WORLD PUZZLE:");
    world_1.display();
    console.log("***************************TESTING OF ANOTHER PROPERTY:");
    console.log(world_1.get_tile(5,5));
}

test_display_tile();
console.log("*********************");
test_world_display();
console.log("*********************");
test_getting_tile();
console.log("*********************");
test_painting_tile();
console.log("*********************");
