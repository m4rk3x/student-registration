import React from "react";
import { Link } from "react-router-dom";

const CreateStudentButton = () =>  {
    return (
        <React.Fragment>
            <Link to="/addUpdateStudent" className="btn btn-secondary">Create an Student</Link>
        </React.Fragment>
    );
};

export default CreateStudentButton;