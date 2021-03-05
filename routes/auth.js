const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
  '/new',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

router.get('/renew', validateJWT, renewToken);
module.exports = router;
