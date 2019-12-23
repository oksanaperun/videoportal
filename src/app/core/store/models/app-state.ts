import { AuthState } from './auth-state';
import { CoursesState } from './courses-state';

export interface AppState {
  auth: AuthState;
  courses: CoursesState;
}
