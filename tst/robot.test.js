import * as R from "../src/robot.js";
import * as T from "../src/tile.js";
import * as P from "../src/puzzle.js";

describe('Robot tests', () =>{
    test('Moving a robot turned on the right change his position from (0,0) to (1,0)', () =>{
	let r = R.makeRobot( 0, 0, {x: 1, y: 0}, 2, 1, "black");
	r = R.move(r);
	expect(R.x(r) === 1).toBe(true);
    });
    test('Moving a robot turned on the bottom change his position from (0,0) to (0,1)', () =>{
	let r = R.makeRobot( 0, 0, {x: 0, y:1}, 2, 1, "black");
	r = R.move(r);
	expect(R.y(r) === 1).toBe(true);
    });
    test('Moving a robot turned on the left change his position from (0,0) to (-1,0)', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	r = R.move(r);
	expect(R.x(r) === -1).toBe(true);
    });
    test('Moving a robot turned on the top change his position from (0,0) to (0,-1)', () =>{
	let r = R.makeRobot( 0, 0, {x: 0, y: -1}, 2, 1, "black");
	r = R.move(r);
	expect(R.y(r) === -1).toBe(true);
	});
	

    test('A robot without gas should not be able to move', () =>{
	let r = R.makeRobot( 0, 0, {x: 0, y: -1}, 0, 1, "black");
	expect(R.y(R.move(r)) === 0).toBe(true);
	});
	

    test('Turning a robot to the left change its direction', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	r = R.turnLeft(r);
	expect((R.dir(r).x === 0) && (R.dir(r).y === -1)).toBe(true);
    });
    test('Turning a robot to the right change its direction', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	r = R.turnRight(r);
	expect((R.dir(r).x === 0) && (R.dir(r).y === 1)).toBe(true);
    });
    test('Turning a robot twice change its direction twice', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	r = R.turnTwice(r);
	expect((R.dir(r).x === 1) && (R.dir(r).y === 0)).toBe(true);
	});
	

    test('A red tile with paint should turn the robot red', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	let t = T.tile__set_effect(T.tile__set_cond(T.tile__set_color(T.tile__empty(), "red"), "any"), "paint");
	expect(R.hasRightColor(R.applyEffect(r, t), "red")).toBe(true);
    });
    test('A red tile without paint should not change the color of the robot', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	let t = T.tile__set_effect(T.tile__set_cond(T.tile__set_color(T.tile__empty(), "red"), "any"), "none");
	expect(R.hasRightColor(R.applyEffect(r, t), "black")).toBe(true);
	});
    test('A tile with gas should refill the robot', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	let t = T.tile__set_effect(T.tile__set_cond(T.tile__set_color(T.tile__empty(), "red"), "any"), "gas");
	expect(R.gas(R.applyEffect(r, t)) === 7).toBe(true);
    });
    test('The robot should not be filled with more than 20 gas units', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 17, 1, "black");
	let t = T.tile__set_effect(T.tile__set_cond(T.tile__set_color(T.tile__empty(), "red"), "any"), "gas");
	expect(R.gas(R.applyEffect(r, t)) === 20).toBe(true);
    });
    test('A tile without gas should not change the gas amount of the robot', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	let t = T.tile__set_effect(T.tile__set_cond(T.tile__set_color(T.tile__empty(), "red"), "any"), "none");
	expect(R.gas(R.applyEffect(r, t)) === 2).toBe(true);
    });
	

    test('The robot should be able to paint a tile', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	let w = P.world__set_tile(P.world__empty(), T.tile__set_color(T.tile__empty(), "red"), 0, 0);
	expect(T.tile__get_color(P.world__get_tile(R.paintInColor(w, r, "blue"), 0, 0)) === "blue").toBe(true);
	});
	

    test('The refill function should increase the gas amount of the robot', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	expect(R.gas(R.refill(r, 3)) === 5).toBe(true);
    });
    test('The robot should not have more than 20 gas units', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 15, 1, "black");
	expect(R.gas(R.refill(r, 10)) === 20).toBe(true);
	});
	

    test('The speedUp function should increase by one the speed of the robot', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	expect(R.speed(R.speedUp(r)) === 2).toBe(true);
    });
    test('If the speed of the robot is 5, it cannot be increased and should remain unchanged', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 5, "black");
	expect(R.speed(R.speedUp(r)) === 5).toBe(true);
    });
    test('The speedDown function should decrease by one the speed of the robot', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 2, "black");
	expect(R.speed(R.speedDown(r)) === 1).toBe(true);
    });
    test('If the speed of the robot is 1, it cannot be decreased and should remain unchanged', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	expect(R.speed(R.speedDown(r)) === 1).toBe(true);
	});

	
    test('The robot should not be able to jump with less than 2 gas units', () =>{
	let r = R.makeRobot( 0, 0, {x: 1, y: 0}, 1, 1, "black");
	expect(R.x(R.jump(r)) === 0).toBe(true);
    });
    test('The robot should be able to jump if he has enough gas', () =>{
	let r = R.makeRobot( 0, 0, {x: 1, y: 0}, 2, 1, "black");
	expect(R.x(R.jump(r)) === 2).toBe(true);
	});


    test('Check the conditional functions on a red tile', () =>{
	let r = R.makeRobot( 0, 0, {x: -1, y: 0}, 2, 1, "black");
	let w = P.world__set_tile(P.world__empty(), T.tile__set_color(T.tile__empty(), "red"), 0, 0);
	expect(R.doIfIsOnRed(w, r, () => true) === true).toBe(true);
	expect(R.doIfIsOnBlue(w, r, () => true) === true).toBe(false);
	expect(R.doIfIsOnGreen(w, r, () => true) === true).toBe(false);
	});
    test('The nothing function should do nothing', () =>{
	let r = R.makeRobot( 0, 0, {x: 1, y: 0}, 2, 1, "black");
	expect(R.nothing(r) === r).toBe(true);
	});
});
