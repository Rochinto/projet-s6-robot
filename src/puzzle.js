

export { puzzle__empty,puzzle__copy,world__empty,world__copy,world__set_tile,world__display,world__get_tile };

const W = 16;
const H = 12;

import * as T from './tile.js';

function puzzle__empty(){
	return {world: world__empty(), coords: coords__empty(), moves: {}, commands: []};
}

function world__empty(){
    const world = new Array(12);
    for (let y=0; y<H; y++){
        world[y] = new Array(16);
        for (let x=0; x<W; x++){
            world[y][x] = T.tile__empty();
        }
    }
    return world;
}

function coords__empty(){
    return {x: 0, y: 0, dir:{x: 0, y: 0}, gas: -1, color: "black"};
}

function puzzle__copy(puzzle){
    const puzzle_new = puzzle__empty();

    puzzle_new.world = world__copy(puzzle.world);
    puzzle_new.coords = puzzle.coords;
    puzzle_new.moves = puzzle.moves;
    puzzle_new.commands = commands__copy(puzzle.commands);
    return puzzle_new;
}

function world__copy(world){
    const world_new = world__empty();
    for (let y=0; y<H; y++){
        for (let x=0; x<W; x++){
            world_new[y][x] = T.tile__copy(world[y][x]);
        }
    }
    return world_new;
}

function commands__copy(commands){
    const commands_new = new Array(commands.length);
    for (let i=0; i<commands.length; i++){
        commands_new[i] = new Array(commands[i].length);
        for(let j=0; j<commands[i].length; j++){
            commands_new[i][j] = commands[i][j];
        }
    }
    return commands_new;
}

function world__set_tile(world,tile,x,y){
    const world_new = world__copy(world);
    world_new[y][x] = T.tile__copy(tile);
    return world_new;
}

function world__display(world){//fonction pour afficher le monde sous forme
//de matrices de couleurs.
    let display = "";
    let line;
    for (let y=0; y<H; y++){
        line = "";
        for (let x=0 ; x<W; x++){
            if (world[y][x].color === 'black') line = line + '. \t';
            else line = line + world[y][x].color + "\t";
        }
        display = display + line;
        display = display + "\n";
    }
    return display; 
}

function world__get_tile(world,x,y){
    return T.tile__copy(world[y][x]);
}


