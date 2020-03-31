const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// protects routes using token
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    (req.headers.cookie && req.headers.cookie.split('token=')[1]) ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1])
  ) {
    token = req.headers.cookie.split('token=')[1];
  }
  if (!token) {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true
    });
    return next(new ErrorResponse('Not authorized to access this route.', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route.', 401));
  }
});
