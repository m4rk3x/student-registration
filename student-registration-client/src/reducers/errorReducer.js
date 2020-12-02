import { GET_ERRORS } from "../actions/types";

const initialState = {

};

export default function(state=initialState, action) {
    switch(action.type) {
        //If we get errors from the server this is going to return the errors and dispatch to the store
        case GET_ERRORS:
            return action.payload;

        default:
            return state;
    }
}