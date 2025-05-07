// const { verifyToken } = require("../utils/jwt.util");

// async function isUserAuthenticated(req, res, next) {
//     const authorization = req.headers['authorization'];
//     const token = authorization && authorization.split(' ')[1];

    
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }


//     try {

//         const decoded = await verifyToken(token);
//         req.user = decoded;
//         next();

//     } catch (error) {
//         console.error("Error verifying token:", error);
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// }


// module.exports = {
//     isUserAuthenticated,
// };



const { verifyToken } = require("../utils/jwt.util");
const User = require("../models/user.model"); // Add this

async function isUserAuthenticated(req, res, next) {
    console.log(req.headers)
  const authorization = req.headers['authorization'];
  console.log(authorization);
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = await verifyToken(token); // e.g. { id: "..." }

    const user = await User.findById(decoded.id).select("_id name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Full user document
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  isUserAuthenticated,
};
