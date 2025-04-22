import jwt from 'jsonwebtoken';


//importing user.js
import User from '../models/user.js';

 const authMiddleware = async (req, res, next )=>{
  const token = req.headers.authorization?.split(' ')[1];

  if(!token){
    return res.status(401).json({message: 'No token, authorization denied'});
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if(!user){
      return res.status(401).json({message: 'User not found '});
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({message: 'Token is not valid'});
  }

}

export default authMiddleware;