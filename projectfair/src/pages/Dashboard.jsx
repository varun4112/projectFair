import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Myprofile from "../component/Myprofile";
import Myprojects from "../component/Myprojects";
import { Col, Row } from "react-bootstrap";

function Dashboard() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username);
    }
  });

  return (
    <>
      <Header insideDashboard />
      <h2 className="m-5 ps-2">
        Welcome, <span style={{ color: "yellow" }}>{username}</span>
      </h2>
      <Row className="m-5">
        <Col sm={12} md={8}>
          <Myprojects />
        </Col>
        <Col sm={12} md={4}>
          <Myprofile />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
