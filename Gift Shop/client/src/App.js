import logo from './logo.svg';
import React from 'react'
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './Components/Header/header'
import Slick from './Components/Slick/slick'
import Footer from './Components/Footer/footer'
import Banner from './Components/banner/banner'
import Gallery from './Components/gallery/gallery'
import ProductList from './Components/AllProducts/allproducts'
import ProductDetail from './Components/Product detail/detail'
import Cart from './Components/Cart/cart'
import Address from './Components/Address/address'
import Order from './Components/Order/order'
import OrderDetail from './Components/Order/orderDetail'


function App() {
  return (
   <Router>
     <Route path='/' component={Header} />
     <Route exact path='/' component={Slick} />
     <Route exact path='/' component={Banner} />
     <Route exact path='/' component={Gallery} />
     <Route exact path='/' component ={Footer} />
     <Route exact path='/productlist' component={ProductList} />
     <Route exact path='/product/detail/:product_id' component={ProductDetail} />
     <Route exact path='/cart' component={Cart} />
     <Route exact path='/cart/address' component={Address} />
     <Route exact path='/cart/order' component={Order} />
     <Route exact path='/cart/order/:id' component={OrderDetail} />
   
   </Router>
  );
}

export default App;
