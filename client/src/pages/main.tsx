import React, { useState } from 'react'
import { Layout } from 'antd'
import { IState } from '../redux/dispatch/Dispatch';
import Action from '../redux/action/Action';
import { Customer, Ware, Order, ShopServers } from '../server/ShopServices';
import { connect } from 'react-redux';
import { withRouter, RouterProps, RouteComponentProps, Route } from 'react-router';
import WareTable from '../components/WareTable';
import { BrowserRouter, NavLink } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import User from '../components/User';
import WareC from '../components/WareC';
const { Header, Content } = Layout;
const defaultWare = {
    WName: '',
    WClass: '',
    Wdesc: '',
    WPrice: 0,
    WPic: '',
    WDiscount: 10,
    OnShelves: true
}
function mapStateToProps(state: IState) {
    return {
        user: state.user,
        wares: state.ware,
        orders: state.order
    }
}
interface IGetMes {
    addUser: (user: Customer) => void,
    addWare: (ware: Ware[]) => void,
    addOrder: (order: Order[]) => void
}
function mapDispatchToProps(dispatch: any): IGetMes {
    return {
        addUser(user) {
            dispatch(Action.addUser(user))
        },
        addWare(ware) {
            dispatch(Action.addWare(ware))
        },
        addOrder(order) {
            dispatch(Action.addOrder(order))
        }
    }
}
export interface IMain {
    user: Customer | null,
    orders: Order[],
    wares: Ware[],
    addUser: (user: Customer) => void,
    addWare: (ware: Ware[]) => void,
    addOrder: (order: Order[]) => void
}
function main(props: IMain & RouteComponentProps) {
    console.log(props)
    // const [state, setstate] = useState(props.wares)
    if (props.user === null) props.history.push('/login');
    // if (props.wares.length === 0) {
    //     let data = ShopServers.getWares().then(data => {
    //         props.addWare(data.data)
    //     })
    // }
    return (
        <div className="main">
            <Layout>
                <Header>
                    <h1><NavLink to="/main/main">商品管理系统</NavLink></h1>
                    {props.user && <User {...props.user} register={false}/>}

                    {/* <NavLink to="/main/user">{props.user?.CName}</NavLink> */}
                    <NavLink to="/main/orders">订单</NavLink>
                    {props.user&& props.user.CID == 0 && <WareC add={true} {...defaultWare} />}

                </Header>
                <Content>
                    <Route path="/main/main" exact render={() => <WareTable {...props} />}></Route>
                    <Route path="/main/orders" exact render={() => <OrderTable {...props} />}></Route>
                </Content>
            </Layout>
        </div>
    )
}

const Main2 = withRouter(connect(mapStateToProps, mapDispatchToProps)(main));
export default Main2
