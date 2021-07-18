import React, { Component } from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class footer extends Component {
    render() {
        return (
            <div>
                <Row>
                <a href='/' className='text-white text-decoration-none fw-bold fs-3' style={{backgroundColor:"black",padding: '15px 820px'}}>Back to Top</a>
                </Row>
            
                
                <Row  style={{backgroundColor:"#DDCC70"}} >
                   
                        <Col className='my-3 mx-4 border-end border-dark ' lg={3}>
                        <h5>THE INDIA CRAFT HOUSE</h5>
                        <ul className='list-unstyled fs-5'>
                        <li>About us</li>
                        <li>Mission</li>
                        <li>Contact Us</li>
                        <li>Sell with Us</li>
                        <li>Fair Trade</li>
                        <li>Terms of Use</li>
                        <li>privacy Policy</li>
                        <li>Disclaimer</li>
                        <li>Blog</li>
                        <li>Site map</li>
                        </ul>
                        </Col>
                        <Col className='m-3 border-end border-dark ' lg={3}>
                        <h5>SHOP</h5>
                        <ul className='list-unstyled fs-5'>
                        <li>My Account</li>
                        <li>Reward Program</li>
                        <li>Gift cards</li>
                        <li>Customized Orders</li>
                        <li>Bulk Order</li>
                        </ul>
                        </Col>
                        <Col className='m-3' lg={3}>
                        <h5>HELP</h5>
                        <ul className='list-unstyled fs-5'>
                        <li>Customer Service</li>
                        <li>How To Order</li>
                        <li>Billing & Payments</li>
                        <li>Shipping & Delivery</li>
                        <li>Refund,Returns & Exchanges</li>
                        <li>Discounts & Promotions</li>
                        <li>FAQ's</li>
                       
                        </ul>
                        </Col>
                    

                </Row>
                
                
            </div>
        )
    }
}

export default footer



