import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import Projectcard from "../component/Projectcard";
import { allProjectAPI } from "../services/allAPI";

function Projects() {
  // Search Projects by Technology
  const [searchKey, setSearchKey] = useState("");
  console.log(searchKey);

  const [allProjects, setAllProjects] = useState([]);
  const getAllProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      };
      const result = await allProjectAPI(searchKey, reqHeader);
      if (result.status === 200) {
        setAllProjects(result.data);
      } else {
        console.log(result);
      }
    }
  };
  console.log(allProjects);
  useEffect(() => {
    getAllProjects();
  }, [searchKey]);

  return (
    <>
      <Header />
      <div className="projects" style={{ marginTop: "100px" }}>
        <h1 className="text-center mb-5">All Projects</h1>
        <div className=" d-flex justify-content-center align-item-center w-100">
          <div className="d-flex m-5 w-50 ">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <i class="fa-solid fa-magnifying-glass"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search Project By Technologies"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="all-project m-5">
          <h1 className=" m-2 text-center">All Projects</h1>
          <Row>
            {/* <Projectcard /> */}
            {allProjects?.length > 0
              ? allProjects.map((item) => (
                  <Col className="mt-3" sm={12} md={6} lg={4}>
                    <Projectcard item={item} />
                  </Col>
                ))
              : null}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Projects;
