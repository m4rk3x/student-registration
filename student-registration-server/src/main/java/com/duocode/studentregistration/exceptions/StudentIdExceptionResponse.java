package com.duocode.studentregistration.exceptions;

public class StudentIdExceptionResponse {

    private String id;

    public StudentIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
