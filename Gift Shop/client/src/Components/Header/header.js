import React, { Component } from 'react'
import {Navbar,Image,Form,InputGroup,FormControl} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faShoppingCart,faBox} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css'
import jwt_decode from 'jwt-decode'
import Modal from 'react-modal'
import Login from '../profile/login'
import Signup from '../profile/signup'

export class header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      path:'',
       islogin:false,
       isSignup:false
    }
  }
  
  logOut=()=>{
    localStorage.removeItem('token')
}

openCart=()=>{
  if (!localStorage.token){
    alert('you have to login')
    
  }
  else{
    this.setState({path:'/cart'})
  }

}

    render() {

      const buttons=()=>{
        if (!localStorage.token){
          
         return(<p><span style={{marginLeft:"100px",color:'white'}}><FontAwesomeIcon className="mx-4 fw-bold" icon={faUser} />Username</span>
         <a  onClick={()=>{this.setState({islogin:true})}} className="text-white text-decoration-none" style={{marginLeft:"100px"}}>LOGIN</a></p>) 
        }else{
          const token = localStorage.getItem('token')
            const decode=jwt_decode(token)
            const user = decode.user.fullname
            return (
                <div>
                    <p className="text-white "> <FontAwesomeIcon className="mx-4 fw-bold" icon={faUser} /><span>{user} </span>
                    <a href='/cart/order' className="text-white text-decoration-none mx-4"><FontAwesomeIcon className="mx-1 fw-bold" icon={faBox} /> My orders</a>
                    <a href="/" onClick={this.logOut} className="text-decoration-none text-white  mx-4">Logout</a>  </p>
                </div>
            )
         
        }
      }

      const output=buttons()
        return (
            <div>
               <Navbar style={{backgroundColor:"#F28606"}} >
                  
    <Navbar.Brand href="/" style={{marginLeft:"70px"}}>
      <Image
        alt="brandlogo"
        src="/images/logo.png"
        width="50"
        height="50"
        roundedCircle
      />
     <span className="text-white mx-3 ">Gift Shop</span>
    </Navbar.Brand>
    <Form style={{marginLeft:"700px"}}>
    <InputGroup >
      <InputGroup.Prepend >
        <InputGroup.Text style={{backgroundColor:"#F28606"}}  className="border-white border-end-0 "><FontAwesomeIcon style={{color:'white', height:'25px'}} icon={faSearch} /></InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
      
      style={{backgroundColor:"#F28606"}}
        placeholder="Search"
        className="border-start-0 border-white  search"
      />
    </InputGroup>
  </Form>
 <span style={{marginTop:"15px"}}>{output}</span>
   {/* <p style={{marginLeft:"100px",color:'white',marginTop:"15px"}}><FontAwesomeIcon className="mx-4 fw-bold" icon={faUser} />Username</p>
   <a  onClick={()=>{this.setState({islogin:true})}} className="text-white text-decoration-none" style={{marginLeft:"100px"}}>LOGIN</a> */}

   <a href={this.state.path} onClick={this.openCart} className="text-white text-decoration-none" style={{marginLeft:"100px"}}><FontAwesomeIcon className='mx-3' icon={faShoppingCart} />CART</a>
  </Navbar> 

  <Modal isOpen={this.state.islogin} style={{overlay:{backgroundColor:"#00000066"},content:{width:'30%',height:'60%',marginLeft:'600px',marginTop:'100px'}}}>
          <button onClick={()=>{this.setState({islogin:false})}} className="btn fw-bold tex-dark" style={{marginLeft:"500px"}}>X</button>
          <Login/>
          <p style={{marginLeft:"100px"}} className="text-muted fw-bold ">New User ?<a className="text-dark text-decoration-none" style={{marginLeft:"100px"}} onClick={()=>{this.setState({isSignup:true,islogin:false})}}>Register</a></p>
  </Modal>
  <Modal isOpen={this.state.isSignup} style={{overlay:{backgroundColor:"#00000066"},content:{width:'30%',height:'60%',marginLeft:'600px',marginTop:'100px'}}} >
  <button onClick={()=>{this.setState({isSignup:false})}} className="btn fw-bold tex-dark" style={{marginLeft:"500px"}}>X</button>
         <Signup /> 
         <p style={{marginLeft:"100px"}} className="text-muted fw-bold ">Already have an account ?<a className="text-dark text-decoration-none" style={{marginLeft:"100px"}} onClick={()=>{this.setState({islogin:true})}}>Login</a></p>
  </Modal>
            </div>
        )
    }
}

export default header
