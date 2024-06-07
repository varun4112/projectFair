import React, { createContext, useState } from "react";

export const addProjectsResponseContext = createContext();
export const editProjectResponseContext = createContext();

function ContextShare({ children }) {
  const [addProjectsResponse, setAddProjectsResponse] = useState({});
  const [editProjectResponse, setEditProjectResponse] = useState({});

  return (
    <addProjectsResponseContext.Provider
      value={{ addProjectsResponse, setAddProjectsResponse }}
    >
      <editProjectResponseContext.Provider
        value={{ editProjectResponse, setEditProjectResponse }}
      >
        {children}
      </editProjectResponseContext.Provider>
    </addProjectsResponseContext.Provider>
  );
}

export default ContextShare;
