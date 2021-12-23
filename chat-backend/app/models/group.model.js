module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
        name: String,
        owner: {
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

  return  Groupe = mongoose.model("Groupe", schema);
};
