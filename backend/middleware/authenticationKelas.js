const { kelas } = require('../models');
const { sign, verify } = require('../helper/jwt');

const authenticationKEals = async (req, res, next) => {
  try {

    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw { name: 'invalidTokennn' };
    }

    const access_token = authHeader.split(' ')[1];
    // console.log(access_token);
    const data = verify(access_token);

    const user = await kelas.findByPk(data.id);
    if (!user) {
      throw { status: 401, name: 'invalidToken' };
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    if (error.name === 'invalidToken') {
      return res.status(401).json({
        msg: 'Invalid Token. Please login again.',
      });
    }

    return res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

module.exports = authenticationKEals;
