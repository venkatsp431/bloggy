import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import EditPost from "./edit";
import Login from "./login";
import Signup from "./signup";
import Users from "./users";
import { useEffect, useState } from "react";

function App() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchAPI = async function () {
      const res = await fetch("https://bloggy-2gzg.onrender.com/api/blogs/all");
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
          path="/editpost/:id"
          element={<EditPost blogs={blogs} setBlogs={setBlogs} />}
        />
        <Route path="/" element={<Home blogs={blogs} setBlogs={setBlogs} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
