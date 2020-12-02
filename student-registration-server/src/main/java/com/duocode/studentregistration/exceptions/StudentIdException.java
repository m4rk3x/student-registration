package com.duocode.studentregistration.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class StudentIdException extends RuntimeException {
    public StudentIdException(String message) {
        super(message);
    }
}
