const mongoose = require("mongoose");
const User = require("./artworkModel");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An artist must have a name."],
  },
  image: String,
  bio: {
    type: String,
    trim: true,
  },
  instagramLink: String,
  facebookLink: String,
  email: String,
  phone: String,
  whatsappLink: String,
  artworks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Artwork",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

artistSchema.pre(/^find/, function (next) {
  this.populate({
    path: "artworks",
    select: "-__v",
  });

  next();
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
