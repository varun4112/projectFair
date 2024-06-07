import React, { createContext, useState } from "react";
export const addProjectsResponseContext = createContext();

function Context({Children}) {
  const [addProjectsResponse, setAddProjectsResponse] = useState({});
  return (
    <>
      <addProjectsResponseContext.Provider
        value={(addProjectsResponse, setAddProjectsResponse)}
      >
        {Children}
      </addProjectsResponseContext.Provider>
    </>
  );
}

export default Context;
