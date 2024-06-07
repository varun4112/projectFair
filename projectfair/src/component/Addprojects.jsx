import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addProjectAPI } from "../services/allAPI";
import { addProjectsResponseContext } from "../Contexts/ContextShare";

function Addprojects() {
  const { addProjectsResponse, setAddProjectsResponse } = useContext(
    addProjectsResponseContext
  );
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    overview: "",
    github: "",
    website: "",
    projectimage: "",
  });
  console.log(projectDetails);

  const [token, setToken] = useState("");
  console.log("token", token);

  // converting image file to URL

  // We create a state variable 'preview' and a function 'setPreview' to update it.
  const [preview, setPreview] = useState("");

  // This function is called whenever 'projectDetails.projectimage' changes.
  // It checks if 'projectDetails.projectimage' exists.
  // If it does, it creates a preview of the image using its URL and updates the 'preview' state.
  useEffect(() => {
    if (projectDetails.projectimage) {
      setPreview(URL.createObjectURL(projectDetails.projectimage));
    }
  }, [projectDetails.projectimage]);
  console.log(preview);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  // End of converting image file to URL

  // adding data to projects
  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, language, overview, github, website, projectimage } =
      projectDetails;
    if (
      !title ||
      !language ||
      !overview ||
      !github ||
      !website ||
      !projectimage
    ) {
      alert("please fill empty feilds");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("projectimage", projectimage);

      const reqHeader = {
        "content-type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      };
      console.log("REQBODY", Object.fromEntries(reqBody.entries()));

      console.log("req header", reqHeader);
      const result = await addProjectAPI(reqBody, reqHeader);
      if (result.status === 200) {
        console.log(result.data);
        setAddProjectsResponse(result.data);
        handleClose();
      } else {
        console.log(result);
        console.log(result.response.data);
      }
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title: "",
      language: "",
      overview: "",
      github: "",
      website: "",
      projectimage: "",
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-info" onClick={handleShow}>
        Add Project
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  name=""
                  id=""
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      projectimage: e.target.files[0],
                    })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://static.vecteezy.com/system/resources/thumbnails/005/083/124/small/cloud-with-upward-direction-arrow-flat-design-of-cloud-uploading-icon-vector.jpg"
                  }
                  alt=""
                  width={"200px"}
                />
              </label>
            </div>
            <div className="col-6">
              <input
                placeholder="Project Name"
                className="w-100 p-1 mt-1"
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    title: e.target.value,
                  })
                }
              ></input>
              <input
                placeholder="Language Used"
                className="w-100 p-1 mt-1"
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    language: e.target.value,
                  })
                }
              ></input>
              <input
                placeholder="Github Link"
                className="w-100 p-1 mt-1"
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    github: e.target.value,
                  })
                }
              ></input>
              <input
                placeholder="Wesite Link"
                className="w-100 p-1 mt-1"
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    website: e.target.value,
                  })
                }
              ></input>
              <input
                placeholder="Project Overview"
                className="w-100 p-1 mt-1"
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    overview: e.target.value,
                  })
                }
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addprojects;
