package com.duocode.studentregistration.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
 @RestController
public class CustomResponseEntityException extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleCourseIdException(CourseIdException ex, WebRequest request) {
        CourseIdExceptionResponse exceptionResponse = new CourseIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleEmailAccountAlreadyExists(EmailAccountAlreadyExistsException ex, WebRequest request) {
        EmailAccountAlreadyExistsResponse exceptionResponse = new EmailAccountAlreadyExistsResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleStudentNotExists(StudentIdException ex, WebRequest request) {
        StudentIdExceptionResponse exceptionResponse = new StudentIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
