import React, { Component } from 'react'
import {Card,Row,Col,Image} from 'react-bootstrap'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Link} from 'react-router-dom'

export class search extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             blood_group:"",
             city:"",
             state:'',
             country:'',
             district:'',
             records:[],
             errors:[]
             
        }
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
        }

        handleSubmit=(event)=>{
            event.preventDefault()
           console.log('handleSubmit is working')
    
          var data={
               
               city:this.state.city,
                state:this.state.state,
                district:this.state.district,
                country:this.state.country,
                blood_group:this.state.blood_group
           }
    
           if (this.isFormvalid()){
            console.log('working')
            this.setState({errors:[]})
            console.log('going to see axios')
    
            Axios.post('http://localhost:8000/filters',data)
            .then((response)=>this.setState({records:response.data}))
            .catch((err)=>console.log(err))
            
            
           
            
        }
    
        }

        

        isFormvalid=()=>{
            console.log("you are in isForm valid")
    
            // console.log(this.state.gender)
            let error
            let errorsArray=this.state.errors;
    
            if(this.isFormempty(this.state)){
                console.log('your form is empty')
                error={message:"Fill in all the fields"}
                errorsArray.push(error)
                console.log(error)
    
               this.setState({errors:errorsArray})
                // console.log(this.state.errors)
    
                // console.log(this.state.password)
                // console.log(this.state.confirm_password)
    
                
    
                errorsArray=[]
            }else{
                this.setState({errors:[]})
                return true;
            }
        }


        isFormempty=({city,state,district,blood_group,country})=>{
            console.log("you are in isFormempty")
           
               if(
              
               !city.length||!blood_group.length||
               !state.length||
              ! district.length||
              !country.length
              ) {
                    return true
                }else{
                    return false
                }
           
        }


        displayerrors=(errormsg)=>{
            console.log("we are in displayerrors")
    
            console.log(errormsg)
    
         return  errormsg.map((error)=> 
                <p>{error.message}</p>
           )
          
        }
    
    render() {

        const renderRows=this.state.records.map((value)=><tr className="border-1 border border-dark" key={value.id}><td className="border-1 border border-dark">{value.fullname}</td><td className="border-1 border border-dark">{value.availability}</td><td className="border-1 border border-dark">{value.phone_number}</td><td className="border-1 border border-dark">{value.city}</td><td className="border-1 border border-dark">{value.district}</td><td className="border-1 border border-dark">{value.state}</td></tr>)
        return (
            <div className="p-5">
               <Card style={{backgroundColor:"#C42522"}} className="text-white text-start w-50 mx-auto">
                   <Card.Body className="p-4" style={{marginLeft:"100px"}}>
                       <span className="fs-4">Find Blood Donors</span><br/>
                                <form>
                                    <label className="my-5 fw-bold me-5">Blood Group</label>
                                    <select className="ml-5 rounded-1 " name="blood_group"  value={this.state.blood_group} onChange={(e)=>this.handleChange(e)}  style={{width:"300px",height:"30px",marginLeft:"50px"}}>
                                        <option>A</option>
                                        <option>O</option>
                                       
                                    </select><br/>
                                    <label className="my-5 fw-bold me-5">Select Country</label>
                                    <select className="ml-5 rounded-1 " name="country"  value={this.state.country} onChange={(e)=>this.handleChange(e)} style={{width:"300px",height:"30px",marginLeft:"40px"}}>
                                    <option></option>
                                        <option>India</option>
                                        <option>Other Countries</option>
                                      
                                    </select><br/>
                                    <label className="my-5 fw-bold me-5">Select State</label>
                                    <select className="ml-5 rounded-1 " name="state"  value={this.state.state} onChange={(e)=>this.handleChange(e)} style={{width:"300px",height:"30px",marginLeft:"60px"}}>
                                    <options> </options>
                                        <option>Tamilnadu</option>
                                        <option>Maharashtra</option>
                                        <option>Andhra pradesh</option>
                                        <option>Punjab</option>
                                    </select><br/>
                                    <label className="my-5 fw-bold me-5 ">Select District</label>
                                   <span> <select className="ml-5 rounded-1 " name="district"  value={this.state.district} onChange={(e)=>this.handleChange(e)} style={{width:"300px",height:"30px",marginLeft:"40px"}}>
                                   <options> </options>
                                        <option>Ariyalur</option>
                                        <option>Coimbatore</option>
                                        <option>Chennai</option>
                                        <option>Warangal</option>
                                        <option>Shaniwarwaada</option>
                                        <option>Mumbai</option>
                                    </select></span><br/>
                                    <label className="my-5 fw-bold me-5">Select City</label>
                                    <select className="ml-5 rounded-1" name="city"  value={this.state.city} onChange={(e)=>this.handleChange(e)} style={{width:"300px",height:"30px",marginLeft:"60px"}}>
                                    <option>Tirupur</option>
                                        <option>Trichy</option>
                                        <option>Sulur</option>
                                        <option>kurnool</option>
                                        <option>dallal street</option>
                                        <option>film city</option>
                                    </select><br/>

                                    <p className="text-dark my-4">{this.state.errors.length>0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>

                                <button type="submit" onClick={this.handleSubmit}  style={{marginLeft:"200px"}}className="btn text-dark fw-bold bg-white">Submit</button>
                                <button  href="/search" style={{marginLeft:"50px"}}className="btn text-dark fw-bold bg-white">Cancel</button>
                                </form>

                   </Card.Body>
               </Card>
               <Link to={'/register'}><Image className="my-4 border border-2 border-danger" src="/images/slide.jpg" /></Link>



               <table className="table mt-4 border-1 border-dark">
  <thead className="border-1 border border-dark bg-info">
    <tr>
      <th className="border-1 border border-dark" scope="col">Name</th>
      <th className="border-1 border border-dark" scope="col">Available/unavailable</th>
      <th className="border-1 border border-dark" scope="col">Mobile.No</th>
      <th className="border-1 border border-dark" scope="col">City</th>
      <th className="border-1 border border-dark" scope="col">District</th>
      <th className="border-1 border border-dark" scope="col">State</th>
    </tr>
  </thead>


  <tbody className="border-1 border border-dark">
    {renderRows}
  </tbody>
</table>                      
            

            </div>
        )
    }
}

export default search
