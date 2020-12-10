package com.duocode.studentregistration.web;

import com.duocode.studentregistration.domain.Course;
import com.duocode.studentregistration.domain.Student;
import com.duocode.studentregistration.services.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/api/students")
@CrossOrigin
@Tag(name = "Student", description = "The Student API")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Operation(summary = "Add/Update a Student to the database", description = "Add/Update a student", tags = { "student" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "successful created",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Student.class)))) })
    @PostMapping
    public ResponseEntity<?> createNewStudent(@Valid @RequestBody Student student, BindingResult result) {

        ResponseEntity<?> errorMap = studentService.studentValidation(student, result);
        if (errorMap!=null) return errorMap;

        Student student1 = studentService.saveOrUpdateStudent(student);
        return new ResponseEntity<Student>(student, student.getId()!=null?HttpStatus.OK:HttpStatus.CREATED);
    }

    @Operation(summary = "Get all students from the database", description = "find all students", tags = { "student" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Student.class)))) })
    @GetMapping
    public Iterable<Student> getAllStudents() {
        return studentService.findAllStudents();
    }

    @Operation(summary = "Find student by ID", description = "Returns a single student", tags = { "student" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = Student.class)))
    })
    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long studentId) {
        Student student = studentService.findStudentById(studentId);
        return new ResponseEntity<Student>(student, HttpStatus.OK);
    }

    @Operation(summary = "Deletes an student", description = "", tags = { "student" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "404", description = "Student not found")
    })
    @DeleteMapping("/{studentId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long studentId) {
        studentService.deleteStudentById(studentId);
        return new ResponseEntity<String>("Student with ID: '"+studentId+"' was deleted.", HttpStatus.OK);
    }

    @Operation(summary = "Register an student to a list of courses", description = "Register a student to courses", tags = { "student" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation")
    })
    @PutMapping("/registerStudentToCourses/{studentId}")
    public ResponseEntity<?> enrollStudentToCourses(@PathVariable Long studentId, @RequestBody Set<Course> courses) {
        studentService.registerCourse(studentId, courses);
        return new ResponseEntity<String>("Student with ID " + studentId + "has been successfully Enrolled to Courses", HttpStatus.OK);
    }

    @Operation(summary = "Find students enrolled in a specific course", description = "Find students in a course", tags = { "student" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = Student.class)))
            })
    @GetMapping(value="/{studentId}/courses")
    public Iterable<Student> studentsAddCourse(@PathVariable Long studentId, @RequestParam Long courseId) {
            return studentService.getStudentsByCourseId(studentId, courseId);
    }


}
