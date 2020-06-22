import {IAction} from './ActionTypes'
import { Customer, Ware, Order } from '../../server/ShopServices'

export type SaveUser = IAction<"add_user", Customer>
const addUser = (user:Customer):SaveUser => {
    return {
        type: 'add_user',
        payload: user
    }
}

export type SavaWare = IAction<'add_ware', Ware[]>
const addWare = (ware:Ware[]):SavaWare=>{
    return {
        type: 'add_ware',
        payload: ware
    }
}

export type SavaOrder = IAction<'add_order', Order[]>
const addOrder = (order:Order[]):SavaOrder=>{
    return {
        type: 'add_order',
        payload: order
    }
}
export type Actions = SavaOrder|SavaWare|SaveUser;
export default{
    addWare,
    addUser,
    addOrder
}