import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  // console.log('auth middleware');

  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    // console.log('decoded', decoded);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

