import React, { Component } from 'react'
import {Navbar,Nav,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export class header extends Component {

    
    render() {
        return (
            <div>
               
                <Navbar style={{backgroundColor:"#C42522"}} expand="lg">
                <Navbar.Brand href="/home" className="text-white fw-bold"><Image src="/images/logo.png" className="mx-4"/><span className="mt-4">Blood Donor</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{marginLeft:"1100px"}}>
                    
                     <Nav.Link href="/search" className="text-white fw-bold mx-3">Find a Blood Donor</Nav.Link>
                     <Nav.Link href="/register" className="text-white fw-bold">Register</Nav.Link>
                     <Nav.Link href="/login" className="text-white fw-bold">Login</Nav.Link>
                   
                    </Nav>
                   
                     </Navbar.Collapse>
                        </Navbar>
            </div>
        )
    }
}

export default header
