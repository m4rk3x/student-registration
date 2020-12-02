package com.duocode.studentregistration.exceptions;

/**
 * Created by m4rk1n0 on 11/27/20
 **/
public class CourseIdExceptionResponse {

    private String courseIdentifier;

    public CourseIdExceptionResponse(String courseIdentifier) {
        this.courseIdentifier = courseIdentifier;
    }

    public String getCourseIdentifier() {
        return courseIdentifier;
    }

    public void setCourseIdentifier(String courseIdentifier) {
        this.courseIdentifier = courseIdentifier;
    }
}
