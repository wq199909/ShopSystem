// let fs = require('fs')
import * as fs from "fs";
interface objConfig{
    [key: string]: any
}
let globalConfigs: objConfig = {};

let conf = fs.readFileSync("./src/server.conf")

let configArr = conf.toString().split("\n");

for(let i = 0; i < configArr.length; i++){
    globalConfigs[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}

module.exports = globalConfigs