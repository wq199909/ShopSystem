import { Request, Response } from "express";
import url from "url";
const CustomerDao = require('../dao/CustomerDao')
const respUtil = require("../util/RespUtil");
let path = new Map();

function addCustomer(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
    CustomerDao.addCustomer(params.CName, params.CPhone, params.CAddress, params.CPwd, (data: any) => {
        res.write(respUtil.writeResult("success", "插入成功", {id: data.insertId, ...params}))
        res.end();
    })
}
path.set("addCustomer", addCustomer);

function login(req: Request, res: Response) {
    let params = url.parse(req.url, true).query;
    console.log(params)
    CustomerDao.queryCustomerByCPhone(params.CPhone, (data: any) => {
        if(data.length == 0){
            res.write(respUtil.writeResult("fail", "没有该用户", ""))
        }else if(data[0].CPwd == params.CPwd){
            res.write(respUtil.writeResult("success", "登录成功", data))
        }else{
            res.write(respUtil.writeResult("fail", "密码错误", ""))
        }
        res.end();
    })
}
path.set("login", login);

module.exports.path = path;