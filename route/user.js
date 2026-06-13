const express = require("express");

const routes = express.Router();

const {
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
} = require("../controller/user");
const { checkAuth } =
require("../middleware/auth");


// Views
routes.get("/home", checkAuth, handleHomePage);

routes.get("/add",checkAuth,handleAddPage);
routes.post("/add",checkAuth,handleAddNoteFromView);

routes.get("/view/:id", checkAuth, handleViewPage);

routes.get("/edit/:id", checkAuth, handleEditPage);

routes.post("/edit/:id", checkAuth, handleUpdateFromView);

routes.post("/delete/:id", checkAuth, handleDeleteByHomePage);

routes.get("/search", checkAuth, handleSearchNotes);

// API Routes
routes.post("/", handleCreateNote);

routes.get("/", handleGetALLNote);

routes.get("/title/", handleGetBytitle);

routes.get("/", handleGetNotebyId);

routes.patch("/", handleUpdateById);

routes.delete("/", handleDeleteById);

module.exports = routes;