package com.duocode.studentregistration.services;

import com.duocode.studentregistration.domain.Course;
import com.duocode.studentregistration.domain.Student;
import com.duocode.studentregistration.exceptions.CourseIdException;
import com.duocode.studentregistration.exceptions.StudentIdException;
import com.duocode.studentregistration.exceptions.EmailAccountAlreadyExistsException;
import com.duocode.studentregistration.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseService courseService;

    public Student saveOrUpdateStudent(Student student) {
        try {
            Student newStudent;
            if (student.getId() == null) {
                newStudent = studentRepository.save(new Student(student.getFirstName(), student.getLastName(), student.getEmail()));
            } else {
                newStudent = studentRepository.getById(student.getId());
                newStudent.getCourses().clear();;
            }
            newStudent.getCourses().addAll(student.getCourses());
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

    public Student updateStudent(Long studentId, Student updatedStudent) {
        Student student = findStudentById(studentId);
        student = updatedStudent;
        return studentRepository.save(student);

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

    public Set<Student> getStudentsByCourseTitle(String courseName) {
        Course course = courseService.getCourseByCourseName(courseName);
        if (course != null) {
            Comparator<Student> studentByName = (Student student1, Student student2) -> student1.getFirstName()
                    .compareTo(student2.getFirstName());
            TreeSet<Student> sortedStudents = new TreeSet<>(studentByName);

            Set<Student> students = course.getStudents();
            students.forEach(student -> student.setCourses(null));
            sortedStudents.addAll(students);
            return sortedStudents;
        }

        return new HashSet<>();

    }

}
