import { Response } from "express";

const dbutil = require("./dbutil");
/**
 * 插入一条商品信息
 * @param WName 
 * @param WClass 
 * @param WDesc 
 * @param WPrice 
 * @param WPic 
 * @param WDiscount 
 * @param success 
 */
function insertWare(WName: string, WClass: string, WDesc: null|string, WPrice: number , WPic: null|string, WDiscount: number, success:(res:Response)=>void){
    let insertSql = `insert into Ware (WName, WClass, Wdesc, WPrice , Wpic, WDiscount, OnShelves) values (?, ?, ?, ?, ?, ?, 1);`;
    let params = [WName, WClass, WDesc, WPrice, WPic, WDiscount];
    console.log(params)
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (err: any, res: Response)=>{
        if(err==null){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}
/**
 * 通过id删除一条商品信息
 * @param id 
 * @param success 
 */
function deleteWareById(id: number, success:(res:Response)=>void){
    let deleteSql = `delete from Ware where WID = ?;`;
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(deleteSql, [Number(id)], (err: any, res: Response)=>{
        if(err==null){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}
function updateWare(id: number,WName: string, WClass: string, WDesc: null|string, WPrice: number , WPic: null|string, WDiscount: number, success:(res:Response)=>void){
    let updateSql = `update Ware set WName=?, WClass=?, Wdesc=?, WPrice =?, Wpic=?, WDiscount=? where WID=?;`;
    let params = [WName, WClass, WDesc, WPrice, WPic, WDiscount, id];
    // console.log(params)
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, (err: any, res: Response)=>{
        if(err==null){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}
/**
 * 通过id改变上架信息
 * @param id 
 * @param success 
 */
function updateOnShelves(onShelves: boolean, WID: number, success:(res:Response)=>void){
    let updateSql = `update Ware set onShelves = ? where WID = ?;`;
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, [onShelves, WID], (err: any, res: Response)=>{
        if(err==null){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}
/**
 * 通过id找到一条商品信息
 * @param id 
 * @param success 
 */
function queryWareById(id: number, success:(res:Response)=>void){
    let querySql = `select * from Ware where WID = ?;`;
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [id], (err: any, res: Response)=>{
        if(err==null){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}
/**
 * 通过WClass找到一类商品信息
 * @param id 
 * @param success 
 */
function queryWareByClass(WClass: string, success:(res:Response)=>void){
    let querySql = `select * from Ware where WClass = ?;`;
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [WClass], (err: any, res: Response)=>{
        if(err==null){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}
/**
 * 选中所有的商品信息
 * @param success 
 */
function queryWare(success:(res:Response)=>void){
    let querySql = `select * from Ware;`;
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,[],(err:any, res:Response)=>{
        if(err==null){
            success(res);
        }else{
            console.log(err);
        }
    })
    connection.end();
}
module.exports = {
    insertWare,
    deleteWareById,
    queryWare,
    queryWareByClass,
    updateOnShelves,
    updateWare
}