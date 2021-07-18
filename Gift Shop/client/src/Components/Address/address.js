import React, { Component } from 'react'
import { Row,Image,Col,Card,Button,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode'
import Axios from 'axios';
import Modal from 'react-modal'
import './address.css'
import Update from './editAddress'

export class address extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            editModal:false,
            name:"",
            door_no:"",
            street:"",
            district:"",
            state:"",
            pincode:"",
            locality:"",
            addresstype:"",
             records:[],
             isOpen:false,
             editAddressid:"",
             phone_no:"",
             errors:[],
             address:[],
             delivery:"-",
             singleAddress:{},
             addressID:""
        }
    }
    componentDidMount(){
       
            
            const token =localStorage.getItem('token')
        const decoded = jwt_decode(token)
        const user= decoded.user.id

        Axios.post('http://localhost:8000/cart/getUser',{user})
        .then((response)=>{
            console.log(response.data)
            this.setState({records:response.data})
            this.addressRecord()
           
        }).catch((err)=> {
            console.log(err)
        })
       
    }

    addressRecord=()=>{
        const token =localStorage.getItem('token')
        const decoded = jwt_decode(token)
        const userID= decoded.user.id

        console.log("got the addresses")
        Axios.post('http://localhost:8000/address/get',{userID})
        .then((response)=>{
            this.setState({address:response.data})
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    deleteAddress=(id)=>{
        console.log('delete is working')
        Axios.post('http://localhost:8000/address/delete',{id})
        .then((response)=>{
            alert('Address deleted successfully')
            this.setState({address:response.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
       }

    handleSubmit=(event)=>{
        event.preventDefault()
        console.log('handleSubmit is working')
    
        const token =localStorage.getItem('token')
        const decoded = jwt_decode(token)
        const id= decoded.user.id
    
       var data={
        user:id,
        name:this.state.name,
        door_no:this.state.door_no,
        street:this.state.street,
        district:this.state.district,
        state:this.state.state,
        pincode:this.state.pincode,
        locality:this.state.locality,
        addresstype:this.state.addresstype,
        phone_no:this.state.phone_no
        }
    if (this.isformValid()){
        this.setState({errors:[]})
        Axios.post('http://localhost:8000/address/add',data)
        .then(()=>{
            alert('Address added Successfully')
            this.setState({isOpen:false})
            window.location="/cart/address"
        }).catch((err)=>{
            console.log(err)
        })
    }
    

   }

   isformValid=()=>{
            let error
                let errorsArray=this.state.errors;
                    if(this.isFormempty(this.state)){
                             console.log('your form is empty')
                             error={message:"Fill in all the fields"}
                             errorsArray.push(error)
                             console.log(error)
                                 this.setState({errors:errorsArray})
                                 errorsArray=[]
                    }else if (!this.isPhonenoValid(this.state)){
                        error={message:"Phone Number must contain 10 numbers"}
                        errorsArray.push(error)
                        this.setState({errors:errorsArray})
                        errorsArray=[]
                    }
                    else{
                        this.setState({errors:[]})
                        return true;
                    }
   }

   isPhonenoValid=({phone_no})=>{
        if(phone_no.length===10){
            return true
        }else{
            return false
        }
   }

   isFormempty=({name,door_no,street,district,state,pincode,locality,addresstype,phone_no})=>{
    console.log("you are in isFormempty")
   
       if(!name.length||
       !door_no.length||!phone_no.length||
        !street.length||
        !district.length||
        !state.length||!pincode.length||!locality.length||!addresstype.length) {
            return true
        }else{
            return false
        }
   
}
handleAddress=(addressid)=>{  
    this.setState({addressID:addressid})
}

handleEdit=(id)=>{

    this.setState({editModal:true})

    console.log(id)

    this.setState({ editAddressid:id})

    // Axios.post('http://localhost:7000/address/getone',{id})
    // .then((response)=>{
    //     console.log(response.data)
    //     this.setState({singleAddress:response.data})
    // }).catch((err)=>{
    //     console.log(err)
    // })
}

displayerrors=(errormsg)=>{
    console.log("we are in displayerrors")

    console.log(errormsg)

 return  errormsg.map((error)=> 
        <p>{error.message}</p>
   )
  
}

placeOrder=(price)=>{

    var totalPrice=0
    console.log("PlaceOrder is working")

    const token =localStorage.getItem('token')
    const decoded = jwt_decode(token)
    const id= decoded.user.id
    const addressId = this.state.addressID
    
    if(price>=1000){
        var totalPrice=Math.floor(price-price*10/100+40+price*3.5/100)
    }else{
        var  totalPrice=Math.floor(price-price*10/100+price*3.5/100)
    }
    var cartid=this.state.records.map((value)=>
    value._id)
    
    Axios.post('http://localhost:8000/order/add',{id,cartid,addressId,totalPrice})
    .then((value)=>{
        alert("order placed Successfully")
        window.location="/cart/order"
    })
}

    render() {

        var amount=this.state.records.map((value)=>{
            return value.price
        })
        var renderProduct=this.state.records.map((value)=><div className='border border-dark p-4 image'><img src={value.product.imgURL} className='border border-bottom-0 border-dark ms-2 ' width="500px" height="500px" alt={value.product.productName} /><p className="fw-bold my-3 fs-4" style={{marginLeft:"200px"}}><span>Rs.</span><span>{value.price}</span></p></div>)
        var renderAddress=this.state.address.map((data)=>
        <Col lg={3} className="mx-3 my-4">
            <Card >
                <div className="text-start px-4 py-2">
                <span> <input type="radio" onClick={()=>this.handleAddress(data._id)} name="address"/>  <span className="fw-bold fs-6">{data.name}</span></span>
                <p className="text-dark my-2 mx-2">{data.door_no},</p>
                <p><span  className="mx-2">{data.street}</span>,</p>
                <p><span  className="mx-2">{data.locality}</span>,</p>
                <p><span  className="mx-2">{data.district}</span>,</p>
                <p><span  className="mx-2">{data.state}</span>-<span>{data.pincode}</span></p>
                <p className="mx-2">Mobile  No:<span  className="mx-2 fw-bold">{data.phone_no}</span></p>
                </div>
                <Card.Footer className="py-2 text-start">
                    <a href="/cart/address" className="ml-3 text-decoration-none button fw-bold" onClick={()=>this.deleteAddress(data._id)}>Remove</a>
                    <span className="mx-4">|</span>
                    <a  className="ml-3 text-decoration-none button fw-bold" onClick={()=>this.handleEdit(data._id)}>Edit</a>
                </Card.Footer>
                </Card>
       </Col>
      

   
   )
        return (
            <div>
                <Row className="my-5 mx-5">
                <Col lg={8} className="border-2 border-end border-dark">  
                     <h5 class="fw-bold text-start">Select Delivery Address</h5>
                        <Row className="my-4">
                               {renderAddress}
                                <Col lg={3}>
                                     <div className="card my-4 " style={{width:"300px",height:"300px"}}>
                                         <div>
                                                <span style={{textAlign:"center"}}><button href="" id="plus" style={{marginTop:"100px",marginLeft:'130px'}}
                                                 className=" border-dark border-2 btn fw-bold fs-5 bg-white  rounded-circle " onClick={()=>this.setState({isOpen:true})}>+</button>
                                                <p className="text-dark fw-bold">Add new address</p>
                                                 </span>
                                         </div>
                                        </div>
                                </Col>
                        </Row>
                 </Col>
                 <Col lg={4}>
                     {renderProduct}
                     <Button className='btn my-4 ms-4 fw-bold fs-5' onClick={()=>{this.placeOrder(amount)}} style={{width:'500px',backgroundColor:""}}>Proceed</Button>
                 </Col>
                </Row> 

                <Modal isOpen={this.state.isOpen}  style={{overlay:{backgroundColor:"#00000066"},content:{width:'40%',height:'80%',marginLeft:'350px',marginTop:'34px'}}} >
            <Container>
                <h5 className="mb-3 fw-bold">Add Address</h5>
            <form className="my-4" >
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Enter Name</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="name" onChange={(e)=>this.handleChange(e)} value={this.state.name}  placeholder="Enter recepient name" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Door No</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="door_no" onChange={(e)=>this.handleChange(e)} value={this.state.door_no} placeholder="Door no (eg: 35H)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Street</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="street" onChange={(e)=>this.handleChange(e)}  value={this.state.street} placeholder="street" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Locality</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="locality" onChange={(e)=>this.handleChange(e)} value={this.state.locality}  placeholder="eg(Taluk)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">District</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="district" onChange={(e)=>this.handleChange(e)} value={this.state.district}  placeholder="eg(Coimbatore)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">State</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="state" onChange={(e)=>this.handleChange(e)} value={this.state.state}  placeholder="eg(Tamil Nadu)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Pincode</label>
                        <input type="number" className="form-control w-100 rounded-0 mb-3"   name="pincode"  onChange={(e)=>this.handleChange(e)} value={this.state.pincode}  placeholder="eg(641603)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Phone No</label>
                        <input type="number" className="form-control w-100 rounded-0 mb-3"   name="phone_no"  onChange={(e)=>this.handleChange(e)} value={this.state.phone_no}  placeholder="eg(9987605432)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Address Type</label>
                        <select className="form-control w-100 rounded-0 mb-3" name="addresstype" value={this.state.addresstype} onChange={(e)=>this.handleChange(e)}>
                        <option>Home</option>
                        <option>Office</option>
                        </select>

                        <p className=" my-4 text-danger fw-bold" style={{marginLeft:"180px"}}>{this.state.errors.length>0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>


               <span className=" ml-5" >
                <a  className="btn text-white fw-bold  mx-3" onClick={this.handleSubmit} style={{backgroundColor:"#FF3F6C",width:"200px"}}>Add</a>
                <a className="btn text-dark fw-bold mx-3 border" type="reset" style={{width:"200px"}} onClick={()=>this.setState({isOpen:false})}>Cancel</a>
                </span>
            </form>
            </Container>
            </Modal>

            <Modal isOpen={this.state.editModal} style={{overlay:{backgroundColor:"#00000066"},content:{width:'40%',height:'80%',marginLeft:'350px',marginTop:'34px'}}}>
                
                <Update values={this.state. editAddressid}/>  
                <button className="btn border border-dark border-1 w-50" style={{marginLeft:"115px",width:"318px"}} onClick={()=>this.setState({editModal:false})}>Cancel</button>
                
              


            </Modal>
            </div>
        )
    }
}

export default address
