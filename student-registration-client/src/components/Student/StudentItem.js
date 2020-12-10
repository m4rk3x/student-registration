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
                <div className="content-table">
                    <div className="content-row title-row">
                        <div className="content-col">
                            First Name
                        </div>
                        <div className="content-col">
                            Last Name
                        </div>
                        <div className="content-col">
                            Email  
                        </div>
                        <div className="content-col">
                            
                        </div>
                        <div className="content-col">
                            
                        </div>
                    </div>
                    {
                        this.props.studentList.map( student =>  
                            <div key={student.id} className="content-row">
                                <div className="content-col">
                                    {student.firstName}
                                </div>
                                <div className="content-col">
                                    {student.lastName}
                                </div>
                                <div className="content-col">
                                    {student.email}
                                </div>
                                <div className="content-col">
                                    <Link to={`/addUpdateStudent/${student.id}`} className="btn btn-outline-success" role="button" aria-pressed="true">Edit</Link>
                                </div>
                                <div className="content-col">
                                    <li className="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this, student.id)}>Delete</li>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
};

StudentItem.propTypes = {
    deleteStudent: PropTypes.func.isRequired
};

export default connect(null, {deleteStudent, getCourses})(StudentItem);
