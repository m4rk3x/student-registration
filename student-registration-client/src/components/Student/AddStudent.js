import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStudent } from "../../actions/studentActions";
import { getCourses } from "../../actions/courseActions";
import classnames from "classnames";

class AddStudent extends Component {

    constructor() {
        super()

        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            courses:{},
            errors:{}
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

    //life cycle hooks
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        this.props.getCourses();
    }

    onChange(e) {
        this.setState({ [ e.target.name ]: e.target.value });
    }

    onSubmit(e) {

        e.preventDefault();

        const newStudent = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            courses:this.state.courses
        }

        this.props.createStudent(newStudent, this.props.history);
    }

    render() {
        //Get the errors from the state
        const { errors } = this.state;
        const { courses } = this.props.course;

        return (
            <div className="student">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Student Form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>First Name</label>
                                        <input 
                                            type="text" 
                                            className={ classnames("form-control mb-2 mr-sm-2", {
                                                "is-invalid": errors.firstName 
                                            })}
                                            placeholder="First Name" 
                                            name="firstName" 
                                            value={this.state.firstName}
                                            onChange={this.onChange}
                                            id="inputFirstName"
                                        />
                                        { errors.firstName && (
                                            <div className="invalid-feedback">
                                            { errors.firstName }
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Last Name</label>
                                        <input 
                                            type="text" 
                                            className={ classnames( "form-control mb-2 mr-sm-2", {
                                                "is-invalid": errors.lastName
                                            })}
                                            placeholder="Last Name" 
                                            name="lastName" 
                                            value={this.state.lastName}
                                            onChange={this.onChange}
                                            id="inputLastName"
                                        />
                                        { errors.lastName && (
                                            <div className="invalid-feedback">
                                                { errors.lastName }
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input 
                                            type="text" 
                                            
                                            className= { classnames( "form-control mb-2 mr-sm-2", {
                                                "is-invalid": errors.email
                                            })}
                                            placeholder="Email" 
                                            name="email" 
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            id="inputEmail"
                                        />
                                        { errors.email && (
                                            <div className="invalid-feedback">
                                                { errors.email }
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <strong>Select Courses:</strong>
                                    <select multiple onChange={this.handleOptionChange}>
                                    {
                                        courses.map( (el, index) => (
                                            <option value={index}>{el.title}</option>
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
};

AddStudent.propTypes = {
    createStudent: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    getCourses: PropTypes.func.isRequired
};

//With this we are mapping the state.errors to errors so we can use it in the form 
//Extracting the errors from our states, for this we need to create a life cycle hook 
const mapStateToProps = state => ({
    errors: state.errors,
    course: state.course
});

export default connect(mapStateToProps, {createStudent, getCourses}) (AddStudent);