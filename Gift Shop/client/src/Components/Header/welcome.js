import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css';

function welcome (props) {

  if(!localStorage.userToken){
    return (
        <div>
            
        </div>
    )
  }else{
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)
    const name=decoded.user.fullname
    console.log(name)
      return(<div>
          <p className="fw-bold text-dark fs-5">{name}</p>
      </div>)
      
  }
        
    
}

export default welcome

