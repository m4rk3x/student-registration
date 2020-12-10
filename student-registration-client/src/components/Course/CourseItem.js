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
                <div className="content-table">
                    <div className="content-row title-row">
                        <div className="content-col">
                            Course Code
                        </div>
                        <div className="content-col">
                            Course Title
                        </div>
                        <div className="content-col">
                            Course Description
                        </div>
                        <div className="content-col">
                            
                        </div>
                        <div className="content-col">
                            
                        </div>
                    </div>
                    {
                        this.props.courseList.map( course =>  
                            <div key={course.id} className="content-row">
                                <div className="content-col">
                                    {course.courseCode}
                                </div>
                                <div className="content-col">
                                    {course.title}
                                </div>
                                <div className="content-col">
                                    {course.description}
                                </div>
                                <div className="content-col">
                                    <Link to={`/addUpdateCourse/${course.id}`} className="btn btn-outline-success" role="button" aria-pressed="true">Edit</Link>
                                </div>
                                <div className="content-col">
                                    <li className="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this, course.id)}>Delete</li>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
};

CourseItem.propTypes = {
    deleteCourse: PropTypes.func.isRequired
};

export default connect(null, {deleteCourse})(CourseItem);
