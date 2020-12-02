import axios from "axios";
import { GET_ERRORS, GET_COURSES, GET_COURSE, DELETE_COURSE, GET_COURSES_BY_TITLE } from "./types";

export const createCourse = (course, history) => async dispatch => {
    try {
        await axios.post("/api/courses", course);
        history.push("/courseList");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getCourses = () => async  dispatch => {
    const res = await axios.get("/api/courses");
    dispatch({
        type: GET_COURSES,
        payload: res.data
    })
};

export const getCoursesByTitle = (title) => async  dispatch => {
    dispatch({
        type: GET_COURSES_BY_TITLE,
        payload: title
    })
};

export const getCourse = (id, history) => async dispatch => {

    try {
        const res = await axios.get(`/api/courses/${id}`);
        dispatch({
            type: GET_COURSE,
            payload: res.data
        })    
    } catch (error) {
        history.push("/courseList")
    }

};

export const deleteCourse = id => async dispatch => {
    if (window.confirm("Are you sure? This will delete the course and all the data")) {
        //not single nor double quotes but backticks since we are passing id parameter
        await axios.delete(`/api/courses/${id}`);
        dispatch({
            type: DELETE_COURSE,
            payload: id
        });        
    }

};