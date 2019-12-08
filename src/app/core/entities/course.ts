import { Author } from './author';

export class Course {
  constructor(
    public id: string,
    public title: string,
    public creationDate: number,
    public duration: number,
    public description: string,
    public authors: Author[],
    public topRated?: boolean
  ) { }
}
