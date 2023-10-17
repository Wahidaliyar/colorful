const mongoose = require("mongoose");
const User = require("./artworkModel");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An artist must have a name."],
  },
  field: String,
  image: String,
  bio: {
    type: String,
    trim: true,
  },
  instagramLink: String,
  facebookLink: String,
  email: String,
  whatsappLink: String,
  artworks: Array,
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
