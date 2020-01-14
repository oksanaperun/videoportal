import { AuthState } from './auth-state';
import { CoursesState } from './courses-state';
import { BreadcrumbRoute } from '../../entities';

export interface AppState {
  auth: AuthState;
  breadcrumbs: BreadcrumbRoute[];
  courses: CoursesState;
  loading: boolean;
}
