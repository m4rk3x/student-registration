import { GET_STUDENTS, GET_STUDENT, DELETE_STUDENT, GET_STUDENTS_BY_FIRSTNAME} from "../actions/types";

const initialState = {
    students: [],
    originalStudents: [],
    student: {}
};

export default function(state = initialState, action) {
    switch(action.type) {

        case GET_STUDENTS:
            return {
                ...state,
                originalStudents: action.payload,
                students: action.payload
            };
        case GET_STUDENT:
            return {
                ...state,
                student: action.payload
            };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload)
            };
        case GET_STUDENTS_BY_FIRSTNAME:
            return {
                ...state,
                students: state.originalStudents.filter(student => { 
                    if (action.payload === '') {
                        return student;
                    } else {
                        return student.firstName === action.payload;     
                    }
                })
            };

        default:
            return state;
    }
};