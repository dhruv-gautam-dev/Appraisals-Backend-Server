import User from '../models/User.js';
import jwt  from 'jsonwebtoken';


// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};


//register new user
// url "api/auth/register" comming to registerUser function
export const registerUser = async (req, res )=>{
  const { name, email, password, role, department } = req.body;
  try {
    // check if user exists
    const doesUserExist = await User.findOne({email});
    if(doesUserExist){
      res.status(400).json({message: "User already exists"});
    }

    const user = await User.create({name, email, password, role, department});
    res.status(201).json({
      _id:user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      token: generateToken(user._id),
    })

  } catch (error) {
    res.status(500).json({message: "Error in registering user", error});
  }
}

// login user
export const loginUser = async (req,res)=>{
  const {email, password} = req.body;
  try {

    const user = await User.findOne({email});

    if(!user || ! (await user.comparePassword(password))){
      res.status(400).json({message: "Invalid credentials"});
    }
    res.status(200).json({
      _id:user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({message: "Error in logging in user", error});
  }
}
