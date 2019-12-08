import { CourseAuthorDto } from './courseAuthor-dto';

export class CourseDto {
  constructor(
    public id: number,
    public name: string,
    public date: string,
    public length: number,
    public description: string,
    public authors: CourseAuthorDto[],
    public isTopRated: boolean
  ) { }
}
