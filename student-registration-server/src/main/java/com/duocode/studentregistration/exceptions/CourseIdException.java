package com.duocode.studentregistration.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by m4rk1n0 on 11/27/20
 **/
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CourseIdException extends RuntimeException {

    public CourseIdException(String message) {
        super(message);
    }
}
