const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

//App Cofig
const app = express();
const port = process.env.PORT || 5000;



// Cors 
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
    
  }

//Middlewares

app.use(cors())
app.use(express.json());

//DB config
const connection_url = process.env.ATLAS_URI;

mongoose.connect(connection_url, { 
    useNewUrlParser: true, 

    useUnifiedTopology: true 
 }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const filesRoute = require('./routes/files');
const showRoute = require('./routes/show');
const  downloadRoute = require('./routes/downloads')


app.use('/api/files', filesRoute);
app.use('/files', showRoute)
app.use('/files/download', downloadRoute);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});