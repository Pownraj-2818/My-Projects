import React, { Component } from 'react'
import { Row,Image,Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'

export class gallery extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[]
        }
    }
    
    componentDidMount(){
        Axios.get('http://localhost:8000/getgal')
        .then((response)=>{
            this.setState({data:response.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {

        const renderGallery=this.state.data.map((images)=>
            <Col lg={3} className='my-3'>
           <a href='/productlist'> <Image src={images.imgURL}  width='400px' height='400px'  alt={images.imgName} /></a>
            </Col>
        )

        return (
            <div>
                <h2 className="text-center fs-1 my-4 fw-bold">CELEBRATE A HERITAGE</h2>
                <Row  className="mx-5">
                    {renderGallery}
                </Row>

            </div>
        )
    }
}

export default gallery


