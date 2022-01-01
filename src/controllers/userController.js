import userService from "../services/userService";

let handleSignup = async (req, res) => {
  let message = await userService.handleSignup(req.body);
  console.log(message);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
  });
};

let handleLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Invalid username or password",
    });
  }

  let userData = await userService.handleLogin(username, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let getAllUser = async (req, res) => {
  let data = await userService.getAllUser();

  return res.send({
    dataTable: data,
  });
};

let getEditUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await userService.getUserInfoById(userId);

    return res.send("Edit user", {
      user: userData,
    });
  } else {
    return res.send("User not found");
  }
};

let updateUser = async (req, res) => {
  let data = req.body;
  await userService.updateUserData(data);

  return res.send("Updated user!");
};

let deleteUser = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await userService.deleteUserById(id);

    return res.send("Deleted user!");
  } else {
    return res.send("User not found");
  }
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing Id",
      users: [],
    });
  }

  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);
  return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
  if(!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing Id"
    })
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
}

let handleLogout = async (req, res) => {
  
}

let handleChangePassword  = async (req, res) => {
  let data = req.body;
  let message = await userService.changePassword(data);
  return res.status(200).json(message);
}

let handleSaveDocument = async (req, res) => {
  
}

module.exports = {
  handleLogin: handleLogin,
  handleSignup: handleSignup,
  handleLogout: handleLogout,
  handleChangePassword: handleChangePassword,

  getAllUser: getAllUser,
  getEditUser: getEditUser,
  updateUser: updateUser,
  deleteUser: deleteUser,

  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,

  handleSaveDocument: handleSaveDocument,
};
