const jwt= require('jsonwebtoken');

module.exports = (req,res, next) => {
    const { authorization } = req.headers;
    if(!autoriztion || !autoriztion.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Need authorization'})
    }
    const token = authorization.replace('Bearer ', '')

    let payload;

    try {
        payload = jwt.veryfy(token, 'secret');
    } catch (err) {
        return res.status(401).send({ message: 'Need authorization'})
    }
    req.user = payload;
    next();
}