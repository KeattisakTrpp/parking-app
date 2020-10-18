let User = require('../models/user.model');
let Parking = require('../models/parking.model');
const { use } = require('../routes/user');

let parking_lot = 2

module.exports = {
    getAll: async (res) => {
        try {
            const users = await User.find()
            return res.json(users)
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    add: async (req, res) => {
       const {username, password ,name, surname ,cars ,tel} = req.body;
        try {
            const user = await User.findOne({ username })
            if(user) return res.json('username is invalid')
            const newUser = new User({ username, password, name, surname, cars, tel });
            await newUser.save()
            return res.json(newUser)
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    findById: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findById(id)
            return res.json(user)
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body
        try {
            const user = await User.findOne({username}).populate('parkings')
            console.log(user.password , password)
            if( user.password !== password ) return res.json('wrong')
            return res.json(user)
        } 
        catch(err) {
            return res.status(400).send(err)
        }
    }, 
    book: async (req, res) => {
        const { _id, date, checkIn, checkOut } = req.body
        try {
            const parking = await Parking.find({date: {
                $gte: new Date(date).setHours(0,0,0), $lte: new Date(date).setHours(23,59,59)
            }})
            
            let flag = false
            parking.forEach(p => {
                // already reserved
                if(p.checkIn <= checkIn && checkIn <= p.checkOut) {
                    console.log("Checkin In Range")
                    flag = true
                } else if((p.checkIn <= checkOut && checkOut <= p.checkOut)) {
                    console.log("Checkout In Range")
                    flag = true
                } else if(p.checkIn > checkIn && checkOut > p.checkOut) {
                    console.log("คาบเกี่ยว")
                    flag = true
                }
            })
            if(flag) return res.json("already reserved")

            const newParking = new Parking({ date, checkIn, checkOut, status: "reserved", userId: _id })
            await newParking.save()
            const user = await User.findById(_id)
            user.parkings.push(newParking._id)
            await user.save()
            const result = await User.findById(_id).populate('parkings')
            return res.json(result)
        } 
        catch(err) {
            return res.status(400).send(err)
        }
    },

    checkIn: async (req, res) => {
        const { plate, time } = req.body
        const date = new Date()
        try {
            const user = await User.find({cars: plate})
            const parkings = await Parking.findOne({userId: user._id, status: 'reserved', date: {
                $gte: new Date(date).setHours(0,0,0), $lte: new Date(date).setHours(23,59,59)
            }, checkIn: { $lte: time } })
            parkings.status = 'active'
            parkings.save()
            return res.json(`Welcome ${user.name}`)
        }
        catch(err) {
            return res.status(400).send(err)
        }

    },

    checkOut: async (req, res) => {
        const { plate } = req.body
        const date = new Date()
        try {

            const user = await User.find({cars: plate})
            const parkings = await Parking.findOne({userId: user._id, status: 'active', date: { $gte: new Date(date).setHours(0,0,0), $lte: new Date(date).setHours(23,59,59) }})
            parkings.status = 'inactive'
            parkings.save()
            return res.json(`Goodbye ${user.name}`)
        }
        catch(err) {
            return res.status(400).send(err)
        }
    }
}