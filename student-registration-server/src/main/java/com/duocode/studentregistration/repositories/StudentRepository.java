package com.duocode.studentregistration.repositories;

import com.duocode.studentregistration.domain.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    Student findByEmail(String Email);
    Student getById(Long id);
    List<Student> findByFirstNameContaining(String firstName);
}
