
import * as fs from "fs";

export {get_puzzle_json_by_id};

function get_puzzle_json_by_id(id){
    return JSON.parse(fs.readFileSync(`tst/data/puzzle${id}.json`));
}