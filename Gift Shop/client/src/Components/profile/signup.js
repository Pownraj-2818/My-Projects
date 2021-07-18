import React, { Component } from 'react'
import Axios from 'axios'

export class signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            e_mail:'',
             password:'',
             phone_no:'',
             fullname:'',
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
            phone_no:this.state.phone_no,
            e_mail:this.state.e_mail,
            password:this.state.password,
            
        }
        
 
         if (this.isFormvalid()){
             console.log('working')
             this.setState({errors:[]})
             console.log('going to see axios')
 
             Axios.post('http://localhost:8000/signup',data)
             .then(()=>{
                 alert('Registered Successfully')
                 window.location='/'
                
             }).catch((err)=>{
                 console.log(err)
             })
             console.log(data)
         } 
     }
    

    isFormvalid=()=>{
        console.log("you are in isForm valid")

        
        let error
        let errorsArray=this.state.errors;
        if(this.isFormempty(this.state)){
            console.log('your form is empty')
            error={message:"Fill in all the fields"}
            errorsArray.push(error)
            console.log(error)
           this.setState({errors:errorsArray})
            console.log(this.state.errors)

            console.log(this.state.password)
           

            

            errorsArray=[]
        }
        else{
            this.setState({errors:[]})
            return true;
        }
    }

    isFormempty=({fullname,e_mail,password,phone_no})=>{
        console.log("you are in isFormempty")
       
           if(!fullname.length||
           !phone_no.length||
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
            <p className=" text-danger fw-bold" style={{marginLeft:"80px"}}>{error.message}</p>
       )
      
    }

    render() {
        return (
            <div>
                <div className="my-3 mx-5">
                <h1>Register</h1>
                <form className="my-4">
                <input type="text" name="fullname" className="form-control w-100 rounded-5 my-5 border-0 border-bottom" onChange={(e)=>this.handleChange(e)} value={this.state.fullname}    placeholder="Fullname" />
                <input type="number" name="phone_no" className="form-control w-100 rounded-5 my-5 border-0 border-bottom" onChange={(e)=>this.handleChange(e)} value={this.state.phone_no}    placeholder=" phone Number" />
                <input type="email" name="e_mail" className="form-control w-100 rounded-5 my-5 border-0 border-bottom" onChange={(e)=>this.handleChange(e)} value={this.state.email}    placeholder=" E-mail" />
                <input type="password" name="password" className="form-control w-50 rounded-5 my-5 border-0 border-bottom w-100" onChange={(e)=>this.handleChange(e)} value={this.state.password}    placeholder="Password" />

                <p>{this.state.errors.length>0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>
                        
                <button onClick={this.handleSubmit} className="btn w-50  text-white" style={{backgroundColor:"#F28606",marginLeft:"100px"}} >SIGNUP</button>
                </form>
            </div>
            </div>
        )
    }
}

export default signup
