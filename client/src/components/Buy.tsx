import { Modal, Button, Input, message } from 'antd';
import { Ware, Customer, ShopServers, Order } from '../server/ShopServices';
import { useState } from 'react';
import React from 'react';


export default class Buy extends React.Component<Ware&Customer> {
  state = { 
      visible: false,
      count: 0,
      Phone: this.props.CPhone,
      Address: this.props.CAddress,
      Addressee: this.props.CName
    };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    ShopServers.addOrder({
          WID: Number(this.props.WID),
          CID: Number(this.props.CID),
          Quantity: this.state.count,
          Paid: true,
          Shipped: false,
          Address: this.state.Address,
          Addressee: this.state.Addressee,
          Phone: this.state.Phone
    }).then(data=>{
        if(data.status==='success'){
            message.success(data.msg, 2)
        }else{
            message.error(data.msg, 2)
        }
    })
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
        <div>
            <Button type="primary" onClick={this.showModal}>
                购买
          </Button>
            <Modal
                title={'购买' + this.props.WName}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>售价：{this.props.WPrice}</p>
                <p>折扣：{this.props.WDiscount}</p>
                <p>购买数量：<Input onChange={(e)=>{return this.setState({count: e.target.value})}} value={this.state.count}></Input></p>
                <p>收件人：<Input onChange={(e)=>{this.setState({Addressee: e.target.value})}} value={this.state.Addressee}></Input></p>
                <p>收件人电话：<Input onChange={(e)=>{this.setState({Phone: e.target.value})}} value= {this.state.Phone}></Input></p>
                <p>收件人地址：<Input onChange={(e)=>{this.setState({Address: e.target.value})}}value={this.state.Address}></Input></p>
                <p>总价：{this.state.count*this.props.WPrice*(this.props.WDiscount/10)}</p>

            </Modal>
        </div>
    );
  }
}
