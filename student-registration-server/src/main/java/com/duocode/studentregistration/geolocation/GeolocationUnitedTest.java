package com.duocode.studentregistration.geolocation;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;


/**
 * Created by m4rk1n0 on 11/29/20
 **/
public class GeolocationUnitedTest {
    GeolocationUtil utility = new GeolocationUtil();
    final static double LENGHT_SIDE = 20D;

    @Test
    public void testFindSquareCoordinates() {
        System.out.println("Testing the find coordinates method from a point");
        Student student = new Student("Jhon Wilson", 34.069149, -118.442639);
        assertEquals(2, utility.findSquareCoordinateFromACenterPoint(LENGHT_SIDE, student.getLatitude(), student.getLongitude() ).size());
    }

    @Test
    public void test1StudentInClassesMethod() {
        System.out.println("Test one");
        System.out.println("========");
        System.out.println("Testing if a list of students is in a list of classRooms");
        List<Student> studentFoundList = new ArrayList<>();
        List<ClassRoom> classRoomList = new ArrayList<>();
        List<Student> actualList = new ArrayList<>();
        ClassRoom engineering_classroom = new ClassRoom("Principles of computational geo-location analysis", 34.069140, -118.442689);
        ClassRoom geology_classroom = new ClassRoom("Sedimentary Petrology", 34.069585, -118.441878);
        ClassRoom psychology_classroom = new ClassRoom("Introductory Psychobiology", 34.069742, -118.441312);
        ClassRoom music_classroom = new ClassRoom("Art of Listening", 34.070223, -118.440193);
        ClassRoom humanities_classroom = new ClassRoom("Art History", 34.071528, -118.441211);
        classRoomList.add(engineering_classroom);
        classRoomList.add(geology_classroom);
        classRoomList.add(psychology_classroom);
        classRoomList.add(music_classroom);
        classRoomList.add(humanities_classroom);
        List<Student> studentList = new ArrayList<>();
        Student john_student = new Student("John Wilson", 34.069149, -118.442639);
        Student jane_student = new Student("Jane Graham", 34.069601, -118.441862);
        Student pam_student = new Student("Pam Bam", 34.071513, -118.441181);
        studentList.add(john_student);
        studentList.add(jane_student);
        studentList.add(pam_student);
        actualList.addAll(studentList);
        studentFoundList = utility.studentsInClasses(studentList, classRoomList);
        assertEquals(actualList.size(), studentFoundList.size());
        assertTrue(studentFoundList.containsAll(actualList));
        studentFoundList.clear();
        studentList.clear();
        actualList.clear();
    }

    @Test
    public void test2StudentInClassesMethod() {

        System.out.println("Test Two");
        System.out.println("========");
        System.out.println("Testing if another list of students is in a list of classRooms");

        List<Student> studentFoundList = new ArrayList<>();
        List<ClassRoom> classRoomList = new ArrayList<>();
        List<Student> actualList = new ArrayList<>();

        ClassRoom engineering_classroom = new ClassRoom("Principles of computational geo-location analysis", 34.069140, -118.442689);
        ClassRoom geology_classroom = new ClassRoom("Sedimentary Petrology", 34.069585, -118.441878);
        ClassRoom psychology_classroom = new ClassRoom("Introductory Psychobiology", 34.069742, -118.441312);
        ClassRoom music_classroom = new ClassRoom("Art of Listening", 34.070223, -118.440193);
        ClassRoom humanities_classroom = new ClassRoom("Art History", 34.071528, -118.441211);
        classRoomList.add(engineering_classroom);
        classRoomList.add(geology_classroom);
        classRoomList.add(psychology_classroom);
        classRoomList.add(music_classroom);
        classRoomList.add(humanities_classroom);

        List<Student> studentList = new ArrayList<>();
        Student john_student = new Student("John Wilson", 34.069849, -118.443539);
        Student jane_student = new Student("Jane Graham", 34.069901, -118.441562);
        Student pam_student = new Student("Pam Bam", 34.071523, -118.441171);
        studentList.add(john_student);
        studentList.add(jane_student);
        studentList.add(pam_student);

        actualList.add(pam_student);

        studentFoundList = utility.studentsInClasses(studentList, classRoomList);

        assertEquals(actualList.size(), studentFoundList.size());
        assertTrue(studentFoundList.containsAll(studentList));

        studentFoundList.clear();
        studentList.clear();
        actualList.clear();
    }

}
