const mongoose = require("mongoose");
const schemaTypes = mongoose.Types;
const todoSchema = new mongoose.Schema({
     user: {type: schemaTypes.ObjectId, ref: "users", required: true},
     text: {type: String, required: true},
     completed: {type: Boolean, default: false} 
}, {
    timestamps: true
})

module.exports = mongoose.model("todos", todoSchema);
