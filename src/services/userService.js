import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleSignup = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkUsername(data.username);

      if (!isExist) {
        let hashPasswordFtomBcrypt = await hashUserPassword(data.password);

        await db.User.create({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          username: data.username,
          password: hashPasswordFtomBcrypt,
        });

        resolve({
          errCode: 0,
          message: "Ok",
        });
      } else {
        resolve({
          errCode: -1,
          errMessage: "Username is exist",
        });
      }
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
            "id",
            "username",
            "password",
            "email",
            "firstName",
            "lastName",
            "address",
            "imageUser",
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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        attributes: ["id", "email", "firstName", "lastName", "address", "imageUser", "username", "password"],
      });
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
}

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUsername(data.username);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Username already exist",
        });
      } else {
        let hashPasswordFtomBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          username: data.username,
          password: hashPasswordFtomBcrypt,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Savedoc.findOne({
        where: { userId: userId },
      });
      if (user) {
        await db.Savedoc.destroy({
          where: { userId: userId },
        })
      }
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        message: "Deleted user",
      })
      
    } catch (e) {
      reject(e);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing user id",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        if(data.password == null && data.password == ''){
          let hashPasswordFtomBcrypt = await hashUserPassword(data.password);
          user.password = hashPasswordFtomBcrypt;
        }

        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.imageUser = data.imageUser;
        
        await user.save();

        resolve({
          errCode: 0,
          message: "Updated user!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleChangePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        let check = await bcrypt.compareSync(data.oldPassword, user.password);
        if (check) {
          let hashPasswordFtomBcrypt = await hashUserPassword(data.newPassword);
          user.password = hashPasswordFtomBcrypt;
          await user.save();
          resolve({
            errCode: 0,
            errMessage: "Ok",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Wrong password",
          });
        }
      } else {
        resolve({
          errCode: 2,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSaveDocument = (documentId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Savedoc.findOne({
        where: { userId: userId, documentId: documentId },
      });
      if (user) {
        await db.Savedoc.destroy({
          where: { userId: userId, documentId: documentId }
        });
        resolve({
          errCode: 0,
          message: "Delete saved document",
        });
      } else {
        await db.Savedoc.create({
          documentId: documentId,
          userId: userId,
        });
        resolve({
          errCode: 1,
          message: "Saved document",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkSavedDocument = (documentId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let savedDoc = await db.Savedoc.findOne({
        where: { userId: userId, documentId: documentId },
      });
      if (savedDoc) {
        resolve({
          errCode: 1,
          message: "Saved",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Not saved",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

let getAllSavedDocument = (userId) => {
  return new Promise(async (resolve, reject) => {
    let savedDoc = await db.Savedoc.findAll({
      where: { userId: userId },
      attributes: ["documentId"],
      include: [{
        model: db.Document,
        required: true,
        as: "documentData",
        attributes: ["id", "nameDocument","pageNumber", "imageDocument"],

        include: [{
          model: db.Author,
          required: true,
          as: "authorData",
          attributes: ["nameAuthor"],
        }],
      }],
      raw: true,
      nest: true,
    });
    resolve({
      errCode: 0,
      message: savedDoc,
    });
  });
}

module.exports = {
  handleLogin: handleLogin,
  handleSignup: handleSignup,
  handleChangePassword: handleChangePassword,

  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,

  getInfoUser: getInfoUser,

  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser: editUser,

  handleSaveDocument: handleSaveDocument,
  checkSavedDocument: checkSavedDocument,
  getAllSavedDocument: getAllSavedDocument,
};
