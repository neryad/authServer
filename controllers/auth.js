const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User with that email already exist',
      });
    }
    const userDb = new User(req.body);

    const salt = bcrypt.genSaltSync();
    userDb.password = bcrypt.hashSync(password, salt);

    const token = await generateJWT(userDb.id, name);

    await userDb.save();

    return res.status(201).json({
      ok: true,
      msg: 'User created successfully',
      uid: userDb.id,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Some server error',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDb = await User.findOne({ email: email });

    if (!userDb) {
      return res.status(400).json({
        ok: false,
        msg: '!Email or password invalid ',
      });
    }

    const validPassword = bcrypt.compareSync(password, userDb.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Email or !password invalid ',
      });
    }

    const token = await generateJWT(userDb.id, userDb.name);

    return res.json({
      ok: true,
      msg: 'Welcome',
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Some server error',
    });
  }
};

const renewToken = (req, res) => {
  // const token = req.header('x-token');
  // if (!token) {
  //   return res.status(401).json({
  //     ok: false,
  //     msg: 'token invalid - no access denied',
  //   });
  // }

  return res.status(401).json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
