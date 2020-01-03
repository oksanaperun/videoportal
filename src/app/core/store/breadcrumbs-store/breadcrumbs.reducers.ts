import { BreadcrumbsActionTypes, SET_MAIN_ROUTE, SET_CHILD_ROUTE } from './breadcrumbs.actions';
import { BreadcrumbRoute } from '../../entities';

export const initialState: BreadcrumbRoute[] = [];

export const breadcrumbsReducers = (state = initialState, action: BreadcrumbsActionTypes) => {
  switch (action.type) {
    case SET_MAIN_ROUTE:
      return [action.payload];
    case SET_CHILD_ROUTE:
      return [...state, action.payload];
    default:
      return state;
  }
};
