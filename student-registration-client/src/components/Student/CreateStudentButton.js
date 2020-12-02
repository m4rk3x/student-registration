import React from "react";
import { Link } from "react-router-dom";

const CreateStudentButton = () =>  {
    return (
        //React.Fragment wraps it in a invisible parent component 
        <React.Fragment>
            <Link to="/addStudent" className="btn btn-secondary">Create an Student</Link>
        </React.Fragment>
    );
};

export default CreateStudentButton;