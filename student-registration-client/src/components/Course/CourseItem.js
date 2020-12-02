import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteCourse} from '../../actions/courseActions'

class CourseItem extends Component {

    onDeleteClick = id => {
        this.props.deleteCourse(id);
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Course Code</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.courseList.map( course =>  
                            <tr key={course.id}>
                                <td>{course.courseCode}</td>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td>
                                    <Link to={`/updateCourse/${course.id}`} className="btn btn-outline-success" role="button" aria-pressed="true">Edit</Link>
                                </td>
                                <td>
                                    <li className="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this, course.id)}>Delete</li>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
};

CourseItem.propTypes = {
    deleteCourse: PropTypes.func.isRequired
};

export default connect(null, {deleteCourse})(CourseItem);
