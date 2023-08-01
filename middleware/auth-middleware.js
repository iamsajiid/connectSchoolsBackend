const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
      // User is logged in
      next(); // Continue to the next middleware or route handler
    } else {
      // User is not logged in, redirect or send an error response
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = requireLogin;