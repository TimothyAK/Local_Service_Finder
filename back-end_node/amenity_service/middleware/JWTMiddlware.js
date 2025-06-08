require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const protectedRoutes = [
    {
        path: "nearby",
        method: "GET",
        allowPublicAccess: false
    }
];

function verifyToken(req, res, next) {
    const userJWT = req.headers["access-token"];

    const protectedRoute = protectedRoutes.find(route => (req.path.includes(route.path) && route.method === req.method));
    if(!protectedRoute) {
        return next();
    }

    if(userJWT === undefined){
        return res.status(401).end("Invalid token")
    }

    try {
        jwt.verify(userJWT, jwtSecret)

        const payload = jwt.decode(userJWT);
        req.jwtPayload = payload;

        next();
    } catch (error) {
       return res.status(401).end("Invalid token")
    }
}

module.exports = { verifyToken }