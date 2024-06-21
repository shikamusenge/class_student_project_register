const appKey = require("../utilities/keyGen");

const Auth = (req, res, next) => {
  const reqKey = req.headers.authorization;
  if (!reqKey) {
    return res
      .status(400)
      .json({ message: "bad request Access key is required" });
  } else if (`Bearer ${appKey}` == reqKey || appKey == reqKey) {
    next();
  } else {
    return res.status(400).json({ message: "bad request Enter valid key " });
  }
};
module.exports = Auth;
