import { LoaderActionTypes, SET_LOADING } from './loader.actions';

export const initialState = false;

export const loaderReducers = (state = initialState, action: LoaderActionTypes) => {
    switch (action.type) {
        case SET_LOADING:
            return action.payload;
        default:
            return state;
    }
};
