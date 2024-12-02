

import * as game from '../interpreter.js';
import * as extern from '../extern.js';
import * as command from '../command.js';
import * as utils from './browser_utils.js';
import * as generator from '../generator.js';


// 'robots.ttf' defines 16 ad-hoc icons, using codes from \uEE00 to \uEE0F :
// 0 = robot pointing east, 1 = robot pointing south, 2 = robot pointing west,
// 3 = robot pointing north, 4 = star, 5 = disk, 6 = box, 7 = flash,
// 8 = heart, 9 = broken heart, A = lock, B = open lock, C = key,
// D = droplet, E = rocket, F = empty

const icons = {
    robotEast:   { string: '\uEE00', color: 'pink' },
    robotSouth:  { string: '\uEE01', color: 'pink' },
    robotWest:   { string: '\uEE02', color: 'pink' },
    robotNorth:  { string: '\uEE03', color: 'pink' },
    star:        { string: '\uEE04', color: 'yellow' },
    disk:        { string: '\uEE05', color: 'red' },
    box:         { string: '\uEE06', color: 'red' },
    flash:       { string: '\uEE07', color: 'red' },
    heart:       { string: '\uEE08', color: 'red' },
    heartBroken: { string: '\uEE09', color: 'red' },
    lock:        { string: '\uEE0A', color: 'red' },
    lockOpen:    { string: '\uEE0B', color: 'red' },
    key:         { string: '\uEE0C', color: 'red' },
    droplet:     { string: '\uEE0D', color: 'red' },
    rocket:      { string: '\uEE0E', color: 'red' },
    empty:       { string: '\uEE0F', color: 'red' },
};

const aPuzzle = {
    board:    [ '                ',
                '                ',
                '                ',
                '     gbbbbbbg   ',
                '     b      b   ',
                '     b      b   ',
                '     b bbbbbg   ',
                '     b          ',
                '   B grg        ',
                '   b  b         ',
                '   gbbg         ',
                '                ' ],
    robot: { x: 6, y: 7, dir: 0 },
};

const robotID = "robot";

const aBoardID = "visualizer_board";

function removeRobot() {
    const rCell = document.getElementById(robotID);
    rCell.removeAttribute('id');
    rCell.removeAttribute('style');
    rCell.innerText = icons.empty.string;
}

function addRobot(aBoardID, aRobot) {
    let aBoard = document.getElementById(aBoardID);
    let aCell  = aBoard.rows[aRobot.x].cells[aRobot.y];
    let anIcon = icons[Object.keys(icons)[aRobot.dir]];
    aCell.id = robotID;
    aCell.innerText = anIcon.string;
    aCell.style.color = anIcon.color;
}

function isExistRobot(){
    return (document.getElementById(robotID) !== null);
}

function addStar(aCell) {
    aCell.innerText = icons.star.string;
    aCell.style.color = icons.star.color;
}

function fillBoard(aBoardID, aPuzzle) {
    const tbody = document.getElementById(aBoardID);
    aPuzzle.board.forEach((aLine) => {
        const newRow = tbody.insertRow();
        aLine.split('').forEach((aChar) => {
            const newCell = newRow.insertCell();
            switch (aChar) {
            case 'r': newCell.className += " red_tile"; break;
            case 'g': newCell.className += " green_tile"; break;
            case 'b': newCell.className += " blue_tile"; break;
            case 'R': newCell.className += " red_tile"; addStar(newCell); break;
            case 'G': newCell.className += " green_tile"; addStar(newCell); break;
            case 'B': newCell.className += " blue_tile"; addStar(newCell); break;
            }
        });
    });
}

function emptyBoard(aBoardID){
    const tbody = document.getElementById(aBoardID);
    tbody.innerHTML = "";
}

function emptyInstructions(){
    const tbody_instructions = document.getElementById("visualizer_instructions");
    tbody_instructions.innerHTML = "";
}

function disableInstructions(){
    const tbody = document.getElementById("visualizer_instructions");
    const lines = tbody.getElementsByTagName("tr");
    for(let line = 0; line < lines.length; line++){
        const columns = lines[line].getElementsByTagName("td");
        for(let col = 1; col < columns.length; col++){
            const selector = columns[col].getElementsByTagName("select")[0];
            selector.setAttribute('disabled', true);
        }
    }
}




function convert_dir(dir){
    if (dir.x === 1) return 0; //East
    if (dir.x === -1) return 2; //West
    if (dir.y === 1) return 1; //South
    return 3; //North
}

function isSameCoords(robot1, robot2){
    return (robot1.x===robot2.x && robot1.y===robot2.y && robot1.dir.x===robot2.dir.x && robot1.dir.y===robot2.dir.y);
}

let puzzle_id = -1;
let program_data = {};
let step = undefined;
let has_started = false;

