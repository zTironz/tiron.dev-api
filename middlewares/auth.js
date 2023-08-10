const jwt= require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    // const { authorization } = req.headers;
    // if(!authorization || !authorization.startsWith('Bearer ')) {
    //     return res.status(401).send({ message: 'Need authorization'})
    // }
    // const token = authorization.replace('Bearer ', '')
    const { jwt: token } = req.cookies;

    let payload;
    if(!jwt) {
        throw new Error({message: 'error'})
    }

    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',);
    } catch (err) {
        return res.status(401).send({ message: 'Need authorization'})
    }
    console.log(payload)
    req.user = payload;
    next();
};