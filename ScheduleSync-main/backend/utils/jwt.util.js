const jwt = require("jsonwebtoken");


const secretKey = process.env.JWT_SECRET_KEY ||"your_secret_key";

function generateAccessToken(user) {
    return jwt.sign({ id: user._id }, secretKey, { expiresIn: '1d' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    }
    );
}

module.exports = {
    generateAccessToken,
    verifyToken
};