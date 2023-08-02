const usersRouter = require('express').Router();
const { getUsers, getUser, createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');


usersRouter.post('/', createUser);

usersRouter.post('/login', login);


usersRouter.get('/', auth, getUsers);

usersRouter.get('/:userId', auth, getUser);

module.exports = usersRouter;