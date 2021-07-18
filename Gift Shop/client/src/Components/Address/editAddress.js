import React, { Component } from 'react'
import {Row,Col,Card,Button,Image, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode'
import Axios from 'axios'
import axios from 'axios';


export class editAddress extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:"",
            door_no:"",
            street:"",
            district:"",
            state:"",
            pincode:"",
            locality:"",
            addresstype:"",
            phone_no:"",
            errors:[],
            record:{}
        }
    }

  
   componentDidMount(){
       var id=this.props.values

       axios.post('http://localhost:8000/address/getone',{id})
       .then((response)=>{
            this.setState({record:response.data})
            this.setState({name:this.state.record.name})
            this.setState({door_no:this.state.record.door_no})
            this.setState({street:this.state.record.street})
            this.setState({district:this.state.record.district})
            this.setState({pincode:this.state.record.pincode})
            this.setState({locality:this.state.record.locality})
            this.setState({state:this.state.record.state})
            this.setState({phone_no:this.state.record.phone_no})
            this.setState({addresstype:this.state.record.addresstype})
       }).catch((err)=>{
           console.log(err)
       })
   }
    
   handleChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
   }

   handleSubmit=()=>{

    const token =localStorage.getItem('token')
    const decoded = jwt_decode(token)

    const userID= decoded.user.id
    console.log(userID)


        console.log("working")

        var data={
            id:this.props.values,
            name:this.state.name,
            door_no:this.state.door_no,
            street:this.state.street,
            locality:this.state.locality,
            district:this.state.district,
            state:this.state.state,
            pincode:this.state.pincode,
            addresstype:this.state.addresstype,
            phone_no:this.state.phone_no
        }

        console.log(data)
        Axios.put("http://localhost:8000/address/update",{data})
        .then((response)=>{
            this.setState({record:response.data})
            alert("Address updated Successfully")
            window.location="/cart/address"
        }).catch((err)=>{
            console.log(err)
        })

          
        
       }
   


   

  


    render() {
        return (
            <div>
               
                <Container>
                <h5 className="mb-3 fw-bold">Edit Address</h5>
            <form className="my-4" >
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Your Name</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="name" onChange={this.handleChange} value={this.state.name}  placeholder="Enter recepient name" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Your Door No</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="door_no" onChange={this.handleChange} value={this.state.door_no} placeholder="Door no (eg: 35H)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold"> Your Street</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="street" onChange={this.handleChange}  value={this.state.street} placeholder="street" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Your Locality</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="locality" onChange={this.handleChange} value={this.state.locality}  placeholder="eg(Taluk)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Your District</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="district" onChange={this.handleChange} value={this.state.district}  placeholder="eg(Coimbatore)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Your State</label>
                        <input type="text" className="form-control w-100 rounded-0 mb-3"   name="state" onChange={this.handleChange} value={this.state.state}  placeholder="eg(Tamil Nadu)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Your Pincode</label>
                        <input type="number" className="form-control w-100 rounded-0 mb-3"   name="pincode"  onChange={this.handleChange} value={this.state.pincode}  placeholder="eg(641603)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Your Phone No</label>
                        <input type="number" className="form-control w-100 rounded-0 mb-3"   name="phone_no"  onChange={this.handleChange} value={this.state.phone_no}  placeholder="eg(9987605432)" />
                        <label style={{marginRight:"80%"}} className="mb-3 fw-bold">Address Type</label>
                        <select className="form-control w-100 rounded-0 mb-3" name="addresstype" value={this.state.addresstype} onChange={this.handleChange}>
                        <option>Home</option>
                        <option>Office</option>
                        </select>

                        


               <span className=" ml-5" >
                <a  className="btn text-white fw-bold " onClick={this.handleSubmit} style={{backgroundColor:"#FF3F6C",marginLeft:"110px",width:"348px"}}>Edit</a>
                </span>
            </form>
            </Container>
            </div>
        )
    }
}

export default editAddress
