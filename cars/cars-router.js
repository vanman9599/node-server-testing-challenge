const router = require('express').Router();

const Cars = require('./cars-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  const department = req.jwtToken.department;

  Cars.find()
    .then(cars => {
      res.json(cars);
    })
    .catch(err => res.send(err));
});

module.exports = router;