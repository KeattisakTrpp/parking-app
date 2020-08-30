const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("tiny"))
app.use(cors());
app.use(express.json());

const uri = 'mongodb://192.168.99.100:27017/test' || process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user');

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});