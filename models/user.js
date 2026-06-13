const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
{
    title : {
        type : String,
        required : true,
        unique : true
    },

    content : {
        type : String,
        required : true
    },

    tag : {
        type : [String]
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},
{
    timestamps : true
}
);

const Note = mongoose.model(
    "Note",
    NoteSchema
);

module.exports = Note;