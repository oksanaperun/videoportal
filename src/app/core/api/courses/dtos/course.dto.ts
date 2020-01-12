import { AuthorDto } from 'src/app/core/api/author/dtos/author.dto';

export class CourseDto {
  constructor(
    public id: number,
    public name: string,
    public date: string,
    public length: number,
    public description: string,
    public authors: AuthorDto[],
    public isTopRated: boolean
  ) { }
}
