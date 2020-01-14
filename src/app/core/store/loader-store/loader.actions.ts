import { Action } from '@ngrx/store';

export const SET_LOADING = '[Loader] Set loading';

export class SetLoadingAction implements Action {
    readonly type = SET_LOADING;
    constructor(public payload: boolean) { }
}

export type LoaderActionTypes = SetLoadingAction;
