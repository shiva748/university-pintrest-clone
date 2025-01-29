const validator = require("validator");
const { handleError } = require("./error");

// === === === email === === === //

exports.email = (data) => {
  const { email } = data;
  if (!email) {
    handleError("Please input all fields", 400);
  } else if (!validator.isEmail(email)) {
    handleError("Please enter a valid email", 400);
  }
};

// === === === update / new password === === === //

exports.unpassword = (data) => {
  const { password, cPassword } = data;
  if (!password || !cPassword) {
    handleError("Please input all fields", 400);
  }
  if (password != cPassword) {
    handleError("Password and confirm password must be same", 400);
  } else if (!validator.isStrongPassword(password)) {
    handleError("Please enter a strong password", 400);
  }
};

// === === === use of password === === === //

exports.password = (data) => {
  const { password } = data;
  if (!password) {
    handleError("Please input all fields", 400);
  } else if (!validator.isStrongPassword(password)) {
    handleError("Invalid credentials", 400);
  }
};

// === === === username === === === //

exports.username = (data) => {
  const { username } = data;
  if (!username) {
    handleError("Please input all fields", 400);
  } else if (!validator.isLength(username, { min: 3, max: 15 })) {
    handleError("Please enter a valid user name", 400);
  }
};

// === === === login === === === //

exports.login = (data) => {
  let { email, username } = data;
  if (!email && !username) {
    handleError("Invalid credentials", 400);
  } else if (username) {
    this.username(data);
  } else {
    this.email(data);
  }
  this.password(data);
};

// === === === register === === === //

exports.register = (data) => {
  this.email(data);
  this.username(data);
  this.unpassword(data);
};
