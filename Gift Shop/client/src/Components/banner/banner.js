import React, { Component } from 'react'
import { Row,Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class banner extends Component {
    render() {
        return (
            <div className='mt-5 '>
                <Row className='my-5 mx-1'>
                    <Image src='images/banner1.jpg' alt='banner1'/>
                </Row>
                <Row className='my-5 mx-1' >
                    <Image src='images/banner2.jpg' alt='banner2' />
                </Row>
                <hr style={{height:"2px",backgroundColor:"black"}} />
            </div>
        )
    }
}

export default banner
