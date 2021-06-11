const User = require('../models/user.model');
const Parking = require('../models/parking.model');
const EmailService = require('../services/email.service');
const emailService = EmailService.getInstance();

module.exports = {
    getAll: async (res) => {
        try {
            const users = await User.find()
            return res.json(users)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    add: async (req, res) => {
        const { username, password, name, surname, cars, tel, email } = req.body;
        try {
            const user = await User.findOne({ username })
            if (user) return res.json('username is invalid')
            const newUser = new User({ username, password, name, surname, cars, tel, email });
            const emailObject = {
                from: 'Parking app', // sender address
                to: "supanat_zaa222@hotmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Test sending email", // plain text body
                // html: "<b>Hello world?</b>", // html body
            }
            emailService.sendMail(emailObject)
            await newUser.save()
            return res.json(newUser)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    findById: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            return res.json(user)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body
        try {
            const user = await User.findOne({ username })
            const parkings = await Parking.find({ userId: user._id })
            console.log(user.password, password)
            if (user.password !== password) return res.json('wrong')
            return res.json({...user._doc, parkings})
        }
        catch (err) {
            return res.status(400).send(err)
        }
    },
    book: async (req, res) => {
        const { _id, date, checkIn, checkOut } = req.body
        try {
            const parking = await Parking.find({
                date: {
                    $gte: new Date(date).setHours(0, 0, 0), $lte: new Date(date).setHours(23, 59, 59)
                }
            })
            parking.forEach(p => {
                // already reserved
                if (p.checkIn <= checkIn && checkIn <= p.checkOut) {
                    console.log("Checkin In Range")
                    return res.json("already reserved")
                } else if ((p.checkIn <= checkOut && checkOut <= p.checkOut)) {
                    console.log("Checkout In Range")
                    return res.json("already reserved")
                } else if (p.checkIn > checkIn && checkOut > p.checkOut) {
                    console.log("คาบเกี่ยว")
                    return res.json("already reserved")
                }
            })

            const newParking = new Parking({ date, checkIn, checkOut, status: "reserved", userId: _id })
            await newParking.save()
            return res.json(newParking)
        }
        catch (err) {
            return res.status(400).send(err)
        }
    },

    checkIn: async (req, res) => {
        console.log(req.body)
        const { plate, time } = req.body
        const date = new Date()
        try {
            const user = await User.findOne({ cars: { $elemMatch: { plate } } })
            console.log(user.name)
            const parkings = await Parking.findOne({
                userId: user._id,
                status: 'reserved',
                date: {
                    $gte: new Date(date).setHours(0, 0, 0), $lte: new Date(date).setHours(23, 59, 59)
                },
                checkIn: { $gte: time }
            })
            parkings.status = 'active'
            parkings.save()
            return res.json(`Welcome ${user.name}`)
        }
        catch (err) {
            return res.status(400).send(err)
        }
    },

    checkOut: async (req, res) => {
        const { plate, time } = req.body
        const date = new Date()
        try {

            const user = await User.findOne({ cars: plate })
            const parkings = await Parking.findOne({
                userId: user._id,
                status: 'active', 
                date: { 
                    $gte: new Date(date).setHours(0, 0, 0), $lte: new Date(date).setHours(23, 59, 59) 
                },
                checkOut: { $gte: time }
            })
            parkings.status = 'inactive'
            parkings.save()
            return res.json(`Goodbye ${user.name}`)
        }
        catch (err) {
            return res.status(400).send(err)
        }
    },

    addCar: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            user.cars.push(req.body.car)
            user.save()
            return res.json(req.body.car)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    getPark: async (req, res) => {
        try {
            const park = await Parking.find().populate('userId', 'name surname')
            console.log(park)
            return res.json(park)
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    getParkByDate: async (req, res) => {
        try {
            const { date } = req.params
            const parking = await Parking.find({
                date: {
                    $gte: new Date(date).setHours(0, 0, 0), $lte: new Date(date).setHours(23, 59, 59)
                }
            }).populate('userId', 'name surname')
            console.log(parking)
            return res.json(parking)
        } catch (err) {
            return res.status(400).send(err)
        }
    }
}