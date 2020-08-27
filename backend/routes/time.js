const router = require('express').Router();
let Time = require('../models/time.model');

router.route('/').get((req, res) => {
  Time.find()
    .then(time => res.json(time))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtime').post((req, res) => {
    const date = req.body.date
    const timein = req.body.timein;
    const timeout = req.body.timeout;

  
    const newTime = new Time({
      date,
      timein,
      timeout
    });
  
    newTime.save()
    .then(() => res.json('Time added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').get((req, res) => {
    Time.findById(req.params.id)
      .then(time => res.json(time))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Time.findByIdAndDelete(req.params.id)
      .then(() => res.json('Time deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Time.findById(req.params.id)
      .then(exercise => {
        time.username = req.body.username;
        time.description = req.body.description;
        time.name = req.body.name
        time.surname = req.body.surname
        time.duration = req.body.duration;
        time.tel = req.body.tel;
        time.date = Date.parse(req.body.date);
        time.colour = req.body.colour
        time.brand = req.body.brand;
  
        time.save()
          .then(() => res.json('Time updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  module.exports = router;