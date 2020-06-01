let globalConfig = require("./config")
// let fs = require("fs")
import * as fs from "fs";
// let controllerSet = [];
let pathMap = new Map();

let files = fs.readdirSync("./src/"+globalConfig["web_path"])
for (let i = 0; i < files.length; i++){
    let temp = require("./"+globalConfig["web_path"]+"/"+files[i]);
    if(temp.path){
        temp.path.forEach((value:any, key:any) => {
            if(pathMap.get(key)==null){
                pathMap.set(key, value)
            }else{
                throw new Error("ul paht异常， " +key);
            }
        });
        // for(let [key, value] of temp.path){
        //     console.log(key, value, 1)
        //     if(pathMap.get(key)==null){
        //         pathMap.set(key, value)
        //     }else{
        //         throw new Error("ul paht异常， " +key);
        //     }
        // }
    }
}
module.exports = pathMap;