import path from "path";
import multer from "multer";
let pathMap = new Map();
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../public/upload"),
    filename: (req, file, cb) => {
        const time=  new Date().getTime();
        const extname = path.extname(file.originalname);
        cb(null, `${time}${extname}`);
    }
})
const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
const upload = multer({
    storage,
    limits:{
        fileSize: 1024*1024
    },
    fileFilter(req, file, cb){
        const extname = path.extname(file.originalname);
        if(allowedExtensions.includes(extname)){
            cb(null, true);
        }else{
            cb(new Error("文件类型不正确"), false);
        }
    }
}).single("imgfile");

pathMap.set("upload", upload)

module.exports.path = pathMap;