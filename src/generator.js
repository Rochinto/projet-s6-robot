
import * as R from "./robot.js";
import * as P from "./puzzle.js";
import * as T from "./tile.js";
import * as S from "./stack.js";

function convert_to_dir(index){
    if (index === 0) return {x:1,y:0}; //East
    if (index === 1) return {x:-1,y:0}; //West
    if (index === 2) return {x:0,y:1}; //South
    return {x:0,y:-1}; //North
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function random_action(){
    const actions = [R.move, R.turnLeft, R.turnRight, 1, 2];
    return actions[getRandomInt(actions.length)];
}

function random_tile_color(){
    const colors = ["black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "blue", "blue", "blue", "red", "red", "green", "green", "Blue-star"];
    return colors[getRandomInt(colors.length)];
}

function is_out_of_bounds(robot){
    return !((robot.x < 16) && (robot.y < 12) && (robot.x >= 0) && (robot.y >= 0));
}



function generate_simple_puzzle(nb_functions, function_size){
    
    const _robot = R.makeRobot(getRandomInt(16), getRandomInt(12), convert_to_dir(getRandomInt(4)), 100, 1, "black");
    let STACK = S.stack__empty();
    STACK = S.stack__add_head(STACK, {f:1, cond:"any"});

    const instructions = new Array(nb_functions);
    for (let i=0 ; i<nb_functions ; i+=1){
        instructions[i] = new Array(function_size);
        for (let j=0 ; j<function_size; j+=1){ instructions[i][j] = {f:random_action(), cond:"any"}; }
    }
    let data = {robot: _robot, stack: STACK, action: undefined};
    
    let world = P.world__empty();
    const empty_tile = T.tile__empty();
    let step_counter = 0;

    while (!is_out_of_bounds(data.robot) && !S.stack__isEmpty(data.stack) && !is_infinite_loop(step_counter) && !is_stack_overflow(data.stack)){
        const new_data = get_next_robot_and_action(data, instructions);
        //console.log('Coords: ',data.robot.x, " & ", data.robot.y);
        //console.log(new_data.action);
        switch (data.action) {
            case R.move:
                world = P.world__set_tile(world, T.tile__set_color(empty_tile, "blue"), data.robot.x, data.robot.y);
                break;
            case R.turnLeft:
                world = P.world__set_tile(world, T.tile__set_color(empty_tile, "green"), data.robot.x, data.robot.y);
                break;
            case R.turnRight:
                world = P.world__set_tile(world, T.tile__set_color(empty_tile, "red"), data.robot.x, data.robot.y);
                break;
            default:
                break;
        }
        step_counter++;
        data = new_data;
    }

    const puzzle = P.puzzle__empty();
    puzzle.world = world;
    return puzzle;
}

function get_next_robot_and_action(data, instructions){
    const new_data = {robot: data.robot, stack: data.stack, action: undefined};

    if (!S.stack__isEmpty(data.stack)){
        
        const instruction = S.stack__get_head(new_data.stack);
        new_data.stack = S.stack__remove_head(new_data.stack);
        if ( instruction.cond === 'any' ){
            if ( typeof instruction.f === 'number'){
                for (let i = instructions[instruction.f-1].length-1; i >= 0; i--){
                    new_data.stack = S.stack__add_head(new_data.stack, instructions[instruction.f-1][i]);
                }
            }else if ( typeof instruction.f === 'function' && instruction.f.name in R ){
                new_data.action = instruction.f;
                new_data.robot = instruction.f(new_data.robot);
            }
        }
    }
    return new_data;
}

function is_infinite_loop(number_of_instructions){ return (number_of_instructions > 1000); }

function is_stack_overflow(stack){ return (S.stack__get_size(stack) > 50); }






function generate_random_puzzle(){
    
    let world = P.world__empty();
    const empty_tile = T.tile__empty();

    for (let y = 0; y < 12; y++){
        for (let x = 0; x < 16; x++){
            world = P.world__set_tile(world, T.tile__set_color(empty_tile, random_tile_color()), x, y);
        }
    }

    const puzzle = P.puzzle__empty();
    puzzle.world = world;
    return puzzle;
}

export {generate_simple_puzzle, generate_random_puzzle};
