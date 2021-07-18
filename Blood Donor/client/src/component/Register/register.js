import React, { Component } from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';



export class register extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fullname:"",
            e_mail:"",
            password:"",
            confirm_password:"",
            city:'',
            state:'',
            district:'',
            phone_number:'',
            country:'',
            availability:'',
            blood_group:'',
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
           fullname:this.state.fullname,
           gender:this.state.gender,
           e_mail:this.state.e_mail,
           password:this.state.password,
           confirm_password:this.state.confirm_password,
           city:this.state.city,
            state:this.state.state,
            district:this.state.district,
            phone_number:this.state.phone_number,
            country:this.state.country,
            availability:this.state.availability,
            blood_group:this.state.blood_group
       }

       if (this.isFormvalid()){
        console.log('working')
        this.setState({errors:[]})
        console.log('going to see axios')

        Axios.post('http://localhost:8000/signup',data)

       
        
        console.log(data)
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
        }else if (!this.isPasswordvalid(this.state)){

            console.log("your password is not matching")
           error={message:"Password is invalid"}

           console.log(error)
           errorsArray.push(error)
           this.setState({errors:errorsArray})
        //    this.setState({errors:errors.concat(error)})
        }else{
            this.setState({errors:[]})
            return true;
        }
    }

    // to check whether password matches with confirm password
    isPasswordvalid=({password,confirm_password})=>{
      
        console.log("we are in isPassword Valid")
        if (password===confirm_password){
            return true
        }else{
            return false
        }
    }

    // to check whether the form is empty or not
    isFormempty=({fullname,e_mail,password,confirm_password,city,state,district,blood_group,country,phone_number,availability})=>{
        console.log("you are in isFormempty")
       
           if(!fullname.length||
           !e_mail.length||
           !city.length||! blood_group||
           !state.length||
          ! district.length||
          !country.length||
          !phone_number.length||
         ! availability.length||
            !password.length||
            !confirm_password.length) {
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
        return (
            <div>
               <Row>
                <Col lg={3} style={{backgroundColor:"#FAEDED",height:"1000px"}}>
                    <ul className="text-danger list-unstyled text-start ms-3 mt-4  ">
                        <li className="my-3"><img width="10px" className="mx-2" src="./images/Polygon.png"/>About</li>
                        <li className="my-3"><img width="10px" className="mx-2" src="./images/Polygon.png"/> Visions & Missions</li>
                        <li className="my-3"><img width="10px" className="mx-2" src="./images/Polygon.png"/> People Behind</li>
                    </ul>
                    
                    
                    </Col>
                <Col lg={9}>
                    <Card className="m-4 border border-info" >
                        <Card.Header className="fw-bold text-start " style={{backgroundColor:"#44AFE1"}}><span className="ms-5">About Blood Donors : Register</span></Card.Header>
                         <Card.Body>
                            <span className="fw-bold">REGISTRATION FORM</span>
                            

                                <form className="py-5">
                                    <label className="my-3 fw-bold me-5" style={{left:"10%"}}>Full Name :</label>
                                    <input type="text" name="fullname" onChange={(e)=>this.handleChange(e)}  style={{width:"300px",height:"30px",marginLeft:"60px"}} value={this.state.fullname}/><br/>

                                    <label className="my-3 fw-bold me-5 text-start" >Phone Number :</label>
                                    <input type="number" name="phone_number" onChange={(e)=>this.handleChange(e)}  style={{width:"300px",height:"30px",marginLeft:"60px"}} value={this.state.phone_number}/><br/>
                              
                                <label className="my-3 fw-bold me-5 text-start">Mail-id:</label>
                                    <input type="email" name="e_mail" onChange={(e)=>this.handleChange(e)}   style={{width:"300px",height:"30px",marginLeft:"60px"}} value={this.state.e_mail}/><br/>
                              
                                <label className="my-3 fw-bold me-5 text-left">Password :</label>
                                    <input type="password" name="password"  onChange={(e)=>this.handleChange(e)}  style={{width:"300px",height:"30px",marginLeft:"60px"}} value={this.state.password}/><br/>
                                
                                <label className="my-3 fw-bold me-5 text-start">Confirm Password:</label>
                                    <input type="password" name="confirm_password" onChange={(e)=>this.handleChange(e)}   style={{width:"300px",height:"30px",marginLeft:"60px"}} value={this.state.confirm_password}/><br/>
                           
                                    <label className="my-3 fw-bold me-5 text-start">Select Country:</label>
                                    <select className="ml-5 rounded-1 " name="country" onChange={(e)=>this.handleChange(e)}   value={this.state.country} style={{width:"300px",height:"30px",marginLeft:"40px"}}>
                                    <options> </options>
                                        <option>India</option>
                                        <option>Other Countries</option>
                                        
                                    </select><br/>

                                    <label className="my-3 fw-bold me-5 text-start">Select Blood Group :</label>
                                    <select className="ml-5 rounded-1 " name="blood_group" onChange={(e)=>this.handleChange(e)}   value={this.state.blood_group} style={{width:"300px",height:"30px",marginLeft:"40px"}}>
                                    <options> </options>
                                        <option>A</option>
                                        <option>O</option>
                                        
                                    </select><br/>

                                    <label className="my-3 fw-bold me-5 text-start">Select State:</label>
                                    <select className="ml-5 rounded-1 " name="state" onChange={(e)=>this.handleChange(e)}   value={this.state.state} style={{width:"300px",height:"30px",marginLeft:"60px"}}>
                                        <options> </options>
                                        <option>Tamilnadu</option>
                                        <option>Maharashtra</option>
                                        <option>Andhra pradesh</option>
                                        <option>Punjab</option>
                                    </select><br/>
                                    <label className="my-3 fw-bold me-5 fs-start">Select District:</label>
                                   <span> <select className="ml-5 rounded-1 " name="district" onChange={(e)=>this.handleChange(e)}   value={this.state.district} style={{width:"300px",height:"30px",marginLeft:"40px"}}>
                                        <options> </options>
                                        <option>Ariyalur</option>
                                        <option>Coimbatore</option>
                                        <option>Chennai</option>
                                        <option>Warangal</option>
                                        <option>Shaniwarwaada</option>
                                        <option>Mumbai</option>
                                    </select></span><br/>
                                    <label className="my-3 fw-bold me-5 fs-start">Select City:</label>
                                    <select className="ml-5 rounded-1" name="city" value={this.state.city} onChange={(e)=>this.handleChange(e)}  style={{width:"300px",height:"30px",marginLeft:"60px"}}>
                                    <option>Trichy</option>
                                        <option>Sulur</option>
                                        <option>kurnool</option>
                                        <option>dallal street</option>
                                        <option>film city</option>
                                    </select><br/>

                                    <label className="my-3 fw-bold me-5 fs-start">Please Confirm your availability to donate blood:</label>
                                    <select className="ml-5 rounded-1" name="availability" value={this.state.availability} onChange={(e)=>this.handleChange(e)}   style={{width:"300px",height:"30px",marginLeft:"60px"}}>
                                         <options> </options>
                                        <option>Available</option>
                                        <option>unavailable</option>
                                        
                                    </select><br/>

                                    <p className="text-danger my-4">{this.state.errors.length>0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>


                                    <button  className="btn text-dark border border-1 border-dark fw-bold" onClick={this.handleSubmit}>SUBMIT</button>
                                    <a href="/register" className="btn text-dark border border-1 border-dark fw-bold mx-3" >Cancel</a>
                                </form>
                        </Card.Body>
                    </Card>
                    
                    
                    
                    </Col>

               </Row>
            </div>
        )
    }
}

export default register
