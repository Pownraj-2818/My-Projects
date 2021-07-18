import React, { Component } from 'react'
import { Row,Image,Col,Card,Button,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode'
import Axios from 'axios';

export class orderDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            record:[]
        }
    }
    componentDidMount(){
        this.getRecord()
    }
    getRecord=()=>{
        let id = this.props.match.params.id;
        Axios.get(`http://localhost:8000/order/read/${id}`)
        .then((response)=>{
            console.log(response.data)
            this.setState({record:response.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        var renderOrder=this.state.record.map((detail)=><div>

                {detail.products.map((product)=><div className="my-3 ms-5"><h3>{product.product.desc}</h3> <Image height="500px" className="ms-5" src={product.product.imgURL} alt={product.product.productName} /><br></br>
                    <span className=""><span>Product Code</span><span className="mx-2">:</span>{product.product.code}</span>
                    <p className="fw-bold mt-2 fs-5">{product.product.productName}</p>
                    <p  className=" mt-2 fs-5"><span className="fw-bold">Sold by</span><span className="mx-2">{product.product.by}</span></p>
                    <p><span  className="fw-bold fs-5">Price</span><span className="mx-2">:</span><span className="fw-bold fs-5">Rs.</span><span  className="fw-bold fs-5">{detail.price}</span></p>
                    <p ><span className="fw-bold fs-5">Status</span><span className="mx-2">:</span><span>{detail.status}</span></p>
                    <p><span className="fw-bold fs-5">Deliver to</span><span className='mx-2'>:</span><span className="fw-bold fs-5'">Mr/Ms</span><span className='mx-2 fw-bold fs-5'>{detail.address.name}</span></p>
                </div>)}
               
           
        </div>)
        return (
            <div>
                <Row>
                    <Col lg={8}>
                    {renderOrder}
                    </Col>
                    <Col lg={4}>
                    <Button href='/' className="" style={{marginTop:"500px",width:"400px"}}>Back to home</Button>
                    </Col>
                </Row>
                
                
            </div>
        )
    }
}

export default orderDetail
