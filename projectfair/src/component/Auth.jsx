import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import login from "../Assets/login.avif";
import { registerAPI, loginAPI } from "../services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokenAuthorizationContext } from "../Contexts/TokenAuth";

function Auth({ register }) {
  const { isAuthorized, setIsAuthorized } = useContext(
    tokenAuthorizationContext
  );
  const isRegisterForm = register ? true : false;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log(userData);

  // This function handles the registration form submission.
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.
    const { username, email, password } = userData; // Destructure userdata object to extract username, email, and password.
    // Check if any of the required fields are empty.
    if (!username || !email || !password) {
      toast.warning("Please Enter All Fields"); // Display an alert message if any field is empty.
    } else {
      // If all required fields are filled, make an API call to register the user.
      const result = await registerAPI(userData); // Call registerAPI function with userdata.
      console.log(result); // Log the result of the registration API call.
      if (result.status == 200) {
        // alert(`Sucessfully Registered ${result.data.username}`);
        toast.success("sucessfully registered");
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error(`${result.response.data}`);
      }
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.
    const { email, password } = userData;
    // Check if any of the required fields are empty.
    if (!email || !password) {
      toast.warning("Please Enter All Fields"); // Display an alert message if any field is empty.
    } else {
      // If all required fields are filled, make an API call to register the user.
      const result = await loginAPI(userData); // Call registerAPI function with userdata.
      console.log(result); // Log the result of the registration API call.
      if (result.status == 200) {
        // alert(`Sucessfully Registered ${result.data.username}`);
        toast.success("sucessfully Login");

        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);
        setIsAuthorized(true);

        setUserData({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        toast.error(`${result.response.data}`);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
      <div
        style={{ width: "100%" }}
        className="d-flex mt-5 mb-5 justify-content-center align-items-center"
      >
        <div className="container w-75">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            Back To Home
          </Link>
          <div className="card shadow  p-3 bg-info">
            <div className=" row align-items-center">
              <div className="col-lg-6">
                <img
                  src={login}
                  alt=""
                  className="img img-fluid rounded-start w-100"
                />
              </div>

              <div className="col-lg-6">
                <div className=" d-flex align-items-center flex-column">
                  <h2 className="text-dark">
                    <i class="fa-solid fa-diagram-project"></i>Project Fair
                  </h2>
                  <h5 className="text-dark">
                    {isRegisterForm
                      ? "Sign Up To Your Account"
                      : "Sign In To Your Account"}
                  </h5>
                  <Form className=" p-3 w-100">
                    {isRegisterForm && (
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter UserName"
                          value={userData.username}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              username: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    )}
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={userData.password}
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                      />
                    </Form.Group>
                    {isRegisterForm ? (
                      <div>
                        <Button className="w-100" onClick={handleRegister}>
                          Sign Up
                        </Button>
                        <p className="text-dark m-2">
                          Already Have an Account? Click Here to{" "}
                          <Link to={"/login"}>Login</Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Button className="w-100" onClick={handleLogin}>
                          Login
                        </Button>
                        <p className="text-dark m-2">
                          New User? Click Here To{" "}
                          <Link to={"/register"}>Register </Link>
                        </p>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
