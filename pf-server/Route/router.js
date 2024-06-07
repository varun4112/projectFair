const express = require("express"); // Importing the express module for creating the router
const router = new express.Router(); // Creating a new router instance using express

const userController = require("../Controller/userController");
const projectController = require("../Controller/projectController");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const multerConfig = require("../middleware/multerMIddleware");


// register route for user registration
router.post("/user/register", userController.register); // Defines a POST endpoint for user registration

// login
router.post("/user/login", userController.login);

// add project
router.post(
  "/projects/add",
  jwtMiddleware,
  multerConfig.single("projectimage"),
  projectController.addProjects
);

// getuserProjects

router.get(
  "/projects/all-projects",
  jwtMiddleware,
  projectController.allUserProject
);

// getAllUserProjects

router.get("/projects/all", jwtMiddleware, projectController.getAllProject);

// getHomeProjects

router.get("/projects/home-projects", projectController.getHomeProject);

// editProject
router.put("/projects/edit/:id",jwtMiddleware,multerConfig.single("projectimage"),projectController.editProject);


//delete project
router.delete("/projects/remove/:id",jwtMiddleware,projectController.deleteProjectController)

// export  router
module.exports = router;
