import React, { Component } from 'react'
import { Row,Image,Col,Card,Button,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'

export class allproducts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products:[]
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:8000/getproduct')
        .then((response)=>{
            this.setState({products:response.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    render() {

        const renderCards=this.state.products.map((values)=>
        <Col lg={3} className="mx-1">
        <Card style={{ width: '18rem' }} className="mt-4">
             <Card.Img variant="top" height="290px" src={values.imgURL} />
    <Card.Body>
    <Card.Title>{values.productName}</Card.Title>
    <Card.Text>
      {values.desc}
    </Card.Text>
    <Button href={`/product/detail/${values._id}`} style={{backgroundColor:"#F28606"}} className="border-0 w-100">View details</Button>
  </Card.Body>
</Card>
        </Col>
        
        )
        return (
            <div>
                <Row className="my-5 mx-4">
                   
                    {renderCards}
                   
                </Row>
               
                
            </div>
        )
    }
}

export default allproducts

