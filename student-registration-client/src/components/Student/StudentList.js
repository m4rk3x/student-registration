import React, { Component } from 'react';
import CreateStudentButton from './CreateStudentButton';
import StudentItem from './StudentItem';
import { getStudents } from "../../actions/studentActions";
import { getStudentsByFirstName } from "../../actions/studentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class StudentList extends Component {
    
    componentDidMount() {
        this.props.getStudents();
    }

    render() {

        const { students } = this.props.student;

        return (
            <div className="Students">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Student Details</h1>
                        <br />
                        <div className='control'>
                            <input onChange={e=> {
                                this.props.getStudentsByFirstName(e.target.value);
                            }} placeholder='Filter by First Name' type='text'/>
                        </div>
                        <CreateStudentButton />
                        <br />
                        <hr />
                        <StudentItem studentList={students}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}; 

StudentList.propType = {
    student: PropTypes.object.isRequired,
    getStudent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    student: state.student
})

export default connect (mapStateToProps, {getStudents, getStudentsByFirstName}) (StudentList);