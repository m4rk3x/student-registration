package com.duocode.studentregistration.geolocation;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by m4rk1n0 on 11/29/20
 **/
public class GeolocationUtil {

    final static double LENGHT_SIDE = 20D;
    final static double DOUBLE_ONE_HALF = 2D;

    /*
     * top: north latitude of bounding box.
     * left: left longitude of bounding box (western bound).
     * bottom: south latitude of the bounding box.
     * right: right longitude of bounding box (eastern bound).
     * latitude: latitude of the point to check.
     * longitude: longitude of the point to check.
     */
    public boolean isBounded(Coordinates p1, Coordinates p2, Coordinates studentLoc) {
        if(p1.getX() <= studentLoc.getX() && studentLoc.getX() <= p2.getX() &&
                p1.getY() <= studentLoc.getY() && studentLoc.getY() <= p2.getY()) {
            return true;
        }
        return false;
    }

    public List<Coordinates> findSquareCoordinateFromACenterPoint(double length, double c_x, double c_y) {
        List<Coordinates> result = new ArrayList<>(2);
        Coordinates point1 = new Coordinates();
        point1.setX(c_x - length/DOUBLE_ONE_HALF);
        point1.setY(c_y - length/DOUBLE_ONE_HALF);
        Coordinates point2 = new Coordinates();
        point2.setX(c_x + length/DOUBLE_ONE_HALF);
        point2.setY(c_y + length/DOUBLE_ONE_HALF);
        result.add(point1);
        result.add(point2);
        return result;
    }

    public List<Student> studentsInClasses (List<Student> studentList, List<ClassRoom> classRoomList) {
        List<Student> resultList = new ArrayList<>();
        List<Coordinates> coordinates = new ArrayList<>(2);
        if (studentList.size() > 0 && classRoomList.size() > 0) {
            for(Student student : studentList) {
                for(ClassRoom classRoom : classRoomList){
                    coordinates = findSquareCoordinateFromACenterPoint(LENGHT_SIDE, classRoom.getLatitude(), classRoom.getLongitude());
                    Coordinates studentLoc = new Coordinates(student.getLatitude(), student.getLongitude());
                    Coordinates point1 = coordinates.get(0);
                    Coordinates point2 = coordinates.get(1);
                    if (isBounded(point1, point2, studentLoc)) {
                        resultList.add(student);
                    }
                }
            }
            return resultList.stream()
                    .distinct()
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

}
