module.exports=(app)=>{
    const User = require('../controller/userController')

    app.post('/signup',User.Signup)
    app.get('/getUser',User.getUsers)
    app.post('/login',User.login)
    app.post('/filters',User.filters)
}