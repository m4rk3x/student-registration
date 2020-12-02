import React, { Component } from 'react';
import { getStudent, createStudent } from "../../actions/studentActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCourses } from "../../actions/courseActions";
import classnames from "classnames";

class UpdateStudent extends Component {

    constructor() {
        super()

        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            courses:{},
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange = (e) => {
        const { courses } = this.props.course; 
        const selected=[];
        let selectedOption=(e.target.selectedOptions);
        for (let i = 0; i < selectedOption.length; i++){
            const index = +selectedOption.item(i).value;
            selected.push(courses[index]);
        }
        this.setState({courses: selected});
        
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        const {
            id,
            firstName,
            lastName,
            email,
            courses
        } = nextProps.student;

        this.setState({
            id,
            firstName,
            lastName,
            email,
            courses
        });
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getStudent(id, this.props.history);
        this.props.getCourses();
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("confirm:"+this.state.confirmPassword);
        const updatedStudent = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            courses: this.state.courses
        };
        this.props.createStudent(updatedStudent, this.props.history);
    }

    render() {
        const {errors} = this.state;
        const {courses} = this.props.course;
        const selectedCourses = this.state.courses;
        if (selectedCourses && selectedCourses.length) {
            courses.map((item) => {
                item.wasSelected = selectedCourses.some(selected => JSON.stringify(selected) === JSON.stringify(item));
            })
        }

        return (
            <div className="student">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Student Form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <h6>Email</h6>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg"
                                        placeholder="Email" 
                                        name="email" 
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        disabled
                                    />
                                    {
                                        errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.firstName
                                        })}
                                        placeholder="First Name" 
                                        name="firstName" 
                                        value={this.state.firstName}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.firstName && (
                                            <div className="invalid-feedback">{errors.firstName}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.lastName
                                        })}
                                        placeholder="Last Name" 
                                        name="lastName" 
                                        value={this.state.lastName}
                                        onChange={this.onChange}
                                    />
                                    {
                                            errors.lastName && (
                                                <div className="invalid-feedback">{errors.lastName}</div>
                                            )
                                    }
                                </div>
                                <div className="form-row">
                                    <strong>Select Courses:</strong>
                                    <select multiple onChange={this.handleOptionChange}>
                                    {
                                        courses.map((el, index) => (
                                            (el.wasSelected)?<option value={index} selected>{el.title}</option>:<option value={index}>{el.title}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                                
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

UpdateStudent.propTypes = {
    getStudent: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    student: state.student.student,
    errors: state.errors,
    course: state.course
});

export default connect(mapStateToProps, {getStudent, createStudent, getCourses}) (UpdateStudent);