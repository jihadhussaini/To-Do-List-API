const { User } = require("../models");
const { encrypt, checkPw } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class userController {
  static async createUser (req, res) {
    try {
      const userName = req.body.userName;
      const password = encrypt(req.body.password);
      const gender = req.body.gender
      const objUser = {
        userName: userName,
        password: password,
        gender: gender
      };
      const user = await User.create(objUser);
      
      if (user) {
        return res.status(200).json({ message: "Successfully created user account"});
      } else {
        let message = { message: "Failed to create user account"};
        return res.status(401).json(message);
      };
    } catch (error) {
      console.log(error);
      return res.status(500).json({
          status: "failed",
          message: error.message || "Internal Server Error",
      });
    }
  };

  static async signIn (req, res) {
    try {
      const userName = req.body.userName;
      const password = req.body.password;
      const user = await User.findOne({where: { userName: userName } });
      const hashedPW = user.dataValues.password;

      if (checkPw(password, hashedPW)) {
        let dataUser = user.dataValues;
        delete dataUser.password;
        let token = generateToken(dataUser);
        res.status(200).json({success: true, message: "Sign In success", token: token});
      } else {
        let message = { message: "auth failed"};
        res.status(401).json(message);
      };
    } catch (error) {
      console.log(error);
      return res.status(500).json({
          status: "failed",
          message: error.message || "Internal Server Error",
      });
    }
  };
};

module.exports = userController;
