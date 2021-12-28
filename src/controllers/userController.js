import userService from "../services/userService";

let handleSignup = async (req, res) => {
  let message = await userService.handleSignup(req.body);
  console.log(message);
  return res.send("Signup");
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

module.exports = {
  handleLogin: handleLogin,
  handleSignup: handleSignup,
  getAllUser: getAllUser,
  getEditUser: getEditUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
