

import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { ShopServers, Ware } from '../server/ShopServices';
import { IMain } from '../pages/main';
import { RouteComponentProps } from 'react-router';
import Buy from './Buy';
import WareC from './WareC';



export default function WareTable(props: IMain & RouteComponentProps) {
    if(!props.user)props.history.push('/login')
    const [state, setState] = useState(false)

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
            title: '操作',
            dataIndex: '',
            key: 'x',
        render: (val:any, ware:Ware) => (props.user&&props.user.CID==0)?(<div><Button type={ware.OnShelves?'dashed':'primary'} onClick={()=>{
            ShopServers.updateOnShelves(Number(ware.WID), !ware.OnShelves)
            setState(!state)
        }}>{ware.OnShelves?'下架':'上架'}</Button><WareC add={false} {...ware} change={()=>{console.log(state);setState(!state)}}></WareC></div>):<Buy {...val} {...props.user} ></Buy>
          },
    ];
    useEffect(() => {
        ShopServers.getWares().then(data => {
            props.addWare(data.data)
        })
    }, [state])
    let dataSource = props.wares.map(val=>({
        ...val,
        key: val.WID
    }));
    if(props.user&&props.user.CID!=0){
        dataSource = dataSource.filter(val=>val.OnShelves)
    }
    console.log(dataSource)
    return (
        // <Table dataSource={dataSource} columns={columns} />
        <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.Wdesc}</p>,
          rowExpandable: record => record.Wdesc != '',
        }}
        dataSource={dataSource}
        pagination={false}
      />
    )
}