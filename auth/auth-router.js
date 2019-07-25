const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model.js');
const secrets = require('../config/secrets.js');
const restricted = require('./restricted-middleware.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 4); // 2 ^ n
  user.password = hash;
  console.log(user);
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error); 
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', async (req, res) => {
  try{
      const count = await Users.remove(req.params.id);
      if(count >0){
          res.status(200).json({ message: 'The user has been deleted'});
      }else{
          res.status(404).json({ message: 'The user could not be found'})
      }
  } catch(err){
      console.log(err);
      res.status(500).json({
          message: "Error deleting user"
      })
  }
});

router.get('/', restricted, (req, res) => {
  

  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    username: user.username
  };

  const jwtOptions = {
    expiresIn: '1d',
  };
  return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;