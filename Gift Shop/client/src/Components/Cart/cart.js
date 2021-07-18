import React, { Component } from 'react'
import { Row,Image,Col,Card,Button,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode'
import './cart.css'
import axios from 'axios';

export class cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             records:[],
             id:'',
             cartID:'',
             qty:'',
             price:''
        }
    }

    componentDidMount(){
        const token=localStorage.getItem('token')
            const decoded=jwt_decode(token)
           const user=decoded.user.id
            
        axios.post('http://localhost:8000/cart/getUser',{user})
        .then((response)=>{
            this.setState({records:response.data})
            console.log(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    updateQty=(id,totalPrice,product,event)=>{
        var qty=event.target.value
        this.setState({qty:qty})
        var Pprice= product
        var price=totalPrice
 console.log(qty)
       var totalProductPrice= Pprice*qty

       axios.post('http://localhost:8000/cart/update',{id,totalProductPrice,qty})
       .then(()=>{
           window.location="/cart"
           
       }).catch((err)=>{
           console.log(err)
       }) 

    }

    deleteCart=(id)=>{
        console.log(id)
        axios.post('http://localhost:8000/cart/delete',{id})
        .then((response)=>{
            console.log(response.data)
           
         
        }).catch((err)=>{
            console.log(err)
        })

    }


    render() {

        const totalPrice=()=>{
            var bagPrice=0
            this.state.records.map((value)=>{ bagPrice+= value.price} )
            return bagPrice
        }

        const discountPrice=()=>{
            var discount =0
            var totalDiscount=0
            this.state.records.map((value)=>{ discount= (value.price*10)/100
                totalDiscount+=discount
               
            } )
            return  Math.floor(totalDiscount)

        }

        const taxprice=()=>{
            var tax=0

            this.state.records.map((value)=>{ tax = (value.price*3.5)/100

            } )

            return Math.floor(tax)
        }

        const deliveryCharges=()=>{
            var deliver=0

            this.state.records.map((value)=>{
                if(value.price>=1000){
                    deliver=40
                }else{
                    deliver=0
                }
            })

            return deliver
        }

        const totalBag=(w,x,y,z)=>{
            const total = w-x+y+z

            return total
        }

       const cartData=()=>{
           var id=''
            this.state.records.map((value)=>{
                id=value._id
            })
            return id
       }

       const knowQTY=()=>{
           var quantity=''

           this.state.records.map((value)=>{
               quantity=value.qty
           })

           return quantity
       }

        var total=totalPrice()
        var discount=discountPrice()
        var tax=taxprice()
        var delivery=deliveryCharges()

        var productqty=knowQTY()

        var productPrice=this.state.records.map((value)=>{
            return value.product.price
        })

       


        var dataid=cartData()
        

        var bagPrice=totalBag(total,discount,delivery,tax)

        var renderCart=this.state.records.map((value)=><div>
           
           
           
                <Card className="my-5 border-0 mx-5">
                <Row>
                    
                    <Col lg={5}  className='border border-dark p-4 image'>
                   <a href='/cart' onClick={()=>this.deleteCart(value._id)} className='btn badge border-dark text-white bg-dark rounded-circle my-2 py-1' >x</a><br/>
                    <img src={value.product.imgURL} width="300px" className=' border border-bottom-0 border-dark' alt={value.product.productName} />
                    <p className="fw-bold fs-4 ms-5 my-4"><span>Rs.</span><span className="mx-1">{value.product.price}</span></p>
                    </Col>
                    <Col lg={7} className='px-4'>
                        <div className="ms-3">
                        <h3 className="my-2">{value.product.productName}</h3>
                        <p className="text-muted fs-5">{value.product.desc}</p>

                        <h3><span>Rs.</span><span className="mx-1">{value.product.price}</span></h3>
                        <p className="fs-5 text-dark">Gift a set of two beautiful looking personalized planters and make the environment go green and fresh. Both the planters are in whitish color with option of personalized name on one of them to make it look special. The other planter has a beautiful New Year wishes on it. ( Only Planter Set) </p>
                        <p className="fs-5 text-dark">{value.product.Key1||value.product.key1}</p>
                        <p className="fs-5 text-dark">{value.product.Key2||value.product.key2}</p>
                        </div>
                    </Col>
                </Row>
                </Card>
           
        </div>)

const output=()=>{
    if(this.state.records.length===0){
        return(<h4 className='fst-italic text-dark' style={{marginTop:'200px',marginLeft:'450px'}}>Your Cart is Empty</h4>)
    }
    if(this.state.records.length!=0){
        return (<div>{renderCart}</div>)
    }
}

var result=output()


        return (
            <div>
                <Row className="my-5">
                    <Col lg={8} className=" border-end border-dark">
                    {result}
                    </Col>
                    <Col lg={4} className=" ">
                    <label className="fw-bold mx-3 mt-5">Qty:</label>
                                    <select className="ms-2" value={productqty}  onChange={e=>{this.updateQty(dataid,bagPrice,productPrice,e)}}  style={{width:"70px",height:"25px"}}>
                                       <option value="1">1</option>
                                       <option value="2">2</option>
                                       <option value="3">3</option>
                                       <option value="4">4</option>
                                       <option value="5">5</option>
                                       
                                    </select>
                    <hr className="mx-3"/>
                    <h4 className='ms-2'>PRICE DETAILS</h4>
                    <Row>
                        <Col>
                        <ol className="list-unstyled text-dark fw-bold ms-3">
                             <li>Total </li>
                             <li>Discount </li>                
                            <li>Tax</li>
                            <li> </li>
                            <li>Delivery Charges</li>
                            </ol>
                        </Col>
                        <Col>
                        <ol className="list-unstyled text-dark fw-bold ms-3">
                             <li ><span>Rs.</span>{total} </li>
                             <li><span>Rs.</span>{discount} </li>                
                            <li><span>Rs.</span>{tax}</li>
                            <li> </li>
                            <li><span>Rs.</span>{delivery}</li>
                            </ol>
                        </Col>
                    </Row>
                    <hr className="mx-3"/>
                    <Row>
                        <Col>
                        <h4 className=" text-dark fw-bold ms-3">Total</h4>
                        </Col>
                        <Col>
                        <h6 className=" fs-4 fw-bold ms-3" style={{color:'#F28606'}}><span>Rs.</span>{bagPrice}</h6>
                        </Col>
                    </Row>
                    <a href='/cart/address' className="btn text-white fw-bold  mt-5" 
                              style={{backgroundColor:"#FF3F6C",width:'600px'}}>PLACE ORDER</a>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default cart
