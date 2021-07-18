import React, { Component } from 'react'
import {Card,Row,Col,Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import {Link} from 'react-router-dom'


export class login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             e_mail:"",
             password:"",
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
       
       e_mail:this.state.e_mail,
       password:this.state.password,
      
   }

   if (this.isFormvalid()){
    console.log('working')
    this.setState({errors:[]})
    console.log('going to see axios')

    Axios.post('http://localhost:8000/login',data)

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
        
        }else{
            this.setState({errors:[]})
            return true;
        }
    }

    isFormempty=({e_mail,password})=>{
        console.log("you are in isFormempty")
       
           if(
           !e_mail.length||
            !password.length
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
                <Card style={{backgroundColor:""}} className=" text-start w-50 mx-auto border-0 mt-5">
                <Card.Header className="fw-bold text-start py-3 text-white " style={{backgroundColor:"#44AFE1",height:"50px"}}><span className="ml-5"> Register</span></Card.Header>
                   <Card.Body className="p-4" style={{marginLeft:"100px"}}>
                   <span className="fw-bold ms-5">REGISTRATION FORM</span>
                        <form className="my-5">
                        <label className="my-3 fw-bold me-5 text-start">E-Mail:</label>
                                    <input type="email" name="e_mail" value={this.state.e_mail} onChange={(e)=>this.handleChange(e)} style={{width:"300px",height:"30px",marginLeft:"60px"}} /><br/>

                                    <label className="my-3 fw-bold me-5 text-left">Password :</label>
                                    <input type="password" name="password" onChange={(e)=>this.handleChange(e)} value={this.state.password} style={{width:"300px",height:"30px",marginLeft:"60px"}}/><br/>
                                    <p className="text-danger my-4">{this.state.errors.length>0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>

                                <a type="reset" className="btn border-1 border-dark mt-5 fw-bold " href="/login" style={{width:"130px"}}>Cancel</a>
                                <a type="submit" className="btn border-1 border-dark mt-5 mx-4 fw-bold" href="" onClick={this.handleSubmit} style={{width:"130px"}}>SUBMIT</a>
                        </form>

                        <p className="fw-bold">If you are new , please Register <Link to={'/register'} className="text-decoration-none ms-5"><span className=" text-dark  ">Sign Up</span></Link></p>
                   </Card.Body>
                   </Card>
                   </Col>

                   </Row>
            </div>
        )
    }
}

export default login
