package com.duocode.studentregistration.validator;

import com.duocode.studentregistration.domain.Course;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class CourseValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return Course.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {


        Course course = (Course) object;
        if (course.getCourseCode() == null) return;

        if (course.getCourseCode().length() < 6) {
            errors.rejectValue("courseCode", "Length", "Course code must be at least 6 characters.");
        }

    }
}
