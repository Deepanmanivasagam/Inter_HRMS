const express = require('express');
const connecttoDB = require('./dbConnection/database');
require('dotenv').config()
const app = express();

app.use(express.json());

connecttoDB();

app.use('/api',require('./routes/commonRoutes/commonroutes'))
const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))