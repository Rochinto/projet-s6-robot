import * as P from "../src/puzzle.js";
import * as C from "../src/command.js";
import * as R from "../src/robot.js";

describe('Command tests', () =>{
    test('inputFunction should add the function corresponding to the string (basic instruction)', () =>{
    const p = P.puzzle__empty();
    p.commands = [Array(5), Array(4)];
    const p_new = C.inputFunction(p, 0, 0, "turnLeft", "red");
    expect(p_new.commands[0][0].f === R.turnLeft).toBe(true);
    expect(p_new.commands[0][0].cond === "red").toBe(true);
    });
    test('inputFunction should add the function corresponding to the string (function call)', () =>{
    const p = P.puzzle__empty();
    p.commands = [Array(5), Array(4)];
    const p_new = C.inputFunction(p, 0, 0, 1, "red");
    expect(p_new.commands[0][0].f === 1).toBe(true);
    expect(p_new.commands[0][0].cond === "red").toBe(true);
    });
});
