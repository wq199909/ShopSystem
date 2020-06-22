

import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { Ware, Order, ShopServers } from '../server/ShopServices';
import { IMain } from '../pages/main';
import { RouteComponentProps } from 'react-router';
//{"WID":1,"WClass":"姘存灉","WName":"鑻规灉","Wdesc":"涓€绉嶆按鏋�","WPrice":10,"WPic":"","WDiscount":0.5,"OnShelves":0,"OID":1,"CID":1,"Quantity":10,"Paid":1,"Shipped":1,"Phone":null,"Address":"娼滃北","Addressee":"姹竻"}


export default function OrderTable(props:IMain&RouteComponentProps) {
    const [state, setstate] = useState(false)
    console.log(props)
    useEffect(() => {
        if(props.user&&props.user.CID==0){
            ShopServers.getOrders().then(data=>{
                props.addOrder(data.data)
            })
        }else{
            ShopServers.getOrdersByCID(Number(props.user?.CID)).then(data => {
                console.log(data)
                props.addOrder(data.data)
            })
        }
    }, [state])
    const columns = [
        {
            title: '名称',
            dataIndex: 'WName',
            key: 'WName',
        },
        {
            title: '种类',
            dataIndex: 'WClass',
            key: 'WClass',
        },
        {
            title: '价格',
            dataIndex: 'WPrice',
            key: 'WPrice'
        },
        {
            title: '折扣',
            dataIndex: 'WDiscount',
            key: 'WDiscount'
        },
        {
            title: '总量',
            dataIndex: 'Quantity',
            key: 'Quantity'
        },
        {
            title: '已付款',
            dataIndex: 'Paid',
            key: 'Paid',
            render: (val:any)=>val==1?'已付款':'未付款'
        },
        {
            title: '发货',
            dataIndex: 'Shipped',
            key: 'Shipped',
            render: (val:any, order:Order)=>val==1?'已发货':((props.user&&props.user.CID==0)?<Button type='primary' onClick={()=>{
                console.log(state)
                console.log(1)
                ShopServers.ship(Number(order.OID));
                setstate(!state);
            }}>发货</Button>:'未发货')
        },
        {
            title: '号码',
            dataIndex: 'Phone',
            key: 'Phone'
        },
        {
            title: '收件地址',
            dataIndex: 'Address',
            key: 'Address'
        },
        {
            title: '收件人',
            dataIndex: 'Addressee',
            key: 'Addressee'
        },
    ];
    const dataSource = props.orders.map(val=>({
        ...val,
        key: val.OID
    }))
    console.log(dataSource)
    return (
        // <Table dataSource={dataSource} columns={columns} />
        <Table
        columns={columns}
        // expandable={{
        //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.}</p>,
        //   rowExpandable: record => record.Wdesc != '',
        // }}
        dataSource={dataSource}
        pagination={false}
      />
    )
}