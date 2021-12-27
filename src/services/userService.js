import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleSignup = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFtomBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        username: data.username,
        password: hashPasswordFtomBcrypt,
      });

      resolve("Ok ! Create a new user");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUsername(username);

      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "username",
            "password",
            "email",
            "firstName",
            "lastName",
          ],
          where: { username: username },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Invalid username or password";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUsername = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { username: username },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleSignup: handleSignup,
};
