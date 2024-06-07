import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import "./myprofile.css";

function Myprofile() {
  const [open, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    github: "",
    website: "",
  });
  console.log(profileDetails);

  // const handleProfileAdd = async (e) => {
  //   e.preventDefault();
  //   const { website, linkedin } = profileDetails;
  //   if (!website || !linkedin) {
  //     alert("please fill all feilds");
  //   } else {
  //     const reqBody = new FormData();
  //     reqBody.append("website", website);
  //     reqBody.append("linkedin", linkedin);

  //     const reqHeader = {
  //       "content-type": "multipart/form-data",
  //       authorization: `Bearer ${token}`,
  //     };
  //   }

  //   console.log("reqheader", reqHeader);
  //   const result = await addProjectAPI(reqBody, reqHeader);
  //   if (result.status === 200) {
  //     console.log(result.data);
  //   } else {
  //     console.log(result);
  //     console.log(result.response.data);
  //   }
  // };

  return (
    <>
      <div className="card shadow p-5  mt-2">
        <div className="d-flex justify-content-between ">
          <h1>Profile</h1>
          <button
            className="btn btn-outline-light"
            onClick={() => setOpen(!open)}
          >
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </div>
        <Collapse in={open}>
          <div className="row justify-content-center mt-3">
            <label>
              <input type="file" style={{ display: "none" }} name="" id="" />
              <img
                src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                alt=""
                width={"200px"}
                length={"200px"}
                className="propic rounded-circle ms-sm-2 ms-lg-5"
              />
            </label>
            <div className="w-100">
              <input
                type="text"
                className="w-100 mt-2 p-1"
                placeholder="Github Link"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    github: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="w-100 mt-1 p-1"
                placeholder="LinkedIn Link"
                onChange={(e) =>
                  setProfileDetails({
                    ...profileDetails,
                    website: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-1 text-align-center d-grid">
              <button className="btn btn-warning text-dark">Update</button>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default Myprofile;
