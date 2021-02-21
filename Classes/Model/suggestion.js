var mongoose = require("mongoose");

var suggestionSchema = new mongoose.Schema({
  section: {
    type: String,
    require: true,
  },
  group: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  isDisplay: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("suggetion", suggestionSchema);
