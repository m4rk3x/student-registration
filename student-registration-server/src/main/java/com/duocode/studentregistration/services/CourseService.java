package com.duocode.studentregistration.services;

import com.duocode.studentregistration.domain.Course;
import com.duocode.studentregistration.exceptions.CourseIdException;
import com.duocode.studentregistration.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by m4rk1n0 on 11/27/20
 **/
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Course saveOrUpdateCourse(Course course) {
        try {
            course.setCourseCode(course.getCourseCode().toUpperCase());
            return courseRepository.save(course);
        } catch (Exception e) {
            throw new CourseIdException("Course Code '" + course.getCourseCode().toUpperCase() + "' already exists");
        }
    }

    public Course findCourseByIdentifier(Long courseId) {

//        Course course = courseRepository.findCourseByCourseCode(courseId);
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

}
