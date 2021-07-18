const Cart=require('../model/cartSchema')
const User=require('../model/userSchema')
const Address=require('../model/addressSchema')
const Order=require('../model/orderSchema')
var monthName    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var d = new Date();
var date = d.getUTCDate();
var months = d.getUTCMonth(); // Since getUTCMonth() returns month from 0-11 not 1-12
var year = d.getUTCFullYear();
var month = monthName[months]
var dateStr = date + "/" + month + "/" + year;


exports.add=(req,res)=>{
    // console.log(req.body.addressId)
    // console.log(req.body.cartid)
    // console.log(req.body.id)
   console.log(req.body.price)

    let id=req.body.id
    let cart=req.body.cartid
    Cart.find({_id:{$in:cart}})
    .then((value)=>{

        let order = value.map(detail=> {return{product:detail.product,qty:detail.qty}})
        Address.findOne({_id:req.body.addressId})
        .then((address)=>{
            let addressData={
                name:address.name,
                door_no:address.door_no,
                street:address.street,
                locality:address.locality,
                district:address.district,
                state:address.state,
                pincode:address.pincode,
                addresstype:address.addresstype,
                phone_no:address.phone_no
            }
            let Orderdetail={
                user:id,
                address:addressData,
                products:order,
                price:req.body.totalPrice,
                status:"PLACED",
                paymentStatus:"Cash on Delivery",
                date:dateStr
            }
            Order.create(Orderdetail)
                     .then((data)=>{
                                 Cart.deleteMany({_id:{$in:cart}})
                                         .then((value)=>{
                                                 console.log("Cart is cleared now")
                                         }).catch((err)=>{
                                                 console.log(err)
                                         })
                                    res.send(data)
                         }).catch((err)=>{
                                 console.log(err)
                            })
            }).catch((err)=>{
                console.log(err)
            })
    }).catch((err)=>{
        console.log(err)
    })


}

exports.readUser=(req,res)=>{
    let id = req.body.id;
    Order.find({ user: id })
        .populate('user')
        .populate('products.product')
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err)
        })
}


exports.readId = async (req, res) => {
    let id = req.params.id;
    Order.find({ _id: id })
    .populate('user')
    .populate('products.product')
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err)
        })
}