function refresh_puzzle(){
    program_data = {};
    step = undefined;
    has_started = false;

    if(isExistRobot()) removeRobot();
    emptyBoard(aBoardID);
    emptyInstructions();
    if(puzzle_id === -1) return;
    fillInstructions();

    aPuzzle.board=extern.puzzle_json__import(puzzle_id, utils.get_puzzle_json_by_id).world;
    let puzzle=extern.puzzle__import(puzzle_id, utils.get_puzzle_json_by_id);
    aPuzzle.robot.x = puzzle.coords.y;
    aPuzzle.robot.y = puzzle.coords.x;
    aPuzzle.robot.dir = convert_dir(puzzle.coords.dir);

    fillBoard(aBoardID, aPuzzle);
    addRobot(aBoardID, aPuzzle.robot);
}

function start(){
    disableInstructions();
    let puzzle = extern.puzzle__import(puzzle_id, utils.get_puzzle_json_by_id);
    puzzle = read_instructions(puzzle);
    program_data = game.start_step_by_step_game(puzzle,true);
    step = game.generic_step(puzzle);
    has_started = true;
}

function moveRobot(aBoardID) {
    if(!has_started) start();

    if(game.is_game_over(program_data)){
        puzzle_id = -1;
        refresh_puzzle(puzzle_id);
        return;
    }

    let next_program_data = step(program_data);
    while(isSameCoords(next_program_data.robot, program_data.robot) && next_program_data.value === ''){
        program_data = next_program_data;
        next_program_data = step(program_data);
    }
    program_data = next_program_data;
    
    if(game.is_game_over(program_data)) game.print_end_value(program_data);

    removeRobot();
    addRobot(aBoardID, 
                {x: program_data.robot.y,
                y: program_data.robot.x,
                dir: convert_dir(program_data.robot.dir)});
}

function fillInstructions(){
    const tbody = document.getElementById("visualizer_instructions");
    let instructions=extern.puzzle_json__import(puzzle_id, utils.get_puzzle_json_by_id).functions;

    const array_commands = ['move', 'turnRight', 'turnLeft'];
    const array_conditions = ['any', 'red', 'blue', 'green'];
    for (const [func] of Object.entries(instructions)) array_commands.push(func);

    for (const [func, value] of Object.entries(instructions)) {
        const newRow = tbody.insertRow();

        const newTextCell = newRow.insertCell();
        let text = document.createElement("label");
        text.innerHTML = func;
        newTextCell.appendChild(text);

        for(let col = 0; col < value; col++){
            const newCell = newRow.insertCell();

            let selector = document.createElement("select");

            let nothing_option = document.createElement("option");
            nothing_option.value = "none";
            nothing_option.text = "";
            selector.appendChild(nothing_option);

            for (let acom = 0; acom < array_commands.length; acom++){
                for (let acon = 0; acon < array_conditions.length; acon++){
                    let option = document.createElement("option");

                    option.value = array_commands[acom]+" "+array_conditions[acon];
                    option.text = array_commands[acom]+" on "+array_conditions[acon];
                    selector.appendChild(option);
                }
            }

            newCell.appendChild(selector);
        }
    }
}

function read_instructions(puzzle){
    let new_puzzle = puzzle;

    const tbody = document.getElementById("visualizer_instructions");
    const lines = tbody.getElementsByTagName("tr");
    for(let line = 0; line < lines.length; line++){
        const columns = lines[line].getElementsByTagName("td");
        for(let col = 1; col < columns.length; col++){
            const selector = columns[col].getElementsByTagName("select")[0];
            const selected_value = selector.options[selector.selectedIndex].value; //String

            if(selected_value === 'none') continue;
            let func = selected_value.split(' ')[0];
            const cond = selected_value.split(' ')[1];
            if(func[0] === 'F') func = parseInt(func.substring(1));

            new_puzzle = command.inputFunction(new_puzzle, line, col, func, cond);
        }
    }

    return new_puzzle;
}


function display_generated_puzzle(){
    if(isExistRobot()) removeRobot();
    emptyBoard(aBoardID);

    const new_puzzle = generator.generate_simple_puzzle(2,5);
    
    aPuzzle.board=utils.world_to_string(new_puzzle.world);
    //console.log(aPuzzle.board);
    
    fillBoard(aBoardID, aPuzzle);
    //addRobot(aBoardID, aPuzzle.robot);
}

function display_generated_random_puzzle(){
    if(isExistRobot()) removeRobot();
    emptyBoard(aBoardID);

    const new_puzzle = generator.generate_random_puzzle();
    
    aPuzzle.board=utils.world_to_string(new_puzzle.world);
    
    fillBoard(aBoardID, aPuzzle);
}

window.onload = () => {
    //emptyBoard(aBoardID);

    //document.getElementById("button_move").addEventListener("click", () => moveRobotRandomly(aBoardID));
    document.getElementById("button_move").addEventListener("click", () => moveRobot(aBoardID));
    document.getElementById("button_refresh").addEventListener("click", () => {puzzle_id=parseInt(document.getElementById("puzzle_id").value); refresh_puzzle();});
    document.getElementById("button_generate").addEventListener("click", () => display_generated_puzzle());
    document.getElementById("button_generate_random").addEventListener("click", () => display_generated_random_puzzle());
};
