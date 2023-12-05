import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Detail from "./components/Detail";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useLocation } from "react-router-dom";
import Form from "./components/Form";
import Error404 from "./components/Error404";

const App = () => {
  const [sideBar, setSideBar] = useState(false);

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  const [animate, setAnimate] = useState(false);

  const handleToggleClick = () => {
    setAnimate(!animate);
  };

  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== "/" && (
        <NavBar
          handleSideBar={handleSideBar}
          handleToggleClick={handleToggleClick}
        />
      )}

      {pathname !== "/" && <SideBar animate={animate} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create-game" element={<Form />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
