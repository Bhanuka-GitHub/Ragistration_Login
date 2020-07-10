const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const {success,error} = require('consola')
const { connect } = require('mongoose')

//app constant
const { DB, PORT } = require('./config')
//initialize application 
const app = express()
//middleware
app.use(cors())
app.use(bodyParser.json())
//Use Router middleware
const userRouter = require('./routes/users');
app.use('/users',userRouter);
//connection
const startApp = async () => {
    try {
        //connection with DB
        await connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        success({
            message: `Successfully connected with the Database \n${DB}`,
            badge: true
        });
        //listening to server  
        app.listen(PORT, () => success({ message: `Server started on PORT ${PORT}`, badge: true }));
    }
    catch (error) {
        error({
            message: `Unable to connect with \n${e}`,
            badge: true
        });
        //try again if error
        startApp();
    }  
};

startApp();
