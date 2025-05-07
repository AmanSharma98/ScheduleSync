// backend/middlewares/isAdminAuthenticated.js

const isAdminAuthenticated = (req, res, next) => {
    // Assuming the user's role is stored in req.user and it's an object with a 'role' property
    if (req.user && req.user.role === 'admin') {
      // If the user is an admin, proceed to the next middleware
      return next();
    }
    
    // If the user is not an admin, send a 403 Forbidden response
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  };
  
  module.exports = { isAdminAuthenticated };
  