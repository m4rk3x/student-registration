import React, { Component } from 'react';
import CreateCourseButton from './CreateCourseButton';
import CourseItem from './CourseItem';
import { getCourses } from "../../actions/courseActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getCoursesByTitle} from '../../actions/courseActions'

class CourseList extends Component {
    
    componentDidMount() {
        this.props.getCourses();
    }

    render() {

        const { courses } = this.props.course;

        return (
            <div className="Courses">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Course Details</h1>
                        <br />
                        <div className='control'>
                            <input onChange={e=> {
                                this.props.getCoursesByTitle(e.target.value);
                            }} placeholder='Filter by title' type='text'/>
                        </div>
                        <CreateCourseButton />
                        <br />
                        <hr />
                        <CourseItem courseList={courses}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}; 

CourseList.propType = {
    course: PropTypes.object.isRequired,
    getCourse: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    course: state.course
})

export default connect (mapStateToProps, {getCourses, getCoursesByTitle}) (CourseList);