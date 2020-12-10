import React from "react";
import { Link } from "react-router-dom";

const CreateCourseButton = () =>  {
    return (
        <React.Fragment>
            <Link to="/addUpdateCourse" className="btn btn-secondary">Create a Course</Link>
        </React.Fragment>
    );
};

export default CreateCourseButton;