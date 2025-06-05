import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import "./App.css";
import AddStudent from "./component/AddStudent";
import StudentUpdate from "./component/StudentUpdate";
import HomePage from "./component/HomePage";

function App() {
    return (
        <div className="App">
            <h1 className="topStudent">Student Data Using React </h1>
            <h3>CRUD App</h3>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/AddStudent"
                        element={<AddStudent />}
                    />
                    <Route
                        path="/StudentUpdate"
                        element={<StudentUpdate />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;