const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send('Not authorized, no token');
    }

    token = token.split(' ')[1];  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next();
    } catch (error) {
        return res.status(401).send('Not authorized, token failed');
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};

module.exports = { protect, authorize };
