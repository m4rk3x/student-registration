package com.duocode.studentregistration.web;

import com.duocode.studentregistration.domain.Course;
import com.duocode.studentregistration.services.CourseService;
import com.duocode.studentregistration.services.ValidationErrorService;
import com.duocode.studentregistration.validator.CourseValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by m4rk1n0 on 11/27/20
 **/
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private CourseValidator courseValidator;

    @Operation(summary = "Create a new Course", description = "Add a course", tags = { "course" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "successful created",
                    content = @Content(schema = @Schema(implementation = Course.class)))
    })
    @PostMapping
    public ResponseEntity<?> createNewCourse(@Valid @RequestBody Course course, BindingResult result) {

        courseValidator.validate(course, result);

        ResponseEntity<?> errorMap = validationErrorService.validationErrorService(result);
        if (errorMap != null) return errorMap;

        Course newCourse = courseService.saveOrUpdateCourse(course);
        return new ResponseEntity<Course>(newCourse, HttpStatus.CREATED);
    }

    @Operation(summary = "Find a course", description = "Find a course by the identifier", tags = { "course" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = Course.class)))
    })
    @GetMapping("/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable Long courseId) {
        Course course = courseService.findCourseByIdentifier(courseId);
        return new ResponseEntity<Course>(course, HttpStatus.OK);
    }

    @Operation(summary = "Find all courses", description = "Find all course from database", tags = { "course" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = Course.class)))
    })
    @GetMapping
    public Iterable<Course> getAllCourses() {
        return courseService.findAllCourses();
    }

    @Operation(summary = "Deletes a course", description = "", tags = { "course" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
    })
    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId) {
        courseService.deleteCourseByIdentifier(courseId);
        return new ResponseEntity<String>("Project with ID: '" + courseId + " was deleted", HttpStatus.OK);
    }
}
