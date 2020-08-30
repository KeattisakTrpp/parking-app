const router = require('express').Router()
const userController = require('../controllers/userController')
const Parking = require('../models/parking.model')
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  userController.getAll(res)
});

router.route('/signup').post((req, res) => {
  userController.add(req, res)
});


router.route('/book').post((req, res) => {
  userController.book(req, res)
});

router.route('/login').post((req, res) => {
  userController.login(req,res)
});

router.route('/park').get((req, res) => {
  Parking.find().then(u => res.json(u) ).catch(err => res.json(err))
})


router.route('/:id').get((req, res) => {
  userController.findById(req, res)
});


module.exports = router
