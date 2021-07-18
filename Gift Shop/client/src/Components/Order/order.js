import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import { Row,Image,Col,Card,Button,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class order extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            order:[]
        }
    }
    componentDidMount(){
        this.getOrders()
    }
    
    getOrders=()=>{
        const token=localStorage.getItem('token')
        const decoded = jwt_decode(token)
        const id=decoded.user.id

        Axios.post('http://localhost:8000/order/readuser',{id})
        .then((response)=>{
            console.log(response.data)
            this.setState({order:response.data})
        }).catch((err)=>{
            console.log(err)
        })


    }
    
    render() {
        var renderSize=this.state.order.map((value)=><div>
            <Card className="my-4 mx-4" style={{backgroundColor:"#F7F7F7"}}>
                
                <Row>
                    <Col lg={3} className='p-4'>
                    <h3 className="ms-4">ORDER DETAILS</h3>
                    <br/>
                    {value.products.map((product)=><Link to={`/cart/order/${value._id}`}><Image src={product.product.imgURL} className="ms-4" width="300px" height="300px" alt={product.product.productName} /></Link>)}
                    </Col>
                    <Col lg={9} className='p-4'>
                    <br/>
                        {value.products.map((product)=><div className='mx-3 p-4' style={{marginTop:"95px",backgroundColor:'#949494'}}><span className=" fw-bold fs-5">{product.product.desc}</span><br/><small className="fs-6 ">{product.product.productName}</small>
                        <p className="fw-bold"><span>Quantity</span><span className="mx-2">{product.qty}</span></p>
                        <p className="fw-bold"><span>Rs.</span><span>{value.price}</span></p>
                        </div>)}
                    </Col>
                </Row>
                <Row className='p-4'>
                    <div style={{backgroundColor:'#949494'}}  className='fw-bold fs-6 p-4'>
                        <span>{value.address.name}</span>
                        <span>{value.address.street}</span><br/>
                        <span>{value.address.locality}</span>,<span className="mx-2">{value.address.district}</span><br></br>
                        <span className="me-2">{value.address.state}</span>-<span className="mx-2">{value.address.pincode}</span><br/>
                        <span>{value.address.phone_no}</span>
                    </div>
                </Row>
            </Card>
        </div>)
        const output=()=>{
            if(this.state.order.length===0){
               return(
                   <div >
                      
                       <h5 className="fs-4 fst-italic" style={{marginTop:"300px" ,marginLeft:"800px"}}>No items in your order list</h5>
                       
                   </div>
               )
            }
            if(this.state.order.length !== 0){
                return(<p>{renderSize}</p>)
                
            }
        }

        var result=output()

        return (
            <div>
                <Row>
                    <Col lg={9}>
                    {result}
                    </Col>
                    <Col>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default order
