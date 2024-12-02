import * as P from "./puzzle.js";
import * as T from "./tile.js";
function makeRobot(_x, _y, _dir, _gas, _speed, _color){return { x: _x, y: _y, dir:_dir, gas: _gas, speed: _speed, color: _color};}
function x(rob){return rob['x'];}
function y(rob){return rob['y'];}
function dir(rob){return rob['dir'];}
function gas(rob){return rob['gas'];}
function speed(rob){return rob['speed'];}
function color(rob){return rob['color'];}


/*
* Direction (1,0) is on the right
* Direction (0,1) is on the bottom
* Direction (-1,0) is on the left
* Direction (0,-1) is on the top
*/

/*PRECOND: An initialized robot, if gas is activate the robot must have enough gas to move (at least 1).
*POSTCOND: Move the robot of 1 tile in its actual direction.
*          If there is the speed activate, move from x tile, x being the value of the speed.
*/
function move(rob){
    if(gas(rob)===0){
        return rob;
    }
    return makeRobot(x(rob)+speed(rob)*dir(rob).x, y(rob)+speed(rob)*dir(rob).y, dir(rob), gas(rob)-1, speed(rob), color(rob));
}

/*PRECOND: An initialized robot, if gas is activate the robot must have enough gas to move (at least 2).
*POSTCOND: Move the robot 2 tiles further, ignoring the first tile.
*/
function jump(rob){
    if(gas(rob)===0 || gas(rob)===1){
	return rob;	
    }
    return makeRobot(x(rob)+2*dir(rob).x, y(rob)+2*dir(rob).y, dir(rob), gas(rob)-2, speed(rob), color(rob));
}

/*PRECOND: An initialized robot.
*POSTCOND: Increase the speed value by 1, with a maximum of five.
*/
function speedUp(rob){
    if(speed(rob)===5){
        return rob;
    }
    return makeRobot(x(rob), y(rob), dir(rob), gas(rob), speed(rob)+1, color(rob));
}

/*PRECOND: An initialized robot
*POSTCOND: Decrease the speed value by 1, with a minimum of one.
*/
function speedDown(rob){
    if(speed(rob)===1){
	return rob;
    }
    return makeRobot(x(rob), y(rob), dir(rob), gas(rob), speed(rob)-1, color(rob));
}

/*PRECOND: An initialized robot, if gas is activate the robot must have enough gas to turn (at least 1).
*POSTCOND: The robot turns on the left, changing its direction by 1 on the left
*/
function turnLeft(rob){
    return makeRobot(x(rob), y(rob), {x: dir(rob).y, y: -dir(rob).x}, gas(rob)-1, speed(rob), color(rob));
}

/*PRECOND: An initialized robot, if gas is activate the robot must have enough gas to turn (at least 1).
*POSTCOND: The robot turns on the right, changing its direction by 1 on the right
*/
function turnRight(rob){
    return makeRobot(x(rob), y(rob), {x: -dir(rob).y, y: dir(rob).x}, gas(rob)-1, speed(rob), color(rob));
}

/*PRECOND: An initialized robot, if gas is activate the robot must have enough gas to turn (at least 2).
*POSTCOND: The robot turns backwards, reversing his direction.
*/
function turnTwice(rob){
    return makeRobot(x(rob), y(rob), {x: -dir(rob).x, y: -dir(rob).y}, gas(rob)-2, speed(rob), color(rob));
}

/*PRECOND: An initialized robot and a positive integer value.
*POSTCOND: The robot refill his gas by the value g, he can't exceed the maximum of gas (20).
*/
function refill(rob, g){
    if(gas(rob)+g>20){
	return makeRobot(x(rob), y(rob), dir(rob), 20, speed(rob), color(rob));
    }
    return makeRobot(x(rob), y(rob), dir(rob), gas(rob)+g, speed(rob), color(rob));
}

/*PRECOND: An initialized robot.
*POSTCOND: Return the same robot without any new changes
*/
function nothing(rob){
    return rob;
}

/*PRECOND: An initialized robot, an initialized world and a color
*POSTCOND: The color of the tile where is the robot is changed by a new color.
*/
function paintInColor(w, rob, color){
    let t = T.tile__set_color(T.tile__empty(), color);
    return P.world__set_tile(w, t, x(rob), y(rob));
}

/*PRECOND: An initialized robot, an initialized world, a color and a function of the robot
*POSTCOND: Execute the function choosed only if the tile under the robot his the right color.
*/
function doIfIsOnColor(w, rob, f, color){
    if(T.tile__get_color(P.world__get_tile(w, x(rob), y(rob))) === color){
        return f(rob);
    }
    return rob;
}

function doIfIsOnRed(w, rob, f){return doIfIsOnColor(w, rob, f, 'red');}

function doIfIsOnBlue(w, rob, f){return doIfIsOnColor(w, rob, f, 'blue');}

function doIfIsOnGreen(w, rob, f){return doIfIsOnColor(w, rob, f, 'green');}

/*PRECOND: An initialized robot and a color
*POSTCOND: Return TRUE if the chosen color is "any" or if it is the same color than the one of the robot.
*          Return FALSE in other cases.
*/
function hasRightColor(rob, color){
    return (color === "any") || (rob.color === color);
}

/*PRECOND: An initialized robot and a tile than is allowed to paint the robot
*POSTCOND: The robot take the color of the tile
*/
function applyEffect(rob, tile){
    let effect = T.tile__get_effect(tile);
    if (effect === "paint"){
        return makeRobot(x(rob), y(rob), dir(rob), gas(rob), speed(rob), T.tile__get_color(tile));
    }
    if (effect === "gas"){
        return refill(rob, 5);
    }
    return makeRobot(x(rob), y(rob), dir(rob), gas(rob), speed(rob), color(rob));
}

export{makeRobot,x,y,dir,gas,speed,color,move,speedUp,speedDown,turnLeft,turnRight,turnTwice,doIfIsOnRed,doIfIsOnBlue,doIfIsOnGreen,paintInColor,jump,refill,hasRightColor, nothing, applyEffect};

