import React, { useContext, useEffect, useState } from "react";
import Addprojects from "./Addprojects";
import { userProjectAPI, deleteProjectAPI } from "../services/allAPI";
import {
  addProjectsResponseContext,
  editProjectResponseContext,
} from "../Contexts/ContextShare";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import EditProject from "./EditProject";

function Myprojects() {
  const { editProjectResponse, setEditProjectResponse } = useContext(
    editProjectResponseContext
  );

  const { addProjectsResponse, setAddProjectsResponse } = useContext(
    addProjectsResponseContext
  );
  const [userProjects, setUserProjects] = useState([]);
  // console.log(userProjects);

  const getUserStorage = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      };
      const result = await userProjectAPI(reqHeader);
      if (result.status === 200) {
        setUserProjects(result.data);
      } else {
        console.log(result);
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getUserStorage();
  }, [addProjectsResponse, editProjectResponse]);

  // DELETE PROJECT STARTING

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    };

    const result = await deleteProjectAPI(id, reqHeader);
    if (result.status === 200) {
      getUserStorage();
    } else {
      console.log(result.response.data);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card shadow  mt-2 p-3">
        <div className="d-flex">
          <h2>My Projects</h2>
          <div className="ms-auto">
            <Addprojects />
          </div>
          {addProjectsResponse.title ? (
            <Alert className="bg-success" dismissible>
              {addProjectsResponse.title}{" "}
              <span>Added Sucessfully</span>
            </Alert>
          ) : null}
        </div>
        {userProjects?.length > 0 ? (
          userProjects.map((item) => (
            <div className="border d-flex align-items-center justify-content-between round p-2">
              <h5 className="p-1">{item.title}</h5>
              <div className="icon-ms-auto d-flex">
                <div>
                  <button className="btn btn-outline">
                    <a href={item.github} style={{ textDecoration: "none" }}>
                      <i class="fa-brands fa-github"></i>
                    </a>
                  </button>
                </div>
                <div>
                  <EditProject item={item} />
                </div>
                <div>
                  <button
                    className="btn btn-outline"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "yellow" }}>No Projects Uploaded Yet</p>
        )}
      </div>
    </>
  );
}

export default Myprojects;
