import { Response, Request } from "express";
const express = require("express");
const loader = require("./loader")
const globalConf = require("./config")
const RespUtil = require("./util/RespUtil")
const app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/upload', express.static("./public/upload"))
app.get('/', (req: Request, res: Response) => res.send('Hello'))
app.get("/queryAllWare", loader.get("queryAllWare"))
app.post("/insertWare",loader.get("insertWare"))
app.get("/deleteWareById",loader.get("deleteWareById"))
app.get("/queryWareByClass",loader.get("queryWareByClass"))
app.post("/addCustomer",loader.get("addCustomer"))
app.post("/login",loader.get("login"))
app.post("/addOrder",loader.get("addOrder"))
app.get("/queryOrdersByCID",loader.get("queryOrdersByCID"))
app.get("/updateShippedByOID", loader.get("updateShippedByOID"))
app.get("/updateOnShelves", loader.get("updateOnShelves"))
app.post("/updateCustomer", loader.get("updateCustomer"))
app.post("/updateWare", loader.get("updateWare"))
app.get("/queryOrders", loader.get("queryOrders"))
app.post("/upload",loader.get("upload"), (req, res, next)=>{
    loader.get("upload")(req, res, err=>{
        if(err){
            // ResponseHelper.sendError(err.message, res);
            RespUtil.sendError(err.message, res);
        }else{
            const url = `/upload/${req.file.filename}`;
            RespUtil.sendData(url, res);
        }
    })
})

app.listen(globalConf.port, () => console.log("listening port " + globalConf.port));
