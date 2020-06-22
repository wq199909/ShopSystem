import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ShopServers, Customer } from '../server/ShopServices';
import { IState } from '../redux/dispatch/Dispatch';
import Action from '../redux/action/Action'
import { connect } from 'react-redux'
import { withRouter, RouterProps } from 'react-router';
import User from '../components/User';
const NormalLoginForm = (props: ILogin & RouterProps) => {
  console.log(props)
  const onFinish = (values: any) => {
    // console.log('Received values of form: ', values);
    ShopServers.login({
      CPhone: values.username,
      CPwd: values.password,
      CAddress: '',
      CName: ''
    }).then(data => {
      if (data.status === 'success') {
        message.success(data.msg, 2)
        props.addUser(data.data)
        props.history.push('/main/main')
      } else {
        message.error(data.msg, 2)
      }
    })
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <User register={true}
          CPwd=''
          CPhone=''
          CAddress=''
          CName=''></User>
      </Form.Item>
    </Form >
  );
};

interface ILogin {
  addUser: (user: Customer) => void
}
function mapStateToProps(state: IState) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch: any): ILogin {
  return {
    addUser(user) {
      dispatch(Action.addUser(user))
    }
  }
}

const NormalForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm));


function login() {
  return (
    <div className='login'>
      <h1>商品管理系统</h1>
      <NormalForm ></NormalForm>
    </div>
  )
}
export default login 