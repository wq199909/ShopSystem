import { Request, Response } from "express";
import url from "url";
const WareDao = require('../dao/WareDao')
const respUtil = require("../util/RespUtil");
let path = new Map();

function insertWare(req: Request, res: Response) {
    let AWare = {
        WName: '',
        WClass: '',
        Wdesc: null,
        WPrice: 0,
        WPic: null,
        WDiscount: 0,
        OnShelves: true,
        ...req.body
    }

    WareDao.insertWare(AWare.WName, AWare.WClass, AWare.Wdesc, AWare.WPrice, AWare.WPic, AWare.WDiscount, (data: any) => {
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
    // console.log(req.url, params)
    WareDao.queryWareByClass(params.class ,(data: []) => {
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

function updateOnShelves(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
console.log(params)
    WareDao.updateOnShelves(params.OnShelves,params.WID ,(data: any) => {
        res.writeHead(200, { "content-type": "text/html; charset=UTF-8" });
        res.write(respUtil.writeResult("success", "修改成功", data))
        res.end();
    })
}
path.set("updateOnShelves", updateOnShelves);

function updateWare(req: Request, res: Response) {
    let AWare = {
        ...req.body
    }
    WareDao.updateWare(AWare.WID, AWare.WName, AWare.WClass, AWare.Wdesc, AWare.WPrice, AWare.WPic, AWare.WDiscount, (data: any) => {
        res.write(respUtil.writeResult("success", "修改成功", data))
        res.end();
    })
}
path.set("updateWare", updateWare);
module.exports.path = path;