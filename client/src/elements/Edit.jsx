import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://student-web-site-2d8p.vercel.app/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid bg-primary vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-white text-center my-4">Edit User {id}</h1>
          <Link to="/" className="btn btn-success mb-3">
            Back
          </Link>
          {data.map((student) => (
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
              <div className="form-group my-3">
                <label htmlFor="name">Name</label>
                <input
                  value={student.name}
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], name: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="email">Email</label>
                <input
                  value={student.email}
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], email: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="gender">Gender</label>
                <input
                  value={student.gender}
                  type="text"
                  className="form-control"
                  name="gender"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], gender: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="age">Age</label>
                <input
                  value={student.age}
                  type="number"
                  className="form-control"
                  name="age"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], age: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <button type="submit" className="btn btn-success btn-block">
                  Save
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Edit;