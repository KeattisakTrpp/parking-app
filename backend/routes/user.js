const router = require('express').Router()
const userController = require('../controllers/userController')
const Parking = require('../models/parking.model')

router.route('/').get((req, res) => {
  userController.getAll(res)
})

router.route('/signup').post((req, res) => {
  userController.add(req, res)
})


router.route('/book').post((req, res) => {
  userController.book(req, res)
})

router.route('/login').post((req, res) => {
  userController.login(req,res)
})

router.route('/park').get((req, res) => {
  Parking.find().then(u => res.json(u) ).catch(err => res.json(err))
})

router.route('/checkin').post((req, res) => {
  userController.checkIn(res, req)
})

router.route('/checkout').post((req, res) => {
  userController.checkOut(res, req)
})

router.route('/:id').get((req, res) => {
  userController.findById(req, res)
})


module.exports = router
