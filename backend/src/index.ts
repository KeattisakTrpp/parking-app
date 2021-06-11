import express, { Application } from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import morgan from 'morgan'
import { userRouter } from './routes/user.route';
import dotenv from 'dotenv'

dotenv.config();

const app: Application = express()
const port = process.env.PORT || 5000

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/test'
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
