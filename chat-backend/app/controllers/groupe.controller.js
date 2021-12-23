const db = require("../models");
const Groupe = db.groupes;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const groupe = new Groupe({
    name: req.body.name,
    owner: req.body.owner,
  });

  groupe
    .save(groupe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the groupe."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.title;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Groupe.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving etageres."
      });
    });
};

