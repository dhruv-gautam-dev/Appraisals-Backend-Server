import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    name: String,
    email: String,
    password: String,
    role: Enum("Employee", "Junior", "Peer", "Manager", "Supervisor"),
    department: String
    },{timestamps: true}    
    
);

// hash password before saving to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.Schema("user",userSchema);
export default user;
