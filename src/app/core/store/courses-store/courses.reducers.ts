import {
  CoursesActionTypes,
  LOAD_COURSES_SUCCESS,
  CHANGE_SEARCH_TEXT,
  CHANGE_CURRENT_PAGE,
} from './courses.actions';
import { CoursesState } from '../models/courses-state';

export const initialState: CoursesState = {
  items: [],
  totalCount: 0,
  searchText: '',
  currentPage: 1,
};

export const coursesReducers = (state = initialState, action: CoursesActionTypes) => {
  switch (action.type) {
    case LOAD_COURSES_SUCCESS:
      return {
        ...state,
        totalCount: action.payload.totalCount,
        items: state.currentPage > 1
          ? [...state.items, ...action.payload.courses]
          : action.payload.courses,
      };
    case CHANGE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
        currentPage: 1,
      };
    case CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
