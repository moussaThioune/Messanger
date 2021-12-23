module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
        message: String,
        groupeId: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
  });

  return  Message = mongoose.model("Message", schema);
};
