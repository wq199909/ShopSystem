import { Request, Response } from "express";
import url from "url";
const CustomerDao = require('../dao/CustomerDao')
const respUtil = require("../util/RespUtil");
let path = new Map();

function addCustomer(req: Request, res: Response) {
    let params = {
        CName: '',
        CPhone: '',
        CAddress: '',
        CPwd: '',
        ...req.body
    }
    CustomerDao.addCustomer(params.CName, params.CPhone, params.CAddress, params.CPwd, (data: any, boolean) => {
        if(!boolean){
            res.write(respUtil.writeResult("fail", "插入失败", '该账号已存在'))
        }else{
            res.write(respUtil.writeResult("success", "插入成功", {id: data.insertId, ...params}))
        }
        res.end();
    })
}
path.set("addCustomer", addCustomer);

function updateCustomer(req: Request, res: Response) {
    let params = {
        id: 0,
        CName: '',
        CPhone: '',
        CAddress: '',
        CPwd: '',
        ...req.body
    }
    CustomerDao.updateCustomer(params.id, params.CName, params.CPhone, params.CAddress, params.CPwd, (data: any) => {
        res.write(respUtil.writeResult("success", "插入成功", {...params}))
        res.end();
    })
}
path.set("updateCustomer", updateCustomer);


function login(req: Request, res: Response) {
    let params = {
        ...req.body
    };
    console.log(params)
    CustomerDao.queryCustomerByCPhone(params.CPhone, (data: any) => {
        if(data.length == 0){
            res.write(respUtil.writeResult("fail", "没有该用户", ""))
        }else if(data[0].CPwd == params.CPwd){
            res.write(respUtil.writeResult("success", "登录成功", data[0]))
        }else{
            res.write(respUtil.writeResult("fail", "密码错误", ""))
        }
        res.end();
    })
}
path.set("login", login);

module.exports.path = path;