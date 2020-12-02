package com.duocode.studentregistration.geolocation;

/**
 * Created by m4rk1n0 on 11/29/20
 **/
public class Coordinates {

    private double x;
    private double y;

    /**
     * Initialize default coordinates with X and Y values
     */
    public Coordinates() {
    }

    /**
     * Initialize a list of coordinates with X and Y values
     */
    public Coordinates(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    @Override
    public String toString() {
        return "Coordinates{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}