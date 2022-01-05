import userService from "../services/userService";

let handleSignup = async (req, res) => {
  try {
    let message = await userService.handleSignup(req.body);
    return res.status(200).json({
      message,
    });
  } catch (e) {
    console.log(message);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
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
  try {
    let data = await userService.getAllUser();

    return res.status(200).json({
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    })
  }
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

let handleGetInfoUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing Id",
    });
  }

  let user = await userService.getInfoUser(id);

  return res.status(200).json({
    errCode: 0,
    message: "Ok",
    user,
  });
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
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing Id",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let handleLogout = async (req, res) => {};

let handleChangePassword = async (req, res) => {
  let data = req.body;
  let message = await userService.changePassword(data);
  return res.status(200).json(message);
};

let handleSaveDocument = async (req, res) => {
  let documentId = req.body.documentId;
  let userId = req.body.userId;

  if (!documentId || !userId) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Invalid documentId or userId",
    });
  }
    let saveDoc = await userService.handleSaveDocument(documentId, userId);

  return res.status(200).json({
    errCode: 1,
    message: saveDoc.message,
  });
};

let checkSavedDocument = async (req, res) => {
  let documentId = req.query.documentId;
  let userId = req.query.userId;

  if (!documentId || !userId) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Invalid documentId or userId",
    });
  }

  let isSaved = await userService.checkSavedDocument(documentId, userId);

  return res.status(200).json({
    errCode: 1,
    message: isSaved.message,
  });
}

let getAllSavedDocument = async (req, res) => {
  let userId = req.query.id;

  if (!userId) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Invalid userId",
    });
  }

  let savedDocument = await userService.getAllSavedDocument(userId);

  return res.status(200).json({
    errCode: 1,
    message: savedDocument.message,
  });
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

  handleGetInfoUser: handleGetInfoUser,

  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,

  handleSaveDocument: handleSaveDocument,
  checkSavedDocument: checkSavedDocument,
  getAllSavedDocument: getAllSavedDocument,
};
