import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.get('https://student-web-site-2d8p.vercel.app/students')
            .then((res) => {
                setData(res.data);
                setFilteredData(res.data); // Initialize filteredData with all students
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = data.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleDelete = (id) => {
        axios.delete(`https://student-web-site-2d8p.vercel.app/delete/${id}`)
            .then(() => {
                setData(data.filter(student => student.id !== id));
                setFilteredData(filteredData.filter(student => student.id !== id)); // Update filtered data
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='container-fluid bg-primary vh-100'>
            <h3 className='text-white text-center my-4'>Student Management</h3>
            <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success">Search</button>
                </div>
            </form>
            <div className='d-flex justify-content-end mb-3'>
                <Link className='btn btn-success' to='/create'>Add Student</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.length > 0 ? (
                                filteredData.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.age}</td>
                                        <td>{student.gender}</td>
                                        <td>
                                            <Link className='btn btn-info mx-2' to={`/read/${student.id}`}>Read</Link>
                                            <Link className='btn btn-warning mx-2' to={`/edit/${student.id}`}>Edit</Link>
                                            <button onClick={() => handleDelete(student.id)} className='btn btn-danger mx-2'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No results found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;