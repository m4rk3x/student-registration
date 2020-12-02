import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCourse } from "../../actions/courseActions";
import classnames from "classnames";

class AddCourse extends Component {

    constructor() {
        super()

        this.state = {
            courseCode:"",
            title:"",
            description:"",
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({ [ e.target.name ]: e.target.value });
    }

    onSubmit(e) {

        e.preventDefault();

        const newCourse = {
            courseCode:this.state.courseCode,
            title:this.state.title,
            description:this.state.description
        }

        this.props.createCourse(newCourse, this.props.history);
    }

    render() {
        //Get the errors from the state
        const { errors } = this.state;
        return (
            <div className="course">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Course Form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div class="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputCourseCode">Course Code</label>
                                        <input 
                                            type="text" 
                                            className={ classnames("form-control mb-2 mr-sm-2", {
                                                "is-invalid": errors.courseCode
                                            })}
                                            placeholder="Course Code" 
                                            name="courseCode" 
                                            value={this.state.firstName}
                                            onChange={this.onChange}
                                            id="inputCourseCode"
                                        />
                                        { errors.courseCode && (
                                            <div className="invalid-feedback">
                                            { errors.courseCode }
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="inputTitle">Course Title</label>
                                        <input 
                                            type="text" 
                                            className={ classnames( "form-control mb-2 mr-sm-2", {
                                                "is-invalid": errors.title
                                            })}
                                            placeholder="Title" 
                                            name="title" 
                                            value={this.state.title}
                                            onChange={this.onChange}
                                            id="inputTitle"
                                        />
                                        { errors.title && (
                                            <div className="invalid-feedback">
                                                { errors.title }
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputDescription">Course Description</label>
                                        <input 
                                            type="text" 
                                            className= { classnames( "form-control mb-2 mr-sm-2", {
                                                "is-invalid": errors.description
                                            })}
                                            placeholder="Description" 
                                            name="description" 
                                            value={this.state.description}
                                            onChange={this.onChange}
                                            id="inputDescription"
                                        />
                                        { errors.description && (
                                            <div className="invalid-feedback">
                                                { errors.descrition }
                                            </div>
                                        )}
                                    </div>
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

AddCourse.propTypes = {
    createCourse: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

//With this we are mapping the state.errors to errors so we can use it in the form 
//Extracting the errors from our states, for this we need to create a life cycle hook 
const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {createCourse}) (AddCourse);