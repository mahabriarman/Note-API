const Note= require("../models/user")
const express = require("express")

async function handleCreateNote(req,res){
    try {
        const body = req.body
        const note = await Note.create(body)
        return res.status(201).json(note)
    } catch (error) {
        return res.status(500).json({
            message : "Error creating note",
            error :error.message,
        })
    }
}

async function handleGetALLNote(req,res){
    try{
        const note = await Note.find({})
        return res.status(200).json(note)
    }catch(error){
        return res.status(404).json({
            message : "Error Fretching Note",
            error : error.message
        })
    }
}

async function handleGetNotebyId(req,res){
    try { 
        const note = await Note.findById(req.params.id)
       if(!note){
    return res.status(404).json({
        message : "Note not found"
    })
}
        return res.status(200).json(note)
        
    } catch (error) {
        return res.status(500).json({
            message : "Error in Fetching ",
            error : error.message
        })
        
    }
}

async function handleUpdateById(req,res){
    try {
        const updatenote = await Note.findByIdAndUpdate(req.params.id,
            req.body,{
                new : true,
                runValidators : true
            }
        )
        if(!updatenote){
            return res.status(404).json({
                message : "user not found",  
                status : "error"
            })
        }

        return res.status(201).json({
            message : "success",
            data: updatenote
        })

    } catch (error) {
        return res.status(501).json({
            message : "Error While fetching",
            error : error.message
        })
        
    }
}

async function handleDeleteById(req,res){
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if(!deleteNote){
        return res.status(404).json({
            message : "Note not found",
            status : "error"
        })
    }

    return res.status(200).json({
        message : " Note delete successfully",
        status : "success",
        data : deleteNote
    })
    } catch (error) {
        return res.status(500).json({
            message : "error while fetching",
            error : error.message
        })
    }
}

async function handleGetBytitle(req,res){
    try {
        const TitleNote = await  Note.findOne({
            title: req.params.title
        })

        if(!TitleNote){
            return res.status(404).json({
                message : "Note not Found",
                status : "Error",
            })
        }
        return res.status(200).json({
            message : "successfully fetching",
            data : TitleNote
        })
    } catch (error) {
        return res.status(500).json({
            message : "error while fetching",
            error : error.message
        })
    
    }
}

// HOME PAGE
async function handleHomePage(req, res) {
    try {
        const notes = await Note.find({
             createdBy: req.user._id
        }).sort({
            createdAt :-1
        })

        const totalNotes = notes.length;

        const totalTags = notes.reduce(
        (count,note) => count + note.tag.length,0)
        
        const latestNote = notes.length > 0
        ?notes[0].title
        : "No Notes"
        const success = req.session.success;
        delete req.session.success
        return res.render("home", {
            notes,
            user : req.user,
            totalNotes,
            totalTags,
            latestNote,
            success
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error loading home page",
            error: error.message,
        });
    }
}

// ADD PAGE
async function handleAddPage(req, res) {
    return res.render("addNote");
}

// CREATE NOTE FROM EJS FORM
async function handleAddNoteFromView(req, res) {
    try {
        console.log(req.body);
        await Note.create({
    title : req.body.title,
    content: req.body.content,
   tag : req.body.tag
    ? req.body.tag
        .split(",")
        .map(tag => tag.trim())
    : [],
    createdBy : req.user._id
})
        req.session.success="Note Created Successfully"
        return res.redirect("/user/home");
    } catch (error) {
        return res.status(500).json({
            message: "Error while adding note",
            error: error.message,
        });
    }
}

// VIEW SINGLE NOTE PAGE
async function handleViewPage(req, res) {
    try {
        const note = await Note.findById({_id: req.params.id,
    createdBy: req.user._id});

        if (!note) {
            return res.status(404).send("Note not found");
        }

        return res.render("viewNote", {
            note,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

// EDIT PAGE
async function handleEditPage(req, res) {
    try {
        const note = await Note.findById({_id: req.params.id,
    createdBy: req.user._id});

        if (!note) {
            return res.status(404).send("Note not found");
        }

        return res.render("editNote", {
            note,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

// UPDATE NOTE FROM EJS FORM
async function handleUpdateFromView(req, res) {
    try {
        const note = await Note.findByIdAndUpdate(
            {_id: req.params.id,
    createdBy: req.user._id},
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!note) {
            return res.status(404).send("Note not found");
        }

        return res.redirect("/user/home");
    } catch (error) {
        return res.status(500).json({
            message: "Error updating note",
            error: error.message,
        });
    }
}

// DELETE NOTE FROM HOME PAGE
async function handleDeleteByHomePage(req, res) {
    try {
        const note = await Note.findByIdAndDelete({
    _id: req.params.id,
    createdBy: req.user._id
}
        );

        if (!note) {
            return res.status(404).send("Note not found");
        }

        return res.redirect("/user/home");
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting note",
            error: error.message,
        });
    }
}
async function handleSearchNotes(req,res){

    const searchText = req.query.title;

    const notes = await Note.find({
        title:{
            $regex: searchText,
            $options:"i"
        }
    });

    return res.render("home",{
        notes
    });
}
module.exports={
    handleCreateNote,
    handleGetALLNote,
    handleGetNotebyId,
    handleUpdateById,
    handleDeleteById,
    handleGetBytitle,
    handleHomePage,
    handleAddPage,
    handleAddNoteFromView,
    handleViewPage,
    handleEditPage,
    handleUpdateFromView,
    handleDeleteByHomePage,
    handleSearchNotes
}