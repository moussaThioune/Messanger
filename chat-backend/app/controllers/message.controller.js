const db = require("../models");
const Message = db.messages;
const User = db.users;
const io = require('../../server');


io.on('connection', (socket) => {
  console.log('New User Logged In with ID '+socket.id);
  socket.on('chatMessage', (data) =>{

  });

});
// Create and Save a new Etagere
exports.create = (req, res) => {
  // Validate request
  if (!req.body.message) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Message
  const message = new Message({
    message: req.body.message,
    groupeId: req.body.groupeId,
    sender: req.body.sender,
    receiver: req.body.receiver,
  });

  message
    .save(message)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.message;
  var condition = title ? { message: { $regex: new RegExp(message), $options: "i" } } : {};
  Message.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Message with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Message with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Message.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Etagere with id=${id}. Maybe Etagere was not found!`
        });
      } else res.send({ message: "Etagere was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Etagere with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
        });
      } else {
        res.send({
          message: "Message was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Message with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Message were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all messages."
      });
    });
};
exports.deleteAllMessage = (req, res) => {
  Message.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Message were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all messages."
      });
    });
};

exports.getUsersDiscussions = (req, res) => {
  Message.find({ $or: [
       {sender: req.params.sender, receiver: req.params.receiver},
       {sender: req.params.receiver, receiver: req.params.sender}
    ]}, (err, messages) => {
    if (err) {
      res.status(404).send({ message: "Not found Messages"});
    } else {
      res.send(messages);
    }
  });
};

exports.getGroupeDiscussions = (req, res) => {
  Message.find({groupeId: req.params.groupeId},
      (err, messages) => {
        if (err) {
          res.status(404).send({ message: "Not found Messages"});
        } else {
          res.send(messages);
        }
      });
};

exports.getAllUsers = (req, res) => {
  const title = req.query.email;
  const condition = title ? {email: {$regex: new RegExp(email), $options: "i"}} : {};
  User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving messages."
        });
      });
};

