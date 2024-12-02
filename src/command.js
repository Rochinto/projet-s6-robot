import * as P from "./puzzle.js";
import * as R from "./robot.js";

function inputFunction(p, i, j, func, color_cond){
    const puzzle_new = P.puzzle__copy(p);
    
    if ((typeof func)==='number') puzzle_new.commands[i][j] = {f:func, cond:color_cond};
    else puzzle_new.commands[i][j] = {f:R[func], cond:color_cond};
    return puzzle_new;
}

export{ inputFunction };
