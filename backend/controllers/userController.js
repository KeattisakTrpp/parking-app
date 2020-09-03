let User = require('../models/user.model');
let Parking = require('../models/parking.model')

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
                $gte: new Date(date).setHours(0,0,0), $lt: new Date(date).setHours(23,59,59)
            }})
            
            let flag = false
            parking.forEach(p => {
                // already reserved
                if(p.checkIn.getTime() <= checkIn && checkIn <= p.checkOut.getTime()) {
                    console.log("Checkin In Range")
                    flag = true
                } else if((p.checkIn.getTime() <= checkOut && checkOut <= p.checkOut.getTime())) {
                    console.log("Checkout In Range")
                    flag = true
                } else if(p.checkIn.getTime() > checkIn && checkOut > p.checkOut.getTime()) {
                    flag = true
                }
            })
            if(flag) return res.json("already reserved")

            const newParking = new Parking({ date, checkIn, checkOut, status: "active" })
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
    }
    
}