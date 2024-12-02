import * as P from "../src/puzzle.js";
import * as T from "../src/tile.js";

describe('World tests', () =>{
    test('Red tile should be red', () =>{
        let t = T.tile__empty();
        t = T.tile__set_color(t, 'red');
        expect(t.color === 'red').toBe(true);
    });

    test('Check "red" condition on a tile', () =>{
        let t = T.tile__empty();
        t = T.tile__set_cond(t, 'red');
        expect(T.tile__get_cond(t) === 'red').toBe(true);
    });

    test('Check world__display on empty world', () =>{
        let p = P.puzzle__empty();
        //console.log(W.world__display(w));
        //console.log(typeof P.world__display(w));
        //console.log("\n\n\n\n");
        expect((typeof(P.world__display(p.world))) === "string").toBe(true);
    });

    test('Check world__display on non empty world', () =>{
        const p = P.puzzle__empty();
        const w_new = P.world__set_tile(p.world, T.tile__set_color(T.tile__empty(), "red"), 0, 0);
        expect((typeof(P.world__display(w_new))) === "string").toBe(true);
    });

    test('tile__copy should create another tile', () =>{
        let t1 = T.tile__empty();
        t1 = T.tile__set_color(t1, 'red');
        let t2 = T.tile__copy(t1);
        t2 = T.tile__set_color(t2, 'black');
        expect((t1.color === 'red') && (t2.color === 'black')).toBe(true);
    });
    
    test('world__set_tile should be detected by world__get_tile', () =>{
        const p1 = P.puzzle__empty();
        const t = T.tile__set_color(T.tile__empty(), "red");
        const p2 = P.puzzle__empty();
        p2.world = P.world__set_tile(p1.world, t, 0, 0);
        expect((T.tile__get_color(P.world__get_tile(p1.world, 0, 0)) === "black") && (T.tile__get_color(P.world__get_tile(p2.world, 0, 0)) === "red")).toBe(true);
    });
});