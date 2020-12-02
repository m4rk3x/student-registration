package com.duocode.studentregistration.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Course extends AbstractEntity {

    @Schema(description = "Title of the course.",
            example = "Matematicas 1", required = true)
    @NotBlank(message = "The title of the course cannot be blank")
    private String title;
    @Schema(description = "Short description of the course.",
            example = "Math is starting course for ...", required = false)
    private String description;
    @Schema(description = "Unique identifier of the Course.",
            example = "COURSE1", required = true)
    @NotBlank(message = "Course Code cannot be blank")
    @Column(updatable = false, unique = true)
    private String courseCode;
    @Schema(description = "The list of users enrolled in the course.",
            example = "Student1, student2, student3", required = false)
    @ManyToMany(mappedBy = "courses", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    public Course() {
    }

    public Course(String title, String description, String courseCode) {
        this.courseCode = courseCode;
        this.title = title;
        this.description = description;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String codeIdentifier) {
        this.courseCode = codeIdentifier;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    @Override
    public String toString() {
        return "Course{" +
                "courseCode='" + courseCode + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", students=" + students +
                '}';
    }
}
