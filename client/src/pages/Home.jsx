import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [users, setUsers] = useState([]);

  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/v1/auth/register", {
        name,
        email,
        password,
        country,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get("api/v1/auth/allUser");

      if (data && data?.success) {
        setUsers(data?.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting users");
    }
  };
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`api/v1/auth/delete-user/${pId}`);
      if (data.success) {
        toast.success(`category is deleted`);

        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong with delete users");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="m-5">
        <h1 className="text-center">Users Registratin form</h1>
        <div>
          <div className="container m-5">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"></span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="email"
                aria-label="email"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"></span>
              <input
                type="number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon1"
              />
            </div>

            <select
              className="form-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              aria-label="Default select example"
            >
              <option selected>country</option>
              <option value={1}>INDIA</option>
              <option value={2}>AUSTRELIA</option>
              <option value={3}>PAKISTAN</option>
            </select>

            <div>
              <button type="submit" className=" mt-3 btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="container">
        <div className="w-75">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((c) => (
                <>
                  <tr>
                    <td key={c._id}>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.country}</td>
                    <td>
                      <button className="btn btn-warning ms-2">
                        <Link key={c._id} to={`/updateUser/${c.slug}`}>
                          Update
                        </Link>
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
