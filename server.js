const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');


//const logger=require('./middleware/middleware')



// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();
    

// Route files
const bootcamps= require('./routes/bootcamps')


const app = express();

// Body Parser means after postong postman we can see in console to solve this we do this
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// it is work for middleware  folder created 
//app.use(logger);


// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server=app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV}mode on port ${PORT}`.yellow.bold)
);
// Handel Unhandel promis rejection 
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});





// app.get('/', (req,res) => {
//      //res.send('<h1>helo from express</h1>') by express
//      // res.send('helo from express') // to send text  by express
//     // res.send({'name':'amare'}) // to send jeson file by express
//     //res.sendStatus(400); // sending status for bad req
//     // res.status(200).json({ success: true, data: { id: 1 } });to sen data 

//  });





