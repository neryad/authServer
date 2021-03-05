const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'Create user',
  });
};

const loginUser = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'login user',
  });
};

const renewToken = (req, res) => {
  return res.json({
    ok: true,
    msg: 'renew token',
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
