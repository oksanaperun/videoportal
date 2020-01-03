import { Action } from '@ngrx/store';
import { BreadcrumbRoute } from '../../entities';

export const SET_MAIN_ROUTE = '[Breadcrumbs] Set main route';
export const SET_CHILD_ROUTE = '[Breadcrumbs] Set child route';

export class SetMainRoute implements Action {
    readonly type = SET_MAIN_ROUTE;
    constructor(public payload: BreadcrumbRoute) { }
}

export class SetChildRoute implements Action {
    readonly type = SET_CHILD_ROUTE;
    constructor(public payload: BreadcrumbRoute) { }
}

export type BreadcrumbsActionTypes =
    SetMainRoute |
    SetChildRoute;
