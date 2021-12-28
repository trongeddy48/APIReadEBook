import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import documentController from "../controllers/documentController";

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

  //API Documents
  router.get("/api/get-list-documents", documentController.getListDocuments);
  router.get("/api/get-document-by-id", documentController.getDocumentById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
