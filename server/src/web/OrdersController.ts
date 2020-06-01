import { Request, Response } from "express";
import url from "url";
const OrdersDao = require('../dao/OrdersDao')
const respUtil = require("../util/RespUtil");
let path = new Map();

function addOrder(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
    OrdersDao.addOrder(params.WID, params.CID, params.Quantity, params.Paid, params.Shipped, params.Address, params.Addressee, (data: any) => {
        res.write(respUtil.writeResult("success", "插入成功", {id: data.insertId, ...params}))
        res.end();
    })
}
path.set("addOrder", addOrder);

function queryOrdersByCID(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
    OrdersDao.queryOrdersByCID(params.CID, (data: any) => {
        res.write(respUtil.writeResult("success", "查找成功", data))
        res.end();
    })
}
path.set("queryOrdersByCID", queryOrdersByCID);

function updateShippedByOID(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
    OrdersDao.updateShippedByOID(params.OID, (data: any) => {
        res.write(respUtil.writeResult("success", "修改", data))
        res.end();
    })
}
path.set("updateShippedByOID", updateShippedByOID);


module.exports.path = path;