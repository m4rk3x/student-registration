import React, { Component } from 'react';
import { getCourse, createCourse } from "../../actions/courseActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateCourse extends Component {

    //set state
    constructor() {
        super()

        this.state = {
            id: "",
            courseCode: "",
            title: "",
            description: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        const {
            id,
            courseCode,
            title,
            description
        } = nextProps.course;

        this.setState({
            id,
            courseCode,
            title,
            description
        });
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getCourse(id, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const updatedCourse = {
            id: this.state.id,
            courseCode: this.state.courseCode,
            title: this.state.title,
            description: this.state.description
        };
        this.props.createCourse(updatedCourse, this.props.history);
    }

    render() {
        const {errors} = this.state
        return (
            <div className="course">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Course Form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg"
                                        placeholder="Course Code" 
                                        name="courseCode" 
                                        value={this.state.courseCode}
                                        onChange={this.onChange}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.title
                                        })}
                                        placeholder="Title" 
                                        name="title" 
                                        value={this.state.title}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.title && (
                                            <div className="invalid-feedback">{errors.title}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })}
                                        placeholder="Description" 
                                        name="description" 
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
                                    {
                                            errors.description && (
                                                <div className="invalid-feedback">{errors.description}</div>
                                            )
                                    }
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

UpdateCourse.propTypes = {
    getCourse: PropTypes.func.isRequired,
    createCourse: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    course: state.course.course,
    errors: state.errors
});

export default connect(mapStateToProps, {getCourse, createCourse}) (UpdateCourse);