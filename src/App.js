import "./App.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      let res = await axios.get("https://api.apis.guru/v2/providers.json");
      let data = res.data;
      console.log(res.data);
      setData(data);
    };
    fetch();
  }, []);

  const toggleSideBar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    console.log("clicked toggle sidebar");
  };

  return (
    <div className="container">
      <button className="button" onClick={toggleSideBar}>
        Explore web APIs
      </button>
      {isOpen ? <Sidebar data={data} setIsOpen={setIsOpen} /> : null}
    </div>
  );
}

export default App;
