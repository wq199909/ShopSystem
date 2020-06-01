import { Response } from "express";

function writeResult(status: string, msg: string, data: any){
    return JSON.stringify({status: status, msg: msg, data: data})
}


function sendError(error: string | string[], res: Response) {
    let err: string;
    if (Array.isArray(error)) {
        err = error.join(";");
    } else {
        err = error;
    }
    res.send({
        err,
        data: null
    })
}
function sendData(data: any, res: Response) {
    res.send({
        error: "",
        data
    })
}
module.exports = { 
    writeResult,
    sendError,
    sendData
}