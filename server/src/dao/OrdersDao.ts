import { Response } from "express";
const dbutil = require("./dbutil");

/**
 * 添加一条订单信息
 * @param WID 
 * @param CID 
 * @param Quantity 
 * @param Paid 
 * @param Shipped 
 * @param Address 
 * @param Addressee 
 * @param success 
 */
function addOrder(WID: number, CID: number, Quantity: number, Paid: boolean, Shipped: boolean = false, Address: string, Addressee: string, Phone:string, success: (res: Response) => void) {
    let insertSql = `insert into Orders (WID, CID, Quantity, Paid, Shipped, Address, Addressee, Phone) values (?, ?, ?, ?, ?, ?, ?, ?);`;
    let params = [WID, CID, Quantity, Paid, Shipped, Address, Addressee, Phone];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (err: any, res: Response) => {
        if (err == null) {
            success(res);
        } else {
            console.log(err);
        }
    })
    connection.end();
}
/**
 * 通过CID获取订单信息
 * @param CID 
 * @param success 
 */
function queryOrdersByCID(CID: number, success: (res: Response) => void) {
    let querySql = `select Ware.*, O.* from Ware, (select * from Orders where CID = ?) as O where Ware.WID = O.WID;`;
    let params = [CID];
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
function queryOrders(success: (res: Response) => void) {
    let querySql = `select Ware.*, O.* from Ware, (select * from Orders) as O where Ware.WID = O.WID;`;
    let params = [];
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
/**
 * 通过OID改变发货状态
 * @param OID 
 * @param success 
 */
function updateShippedByOID(OID:number, success: (res: Response) => void) {
    let querySql = `update Orders set Shipped = 1 where OID = ?;`;
    let params = [OID];
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
module.exports = {
    addOrder,
    queryOrdersByCID,
    queryOrders,
    updateShippedByOID
}