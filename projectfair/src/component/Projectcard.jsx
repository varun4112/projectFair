import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Col, Modal, Row } from "react-bootstrap";
import { BASE_URL } from "../services/baseURL";
function Projectcard({ item }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={
              item ? `${BASE_URL}/uploads/${item?.projectimage}` : "No Image"
            }
            alt="Project Image"
            onClick={handleShow}
          />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{item.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <img
                  src={
                    item
                      ? `${BASE_URL}/uploads/${item?.projectimage}`
                      : "No Image"
                  }
                  style={{ height: "200px" }}
                  alt=""
                />
              </Col>
              <Col md={6}>
                <h2>Project Overview</h2>
                <p>{item.overview}</p>
                <p>
                  <b>Language used : </b>
                  <span>{item.language}</span>{" "}
                </p>
              </Col>
            </Row>
            <div>
              <a className="ms-1" href={item.github}>
                <i class="fa-brands fa-github fa-2xl"></i>
              </a>
              <a className="ms-1" href={item.website}>
                <i class="fa-solid fa-link fa-2xl"></i>
              </a>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Projectcard;
