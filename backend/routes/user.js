const router = require('express').Router();
const User = require('../models/user.model');
const userController = require('../controllers/userController');

router.route('/').get( async (req ,res) => {
  userController.getAll(res)
});

router.route('/signup').post((req, res) => {
  userController.add(req, res)
});

router.route('/:id').get((req, res) => {
  userController.findById(req, res)
});

// router.route('/:id').delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   User.findById(req.params.id)
//     .then(User => {
//       User.username = req.body.username;
//       User.password = req.body.password;
//       User.name = req.body.name
//       User.surname = req.body.surname
//       User.duration = req.body.duration;
//       User.tel = req.body.tel;
//       User.date = Date.parse(req.body.date);
//       User.colour = req.body.colour
//       User.brand = req.body.brand;

//       User.save()
//         .then(() => res.json('User updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });
router.route('/login').post((req, res) => {
  userController.login(req,res)
  // console.log(req.body.username)
  // User.findOne({username:req.body.username})
  //   .then(User => {
  //     console.log(User)
  //     if(req.body.password===User.password){
  //       res.json(User)
  //     } else{
  //       res.json("NOT")
  //     }  
  //   })   
  //   .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/signup').post((req, res) => {
//   //console.log(req.body.username)
//   const username = req.body.username;
//   const password = req.body.password;
//   const name = req.body.name
//   const surname = req.body.surname
//   const plate = [...req.body.plate.map(p => {
//     return p.value;
//   })]
//   const tel = req.body.tel;
//   //const date = Date.parse(req.body.date);
//   const colour = req.body.colour
//   const brand = req.body.brand;

//   const newUser = new User({
//     username,
//     password,
//     name,
//     surname,
//     plate,
//     tel,
//     colour,
//     brand
//   });
//   console.log(newUser)
//   newUser.save()
//   .then(() => res.json('User added!'))
//   .catch(err => res.status(400).json('Error: ' + err)); 
// });



module.exports = router;