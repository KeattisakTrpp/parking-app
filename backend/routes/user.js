const router = require('express').Router()
const userController = require('../controllers/userController')

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
  userController.getPark(req, res)
})

router.route('/checkin').post((req, res) => {
  userController.checkIn(req, res)
})

router.route('/checkout').post((req, res) => {
  userController.checkOut(req, res)
})

router.route('/:id').get((req, res) => {
  userController.findById(req, res)
})

router.route('/:id/car').post((req, res) => {
  userController.addCar(req, res)
})


module.exports = router
