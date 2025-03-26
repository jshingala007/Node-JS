const JWT = require('jsonwebtoken');
const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(200).send({
                success: false,
                message: "Token is blank",
            })
        }
        let newToken = token.slice(7);
        JWT.verify(newToken, 'rnw', (err, decode) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: "Token is not valid",
                })
            }
            req.user = decode.payload;
            return next();
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const authoriseRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        }
        return res.status(400).send({
            success: false,
            message: "Unauthorise access",
        })
    }
}
module.exports = {
    verifyToken, authoriseRole
}