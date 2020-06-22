import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ShopServers } from './server/ShopServices';

ReactDOM.render(
  
  <App />,
  document.getElementById('root')
);

// ShopServers.add({
//   WName: '白菜',
//   WClass: '蔬菜',
//   WPic: '',
//   WDiscount: 9,
//   WPrice: 10,
//   WDesc: ''
// }).then(data=>{
//   console.log(data)
// })

// ShopServers.getWares().then(data=>{
//   console.log(data)
// })

// ShopServers.deleteWareById(1).then(data=>{
//   console.log(data)
// })
// ShopServers.addOrder({
//   WID: 1,
//   CID: 1,
//   Quantity: 20,
//   Paid: true,
//   Shipped: false,
//   Address: 'qs',
//   Addressee: 'wq',
//   Phone: '12345678900',
// }).then(data=>{
//   console.log(data)
// }) 

// ShopServers.ship(1).then(data=>{
//   console.log(data)
// })
// ShopServers.updateOnShelves(1, false).then(data=>console.log(data))