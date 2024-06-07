import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import projectgif from "../Assets/project.gif";
import Projectcard from "../component/Projectcard";
import { Link } from "react-router-dom";
import { homeProjectAPI } from "../services/allAPI";

function Home() {
  const [loggedin, setLoggedin] = useState(false);
  const [homeProjects, setHomeProjects] = useState([]);

  // Api call
  const getHomeProjects = async () => {
    const result = await homeProjectAPI();
    console.log("result", result);
    if (result.status === 200) {
      setHomeProjects(result.data);
    } else {
      console.log(result);
      console.log(result.response.data);
    }
  };
  console.log("HOME PROJECTS", homeProjects);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
    getHomeProjects();
  }, []);

  // api Call

  return (
    <>
      <div className="container-fluid" style={{ width: "100%" }}>
        <Row className="align-items-center m-5">
          <Col sm={12} md={6} className="p-lg-5 ">
            <h1 style={{ fontSize: "80px" }}>Project Fair</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              molestias praesentium est ex earum, sed, tempore, quam veritatis
              laborum alias adipisci tempora labore maiores doloremque dolorum
              asperiores sit deleniti modi!
            </p>
            {loggedin ? (
              <Link to={"dashboard"}>Manage Your Projects</Link>
            ) : (
              <Link to={"login"}>Start To Explore</Link>
            )}
          </Col>
          <Col sm={12} md={6} className="p-5">
            <img className="img img-fluid" src={projectgif} alt="project gif" />
          </Col>
        </Row>
      </div>

      {/* All projects */}

      <div className="all-project m-5">
        <h1 className="text-center">Explore All Your Projects</h1>
        <marquee scrollAmount={10}>
          <Row className="d-flex">
            {homeProjects?.length > 0
              ? homeProjects.map((item) => (
                  <Col sm={12} md={6} lg={4}>
                    <Projectcard item={item} />
                  </Col>
                ))
              : null}
          </Row>
        </marquee>
      </div>
      <div className="text-center m-5">
        <Link to={"/projects"}>View More Projects</Link>
      </div>
    </>
  );
}

export default Home;
