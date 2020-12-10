package com.duocode.studentregistration.services;

import com.duocode.studentregistration.domain.Course;
import com.duocode.studentregistration.domain.Student;
import com.duocode.studentregistration.exceptions.EmailAccountAlreadyExistsException;
import com.duocode.studentregistration.exceptions.StudentIdException;
import com.duocode.studentregistration.repositories.StudentRepository;
import com.duocode.studentregistration.validator.StudentValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.Comparator;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseService courseService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private StudentValidator studentValidator;

    public Student saveOrUpdateStudent(Student student) {
        try {
            Student newStudent;
            if (student.getId() == null) {
                newStudent = studentRepository.save(new Student(student.getFirstName(), student.getLastName(), student.getEmail()));
                newStudent.getCourses().addAll(student.getCourses());
            } else {
                newStudent = studentRepository.getById(student.getId());
                newStudent.setFirstName(student.getFirstName());
                newStudent.setLastName(student.getLastName());
                newStudent.setEmail(student.getEmail());
            }

            return studentRepository.save(newStudent);

        } catch (Exception ex) {
            throw new EmailAccountAlreadyExistsException("Email account '"+student.getEmail()+"' already exists");
        }
    }

    public Iterable<Student> findAllStudents() {
        return studentRepository.findAll();
    }

    public Student findStudentById(Long studentId) {
        Student student = studentRepository.getById(studentId);
        if (student == null) {
            throw new StudentIdException("StudentID '" + studentId.toString()+"' does not exists");
        }

        return student;
    }

    public void deleteStudentById(Long studentId) {
        studentRepository.deleteById(studentId);
    }

    public void registerCourse(Long studentId, Set<Course> courses) {
        Student student = studentRepository.getById(studentId);
        if (student == null) {
            throw new StudentIdException("StudentID '" + studentId.toString()+"' does not exists");
        }

        courses.addAll(student.getCourses());
        student.setCourses(courses);
        studentRepository.save(student);

    }

    public Set<Student> getStudentsByCourseId(Long studentId, Long courseId) {
        Student student = findStudentById(studentId);
        Course course = courseService.findCourseByIdentifier(courseId);
        if (course != null && student != null) {
            Comparator<Student> studentByName = (Student student1, Student student2) -> student1.getFirstName()
                    .compareTo(student2.getFirstName());
            TreeSet<Student> sortedStudents = new TreeSet<>(studentByName);

            Set<Student> students = course.getStudents();
            students.forEach(item -> item.setCourses(null));
            sortedStudents.addAll(students);
            return sortedStudents;
        }

        return new HashSet<>();

    }

    public ResponseEntity<?> studentValidation(Student student, BindingResult result) {
        studentValidator.validate(student, result);
        return validationErrorService.validationErrorService(result);
    }

}
