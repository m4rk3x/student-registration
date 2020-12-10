package com.duocode.studentregistration.validator;

import com.duocode.studentregistration.domain.Student;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class StudentValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        //We are just saying that we are supporting this Student class in our domain
        return Student.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        Student student = (Student) object;
        if (student.getEmail() == null) return;

    }
}
