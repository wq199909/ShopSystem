import { Response } from "express";
const dbutil = require("./dbutil");
/**
 * 创建一个用户
 * @param CName 
 * @param CPhone 
 * @param CAddress 
 * @param CPwd 
 * @param success 
 */
function addCustomer(CName: string, CPhone: string, CAddress: string, CPwd: string, success: (res: Response, boolean: boolean) => void) {
    let insertSql = `insert into Customer (CName, CPhone, CAddress, CPwd) values (?, ?, ?, ?);`;
    let params = [CName, CPhone, CAddress, CPwd];
    let connection = dbutil.createConnection();
    connection.connect();
    console.log(params)
    connection.query(insertSql, params, (err: any, res: any) => {
        if (err == null) {
            success(res, true);
        } else {
            console.log(err);
        }
    })

    connection.end();
}
/**
 * 通过用户手机号查询用户信息
 * @param CPhone 
 * @param success 
 */
function queryCustomerByCPhone(CPhone: string, success: (res: Response) => void) {
    let querySql = `select * from Customer where CPhone = ?;`;
    let params = [CPhone];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (err: any, res: Response) => {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();
}
function updateCustomer(id: number, CName: string, CPhone: string, CAddress: string, CPwd: string, success: (res: Response, boolean: boolean) => void) {
    let updateSql = `update Customer set CName = ?, CPhone = ?, CAddress = ?, CPwd = ? where CID = ?;`;
    let params = [CName, CPhone, CAddress, CPwd, id];
    let connection = dbutil.createConnection();
    connection.connect();
    console.log(params)
    connection.query(updateSql, params, (err: any, res: any) => {
        if (err == null) {
            success(res, true);
        } else {
            console.log(err);
        }
    })

    connection.end();
}
module.exports = {
    addCustomer,
    queryCustomerByCPhone,
    updateCustomer
}