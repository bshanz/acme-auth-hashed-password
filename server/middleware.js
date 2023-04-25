const { User } = require("./db");

async function restricted(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const user = await User.findByToken(token);
    req.user = user;
  }

  next();
}

module.exports = restricted;
