let User = require('../models/user.model');
let Parking = require('../models/parking.model')

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
            const user = await User.findOne({username})
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
            // have to add logic for checking reservasion
            
            const parking = new Parking({ date, checkIn, checkOut })
            await parking.save()
            const user = await User.findById(_id)
            user.parkings.push(parking._id)
            await user.save()
            return res.json(parking)
        } 
        catch(err) {
            return res.status(400).send(err)
        }
    }
    
}