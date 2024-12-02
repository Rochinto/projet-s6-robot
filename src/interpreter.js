
import * as P from "./puzzle.js";
import * as T from "./tile.js";
import * as R from "./robot.js";
import * as S from "./stack.js";


function is_game_over(program_data){
    return (program_data.value !== '');
}

function print_end_value(program_data){
    if(program_data.value === 'You won'){ console.log('You won in', program_data.step_counter, 'steps !'); return; }
    console.log('Error:', program_data.value);
}

function start_game(puzzle){
    const start_coords = puzzle.coords;
    const ROBOT = R.makeRobot(start_coords.x, start_coords.y, start_coords.dir, start_coords.gas, 1, start_coords.color);
    const step = generic_step(puzzle);

    let STACK = S.stack__empty();
    STACK = S.stack__add_head(STACK, {f:1, cond:"any"});

    let program_data = {stack: STACK, robot: ROBOT, value: '', step_counter: 0};

    while (program_data.value === ''){
        program_data = step(program_data);
    } 

    if(is_game_over(program_data)) print_end_value(program_data);
}

function start_step_by_step_game(puzzle){
    const start_coords = puzzle.coords;
    const ROBOT = R.makeRobot(start_coords.x, start_coords.y, start_coords.dir, start_coords.gas, 1, start_coords.color);

    let STACK = S.stack__empty();
    STACK = S.stack__add_head(STACK, {f:1, cond:"any"});
    
    let program_data = {stack: STACK, robot: ROBOT, value: '', step_counter: 0};

    return program_data;
}

function generic_step(puzzle){

    const commands = puzzle.commands;
    const world = puzzle.world;

    function step(program_data){
        if (program_data.value !== '') return program_data;

        const new_program_data = stack_manage_head(program_data, commands, world);
    
        if (is_out_of_ground(new_program_data.robot, world)){ new_program_data.value = 'Out of ground error'; return new_program_data; }
        if (has_won(new_program_data.robot, world)){ new_program_data.value = 'You won'; return new_program_data; }
        if (is_stack_overflow(new_program_data.stack)){ new_program_data.value = 'Stack overflow error'; return new_program_data; }
    
        new_program_data.step_counter = program_data.step_counter + 1;
    
        if(is_infinite_loop(new_program_data.step_counter)){ new_program_data.value = 'Infinite loop error'; return new_program_data; }
        
        return new_program_data;
    }

    return step;
}

function copy_program_data(program_data){
    const new_program_data = {stack: program_data.stack, robot: program_data.robot, value: program_data.value, step_counter: program_data.step_counter};
    return new_program_data;
}

function stack_manage_head(program_data, commands, world){
    const new_program_data = copy_program_data(program_data);
    if (!S.stack__isEmpty(program_data.stack)){

        const x = R.x(new_program_data.robot);
        const y = R.y(new_program_data.robot);
        const instruction = S.stack__get_head(program_data.stack);
        new_program_data.stack = S.stack__remove_head(program_data.stack);
        
        if ( (typeof instruction)==='undefined' ) return new_program_data;

        if ( instruction.cond === 'any' || T.tile__get_color(P.world__get_tile(world,x,y)) === instruction.cond ){
            if ( typeof instruction.f === 'number'){
                for (let i = commands[instruction.f-1].length-1; i >= 0; i--){
                    new_program_data.stack = S.stack__add_head(new_program_data.stack, commands[instruction.f-1][i]);
                }
            }else if ( typeof instruction.f === 'function' && instruction.f.name in R ){
                new_program_data.robot = instruction.f(new_program_data.robot);
            }else{
                new_program_data.value = 'Unknown instruction error';
            }
        }
    }else{
        new_program_data.value = 'No instructions left';
    }
    return new_program_data;
}

function has_won(robot, world){
    const x = R.x(robot);
    const y = R.y(robot);
    return (T.tile__get_color(P.world__get_tile(world, x, y)) === 'Blue');
}

function is_out_of_ground(robot, world){
    const x = R.x(robot);
    const y = R.y(robot);
    if (x < 0 || y < 0 || x >= 16 || y >= 12) return true;
    //return !R.hasRightColor(robot, T.tile__get_cond(P.world__get_tile(world, x, y)));
    return (T.tile__get_color(P.world__get_tile(world, x, y)) === 'black');
}

function is_infinite_loop(number_of_instructions){ return (number_of_instructions > 1000); }

function is_stack_overflow(stack){ return (S.stack__get_size(stack) > 50); }

/*
function has_no_gas(robot){
    if (R.gas(robot) === 0){
        return true;
    }
    return false;
}*/

export{ start_game, start_step_by_step_game, generic_step, print_end_value, is_game_over };
