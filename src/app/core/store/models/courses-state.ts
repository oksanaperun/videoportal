import { Course } from '../../entities';

export interface CoursesState {
  items: Course[];
  totalCount: number;
  searchText: string;
  currentPage: number;
}
