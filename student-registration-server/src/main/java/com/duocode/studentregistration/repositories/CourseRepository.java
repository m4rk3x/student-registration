package com.duocode.studentregistration.repositories;

import com.duocode.studentregistration.domain.Course;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by m4rk1n0 on 11/27/20
 **/
public interface CourseRepository extends CrudRepository<Course, Long> {

    Course findCourseByTitle(String courseTitle);
     @Override
    Iterable<Course> findAll();
    Course getById(Long id);
    List<Course> findByTitleContaining(String title);

}
