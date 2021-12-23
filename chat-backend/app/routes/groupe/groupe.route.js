const groupe = require("../../controllers/groupe.controller");
const groupeRouter = require("express").Router();

groupeRouter.get("/groupe", groupe.findAll);
groupeRouter.post("/groupe", groupe.create);

module.exports = groupeRouter;
