import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteStudent} from '../../actions/studentActions'
import { getCourses } from "../../actions/courseActions";

class StudentItem extends Component {

    onDeleteClick = id => {
        this.props.deleteStudent(id);
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.studentList.map( student =>  
                            <tr key={student.id}>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Link to={`/updateStudent/${student.id}`} className="btn btn-outline-success" role="button" aria-pressed="true">Edit</Link>
                                </td>
                                <td>
                                    <li className="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this, student.id)}>Delete</li>
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

StudentItem.propTypes = {
    deleteStudent: PropTypes.func.isRequired
};

export default connect(null, {deleteStudent, getCourses})(StudentItem);
