const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData; 
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = verifyToken;
