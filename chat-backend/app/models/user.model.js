module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
        email: String,
        password: String,
        name: String,
        groups: [String]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
  });

  return  User = mongoose.model("User", schema);
};
