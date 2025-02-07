const {jwtSecret} = require('../config')

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token,jwtSecret );
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

module.exports = authenticateToken;