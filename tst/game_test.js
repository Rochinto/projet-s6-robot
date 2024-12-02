import * as game from '../src/interpreter.js';
import * as extern from '../src/extern.js';
import * as command from '../src/command.js';
import * as utils from '../src/console_utils.js';


function test_all(){
    test_wining();
    test_out_of_ground();
    test_infinite_loop();
    test_stack_overflow();
    test_wrong_instructions();
    test_no_instructions_left();
    test_puzzle_stack_training();
    test_puzzle_right_on_red();
}

function test_wining(){
    let puzzle=extern.puzzle__import(0, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,"move","any");
    puzzle=command.inputFunction(puzzle,0,1,1,"any");
    game.start_game(puzzle,false);
}

function test_out_of_ground(){
    let puzzle=extern.puzzle__import(0, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,"turnLeft","any");
    puzzle=command.inputFunction(puzzle,0,1,"move","any");
    puzzle=command.inputFunction(puzzle,0,2,1,"any");
    game.start_game(puzzle,false);
}

function test_infinite_loop(){
    let puzzle=extern.puzzle__import(0, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,"turnLeft","any");
    puzzle=command.inputFunction(puzzle,0,1,1,"any");
    game.start_game(puzzle,false);
}

function test_stack_overflow(){
    let puzzle=extern.puzzle__import(0, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,1,"any");
    puzzle=command.inputFunction(puzzle,0,1,"move","any");
    game.start_game(puzzle,false);
}

function test_wrong_instructions(){
    let puzzle=extern.puzzle__import(0, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,"solve","any");
    puzzle=command.inputFunction(puzzle,0,1,1,"any");
    game.start_game(puzzle,false);
}

function test_no_instructions_left(){
    let puzzle=extern.puzzle__import(0, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,"move","any");

    game.start_game(puzzle,false);
}

function test_puzzle_stack_training(){
    let puzzle=extern.puzzle__import(2, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,2,"any");

    puzzle=command.inputFunction(puzzle,1,0,"move","any");
    puzzle=command.inputFunction(puzzle,1,1,2,"blue");
    puzzle=command.inputFunction(puzzle,1,2,"turnLeft","red");
    puzzle=command.inputFunction(puzzle,1,3,"move","any");

    puzzle=command.inputFunction(puzzle,0,1,"turnLeft","any");
    puzzle=command.inputFunction(puzzle,0,2,"move","any");

    game.start_game(puzzle,false);
}

function test_puzzle_right_on_red(){
    let puzzle=extern.puzzle__import(1, utils.get_puzzle_json_by_id);
    puzzle=command.inputFunction(puzzle,0,0,"move","any");
    puzzle=command.inputFunction(puzzle,0,1,"turnRight","green");
    puzzle=command.inputFunction(puzzle,0,2,"turnLeft","red");
    puzzle=command.inputFunction(puzzle,0,3,2,"red");
    puzzle=command.inputFunction(puzzle,0,4,1,"any");

    puzzle=command.inputFunction(puzzle,1,0,"move","any");
    puzzle=command.inputFunction(puzzle,1,1,"turnLeft","green");
    puzzle=command.inputFunction(puzzle,1,2,2,"any");

    game.start_game(puzzle,false);
}

test_all();
