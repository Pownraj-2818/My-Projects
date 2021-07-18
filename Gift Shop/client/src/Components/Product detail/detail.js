import React, { Component } from 'react'
import { Row,Image,Col,Card,Button,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode'
import Axios from 'axios'
import {Link} from 'react-router-dom'


export class detail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:[],
             recommendations:[],
             id:'',
             path:''

        }
    }
    Productid = this.props.match.params.product_id

    componentDidMount(){

        if(!localStorage.token){

        }else{
            const token=localStorage.getItem('token')
            const decoded=jwt_decode(token)
            console.log(decoded.user.id)
            this.setState({id:decoded.user.id})
        }


        Axios.get(`http://localhost:8000/getproducts/${this.Productid}`)
         .then((response)=>{
             this.setState({product:response.data})
            console.log(response.data)
         })
         .catch((error)=>{
             console.log(error)
         })
    }

    recommendations=()=>{
        Axios.get('http://localhost:8000/getproduct')
        .then((response)=>{
            this.setState({recommendations:response.data})
            
        }).catch((err)=>{
            console.log(err)
        })
    }

    addtoCart=async()=>{
        if(this.state.id===""){
            alert("you have to login")
            this.setState({path:'/'})
         }else{
             this.setState({path:'/cart'})
            await Axios.post('http://localhost:8000/cart/add',{_id:this.Productid,id:this.state.id})
             
         }
    }
    render() {
         const renderproduct=this.state.product.map((value)=><div>
             
                <img src={value.imgURL} height="500px"  style={{marginLeft:"600px"}} alt="product" />
             
             <Row className="my-4 mx-5">
                 <Card className="p-5">
                     
                     <span className="my-1 mx-3 text-muted  fw-bold"><span>{value.stars}</span><span className="mx-2 text-muted">stars</span><span className="mx-3">|</span><span>{value.ratings}</span><span className="mx-1">ratings</span></span>
                     <hr />
                     <h3><span>Rs.</span>{value.price}</h3>
                     <p className="fs-5 text-dark">Gift a set of two beautiful looking personalized planters and make the environment go green and fresh.<br/> Both the planters are in whitish color with option of personalized name on one of them to make it look special. <br />The other planter has a beautiful New Year wishes on it. ( Only Planter Set) </p>
                        <p  className="fs-5 text-dark">Key constituents</p>
                        <p  className="fs-5 text-dark">{value.Key1||value.key1}</p>
                        <p  className="fs-5 text-dark">{value.key2}</p>
                       
                        <a href={this.state.path} onClick={this.addtoCart} style={{backgroundColor:"#F7BC13 ",width:"650px",marginLeft:'500px'}} className="btn text-white border-0 ">BUY NOW <span>(</span><span className="mx-1">RS.</span><span className="ms-2">{value.offer}</span><span  className="mx-1">)</span></a>
                 </Card>
             </Row>
         </div>)

         const renderrecommendations=this.state.recommendations.map((data)=>
        
             <Col lg={4} className="my-3">
             <Card style={{ width: '18rem'}}>
               <Link onClick={()=>{ window.location=`/product/detail/${data._id}`}} to={`/product/detail/${data._id}`}> <Card.Img variant="top" style={{backgroundColor:"grey"}} height="290px" className='p-5' src={data.imgURL} /></Link>
            <Card.Body>
             <Card.Title className="fs-6">{data.productName}</Card.Title>
             <p className="text-danger fs-6 fw-bold"><span>Rs.</span><span>{data.offer}</span></p>
             <p className="fw-bold"><span>{data.stars}</span><span className="mx-2">Stars</span></p>
         <Card.Text>
                               
        </Card.Text>
              
        </Card.Body>
        </Card>
             </Col>
        
         )
        return (
            <div>
                 
                {renderproduct}

                <Button  onClick={this.recommendations} className='btn bg-white text-dark border-1 border-dark my-3  mx-5 fs-1' style={{width:"1800px",fontFamily:"Brush Script MT"}}>Similar Gift Recommendations</Button>

                
                    <Row className="ms-5 ">
                        {renderrecommendations}
                    </Row>
                
            </div>
        )
    }
}

export default detail
