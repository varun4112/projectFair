const projects = require("../Model/projectSchema");
// addProjects

exports.addProjects = async (req, res) => {
  const userId = req.payload;
  const projectimage = req.file.filename;
  console.log(projectimage);
  const { title, language, overview, github, website } = req.body;
  console.log(
    `${title},${language},${overview},${github},${website},${userId}`
  );
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("project already exists");
    } else {
      const newProject = new projects({
        title,
        language,
        overview,
        github,
        website,
        projectimage,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(`add project api failed Error: ${err}`);
  }

  // res.status(200).json("addProject request recieved");
};

// getalluserprojects

exports.allUserProject = async (req, res) => {
  const userId = req.payload;
  try {
    const userProjects = await projects.find({ userId });
    res.status(200).json(userProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getAllProject = async (req, res) => {
  const userId = req.payload;
  const searchKey = req.query.search;
  const query = {
    language: { $regex: searchKey, $options: "i" },
  };
  try {
    const projectDetails = await projects.find(query);
    res.status(200).json(projectDetails);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getHomeProject = async (req, res) => {
  const userId = req.payload;

  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.editProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.payload;
  const projectimage = req.file.filename;
  console.log("projectimage",projectimage)
  const { title, language, overview, github, website } = req.body;
  console.log("reqBody", req.body);
  const uploadProjectImage = req.file ? req.file.filename : projectimage;
  try {
    const updateProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        language,
        overview,
        github,
        projectimage: uploadProjectImage,
        userId,
      },
      { new: true }
    );
    await updateProject.save();
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(401).json(err);
  }
};

// DELETE  PROJECT

exports.deleteProjectController = async (req, res) => {
  const { id } = req.params;
  try {
    const removeProject = await projects.findByIdAndDelete({ _id: id });
    res.status(200).json(removeProject);
  } catch (err) {
    res.status(401).json(err);
  }
};
