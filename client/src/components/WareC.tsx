import { Modal, Button, Input, message } from 'antd';
import { Ware, Customer, ShopServers, Order } from '../server/ShopServices';
import { useState } from 'react';
import React from 'react';


export default class WareC extends React.Component<{ add: boolean, change?:()=>void } & Ware> {
  state = {
    visible: false,
    ...this.props
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    if(this.props.add){
      ShopServers.addWare({
        WName: this.state.WName,
        WClass: this.state.WClass,
        WDiscount: this.state.WDiscount,
        WPrice: this.state.WPrice,
        WPic: this.state.WPic,
        Wdesc: this.state.Wdesc,
        OnShelves: this.state.OnShelves
      }).then(data => {
        if (data.status === 'success') {
          message.success(data.msg, 2)
        } else {
          message.error(data.msg, 2)
        }
      })

    }else{

    ShopServers.updateWare({
      WID: this.state.WID,
      WName: this.state.WName,
      WClass: this.state.WClass,
      WDiscount: this.state.WDiscount,
      WPrice: this.state.WPrice,
      WPic: this.state.WPic,
      Wdesc: this.state.Wdesc,
      OnShelves: this.state.OnShelves
    }).then(data => {
      if (data.status === 'success') {
        this.props.change&&this.props.change();
        message.success(data.msg, 2)
      } else {
        message.error(data.msg, 2)
      }
    })
    }
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="ware">
        <Button type="primary" onClick={this.showModal}>
          {this.props.add ? '添加商品' : '修改商品'}
        </Button>
        <Modal
          title={this.props.add ? '添加商品' : ('修改商品' + this.props.WName)}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>商品名称：<Input onChange={(e) => { this.setState({ WName: e.target.value }) }} value={this.state.WName}></Input></p>
          <p>种类：<Input onChange={(e) => { this.setState({ WClass: e.target.value }) }} value={this.state.WClass}></Input></p>
          <p>描述：<Input onChange={(e) => { this.setState({ Wdesc: e.target.value }) }} value={this.state.Wdesc || ''}></Input></p>
          <p>价格：<Input onChange={(e) => { this.setState({ WPrice: e.target.value }) }} value={this.state.WPrice}></Input></p>
          <p>折扣：<Input onChange={(e) => { this.setState({ WDiscount: e.target.value }) }} value={this.state.WDiscount}></Input></p>
        </Modal>
      </div>
    );
  }
}