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

module.exports = {
  handleLogin: handleLogin,
  handleSignup: handleSignup,
};
