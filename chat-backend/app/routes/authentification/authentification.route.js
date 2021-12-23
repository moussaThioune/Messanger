const user = require("../../controllers/authentification.controller");
const authRouter = require("express").Router();
/***  AUTHENTIFICATION USER  ***/
// Login user
authRouter.post("/authentification/login", user.login);

// Register user
authRouter.post("/authentification/register", user.register);

/***  END AUTHENTIFICATION USER ***/

module.exports = authRouter;
