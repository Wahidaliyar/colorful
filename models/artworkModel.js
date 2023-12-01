const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An artwork must have a name"],
      unique: [true, "تابلویی با این نام موجود است!"],
      maxlength: [
        50,
        "An artwork name must have less or equal than 50 characters",
      ],
    },
    price: {
      type: Number,
      required: [true, "An artwork must have a price"],
    },
    category: String,
    height: Number,
    width: Number,
    paperMaterial: String,
    image: String,
    state: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
    description: {
      type: String,
      trim: true,
    },
    artist: { type: mongoose.Schema.ObjectId, ref: "Artist" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // comment: [{ type: mongoose.Schema.ObjectId, ref: '' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

artworkSchema.pre(/^find/, function (next) {
  this.populate({
    path: "artist",
    select:
      "-__v -passwordChangedAt -bio -createdAt -whatsappLink -facebookLink -instagramLink -phone -email -artworks",
  });

  next();
});

// Virtual populate
// artworkSchema.virtual("comments", {
//   ref: "Comment",
//   foreignField: "artwork",
//   localField: "_id",
// });

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
