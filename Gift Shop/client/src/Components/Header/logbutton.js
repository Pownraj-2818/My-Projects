import React,{Component} from 'react'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css';


export class logbutton extends Component {

    logOut=()=>{
        localStorage.removeItem('userToken')
    }

    render() {

        if(localStorage.userToken){
            const token = localStorage.getItem('token')
            const decode=jwt_decode(token)
            const user = decode.user.fullname
            return (
                <div>
                    <p> <span>{user} </span>
                    <a href="/" onClick={this.logOut} className="text-decoration-none text-dark">Logout</a>  </p>
                </div>
            )
    }else{
        return(
            <div></div>
        )
    }
}

}




export default logbutton
