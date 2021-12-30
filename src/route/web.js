import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import documentController from "../controllers/documentController";
import adminController from "../controllers/adminController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  //API Users
  router.post("/api/signup", userController.handleSignup);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-user", userController.getAllUser);
  router.get("/api/edit-user", userController.getEditUser);
  router.post("/api/update-user", userController.updateUser);
  router.get("/api/delete-user", userController.deleteUser);

  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-a-user", userController.handleEditUser);
  router.delete("/api/delete-a-user", userController.handleDeleteUser);

  //API Documents
  router.get("/api/get-list-documents", documentController.getListDocuments);
  router.get("/api/get-detail-document", documentController.getDetailDocument);
  router.get("/api/get-document-by-id", documentController.getDocumentById);
  router.post("/api/create-new-document", documentController.createNewDocument);
  router.put("/api/edit-document", documentController.editDocument);
  router.delete("/api/delete-document", documentController.deleteDocument);

  router.get("/api/get-doc-by-author", documentController.getDocumentByAuthor);

  //API Admin
  router.get("/api/get-list-publisher", adminController.getListPublisher);
  router.get("/api/get-list-category", adminController.getListCategory);
  router.get("/api/get-list-author", adminController.getListAuthor);
  router.post("/api/create-new-publisher", adminController.createNewPublisher);
  router.post("/api/create-new-category", adminController.createNewCategory);
  router.post("/api/create-new-author", adminController.createNewAuthor);


  return app.use("/", router);
};

module.exports = initWebRoutes;
