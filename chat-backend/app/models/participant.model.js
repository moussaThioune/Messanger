module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
        name: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        groupeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Groupe"
        },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
  });

  return  Participant = mongoose.model("Participant", schema);
};
