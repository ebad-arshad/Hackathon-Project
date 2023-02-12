import { db, doc, setDoc } from "../firebase/firebase";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_UP_SUCCESS':
            setDoc(doc(db, "users", action.uid), action.payload);
            return {
                ...state,
                userData: action.payload,
            };
        case 'USER_DATA':
            let userObj = JSON.parse(action.payload)
            return {
                ...state,
                userData: userObj,
                fullName: action.fullName
            };
        case 'UPDATE_NAME':
            return {
                ...state,
                fullName: action.fullName
            };
        default:
            return state;
    }
};