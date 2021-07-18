module.exports=(app)=>{
    const Slick =require('./controller/slick')
    const Gallery = require('./controller/gallery')
    const Product = require('./controller/productController')
    const User = require('./controller/userController')
     const Cart = require('./controller/cartController')
     const Address= require('./controller/addressController')
     const Order = require('./controller/orderController')

    app.post('/add',Slick.add)
    app.get('/get',Slick.get)

    app.post('/addgal',Gallery.add)
    app.get('/getgal',Gallery.get)

    app.post('/addproduct',Product.add)
    app.get('/getproduct',Product.get)
    app.get('/getproducts/:id',Product.getone)
    app.put('/update/:id',Product.update)


    app.post('/signup',User.Signup)
    app.post('/login',User.login)
    app.post('/getUser',User.getUser)



    app.post('/cart/add',Cart.addCart)
    app.get('/cart/get',Cart.get)
    app.post('/cart/getUser',Cart.getoneUser)
    app.post('/cart/update',Cart.updateCart)
    app.post('/cart/delete',Cart.deleteCart)
   
    
    app.post('/address/add',Address.addAddress)
    app.post('/address/get',Address.get)
    app.post('/address/delete',Address.delete)
    app.post('/address/getone',Address.getOne)
    app.put('/address/update',Address.update)

    app.post('/order/add',Order.add)
    app.post('/order/readuser',Order.readUser)
    app.get('/order/read/:id',Order.readId)
}