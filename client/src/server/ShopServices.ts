// import axios from 'axios'
export interface Ware {
    WID?: number,
    WName: string,
    WClass: string,
    Wdesc: string | null,
    WPrice: number,
    WPic: string | null,
    WDiscount: number,
    OnShelves: boolean
}
export interface Customer {
    CID?: number,
    CName: string,
    CPhone: string,
    CAddress: string,
    CPwd: string
}
export interface Order {
    OID?: number,
    WID: number, 
    CID: number, 
    Quantity: number, 
    Paid: boolean, 
    Shipped: boolean, 
    Address: string, 
    Addressee: string,
    Phone: string
}
interface Response<T> {
    status: 'success' | 'fail',
    msg: string,
    data: T
}
export class ShopServers {
    public static async addWare(ware: Ware): Promise<Response<Ware>> {
        let data = await fetch('/insertWare', {
            method: 'POST',
            body: JSON.stringify(ware),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        return data
    }
    public static async updateWare(ware: Ware): Promise<Response<Ware>> {
        let data = await fetch('/updateWare', {
            method: 'POST',
            body: JSON.stringify(ware),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        return data
    }
    public static async getWares(): Promise<Response<Ware[]>> {
        let data = await fetch('/queryAllWare').then(res => res.json())
        return data
    }
    public static async updateOnShelves(WID:number, OnShelves: boolean):Promise<any>{
        let data = await fetch(`/updateOnShelves?WID=${WID}&OnShelves=${OnShelves?1:0}`).then(res => res.json())
        return data
    }
    // public static async deleteWareById(id: number): Promise<any> {
    //     let data = await fetch('/deleteWareById?id=' + id).then(res => res.json())
    //     return data
    // }
    public static async getWareByClass(WClass: string): Promise<any> {
        let data = await fetch('/queryWareByClass?class=' + WClass).then(res => res.json())
        return data
    }
    public static async addCustomer(Customer: Customer): Promise<Customer> {
        let data = await fetch('/addCustomer', {
            method: 'POST',
            body: JSON.stringify(Customer),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        return data
    }
    public static async updateCustomer(Customer: Customer): Promise<Customer> {
        let data = await fetch('/updateCustomer', {
            method: 'POST',
            body: JSON.stringify(Customer),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        return data
    }
    public static async login(Customer: Customer): Promise<Response<Customer>> {
        let data = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(Customer),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        return data
    }
    public static async addOrder(Order: Order): Promise<Response<Order>> {
        let data = await fetch('/addOrder', {
            method: 'POST',
            body: JSON.stringify(Order),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        return data
    }
    public static async getOrdersByCID(CID: number): Promise<Response<Order[]>> {
        let data = await fetch('/queryOrdersByCID?CID=' + CID).then(res => res.json())
        return data
    }
    public static async getOrders(): Promise<Response<Order[]>> {
        let data = await fetch('/queryOrders').then(res => res.json())
        return data
    }
    public static async ship(OID: number): Promise<Order> {
        let data = await fetch('/updateShippedByOID?OID=' + OID).then(res => res.json())
        return data
    }

}