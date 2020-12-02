import { GET_COURSES, GET_COURSE, DELETE_COURSE, GET_COURSES_BY_TITLE } from "../actions/types";

const initialState = {
    courses: [],
    originalCourses: [],
    course: {}
};

export default function(state = initialState, action) {
    switch(action.type) {

        case GET_COURSES:
            return {
                ...state,
                originalCourses: action.payload,
                courses: action.payload
            };
        case GET_COURSE:
            return {
                ...state,
                course: action.payload
            };
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload)
            };
        case GET_COURSES_BY_TITLE:
            return {
                ...state,
                courses: state.originalCourses.filter(course => { 
                    if (action.payload === '') {
                        return course;
                    } else {
                        return course.title === action.payload;     
                    }

                })
            };

        default:
            return state;
    }
};