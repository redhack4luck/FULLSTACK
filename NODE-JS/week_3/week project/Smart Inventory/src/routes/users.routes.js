const express = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/users.controller');
const router = express.Router();
const validate=require('../middlewares/validator');
const userSchema=require('../validator/user.validator');
const authorize=require('../middlewares/authorize')

// ⚠️ Require auth for all user routes
//router.use(authorize('admin'))
router.get('/', auth, controller.listUsers);
router.get('/:id', auth, controller.getUser);
router.post('/',auth,authorize('admin'),validate(userSchema), controller.createUser);
router.put('/:id', auth, controller.updateUser);
router.delete('/:id', auth, controller.deleteUser);

module.exports = router;
