package com.duocode.studentregistration.services;

import com.duocode.studentregistration.domain.Course;
import com.duocode.studentregistration.exceptions.CourseIdException;
import com.duocode.studentregistration.repositories.CourseRepository;
import com.duocode.studentregistration.validator.CourseValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

/**
 * Created by m4rk1n0 on 11/27/20
 **/
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private CourseValidator courseValidator;

    public Course saveOrUpdateCourse(Course course) {
        try {
            course.setCourseCode(course.getCourseCode().toUpperCase());
            return courseRepository.save(course);
        } catch (Exception e) {
            throw new CourseIdException("Course Code '" + course.getCourseCode().toUpperCase() + "' already exists");
        }
    }

    public Course findCourseByIdentifier(Long courseId) {
        Course course = courseRepository.getById(courseId);
        if (course == null) {
            throw new CourseIdException("Course Code Identifier '" + courseId + "' does not exist");
        }
        return course;
    }

    public Iterable<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    public void deleteCourseByIdentifier(Long courseId) {
        Course course = courseRepository.getById(courseId);
        if (course == null) {
            throw new CourseIdException("Cannot find a course with ID '" + courseId + "'. This course does not exist");
        }
        courseRepository.delete(course);
    }

    public Course getCourseByCourseName(String courseTitle) {
        return courseRepository.findCourseByTitle(courseTitle);
    }

    public ResponseEntity<?> courseValidation (Course course, BindingResult result) {
        courseValidator.validate(course, result);
        return validationErrorService.validationErrorService(result);
    }

}
