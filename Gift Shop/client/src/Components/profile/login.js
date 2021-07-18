import React, { Component } from 'react'
import Axios from 'axios'

export class register extends Component {
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
       const data={
                  e_mail:this.state.e_mail,
                password:this.state.password
       }

       if (this.isFormvalid()){
        console.log('working')
        this.setState({errors:[]})
        console.log('going to see axios')

        Axios.post('http://localhost:8000/login',data)
        .then((response)=>{
            console.log(response.data)
            if(response.data==="Username not found"){
                alert('Username not found')
                window.location='/login'
            }else if (response.data==="Password Incorrect"){
                alert('Password Incorrect')
               
            }else{
                alert("Login Successful")
                localStorage.setItem('token',response.data)
                window.location='/'
               
            }   
        })
        .catch((err)=>{console.log(err)})

        console.log(data)
    }

    }

    isFormvalid=()=>{
        let error
        let errorsArray=this.state.errors;
        if(this.isFormempty(this.state)){
           
            error={message:"Fill in all the fields"}
            errorsArray.push(error)
            console.log(error)
           this.setState({errors:errorsArray})
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
            <p className=" text-danger fw-bold" style={{marginLeft:"80px"}}>{error.message}</p>
       )
      
    }
    
    render() {
        return (
            <div className="my-3 mx-5">
                <h1>Login</h1>
                <form className="my-4">
                <input type="email" name="e_mail" className="form-control w-100 rounded-5 my-5 border-0 border-bottom" value={this.state.e_mail}   onChange={(e)=>this.handleChange(e)}  placeholder=" E-mail" />
                <input type="password" name="password" className="form-control w-50 rounded-5 my-5 border-0 border-bottom w-100" value={this.state.password}   onChange={(e)=>this.handleChange(e)}  placeholder="Password" />
                <p>{this.state.errors.length >0 &&(
                            <div>
                                {this.displayerrors(this.state.errors)}
                            </div>
                        )}</p>
                <button className="btn w-50  text-white" style={{backgroundColor:"#F28606",marginLeft:"100px"}} onClick={this.handleSubmit}>LOGIN</button>
                </form>
            </div>
        )
    }
}

export default register
