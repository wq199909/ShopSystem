import { Modal, Button, Input, message } from 'antd';
import { Ware, Customer, ShopServers, Order } from '../server/ShopServices';
import { useState } from 'react';
import React from 'react';
import { IMain } from '../pages/main';
import { RouteComponentProps } from 'react-router';


export default class User extends React.Component<Customer & { register: boolean }> {
  state = {
    visible: false,
    CPwd: this.props.CPwd,
    CPhone: this.props.CPhone,
    CAddress: this.props.CAddress,
    CName: this.props.CName
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    //     ShopServers.updateUser({

    //   }).then(data=>{
    //       if(data.status==='success'){
    //           message.success(data.msg, 2)
    //       }else{
    //           message.error(data.msg, 2)
    //       }
    //   })
    this.setState({
      visible: false,
    });
    if (this.props.register) {
      ShopServers.addCustomer({
        CPwd: this.state.CPwd,
        CPhone: this.state.CPhone,
        CAddress: this.state.CAddress,
        CName: this.state.CName
      })
    } else {
      ShopServers.updateCustomer({
        CID: this.props.CID,
        CPwd: this.state.CPwd,
        CPhone: this.state.CPhone,
        CAddress: this.state.CAddress,
        CName: this.state.CName
      })
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="user">
        <Button type="primary" onClick={this.showModal}>
          {this.props.register?'register':this.props.CName}
        </Button>
        <Modal
          title={this.props.register?'注册用户':this.props.CName + '的基本信息'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>姓名：<Input onChange={(e) => { this.setState({ CName: e.target.value }) }} value={this.state.CName}></Input></p>
          <p>电话：<Input onChange={(e) => { this.setState({ CPhone: e.target.value }) }} value={this.state.CPhone}></Input></p>
          <p>地址：<Input onChange={(e) => { this.setState({ CAddress: e.target.value }) }} value={this.state.CAddress}></Input></p>
          <p>密码：<Input.Password onChange={(e) => { this.setState({ CPwd: e.target.value }) }} value={this.state.CPwd}></Input.Password></p>
        </Modal>
      </div>
    );
  }
}
