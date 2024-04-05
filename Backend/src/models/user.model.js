import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: false ,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    // Array to store references to todo objects
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    accessToken: {
      type: String,
    }
  },
  { timestamps: true }
);

// using presave hook to store the password in encrypted form
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
})

// comparing hashed password woth original password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}



export const User = mongoose.model("User", userSchema);
