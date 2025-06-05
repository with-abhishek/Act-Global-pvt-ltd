import React from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";




function HomePage() {
    let history = useNavigate();

    // Function to set the ID, Name, and Age in local storage
    function setID(id, name, age,gender) {
        localStorage.setItem("id", id);
        localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
        localStorage.setItem("Gender", gender);
    }

    // Function to delete an entry
    function deleted(id) {
        let index = array
            .map(function (e) {
                return e.id;
            })
            .indexOf(id);

        // Deleting the entry with the specified index
        array.splice(index, 1);

        // Redirecting to the same page to re-render
        history("/");
    }

    return (
        <div style={{ margin: "2rem" }}>
            <h1 className="text-center mb-4">Student Details</h1>
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.Name}</td>
                                <td>{item.Age}</td>
                                <td>{item.Gender}</td>
                                <td>
                                    <Link to={`/StudentUpdate`}>
                                        <Button
                                            onClick={() => setID(item.id, item.Name, item.Age,item.Gender)}
                                            variant="info"
                                            className="me-2"
                                        >
                                            Update
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => deleted(item.id)}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="d-grid gap-2 mt-4">
                <Link to="/AddStudent">
                    <Button variant="success" size="lg">
                        Add new student
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;