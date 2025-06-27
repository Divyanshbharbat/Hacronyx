// middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const tokenHeader = req.header('Authorization');
  
  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = tokenHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // decoded should have { user: { id } }
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
