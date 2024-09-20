import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post('https://student-web-site-2d8p.vercel.app/add_user', values)
        .then((res)=>{
            
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className="container vh-100 bg-primary">
          <h3 className="text-white">Add Student</h3>
          <Link to="/" className="btn btn-success mb-3">Home</Link>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
            { /* Form fields with Bootstrap classes */ }
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" required onChange={(e) => setValues({ ...values, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="email" required onChange={(e) => setValues({ ...values, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input type="text" className="form-control" name="gender" required onChange={(e) => setValues({ ...values, gender: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" className="form-control" name="age" required onChange={(e) => setValues({ ...values, age: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-success">Save</button>
          </form>
        </div>
      );
}

export default Create