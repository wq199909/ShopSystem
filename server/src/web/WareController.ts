import { Request, Response } from "express";
import url from "url";
const WareDao = require('../dao/WareDao')
const respUtil = require("../util/RespUtil");
let path = new Map();

function insertWare(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
    let AWare = {
        WName: '',
        WClass: '',
        WDesc: null,
        WPrice: 0,
        WPic: null,
        WDiscount: 0,
        ...params
    }

    WareDao.insertWare(AWare.WName, AWare.WClass, AWare.WDesc, AWare.WPrice, AWare.WPic, AWare.WDiscount, (data: any) => {
        res.write(respUtil.writeResult("success", "插入成功", {id: data.insertId, ...AWare}))
        res.end();
    })
}
path.set("insertWare", insertWare);

function deleteWareById(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;

    WareDao.deleteWareById(params.id, (data: any) => {
        res.write(respUtil.writeResult("success", "删除成功", ''))
        res.end();
    })
}
path.set("deleteWareById", deleteWareById);

function queryWareByClass(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
    console.log(params)
    WareDao.queryWareByClass(params.MClass ,(data: []) => {
        res.writeHead(200, { "content-type": "text/html; charset=UTF-8" });
        res.write(respUtil.writeResult("success", "查询成功", data))
        res.end();
    })
}
path.set("queryWareByClass", queryWareByClass);

function queryAllWare(req: Request, res: Response) {
    WareDao.queryWare((data: []) => {
        res.writeHead(200, { "content-type": "text/html; charset=UTF-8" });
        res.write(respUtil.writeResult("success", "查询成功", data))
        res.end();
    })
}
path.set("queryAllWare", queryAllWare);

module.exports.path = path;