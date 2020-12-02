import axios from "axios";
import { GET_ERRORS, GET_STUDENTS, GET_STUDENT, DELETE_STUDENT, GET_STUDENTS_BY_FIRSTNAME} from "./types";

export const createStudent = (student, history) => async dispatch => {
    try {
        await axios.post("/api/students", student);
        history.push("/studentList");
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

export const getStudents = () => async  dispatch => {
    const res = await axios.get("/api/students");
    dispatch({
        type: GET_STUDENTS,
        payload: res.data
    })
};

export const getStudentsByFirstName = (title) => async  dispatch => {
    dispatch({
        type: GET_STUDENTS_BY_FIRSTNAME,
        payload: title
    })
};

export const getStudent = (id, history) => async dispatch => {

    try {
        const res = await axios.get(`/api/students/${id}`);
        dispatch({
            type: GET_STUDENT,
            payload: res.data
        })    
    } catch (error) {
        history.push("/studentList")
    }

};

export const deleteStudent = id => async dispatch => {
    if (window.confirm("Are you sure? This will delete the student and all the data")) {
        //not single nor double quotes but backticks since we are passing id parameter
        await axios.delete(`/api/students/${id}`);
        dispatch({
            type: DELETE_STUDENT,
            payload: id
        });        
    }

};