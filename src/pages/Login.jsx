import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({});
  const navigate = useNavigate();
  function changeHandler(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
        {
          headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
        }
      );
      const token = res.data.token;
      console.log("Token:", token);
      localStorage.setItem("authToken", token);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErr(error.response.data);
      }
    }
  }
  return (
    <form className="container mx-auto mt-20" onSubmit={submitHandler}>
      <h1>Login</h1>
      {err && <p className="text-red-500">{err.error}</p>}
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                placeholder="janesmith"
                onChange={changeHandler}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="sm:col-span-4">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="xxxxxxxxx"
                value={formData.password}
                onChange={changeHandler}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button className="bg-green-400 px-3 py-2 rounded m-3 mx-auto">
          Login
        </button>
        <br />
        <a href="/register" className="text-blue-500">
          Register
        </a>
      </div>
    </form>
  );
}
