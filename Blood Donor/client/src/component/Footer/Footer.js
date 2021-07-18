import React, { Component } from 'react'
import {Image,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export class Footer extends Component {
    render() {
        return (
            <div>
                <div className="px-3 border-top border-danger border-2 bg-white text-start py-3  mt-4">
                    <Container>
                    <span className="fs-4 fw-bold">FOLLOW US</span>
                    <span className="mx-3 "><Image src="/images/fb.jpg" height="40px" width="40px" /></span>
                    <span  className="mx-3 "><Image src="/images/twitter.jpg" height="40px" width="40px" /></span>
                    <span  className="mx-3"><Image src="/images/youtube.jpg" height="40px" width="40px" /></span>

                    <span className="fs-4 fw-bold" style={{marginLeft:"300px"}}>DOWNLOAD APPS</span>
                    <span className="mx-3 "><Image src="/images/android.jpg" height="50px" width="50px" /></span>
                    <span  className="mx-3 "><Image src="/images/windows.jpg" height="50px" width="50px" /></span>
                    <span  className="mx-3"><Image src="/images/ios.jpg" height="50px" width="50px" /></span>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Footer
