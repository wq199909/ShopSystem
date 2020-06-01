# 网上销售系统

## API

method|API|解释|args
:-:|:-:|:-:|:-:
GET|/|静态页面，还未实现
get|/upload|图片获取
post|/upload|图片上传
get|/queryAllWare|获取所有商品信息
post|/insertWare|添加一条商品
get|/deleteWareById|删除一条商品
get|/queryWareByClass|得到一类商品
post|/addCustomer|添加用户
post|/login|登录
post|/addOrder|添加一条订单
get|/queryOrdersByCID|得到一个用户的所有订单
get|/updateShippedByOID|改变发货信息

实现方式
```
mysql、typescript、express、multer(处理文件上传)
```