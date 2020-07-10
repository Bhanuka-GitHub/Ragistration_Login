const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
//register any user
const userRegister = async (userDets, role, res) => {
    try {
      //validate the user
      let usernameNotTaken = await (validateUsername(userDets.username));
      //validate the email
      let emailNotRegistered = await (validateEmail(userDets.email));
      if (!usernameNotTaken) {
          return res.status(400).json({
              message: `Username already taken`,
              success: false
          });
      }
      if (!emailNotRegistered) {
          return res.status(400).json({
              message: `Email already Registered`,
              success: false
          });
      }
      //hash password (hashing with 12 rounds)
      const hashedPassword = await bcrypt.hash(userDets.password, 12);
      //create new user
      const newUser = new User({
          ...userDets,
          password: hashedPassword,
          role:role
      });
      await newUser.save();
        return res.status(201).json({
            message: "Your Are Fully Registered login in now",
            success:true
        });
    }
    catch (e) {
        //implement 
        return res.status(500).json({
            message: "Sorry Unable to register",
            success:false
        });
    }

};
//User login (all)
const userLogin = async (userCredential,res,role) => {
    let { username, password } = userCredential;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "User is not found,Invalid login Credentials",
            success: false
        })
    }
        //user found ==>
        //check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            //sign in the token and issue it to user
            let token = jwt.sign({
                user_id: user._id,
                role: user.role,
                username: user.username,
                email: user.email
            },
                SECRET,
                { expiresIn: "7 days" }
            );
            let result = {
                username: user.username,
                role: user.role,
                email: user.email,
                token:`Bearer ${token}`,
                expiresIn: 168
            };
            return res.status(403).json({
                ...result,
                message: "Welcome! Your logged in",
                success: true
            });
        }
        //password don't match
        else {
            return res.status(403).json({
                message: "incorrect Password",
                success: false
            })
            
        }
        
    
    
}
const validateUsername = async (username) => {
    let user = await User.findOne({ username });
    return user ? false : true;
};
const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
};


module.exports = {
    userRegister,
    userLogin
}
