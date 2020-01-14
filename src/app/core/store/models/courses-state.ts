import { Course } from '../../entities';

export interface CoursesState {
  items: Course[];
  searchText: string;
  currentPage: number;
}
