import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import EditPost from "./edit";
import { useEffect, useState } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchAPI = async function () {
      const res = await fetch("http://localhost:7070/api/blogs/all");
      const res1 = await res.json();
      if (res1.data) {
        console.log(res1.data);
        setBlogs(res1.data);
      }
    };
    fetchAPI();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<Home blogs={blogs} setBlogs={setBlogs} />}
        />
        <Route
          path="/editpost/:id"
          element={<EditPost blogs={blogs} setBlogs={setBlogs} />}
        />
      </Routes>
    </div>
  );
}

export default App;
