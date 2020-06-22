import React from 'react';
// import logo from './logo.svg';
import Login from './pages/login'
import { store } from './redux/store'
import {Provider} from 'react-redux'
import Main from './pages/main';
import {BrowserRouter, Route} from 'react-router-dom'
console.log(store.getState())
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/main" component={Main}></Route>
        <Route path="/login" exact component={Login}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
