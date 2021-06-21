import { User } from "../models/user/user.model"
import { Request, Response } from 'express'
import { Parking } from '../models/parking/parking.model'
import { IParking, Status } from "../models/parking/iparking.i"
import { EmailService } from "../services/email.service"
import { UserStatus } from "../models/user/iuser.i"

export const getAll = async (res: Response) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

export const create = async (req: Request, res: Response) => {
    const { username, password, name, surname, cars, tel, email } = req.body;
    try {
        const user = await User.findOne({ username })
        if (user) throw new Error('username is invalid')
        const newUser = new User({ username, password, name, surname, cars, tel, email });
        await EmailService.getInstance().sendMail(email, newUser._id)
        await newUser.save()
        return res.json(newUser)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const findById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(400).send('User not found')
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if(!user) {
            throw new Error('user not found')
        }
        if(user.status !== UserStatus.verified) {
            throw new Error('please verify your account before login')
        }
        const parkings = await Parking.find({ userId: user._id })
        console.log(user.password, password)
        if (user.password !== password) return res.json('username or password incorrect')
        return res.json({...user.toObject(), parkings})
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const book = async (req: Request, res: Response) => {
    const { _id, date, checkIn, checkOut } = req.body
    try {
        const start = new Date()
        start.setHours(0, 0, 0)
        const end = new Date()
        end.setHours(23, 59, 59)
        const parking: IParking[] = await Parking.find({
            date: { 
                $gte: start, 
                $lte: end
            }
        })
        parking.forEach((p: IParking) => {
            // already reserved
            if (p.checkIn <= checkIn && checkIn <= p.checkOut) {
                console.log("Checkin In Range")
                throw new Error("already reserved")
            } else if ((p.checkIn <= checkOut && checkOut <= p.checkOut)) {
                console.log("Checkout In Range")
                throw new Error("already reserved")
            } else if (p.checkIn > checkIn && checkOut > p.checkOut) {
                console.log("collapse")
                throw new Error("already reserved")
            }
        })

        const newParking = new Parking({ date, checkIn, checkOut, status: "reserved", userId: _id })
        await newParking.save()
        return res.json(newParking)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const checkIn = async (req: Request, res: Response) => {
    console.log(req.body)
    const { plate, time } = req.body
    const start = new Date()
    start.setHours(0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59)
    try {
        const user = await User.findOne({ cars: { $elemMatch: { plate } } })
        console.log(user.name)
        const parkings = await Parking.findOne({
            userId: user._id,
            status: Status.reserved,
            date: {
                $gte: start,
                $lte: end
            },
            checkIn: { $gte: time }
        })
        parkings.status = Status.checkIn
        parkings.save()
        return res.json(`Welcome ${user.name}`)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const checkOut = async (req: Request, res: Response) => {
    const { plate, time } = req.body
    const start = new Date()
    start.setHours(0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59)
    try {
        const user = await User.findOne({ cars: plate })
        const parkings = await Parking.findOne({
            userId: user._id,
            status: Status.checkIn, 
            date: { 
                $gte: start,
                $lte: end
            },
            checkOut: { $gte: time }
        })
        parkings.status = Status.checkOut
        parkings.save()
        return res.json(`Goodbye ${user.name}`)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const addCar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        user.cars.push(req.body.car)
        user.save()
        return res.json(req.body.car)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const getPark = async (req: Request, res: Response) => {
    try {
        const park = await Parking.find().populate('userId', 'name surname')
        console.log(park)
        return res.json(park)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const getParkByDate = async (req: Request, res: Response) => {
    try {
        const { date } = req.params
        const start = new Date(date)
        start.setHours(0, 0, 0)
        const end = new Date(date)
        end.setHours(23, 59, 59)
        const parking = await Parking.find({
            date: {
                $gte: start,
                $lte: end
            }
        }).populate('userId', 'name surname')
        console.log(parking)
        return res.json(parking)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}

export const verify = async (req: Request, res: Response) => {
    try {
        const userId  = req.params.id
        const user = await User.findById(userId)
        if(!user) throw new Error('User not found')
        user.status = UserStatus.verified
        await user.save()
        return res.json('Your account is verified')
    } catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}
