const usersRouter = require('express').Router();
const { getUsers, getUser, createUser, login } = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUser);

usersRouter.post('/', createUser);

usersRouter.post('/login', login)

module.exports = usersRouter;