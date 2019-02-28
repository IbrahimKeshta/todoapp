const mongoose = require("mongoose");
const bcrypt = require("bcrypt-node");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
  {
    fullName: {type: String, trim: true, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: { type: String, select: false },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator, { message: "This {VALUE} is used" });

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  if (user.password) {
    bcrypt.hash(user.password, null, null, function(err, hashedPassword) {
     
      if (err) {
        return;
      }
      user.password = hashedPassword;
      
      next();
    });
}
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userSchema);
