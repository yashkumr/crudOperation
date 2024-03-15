import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Updateuser = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleUser = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/single-product/${params.slug}`
      );
      setName(data.user.name);
      setId(data.user._id);
      setEmail(data.user.email);
      setPassword(data.user.password);
      setCountry(data.user.country);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleUser();
    //eslint-disable-next-line
  }, []);

  // create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      userData.append("password", password);
      userData.append("country", country);
      
      const { data } = axios.put(
        `/api/v1/auth/update/${id}`,
        userData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("User Updated Successfully");
        navigate("/");
      }
    }

    catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleUpdate} className="m-5">
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
      </div>
    </>
  );
};

export default Updateuser;
