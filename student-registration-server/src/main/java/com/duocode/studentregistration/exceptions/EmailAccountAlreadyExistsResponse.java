package com.duocode.studentregistration.exceptions;

public class EmailAccountAlreadyExistsResponse {

    private String username;

    public EmailAccountAlreadyExistsResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
