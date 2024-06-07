import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Projectcard from "./Projectcard";
import { BASE_URL } from "../services/baseURL";
import { editProjectAPI } from "../services/allAPI";
import { editProjectResponseContext } from "../Contexts/ContextShare";
function EditProject({ item }) {
  const { editProjectResponse, setEditProjectResponse } = useState(
    editProjectResponseContext
  );
  //  function to close modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setProjectDetails({
      id: item._id,
      title: item.title,
      language: item.language,
      github: item.github,
      website: item.website,
      overview: item.overview,
      projectimage: "",
    });
    setPreview("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  // end of close modal function

  // function to edit data
  const [preview, setPreview] = useState("");
  console.log("PREVIEW", preview);

  const [projectDetails, setProjectDetails] = useState({
    id: item._id,
    title: item.title,
    language: item.language,
    github: item.github,
    website: item.website,
    overview: item.overview,
    projectimage: "",
  });

  const [token, setToken] = useState("");
  console.log("token", token);

  useEffect(() => {
    if (projectDetails.projectimage) {
      setPreview(URL.createObjectURL(projectDetails.projectimage));
    }
  }, [projectDetails.projectimage]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const handleupdate = async () => {
    const { id, title, language, overview, github, website, projectimage } =
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
      projectimage
        ? reqBody.append("projectimage", projectimage)
        : reqBody.append("projectimage", item.projectimage);

      if (preview) {
        const reqHeader = {
          "content-type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        };
        const result = await editProjectAPI(id, reqBody, reqHeader);
        // api call
        if (result.status === 200) {
          handleClose();
          setEditProjectResponse(result.response.data);
        } else {
          console.log(result);
          console.log(result.response.data);
        }
      } else {
        const reqHeader = {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        };
        //api call
        const result = await editProjectAPI(id, reqBody, reqHeader);
        if (result.status === 200) {
          handleClose();
        } else {
          console.log(result);
          console.log(result.response.data);
        }
      }
    }
  };
  console.log(projectDetails);
  // end of edit data

  return (
    <>
      <div>
        <button className="btn btn-outline" onClick={handleShow}>
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
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
                      : `${BASE_URL}/uploads/${item.projectimage}`
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
                value={projectDetails.title}
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
                value={projectDetails.language}
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
                value={projectDetails.github}
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
                value={projectDetails.website}
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
                value={projectDetails.overview}
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
          <Button variant="primary" onClick={handleupdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;
