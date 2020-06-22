import { Reducer } from "react"
import { SaveUser, SavaOrder, SavaWare, Actions } from '../action/Action'
import { Customer, Order, Ware } from "../../server/ShopServices"
export interface IState {
    user: Customer|null,
    order: Order[],
    ware: Ware[]
}
const defaultState: IState = {
    user: null,
    order: [],
    ware: []
}
const savaUser: Reducer<IState, SaveUser> = function (state, action) {
    return {
        ...state,
        user: action.payload,
    }
}
const savaOrder: Reducer<IState, SavaOrder> = function (state, action) {
    return {
        ...state,
        order: action.payload,
    }
}
const savaWare: Reducer<IState, SavaWare> = function (state, action) {
    return {
        ...state,
        ware: action.payload,
    }
}
export default function (state: IState = defaultState, action: Actions) {
    switch (action.type) {
        case "add_user":
            return savaUser(state, action);
        case "add_order":
            return savaOrder(state, action);
        case "add_ware":
            return savaWare(state, action);
        default:
            return state
    }
}