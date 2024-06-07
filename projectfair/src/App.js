import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Auth from "./component/Auth";
import { tokenAuthorizationContext } from "./Contexts/TokenAuth";
import { useContext } from "react";

function App() {
  const { isAuthorized, setIsAuthorized } = useContext(
    tokenAuthorizationContext
  );
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route
          path="/projects"
          element={isAuthorized ? <Projects /> : <Home />}
        />
        <Route path="/register" element={<Auth register />} />
        <Route
          path="/dashboard"
          element={isAuthorized ? <Dashboard /> : <Home />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
